document.addEventListener('DOMContentLoaded', () => {
    const allProjects = [
        {
            id: 'robotics-x-computer-vision',
            title: 'Robotics x Computer Vision',
            meta: 'Robots · Vision · Systems',
            date: '2026',
            summary: 'Containerized perception stack for robots using WebRTC, computer vision, and structured scene understanding.',
            content: [
                'This project explores how robots can perceive and reason over dynamic environments in real time. The system ingests live video streams and converts them into structured metadata such as object detections, spatial relationships, and estimated distance cues.',
                'The focus was on building a practical, portable stack that works even under constrained hardware and fragmented edge environments. I designed it to be containerized, modular, and easy to test in real-world deployments.',
                'The work sits at the intersection of machine perception, robotics systems engineering, and product design. It gave me a strong understanding of how model outputs translate into operational decisions in the physical world.'
            ]
        },
        {
            id: 'berlin-citizen-fund',
            title: 'Berlin Citizen Fund',
            meta: 'CivicTech · Finance · GovTech',
            date: '2026',
            summary: 'Democratic, taxpayer-funded startup investment platform concept for Berlin.',
            content: [
                'This project looked at how public funding could become more transparent, participatory, and community-driven. The concept was a civic investment platform that allowed citizens to contribute to local startup decisions in a structured way.',
                'The challenge was to connect democratic values with entrepreneurial funding. I focused on designing a system that could support public accountability while still being practical enough for early-stage innovation ecosystems.',
                'The work strengthened my interest in AI, governance, and public-interest technology—especially where digital systems can improve participation, trust, and inclusive decision-making.'
            ]
        },
        {
            id: 'neural-network-visualization-platform',
            title: 'Neural Network Visualization Platform',
            meta: 'XAI · PyTorch · Research',
            date: '2025',
            summary: 'Interactive explainability tooling for model inspection and neuron-level understanding using PyTorch and D3.',
            content: [
                'I built an interactive platform to make neural network behavior more interpretable for non-experts and researchers alike. The system visualizes model activations, edge behavior, and feature-level patterns in ways that are easier to reason about than raw parameter tables.',
                'The project centered on the idea that explainability should be usable, not just theoretical. By combining an interactive front end with model introspection, I was able to make the inner workings of a network more legible and better suited for research communication.',
                'This work also fed directly into my interest in building human-centered AI systems: when users understand the model, their trust and decision-making become much more grounded.'
            ]
        },
        {
            id: 'smart-kitchen-ai-system',
            title: 'Smart Kitchen AI System',
            meta: 'IoT · AI · UX',
            date: '2025',
            summary: 'Voice-enabled grocery intelligence platform with expiry tracking, recommendations, and edge deployment logic.',
            content: [
                'This project explored how AI and everyday domestic tools could create a more seamless, intelligent living environment. I built a grocery-assistant concept that combined object detection, inventory tracking, and conversational AI to support decision-making in the kitchen.',
                'The system integrated voice interaction, recommendation logic, and recipe generation based on what was available. The broad aim was to reduce friction in routine tasks while still keeping the experience natural and human-centered.',
                'It was a compelling example of how AI systems can become useful when they sit directly inside a real context rather than in an abstract tool-only interface.'
            ]
        },
        {
            id: 'ai-assistant',
            title: 'AI Assistant',
            meta: 'LLMs · RAG · Product',
            date: '2025',
            summary: 'Real-time AI assistant powered by video input, retrieval infrastructure, and enterprise knowledge access.',
            content: [
                'This hackathon project focused on building a fast, useful AI assistant for real-world knowledge work. The system combined multimodal input, retrieval pipelines, and user guidance to help navigate large amounts of reference material in real time.',
                'What made the project interesting was the pressure to move from rough concept to working product under a very short timeline. That forced clarity around the problem definition, information flow, and user value.',
                'It was a strong example of how lightweight product engineering and AI orchestration can create highly useful tools when they are built around the actual usage context.'
            ]
        },
        {
            id: 'ai-calling-chat-agent',
            title: 'AI Calling & Chat Agent',
            meta: 'Voice · Automation · Support',
            date: '2025',
            summary: 'Automation platform for customer support tasks using voice, chat, and workflow orchestration.',
            content: [
                'The idea behind this project was to automate repetitive support workflows without losing the human feel of customer interaction. I designed a system that could handle inbound queries, schedule actions, and support chat-based communication at scale.',
                'The project brought together workflow automation, AI conversation design, and business-process thinking. It highlighted to me how much value can be created when AI is embedded into operational systems rather than used as a isolated interface feature.',
                'I was especially interested in the balance between convenience and trust—making automation useful without removing transparency or human judgment where it matters.'
            ]
        },
        {
            id: 'bachelors-thesis',
            title: "Bachelor's Thesis",
            meta: 'Forecasting · Research · Time Series',
            date: '2025',
            summary: 'Transformer-based forecasting for groundwater level prediction across distributed monitoring stations.',
            content: [
                'My bachelor thesis focused on applying deep learning to a real multivariate time series forecasting task. The project involved analyzing distributed environmental data and testing whether transformer-based models could capture the complex temporal dynamics of groundwater levels.',
                'I was particularly interested in the gap between model performance and real-world interpretability. Forecasting tasks are often judged purely by metrics, but I wanted to understand the spatiotemporal structure behind the results as well.',
                'The project strengthened both my technical confidence and my research instincts, especially in the translation of abstract methods into meaningful applied analysis.'
            ]
        },
        {
            id: 'plant-disease-classification',
            title: 'Plant Disease Classification',
            meta: 'Deep Learning · CV · Agriculture',
            date: '2024',
            summary: 'CNN-based image classification for early plant disease identification and evaluation under real-world data conditions.',
            content: [
                'This project focused on the challenge of using computer vision to detect plant diseases from image data. The approach combined model experimentation with careful evaluation of preprocessing steps, augmentation pipelines, and class imbalance handling.',
                'I worked through multiple model iterations to understand how architecture choices affect performance in agricultural contexts, where data and labeling quality can vary considerably. The goal was not only to build a working classifier, but to document the reasoning behind the design decisions.',
                'This project reinforced my appreciation for applied ML: the technical quality of a model matters, but so does the clarity of how it was built, tested, and interpreted.'
            ]
        },
        {
            id: 'ai-assignment-assistant',
            title: 'AI Assignment Assistant',
            meta: 'EdTech · UX · Product',
            date: '2024',
            summary: 'AI-powered assignment support tool for spelling, grammar, tone, and educational feedback.',
            content: [
                'This project explored how AI can support learning in a practical and constructive way. The assistant was designed to help with structure, spelling, tone, and clarity without replacing the learner’s agency in the process.',
                'The core insight was that educational tools work best when they are warm, specific, and context-sensitive. It was less about producing polished output and more about helping students improve through actionable feedback.',
                'This project also sharpened my interest in building AI products that are useful outside of purely technical audiences and that genuinely support human growth.'
            ]
        }
    ];

    const projects = allProjects.filter((project) => project.id !== 'bachelors-thesis');
    const researchItems = allProjects.filter((project) => project.id === 'bachelors-thesis');

    const researchNav = document.getElementById('research-nav');
    const researchDetail = document.getElementById('research-detail');
    let activeProjectId = projects[0].id;

    function renderResearchNavigation() {
        if (!researchNav) return;

        const navSections = [
            { label: 'Projects', items: projects },
            { label: 'Research', items: researchItems }
        ];

        researchNav.innerHTML = navSections.map((section) => {
            const sectionItems = section.items.map((project) => {
                const isActive = project.id === activeProjectId;
                return `
                    <button class="research-item ${isActive ? 'is-active' : ''}" type="button" data-project-id="${project.id}" aria-pressed="${isActive}">
                        <span class="research-item-header">
                            <span class="research-item-title">${project.title}</span>
                        </span>
                        <span class="research-item-meta">${project.meta}</span>
                    </button>
                `;
            }).join('');

            return `
                <div class="research-nav-section">
                    <div class="research-nav-label">${section.label}</div>
                    <div class="research-nav-group">${sectionItems}</div>
                </div>
            `;
        }).join('');

        researchNav.querySelectorAll('.research-item').forEach((button) => {
            button.addEventListener('click', () => {
                activeProjectId = button.dataset.projectId;
                renderResearchNavigation();
                renderResearchDetail();
            });
        });
    }

    function renderResearchDetail() {
        if (!researchDetail) return;

        const project = [...projects, ...researchItems].find((item) => item.id === activeProjectId) || projects[0];

        researchDetail.innerHTML = `
            <article class="research-detail-card">
                <div class="research-detail-header">
                    <div class="research-detail-title-group">
                        <span class="research-date">${project.date}</span>
                        <h2 class="research-detail-title">${project.title}</h2>
                        <div class="research-tags">
                            ${project.meta.split('·').map((tag) => `<span class="research-tag">${tag.trim()}</span>`).join('')}
                        </div>
                    </div>
                </div>

                <div class="research-detail-body">
                    ${project.content.map((paragraph) => `
                        <p>${paragraph}</p>
                    `).join('')}
                </div>
            </article>
        `;

        const card = researchDetail.querySelector('.research-detail-card');
        if (card) {
            card.classList.remove('research-animate-in');
            void card.offsetWidth;
            card.classList.add('research-animate-in');
        }
    }

    renderResearchNavigation();
    renderResearchDetail();

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
