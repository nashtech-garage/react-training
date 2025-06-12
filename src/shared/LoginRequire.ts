export function requireAuth(request: Request): Response | null {
    // return null;
    const cookie = request.headers.get("Cookie");
    const token = parseTokenFromCookie(cookie);

    if (!token) {
        const url = new URL(request.url);
        return Response.redirect(`/auth/login?redirectTo=${url.pathname}`, 302);
    }

    return null;
}

function parseTokenFromCookie(cookieHeader: string | null): string | null {
    if (!cookieHeader) return null;
    const cookies = Object.fromEntries(
        cookieHeader.split(';').map(c => {
            const [key, ...v] = c.trim().split('=');
            return [key, v.join('=')];
        })
    );
    return cookies["token"] || null;
}