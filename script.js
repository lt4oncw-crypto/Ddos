document.addEventListener('DOMContentLoaded', () => {
    // --- Terminal Typing Effect ---
    const terminalBody = document.getElementById('terminal-output');
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
            if (lineData.type === 'warning') textSpan.style.color = '#ffbd2e';
            
            p.appendChild(textSpan);
            
            // Insert before the cursor line
            const cursorLine = terminalBody.querySelector('.cursor-line');
            terminalBody.insertBefore(p, cursorLine);

            // Typing effect for the text
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

    // Trigger stats animation when in view
    const statsSection = document.getElementById('stats');
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            animateStats();
            observer.disconnect();
        }
    }, { threshold: 0.5 });

    observer.observe(statsSection);

    // --- Smooth Navbar Background Change ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.background = 'rgba(3, 3, 3, 0.95)';
            header.style.padding = '10px 0';
        } else {
            header.style.background = 'rgba(3, 3, 3, 0.8)';
            header.style.padding = '0';
        }
    });

    // --- Glitch Effect Interaction ---
    const glitchTitle = document.querySelector('.glitch');
    if (glitchTitle) {
        glitchTitle.addEventListener('mouseover', () => {
            glitchTitle.style.animationDuration = '0.1s';
        });
        glitchTitle.addEventListener('mouseleave', () => {
            glitchTitle.style.animationDuration = '5s';
        });
    }

    // --- Simulated "Live" Stats Updates ---
    setInterval(() => {
        const activeVal = document.getElementById('val-active');
        const current = parseInt(activeVal.textContent);
        const change = Math.floor(Math.random() * 5) - 2; // -2 to +2
        activeVal.textContent = Math.max(400, current + change);
    }, 3000);
});
