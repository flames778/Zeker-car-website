/* ============================================================
   SCOOOSH AUTOS — MAIN JS (Upgraded)
   ============================================================ */

// ===================== PARTICLE SYSTEM =====================
class ParticleSystem {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: null, y: null };
        this.resize();
        this.init();
        this.animate();
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', e => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    init() {
        this.particles = [];
        const count = Math.min(80, Math.floor(window.innerWidth / 15));
        for (let i = 0; i < count; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.5 + 0.1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        const isDark = document.documentElement.getAttribute('data-theme') !== 'light';
        const color = isDark ? '212,175,55' : '184,148,31';

        this.particles.forEach((p, i) => {
            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > this.canvas.width) p.vx *= -1;
            if (p.y < 0 || p.y > this.canvas.height) p.vy *= -1;

            if (this.mouse.x !== null) {
                const dx = this.mouse.x - p.x;
                const dy = this.mouse.y - p.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    p.x -= dx * 0.005;
                    p.y -= dy * 0.005;
                }
            }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(${color},${p.opacity})`;
            this.ctx.fill();

            for (let j = i + 1; j < this.particles.length; j++) {
                const dx = p.x - this.particles[j].x;
                const dy = p.y - this.particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
                    this.ctx.strokeStyle = `rgba(${color},${0.15 * (1 - dist / 120)})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ===================== SCROLL ANIMATIONS =====================
class ScrollAnimator {
    constructor() {
        this.observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('revealed');
                    }
                });
            },
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );
    }

    observe(container) {
        container.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
            this.observer.observe(el);
        });
    }

    disconnect() {
        this.observer.disconnect();
    }
}

// ===================== ANIMATED COUNTERS =====================
class AnimatedCounter {
    static animate(element, target, suffix = '', duration = 2000) {
        let start = 0;
        const isFloat = String(target).includes('.');
        const increment = target / (duration / 16);
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                start = target;
                clearInterval(timer);
            }
            element.textContent = isFloat ? start.toFixed(1) + suffix : Math.floor(start) + suffix;
        }, 16);
    }

    static observe(container) {
        const observer = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting && !entry.target.dataset.counted) {
                        entry.target.dataset.counted = 'true';
                        const text = entry.target.textContent;
                        const match = text.match(/([\d.]+)(.*)/);
                        if (match) {
                            const value = parseFloat(match[1]);
                            const suffix = match[2];
                            AnimatedCounter.animate(entry.target, value, suffix);
                        }
                    }
                });
            },
            { threshold: 0.5 }
        );

        container.querySelectorAll('.stat-value, .counter-value, .spec-value').forEach(el => {
            observer.observe(el);
        });
    }
}

// ===================== IMAGE CAROUSEL =====================
class Carousel {
    constructor(container) {
        this.container = container;
        this.track = container.querySelector('.carousel-track');
        this.slides = container.querySelectorAll('.carousel-slide');
        this.dots = container.querySelectorAll('.carousel-dot');
        this.prevBtn = container.querySelector('.carousel-btn.prev');
        this.nextBtn = container.querySelector('.carousel-btn.next');
        this.current = 0;
        this.total = this.slides.length;
        this.init();
    }

    init() {
        if (this.prevBtn) this.prevBtn.addEventListener('click', () => this.prev());
        if (this.nextBtn) this.nextBtn.addEventListener('click', () => this.next());
        this.dots.forEach((dot, i) => {
            dot.addEventListener('click', () => this.goTo(i));
        });
    }

    goTo(index) {
        this.current = index;
        this.track.style.transform = `translateX(-${this.current * 100}%)`;
        this.dots.forEach((d, i) => d.classList.toggle('active', i === this.current));
    }

    next() {
        this.goTo((this.current + 1) % this.total);
    }

    prev() {
        this.goTo((this.current - 1 + this.total) % this.total);
    }
}

