const fs = require('fs');

const requestHandler = (req, res) => {

    const { method, url, headers } = req;

    if(url === '/') {

        res.setHeader('Content-Type', 'text/html');

        res.write(`
        <html>
            <head>
                <title>Node JS Complete Guide</title>
            </head>        
            <body>
                <h1>Node JS Complete Guide: HOME PAGE</h1>
                <form action="/message" method="post">
                    <input name="message" type="text" />
                    <button type="submit">Submit</button>
                </form>
            </body>
        </html>
        `);

        return res.end();
    }


    if(url === '/message' && method.toLowerCase() === 'post') {

        const body = [];

        req.on('data', (chunk) => {
            body.push(chunk);
        });

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString();
            const message = parsedBody.split("=")[1];

            fs.writeFile('message.text', message, (err) => {

                res.writeHead(302, {
                    'Content-Type': "text/html",
                    'Location': "/"
                });

                return res.end();
            });
        });
    }
}

module.exports = requestHandler;
