// script.js or your main JS file
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.animate-up');
  
    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
  
    animateElements.forEach(el => observer.observe(el));
  });
  