// ===================== THEME TOGGLE =====================
class ThemeManager {
    constructor() {
        this.toggle = document.getElementById('theme-toggle');
        this.saved = localStorage.getItem('scoosh-theme');
        if (this.saved) {
            document.documentElement.setAttribute('data-theme', this.saved);
        }
        if (this.toggle) {
            this.toggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem('scoosh-theme', next);
    }
}

// ===================== CAR CONFIGURATOR DATA =====================
const configuratorModels = {
    cybertruck: {
        name: 'Cybertruck Imperial',
        basePrice: 99900,
        image: 'assets/cybertruck_hero.png',
        colors: [
            { name: 'Stainless Steel', value: '#8a8a8a' },
            { name: 'Matte Black', value: '#2a2a2a' },
            { name: 'Arctic White', value: '#e8e8e8' },
            { name: 'Desert Bronze', value: '#8b7355' }
        ],
        wheels: [
            { name: '20" Aero', price: 0, icon: '⬡' },
            { name: '22" Sport', price: 2500, icon: '⬢' },
            { name: '24" Elite', price: 4500, icon: '⬣' }
        ],
        interiors: [
            { name: 'Obsidian Leather', price: 0 },
            { name: 'White Alcantara', price: 3500 },
            { name: 'Bronze Nappa', price: 5000 }
        ]
    },
    zeekr8x: {
        name: 'Zeekr 8X Imperial',
        basePrice: 78500,
        image: 'assets/model3_hero.png',
        colors: [
            { name: 'Midnight Black', value: '#1a1a1a' },
            { name: 'Pearl White', value: '#f0f0f0' },
            { name: ' Racing Green', value: '#2d4a3e' },
            { name: 'Crimson Red', value: '#8b2500' }
        ],
        wheels: [
            { name: '19" Standard', price: 0, icon: '⬡' },
            { name: '20" Performance', price: 1800, icon: '⬢' },
            { name: '21" Premium', price: 3200, icon: '⬣' }
        ],
        interiors: [
            { name: 'Charcoal Wool', price: 0 },
            { name: 'Cream Leather', price: 2800 },
            { name: 'Black Sport', price: 4200 }
        ]
    },
    zeekr9x: {
        name: 'Zeekr 9X Imperial',
        basePrice: 112000,
        image: 'assets/modelx_heading.png',
        colors: [
            { name: 'Onyx Black', value: '#0f0f0f' },
            { name: 'Glacier White', value: '#e5e5e5' },
            { name: 'Imperial Gold', value: '#b8941f' },
            { name: 'Deep Navy', value: '#1a2744' }
        ],
        wheels: [
            { name: '21" Aero', price: 0, icon: '⬡' },
            { name: '22" Turbine', price: 3000, icon: '⬢' },
            { name: '23" Forged', price: 5500, icon: '⬣' }
        ],
        interiors: [
            { name: 'Imperial Black', price: 0 },
            { name: 'Tundra Beige', price: 4000 },
            { name: 'Midnight Blue', price: 5500 }
        ]
    },
    roadster: {
        name: 'Roadster Imperial',
        basePrice: 185000,
        image: 'assets/roadster_hero.png',
        colors: [
            { name: 'Velocity Red', value: '#cc0000' },
            { name: 'Stealth Black', value: '#1a1a1a' },
            { name: 'Aero Silver', value: '#c0c0c0' },
            { name: 'Electric Blue', value: '#0047ab' }
        ],
        wheels: [
            { name: '20" Carbon', price: 0, icon: '⬡' },
            { name: '21" Track', price: 4000, icon: '⬢' },
            { name: '22" Street', price: 6000, icon: '⬣' }
        ],
        interiors: [
            { name: 'Racing Red', price: 0 },
            { name: 'Alpine White', price: 3500 },
            { name: 'Stealth Grey', price: 5000 }
        ]
    }
};

// ===================== SITE DATA =====================
const siteData = {
    reserve: {
        isCustomHtml: true,
        html: `
            <div class="reserve-page">
                <div class="reserve-header reveal">
                    <div class="feature-label">BY APPOINTMENT ONLY</div>
                    <h1 class="reserve-title">Secure Your Legacy</h1>
                    <p class="reserve-desc">Entering the Imperial circle is more than a purchase; it is an initiation into a standard of automotive excellence that knows no peer.</p>
                </div>

                <div class="page-section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 1200px; margin: 4rem auto; align-items: center;">
                    <div class="reveal-left">
                        <img src="assets/model3_next.png" alt="Imperial Interior" style="width: 110%; border: 5px solid rgba(212,175,55,0.3); border-radius: 8px;">
                    </div>
                    <div class="reveal-right">
                        <div class="feature-label">THE EXPERIENCE</div>
                        <h2 class="feature-title">Luxury Redefined</h2>
                        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.8; margin: 1.5rem 0;">Every detail of the Imperial cabin is meticulously crafted. From hand-stitched leather to ambient lighting that responds to your mood, the interior is a masterpiece of automotive engineering.</p>
                    </div>
                </div>

                <div class="reserve-form-container page-section reveal-scale" style="max-width: 1200px; margin: 4rem auto;">
                    <div style="margin-bottom: 3rem;">
                        <div class="feature-label" style="border-left: 2px solid var(--accent-gold); padding-left: 10px; margin-bottom: 1rem;">INITIATE YOUR RESERVATION</div>
                        <h3 style="font-size: 1.3rem; margin-bottom: 1.5rem;">Complete Your Profile</h3>
                    </div>
                    <form id="reservation-form" novalidate>
                        <div class="form-grid">
                            <div class="form-column">
                                <div class="feature-label" style="border-left: 2px solid var(--accent-gold); padding-left: 10px; margin-bottom: 1.5rem;">CLIENT IDENTITY</div>
                                <div class="form-group">
                                    <label for="res-name">FULL NAME</label>
                                    <input type="text" id="res-name" name="fullName" placeholder="Johnathan Q. Sterling" required>
                                    <div class="error-message">Please enter your full name.</div>
                                </div>
                                <div class="form-group">
                                    <label for="res-email">E-MAIL</label>
                                    <input type="email" id="res-email" name="email" placeholder="johnathansterling@scooshautos.com" required>
                                    <div class="error-message">Please enter a valid email address.</div>
                                </div>
                                <div class="form-group">
                                    <label for="res-region">REGION</label>
                                    <select id="res-region" name="region" required>
                                        <option value="">Select Jurisdiction</option>
                                        <option value="north-america">North America</option>
                                        <option value="europe">Europe</option>
                                        <option value="middle-east">Middle East</option>
                                        <option value="asia-pacific">Asia Pacific</option>
                                        <option value="latin-america">Latin America</option>
                                        <option value="africa">Africa</option>
                                    </select>
                                    <div class="error-message">Please select your region.</div>
                                </div>
                            </div>
                            <div class="form-column">
                                <div class="feature-label" style="border-left: 2px solid var(--accent-gold); padding-left: 10px; margin-bottom: 1.5rem;">SPECIFICATION</div>
                                <div class="form-group">
                                    <label>EDITION SELECT</label>
                                    <div class="edition-select-grid">
                                        <button type="button" class="edition-btn active" data-edition="founder">FOUNDER'S</button>
                                        <button type="button" class="edition-btn" data-edition="imperial">IMPERIAL</button>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label>CABIN CURATION</label>
                                    <div class="color-swatches">
                                        <div class="swatch active" data-color="obsidian" style="background: #000;" tabindex="0" role="button" aria-label="Obsidian Black"></div>
                                        <div class="swatch" data-color="arctic" style="background: #e6e6e6;" tabindex="0" role="button" aria-label="Arctic White"></div>
                                        <div class="swatch" data-color="bronze" style="background: #4a433a;" tabindex="0" role="button" aria-label="Bronze Age"></div>
                                        <div class="swatch" data-color="carbon" style="background: #2b2b2b;" tabindex="0" role="button" aria-label="Carbon Shadow"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="form-footer">
                            <p>By submitting this request, you authorize our team to perform a private verification of credentials.</p>
                            <button type="submit" class="btn-primary" style="padding: 1rem 2rem; font-size: 0.8rem;">REQUEST RESERVATION</button>
                        </div>
                    </form>
                </div>

                <div class="page-section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 1200px; margin: 4rem auto; align-items: center;">
                    <div style="order: 2;" class="reveal-right">
                        <img src="assets/reserve_engine.png" alt="Imperial Exterior" style="width: 100%; border: 1px solid rgba(212,175,55,0.3); border-radius: 8px;">
                    </div>
                    <div style="order: 1;" class="reveal-left">
                        <div class="feature-label">DESIGN EXCELLENCE</div>
                        <h2 class="feature-title">Engineered Perfection</h2>
                        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.8; margin: 1.5rem 0;">The Imperial exterior embodies power and elegance. Aerodynamic precision meets bespoke craftsmanship.</p>
                    </div>
                </div>

                <div class="page-section reveal" style="background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)); padding: 6rem 4rem; border-top: 1px solid rgba(212,175,55,0.2); border-bottom: 1px solid rgba(212,175,55,0.2); border-radius: 12px; max-width: 1200px; margin: 4rem auto;">
                    <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem;">
                        <div class="glass-card" style="text-align: center; padding: 2rem;">
                            <h3 style="font-size: 1.3rem; margin: 1rem 0; color: var(--accent-gold);">Dedicated Liaison</h3>
                            <p style="color: var(--text-muted); font-size: 0.9rem;">Your personal concierge is available 24/7 to handle logistics, from track-side delivery to private maintenance scheduling.</p>
                        </div>
                        <div class="glass-card" style="text-align: center; padding: 2rem;">
                            <h3 style="font-size: 1.3rem; margin: 1rem 0; color: var(--accent-gold);">Artisanal Bespoke</h3>
                            <p style="color: var(--text-muted); font-size: 0.9rem;">Access to the Imperial Atelier to select rare wood veneers, hand-stitched leathers, and precious metal accents.</p>
                        </div>
                        <div class="glass-card" style="text-align: center; padding: 2rem;">
                            <h3 style="font-size: 1.3rem; margin: 1rem 0; color: var(--accent-gold);">Encrypted Privacy</h3>
                            <p style="color: var(--text-muted); font-size: 0.9rem;">We prioritize your anonymity. All transaction data is secured through military-grade encryption protocols.</p>
                        </div>
                    </div>
                </div>

                <div class="page-section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 1200px; margin: 4rem auto; align-items: center;">
                    <div class="reveal-left">
                        <img src="assets/reserve_dashboard.jpg" alt="Imperial Dashboard" style="width: 100%; border: 1px solid rgba(212,175,55,0.3); border-radius: 8px;">
                    </div>
                    <div class="reveal-right">
                        <div class="feature-label">CONTROL & COMMAND</div>
                        <h2 class="feature-title">Next-Gen Interface</h2>
                        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.8; margin: 1.5rem 0;">The Imperial dashboard puts cutting-edge technology at your fingertips. Intuitive controls and seamless connectivity make every drive effortless.</p>
                    </div>
                </div>

                <div class="page-section reveal" style="text-align: center; margin-bottom: 6rem;">
                    <p class="quote" style="font-family: var(--font-serif); font-style: italic; font-size: 2rem; max-width: 600px; margin: 0 auto 3rem;">"True luxury is found in the things you don't have to think about."</p>
                    <div class="action-buttons">
                        <button class="btn-secondary" data-action="scroll-top" style="border-color: var(--accent-gold); color: var(--accent-gold);">START CONFIGURATION</button>
                        <button class="btn-secondary" data-modal="contact" style="border-color: rgba(255,255,255,0.2); color: var(--text-main);">TALK TO CONCIERGE</button>
                    </div>
                </div>
            </div>
        `
    },
    home: {
        isCustomHtml: true,
        html: `
            <div class="home-hero page-section">
                <div class="home-hero-content">
                    <div class="feature-label">ELITE PERFORMANCE</div>
                    <h1 class="home-hero-title">THE SUMMIT OF<br><span class="gradient-text" style="font-family: var(--font-serif); font-style: italic; font-weight: normal; text-transform: none; letter-spacing: normal;">Sophistication.</span></h1>
                    <p class="home-hero-desc">Experience the Imperial Edition — where bespoke craftsmanship meets the future of electric mobility. Curated for the few who demand absolute excellence.</p>
                    <div class="action-buttons" style="justify-content: flex-start; margin-top: 2rem;">
                        <button class="btn-primary" data-action="configurator">CONFIGURE YOURS</button>
                        <button class="btn-secondary" data-action="scroll-fleet">LEARN MORE</button>
                    </div>
                </div>
            </div>

            <div class="fleet-section page-section" id="fleet-section">
                <div class="fleet-header reveal">
                    <div>
                        <div class="feature-label">THE FLEET</div>
                        <h2 class="feature-title" style="margin-bottom: 0;">Imperial Selection</h2>
                    </div>
                    <p class="fleet-desc">Every model is engineered with premium materials and signature Imperial finishes.</p>
                </div>
                <div class="fleet-grid">
                    <div class="fleet-card reveal-left" data-nav="zeekr9x" tabindex="0" role="button" aria-label="View Zeekr 9X">
                        <img src="assets/modelx_heading.png" alt="Zeekr 9X">
                        <div class="fleet-card-text">
                            <h3>ZEEKR 9X</h3>
                            <p>LUXURY UTILITY</p>
                        </div>
                    </div>
                    <div class="fleet-card reveal-right" data-nav="cybertruck" tabindex="0" role="button" aria-label="View Cybertruck">
                        <img src="assets/cybertruck_hero.png" alt="Cybertruck">
                        <div class="fleet-card-text">
                            <h3>CYBERTRUCK</h3>
                            <p>ARMORED UTILITY</p>
                        </div>
                    </div>
                    <div class="fleet-card fleet-card-full reveal-scale" data-nav="zeekr8x" tabindex="0" role="button" aria-label="View Zeekr 8X">
                        <img src="assets/model3_hero.png" alt="Zeekr 8X">
                        <div class="fleet-card-text">
                            <h3>ZEEKR 8X</h3>
                            <p>DYNAMIC PRECISION</p>
                        </div>
                        <div class="fleet-arrow"></div>
                    </div>
                </div>
            </div>

            <div class="feature-split page-section" style="margin: 6rem auto; align-items: center;">
                <div class="feature-image-container reveal-left">
                    <img src="assets/cybertruck_interior.png" class="feature-image" style="border: 1px solid rgba(212,175,55,0.3); border-radius: 8px;" alt="Interior">
                </div>
                <div class="feature-text reveal-right" style="padding-left: 3rem;">
                    <div class="feature-label">THE IMPERIAL STANDARD</div>
                    <h2 class="feature-title">Crafted Without<br>Compromise</h2>
                    <div class="feature-list">
                        <div class="feature-list-item">
                            <div>
                                <h4>Bespoke Finishes</h4>
                                <p>Hand-applied gold leaf accents and custom obsidian carbon fiber weave exclusive to the Imperial line.</p>
                            </div>
                        </div>
                        <div class="feature-list-item">
                            <div>
                                <h4>Climate Intelligence</h4>
                                <p>AI-driven atmospheric control that learns your preference and synchronizes with your biometrics.</p>
                            </div>
                        </div>
                        <div class="feature-list-item">
                            <div>
                                <h4>Fortified Security</h4>
                                <p>Advanced biometric encryption and autonomous protective protocols for the modern luminary.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="heritage-section page-section">
                <div class="feature-label reveal" style="text-align: center;">HERITAGE</div>
                <h2 class="heritage-title reveal">The Legacy of Performance</h2>
                <div class="heritage-line reveal"></div>
                <p class="heritage-desc reveal">A decade of pushing boundaries culminates in this limited release. The Imperial Edition is not just a vehicle; it is a statement of enduring innovation and the relentless pursuit of perfection.</p>
                <div class="heritage-stats">
                    <div class="stat-box reveal">
                        <div class="stat-value">1.9</div>
                        <div class="stat-label">ZERO TO SIXTY (SECONDS)</div>
                    </div>
                    <div class="stat-box reveal">
                        <div class="stat-value">400</div>
                        <div class="stat-label">RANGE IN MILES</div>
                    </div>
                    <div class="stat-box reveal">
                        <div class="stat-value">1000</div>
                        <div class="stat-label">PEAK POWER (HP)</div>
                    </div>
                </div>
            </div>
        `
    },
    cybertruck: {
        hero: {
            title: "CYBERTRUCK | <span>IMPERIAL</span>",
            subtitle: "The Peak of Utility in Motion",
            image: "assets/cybertruck_hero.png",
            carousel: [
                { src: 'assets/cybertruck_hero.png', alt: 'Cybertruck Exterior' },
                { src: 'assets/cybertruck_interior.png', alt: 'Cybertruck Interior' },
                { src: 'assets/cybertruck_wireframe.png', alt: 'Cybertruck Wireframe' }
            ]
        },
        sections: `
            <div class="feature-split page-section">
                <div class="feature-text reveal-left">
                    <div class="feature-label">01. DEFENSE</div>
                    <h2 class="feature-title">The Ultra-Hard 30X Cold-Rolled Stainless-Steel Exoskeleton</h2>
                    <p class="feature-desc">Forged at the heart of innovation, the Imperial Edition features a monolithic exoskeleton that provides against dents, damage, and long-term corrosion. This is not just a frame; it is a shield.</p>
                    <div class="feature-box">
                        <p>ARMORED GLASS STANDARD</p>
                        <h4>100x MULTI ALLOY DEFENSE</h4>
                    </div>
                </div>
                <div class="feature-image-container reveal-right">
                    <img src="assets/cybertruck_hero.png" class="feature-image" alt="Exoskeleton" style="border-radius: 8px;">
                </div>
            </div>

            <div class="full-width-section page-section">
                <div class="feature-label reveal">02. SPECIFICATIONS</div>
                <h2 class="feature-title reveal">A Modern Sanctuary</h2>
                <img src="assets/cybertruck_interior.png" class="full-image reveal-scale" alt="Interior" style="border-radius: 8px;">
                <div class="icon-grid">
                    <div class="icon-item reveal">
                        <h5>Bioweapon Defense Mode</h5>
                        <p>HEPA filtration ensures the cabin remains a pure breathing space.</p>
                    </div>
                    <div class="icon-item reveal">
                        <h5>Custom Acoustics</h5>
                        <p>Studio-quality audio system with acoustic glass for silence.</p>
                    </div>
                    <div class="icon-item reveal">
                        <h5>Built to be Indestructible</h5>
                        <p>180° Infinity Touch screen controlling the entire ecosystem.</p>
                    </div>
                </div>
            </div>

            <div class="feature-split reverse page-section">
                <div class="feature-text reveal-right">
                    <div class="feature-label">03. ARCHITECTURE</div>
                    <h2 class="feature-title">Engineering Poetry</h2>
                    <p class="feature-desc" style="font-style: italic;">"A machine built for the impossible, engineered with the precision of a master watchmaker."</p>
                    <div class="specs-boxes">
                        <div class="spec-box"><div class="spec-value">2.9s</div><div class="spec-label">0-60 MPH ACCELERATION</div></div>
                        <div class="spec-box"><div class="spec-value">14000</div><div class="spec-label">TOWING CAPACITY (LB)</div></div>
                        <div class="spec-box"><div class="spec-value">500</div><div class="spec-label">RANGE PER CHARGE (MI)</div></div>
                    </div>
                </div>
                <div class="feature-image-container reveal-left">
                    <img src="assets/cybertruck_wireframe.png" class="feature-image" alt="Wireframe" style="border-radius: 8px;">
                </div>
            </div>

            <div class="epilogue page-section">
                <div class="feature-label reveal">EPILOGUE</div>
                <h2 class="reveal">THE PEAK OF UTILITY</h2>
                <p class="reveal">A legacy defined by strength, built for the few. The Imperial Edition is the uncompromising intersection of performance.</p>
                <div class="action-buttons reveal">
                    <button class="btn-primary" data-action="reserve">ORDER NOW</button>
                    <button class="btn-secondary" data-action="scroll-top">LEARN MORE</button>
                </div>
            </div>
        `
    },
    zeekr8x: {
        hero: {
            title: "ZEEKR 8X | <span>IMPERIAL</span>",
            subtitle: "The zenith of performance. Redesigned for the elite.",
            image: "assets/model3_hero.png",
            carousel: [
                { src: 'assets/model3_hero.png', alt: 'Zeekr 8X Exterior' },
                { src: 'assets/model3_interior.png', alt: 'Zeekr 8X Interior' },
                { src: 'assets/model3_next.png', alt: 'Zeekr 8X Rear' }
            ]
        },
        sections: `
            <div class="feature-split page-section">
                <div class="feature-text reveal-left">
                    <div class="feature-label">THE ENGINEERING</div>
                    <h2 class="feature-title">Engineering of Grandeur</h2>
                    <p class="feature-desc">The Imperial Edition seamlessly merges raw driving capability with a refined aesthetic...</p>
                    <div class="specs-boxes">
                        <div class="spec-box"><div class="spec-value">3.1s</div><div class="spec-label">0-60 MPH</div></div>
                    </div>
                </div>
                <div class="feature-image-container reveal-right">
                    <img src="assets/cybertruck_wireframe.png" class="feature-image" alt="Zeekr 8X" style="border-radius: 8px;">
                </div>
            </div>

            <div class="full-width-section page-section">
                <div class="feature-label reveal">INTERIOR</div>
                <h2 class="feature-title reveal">A Sanctuary Of Peace</h2>
                <img src="assets/model3_interior.png" class="full-image reveal-scale" alt="Zeekr 8X Interior" style="border-radius: 8px;">
                <div class="icon-grid">
                    <div class="icon-item reveal">
                        <h5>Premium Connectivity</h5>
                        <p>Stay connected wherever you go.</p>
                    </div>
                </div>
            </div>

            <div class="full-width-section page-section">
                <div class="feature-label reveal">REAR CABIN</div>
                <h2 class="feature-title reveal">The Back View</h2>
                <img src="assets/model3_next.png" class="full-image reveal-scale" alt="Zeekr 8X Rear Cabin" style="border-radius: 8px;">
                <div class="icon-grid">
                    <div class="icon-item reveal"><h5>Panoramic Sunroof</h5><p>Floor-to-ceiling glass bathing all three rows in natural light.</p></div>
                    <div class="icon-item reveal"><h5>Rear Entertainment</h5><p>Ceiling-mounted 4K display with independent media control for rear passengers.</p></div>
                    <div class="icon-item reveal"><h5>Lounge Seating</h5><p>Hand-stitched leather with amber accent stitching — a private jet cabin on wheels.</p></div>
                </div>
            </div>

            <div class="epilogue page-section">
                <h2 class="reveal">BRUTAL FORCE. PURE GRACE.</h2>
                <div class="action-buttons reveal">
                    <button class="btn-primary" data-action="reserve">ORDER NOW</button>
                    <button class="btn-secondary" data-modal="contact">SCHEDULE TEST DRIVE</button>
                </div>
            </div>
        `
    },
    zeekr9x: {
        hero: {
            title: "ZEEKR 9X | <span>IMPERIAL</span>",
            subtitle: "The most advanced electric SUV. Now redefining luxury.",
            image: "assets/modelx_heading.png",
            carousel: [
                { src: 'assets/modelx_heading.png', alt: 'Zeekr 9X Heading' },
                { src: 'assets/modelx_hero.png', alt: 'Zeekr 9X Exterior' },
                { src: 'assets/modelx_interior.png', alt: 'Zeekr 9X Interior' },
                { src: 'assets/modelx_rear.png', alt: 'Zeekr 9X Rear' }
            ]
        },
        sections: `
            <div class="feature-split page-section">
                <div class="feature-text reveal-left">
                    <div class="feature-label">01. DESIGN</div>
                    <h2 class="feature-title">Falcon Wing Doors. Reimagined.</h2>
                    <p class="feature-desc">The Zeekr 9X Imperial Edition introduces a mono-formed door architecture that defies convention. Each Falcon Wing door operates with surgical precision, granting access to rear cabins in spaces no other SUV can match.</p>
                    <div class="feature-box">
                        <p>PANORAMIC GLASS ROOF STANDARD</p>
                        <h4>7-SEAT IMPERIAL CONFIGURATION</h4>
                    </div>
                </div>
                <div class="feature-image-container reveal-right">
                    <img src="assets/modelx_hero.png" class="feature-image" alt="Zeekr 9X Exterior" style="border-radius: 8px;">
                </div>
            </div>

            <div class="full-width-section page-section">
                <div class="feature-label reveal">02. INTERIOR</div>
                <h2 class="feature-title reveal">A Cabin Above All Others</h2>
                <img src="assets/modelx_interior.png" class="full-image reveal-scale" alt="Zeekr 9X Interior" style="border-radius: 8px;">
                <div class="icon-grid">
                    <div class="icon-item reveal"><h5>Falcon Wing Access</h5><p>Unprecedented entry in tight spaces — second and third row, effortlessly.</p></div>
                    <div class="icon-item reveal"><h5>22-Speaker Acoustics</h5><p>Concert-hall audio engineered for the Imperial cabin environment.</p></div>
                    <div class="icon-item reveal"><h5>Bioweapon Defense Mode</h5><p>HEPA filtration seals the cabin against contaminants at all times.</p></div>
                </div>
            </div>

            <div class="feature-split reverse page-section">
                <div class="feature-text reveal-right">
                    <div class="feature-label">03. ARCHITECTURE</div>
                    <h2 class="feature-title">Engineered Without Limits</h2>
                    <p class="feature-desc" style="font-style: italic;">"The most capable electric SUV ever built — redefined for those who refuse to compromise."</p>
                    <div class="specs-boxes">
                        <div class="spec-box"><div class="spec-value">2.5s</div><div class="spec-label">0-60 MPH ACCELERATION</div></div>
                        <div class="spec-box"><div class="spec-value">335</div><div class="spec-label">RANGE PER CHARGE (MI)</div></div>
                        <div class="spec-box"><div class="spec-value">7</div><div class="spec-label">PASSENGER SEATING</div></div>
                    </div>
                </div>
                <div class="feature-image-container reveal-left">
                    <img src="assets/modelx_tech.png" class="feature-image" alt="Zeekr 9X Architecture" style="border-radius: 8px;">
                </div>
            </div>

            <div class="full-width-section page-section">
                <div class="feature-label reveal">04. REAR CABIN</div>
                <h2 class="feature-title reveal">The Imperial Lounge</h2>
                <img src="assets/modelx_rear.png" class="full-image reveal-scale" alt="Zeekr 9X Rear Cabin" style="border-radius: 8px;">
                <div class="icon-grid">
                    <div class="icon-item reveal"><h5>Panoramic Sunroof</h5><p>Floor-to-ceiling glass bathing all three rows in natural light.</p></div>
                    <div class="icon-item reveal"><h5>Rear Entertainment</h5><p>Ceiling-mounted 4K display with independent media control for rear passengers.</p></div>
                    <div class="icon-item reveal"><h5>Lounge Seating</h5><p>Hand-stitched leather with amber accent stitching — a private jet cabin on wheels.</p></div>
                </div>
            </div>

            <div class="epilogue page-section">
                <div class="feature-label reveal">EPILOGUE</div>
                <h2 class="reveal">THE SUMMIT OF LUXURY UTILITY</h2>
                <p class="reveal">Seven seats. Zero compromises. The Zeekr 9X Imperial Edition is the definitive statement in electric luxury.</p>
                <div class="action-buttons reveal">
                    <button class="btn-primary" data-action="reserve">ORDER NOW</button>
                    <button class="btn-secondary" data-action="scroll-top">LEARN MORE</button>
                </div>
            </div>
        `
    },
    roadster: {
        hero: {
            title: "THE ROADSTER | <span>IMPERIAL</span>",
            subtitle: "A Masterpiece of Pure Velocity",
            image: "assets/roadster_hero.png",
            carousel: [
                { src: 'assets/roadster_hero.png', alt: 'Roadster Exterior' },
                { src: 'assets/cybertruck_wireframe.png', alt: 'Roadster Wireframe' }
            ]
        },
        sections: `
            <div class="full-width-section page-section" style="margin-top: 0;">
                <h2 class="reveal" style="margin-bottom: 2rem;">Shattering Expectations</h2>
                <div class="icon-grid">
                    <div class="icon-item reveal"><span class="counter-value">1.9s</span><h5>0-60 MPH</h5></div>
                    <div class="icon-item reveal"><span class="counter-value">250</span><h5>MPH TOP SPEED</h5></div>
                    <div class="icon-item reveal"><span class="counter-value">620</span><h5>MILE RANGE</h5></div>
                </div>
            </div>

            <div class="feature-split reverse page-section">
                <div class="feature-text reveal-right">
                    <div class="feature-label">ENGINEERING AS ART</div>
                    <h2 class="feature-title">Precision Engineering.</h2>
                    <p class="feature-desc">The Roadster Imperial's powertrain is a masterclass in electrical engineering.</p>
                </div>
                <div class="feature-image-container reveal-left">
                    <img src="assets/cybertruck_wireframe.png" class="feature-image" alt="Wireframe" style="border-radius: 8px;">
                </div>
            </div>

            <div class="epilogue page-section">
                <h2 class="reveal">The Future of Speed, Personalized</h2>
                <div class="action-buttons reveal">
                    <button class="btn-primary" data-action="reserve">ORDER NOW</button>
                    <button class="btn-secondary" data-action="configurator">VIEW CONFIGURATOR</button>
                </div>
            </div>
        `
    },
    configurator: {
        isCustomHtml: true,
        html: `
            <div class="configurator-page">
                <div class="config-header reveal">
                    <div class="feature-label">BUILD YOUR DREAM</div>
                    <h1 style="font-size: 3rem; margin-bottom: 1rem;">IMPERIAL <span class="gradient-text">CONFIGURATOR</span></h1>
                    <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto;">Select your model, choose your specification, and visualize perfection.</p>
                </div>

                <div class="config-layout">
                    <div class="config-preview reveal-left">
                        <div class="config-color-overlay glass-card" id="config-preview-box">
                            <img id="config-preview-img" src="assets/cybertruck_hero.png" alt="Configured Car" class="config-preview-image">
                        </div>
                        <div class="config-price" style="margin-top: 2rem;">
                            <div class="config-price-label">ESTIMATED PRICE</div>
                            <div class="config-price-value" id="config-price">$99,900</div>
                            <button class="btn-primary" data-action="reserve" style="margin-top: 1rem;">RESERVE NOW</button>
                        </div>
                    </div>

                    <div class="config-options reveal-right">
                        <div class="config-section">
                            <h3>SELECT MODEL</h3>
                            <div class="config-model-grid" id="config-models"></div>
                        </div>

                        <div class="config-section">
                            <h3>EXTERIOR COLOR</h3>
                            <div class="config-color-grid" id="config-colors"></div>
                        </div>

                        <div class="config-section">
                            <h3>WHEELS</h3>
                            <div class="config-wheel-grid" id="config-wheels"></div>
                        </div>

                        <div class="config-section">
                            <h3>INTERIOR</h3>
                            <div class="config-interior-grid" id="config-interiors"></div>
                        </div>
                    </div>
                </div>
            </div>
        `
    }
};

const modalData = {
    privacy: {
        title: 'Privacy Policy',
        content: `<p>At Scoosh Autos, your privacy is paramount. We collect only the information necessary to process your reservation and deliver a world-class experience.</p><p>All personal data is encrypted using military-grade AES-256 protocols. We never sell, share, or distribute your information to third parties without explicit consent.</p><p>Our servers are hosted in Tier-4 data centers with 24/7 physical and digital security monitoring.</p><p style="color: var(--accent-gold); margin-top: 1.5rem;">Last updated: January 2026</p>`
    },
    legal: {
        title: 'Legal Notice',
        content: `<p>All specifications, images, and performance figures shown are for illustration purposes and may vary from final production models.</p><p>The Imperial Edition is a limited production line. Reservations do not guarantee delivery timelines or final pricing.</p><p>&copy; 2026 Scoosh Autos. All rights reserved. No part of this website may be reproduced without written consent.</p><p style="color: var(--accent-gold); margin-top: 1.5rem;">Terms subject to change without notice.</p>`
    },
    contact: {
        title: 'Contact Us',
        content: `<p>For private consultations, reservations, or inquiries about the Imperial Edition, please reach out through our dedicated channels.</p><p style="color: var(--accent-gold); margin-top: 1rem;">concierge@scooshautos.com</p><p>+1 (800) 742-SCOO</p><p style="margin-top: 1.5rem;">Private showings available by appointment in Los Angeles, Dubai, London, and Singapore.</p>`
    }
};

// ===================== MAIN APP =====================
const appContent = document.getElementById('app-content');
const navLinks = document.querySelectorAll('.nav-link');
const logo = document.querySelector('.logo');
const reserveBtn = document.querySelector('.reserve-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
const toast = document.getElementById('toast');
const footerLinks = document.querySelectorAll('.footer-links a[data-modal]');
const header = document.querySelector('.global-header');

let toastTimeout = null;
let scrollAnimator = new ScrollAnimator();
let currentConfig = { model: 'cybertruck', color: 0, wheel: 0, interior: 0 };

function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    if (toastTimeout) clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => toast.classList.remove('show'), 3000);
}

