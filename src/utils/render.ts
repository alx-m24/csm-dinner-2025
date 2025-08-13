export async function renderHtml(fileName: string) {
    const file = await import(`../pages/${fileName}?raw`);
    return file.default;
}
