// Back side of the ID badge. Edit the texts here.
const ID_BADGE_BACK = {
    quote: 'You’re not tired of life,\nyou’re tired of not living.', // \n = line break
    signature: 'Sarib Samdani', // read out to screen readers; the drawn strokes are ID_BADGE_SIGNATURE below
    signatureLabel: 'Signature'
};

document.addEventListener('DOMContentLoaded', () => {
    const badge = document.querySelector('[data-id-badge]');
    if (!badge) return;

    const stage = badge.querySelector('.id-badge__stage');
    const tilt = badge.querySelector('.id-badge__tilt');
    const front = badge.querySelector('.id-face--front');
    const back = badge.querySelector('.id-face--back');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    function el(tag, className, text) {
        const node = document.createElement(tag);
        if (className) node.className = className;
        if (text !== undefined) node.textContent = text;
        return node;
    }

    // Signature that writes itself with a ballpoint pen whenever the back is shown
    function createSigning(label) {
        const NS = 'http://www.w3.org/2000/svg';
        const WRITE_MS = 1900; // the name, at constant pen speed
        const FLOURISH_MS = 420;
        const START_DELAY = 420; // let the flip settle first
        const INK_FADE = 160; // outline strokes hand over to the solid glyph

        const svgEl = (tag, attrs = {}) => {
            const node = document.createElementNS(NS, tag);
            Object.entries(attrs).forEach(([key, value]) => node.setAttribute(key, value));
            return node;
        };

        const sig = ID_BADGE_SIGNATURE;
        const svg = svgEl('svg', { viewBox: sig.viewBox, role: 'img', 'aria-label': label, class: 'id-sig' });
        const defs = svgEl('defs');
        const ink = svgEl('g', { transform: 'rotate(-4)' });

        const glyphs = sig.glyphs.map((contours) => {
            const group = svgEl('g');
            const fill = svgEl('path', { d: contours.join(''), class: 'id-sig__fill' });
            const strokes = contours.map((d) => svgEl('path', { d, class: 'id-sig__stroke' }));
            group.append(fill, ...strokes);
            ink.append(group);
            return { fill, strokes };
        });

        const mask = svgEl('mask', { id: 'id-sig-flourish-mask' });
        const maskLine = svgEl('path', { d: sig.flourish.line, class: 'id-sig__mask-line' });
        mask.append(maskLine);
        defs.append(mask, createPenGradient());
        const flourish = svgEl('path', { d: sig.flourish.shape, class: 'id-sig__flourish', mask: 'url(#id-sig-flourish-mask)' });

        const pen = createPen();
        ink.append(flourish, pen);
        svg.append(defs, ink);

        function createPenGradient() {
            const gradient = svgEl('linearGradient', { id: 'id-sig-pen-body', x1: 0, y1: 0, x2: 0, y2: 1 });
            [['0', '#fbfbfd'], ['0.45', '#c9c9cf'], ['0.55', '#8e8e96'], ['1', '#d6d6db']].forEach(([offset, color]) => {
                gradient.append(svgEl('stop', { offset, 'stop-color': color }));
            });
            return gradient;
        }

        // slim ballpoint, drawn with its tip at 0,0 and the body along +x
        function createPen() {
            const group = svgEl('g', { class: 'id-sig__pen', opacity: 0 });
            group.append(
                svgEl('path', { d: 'M0 0L13 -2.7L13 2.7Z', fill: '#d9d9de' }),
                svgEl('circle', { cx: 0.7, cy: 0, r: 0.8, fill: '#1a1a1f' }),
                svgEl('rect', { x: 13, y: -3.1, width: 17, height: 6.2, rx: 1, fill: '#26262c' }),
                svgEl('rect', { x: 30, y: -3.4, width: 84, height: 6.8, rx: 1.6, fill: 'url(#id-sig-pen-body)' }),
                svgEl('rect', { x: 114, y: -3.4, width: 9, height: 6.8, rx: 2.4, fill: '#26262c' }),
                svgEl('rect', { x: 84, y: -5.6, width: 34, height: 1.9, rx: 0.95, fill: '#e9e9ee' })
            );
            return group;
        }

        // timeline: one segment per contour, short pen lifts in between, then the flourish.
        // Built lazily, because path lengths need the SVG to be in the document.
        const segments = [];
        let flourishLength = 0;
        let writeEnd = 0;
        let flourishStart = 0;
        let total = 0;

        function buildTimeline() {
            if (segments.length) return;
            glyphs.forEach((glyph, glyphIndex) => glyph.strokes.forEach((path) => {
                segments.push({ path, length: path.getTotalLength(), glyphIndex });
            }));
            flourishLength = maskLine.getTotalLength();
            maskLine.style.strokeDasharray = `${flourishLength} ${flourishLength}`;

            const writeDistance = segments.reduce((sum, seg) => sum + seg.length / 2, 0);
            const speed = writeDistance / WRITE_MS;
            let cursor = 0;
            let previousEnd = null;
            segments.forEach((seg) => {
                const start = seg.path.getPointAtLength(0);
                if (previousEnd) cursor += Math.min(140, Math.max(30, Math.hypot(start.x - previousEnd.x, start.y - previousEnd.y) / (speed * 3)));
                seg.start = cursor;
                seg.duration = seg.length / 2 / speed;
                cursor += seg.duration;
                seg.from = start;
                seg.to = seg.path.getPointAtLength(seg.length / 2);
                previousEnd = seg.to;
                glyphs[seg.glyphIndex].done = cursor;
            });
            writeEnd = cursor;
            flourishStart = writeEnd + 90;
            total = flourishStart + FLOURISH_MS + 260;
        }

        let frame = 0;
        let startTime = 0;
        let resetTimer = 0;
        const penPos = { x: 0, y: 0 };

        // reveal a closed outline from its start point in both directions, so the
        // stroke grows forward like ink instead of being traced around its edge
        function setProgress(seg, progress) {
            const d = (seg.length / 2) * progress;
            seg.path.style.strokeDasharray = `${d} ${Math.max(0, seg.length - 2 * d)} ${d} 0`;
        }

        function placePen(x, y, opacity) {
            penPos.x = x;
            penPos.y = y;
            pen.setAttribute('transform', `translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(-58)`);
            pen.setAttribute('opacity', opacity.toFixed(3));
        }

        function render(t) {
            let target = null;
            segments.forEach((seg, i) => {
                const progress = Math.min(1, Math.max(0, (t - seg.start) / seg.duration));
                setProgress(seg, progress);
                if (t >= seg.start && t <= seg.start + seg.duration) {
                    const d = (seg.length / 2) * progress;
                    const a = seg.path.getPointAtLength(d);
                    const b = seg.path.getPointAtLength(seg.length - d);
                    target = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
                } else if (!target && i > 0 && t > segments[i - 1].start + segments[i - 1].duration && t < seg.start) {
                    const prev = segments[i - 1];
                    const k = (t - (prev.start + prev.duration)) / (seg.start - prev.start - prev.duration);
                    target = { x: prev.to.x + (seg.from.x - prev.to.x) * k, y: prev.to.y + (seg.from.y - prev.to.y) * k };
                }
            });

            glyphs.forEach((glyph) => {
                const k = Math.min(1, Math.max(0, (t - glyph.done) / INK_FADE));
                glyph.fill.style.fillOpacity = k;
                glyph.strokes.forEach((path) => { path.style.strokeOpacity = 1 - k; });
            });

            const f = Math.min(1, Math.max(0, (t - flourishStart) / FLOURISH_MS));
            const eased = 1 - Math.pow(1 - f, 2);
            maskLine.style.strokeDashoffset = flourishLength * (1 - eased);
            if (t >= writeEnd && t < flourishStart) {
                const k = (t - writeEnd) / (flourishStart - writeEnd);
                const from = segments[segments.length - 1].to;
                const to = maskLine.getPointAtLength(0);
                target = { x: from.x + (to.x - from.x) * k, y: from.y + (to.y - from.y) * k };
            } else if (f > 0 && f < 1) {
                target = maskLine.getPointAtLength(flourishLength * eased);
            }

            // pen fades in at the first stroke and lifts away after the flourish
            const fadeIn = Math.min(1, Math.max(0, (t + 120) / 120));
            const lift = Math.min(1, Math.max(0, (t - flourishStart - FLOURISH_MS) / 260));
            if (target) {
                const smooth = penPos.x || penPos.y ? 0.55 : 1;
                placePen(penPos.x + (target.x - penPos.x) * smooth, penPos.y + (target.y - penPos.y) * smooth, fadeIn);
            } else if (lift > 0) {
                placePen(penPos.x + 1.5, penPos.y - 2, 1 - lift);
            }
        }

        function tick(now) {
            const t = now - startTime;
            render(t);
            frame = t < total ? requestAnimationFrame(tick) : 0;
        }

        function stop() {
            cancelAnimationFrame(frame);
            frame = 0;
            clearTimeout(resetTimer);
        }

        function reset() {
            buildTimeline();
            stop();
            penPos.x = 0;
            penPos.y = 0;
            const first = segments[0].from;
            render(-Infinity);
            placePen(first.x, first.y, 0);
        }

        function finish() {
            buildTimeline();
            stop();
            render(total);
            pen.setAttribute('opacity', 0);
        }

        function play() {
            if (reducedMotion.matches) {
                finish();
                return;
            }
            reset();
            startTime = performance.now() + START_DELAY;
            frame = requestAnimationFrame(tick);
        }

        // reset once the back has turned away, so the next flip writes it again
        function hide() {
            stop();
            resetTimer = setTimeout(reset, 750);
        }

        return { svg, play, hide, reset };
    }

    function renderBack() {
        const data = ID_BADGE_BACK;

        const quote = el('blockquote', 'id-back__quote');
        // non-breaking hyphens keep words like "self-disciplined" on one line
        quote.append(el('p', '', data.quote.replace(/-/g, '\u2011')));

        const sig = el('div', 'id-back__sig');
        sig.append(signing.svg);

        const signature = el('div', 'id-back__signature');
        signature.append(sig, el('span', 'id-back__sig-label', data.signatureLabel));

        const texture = el('span', 'id-face__texture');
        const glare = el('span', 'id-face__glare');
        const slot = el('span', 'id-face__slot');
        [texture, glare, slot].forEach((node) => node.setAttribute('aria-hidden', 'true'));

        back.replaceChildren(texture, glare, slot, el('div', 'id-back__stripe'), quote, signature);
    }

    const signing = createSigning(ID_BADGE_BACK.signature);
    renderBack();
    signing.reset();

    // Flip
    let flipped = false;

    function setFlipped(next) {
        flipped = next;
        badge.classList.toggle('is-flipped', flipped);
        tilt.setAttribute('aria-pressed', String(flipped));
        tilt.setAttribute('aria-describedby', flipped ? back.id : front.id);
        front.setAttribute('aria-hidden', String(flipped));
        back.setAttribute('aria-hidden', String(!flipped));
        if (flipped) signing.play();
        else signing.hide();
    }

    tilt.addEventListener('click', () => {
        // don't flip when the click just finished selecting text on the card
        const selection = window.getSelection();
        if (selection && !selection.isCollapsed && tilt.contains(selection.anchorNode)) return;
        setFlipped(!flipped);
    });

    tilt.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (!event.repeat) setFlipped(!flipped);
        } else if (event.key === ' ') {
            event.preventDefault();
            stage.classList.add('is-pressed');
        }
    });

    tilt.addEventListener('keyup', (event) => {
        if (event.key !== ' ') return;
        stage.classList.remove('is-pressed');
        setFlipped(!flipped);
    });

    // Press feedback (mouse and touch)
    const release = () => stage.classList.remove('is-pressed');
    tilt.addEventListener('pointerdown', (event) => {
        if (event.button === 0) stage.classList.add('is-pressed');
    });
    ['pointerup', 'pointercancel', 'pointerleave'].forEach((type) => tilt.addEventListener(type, release));
    tilt.addEventListener('blur', release);

    // Cursor tilt, glare and lift: fine pointers only, spring-driven in rAF
    const MAX_TILT = 10;
    const LIFT_SCALE = 1.03;
    const STIFFNESS = 170;
    const DAMPING = 20;
    const keys = ['rx', 'ry', 's', 'lift'];
    const current = { rx: 0, ry: 0, s: 1, lift: 0 };
    const velocity = { rx: 0, ry: 0, s: 0, lift: 0 };
    const target = { rx: 0, ry: 0, s: 1, lift: 0 };
    const glare = { x: 50, y: 30 };
    let hovering = false;
    let rect = null;
    let frame = 0;
    let lastTime = 0;

    const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

    function canTilt(event) {
        return event.pointerType === 'mouse' && finePointer.matches && !reducedMotion.matches;
    }

    function aim(event) {
        if (!rect) rect = stage.getBoundingClientRect();
        const nx = clamp((event.clientX - rect.left) / rect.width, 0, 1);
        const ny = clamp((event.clientY - rect.top) / rect.height, 0, 1);
        glare.x = nx * 100;
        glare.y = ny * 100;
        target.ry = (nx - 0.5) * 2 * MAX_TILT;
        target.rx = -(ny - 0.5) * 2 * MAX_TILT;
    }

    function render() {
        const atRest = !hovering && keys.every((key) => current[key] === target[key]);
        if (atRest) {
            // drop the inline transform so text renders crisp at rest
            tilt.style.removeProperty('transform');
            tilt.style.removeProperty('--lift');
            return;
        }
        tilt.style.transform = `rotateX(${current.rx.toFixed(3)}deg) rotateY(${current.ry.toFixed(3)}deg) scale(${current.s.toFixed(4)})`;
        tilt.style.setProperty('--lift', clamp(current.lift, 0, 1).toFixed(3));
        tilt.style.setProperty('--gx', glare.x.toFixed(2));
        tilt.style.setProperty('--gy', glare.y.toFixed(2));
    }

    function step(now) {
        const dt = Math.min((now - lastTime) / 1000, 1 / 30);
        lastTime = now;
        let moving = false;

        keys.forEach((key) => {
            const accel = STIFFNESS * (target[key] - current[key]) - DAMPING * velocity[key];
            velocity[key] += accel * dt;
            current[key] += velocity[key] * dt;
            if (Math.abs(target[key] - current[key]) < 1e-3 && Math.abs(velocity[key]) < 1e-3) {
                current[key] = target[key];
                velocity[key] = 0;
            } else {
                moving = true;
            }
        });

        render();
        frame = moving ? requestAnimationFrame(step) : 0;
    }

    function kick() {
        if (frame) return;
        lastTime = performance.now();
        frame = requestAnimationFrame(step);
    }

    stage.addEventListener('pointerenter', (event) => {
        if (!canTilt(event)) return;
        hovering = true;
        rect = stage.getBoundingClientRect();
        target.s = LIFT_SCALE;
        target.lift = 1;
        aim(event);
        kick();
    });

    stage.addEventListener('pointermove', (event) => {
        if (!hovering) return;
        aim(event);
        kick();
    });

    stage.addEventListener('pointerleave', () => {
        if (!hovering) return;
        hovering = false;
        target.rx = 0;
        target.ry = 0;
        target.s = 1;
        target.lift = 0;
        kick();
    });

    const invalidateRect = () => {
        rect = null;
    };
    window.addEventListener('scroll', invalidateRect, { passive: true });
    window.addEventListener('resize', invalidateRect, { passive: true });
});

