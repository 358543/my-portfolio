document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links li');
    
    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });
    
    navItems.forEach(item => {
        item.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
    
    // Sticky Navigation on Scroll
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Skills Animation
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkills() {
        skillBars.forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0';
            
            setTimeout(() => {
                bar.style.width = width;
            }, 100);
        });
    }
    
    // Radial Progress Animation
    const radialProgresses = document.querySelectorAll('.radial-progress');
    
    function animateRadialProgress() {
        radialProgresses.forEach(progress => {
            const percent = progress.getAttribute('data-progress');
            const value = progress.querySelector('.progress-value');
            
            let i = 0;
            const interval = setInterval(() => {
                if (i >= percent) {
                    clearInterval(interval);
                } else {
                    i++;
                    value.textContent = i + '%';
                    progress.style.background = `conic-gradient(var(--primary-color) ${i * 3.6}deg, var(--light-gray) 0deg)`;
                }
            }, 20);
        });
    }
    
    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1
    };
    
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateSkills();
                animateRadialProgress();
                skillsObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    const skillsSection = document.querySelector('.skills');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    // Project Filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            projectItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Testimonial Slider
    const testimonials = document.querySelectorAll('.testimonial-item');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');
    let currentTestimonial = 0;
    
    function showTestimonial(index) {
        testimonials.forEach(testimonial => testimonial.classList.remove('active'));
        
        if (index >= testimonials.length) {
            currentTestimonial = 0;
        } else if (index < 0) {
            currentTestimonial = testimonials.length - 1;
        } else {
            currentTestimonial = index;
        }
        
        testimonials[currentTestimonial].classList.add('active');
    }
    
    if (prevBtn && nextBtn) {
        prevBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial - 1);
        });
        
        nextBtn.addEventListener('click', () => {
            showTestimonial(currentTestimonial + 1);
        });
    }
    
    // Auto-rotate testimonials
    if (testimonials.length > 1) {
        setInterval(() => {
            showTestimonial(currentTestimonial + 1);
        }, 5000);
    }
    
    // Contact Form Submission
    const contactForm = document.getElementById('form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, subject, message });
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }
    
    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const email = this.querySelector('input').value;
            
            // Here you would typically send the email to a server
            console.log('Newsletter subscription:', email);
            
            // Show success message
            alert('Thank you for subscribing to our newsletter!');
            
            // Reset form
            this.querySelector('input').value = '';
        });
    }
});
