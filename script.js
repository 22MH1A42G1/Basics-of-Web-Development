// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a nav link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.offsetTop;
                const offsetPosition = elementPosition - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active navigation highlighting
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let currentSection = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }
    
    // Header scroll effect
    function handleHeaderScroll() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(255, 255, 255, 0.98)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
        } else {
            header.style.background = 'rgba(255, 255, 255, 0.95)';
            header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        }
    }
    
    // Scroll event listeners
    window.addEventListener('scroll', function() {
        updateActiveNav();
        handleHeaderScroll();
        animateOnScroll();
    });
    
    // Enhanced alert button functionality
    const alertButton = document.getElementById('alertButton');
    alertButton.addEventListener('click', function() {
        // Create custom modal instead of basic alert
        showCustomAlert();
    });
    
    // Custom alert modal
    function showCustomAlert() {
        // Create modal elements
        const modal = document.createElement('div');
        modal.className = 'custom-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3><i class="fas fa-rocket"></i> Welcome!</h3>
                    <button class="modal-close">&times;</button>
                </div>
                <div class="modal-body">
                    <p>🎉 Congratulations! You've successfully interacted with JavaScript!</p>
                    <p>This demonstrates how we can create dynamic, interactive web experiences.</p>
                    <div class="modal-features">
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Event Handling</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>DOM Manipulation</span>
                        </div>
                        <div class="feature-item">
                            <i class="fas fa-check-circle"></i>
                            <span>Modern UI Components</span>
                        </div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary modal-confirm">Awesome!</button>
                </div>
            </div>
        `;
        
        // Add modal styles
        const modalStyles = `
            .custom-modal {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: rgba(0, 0, 0, 0.7);
                display: flex;
                justify-content: center;
                align-items: center;
                z-index: 10000;
                opacity: 0;
                animation: fadeIn 0.3s ease forwards;
            }
            .modal-content {
                background: white;
                border-radius: 15px;
                max-width: 500px;
                width: 90%;
                max-height: 90vh;
                overflow-y: auto;
                transform: scale(0.7);
                animation: scaleIn 0.3s ease forwards;
            }
            .modal-header {
                padding: 1.5rem;
                border-bottom: 1px solid #eee;
                display: flex;
                justify-content: space-between;
                align-items: center;
            }
            .modal-header h3 {
                color: #667eea;
                margin: 0;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .modal-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #999;
                padding: 0;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .modal-body {
                padding: 1.5rem;
            }
            .modal-body p {
                margin-bottom: 1rem;
                color: #666;
                line-height: 1.6;
            }
            .modal-features {
                display: flex;
                flex-direction: column;
                gap: 0.8rem;
                margin-top: 1.5rem;
            }
            .feature-item {
                display: flex;
                align-items: center;
                gap: 0.8rem;
                color: #333;
            }
            .feature-item i {
                color: #28a745;
            }
            .modal-footer {
                padding: 1.5rem;
                border-top: 1px solid #eee;
                text-align: center;
            }
            @keyframes fadeIn {
                to { opacity: 1; }
            }
            @keyframes scaleIn {
                to { transform: scale(1); }
            }
        `;
        
        // Add styles to document if not already present
        if (!document.querySelector('#modal-styles')) {
            const style = document.createElement('style');
            style.id = 'modal-styles';
            style.textContent = modalStyles;
            document.head.appendChild(style);
        }
        
        // Add modal to document
        document.body.appendChild(modal);
        
        // Close modal functionality
        function closeModal() {
            modal.style.animation = 'fadeOut 0.3s ease forwards';
            setTimeout(() => {
                document.body.removeChild(modal);
            }, 300);
        }
        
        // Add fadeOut animation
        const fadeOutAnimation = `
            @keyframes fadeOut {
                to { opacity: 0; }
            }
        `;
        const existingStyle = document.querySelector('#modal-styles');
        existingStyle.textContent += fadeOutAnimation;
        
        // Event listeners for closing modal
        modal.querySelector('.modal-close').addEventListener('click', closeModal);
        modal.querySelector('.modal-confirm').addEventListener('click', closeModal);
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                closeModal();
            }
        });
        
        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeModal();
            }
        });
    }
    
    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showFormMessage('Please fill in all fields.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showFormMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission
        const submitButton = contactForm.querySelector('button[type="submit"]');
        const originalText = submitButton.textContent;
        submitButton.textContent = 'Sending...';
        submitButton.disabled = true;
        
        setTimeout(() => {
            showFormMessage(`Thank you, ${name}! Your message has been sent successfully.`, 'success');
            contactForm.reset();
            submitButton.textContent = originalText;
            submitButton.disabled = false;
        }, 2000);
    });
    
    // Form message display
    function showFormMessage(message, type) {
        // Remove existing messages
        const existingMessage = document.querySelector('.form-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        const messageEl = document.createElement('div');
        messageEl.className = `form-message ${type}`;
        messageEl.textContent = message;
        
        // Add message styles
        messageEl.style.cssText = `
            padding: 1rem;
            margin-top: 1rem;
            border-radius: 8px;
            font-weight: 500;
            text-align: center;
            ${type === 'success' ? 
                'background: rgba(40, 167, 69, 0.1); color: #28a745; border: 1px solid rgba(40, 167, 69, 0.3);' : 
                'background: rgba(220, 53, 69, 0.1); color: #dc3545; border: 1px solid rgba(220, 53, 69, 0.3);'
            }
        `;
        
        contactForm.appendChild(messageEl);
        
        // Remove message after 5 seconds
        setTimeout(() => {
            if (messageEl.parentNode) {
                messageEl.remove();
            }
        }, 5000);
    }
    
    // Email validation
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    
    // Animate elements on scroll
    function animateOnScroll() {
        const elements = document.querySelectorAll('.service-card, .about-content, .company-info');
        
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('fade-in');
            }
        });
    }
    
    // Typing effect for hero title
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        
        type();
    }
    
    // Initialize typing effect
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 80);
        }, 500);
    }
    
    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(45deg, #667eea, #764ba2);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        z-index: 1000;
        font-size: 1.2rem;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.style.opacity = '1';
            scrollToTopBtn.style.visibility = 'visible';
        } else {
            scrollToTopBtn.style.opacity = '0';
            scrollToTopBtn.style.visibility = 'hidden';
        }
    });
    
    // Scroll to top functionality
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Initialize animations
    setTimeout(() => {
        animateOnScroll();
    }, 100);
    
    console.log('🚀 Website loaded successfully! All interactive features are ready.');
});