// "Sarib Samdani" set in Qwitcher Grypen (SIL Open Font License), converted to outlines so the
// signature can be written stroke by stroke. Each contour starts where its stroke begins.
// If the name changes, these paths have to be regenerated from the font (e.g. with opentype.js).
const ID_BADGE_SIGNATURE = {
    viewBox: '-3.5 -50.8 360.6 85.8',
    glyphs: [
        ["M0.5 1.1L0.5 1.1Q0.5 -0.8 2.8 -2.6Q5 -4.4 8.3 -5.9Q11.6 -7.5 15 -8.6Q18.3 -9.8 20.6 -10.5Q22.9 -11.3 23 -11.4L23 -11.4Q23.9 -11.6 24.8 -11.8Q25.6 -12 26.5 -12.2L26.5 -12.2Q25.7 -13.3 24.5 -14.1Q23.2 -15 22.3 -15.6L22.3 -15.6Q21.3 -16.2 20.4 -16.9Q19.4 -17.6 18.4 -18.2L18.4 -18.2Q15.6 -19.9 13.5 -21.2Q11.4 -22.5 9.7 -25.5L9.7 -25.5Q9 -26.6 8.5 -28.2Q7.9 -29.9 7.9 -31.2L7.9 -31.2Q7.9 -34 10.2 -36.3Q12.5 -38.7 15.6 -40.3Q18.7 -42 20.9 -42.7L20.9 -42.7Q21.8 -43 22.6 -43.3Q23.4 -43.7 24.4 -43.8L24.4 -43.8Q25.2 -44 26.1 -44.5Q26.9 -45 27.7 -45.1L27.7 -45.1Q29.1 -45.5 30.4 -45.7Q31.7 -45.8 33 -46.1L33 -46.1Q33.8 -46.3 34.7 -46.2Q35.5 -46.2 36.1 -46.5L36.1 -46.5L36.3 -46.6L36.4 -46.6Q36.8 -46.6 37.2 -46.6Q37.6 -46.5 38 -46.5L38 -46.5Q38.4 -46.5 38.9 -46.7Q39.3 -46.8 39.7 -46.8L39.7 -46.8Q40.2 -46.8 40.8 -46.7Q41.3 -46.5 41.8 -46.5L41.8 -46.5Q42.3 -46.5 43.2 -46.2Q44 -45.8 44.4 -45.6L44.4 -45.6Q45.6 -45.1 46.5 -43.8Q47.3 -42.5 47.3 -41.2L47.3 -41.2Q47.3 -39.9 46.5 -39.2Q45.7 -38.6 44.8 -37.8L44.8 -37.8Q43.9 -37 43.2 -36Q42.5 -35 41.8 -33.9L41.8 -33.9L41.5 -33.9Q41.7 -35.2 42.6 -36.4Q43.4 -37.6 44.2 -38.8Q45 -40 45 -41.4L45 -41.4Q45 -43.3 43.5 -43.6Q41.9 -43.9 40.5 -43.9L40.5 -43.9Q39.1 -43.9 37.8 -43.7Q36.4 -43.5 35 -43.3L35 -43.3Q31.1 -42.9 27.7 -41.8Q24.2 -40.7 20.7 -39L20.7 -39Q19.4 -38.3 18 -37.4Q16.5 -36.6 15.3 -36.1L15.3 -36.1Q14.6 -35.8 14 -35.6L14 -35.6Q12.8 -34.2 11.3 -32.5Q9.8 -30.8 9.8 -28.8L9.8 -28.8Q9.8 -26.6 11.8 -24.7Q13.8 -22.8 16.8 -20.9Q19.8 -19 22.7 -16.9Q25.6 -14.9 27.4 -12.4L27.4 -12.4Q28.6 -12.6 29.9 -12.8Q31.1 -13 32.3 -13L32.3 -13Q35.2 -13 36.9 -11.3Q38.6 -9.6 38.6 -6.7L38.6 -6.7Q38.6 -4.4 37.7 -3.7Q36.7 -3.1 35 -2.2L35 -2.2Q34.3 -1.8 33.6 -1.2Q32.9 -0.6 32.1 -0.5L32.1 -0.5L32.1 -0.6L32 -0.6L32 -0.7L32.1 -0.7Q33.1 -1.5 34.4 -2.7Q35.7 -3.9 36.8 -5.3Q37.8 -6.7 37.8 -7.9L37.8 -7.9Q37.8 -9.3 36.6 -9.9Q35.4 -10.4 33.9 -10.5Q32.4 -10.7 31.5 -10.7L31.5 -10.7Q30.8 -10.7 30.1 -10.6Q29.3 -10.6 28.5 -10.5L28.5 -10.5Q28.6 -10.4 28.6 -10.3Q28.6 -10.2 28.7 -10.1L28.7 -10.1Q29 -9.4 29 -8.6L29 -8.6Q29 -7.4 28.3 -6L28.3 -6Q26.9 -3.2 24.3 -1.4Q21.6 0.4 18.5 1.4Q15.4 2.4 12.4 2.9L12.4 2.9Q12 3 11.6 3Q11.2 3 10.8 3L10.8 3Q8.5 3 6.2 2.4L6.2 2.4L6.4 2.1Q6.9 2.2 7.4 2.3Q7.8 2.3 8.2 2.3L8.2 2.3Q8.7 2.3 9.4 2.2Q10.1 2 10.6 1.9L10.6 1.9Q11.4 1.4 13.6 0.7Q15.8 0 17.8 -0.8Q19.7 -1.6 19.9 -2.3L19.9 -2.3Q19.9 -2.6 20 -2.6L20 -2.6Q21.2 -3.3 22.9 -4.5Q24.6 -5.7 26 -7.2Q27.3 -8.7 27.3 -10.2L27.3 -10.2L27.3 -10.4Q21.3 -9.6 16.2 -7.7L16.2 -7.7Q14.3 -7 11.4 -5.6Q8.4 -4.2 5.9 -2.3Q3.4 -0.5 2.6 1.5L2.6 1.5Q2.6 1.6 2.6 1.8Q2.5 1.9 2.5 2.1L2.5 2.1Q2.5 2.8 3 3.8Q3.5 4.7 4.3 4.7L4.3 4.7L4.3 5.1Q3.2 4.7 1.9 3.6Q0.5 2.4 0.5 1.1Z"],
        ["M40.4 -4.7Q40.5 -5.1 40.6 -6.6Q40.7 -8.1 41.1 -8.2L41.1 -8.2L41.1 -8.4Q41.2 -8.5 41.6 -9.2Q42 -9.9 42.5 -10.7Q42.9 -11.5 43 -11.7L43 -11.7Q43.3 -12.2 44.6 -13.6Q45.9 -15.1 47.3 -16.4Q48.7 -17.7 49.1 -17.7L49.1 -17.7Q49.7 -18.6 51.4 -19.7Q53 -20.8 54.8 -21.8Q56.5 -22.8 57.2 -23.2L57.2 -23.2L57.2 -23.3L57.3 -23.2L57.4 -23.2Q57.8 -23.6 59 -24Q60.1 -24.5 60.5 -24.6L60.5 -24.6Q61.2 -24.9 61.9 -25Q62.6 -25.1 63.3 -25.2L63.3 -25.2Q63.8 -25.1 64.4 -25.1Q64.9 -25.1 65.4 -25L65.4 -25Q66.4 -24.8 67.6 -24Q68.8 -23.1 68.8 -21.9L68.8 -21.9Q68.7 -21.8 68.6 -21.6Q68.5 -21.4 68.6 -21.3L68.6 -21.3L68.2 -21.5Q67.6 -22.6 66.4 -22.8Q65.2 -23.1 64.1 -23.1L64.1 -23.1Q61.4 -23.1 58.4 -21.7Q55.4 -20.4 52.5 -18.2Q49.6 -16 47.4 -13.5Q45.1 -11 44 -8.7L44 -8.7L43.7 -7.5Q43.5 -6.5 43.1 -5.6Q42.7 -4.7 42.7 -3.6L42.7 -3.6Q42.7 -2.8 42.9 -2.4Q43.1 -2.1 43.6 -1.4L43.6 -1.4L43.8 -1.5L43.8 -1.4L44 -1.6L44.4 -1.5Q45.1 -1.9 45.9 -2.1Q46.7 -2.4 47.2 -2.9L47.2 -2.9L47.4 -3.1Q48 -3.3 48.5 -3.8Q49 -4.3 49.4 -4.7L49.4 -4.7Q50.9 -6.1 52.4 -7.5Q53.9 -8.9 55.2 -10.4L55.2 -10.4Q55.9 -11.2 57 -12.4Q58.1 -13.6 58.9 -14.1L58.9 -14.1L59 -14.5Q59.8 -14.8 60.6 -15.9Q61.3 -17 62.1 -18Q62.8 -19.1 63.5 -19.1L63.5 -19.1L63.9 -19.2Q64.7 -19.2 65.2 -18.5Q65.7 -17.9 65.7 -17.2L65.7 -17.2Q65.7 -16.4 65.2 -15.4Q64.7 -14.4 64.5 -13.6L64.5 -13.6Q64 -11.5 63.8 -9.9Q63.6 -8.2 63.6 -6.1L63.6 -6.1Q63.6 -4.8 64.1 -3.9Q64.5 -3 65.4 -2L65.4 -2L65.9 -2Q67.3 -2.8 67.9 -3.7Q68.5 -4.6 69.4 -5.6L69.4 -5.6Q69.5 -5.6 69.6 -5.7Q69.7 -5.8 69.7 -5.8L69.7 -5.8Q69.9 -5.8 69.9 -5.6L69.9 -5.6Q69.9 -5.2 69.8 -4.9Q69.6 -4.5 69.5 -4L69.5 -4Q69.3 -2.9 69 -1.9Q68.6 -1 67 -1L67 -1Q66.1 -1 65 -1.4Q63.9 -1.8 63.2 -2.5L63.2 -2.5Q61.7 -4.2 61.4 -6.2Q61 -8.3 61 -10.5L61 -10.5L61 -13.7L60.8 -13.7Q60.4 -13.1 59.9 -12.5Q59.4 -11.9 58.9 -11.3L58.9 -11.3Q58.5 -10.9 58 -10.5Q57.4 -10 57 -9.4L57 -9.4Q56.8 -9.4 56.3 -8.7Q55.7 -8.1 55.7 -7.8L55.7 -7.8Q55 -7.7 54.2 -6.6Q53.3 -5.5 53 -5.5L53 -5.5Q52.9 -5.2 52.3 -4.5Q51.7 -3.9 51.4 -3.6L51.4 -3.6Q50.7 -3.5 50.3 -2.9Q49.8 -2.3 49.4 -1.8L49.4 -1.8Q48.5 -1.4 47.4 -0.7Q46.3 -0.1 45.3 -0.1L45.3 -0.1Q43.9 -0.1 42.2 -1.6Q40.5 -3.2 40.5 -4.7L40.5 -4.7L40.4 -4.7Z"],
        ["M70.7 0.5L70.7 0.5Q70.7 0.4 70.8 0.1Q70.8 -0.3 70.9 -0.3L70.9 -0.3L75.7 -11.6Q76.4 -13.3 77.2 -15.6Q78 -18 78.5 -20.3Q78.9 -22.7 78.7 -24.4L78.7 -24.4Q78.1 -24.4 77.4 -24.2Q76.7 -24 76.1 -24L76.1 -24Q75.9 -24 75.9 -24.3L75.9 -24.3Q75.9 -24.6 76.2 -25Q76.4 -25.3 77.1 -25.2L77.1 -25.2Q77.3 -25.1 78 -25.1L78 -25.1Q79.2 -25.1 80.7 -25Q82.2 -25 82.3 -23.7L82.3 -23.7Q82.3 -23.2 81.7 -21.4Q81 -19.6 80.1 -17.3Q79.1 -15 78.3 -12.9Q77.5 -10.9 77.2 -9.9L77.2 -9.9Q76.7 -8.9 76.7 -8.5L76.7 -8.5L77 -8.5Q77.8 -9.8 78.9 -10.9Q79.9 -11.9 80.7 -13.2L80.7 -13.2Q81.3 -13.6 82.5 -15.1Q83.7 -16.7 85.1 -18.3Q86.4 -20 87.6 -20.7L87.6 -20.7Q87.8 -20.8 88.5 -21.2Q89.2 -21.7 89.3 -21.8L89.3 -21.8Q89.6 -21.8 90 -21.8Q90.3 -21.9 90.6 -21.9L90.6 -21.9Q90.9 -21.9 91.2 -21.8Q91.4 -21.8 91.7 -21.8L91.7 -21.8Q92 -21.8 93 -21.3Q94 -20.9 94.9 -20.3Q95.8 -19.8 95.8 -19.5L95.8 -19.5Q95.8 -18.6 95.1 -18.2Q94.4 -17.7 93.9 -17.2L93.9 -17.2Q93.2 -16.3 92.4 -15.2Q91.5 -14.2 91.3 -13L91.3 -13L91.2 -12.5L91.1 -12.4Q91.1 -12.4 91.1 -12.5Q91 -12.6 90.9 -12.6L90.9 -12.6L90.8 -12.5Q90.8 -14.5 91.8 -16.3Q92.8 -18.2 92.8 -20.1L92.8 -20.1Q92.8 -20.6 92.4 -20.6L92.4 -20.6Q91.7 -20.6 90.5 -19.7Q89.3 -18.9 88.3 -18Q87.3 -17.2 87.1 -17.2L87.1 -17.2Q86.9 -16.8 86 -15.9Q85 -15 84.6 -14.7L84.6 -14.7Q83.9 -14.1 83.4 -13.3Q82.8 -12.5 82.2 -11.7L82.2 -11.7Q82.1 -11.6 81.8 -11.4Q81.5 -11.2 81.3 -11L81.3 -11Q80.9 -10.3 80.3 -9.7L80.3 -9.7Q80.1 -9.3 80 -8.9Q79.8 -8.5 79.4 -8.1L79.4 -8.1L78.9 -8Q78.5 -7.2 77.9 -6.5Q77.3 -5.9 76.8 -5.2L76.8 -5.2Q76.4 -4.5 76.2 -3.7Q75.9 -2.9 75.4 -2.3L75.4 -2.3Q74.8 -1.5 74.2 -0.4Q73.5 0.6 73.5 1.7L73.5 1.7L73.4 1.7Q73 1.9 72.7 1.9L72.7 1.9Q72.1 1.9 71.5 1.6Q70.9 1.2 70.7 0.5Z"],
        ["M94.5 -1.9L94.5 -1.9Q94.5 -5.1 96 -8Q97.5 -11 98.8 -13.7L98.8 -13.7Q99 -13.9 98.9 -14.1Q98.8 -14.4 98.8 -14.6L98.8 -14.6Q98.8 -15.5 99.6 -16.7Q100.3 -17.8 101.3 -18.9Q102.3 -20 102.9 -20.5L102.9 -20.5Q103.5 -20.5 104.7 -20.3Q105.9 -20.2 105.9 -19.4L105.9 -19.4Q105.9 -19.3 104.9 -18.2Q103.9 -17.1 103.7 -16.8L103.7 -16.8Q102.4 -14.8 100.7 -12Q98.9 -9.3 97.6 -6.4Q96.3 -3.5 96.3 -0.9L96.3 -0.9Q97.5 -1.1 98.9 -2.3Q100.2 -3.6 100.9 -4.5L100.9 -4.5L101 -4.5L101 -4.4Q101 -4 100.6 -3.6Q100.2 -3.2 100 -2.9L100 -2.9Q99.6 -2.2 98.8 -0.6Q97.9 1 96.9 1L96.9 1Q96.6 1 96.4 0.8Q96.1 0.6 95.8 0.5L95.8 0.5Q95.1 -0.1 94.8 -0.5Q94.5 -0.9 94.5 -1.9Z", "M105.9 -26.3L105.9 -26.3Q105.9 -26.5 106.6 -27.2Q107.3 -28 108.2 -28.7Q109 -29.5 109.2 -29.7L109.2 -29.7Q110 -29.5 110 -28.8L110 -28.8Q110 -28.4 109.6 -27.4Q109.1 -26.5 108.6 -25.7Q108 -24.9 107.5 -24.9L107.5 -24.9Q107.1 -24.9 106.5 -25.4Q105.9 -25.9 105.9 -26.3Z"],
        ["M98.5 4.6L98.5 4.6Q98.5 4 98.9 4L98.9 4Q99.5 4 99.7 4.7Q99.8 5.4 100 5.8L100 5.8Q100.5 6.5 101.4 6.7Q102.3 6.8 103 6.8L103 6.8Q103.5 6.8 104.1 6.8Q104.6 6.8 105.1 6.7L105.1 6.7Q105.4 6.5 106 6.5L106 6.5Q106.5 6.3 107.1 6Q107.7 5.7 108.1 5.6L108.1 5.6Q108.9 5.4 109.6 5Q110.3 4.5 111 4.1L111 4.1Q114.8 2 118.2 -0.7Q121.5 -3.4 124.3 -6.6L124.3 -6.6Q124.9 -7.2 126 -8.5Q127.1 -9.8 128.1 -11.1Q129 -12.4 129 -13.1L129 -13.1Q129.5 -13.6 129.8 -14.4Q130 -15.3 130 -16L130 -16Q130 -17.2 128.7 -17.2L128.7 -17.2Q127.3 -17.2 125.4 -16.7Q123.5 -16.1 122.3 -15.6L122.3 -15.6Q121.9 -15.4 120.7 -14.6Q119.4 -13.8 118 -12.8Q116.6 -11.8 115.6 -11Q114.5 -10.1 114.5 -9.8L114.5 -9.8Q114.3 -9.7 114 -9.7Q113.7 -9.7 113.5 -9.6L113.5 -9.6Q113.1 -9.5 112.8 -8.8Q112.4 -8.1 112.1 -7.8L112.1 -7.8Q111.1 -6.8 110.5 -5.5Q109.8 -4.2 109.1 -3L109.1 -3Q108.8 -2.4 108.6 -1.3Q108.3 -0.2 107.9 0.7Q107.4 1.6 106.5 1.6L106.5 1.6Q105.8 1.6 104.8 0.6Q103.8 -0.4 103.8 -1.1L103.8 -1.1Q103.8 -1.2 103.9 -1.4Q104 -1.6 104 -1.7L104 -1.7Q104.4 -3.1 105.4 -4.1Q106.3 -5.1 107.1 -6.1L107.1 -6.1Q107.9 -7.3 108.8 -8.5Q109.7 -9.7 110.5 -11L110.5 -11Q111.8 -12.9 113.3 -15.4Q114.7 -18 116.2 -19.6L116.2 -19.6L116.3 -19.7Q116.4 -20.2 117.1 -21Q117.7 -21.9 118.1 -22.4L118.1 -22.4Q119.2 -24 120.3 -25.6Q121.3 -27.3 122.6 -28.8L122.6 -28.8Q123.2 -29.6 124.8 -31.6Q126.4 -33.6 128.3 -35.7Q130.1 -37.9 131.8 -39.5Q133.4 -41.1 134.1 -41.1L134.1 -41.1L134.1 -41L134.8 -41.1Q135.3 -41.1 136.4 -40.5Q137.4 -39.9 138.3 -39.2Q139.2 -38.5 139.2 -38.1L139.2 -38.1L138.8 -38.2Q138.1 -38.7 137.5 -38.7L137.5 -38.7Q136 -38.7 134.6 -37.1Q133.2 -35.6 132 -34.8L132 -34.8Q131.5 -34.4 131 -34.1Q130.5 -33.8 130 -33.3L130 -33.3Q129.9 -33.1 129.8 -32.9Q129.7 -32.8 129.6 -32.6L129.6 -32.6Q129.5 -32.4 129.1 -32.2Q128.6 -32.1 128.4 -31.9L128.4 -31.9Q128.3 -31.9 127.7 -30.8Q127.1 -29.8 126.9 -29.6L126.9 -29.6Q126.6 -29.4 126 -28.9Q125.3 -28.5 125.1 -28.1L125.1 -28.1Q124 -26.3 122.5 -24.9L122.5 -24.9Q122 -24.4 121 -23Q120 -21.6 119.1 -20.2Q118.1 -18.7 117.7 -18L117.7 -18Q117 -16.8 116.2 -15.9Q115.4 -15.1 115.1 -13.7L115.1 -13.7L115.4 -13.5Q117.3 -14.8 119.2 -15.8Q121.1 -16.8 123.1 -17.8L123.1 -17.8Q123.5 -17.8 123.8 -17.9Q124.1 -18.1 124.5 -18.1L124.5 -18.1Q124.9 -18.3 126.1 -18.4Q127.2 -18.5 127.6 -18.6L127.6 -18.6Q127.9 -18.5 128.9 -18.3Q129.9 -18.1 129.9 -17.7L129.9 -17.7Q130.9 -17.3 131.4 -16.1Q131.9 -14.9 131.9 -13.8L131.9 -13.8Q131.9 -11.9 130.9 -10.3Q129.8 -8.7 128.7 -7.3L128.7 -7.3Q128.3 -6.8 128 -6.3Q127.7 -5.8 127.2 -5.3L127.2 -5.3Q127 -5.1 126.5 -4.9Q126 -4.7 125.9 -4.5L125.9 -4.5Q125.2 -3.6 125.1 -3.6Q125 -3.7 124.4 -3.2L124.4 -3.2Q123.7 -2.5 123.7 -2.3Q123.7 -2.1 122.5 -1.5L122.5 -1.5Q122.3 -1.1 121.7 -0.6Q121.1 -0.1 120.8 0.2L120.8 0.2L119.9 0.5Q119.8 1 118.9 1.7Q117.9 2.3 116.9 2.9Q115.8 3.4 115.3 3.6L115.3 3.6Q114.7 3.9 114.2 4.3Q113.7 4.7 113 4.9L113 4.9Q112.6 5 111.5 5.5Q110.4 6 110.2 6.2L110.2 6.2L110 6.2Q109.9 6.2 109.8 6.3Q109.7 6.3 109.5 6.3L109.5 6.3Q108.2 6.7 106.9 7.1Q105.6 7.4 104.1 7.4L104.1 7.4Q103.3 7.4 102 7.2Q100.6 7 99.6 6.4Q98.5 5.7 98.5 4.6Z"],
        ["M149.9 1.1L149.9 1.1Q149.9 -0.8 152.2 -2.6Q154.4 -4.4 157.7 -5.9Q161 -7.5 164.4 -8.6Q167.7 -9.8 170 -10.5Q172.3 -11.3 172.4 -11.4L172.4 -11.4Q173.3 -11.6 174.2 -11.8Q175 -12 175.9 -12.2L175.9 -12.2Q175.1 -13.3 173.9 -14.1Q172.6 -15 171.7 -15.6L171.7 -15.6Q170.7 -16.2 169.8 -16.9Q168.8 -17.6 167.8 -18.2L167.8 -18.2Q165 -19.9 162.9 -21.2Q160.8 -22.5 159.1 -25.5L159.1 -25.5Q158.4 -26.6 157.9 -28.2Q157.3 -29.9 157.3 -31.2L157.3 -31.2Q157.3 -34 159.6 -36.3Q161.9 -38.7 165 -40.3Q168.1 -42 170.3 -42.7L170.3 -42.7Q171.2 -43 172 -43.3Q172.8 -43.7 173.8 -43.8L173.8 -43.8Q174.6 -44 175.5 -44.5Q176.3 -45 177.1 -45.1L177.1 -45.1Q178.5 -45.5 179.8 -45.7Q181.1 -45.8 182.4 -46.1L182.4 -46.1Q183.2 -46.3 184.1 -46.2Q184.9 -46.2 185.5 -46.5L185.5 -46.5L185.7 -46.6L185.8 -46.6Q186.2 -46.6 186.6 -46.6Q187 -46.5 187.4 -46.5L187.4 -46.5Q187.8 -46.5 188.3 -46.7Q188.7 -46.8 189.1 -46.8L189.1 -46.8Q189.6 -46.8 190.2 -46.7Q190.7 -46.5 191.2 -46.5L191.2 -46.5Q191.7 -46.5 192.6 -46.2Q193.4 -45.8 193.8 -45.6L193.8 -45.6Q195 -45.1 195.9 -43.8Q196.7 -42.5 196.7 -41.2L196.7 -41.2Q196.7 -39.9 195.9 -39.2Q195.1 -38.6 194.2 -37.8L194.2 -37.8Q193.3 -37 192.6 -36Q191.9 -35 191.2 -33.9L191.2 -33.9L190.9 -33.9Q191.1 -35.2 192 -36.4Q192.8 -37.6 193.6 -38.8Q194.4 -40 194.4 -41.4L194.4 -41.4Q194.4 -43.3 192.9 -43.6Q191.3 -43.9 189.9 -43.9L189.9 -43.9Q188.5 -43.9 187.2 -43.7Q185.8 -43.5 184.4 -43.3L184.4 -43.3Q180.5 -42.9 177.1 -41.8Q173.6 -40.7 170.1 -39L170.1 -39Q168.8 -38.3 167.4 -37.4Q165.9 -36.6 164.7 -36.1L164.7 -36.1Q164 -35.8 163.4 -35.6L163.4 -35.6Q162.2 -34.2 160.7 -32.5Q159.2 -30.8 159.2 -28.8L159.2 -28.8Q159.2 -26.6 161.2 -24.7Q163.2 -22.8 166.2 -20.9Q169.2 -19 172.1 -16.9Q175 -14.9 176.8 -12.4L176.8 -12.4Q178 -12.6 179.3 -12.8Q180.5 -13 181.7 -13L181.7 -13Q184.6 -13 186.3 -11.3Q188 -9.6 188 -6.7L188 -6.7Q188 -4.4 187.1 -3.7Q186.1 -3.1 184.4 -2.2L184.4 -2.2Q183.7 -1.8 183 -1.2Q182.3 -0.6 181.5 -0.5L181.5 -0.5L181.5 -0.6L181.4 -0.6L181.4 -0.7L181.5 -0.7Q182.5 -1.5 183.8 -2.7Q185.1 -3.9 186.2 -5.3Q187.2 -6.7 187.2 -7.9L187.2 -7.9Q187.2 -9.3 186 -9.9Q184.8 -10.4 183.3 -10.5Q181.8 -10.7 180.9 -10.7L180.9 -10.7Q180.2 -10.7 179.5 -10.6Q178.7 -10.6 177.9 -10.5L177.9 -10.5Q178 -10.4 178 -10.3Q178 -10.2 178.1 -10.1L178.1 -10.1Q178.4 -9.4 178.4 -8.6L178.4 -8.6Q178.4 -7.4 177.7 -6L177.7 -6Q176.3 -3.2 173.7 -1.4Q171 0.4 167.9 1.4Q164.8 2.4 161.8 2.9L161.8 2.9Q161.4 3 161 3Q160.6 3 160.2 3L160.2 3Q157.9 3 155.6 2.4L155.6 2.4L155.8 2.1Q156.3 2.2 156.8 2.3Q157.2 2.3 157.6 2.3L157.6 2.3Q158.1 2.3 158.8 2.2Q159.5 2 160 1.9L160 1.9Q160.8 1.4 163 0.7Q165.2 0 167.2 -0.8Q169.1 -1.6 169.3 -2.3L169.3 -2.3Q169.3 -2.6 169.4 -2.6L169.4 -2.6Q170.6 -3.3 172.3 -4.5Q174 -5.7 175.4 -7.2Q176.7 -8.7 176.7 -10.2L176.7 -10.2L176.7 -10.4Q170.7 -9.6 165.6 -7.7L165.6 -7.7Q163.7 -7 160.8 -5.6Q157.8 -4.2 155.3 -2.3Q152.8 -0.5 152 1.5L152 1.5Q152 1.6 152 1.8Q151.9 1.9 151.9 2.1L151.9 2.1Q151.9 2.8 152.4 3.8Q152.9 4.7 153.7 4.7L153.7 4.7L153.7 5.1Q152.6 4.7 151.3 3.6Q149.9 2.4 149.9 1.1Z"],
        ["M189.8 -4.7Q189.9 -5.1 190 -6.6Q190.1 -8.1 190.5 -8.2L190.5 -8.2L190.5 -8.4Q190.6 -8.5 191 -9.2Q191.4 -9.9 191.9 -10.7Q192.3 -11.5 192.4 -11.7L192.4 -11.7Q192.7 -12.2 194 -13.6Q195.3 -15.1 196.7 -16.4Q198.1 -17.7 198.5 -17.7L198.5 -17.7Q199.1 -18.6 200.8 -19.7Q202.4 -20.8 204.2 -21.8Q205.9 -22.8 206.6 -23.2L206.6 -23.2L206.6 -23.3L206.7 -23.2L206.8 -23.2Q207.2 -23.6 208.4 -24Q209.5 -24.5 209.9 -24.6L209.9 -24.6Q210.6 -24.9 211.3 -25Q212 -25.1 212.7 -25.2L212.7 -25.2Q213.2 -25.1 213.8 -25.1Q214.3 -25.1 214.8 -25L214.8 -25Q215.8 -24.8 217 -24Q218.2 -23.1 218.2 -21.9L218.2 -21.9Q218.1 -21.8 218 -21.6Q217.9 -21.4 218 -21.3L218 -21.3L217.6 -21.5Q217 -22.6 215.8 -22.8Q214.6 -23.1 213.5 -23.1L213.5 -23.1Q210.8 -23.1 207.8 -21.7Q204.8 -20.4 201.9 -18.2Q199 -16 196.8 -13.5Q194.5 -11 193.4 -8.7L193.4 -8.7L193.1 -7.5Q192.9 -6.5 192.5 -5.6Q192.1 -4.7 192.1 -3.6L192.1 -3.6Q192.1 -2.8 192.3 -2.4Q192.5 -2.1 193 -1.4L193 -1.4L193.2 -1.5L193.2 -1.4L193.4 -1.6L193.8 -1.5Q194.5 -1.9 195.3 -2.1Q196.1 -2.4 196.6 -2.9L196.6 -2.9L196.8 -3.1Q197.4 -3.3 197.9 -3.8Q198.4 -4.3 198.8 -4.7L198.8 -4.7Q200.3 -6.1 201.8 -7.5Q203.3 -8.9 204.6 -10.4L204.6 -10.4Q205.3 -11.2 206.4 -12.4Q207.5 -13.6 208.3 -14.1L208.3 -14.1L208.4 -14.5Q209.2 -14.8 210 -15.9Q210.7 -17 211.5 -18Q212.2 -19.1 212.9 -19.1L212.9 -19.1L213.3 -19.2Q214.1 -19.2 214.6 -18.5Q215.1 -17.9 215.1 -17.2L215.1 -17.2Q215.1 -16.4 214.6 -15.4Q214.1 -14.4 213.9 -13.6L213.9 -13.6Q213.4 -11.5 213.2 -9.9Q213 -8.2 213 -6.1L213 -6.1Q213 -4.8 213.5 -3.9Q213.9 -3 214.8 -2L214.8 -2L215.3 -2Q216.7 -2.8 217.3 -3.7Q217.9 -4.6 218.8 -5.6L218.8 -5.6Q218.9 -5.6 219 -5.7Q219.1 -5.8 219.1 -5.8L219.1 -5.8Q219.3 -5.8 219.3 -5.6L219.3 -5.6Q219.3 -5.2 219.2 -4.9Q219 -4.5 218.9 -4L218.9 -4Q218.7 -2.9 218.4 -1.9Q218 -1 216.4 -1L216.4 -1Q215.5 -1 214.4 -1.4Q213.3 -1.8 212.6 -2.5L212.6 -2.5Q211.1 -4.2 210.8 -6.2Q210.4 -8.3 210.4 -10.5L210.4 -10.5L210.4 -13.7L210.2 -13.7Q209.8 -13.1 209.3 -12.5Q208.8 -11.9 208.3 -11.3L208.3 -11.3Q207.9 -10.9 207.4 -10.5Q206.8 -10 206.4 -9.4L206.4 -9.4Q206.2 -9.4 205.7 -8.7Q205.1 -8.1 205.1 -7.8L205.1 -7.8Q204.4 -7.7 203.6 -6.6Q202.7 -5.5 202.4 -5.5L202.4 -5.5Q202.3 -5.2 201.7 -4.5Q201.1 -3.9 200.8 -3.6L200.8 -3.6Q200.1 -3.5 199.7 -2.9Q199.2 -2.3 198.8 -1.8L198.8 -1.8Q197.9 -1.4 196.8 -0.7Q195.7 -0.1 194.7 -0.1L194.7 -0.1Q193.3 -0.1 191.6 -1.6Q189.9 -3.2 189.9 -4.7L189.9 -4.7L189.8 -4.7Z"],
        ["M219.9 1.3L219.9 1.3Q219.9 1 220.7 -0.7Q221.4 -2.4 222.4 -4.6Q223.4 -6.8 224.3 -8.5Q225.1 -10.2 225.3 -10.4L225.3 -10.4Q225.2 -10.6 225.4 -10.8Q225.6 -11 225.7 -11.1L225.7 -11.1Q225.7 -11.6 226.3 -12.6Q226.9 -13.7 227.1 -14.1L227.1 -14.1Q228 -15.8 229.2 -18.2Q230.3 -20.6 231.2 -23Q232 -25.4 232 -27.2L232 -27.2Q231.4 -27.2 230.8 -27Q230.2 -26.8 229.6 -26.8L229.6 -26.8Q229.2 -27.1 229.2 -27.3L229.2 -27.3Q229.2 -27.9 230.6 -27.9L230.6 -27.9Q231.2 -27.7 232.4 -27.7Q233.5 -27.8 234.5 -27.6Q235.5 -27.4 235.5 -26.3L235.5 -26.3Q235.5 -25.8 234.7 -24Q233.8 -22.2 232.6 -19.8Q231.4 -17.5 230.4 -15.4Q229.3 -13.3 228.9 -12.3L228.9 -12.3Q228.8 -11.8 228.4 -11.5Q228 -11.1 228 -10.4L228 -10.4Q227.7 -10.3 227.7 -9.8L227.7 -9.8Q227.7 -9.7 227.8 -9.5Q227.8 -9.3 227.8 -9.1L227.8 -9.1L227.9 -9.1Q228.1 -9.5 229.1 -10.7Q230.1 -11.9 231.2 -13.1Q232.3 -14.4 232.6 -14.8L232.6 -14.8L232.8 -14.8Q234.3 -16.5 235.9 -18Q237.4 -19.6 239.3 -20.8L239.3 -20.8Q239.7 -21 239.8 -21.3L239.8 -21.3L240 -21.2Q240.2 -21.2 240.5 -21.3Q240.7 -21.4 241 -21.4L241 -21.4Q242.1 -21.4 243.1 -20.5Q244.1 -19.6 244.1 -18.4L244.1 -18.4Q244.1 -16.9 243.2 -15.3Q242.2 -13.8 241.5 -12.4L241.5 -12.4Q241.1 -11.6 240.8 -10.7Q240.5 -9.9 240.1 -9.1L240.1 -9.1Q240 -8.7 239.6 -7.8Q239.1 -6.9 239.1 -6.5L239.1 -6.5Q239.1 -6.4 239.2 -6.4Q239.2 -6.3 239.2 -6.2L239.2 -6.2Q240 -6.4 240.5 -7Q241 -7.7 241.5 -8.3L241.5 -8.3Q242.5 -9.6 243.5 -10.9Q244.5 -12.2 245.5 -13.5L245.5 -13.5L246.8 -15Q247.3 -15.8 248 -16.8Q248.7 -17.8 249.4 -18.2L249.4 -18.2Q250.2 -18.5 250.9 -18.5L250.9 -18.5Q251.7 -18.5 252.8 -18.3Q253.8 -18.1 253.8 -17.1L253.8 -17.1Q253.8 -15.6 253.1 -14.2Q252.4 -12.9 252 -11.5L252 -11.5Q251.8 -10.8 251.4 -9Q251 -7.1 250.7 -5.2Q250.4 -3.4 250.4 -2.6L250.4 -2.6Q250.4 -2 250.6 -1.8L250.6 -1.8Q250.5 -1.7 250.5 -1.3L250.5 -1.3Q250.5 -0.9 250.7 -0.4Q250.8 0 250.9 0.5L250.9 0.5Q250.9 1.5 251.2 3.1Q251.4 4.6 252.9 4.6L252.9 4.6L252.9 4.5L253 4.6L253 4.5Q253.5 4.3 254.3 3.6Q255 2.8 255.7 1.9Q256.3 1 256.3 0.6L256.3 0.6L256.4 0.6L256.4 0.7Q256.4 0.8 256.3 1.6Q256.1 2.4 256 3.3Q255.8 4.1 255.7 4.2L255.7 4.2Q254.8 5.3 253.3 5.3L253.3 5.3Q252.8 5.3 252.4 5.2Q251.9 5.1 251.4 5L251.4 5L251.1 5.2Q249.5 3.9 249.1 1.6Q248.6 -0.7 248.6 -2.6L248.6 -2.6Q248.6 -4.6 248.8 -6.6Q248.9 -8.7 249 -10.6L249 -10.6Q249.1 -12 249.5 -13.4Q249.8 -14.8 249.8 -16.1L249.8 -16.1Q249.8 -16.7 249.7 -16.9L249.7 -16.9L249.5 -17.1L249.3 -17Q248.5 -16.6 247.9 -15Q247.2 -13.5 246.8 -12.7L246.8 -12.7Q246.5 -12.1 245.5 -10.4Q244.4 -8.6 243.3 -7Q242.2 -5.4 241.7 -5L241.7 -5Q240.8 -4.3 239.9 -4.3L239.9 -4.3Q238.9 -4.3 238.1 -4.8Q237.2 -5.3 237.2 -6.5L237.2 -6.5Q237.2 -6.9 237.8 -8.5Q238.3 -10.1 239.1 -12.1Q239.9 -14.1 240.5 -15.9Q241 -17.8 241 -18.8L241 -18.8Q241 -19.4 240.7 -19.4L240.7 -19.4Q240.3 -19.4 239.1 -18.3Q237.8 -17.3 236.6 -16.2Q235.4 -15 235.1 -14.6L235.1 -14.6L234.4 -13.4Q232.8 -12.1 231.5 -10.3L231.5 -10.3Q231.4 -10.2 231.3 -10Q231.2 -9.8 231.1 -9.6L231.1 -9.6Q230.9 -9.3 230.2 -8.3Q229.4 -7.4 228.7 -6.5Q227.9 -5.7 227.5 -5.5L227.5 -5.5Q227.2 -4.8 226.8 -4.2Q226.3 -3.7 225.7 -3.1L225.7 -3.1Q225.1 -2.5 224.3 -0.7Q223.4 1.1 223.1 1.9L223.1 1.9Q223 2.1 222.4 2.3Q221.7 2.5 221.4 2.5L221.4 2.5Q221 2.5 220.5 2.1Q219.9 1.7 219.9 1.3Z"],
        ["M255.1 -4.2L255.1 -4.2L255.1 -5L255.3 -5.5L255.3 -5.6Q255.3 -5.9 255.6 -6.6Q255.8 -7.4 256.2 -7.4L256.2 -7.4Q256.2 -8.5 257 -10Q257.8 -11.4 258.9 -12.7Q259.9 -14.1 260.6 -14.9L260.6 -14.9Q262.3 -16.9 264.3 -18.1Q266.3 -19.3 268.5 -20.6L268.5 -20.6L268.5 -20.5Q269.6 -21.2 270.4 -21.2L270.4 -21.2Q270.6 -21.3 271 -21.3L271 -21.3Q271.8 -21.3 273.1 -20.6Q274.3 -19.9 274.3 -19L274.3 -19Q274.3 -18.8 274.3 -18.3Q274.3 -17.9 274.1 -17.8L274.1 -17.8L273.4 -17.1Q273.2 -16.9 272.8 -16.1Q272.4 -15.3 272 -15.3L272 -15.3L271.9 -15.3L272 -16.1Q272.4 -16.6 272.4 -17.4L272.4 -17.4Q272.4 -18 272.2 -18.7Q271.9 -19.5 271.1 -19.5L271.1 -19.5Q270.4 -19.5 269.3 -18.8Q268.2 -18.2 267.6 -17.8L267.6 -17.8Q267.2 -17.5 266.8 -17.2Q266.4 -17 265.9 -16.7L265.9 -16.7Q264.3 -15.4 262.4 -13Q260.4 -10.7 259 -8.1Q257.5 -5.5 257.5 -3.2L257.5 -3.2Q257.5 -2.4 257.9 -1.6Q258.3 -0.8 259.3 -0.8L259.3 -0.8Q260.5 -0.8 262.5 -2.3Q264.4 -3.9 266.6 -6.3Q268.8 -8.7 271 -11.3Q273.2 -13.9 275 -16.1Q276.7 -18.3 277.6 -19.4L277.6 -19.4Q278.7 -20.9 279.8 -22.5Q280.9 -24 281.9 -25.5L281.9 -25.5Q282.1 -25.8 282.6 -26.3Q283 -26.9 283 -27.2L283 -27.2Q283.1 -27.2 283.8 -28.2Q284.5 -29.2 285.5 -30.5Q286.5 -31.8 287.3 -32.9Q288.1 -34 288.3 -34.3L288.3 -34.3Q288.8 -34.9 289.2 -35.4Q289.6 -36 290 -36.7L290 -36.7L290.2 -37L290.3 -36.9Q290.4 -37.2 291.2 -38.3Q291.9 -39.4 292.2 -39.5L292.2 -39.5L292.1 -39.7Q293.1 -40.3 294.1 -41.8Q295.1 -43.3 296.7 -44L296.7 -44Q297.2 -43.9 297.7 -43.8Q298.1 -43.7 298.5 -43.5L298.5 -43.5L298.5 -43.3Q298.7 -43.1 298.9 -42.8Q299 -42.6 299 -42.3L299 -42.3Q299 -41.7 298.4 -40.9Q297.7 -40.2 297.3 -39.7L297.3 -39.7Q296.3 -38.4 294.8 -37.1Q293.3 -35.9 292 -34.8L292 -34.8Q291.5 -34.3 291.2 -33.7Q290.8 -33.1 290.3 -32.6L290.3 -32.6Q290 -32.2 289.7 -31.9Q289.4 -31.7 289.1 -31.4L289.1 -31.4Q288.6 -30.7 288.1 -30Q287.6 -29.3 287 -28.7L287 -28.7Q285.7 -27.3 284.6 -25.7Q283.5 -24.2 282.4 -22.5L282.4 -22.5Q281.8 -21.6 281.4 -20.8Q280.9 -20 280.1 -19.2L280.1 -19.2Q279.8 -18.8 279.5 -17.9Q279.2 -17.1 278.7 -17L278.7 -17Q278.6 -16.3 277.7 -14.8Q276.8 -13.3 276.4 -12.5L276.4 -12.5Q276.2 -12.1 276 -11.1Q275.7 -10.1 275.2 -9.9L275.2 -9.9L275.2 -9.8Q275.2 -9.4 274.9 -9Q274.6 -8.7 274.4 -8.3L274.4 -8.3Q273.7 -6.8 273 -4.4Q272.2 -2.1 271.7 0.3Q271.1 2.7 271.1 4.3L271.1 4.3Q271.1 5.3 271.4 6.4Q271.6 7.4 272.5 7.9L272.5 7.9L272.6 7.8L272.7 7.9L272.8 7.9Q273.6 7.5 274.5 7.2L274.5 7.2Q275 7 275.3 6.6Q275.6 6.1 276.3 6.1L276.3 6.1Q276.2 6.5 276.2 6.9Q276.1 7.2 275.9 7.5L275.9 7.5Q275.8 8 274.8 8.5Q273.8 9 273.3 9L273.3 9Q272.3 9 271 7.9Q269.6 6.7 269.3 5.8L269.3 5.8Q269 5.2 268.9 4.3Q268.7 3.3 268.7 2.6L268.7 2.6Q268.7 1.9 268.8 1.3Q268.9 0.7 269 0L269 0Q269.5 -1.4 270.2 -3.7Q270.9 -6.1 271.8 -7.3L271.8 -7.3L271.8 -7.5L271.6 -7.5L271.6 -7.6Q271.8 -7.8 272.1 -8.1Q272.4 -8.5 272.5 -8.9L272.5 -8.9L272.1 -8.8L272 -9L271.9 -9Q271.3 -9 271.3 -8.3L271.3 -8.3Q270.8 -8.1 270.1 -7Q269.3 -5.9 269.1 -5.9L269.1 -5.9L268.9 -5.8L269 -5.5L268.9 -5.5L268.3 -5.2Q268.1 -5 268 -4.7Q267.9 -4.5 267.4 -4.5L267.4 -4.5L267.4 -4.4Q266.6 -2.9 264.5 -1.2Q262.3 0.5 260.4 0.5L260.4 0.5Q258.8 0.5 258 -0.3Q257.2 -1.1 256.5 -1.1L256.5 -1.1L256.4 -1.2Q256.1 -2.2 255.6 -2.4Q255.1 -2.7 255.1 -4.2Z"],
        ["M281 -4.7Q281.1 -5.1 281.2 -6.6Q281.3 -8.1 281.7 -8.2L281.7 -8.2L281.7 -8.4Q281.8 -8.5 282.2 -9.2Q282.6 -9.9 283.1 -10.7Q283.5 -11.5 283.6 -11.7L283.6 -11.7Q283.9 -12.2 285.2 -13.6Q286.5 -15.1 287.9 -16.4Q289.3 -17.7 289.7 -17.7L289.7 -17.7Q290.3 -18.6 292 -19.7Q293.6 -20.8 295.4 -21.8Q297.1 -22.8 297.8 -23.2L297.8 -23.2L297.8 -23.3L297.9 -23.2L298 -23.2Q298.4 -23.6 299.6 -24Q300.7 -24.5 301.1 -24.6L301.1 -24.6Q301.8 -24.9 302.5 -25Q303.2 -25.1 303.9 -25.2L303.9 -25.2Q304.4 -25.1 305 -25.1Q305.5 -25.1 306 -25L306 -25Q307 -24.8 308.2 -24Q309.4 -23.1 309.4 -21.9L309.4 -21.9Q309.3 -21.8 309.2 -21.6Q309.1 -21.4 309.2 -21.3L309.2 -21.3L308.8 -21.5Q308.2 -22.6 307 -22.8Q305.8 -23.1 304.7 -23.1L304.7 -23.1Q302 -23.1 299 -21.7Q296 -20.4 293.1 -18.2Q290.2 -16 288 -13.5Q285.7 -11 284.6 -8.7L284.6 -8.7L284.3 -7.5Q284.1 -6.5 283.7 -5.6Q283.3 -4.7 283.3 -3.6L283.3 -3.6Q283.3 -2.8 283.5 -2.4Q283.7 -2.1 284.2 -1.4L284.2 -1.4L284.4 -1.5L284.4 -1.4L284.6 -1.6L285 -1.5Q285.7 -1.9 286.5 -2.1Q287.3 -2.4 287.8 -2.9L287.8 -2.9L288 -3.1Q288.6 -3.3 289.1 -3.8Q289.6 -4.3 290 -4.7L290 -4.7Q291.5 -6.1 293 -7.5Q294.5 -8.9 295.8 -10.4L295.8 -10.4Q296.5 -11.2 297.6 -12.4Q298.7 -13.6 299.5 -14.1L299.5 -14.1L299.6 -14.5Q300.4 -14.8 301.2 -15.9Q301.9 -17 302.7 -18Q303.4 -19.1 304.1 -19.1L304.1 -19.1L304.5 -19.2Q305.3 -19.2 305.8 -18.5Q306.3 -17.9 306.3 -17.2L306.3 -17.2Q306.3 -16.4 305.8 -15.4Q305.3 -14.4 305.1 -13.6L305.1 -13.6Q304.6 -11.5 304.4 -9.9Q304.2 -8.2 304.2 -6.1L304.2 -6.1Q304.2 -4.8 304.7 -3.9Q305.1 -3 306 -2L306 -2L306.5 -2Q307.9 -2.8 308.5 -3.7Q309.1 -4.6 310 -5.6L310 -5.6Q310.1 -5.6 310.2 -5.7Q310.3 -5.8 310.3 -5.8L310.3 -5.8Q310.5 -5.8 310.5 -5.6L310.5 -5.6Q310.5 -5.2 310.4 -4.9Q310.2 -4.5 310.1 -4L310.1 -4Q309.9 -2.9 309.6 -1.9Q309.2 -1 307.6 -1L307.6 -1Q306.7 -1 305.6 -1.4Q304.5 -1.8 303.8 -2.5L303.8 -2.5Q302.3 -4.2 302 -6.2Q301.6 -8.3 301.6 -10.5L301.6 -10.5L301.6 -13.7L301.4 -13.7Q301 -13.1 300.5 -12.5Q300 -11.9 299.5 -11.3L299.5 -11.3Q299.1 -10.9 298.6 -10.5Q298 -10 297.6 -9.4L297.6 -9.4Q297.4 -9.4 296.9 -8.7Q296.3 -8.1 296.3 -7.8L296.3 -7.8Q295.6 -7.7 294.8 -6.6Q293.9 -5.5 293.6 -5.5L293.6 -5.5Q293.5 -5.2 292.9 -4.5Q292.3 -3.9 292 -3.6L292 -3.6Q291.3 -3.5 290.9 -2.9Q290.4 -2.3 290 -1.8L290 -1.8Q289.1 -1.4 288 -0.7Q286.9 -0.1 285.9 -0.1L285.9 -0.1Q284.5 -0.1 282.8 -1.6Q281.1 -3.2 281.1 -4.7L281.1 -4.7L281 -4.7Z"],
        ["M312.8 -3.2L312.8 -3.2Q312.8 -5.1 313.8 -7.8Q314.8 -10.5 316.3 -13.4Q317.7 -16.3 319.2 -18.9Q320.6 -21.5 321.6 -23.2L321.6 -23.2Q322.1 -24.1 322.5 -25.1Q322.8 -26.1 323.5 -26.9L323.5 -26.9Q324.3 -26.8 325.4 -26.4Q326.4 -26 326.4 -24.9L326.4 -24.9Q326.4 -24.1 325.5 -23.2Q324.5 -22.2 324 -21.6L324 -21.6Q321.8 -19.1 320.1 -16.2Q318.3 -13.3 316.9 -10.3L316.9 -10.3Q316.6 -9.7 316.4 -9.1Q316.2 -8.6 316 -8.1L316 -8.1Q315.8 -7.6 315.5 -7.1Q315.2 -6.7 315.2 -6.2L315.2 -6.2Q315.2 -6 315.3 -5.7Q315.4 -5.4 315.7 -5.4L315.7 -5.4Q316.5 -6.2 318.2 -8.1Q319.9 -10.1 321.9 -12.2Q323.9 -14.4 325.6 -16Q327.2 -17.6 327.8 -17.9L327.8 -17.9Q328 -18 328.2 -18Q328.4 -18.1 328.6 -18.1L328.6 -18.1Q330.2 -18.1 331.1 -16.7Q332 -15.2 332 -13.8L332 -13.8Q332 -12.2 331.7 -10.7Q331.4 -9.2 331.4 -7.7L331.4 -7.7Q331.4 -6.5 331.9 -4.6Q332.4 -2.7 334 -2.7L334 -2.7Q334.4 -2.9 334.9 -3.1Q335.4 -3.3 335.8 -3.3L335.8 -3.3Q336.1 -3.3 336.1 -2.9L336.1 -2.9Q336.1 -2.4 335.6 -2.1Q335 -1.8 334.6 -1.8L334.6 -1.8Q333.1 -1.8 331.5 -3.2Q329.9 -4.5 329.5 -5.9L329.5 -5.9Q329.1 -7.4 329 -9Q328.8 -10.5 328.8 -12L328.8 -12Q328.8 -12.7 329 -14Q329.1 -15.4 329.1 -15.8L329.1 -15.8Q328.5 -15.8 327.5 -14.9Q326.5 -14.1 325.6 -13.1Q324.7 -12.2 324.3 -11.7L324.3 -11.7Q324.1 -11.5 323.8 -11.3Q323.4 -11.1 323.1 -10.8L323.1 -10.8Q322.7 -10.3 322.2 -9.6Q321.7 -9 321.2 -8.5L321.2 -8.5Q321 -8.3 320.4 -7.8Q319.7 -7.3 319.5 -7L319.5 -7Q319 -6 318.2 -5.1Q317.4 -4.2 316.7 -3.2L316.7 -3.2Q316.5 -2.9 316.3 -2.4Q316.1 -2 315.8 -1.8L315.8 -1.8Q315.5 -1.4 314.9 -1.4L314.9 -1.4Q314.3 -1.4 313.6 -2Q312.8 -2.6 312.8 -3.2Z"],
        ["M337.6 -1.9L337.6 -1.9Q337.6 -5.1 339.1 -8Q340.6 -11 341.9 -13.7L341.9 -13.7Q342.1 -13.9 342 -14.1Q341.9 -14.4 341.9 -14.6L341.9 -14.6Q341.9 -15.5 342.7 -16.7Q343.4 -17.8 344.4 -18.9Q345.4 -20 346 -20.5L346 -20.5Q346.6 -20.5 347.8 -20.3Q349 -20.2 349 -19.4L349 -19.4Q349 -19.3 348 -18.2Q347 -17.1 346.8 -16.8L346.8 -16.8Q345.5 -14.8 343.8 -12Q342 -9.3 340.7 -6.4Q339.4 -3.5 339.4 -0.9L339.4 -0.9Q340.6 -1.1 342 -2.3Q343.3 -3.6 344 -4.5L344 -4.5L344.1 -4.5L344.1 -4.4Q344.1 -4 343.7 -3.6Q343.3 -3.2 343.1 -2.9L343.1 -2.9Q342.7 -2.2 341.9 -0.6Q341 1 340 1L340 1Q339.7 1 339.5 0.8Q339.2 0.6 338.9 0.5L338.9 0.5Q338.2 -0.1 337.9 -0.5Q337.6 -0.9 337.6 -1.9Z", "M349 -26.3L349 -26.3Q349 -26.5 349.7 -27.2Q350.4 -28 351.3 -28.7Q352.1 -29.5 352.3 -29.7L352.3 -29.7Q353.1 -29.5 353.1 -28.8L353.1 -28.8Q353.1 -28.4 352.7 -27.4Q352.2 -26.5 351.7 -25.7Q351.1 -24.9 350.6 -24.9L350.6 -24.9Q350.2 -24.9 349.6 -25.4Q349 -25.9 349 -26.3Z"]
    ],
    flourish: {
        shape: 'M19.6 27.1C90.9 32.5 197 29.8 319.8 11.8C200.1 26.2 93.9 29.4 19.6 27.1Z',
        line: 'M19.6 27.6C90.9 31.6 197 29.1 319.8 11.8'
    }
};
