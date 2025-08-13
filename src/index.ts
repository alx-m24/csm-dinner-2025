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
        <button type="submit">Continue</button>
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

        return new Response("Not found", { status: 404 });
    }
} satisfies ExportedHandler<Env>;
