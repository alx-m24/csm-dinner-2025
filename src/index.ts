const homeHtml = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Dinner Confirmation</title>
    <link rel="icon" type="image/png" href="https://tinyurl.com/3rnepj4r">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet">
    <!-- Make sure you have this in <head> -->
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <style>
        /* Base body styling */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Times New Roman', serif;
            color: #d4af37;
            background-color: #000;
            background-image: radial-gradient(circle at top left, rgba(212, 175, 55, 0.08), transparent 60%), radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.08), transparent 60%);
            background-repeat: no-repeat;
            background-size: cover;
            min-height: 100vh;
            box-sizing: border-box;
        }

        /* Headings */
        h1 {
            text-align: center;
            font-size: clamp(2rem, 5vw, 4rem);
            font-family: 'Cinzel', serif;
            color: #d4af37;
            margin-bottom: 2rem;
            letter-spacing: 2px;
            text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
        }

        h2 {
            text-align: center;
            font-size: clamp(1.5rem, 3.5vw, 2.5rem);
            font-family: 'Cinzel', serif;
            color: #bbb;
            margin-bottom: 1rem;
            letter-spacing: 1px;
        }

        /* Optional: faint gold gradient overlay for depth */
        body::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.1), transparent 70%), radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.1), transparent 70%);
            pointer-events: none;
        }

        /* Center the form container */
        /* Form container adjusted */
        .form-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 80vh; /* shorter, so it doesn’t stretch too much vertically */
            padding: 2% 5%;
            gap: 1rem; /* spacing between inputs/buttons */
            box-sizing: border-box;
        }

        /* Style input fields and button */
        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="tel"],
        button[type="submit"] {
            width: 90%;
            max-width: 400px;
            margin: 1% 0; /* smaller vertical spacing */
            padding: 2.5%; /* keep input height reasonable */
            border: 2px solid #d4af37;
            border-radius: 6px;
            background-color: #000;
            color: #d4af37;
            font-size: 1rem;
            outline: none;
            box-sizing: border-box;
        }

        /* Add focus glow */
        input:focus,
        button:focus {
            box-shadow: 0 0 8px #d4af37;
        }

        /* Checkbox styling */
        input[type="checkbox"] {
            accent-color: #d4af37;
            box-shadow: 0 0 8px #d4af37;
            width: 16px;
            height: 16px;
            cursor: pointer;
            transform: scale(1.5);
        }
    </style>
</head>
<body>
    <h1>Confirm Your Presence</h1>
    <h2>Upper's End of Year Dinner Party</h2>
    <h2>CSM - 2025</h2>
    <form action="/register" method="POST">
        <div class="form-container">
            <input name="name" type="text" placeholder="Full Name" required>
            <input name="email" type="email" placeholder="Email" required>
            <input name="phone" type="tel" placeholder="Phone" required>

            <label>
                <input type="checkbox" name="admin" id="adminToggle"> Log in as admin
            </label>

            <!-- Password field hidden by default -->
            <div id="passwordField" style="display:none;">
                <p></p>
                <input type="password" name="adminPassword" placeholder="Admin Password">
            </div>

            <p></p><p></p>
            <button type="submit">Continue</button>
        </div>
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
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" type="image/png" href="https://tinyurl.com/3rnepj4r">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet">
    <style>
        /* Base body styling */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Times New Roman', serif;
            color: #d4af37;
            background-color: #000;
            background-image: radial-gradient(circle at top left, rgba(212, 175, 55, 0.08), transparent 60%), radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.08), transparent 60%);
            background-repeat: no-repeat;
            background-size: cover;
            min-height: 100vh;
            box-sizing: border-box;
        }

        /* Headings */
        h1 {
            text-align: center;
            font-size: clamp(2rem, 5vw, 4rem);
            font-family: 'Cinzel', serif;
            color: #d4af37;
            margin-bottom: 2rem;
            letter-spacing: 2px;
            text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
        }

        h2 {
            text-align: center;
            font-size: clamp(1.5rem, 3.5vw, 2.5rem);
            font-family: 'Cinzel', serif;
            color: #bbb;
            margin-bottom: 1rem;
            letter-spacing: 1px;
        }

        /* Optional: faint gold gradient overlay for depth */
        body::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.1), transparent 70%), radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.1), transparent 70%);
            pointer-events: none;
        }

        /* Center the form container */
        /* Form container adjusted */
        .form-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 80vh; /* shorter, so it doesn’t stretch too much vertically */
            padding: 2% 5%;
            gap: 1rem; /* spacing between inputs/buttons */
            box-sizing: border-box;
        }

        /* Style input fields and button */
        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="tel"],
        button[type="submit"] {
            width: 90%;
            max-width: 400px;
            margin: 1% 0; /* smaller vertical spacing */
            padding: 2.5%; /* keep input height reasonable */
            border: 2px solid #d4af37;
            border-radius: 6px;
            background-color: #000;
            color: #d4af37;
            font-size: 1rem;
            outline: none;
            box-sizing: border-box;
        }

        /* Add focus glow */
        input:focus,
        button:focus {
            box-shadow: 0 0 8px #d4af37;
        }

        /* Checkbox styling */
        input[type="checkbox"] {
            accent-color: #d4af37;
            box-shadow: 0 0 8px #d4af37;
            width: 16px;
            height: 16px;
            cursor: pointer;
            transform: scale(1.5);
        }
    </style>
