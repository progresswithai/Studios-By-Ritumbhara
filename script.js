/**
 * Studios By Ritumbhara - Senior-Level Interaction Script
 * Focus: Performance, Intentionality, and Smoothness
 */

"use strict";

document.addEventListener('DOMContentLoaded', () => {
    
    /**
     * Header Scroll Logic
     */
    const header = document.querySelector('header');
    const updateHeader = () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader(); // Initial check

    /**
     * Senior-Level Intersection Observer (The "Reveal" Effect)
     */
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px" // Starts animation slightly before element enters view
    };

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add staggered delays to children if designated
                const staggerChildren = entry.target.querySelectorAll('.stagger-item');
                if (staggerChildren.length > 0) {
                    staggerChildren.forEach((child, index) => {
                        child.style.transitionDelay = `${index * 150}ms`;
                        child.classList.add('active');
                    });
                }
                
                entry.target.classList.add('active');
                revealObserver.unobserve(entry.target);
            }
        });
    }, revealOptions);

    // Observe all elements with .reveal class
    document.querySelectorAll('.reveal').forEach(el => {
        revealObserver.observe(el);
    });

    /**
     * Smooth Scroll with Offset for Fixed Header
     */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Adjusting for the floating header (approx 80px)
                const offsetPosition = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    /**
     * Hero Title Parallax (Subtle)
     */
    const hero = document.querySelector('.hero');
    const heroBg = document.querySelector('.hero-bg');
    
    if (hero && heroBg) {
        window.addEventListener('scroll', () => {
            const scrollVal = window.scrollY;
            if (scrollVal < window.innerHeight) {
                heroBg.style.transform = `scale(1.1) translateY(${scrollVal * 0.3}px)`;
            }
        }, { passive: true });
    }

});

// Custom refined styling for animations in case CSS is missing them
const setupAnimationStyles = () => {
    const style = document.createElement('style');
    style.textContent = `
        .reveal {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1), 
                        transform 1.2s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .reveal.active {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
};
setupAnimationStyles();