function openModal(key) {
    const data = modalData[key];
    if (!data || !modalOverlay || !modalBody) return;
    modalBody.innerHTML = `<h2>${data.title}</h2>${data.content}`;
    modalOverlay.classList.add('active');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
}

function formatPrice(n) {
    return '$' + n.toLocaleString('en-US');
}

function updateConfigurator() {
    const model = configuratorModels[currentConfig.model];
    const color = model.colors[currentConfig.color];
    const wheel = model.wheels[currentConfig.wheel];
    const interior = model.interiors[currentConfig.interior];
    const total = model.basePrice + wheel.price + interior.price;

    const previewImg = document.getElementById('config-preview-img');
    const priceEl = document.getElementById('config-price');
    if (previewImg) previewImg.src = model.image;
    if (priceEl) priceEl.textContent = formatPrice(total);

    document.querySelectorAll('.config-model-btn').forEach((btn, i) => {
        btn.classList.toggle('active', Object.keys(configuratorModels)[i] === currentConfig.model);
    });

    document.querySelectorAll('.config-color-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === currentConfig.color);
    });

    document.querySelectorAll('.config-wheel-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === currentConfig.wheel);
    });

    document.querySelectorAll('.config-interior-btn').forEach((btn, i) => {
        btn.classList.toggle('active', i === currentConfig.interior);
    });
}

