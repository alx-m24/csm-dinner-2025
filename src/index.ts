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

const adminHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Registrations</title>
    <style>
        table {
            border-collapse: collapse;
            width: 80%;
            margin: 20px auto;
        }

        th, td {
            border: 1px solid #999;
            padding: 8px 12px;
            text-align: left;
        }

        th {
            background-color: #eee;
        }

        h1 {
            text-align: center;
        }
    </style>
</head>
<body>
    <h1>All Registrations</h1>
    <p style="text-align:center;">Total registrations: {{total}}</p>
    <table>
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Diet</th>
                <th>Allergies</th>
                <th>Extra Info</th>
            </tr>
        </thead>
        <tbody>
            {{rows}}
        </tbody>
    </table>
</body>
</html>

`;

const ADMIN_PASSWORD = "SuperSecretPassword1234";

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

                if (adminPassword !== ADMIN_PASSWORD) {
                    return new Response("Incorrect admin password!", {
                        headers: { "Content-Type": "text/plain" },
                    });
                }

                // Get list of all registrations
                // Fetch all registrations
                const registrationsResult = await env.DB.prepare("SELECT * FROM registrations").all();
                const rows = registrationsResult.results.map(r => `
                    <tr>
                        <td>${r.id}</td>
                        <td>${r.name}</td>
                        <td>${r.email}</td>
                        <td>${r.phone}</td>
                        <td>${r.diet || ""}</td>
                        <td>${r.allergies || ""}</td>
                        <td>${r.extra_info || ""}</td>
                    </tr>
                    `).join("\n");

                // Total count
                const total = registrationsResult.results.length;

                // Replace placeholders in HTML
                const filledHtml = adminHTML
                    .replace("{{rows}}", rows)
                    .replace("{{total}}", total.toString());

                // Return response
                return new Response(filledHtml, {
                    headers: { "Content-Type": "text/html;charset=UTF-8" },
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
            const info = formData.get("info")?.toString() || "";

            // Update the registration with additional info
            await env.DB.prepare(
                "UPDATE registrations SET diet = ?, allergies = ?, extra_info = ?, WHERE email = ?"
            )
                .bind(diet, allergies, info, email)
                .run();

            return new Response(`Thank you! Your additional information has been saved.`, {
                headers: { "Content-Type": "text/plain" },
            });
        }

        return new Response("Not found", { status: 404 });
    }
} satisfies ExportedHandler<Env>;
