import { renderHtml } from "./utils/render";

export default {
    async fetch(request: Request, env: Env) {
        const url = new URL(request.url);

        let file = "";
        if (url.pathname === "/") file = "home.html";
        else return new Response("Not found", { status: 404 });

        const html = await renderHtml(file);

        return new Response(html, {
            headers: { "Content-Type": "text/html;charset=UTF-8" },
        });
    }
} satisfies ExportedHandler<Env>;
