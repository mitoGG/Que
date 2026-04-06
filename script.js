document.addEventListener('DOMContentLoaded', () => {
    // 1. Efeito de Scroll no Header (Mudar cor ou sombra ao rolar)
    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.style.backgroundColor = '#062654'; // Tom mais escuro ao rolar
            nav.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
        } else {
            nav.style.backgroundColor = '#08306b';
            nav.style.boxShadow = 'none';
        }
    });

    // 2. Scroll Suave para links internos
    const menuLinks = document.querySelectorAll('nav ul li a[href^="#"]');
    
    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const navHeight = nav.offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Animação de Surgimento (Scroll Reveal)
    // Faz os cards e seções aparecerem suavemente ao rolar
    const observeOptions = {
        threshold: 0.1
    };

    const revealOnScroll = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target); // Para a animação ocorrer apenas uma vez
            }
        });
    }, observeOptions);

    // Aplicando estilo inicial e observador nos elementos
    const elementsToAnimate = document.querySelectorAll('.card, .agenda, .contato-box');
    
    elementsToAnimate.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        revealOnScroll.observe(el);
    });

    // 4. Log feedback (Opcional - útil para dev)
    console.log("Interface carregada com sucesso!");
});