function buildConfigurator() {
    const modelsGrid = document.getElementById('config-models');
    const colorsGrid = document.getElementById('config-colors');
    const wheelsGrid = document.getElementById('config-wheels');
    const interiorsGrid = document.getElementById('config-interiors');

    if (!modelsGrid) return;

    modelsGrid.innerHTML = Object.entries(configuratorModels).map(([key, m], i) =>
        `<button class="config-model-btn ${key === currentConfig.model ? 'active' : ''}" data-model="${key}">
            <h4>${m.name.split(' ')[0]}</h4>
            <p>${formatPrice(m.basePrice)}</p>
        </button>`
    ).join('');

    modelsGrid.querySelectorAll('.config-model-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            currentConfig.model = btn.dataset.model;
            currentConfig.color = 0;
            currentConfig.wheel = 0;
            currentConfig.interior = 0;
            buildConfigOptions();
            updateConfigurator();
        });
    });

    buildConfigOptions();
}

function buildConfigOptions() {
    const model = configuratorModels[currentConfig.model];
    const colorsGrid = document.getElementById('config-colors');
    const wheelsGrid = document.getElementById('config-wheels');
    const interiorsGrid = document.getElementById('config-interiors');

    if (colorsGrid) {
        colorsGrid.innerHTML = model.colors.map((c, i) =>
            `<button class="config-color-btn ${i === 0 ? 'active' : ''}" data-index="${i}" style="background: ${c.value};">
                <span class="color-label">${c.name}</span>
            </button>`
        ).join('');
        colorsGrid.querySelectorAll('.config-color-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentConfig.color = parseInt(btn.dataset.index);
                updateConfigurator();
            });
        });
    }

    if (wheelsGrid) {
        wheelsGrid.innerHTML = model.wheels.map((w, i) =>
            `<button class="config-wheel-btn ${i === 0 ? 'active' : ''}" data-index="${i}">
                <span>${w.icon}</span>
                <p>${w.name}</p>
                <p style="color: var(--accent-gold); font-size: 0.65rem;">${w.price > 0 ? '+' + formatPrice(w.price) : 'INCLUDED'}</p>
            </button>`
        ).join('');
        wheelsGrid.querySelectorAll('.config-wheel-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentConfig.wheel = parseInt(btn.dataset.index);
                updateConfigurator();
            });
        });
    }

    if (interiorsGrid) {
        interiorsGrid.innerHTML = model.interiors.map((inter, i) =>
            `<button class="config-interior-btn ${i === 0 ? 'active' : ''}" data-index="${i}">
                <h4>${inter.name}</h4>
                <p>${inter.price > 0 ? '+' + formatPrice(inter.price) : 'INCLUDED'}</p>
            </button>`
        ).join('');
        interiorsGrid.querySelectorAll('.config-interior-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                currentConfig.interior = parseInt(btn.dataset.index);
                updateConfigurator();
            });
        });
    }
}

