export async function renderHtml(path: string) {
    const file = await import(`../pages/${path}?raw`);
    return new Response(file.default, {
        headers: { "Content-Type": "text/html;charset=UTF-8" },
    });
}