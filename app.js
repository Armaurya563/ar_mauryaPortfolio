
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const currentTheme = localStorage.getItem('theme') || 'light';
        document.documentElement.setAttribute('data-theme', currentTheme);
        
        if (currentTheme === 'dark') {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i><span data-en="Light" data-hi="रोशनी">Light</span>';
        }
        
        themeToggle.addEventListener('click', () => {
            const theme = document.documentElement.getAttribute('data-theme');
            const newTheme = theme === 'dark' ? 'light' : 'dark';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (newTheme === 'dark') {
                themeToggle.innerHTML = '<i class="fas fa-sun"></i><span data-en="Light" data-hi="रोशनी">Light</span>';
            } else {
                themeToggle.innerHTML = '<i class="fas fa-moon"></i><span data-en="Dark" data-hi="अंधेरा">Dark</span>';
            }
        });
        
        // Language Toggle
        const langToggle = document.getElementById('langToggle');
        const currentLang = localStorage.getItem('lang') || 'en';
        document.documentElement.setAttribute('lang', currentLang);
        document.getElementById('currentLang').textContent = currentLang.toUpperCase();
        
        langToggle.addEventListener('click', () => {
            const lang = document.documentElement.getAttribute('lang');
            const newLang = lang === 'en' ? 'hi' : 'en';
            
            document.documentElement.setAttribute('lang', newLang);
            localStorage.setItem('lang', newLang);
            document.getElementById('currentLang').textContent = newLang.toUpperCase();
            
            // Update all elements with language attributes
            document.querySelectorAll('[data-en][data-hi]').forEach(element => {
                if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = element.getAttribute(`data-${newLang}`);
                } else {
                    element.textContent = element.getAttribute(`data-${newLang}`);
                }
            });
            
            showToast(`Language changed to ${newLang === 'en' ? 'English' : 'Hindi'}`, 'success');
        });
        
        // Typography Controls
        const typographyControls = document.getElementById('typographyControls');
        const typoToggle = document.getElementById('typoToggle');
        
        typoToggle.addEventListener('click', () => {
            typographyControls.classList.toggle('expanded');
        });
        
        // Font Family
        const fontFamily = document.getElementById('fontFamily');
        fontFamily.addEventListener('change', (e) => {
            document.documentElement.style.setProperty('--font-primary', e.target.value);
            localStorage.setItem('fontFamily', e.target.value);
        });
        
        // Load saved font family
        const savedFontFamily = localStorage.getItem('fontFamily');
        if (savedFontFamily) {
            document.documentElement.style.setProperty('--font-primary', savedFontFamily);
            fontFamily.value = savedFontFamily;
        }
        
        // Font Size
        const fontSize = document.getElementById('fontSize');
        fontSize.addEventListener('input', (e) => {
            document.documentElement.style.setProperty('--font-size-base', `${e.target.value}px`);
            localStorage.setItem('fontSize', e.target.value);
        });
        
        // Load saved font size
        const savedFontSize = localStorage.getItem('fontSize');
        if (savedFontSize) {
            document.documentElement.style.setProperty('--font-size-base', `${savedFontSize}px`);
            fontSize.value = savedFontSize;
        }
        
        // Line Height
        const lineHeight = document.getElementById('lineHeight');
        lineHeight.addEventListener('input', (e) => {
            document.body.style.lineHeight = e.target.value;
            localStorage.setItem('lineHeight', e.target.value);
        });
        
        // Load saved line height
        const savedLineHeight = localStorage.getItem('lineHeight');
        if (savedLineHeight) {
            document.body.style.lineHeight = savedLineHeight;
            lineHeight.value = savedLineHeight;
        }
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Contact Form
        const contactForm = document.getElementById('contactForm');
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            
            // Here you would normally send the data to a server
            console.log('Form submitted:', data);
            
            // Show success message
            showToast('Message sent successfully!', 'success');
            
            // Reset form
            contactForm.reset();
        });
        
        // Toast Notification
        function showToast(message, type = 'info') {
            const toast = document.getElementById('toast');
            toast.textContent = message;
            toast.className = `toast ${type}`;
            toast.classList.add('show');
            
            setTimeout(() => {
                toast.classList.remove('show');
            }, 3000);
        }
        
        // Animate skill progress bars on scroll
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.skill-progress-bar');
                    progressBars.forEach(bar => {
                        const width = bar.style.width;
                        bar.style.width = '0';
                        setTimeout(() => {
                            bar.style.width = width;
                        }, 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);
        
        const skillsSection = document.querySelector('.skills-container');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.querySelector('header');
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        });