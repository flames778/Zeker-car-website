const siteData = {
    reserve: {
        isCustomHtml: true,
        html: `
            <div class="reserve-page">
                <div class="reserve-header">
                    <div class="feature-label">BY APPOINTMENT ONLY</div>
                    <h1 class="reserve-title">Secure Your Legacy</h1>
                    <p class="reserve-desc">Entering the Imperial circle is more than a purchase; it is an initiation into a standard of automotive excellence that knows no peer.</p>
                </div>

                <div class="gallery-showcase page-section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 1200px; margin: 4rem auto; align-items: center;">
                    <div>
                        <img src="assets/model3_next.png" alt="Imperial Interior" style="width: 110%; border: 5px solid rgba(212, 175, 55, 0.3); border-radius: 2px;">
                    </div>
                    <div>
                        <div class="feature-label">THE EXPERIENCE</div>
                        <h2 class="feature-title">Luxury Redefined</h2>
                        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.8; margin: 1.5rem 0;">Every detail of the Imperial cabin is meticulously crafted. From hand-stitched leather to ambient lighting that responds to your mood, the interior is a masterpiece of automotive engineering.</p>
                    </div>
                </div>

                <div class="reserve-form-container page-section" style="max-width: 1200px; margin: 4rem auto;">
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
                                        <div class="swatch active" data-color="obsidian" style="background: #000; border: 2px solid var(--accent-gold);" tabindex="0" role="button" aria-label="Obsidian Black"></div>
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

                <div class="gallery-showcase page-section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 1200px; margin: 4rem auto; align-items: center;">
                    <div style="order: 2;">
                        <img src="assets/reserve_engine.png" alt="Imperial Exterior" style="width: 100%; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 4px;">
                    </div>
                    <div style="order: 1;">
                        <div class="feature-label">DESIGN EXCELLENCE</div>
                        <h2 class="feature-title">Engineered Perfection</h2>
                        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.8; margin: 1.5rem 0;">The Imperial exterior embodies power and elegance. Aerodynamic precision meets bespoke craftsmanship.</p>
                    </div>
                </div>

                <div class="reserve-features-section page-section" style="background: linear-gradient(rgba(0,0,0,0.8), rgba(0,0,0,0.9)); padding: 6rem 4rem; border-top: 1px solid rgba(212, 175, 55, 0.2); border-bottom: 1px solid rgba(212, 175, 55, 0.2);">
                    <div class="feature-grid-3" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 4rem; max-width: 1200px; margin: 0 auto;">
                        <div class="feature-item">
                            <h3 style="font-size: 1.3rem; margin: 1rem 0;">Dedicated Liaison</h3>
                            <p style="color: var(--text-muted); font-size: 0.9rem;">Your personal concierge is available 24/7 to handle logistics, from track-side delivery to private maintenance scheduling.</p>
                        </div>
                        <div class="feature-item">
                            <h3 style="font-size: 1.3rem; margin: 1rem 0;">Artisanal Bespoke</h3>
                            <p style="color: var(--text-muted); font-size: 0.9rem;">Access to the Imperial Atelier to select rare wood veneers, hand-stitched leathers, and precious metal accents.</p>
                        </div>
                        <div class="feature-item">
                            <h3 style="font-size: 1.3rem; margin: 1rem 0;">Encrypted Privacy</h3>
                            <p style="color: var(--text-muted); font-size: 0.9rem;">We prioritize your anonymity. All transaction data is secured through military-grade encryption protocols.</p>
                        </div>
                    </div>
                </div>

                <div class="gallery-showcase page-section" style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; max-width: 1200px; margin: 4rem auto; align-items: center;">
                    <div>
                        <img src="assets/reserve_dashboard.jpg" alt="Imperial Dashboard" style="width: 100%; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 4px;">
                    </div>
                    <div>
                        <div class="feature-label">CONTROL & COMMAND</div>
                        <h2 class="feature-title">Next-Gen Interface</h2>
                        <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.8; margin: 1.5rem 0;">The Imperial dashboard puts cutting-edge technology at your fingertips. Intuitive controls and seamless connectivity make every drive effortless.</p>
                    </div>
                </div>

                <div class="reserve-epilogue page-section" style="text-align: center; margin-bottom: 6rem;">
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
                    <h1 class="home-hero-title">THE SUMMIT OF<br><span style="font-family: var(--font-serif); font-style: italic; color: var(--accent-gold); font-weight: normal; text-transform: none; letter-spacing: normal;">Sophistication.</span></h1>
                    <p class="home-hero-desc">Experience the Imperial Edition — where bespoke craftsmanship meets the future of electric mobility. Curated for the few who demand absolute excellence.</p>
                    <div class="action-buttons" style="justify-content: flex-start; margin-top: 2rem;">
                        <button class="btn-primary" data-action="reserve">CONFIGURE YOURS</button>
                        <button class="btn-secondary" data-action="scroll-fleet">LEARN MORE</button>
                    </div>
                </div>
            </div>

            <div class="fleet-section page-section" id="fleet-section">
                <div class="fleet-header">
                    <div>
                        <div class="feature-label">THE FLEET</div>
                        <h2 class="feature-title" style="margin-bottom: 0;">Imperial Selection</h2>
                    </div>
                    <p class="fleet-desc">Every model is engineered with premium materials and signature Imperial finishes.</p>
                </div>
                <div class="fleet-grid">
                    <div class="fleet-card" data-nav="zeekr9x" tabindex="0" role="button" aria-label="View Zeekr 9X">
                        <img src="assets/modelx_heading.png" alt="Zeekr 9X">
                        <div class="fleet-card-text">
                            <h3>ZEEKR 9X</h3>
                            <p>LUXURY UTILITY</p>
                        </div>
                    </div>
                    <div class="fleet-card" data-nav="cybertruck" tabindex="0" role="button" aria-label="View Cybertruck">
                        <img src="assets/cybertruck_hero.png" alt="Cybertruck">
                        <div class="fleet-card-text">
                            <h3>CYBERTRUCK</h3>
                            <p>ARMORED UTILITY</p>
                        </div>
                    </div>
                    <div class="fleet-card fleet-card-full" data-nav="zeekr8x" tabindex="0" role="button" aria-label="View Zeekr 8X">
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
                <div class="feature-image-container">
                    <img src="assets/cybertruck_interior.png" class="feature-image" style="border: 1px solid rgba(212, 175, 55, 0.3);" alt="Interior">
                </div>
                <div class="feature-text" style="padding-left: 3rem;">
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
                <div class="feature-label" style="text-align: center;">HERITAGE</div>
                <h2 class="heritage-title">The Legacy of Performance</h2>
                <div class="heritage-line"></div>
                <p class="heritage-desc">A decade of pushing boundaries culminates in this limited release. The Imperial Edition is not just a vehicle; it is a statement of enduring innovation and the relentless pursuit of perfection.</p>
                
                <div class="heritage-stats">
                    <div class="stat-box">
                        <div class="stat-value">1.9s</div>
                        <div class="stat-label">ZERO TO SIXTY</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">400+</div>
                        <div class="stat-label">RANGE IN MILES</div>
                    </div>
                    <div class="stat-box">
                        <div class="stat-value">1000hp</div>
                        <div class="stat-label">PEAK POWER OUTPUT</div>
                    </div>
                </div>
            </div>
        `
    },
    cybertruck: {
        hero: {
            title: "CYBERTRUCK | <span>IMPERIAL</span>",
            subtitle: "The Peak of Utility in Motion",
            image: "assets/cybertruck_hero.png"
        },
        sections: `
            <div class="feature-split page-section">
                <div class="feature-text">
                    <div class="feature-label">01. DEFENSE</div>
                    <h2 class="feature-title">The Ultra-Hard 30X Cold-Rolled Stainless-Steel Exoskeleton</h2>
                    <p class="feature-desc">Forged at the heart of innovation, the Imperial Edition features a monolithic exoskeleton that provides against dents, damage, and long-term corrosion. This is not just a frame; it is a shield.</p>
                    <div class="feature-box">
                        <p>ARMORED GLASS STANDARD</p>
                        <h4>100x MULTI ALLOY DEFENSE</h4>
                    </div>
                </div>
                <div class="feature-image-container">
                    <img src="assets/cybertruck_hero.png" class="feature-image" alt="Exoskeleton">
                </div>
            </div>

            <div class="full-width-section page-section">
                <div class="feature-label">02. SPECIFS</div>
                <h2 class="feature-title">A Modern Sanctuary</h2>
                <img src="assets/cybertruck_interior.png" class="full-image" alt="Interior">
                <div class="icon-grid">
                    <div class="icon-item">
                        <h5>Bioweapon Defense Mode</h5>
                        <p>HEPA filtration ensures the cabin remains a pure breathing space.</p>
                    </div>
                    <div class="icon-item">
                        <h5>Custom Acoustics</h5>
                        <p>Studio-quality audio system with acoustic glass for silence.</p>
                    </div>
                    <div class="icon-item">
                        <h5>Built to be Indestructible</h5>
                        <p>180° Infinity Touch screen controlling the entire ecosystem.</p>
                    </div>
                </div>
            </div>

            <div class="feature-split reverse page-section">
                <div class="feature-text">
                    <div class="feature-label">03. ARCHITECTURE</div>
                    <h2 class="feature-title">Engineering Poetry</h2>
                    <p class="feature-desc" style="font-style: italic;">"A machine built for the impossible, engineered with the precision of a master watchmaker."</p>
                    <div class="specs-boxes">
                        <div class="spec-box">
                            <div class="spec-value">2.9s</div>
                            <div class="spec-label">0-60 MPH ACCELERATION</div>
                        </div>
                        <div class="spec-box">
                            <div class="spec-value">14,000 LB</div>
                            <div class="spec-label">TOWING CAPACITY</div>
                        </div>
                        <div class="spec-box">
                            <div class="spec-value">500 MI</div>
                            <div class="spec-label">RANGE PER CHARGE</div>
                        </div>
                    </div>
                </div>
                <div class="feature-image-container">
                    <img src="assets/cybertruck_wireframe.png" class="feature-image" alt="Wireframe">
                </div>
            </div>

            <div class="epilogue page-section">
                <div class="feature-label">EPILOGUE</div>
                <h2>THE PEAK OF UTILITY</h2>
                <p>A legacy defined by strength, built for the few. The Imperial Edition is the uncompromising intersection of performance.</p>
                <div class="action-buttons">
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
            image: "assets/model3_hero.png"
        },
        sections: `
            <div class="feature-split page-section">
                <div class="feature-text">
                    <div class="feature-label">THE ENGINEERING</div>
                    <h2 class="feature-title">Engineering of Grandeur</h2>
                    <p class="feature-desc">The Imperial Edition seamlessly merges raw driving capability with a refined aesthetic...</p>
                    <div class="specs-boxes">
                        <div class="spec-box">
                            <div class="spec-value">3.1s</div>
                            <div class="spec-label">0-60 MPH</div>
                        </div>
                    </div>
                </div>
                <div class="feature-image-container">
                    <img src="assets/cybertruck_wireframe.png" class="feature-image" alt="Zeekr 8X">
                </div>
            </div>
            
            <div class="full-width-section page-section">
                <div class="feature-label">INTERIOR</div>
                <h2 class="feature-title">A Sanctuary Of Peace</h2>
                <img src="assets/model3_interior.png" class="full-image" alt="Zeekr 8X Interior">
                <div class="icon-grid">
                    <div class="icon-item">
                        <h5>Premium Connectivity</h5>
                        <p>Stay connected wherever you go.</p>
                    </div>
                </div>
            </div>

            <div class="full-width-section page-section">
                <div class="feature-label">REAR CABIN</div>
                <h2 class="feature-title">The Back View</h2>
                <img src="assets/model3_next.png" class="full-image" alt="Zeekr 9X Rear Cabin">
                <div class="icon-grid">
                    <div class="icon-item">
                        <h5>Panoramic Sunroof</h5>
                        <p>Floor-to-ceiling glass bathing all three rows in natural light.</p>
                    </div>
                    <div class="icon-item">
                        <h5>Rear Entertainment</h5>
                        <p>Ceiling-mounted 4K display with independent media control for rear passengers.</p>
                    </div>
                    <div class="icon-item">
                        <h5>Lounge Seating</h5>
                        <p>Hand-stitched leather with amber accent stitching — a private jet cabin on wheels.</p>
                    </div>
                </div>
            </div>

            <div class="epilogue page-section">
                <h2>BRUTAL FORCE. PURE GRACE.</h2>
                <div class="action-buttons">
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
            image: "assets/modelx_heading.png"
        },
        sections: `
            <div class="feature-split page-section">
                <div class="feature-text">
                    <div class="feature-label">01. DESIGN</div>
                    <h2 class="feature-title">Falcon Wing Doors. Reimagined.</h2>
                    <p class="feature-desc">The Zeekr 9X Imperial Edition introduces a mono-formed door architecture that defies convention. Each Falcon Wing door operates with surgical precision, granting access to rear cabins in spaces no other SUV can match.</p>
                    <div class="feature-box">
                        <p>PANORAMIC GLASS ROOF STANDARD</p>
                        <h4>7-SEAT IMPERIAL CONFIGURATION</h4>
                    </div>
                </div>
                <div class="feature-image-container">
                    <img src="assets/modelx_hero.png" class="feature-image" alt="Zeekr 9X Exterior">
                </div>
            </div>

            <div class="full-width-section page-section">
                <div class="feature-label">02. INTERIOR</div>
                <h2 class="feature-title">A Cabin Above All Others</h2>
                <img src="assets/modelx_interior.png" class="full-image" alt="Zeekr 9X Interior">
                <div class="icon-grid">
                    <div class="icon-item">
                        <h5>Falcon Wing Access</h5>
                        <p>Unprecedented entry in tight spaces — second and third row, effortlessly.</p>
                    </div>
                    <div class="icon-item">
                        <h5>22-Speaker Acoustics</h5>
                        <p>Concert-hall audio engineered for the Imperial cabin environment.</p>
                    </div>
                    <div class="icon-item">
                        <h5>Bioweapon Defense Mode</h5>
                        <p>HEPA filtration seals the cabin against contaminants at all times.</p>
                    </div>
                </div>
            </div>

            <div class="feature-split reverse page-section">
                <div class="feature-text">
                    <div class="feature-label">03. ARCHITECTURE</div>
                    <h2 class="feature-title">Engineered Without Limits</h2>
                    <p class="feature-desc" style="font-style: italic;">"The most capable electric SUV ever built — redefined for those who refuse to compromise."</p>
                    <div class="specs-boxes">
                        <div class="spec-box">
                            <div class="spec-value">2.5s</div>
                            <div class="spec-label">0-60 MPH ACCELERATION</div>
                        </div>
                        <div class="spec-box">
                            <div class="spec-value">335 MI</div>
                            <div class="spec-label">RANGE PER CHARGE</div>
                        </div>
                        <div class="spec-box">
                            <div class="spec-value">7</div>
                            <div class="spec-label">PASSENGER SEATING</div>
                        </div>
                    </div>
                </div>
                <div class="feature-image-container">
                    <img src="assets/modelx_tech.png" class="feature-image" alt="Zeekr 9X Architecture">
                </div>
            </div>

            <div class="full-width-section page-section">
                <div class="feature-label">04. REAR CABIN</div>
                <h2 class="feature-title">The Imperial Lounge</h2>
                <img src="assets/modelx_rear.png" class="full-image" alt="Zeekr 9X Rear Cabin">
                <div class="icon-grid">
                    <div class="icon-item">
                        <h5>Panoramic Sunroof</h5>
                        <p>Floor-to-ceiling glass bathing all three rows in natural light.</p>
                    </div>
                    <div class="icon-item">
                        <h5>Rear Entertainment</h5>
                        <p>Ceiling-mounted 4K display with independent media control for rear passengers.</p>
                    </div>
                    <div class="icon-item">
                        <h5>Lounge Seating</h5>
                        <p>Hand-stitched leather with amber accent stitching — a private jet cabin on wheels.</p>
                    </div>
                </div>
            </div>

            <div class="epilogue page-section">
                <div class="feature-label">EPILOGUE</div>
                <h2>THE SUMMIT OF LUXURY UTILITY</h2>
                <p>Seven seats. Zero compromises. The Zeekr 9X Imperial Edition is the definitive statement in electric luxury.</p>
                <div class="action-buttons">
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
            image: "assets/roadster_hero.png"
        },
        sections: `
            <div class="full-width-section page-section" style="margin-top: 0;">
                <h2 style="margin-bottom: 2rem;">Shattering Expectations</h2>
                <div class="icon-grid">
                    <div class="icon-item">
                        <span style="font-size: 2.5rem; color: var(--accent-gold);">1.9s</span>
                        <h5>0-60 MPH</h5>
                    </div>
                    <div class="icon-item">
                        <span style="font-size: 2.5rem; color: var(--accent-gold);">250+</span>
                        <h5>MPH TOP SPEED</h5>
                    </div>
                    <div class="icon-item">
                        <span style="font-size: 2.5rem; color: var(--accent-gold);">620</span>
                        <h5>MILE RANGE</h5>
                    </div>
                </div>
            </div>

            <div class="feature-split reverse page-section">
                <div class="feature-text">
                    <div class="feature-label">ENGINEERING AS ART</div>
                    <h2 class="feature-title">Precision Engineering.</h2>
                    <p class="feature-desc">The Roadster Imperial's powertrain is a masterclass in electrical engineering.</p>
                </div>
                <div class="feature-image-container">
                    <img src="assets/cybertruck_wireframe.png" class="feature-image" alt="Wireframe">
                </div>
            </div>

            <div class="epilogue page-section">
                <h2>The Future of Speed, Personalized</h2>
                <div class="action-buttons">
                    <button class="btn-primary" data-action="reserve">ORDER NOW</button>
                    <button class="btn-secondary" data-action="scroll-top">VIEW CONFIGURATOR</button>
                </div>
            </div>
        `
    }
};

const modalData = {
    privacy: {
        title: 'Privacy Policy',
        content: `
            <p>At Scoosh Autos, your privacy is paramount. We collect only the information necessary to process your reservation and deliver a world-class experience.</p>
            <p>All personal data is encrypted using military-grade AES-256 protocols. We never sell, share, or distribute your information to third parties without explicit consent.</p>
            <p>Our servers are hosted in Tier-4 data centers with 24/7 physical and digital security monitoring.</p>
            <p style="color: var(--accent-gold); margin-top: 1.5rem;">Last updated: January 2026</p>
        `
    },
    legal: {
        title: 'Legal Notice',
        content: `
            <p>All specifications, images, and performance figures shown are for illustration purposes and may vary from final production models.</p>
            <p>The Imperial Edition is a limited production line. Reservations do not guarantee delivery timelines or final pricing.</p>
            <p>&copy; 2026 Scoosh Autos. All rights reserved. No part of this website may be reproduced without written consent.</p>
            <p style="color: var(--accent-gold); margin-top: 1.5rem;">Terms subject to change without notice.</p>
        `
    },
    contact: {
        title: 'Contact Us',
        content: `
            <p>For private consultations, reservations, or inquiries about the Imperial Edition, please reach out through our dedicated channels.</p>
            <p style="color: var(--accent-gold); margin-top: 1rem;">concierge@scooshautos.com</p>
            <p>+1 (800) 742-SCOO</p>
            <p style="margin-top: 1.5rem;">Private showings available by appointment in Los Angeles, Dubai, London, and Singapore.</p>
        `
    }
};

const appContent = document.getElementById('app-content');
const navLinks = document.querySelectorAll('.nav-link');
const logo = document.querySelector('.logo');
const reserveBtn = document.querySelector('.reserve-btn');
const modalOverlay = document.getElementById('modal-overlay');
const modalBody = document.getElementById('modal-body');
const modalClose = document.querySelector('.modal-close');
const toast = document.getElementById('toast');
const footerLinks = document.querySelectorAll('.footer-links a[data-modal]');

let toastTimeout = null;

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

function renderPage(modelId) {
    if (!appContent) return;
    const data = siteData[modelId];
    if (!data) return;

    appContent.style.opacity = '0';
    appContent.style.animation = 'none';

    if (modelId === 'home') {
        appContent.style.paddingTop = '0';
    } else {
        appContent.style.paddingTop = '6rem';
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    setTimeout(() => {
        if (data.isCustomHtml) {
            appContent.innerHTML = data.html;
        } else {
            appContent.innerHTML = `
                <div class="hero-section page-section">
                    <h1>${data.hero.title}</h1>
                    <p class="subtitle">${data.hero.subtitle}</p>
                    <img src="${data.hero.image}" class="hero-image" alt="${modelId} hero">
                </div>
                ${data.sections}
            `;
        }

        appContent.style.animation = 'fadeIn 0.8s forwards';

        navLinks.forEach(link => {
            link.classList.toggle('active', link.dataset.target === modelId);
        });

        attachPageListeners();
    }, 300);
}

function attachPageListeners() {
    if (!appContent) return;

    appContent.querySelectorAll('[data-action="reserve"]').forEach(btn => {
        btn.addEventListener('click', () => renderPage('reserve'));
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
                s.style.border = '1px solid rgba(255,255,255,0.1)';
            });
            swatch.classList.add('active');
            swatch.style.border = '2px solid var(--accent-gold)';
        };
        swatch.addEventListener('click', handler);
        swatch.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
    });

    const form = document.getElementById('reservation-form');
    if (form) {
        form.addEventListener('submit', handleFormSubmit);
        form.querySelectorAll('input, select').forEach(input => {
            input.addEventListener('input', () => {
                input.closest('.form-group')?.classList.remove('error');
            });
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

    if (!name || !name.value.trim()) {
        name?.closest('.form-group')?.classList.add('error');
        valid = false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email.value.trim())) {
        email?.closest('.form-group')?.classList.add('error');
        valid = false;
    }

    if (!region || !region.value) {
        region?.closest('.form-group')?.classList.add('error');
        valid = false;
    }

    if (!valid) {
        showToast('Please correct the highlighted fields.');
        return;
    }

    const edition = form.querySelector('.edition-btn.active')?.dataset.edition || 'founder';
    const color = form.querySelector('.swatch.active')?.dataset.color || 'obsidian';

    console.log('Reservation submitted:', {
        fullName: name.value.trim(),
        email: email.value.trim(),
        region: region.value,
        edition,
        color
    });

    showToast('Reservation request submitted successfully!');

    form.querySelectorAll('input').forEach(input => input.value = '');
    form.querySelector('select').selectedIndex = 0;

    form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
}

function initFooterLinks() {
    footerLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            openModal(link.dataset.modal);
        });
    });

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', e => {
            if (e.target === modalOverlay) closeModal();
        });
    }

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
            closeModal();
        }
    });
}

function initNavigation() {
    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault();
            renderPage(e.currentTarget.dataset.target);
        });
    });

    if (logo) {
        const logoHandler = () => renderPage('home');
        logo.addEventListener('click', logoHandler);
        logo.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); logoHandler(); } });
    }

    if (reserveBtn) {
        reserveBtn.addEventListener('click', () => renderPage('reserve'));
    }
}

function init() {
    initNavigation();
    initFooterLinks();
    renderPage('home');
}

init();
