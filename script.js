// Header scroll effect
document.addEventListener('DOMContentLoaded', () => {
    const header = document.getElementById('header');
    
    const logoImg = header.querySelector('.logo-img');
    
    const handleScroll = () => {
        // If header has header-solid class (like on Partner page), always use secon-logo
        if (window.scrollY > 50 || header.classList.contains('header-solid')) {
            header.classList.add('scrolled');
            if (logoImg) logoImg.src = 'secon-logo.png';
        } else {
            header.classList.remove('scrolled');
            if (logoImg) logoImg.src = 'logo.png';
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    // Mobile menu toggle
    const menuToggle = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = menuToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.setAttribute('data-lucide', 'x');
            } else {
                icon.setAttribute('data-lucide', 'menu');
            }
            if (window.lucide) window.lucide.createIcons();
        });

        // Close menu when clicking on a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.querySelector('i').setAttribute('data-lucide', 'menu');
                if (window.lucide) window.lucide.createIcons();
            });
        });
    }
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();
            targetElement.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Initialize Lucide icons (if not already handled in HTML)
if (window.lucide) {
    window.lucide.createIcons();
}

// Slideshow Logic for Portfolio
let slideId = ["slideshow-ashadeep", "slideshow-wonder", "slideshow-urban"];
let slideIndex = [1, 1, 1];

// Function to handle next/prev buttons
window.plusSlides = function(n, no) {
  showSlides(slideIndex[no] += n, no);
}

// Function to handle dot navigation
window.currentSlide = function(n, no) {
  showSlides(slideIndex[no] = n, no);
}

window.showSlides = function(n, no) {
  let i;
  let slideshow = document.getElementById(slideId[no]);
  if (!slideshow) return;
  
  let x = slideshow.getElementsByClassName("slide");
  let dots = slideshow.getElementsByClassName("dot");
  
  if (n > x.length) {slideIndex[no] = 1}    
  if (n < 1) {slideIndex[no] = x.length}
  
  for (i = 0; i < x.length; i++) {
     x[i].style.display = "none";  
  }
  for (i = 0; i < dots.length; i++) {
     dots[i].className = dots[i].className.replace(" active", "");
  }
  
  if (x[slideIndex[no]-1]) x[slideIndex[no]-1].style.display = "block";  
  if (dots[slideIndex[no]-1]) dots[slideIndex[no]-1].className += " active";
}

function showSlides(n, no) {
    window.showSlides(n, no);
}