function renderPage(modelId) {
    if (!appContent) return;
    const data = siteData[modelId];
    if (!data) return;

    scrollAnimator.disconnect();
    appContent.classList.remove('page-visible');

    if (modelId === 'home') {
        appContent.style.paddingTop = '0';
    } else {
        appContent.style.paddingTop = '6rem';
    }

    window.scrollTo({ top: 0 });

    requestAnimationFrame(() => {
        if (data.isCustomHtml) {
            appContent.innerHTML = data.html;
        } else {
            let carouselHTML = '';
            if (data.hero.carousel) {
                const slides = data.hero.carousel.map((s, i) =>
                    `<div class="carousel-slide"><img src="${s.src}" alt="${s.alt}"></div>`
                ).join('');
                const dots = data.hero.carousel.map((_, i) =>
                    `<button class="carousel-dot ${i === 0 ? 'active' : ''}"></button>`
                ).join('');
                carouselHTML = `
                    <div class="carousel">
                        <div class="carousel-track">${slides}</div>
                        <button class="carousel-btn prev" aria-label="Previous slide">&#8249;</button>
                        <button class="carousel-btn next" aria-label="Next slide">&#8250;</button>
                        <div class="carousel-dots">${dots}</div>
                    </div>
                `;
            }

            appContent.innerHTML = `
                <div class="hero-section page-section">
                    <h1>${data.hero.title}</h1>
                    <p class="subtitle">${data.hero.subtitle}</p>
                    ${carouselHTML}
                </div>
                ${data.sections}
            `;
        }

        appContent.classList.add('page-visible');

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.target === modelId);
        });

        attachPageListeners();

        scrollAnimator.observe(appContent);
        AnimatedCounter.observe(appContent);

        if (modelId === 'configurator') {
            buildConfigurator();
            updateConfigurator();
        }

        appContent.querySelectorAll('.carousel').forEach(c => new Carousel(c));
    }, 300);
}