</head>
<body>
    <h1>Additional Information</h1>
    <form action="/additional" method="POST">
        <div class="form-container">
            <input name="email" type="hidden" value=""> <!-- We'll fill this dynamically -->
            <input name="diet" type="text" placeholder="Dietary Restrictions">
            <input name="allergies" type="text" placeholder="Allergies">
            <input name="info" type="text" placeholder="Anything else we should know...">
            <button type="submit">Submit</button>
        </div>
    </form>
</body>
</html>
`;

const adminHTML = `<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Confirmations</title>
    <link rel="icon" type="image/png" href="https://tinyurl.com/3rnepj4r">
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@700&display=swap" rel="stylesheet">
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

        /* Base body styling */
        body {
            margin: 0;
            padding: 0;
            font-family: 'Times New Roman', serif;
            color: #d4af37;
            background-color: #000;
            background-image: radial-gradient(circle at top left, rgba(212, 175, 55, 0.08), transparent 60%), radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.08), transparent 60%);
            background-repeat: no-repeat;
            background-size: cover;
            min-height: 100vh;
            box-sizing: border-box;
        }

        /* Headings */
        h1 {
            text-align: center;
            font-size: clamp(2rem, 5vw, 4rem);
            font-family: 'Cinzel', serif;
            color: #d4af37;
            margin-bottom: 2rem;
            letter-spacing: 2px;
            text-shadow: 0 0 10px rgba(212, 175, 55, 0.6);
        }

        h2 {
            text-align: center;
            font-size: clamp(1.5rem, 3.5vw, 2.5rem);
            font-family: 'Cinzel', serif;
            color: #bbb;
            margin-bottom: 1rem;
            letter-spacing: 1px;
        }

        /* Optional: faint gold gradient overlay for depth */
        body::before {
            content: "";
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at top left, rgba(212, 175, 55, 0.1), transparent 70%), radial-gradient(circle at bottom right, rgba(212, 175, 55, 0.1), transparent 70%);
            pointer-events: none;
        }

        /* Center the form container */
        /* Form container adjusted */
        .form-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            min-height: 80vh; /* shorter, so it doesn’t stretch too much vertically */
            padding: 2% 5%;
            gap: 1rem; /* spacing between inputs/buttons */
            box-sizing: border-box;
        }

        /* Style input fields and button */
        input[type="text"],
        input[type="email"],
        input[type="password"],
        input[type="tel"],
        button[type="submit"] {
            width: 90%;
            max-width: 400px;
            margin: 1% 0; /* smaller vertical spacing */
            padding: 2.5%; /* keep input height reasonable */
            border: 2px solid #d4af37;
            border-radius: 6px;
            background-color: #000;
            color: #d4af37;
            font-size: 1rem;
            outline: none;
            box-sizing: border-box;
        }

        /* Add focus glow */
        input:focus,
        button:focus {
            box-shadow: 0 0 8px #d4af37;
        }

        /* Checkbox styling */
        input[type="checkbox"] {
            accent-color: #d4af37;
            box-shadow: 0 0 8px #d4af37;
            width: 16px;
            height: 16px;
            cursor: pointer;
            transform: scale(1.5);
        }
    </style>
</head>
<body>
    <h1>All Confirmations</h1>
    <p style="text-align:center;">Total Confirmations: {{total}}</p>
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
