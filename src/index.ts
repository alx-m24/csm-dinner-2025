const homeHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dinner Registration</title>
</head>
<body>
    <h1>Register for the Dinner</h1>
    <form action="/register" method="POST">
        <input name="name" placeholder="Full Name" required>
        <input name="email" type="email" placeholder="Email" required>
        <input name="phone" placeholder="Phone" required>

        <label>
            <input type="checkbox" name="admin" id="adminToggle"> Log in as admin
        </label>

        <!-- Password field hidden by default -->
        <div id="passwordField" style="display:none;">
            <input type="password" name="adminPassword" placeholder="Admin Password">
        </div>

        <button type="submit">Continue</button>
    </form>

    <script>
    const toggle = document.getElementById('adminToggle');
    const passwordField = document.getElementById('passwordField');

    toggle.addEventListener('change', () => {
        passwordField.style.display = toggle.checked ? 'block' : 'none';
    });
    </script>

</body>
</html>
`;

const additionalInfoHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Additional Info</title>
</head>
<body>
    <h1>Additional Information</h1>
    <form action="/additional" method="POST">
        <input name="email" type="hidden" value=""> <!-- We'll fill this dynamically -->
        <input name="diet" placeholder="Dietary Restrictions">
        <input name="allergies" placeholder="Allergies">
        <button type="submit">Submit</button>
    </form>
</body>
</html>
`;

export default {
    async fetch(request: Request, env: Env) {
        const url = new URL(request.url);

        if (url.pathname === "/") {
            return new Response(homeHtml, {
                headers: { "Content-Type": "text/html;charset=UTF-8" },
            });
        }

        // Step 1: register
        if (url.pathname === "/register" && request.method === "POST") {
            const formData = await request.formData();
            const name = formData.get("name")?.toString() || "";
            const email = formData.get("email")?.toString() || "";
            const phone = formData.get("phone")?.toString() || "";
            const isAdmin = formData.get("admin") === "on";

            if (isAdmin) {
                const adminPassword = formData.get("adminPassword")?.toString() || "";
                const correctPassword = "SuperSecretPassword1234"; // Replace with a secure password

                if (adminPassword !== correctPassword) {
                    return new Response("Incorrect admin password!", {
                        headers: { "Content-Type": "text/plain" },
                    });
                }

                // Admin logic here
                return new Response("Welcome, admin!", {
                    headers: { "Content-Type": "text/plain" },
                });
            }

            const existing = await env.DB.prepare(
                "SELECT id FROM registrations WHERE email = ?"
            )
                .bind(email)
                .first();

            if (existing) {
                return new Response(`A registration with the email ${email} already exists.`, {
                    headers: { "Content-Type": "text/plain" },
                });
            }

            // Insert new registration
            await env.DB.prepare(
                "INSERT INTO registrations (name, email, phone) VALUES (?, ?, ?)"
            )
                .bind(name, email, phone)
                .run();

            // Return the additional info page
            // Fill hidden email input so we know which record to update
            const filledHtml = additionalInfoHtml.replace(
                'value=""',
                `value="${email}"`
            );

            return new Response(filledHtml, {
                headers: { "Content-Type": "text/html;charset=UTF-8" },
            });
        }

        // Step 2: additional info
        if (url.pathname === "/additional" && request.method === "POST") {
            const formData = await request.formData();
            const email = formData.get("email")?.toString() || "";
            const diet = formData.get("diet")?.toString() || "";
            const allergies = formData.get("allergies")?.toString() || "";

            // Update the registration with additional info
            await env.DB.prepare(
                "UPDATE registrations SET diet = ?, allergies = ? WHERE email = ?"
            )
                .bind(diet, allergies, email)
                .run();

            return new Response(`Thank you! Your additional information has been saved.`, {
                headers: { "Content-Type": "text/plain" },
            });
        }

        return new Response("Not found", { status: 404 });
    }
} satisfies ExportedHandler<Env>;
