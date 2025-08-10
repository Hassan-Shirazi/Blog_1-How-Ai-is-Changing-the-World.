 document.addEventListener('DOMContentLoaded', function() {
        
        gsap.registerPlugin(ScrollTrigger);

        // --- Neural Network Animation ---
        const network = document.querySelector('.neural-network');
        if (network) {
            const numNodes = 50;
            for (let i = 0; i < numNodes; i++) {
                let node = document.createElement('div');
                node.classList.add('neural-node');
                node.style.top = `${Math.random() * 100}%`;
                node.style.left = `${Math.random() * 100}%`;
                network.appendChild(node);
            }

            gsap.to('.neural-node', {
                x: () => (Math.random() - 0.5) * 100,
                y: () => (Math.random() - 0.5) * 100,
                scale: () => Math.random() * 1.5 + 0.5,
                duration: 20,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
        
        // --- NEW: Hero Mouse Parallax Effect ---
        const hero = document.querySelector('#hero');
        if (hero) {
             hero.addEventListener('mousemove', (e) => {
                const { clientX, clientY } = e;
                const x = (clientX / window.innerWidth - 0.5) * 30; // 30 is the parallax intensity
                const y = (clientY / window.innerHeight - 0.5) * 30;
                
                gsap.to('.hero-content', {
                    x: -x,
                    y: -y,
                    transform: `rotateX(${-y/2}deg) rotateY(${x/2}deg)`,
                    ease: 'power1.out'
                });
            });
        }


        // --- Hero Animation ---
        const heroTl = gsap.timeline({delay: 0.2});
        heroTl.from(".anim-hero", {
            y: 30,
            opacity: 0,
            stagger: 0.2,
            duration: 1,
            ease: "power3.out"
        });
        
        // --- General Reveal Animation for Cards/Items ---
        gsap.utils.toArray(".anim-reveal").forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                y: 50,
                duration: 1,
                ease: "power3.out"
            });
        });

        // --- NEW: Image Reveal ---
        gsap.utils.toArray(".anim-image-reveal").forEach(img => {
            gsap.from(img, {
                 scrollTrigger: {
                    trigger: img,
                    start: "top 85%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                scale: 0.9,
                duration: 1.2,
                ease: "power3.out"
            });
        });
        
        // --- Text Line Reveal Animation ---
        gsap.utils.toArray(".anim-text-reveal").forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: "top 90%",
                    toggleActions: "play none none none"
                },
                opacity: 0,
                x: -30,
                duration: 0.8,
                ease: "power2.out",
                stagger: 0.15
            });
        });
        
        // --- Parallax Background Effect ---
        gsap.utils.toArray(".parallax-bg").forEach(bg => {
            gsap.to(bg, {
                backgroundPosition: "50% 100%",
                ease: "none",
                scrollTrigger: {
                    trigger: bg.parentElement,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true
                }
            });
        });
        
        // --- Animated Chart (FIXED & IMPROVED) ---
        const chartBars = document.querySelectorAll('.chart-bar');
        const isMobile = window.innerWidth <= 768;

        // Set initial bar sizes based on data-value
        chartBars.forEach(bar => {
             const value = bar.dataset.value;
             if (!isMobile) {
                bar.style.height = `${value}%`;
             } else {
                bar.style.width = `${value}%`;
                bar.style.height = '40px'; // Reset height for horizontal layout
             }
        });

        gsap.from(chartBars, {
            scrollTrigger: {
                trigger: '.chart-container',
                start: 'top 80%',
                toggleActions: "play none none none"
            },
            scaleX: isMobile ? 0 : 1,
            scaleY: isMobile ? 1 : 0,
            duration: 1.5,
            stagger: 0.2,
            ease: 'power3.out',
            onComplete: () => {
                gsap.to('.chart-bar .value', {
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.2
                });
            }
        });
        
        // --- NEW: Timeline Animation ---
        gsap.utils.toArray(".anim-timeline").forEach(item => {
            gsap.from(item, {
                scrollTrigger: {
                    trigger: item,
                    start: "top 85%",
                    toggleActions: "play none none none",
                },
                opacity: 0,
                x: () => item.parentElement.classList.contains('timeline-left') ? -100 : 100,
                duration: 1,
                ease: "power3.out"
            });
        });


        // --- Quote Highlight Animation ---
        gsap.to(".highlight", {
            scrollTrigger: {
                trigger: "#quote",
                start: "top 60%",
                toggleActions: "play none none reverse"
            },
            backgroundSize: '100% 100%',
            duration: 2,
            ease: 'power2.inOut'
        });

        console.log("AI Frontier page initialized successfully with new interactive features.");
    });