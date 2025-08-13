import { renderHtml } from "./utils/render";

export default {
    async fetch(request: Request, env: Env) {
        const url = new URL(request.url);

        if (url.pathname === "/") return renderHtml("home.html");
        if (url.pathname === "/extra") return renderHtml("extra.html");
        if (url.pathname === "/admin") return renderHtml("admin.html");
        if (url.pathname === "/thankyou") return renderHtml("thankyou.html");

        // Example: handle form POST
        if (url.pathname === "/register" && request.method === "POST") {
            const formData = await request.formData();
            const name = formData.get("name") as string;
            const email = formData.get("email") as string;
            const phone = formData.get("phone") as string;

            // Store into D1
            await env.DB.prepare(
                "INSERT INTO guests (name, email, phone) VALUES (?, ?, ?)"
            ).bind(name, email, phone).run();

            return Response.redirect(url.origin + "/extra", 303);
        }

        return new Response("Not found", { status: 404 });
    }
}