function attachPageListeners() {
    if (!appContent) return;

    appContent.querySelectorAll('[data-action="reserve"]').forEach(btn => {
        btn.addEventListener('click', () => renderPage('reserve'));
    });

    appContent.querySelectorAll('[data-action="configurator"]').forEach(btn => {
        btn.addEventListener('click', () => renderPage('configurator'));
    });

    appContent.querySelectorAll('[data-action="scroll-fleet"]').forEach(btn => {
        btn.addEventListener('click', () => {
            const fleet = document.getElementById('fleet-section');
            if (fleet) fleet.scrollIntoView({ behavior: 'smooth' });
        });
    });

    appContent.querySelectorAll('[data-action="scroll-top"]').forEach(btn => {
        btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    });

    appContent.querySelectorAll('[data-modal]').forEach(btn => {
        btn.addEventListener('click', () => openModal(btn.dataset.modal));
    });

    appContent.querySelectorAll('.fleet-card[data-nav]').forEach(card => {
        const handler = () => renderPage(card.dataset.nav);
        card.addEventListener('click', handler);
        card.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
    });

    appContent.querySelectorAll('.edition-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            appContent.querySelectorAll('.edition-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    appContent.querySelectorAll('.swatch').forEach(swatch => {
        const handler = () => {
            appContent.querySelectorAll('.swatch').forEach(s => {
                s.classList.remove('active');
                s.style.transform = 'scale(1)';
            });
            swatch.classList.add('active');
            swatch.style.transform = 'scale(1.1)';
        };
        swatch.addEventListener('click', handler);
        swatch.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
    });

    const form = document.getElementById('reservation-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        form.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => input.closest('.form-group')?.classList.remove('error'));
        });
    }
}

