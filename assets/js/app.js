document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('bg-canvas');
    const ctx = canvas.getContext('2d');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const orbitBeam = document.querySelector('.avatar-orbit-beam');
    const reticle = document.querySelector('.avatar-outer-reticle');
    let lastPulseKey = '';

    function syncOrbitPulse(now) {
        const orbitMs = 5200;
        const angle = ((now % orbitMs) / orbitMs) * 360;

        if (orbitBeam) {
            orbitBeam.style.transform = `rotate(${angle}deg)`;
        }

        const topHit = angle < 8 || angle > 352;
        const bottomHit = angle > 172 && angle < 188;

        if (topHit && lastPulseKey !== 'top') {
            if (reticle) {
                reticle.classList.remove('pulse-bottom');
                reticle.classList.remove('pulse-top');
                void reticle.offsetWidth;
                reticle.classList.add('pulse-top');
            }
            lastPulseKey = 'top';
        } else if (bottomHit && lastPulseKey !== 'bottom') {
            if (reticle) {
                reticle.classList.remove('pulse-top');
                reticle.classList.remove('pulse-bottom');
                void reticle.offsetWidth;
                reticle.classList.add('pulse-bottom');
            }
            lastPulseKey = 'bottom';
        } else if (!topHit && !bottomHit) {
            if (reticle) {
                reticle.classList.remove('pulse-top');
                reticle.classList.remove('pulse-bottom');
            }
            lastPulseKey = '';
        }

        requestAnimationFrame(syncOrbitPulse);
    }

    requestAnimationFrame(syncOrbitPulse);

    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;
    let particles = [];
    const mouse = { x: null, y: null, active: false };

    function getSettings() {
        const isMobile = window.innerWidth < 768;

        if (reducedMotion) {
            return {
                count: isMobile ? 8 : 14,
                maxDistance: isMobile ? 80 : 100,
                speedMultiplier: 0.24,
                mouseRadius: isMobile ? 45 : 70,
            };
        }

        if (isMobile) {
            return {
                count: Math.max(12, Math.min(18, Math.floor((width * height) / 20000))),
                maxDistance: 90,
                speedMultiplier: 0.34,
                mouseRadius: 70,
            };
        }

        return {
            count: Math.max(26, Math.min(42, Math.floor((width * height) / 17000))),
            maxDistance: 125,
            speedMultiplier: 0.44,
            mouseRadius: 120,
        };
    }

    let settings = getSettings();

    class Particle {
        constructor(isEdge = false) {
            this.init(isEdge);
        }

        init(forceEdge = false) {
            if (forceEdge || Math.random() < 0.48) {
                const side = Math.floor(Math.random() * 4);
                if (side === 0) {
                    this.x = Math.random() * (width * 0.22);
                    this.y = Math.random() * height;
                } else if (side === 1) {
                    this.x = width * 0.78 + Math.random() * (width * 0.22);
                    this.y = Math.random() * height;
                } else if (side === 2) {
                    this.x = Math.random() * width;
                    this.y = Math.random() * (height * 0.20);
                } else {
                    this.x = Math.random() * width;
                    this.y = height * 0.80 + Math.random() * (height * 0.20);
                }
            } else {
                this.x = Math.random() * width;
                this.y = Math.random() * height;
            }

            const speed = (Math.random() * 0.36 + 0.18) * settings.speedMultiplier;
            const angle = Math.random() * Math.PI * 2;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.sin(angle) * speed;
            this.baseRadius = Math.random() * 1.2 + 0.9;
            this.pulseSpeed = Math.random() * 0.015 + 0.008;
            this.pulsePhase = Math.random() * Math.PI * 2;
            this.isHighlight = Math.random() > 0.65;
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;
            this.pulsePhase += this.pulseSpeed;

            if (this.x < -25) this.x = width + 25;
            else if (this.x > width + 25) this.x = -25;
            if (this.y < -25) this.y = height + 25;
            else if (this.y > height + 25) this.y = -25;
        }

        draw() {
            const pulse = (Math.sin(this.pulsePhase) + 1) * 0.5;
            const alpha = (0.32 + pulse * 0.24) * (this.isHighlight ? 1.25 : 0.92);
            const currentRadius = this.baseRadius * (1 + pulse * 0.22);
            const glowRadius = this.isHighlight ? currentRadius * 4.8 : currentRadius * 3.4;

            const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, glowRadius);
            grad.addColorStop(0, `rgba(255, 255, 255, ${0.45 * alpha})`);
            grad.addColorStop(0.35, `rgba(255, 255, 255, ${0.14 * alpha})`);
            grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

            ctx.beginPath();
            ctx.arc(this.x, this.y, glowRadius, 0, Math.PI * 2);
            ctx.fillStyle = grad;
            ctx.fill();

            ctx.beginPath();
            ctx.arc(this.x, this.y, currentRadius * 0.8, 0, Math.PI * 2);
            ctx.shadowBlur = this.isHighlight ? 8 : 4;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.45)';
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.9})`;
            ctx.fill();
            ctx.shadowBlur = 0;
        }
    }

    function initParticles() {
        settings = getSettings();
        particles = [];
        const count = settings.count;
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(i < Math.floor(count * 0.48)));
        }
    }

    initParticles();

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        initParticles();
    });

    window.addEventListener('mousemove', (event) => {
        mouse.x = event.clientX;
        mouse.y = event.clientY;
        mouse.active = true;
    });

    window.addEventListener('mouseleave', () => {
        mouse.active = false;
        mouse.x = null;
        mouse.y = null;
    });

    window.addEventListener('touchstart', (event) => {
        if (event.touches && event.touches.length > 0) {
            mouse.x = event.touches[0].clientX;
            mouse.y = event.touches[0].clientY;
            mouse.active = true;
        }
    }, { passive: true });

    window.addEventListener('touchmove', (event) => {
        if (event.touches && event.touches.length > 0) {
            mouse.x = event.touches[0].clientX;
            mouse.y = event.touches[0].clientY;
            mouse.active = true;
        }
    }, { passive: true });

    window.addEventListener('touchend', () => {
        mouse.active = false;
        mouse.x = null;
        mouse.y = null;
    });

    function animate() {
        if (settings.count === 0) {
            ctx.clearRect(0, 0, width, height);
            return;
        }

        ctx.clearRect(0, 0, width, height);

        const maxDist = settings.maxDistance;
        const maxDistSq = maxDist * maxDist;

        for (let i = 0; i < particles.length; i++) {
            particles[i].update();

            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distSq = dx * dx + dy * dy;

                if (distSq < maxDistSq) {
                    const dist = Math.sqrt(distSq);
                    const ratio = 1 - dist / maxDist;
                    const baseAlpha = Math.pow(ratio, 1.4) * 0.16;

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${baseAlpha * 0.35})`;
                    ctx.lineWidth = ratio > 0.6 ? 2.4 : 1.8;
                    ctx.shadowBlur = 4;
                    ctx.shadowColor = 'rgba(255, 255, 255, 0.3)';
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${baseAlpha})`;
                    ctx.lineWidth = ratio > 0.6 ? 0.9 : 0.65;
                    ctx.shadowBlur = 0;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }

            if (mouse.active && mouse.x != null && mouse.y != null) {
                const dx = particles[i].x - mouse.x;
                const dy = particles[i].y - mouse.y;
                const distSq = dx * dx + dy * dy;
                const mouseRadSq = settings.mouseRadius * settings.mouseRadius;

                if (distSq < mouseRadSq) {
                    const dist = Math.sqrt(distSq);
                    const ratio = 1 - dist / settings.mouseRadius;
                    const beamAlpha = Math.pow(ratio, 1.2) * 0.38;

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${beamAlpha * 0.4})`;
                    ctx.lineWidth = 2.6;
                    ctx.shadowBlur = 5;
                    ctx.shadowColor = 'rgba(255, 255, 255, 0.45)';
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();

                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(255, 255, 255, ${beamAlpha})`;
                    ctx.lineWidth = 1.0;
                    ctx.shadowBlur = 0;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }

        for (let i = 0; i < particles.length; i++) {
            particles[i].draw();
        }

        requestAnimationFrame(animate);
    }

    animate();

    const playPauseBtn = document.getElementById('play-pause-btn');
    const btnText = document.getElementById('btn-text');
    const audioControls = document.querySelector('.audio-controls');
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    const audioContext = AudioCtx ? new AudioCtx() : null;
    let brownNoiseNode = null;
    let brownGainNode = null;
    let isPlayingBrownNoise = false;

    function createBrownNoiseBuffer(context) {
        const buffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
        const channelData = buffer.getChannelData(0);
        let lastOut = 0;

        for (let i = 0; i < channelData.length; i++) {
            const white = Math.random() * 2 - 1;
            lastOut = (lastOut + 0.02 * white) / 1.02;
            channelData[i] = lastOut * 0.25;
        }

        return buffer;
    }

    function startBrownNoise() {
        if (!audioContext) {
            return;
        }

        if (audioContext.state === 'suspended') {
            audioContext.resume();
        }

        if (brownNoiseNode) {
            brownNoiseNode.stop();
            brownNoiseNode.disconnect();
        }

        const source = audioContext.createBufferSource();
        source.buffer = createBrownNoiseBuffer(audioContext);
        source.loop = true;

        const filter = audioContext.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.value = 180;
        filter.Q.value = 0.5;

        const gain = audioContext.createGain();
        gain.gain.value = 0.09;

        source.connect(filter);
        filter.connect(gain);
        gain.connect(audioContext.destination);
        source.start();

        brownNoiseNode = source;
        brownGainNode = gain;
        isPlayingBrownNoise = true;
    }

    function stopBrownNoise() {
        if (brownNoiseNode) {
            brownNoiseNode.stop();
            brownNoiseNode.disconnect();
            brownNoiseNode = null;
        }

        if (brownGainNode) {
            brownGainNode.disconnect();
            brownGainNode = null;
        }

        isPlayingBrownNoise = false;
    }

    if (audioControls) {
        audioControls.addEventListener('mouseover', () => {
            audioControls.style.transform = 'scale(1.05)';
            audioControls.style.borderColor = 'rgba(255, 255, 255, 0.35)';
        });

        audioControls.addEventListener('mouseout', () => {
            audioControls.style.transform = 'scale(1)';
            audioControls.style.borderColor = 'rgba(255, 255, 255, 0.12)';
        });
    }

    if (playPauseBtn) {
        playPauseBtn.addEventListener('click', async () => {
            if (!audioContext) {
                btnText.textContent = 'Audio unsupported';
                return;
            }

            try {
                if (isPlayingBrownNoise) {
                    stopBrownNoise();
                    btnText.textContent = 'Play Brown Noise';
                    const icon = document.querySelector('.icon');
                    if (icon) icon.textContent = '🎧';
                } else {
                    startBrownNoise();
                    btnText.textContent = 'Pause Brown Noise';
                    const icon = document.querySelector('.icon');
                    if (icon) icon.textContent = '🔊';
                }
            } catch (error) {
                console.warn('Audio playback blocked:', error);
                btnText.textContent = 'Tap to enable sound';
                setTimeout(() => {
                    if (!isPlayingBrownNoise) {
                        btnText.textContent = 'Play Brown Noise';
                        const icon = document.querySelector('.icon');
                        if (icon) icon.textContent = '🎧';
                    }
                }, 1200);
            }
        });
    }

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.card, .section-title, .ai-demo, .tech-badge');
    elementsToAnimate.forEach((element) => {
        element.classList.add('reveal-on-scroll');
        observer.observe(element);
    });
});
