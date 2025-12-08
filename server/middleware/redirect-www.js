export default function (req, res, next) {
    const host = req.headers.host || '';

    // Redirect www to non-www
    if (host.startsWith('www.')) {
        const newHost = host.replace('www.', '');
        const redirectUrl = `https://${newHost}${req.url}`;

        res.writeHead(301, {
            Location: redirectUrl
        });
        res.end();
        return;
    }

    next();
}
