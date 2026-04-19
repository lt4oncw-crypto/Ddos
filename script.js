document.addEventListener('DOMContentLoaded', () => {
    // --- Terminal Typing Effect ---
    const terminalBody = document.getElementById('terminal-output');
    const cursorLine = terminalBody.querySelector('.cursor-line');
    
    const lines = [
        { text: 'uploading exploit payloads...', type: 'info' },
        { text: 'establishing p2p botnet relay...', type: 'info' },
        { text: 'connection secured via 256-bit tor bridge.', type: 'success' },
        { text: 'initiating layer 7 overhead saturation...', type: 'warning' },
        { text: 'packet loss: 0% | latency: 12ms', type: 'info' },
        { text: 'target response time increasing...', type: 'warning' },
        { text: 'target down. status: 503 service unavailable', type: 'success' }
    ];

    let lineIndex = 0;

    function typeTerminalLine() {
        if (lineIndex < lines.length) {
            const lineData = lines[lineIndex];
            const p = document.createElement('p');
            p.className = 'line';
            
            const prompt = document.createElement('span');
            prompt.className = 'prompt';
            prompt.textContent = '$ ';
            p.appendChild(prompt);

            const textSpan = document.createElement('span');
            if (lineData.type === 'success') textSpan.className = 'success';
            if (lineData.type === 'warning') textSpan.style.color = '#888888';
            
            p.appendChild(textSpan);
            terminalBody.insertBefore(p, cursorLine);

            let charIndex = 0;
            const typeChar = () => {
                if (charIndex < lineData.text.length) {
                    textSpan.textContent += lineData.text[charIndex];
                    charIndex++;
                    setTimeout(typeChar, 30);
                } else {
                    lineIndex++;
                    setTimeout(typeTerminalLine, 1000);
                }
            };
            typeChar();
        }
    }

    setTimeout(typeTerminalLine, 2000);

    // --- Animated Stat Counters ---
    const stats = [
        { id: 'val-active', target: 422, suffix: '' },
        { id: 'val-nodes', target: 1024, suffix: '' },
        { id: 'val-throughput', target: 2.4, suffix: ' TB/s', decimals: 1 }
    ];

    const animateStats = () => {
        stats.forEach(stat => {
            const element = document.getElementById(stat.id);
            let current = 0;
            const increment = stat.target / 100;
            const update = () => {
                current += increment;
                if (current < stat.target) {
                    element.textContent = stat.decimals 
                        ? current.toFixed(stat.decimals) + stat.suffix
                        : Math.floor(current) + stat.suffix;
                    requestAnimationFrame(update);
                } else {
                    element.textContent = stat.target + stat.suffix;
                }
            };
            update();
        });
    };

    const statsSection = document.getElementById('stats');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(statsSection);

    // --- Modal Logic ---
    const modalOverlay = document.getElementById('modal-overlay');
    const modalTitle = document.getElementById('modal-title');
    const modalContent = document.getElementById('modal-content');
    const modalClose = document.getElementById('modal-close');

    function openModal(title, content) {
        modalTitle.textContent = title;
        modalContent.innerHTML = content;
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closeModal() {
        modalOverlay.classList.remove('active');
        document.body.style.overflow = 'auto';
    }

    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeModal();
    });

    // --- Button Event Listeners ---
    
    // Login Button
    document.getElementById('login-btn').addEventListener('click', () => {
        openModal('SECURE LOGIN', `
            <div class="modal-form">
                <h3>Node Access Control</h3>
                <p>Enter your credentials to synchronize with the net mesh.</p>
                <input type="text" placeholder="ACCESS_KEY_ID">
                <input type="password" placeholder="SEC_TOKEN">
                <button class="btn" id="modal-submit-login">VERIFY IDENTITY</button>
            </div>
        `);
        
        document.getElementById('modal-submit-login').addEventListener('click', function() {
            this.innerHTML = '<span class="loader"></span> VERIFYING...';
            this.disabled = true;
            setTimeout(() => {
                const modalBody = document.querySelector('.modal-body');
                modalBody.innerHTML = `
                    <div style="text-align: center; padding: 2rem 0;">
                        <span class="success" style="font-size: 3rem;">✓</span>
                        <h3 style="margin-top: 1rem;">IDENTITY CONFIRMED</h3>
                        <p>Welcome back, Operator. Nodes are ready for instructions.</p>
                        <button class="btn" onclick="location.reload()">ENTER DASHBOARD</button>
                    </div>
                `;
            }, 2000);
        });
    });

    // Deploy Sequence Button
    document.getElementById('cta-start').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Clear all previous lines except the cursor
        while (terminalBody.firstChild !== cursorLine) {
            terminalBody.removeChild(terminalBody.firstChild);
        }

        const heavyLines = [
            { text: 'CLEANING LOCAL CACHE...', type: 'info' },
            { text: 'PROXY CHAIN ROTATION ACTIVE (12 HOPS)', type: 'info' },
            { text: 'INJECTING PACKET OVERHEAD [MAX_LOAD]', type: 'warning' },
            { text: 'SATURATING TARGET BANDWIDTH...', type: 'warning' },
            { text: 'ATTACK DEPLOYED: L7_JS_ENGINE_STRESS', type: 'success' },
            { text: 'MONITORING INFRASTRUCTURE RESPONSE...', type: 'info' }
        ];

        let hIndex = 0;
        function typeHeavy() {
            if (hIndex < heavyLines.length) {
                const line = heavyLines[hIndex];
                const p = document.createElement('p');
                p.className = 'line';
                p.innerHTML = `<span class="prompt">$</span> <span class="${line.type === 'success' ? 'success' : ''}" style="${line.type === 'warning' ? 'color: #888' : ''}">${line.text}</span>`;
                terminalBody.insertBefore(p, cursorLine);
                hIndex++;
                setTimeout(typeHeavy, 800);
            }
        }
        setTimeout(typeHeavy, 500);
    });

    // Documentation Button
    document.getElementById('cta-docs').addEventListener('click', () => {
        openModal('SYSTEM DOCUMENTATION', `
            <h3>API V4 Specification</h3>
            <p>Our documentation is currently being migrated to an encrypted layer. Access will be restored shortly.</p>
            <div style="padding: 1rem; border: 1px solid rgba(255,255,255,0.1); background: rgba(0,0,0,0.3);">
                <code>// Endpoint: /v4/deploy<br>// Auth: Bearer <TOKEN></code>
            </div>
            <button class="btn" onclick="document.getElementById('modal-close').click()" style="margin-top: 2rem; width: 100%;">ACKNOWLEDGE</button>
        `);
    });

    // Pricing Buttons
    const handlePurchase = (plan) => {
        openModal('SECURE CHECKOUT', `
            <div class="modal-form">
                <h3>Tier: ${plan}</h3>
                <p>Synchronizing payment gateway with cryptographically secure node.</p>
                <div style="border: 1px solid #ffffff; padding: 2rem; text-align: center; margin-bottom: 2rem;">
                    <span style="font-size: 0.8rem; letter-spacing: 2px;">WAITING FOR CRYPTO HANDSHAKE...</span><br>
                    <div class="loader" style="margin-top: 1rem;"></div>
                </div>
                <input type="text" placeholder="WALLET_ADDRESS (BTC/ETH/SOL)">
                <button class="btn" id="confirm-purchase">AUTHORIZE TRANSACTION</button>
            </div>
        `);

        document.getElementById('confirm-purchase').addEventListener('click', function() {
            this.innerHTML = '<span class="loader"></span> AUTHORIZING...';
            this.style.opacity = '0.5';
            setTimeout(() => {
                document.querySelector('.modal-body').innerHTML = `
                    <div style="text-align: center; padding: 2rem 0;">
                        <h3 style="color: #ffffff;">TRANSACTION PENDING</h3>
                        <p>Synchronization will complete after 3 blockchain confirmations.</p>
                        <button class="btn" onclick="location.reload()">RETURN TO TERMINAL</button>
                    </div>
                `;
            }, 3000);
        });
    };

    document.getElementById('buy-basic').addEventListener('click', () => handlePurchase('INITIATE'));
    document.getElementById('buy-advanced').addEventListener('click', () => handlePurchase('OPERATOR'));
    document.getElementById('buy-enterprise').addEventListener('click', () => handlePurchase('EXECUTIVE'));

    // --- Navbar Scroll Effect ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(0, 0, 0, 0.95)';
            header.style.height = '70px';
        } else {
            header.style.background = 'rgba(0, 0, 0, 0.8)';
            header.style.height = '80px';
        }
    });

    // --- Footer Links Simulation ---
    document.querySelectorAll('footer a').forEach(link => {
        link.addEventListener('click', (e) => {
            if (link.getAttribute('href') === '#') {
                e.preventDefault();
                alert('Terminal Link: Encryption path not found.');
            }
        });
    });
});