function handleFormSubmit(e) {
    e.preventDefault();
    const form = e.target;
    let valid = true;

    const name = form.querySelector('#res-name');
    const email = form.querySelector('#res-email');
    const region = form.querySelector('#res-region');

    if (!name || !name.value.trim()) { name?.closest('.form-group')?.classList.add('error'); valid = false; }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.value.trim())) { email?.closest('.form-group')?.classList.add('error'); valid = false; }
    if (!region || !region.value) { region?.closest('.form-group')?.classList.add('error'); valid = false; }

    if (!valid) { showToast('Please correct the highlighted fields.'); return; }

    const edition = form.querySelector('.edition-btn.active')?.dataset.edition || 'founder';
    const color = form.querySelector('.swatch.active')?.dataset.color || 'obsidian';

    console.log('Reservation submitted:', { fullName: name.value.trim(), email: email.value.trim(), region: region.value, edition, color });
    showToast('Reservation request submitted successfully!');

    form.querySelectorAll('input').forEach(input => input.value = '');
    form.querySelector('select').selectedIndex = 0;
    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
}

function initHeaderScroll() {
    window.addEventListener('scroll', () => {
        if (header) header.classList.toggle('scrolled', window.scrollY > 50);
    });
}

function initFooterLinks() {
    footerLinks.forEach(link => {
        link.addEventListener('click', e => { e.preventDefault(); openModal(link.dataset.modal); });
    });
    if (modalClose) modalClose.addEventListener('click', closeModal);
    if (modalOverlay) modalOverlay.addEventListener('click', e => { if (e.target === modalOverlay) closeModal(); });
    document.addEventListener('keydown', e => { if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) closeModal(); });
}

function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', e => { e.preventDefault(); renderPage(e.currentTarget.dataset.target); });
    });
    if (logo) {
        const logoHandler = () => renderPage('home');
        logo.addEventListener('click', logoHandler);
        logo.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); logoHandler(); } });
    }
    if (reserveBtn) reserveBtn.addEventListener('click', () => renderPage('reserve'));
}

function init() {
    const canvas = document.getElementById('particle-canvas');
    if (canvas) new ParticleSystem(canvas);

    new ThemeManager();
    initNavigation();
    initFooterLinks();
    initHeaderScroll();
    renderPage('home');
}

init();
