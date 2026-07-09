document.addEventListener('DOMContentLoaded', () => {
    
    // 3. Navbar & Back to Top Scroll Effect
    const navbar = document.getElementById('navbar');
    const backToTopBtn = document.getElementById('back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled-nav');
            navbar.classList.remove('py-4');
            navbar.classList.add('py-2');
        } else {
            navbar.classList.remove('scrolled-nav');
            navbar.classList.add('py-4');
            navbar.classList.remove('py-2');
        }

        // Back to top
        if (window.scrollY > 500) {
            backToTopBtn.classList.remove('opacity-0', 'translate-y-10');
            backToTopBtn.classList.add('opacity-100', 'translate-y-0');
        } else {
            backToTopBtn.classList.add('opacity-0', 'translate-y-10');
            backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
        }
    });

    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 4. Mobile Menu
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    if (mobileBtn && mobileMenu) {
        mobileBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            mobileMenu.classList.toggle('flex');
            
            const icon = mobileBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenu.classList.remove('flex');
                mobileBtn.querySelector('i').classList.remove('fa-times');
                mobileBtn.querySelector('i').classList.add('fa-bars');
            });
        });
    }

    // 5. Scroll Reveal with Intersection Observer
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // 6. Lazy Loading Images
    const lazyImages = document.querySelectorAll('img.lazy');
    
    const lazyObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => lazyObserver.observe(img));

    // 7. Modal / Lightbox for Gallery & Products
    const modalTriggers = document.querySelectorAll('.modal-trigger');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxDesc = document.getElementById('lightbox-desc');
    const lightboxCta = document.getElementById('lightbox-cta');
    const lightboxClose = document.getElementById('lightbox-close');

    if (lightbox && modalTriggers.length > 0) {
        modalTriggers.forEach(item => {
            item.addEventListener('click', (e) => {
                e.preventDefault();
                
                // Get data
                const src = item.getAttribute('data-src') || item.getAttribute('href');
                const title = item.getAttribute('data-title') || '';
                const desc = item.getAttribute('data-desc') || '';
                const isProduct = item.getAttribute('data-type') === 'product';
                
                // Set data
                if (lightboxImg) lightboxImg.src = src;
                if (lightboxTitle) lightboxTitle.innerHTML = title;
                if (lightboxDesc) lightboxDesc.innerHTML = desc;
                
                if (lightboxCta) {
                    if (isProduct) {
                        lightboxCta.style.display = 'inline-flex';
                        const waMessage = encodeURIComponent(`Halo Admin Padepokan Kemuning Jati, saya tertarik dengan program / produk: ${title}. Mohon informasi lebih lanjut.`);
                        lightboxCta.href = `https://wa.me/6282148641519?text=${waMessage}`;
                    } else {
                        lightboxCta.style.display = 'none';
                    }
                }

                // Show modal
                lightbox.classList.remove('hidden');
                setTimeout(() => lightbox.classList.add('opacity-100'), 10);
                document.body.style.overflow = 'hidden'; // prevent scrolling
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('opacity-100');
            setTimeout(() => {
                lightbox.classList.add('hidden');
                if (lightboxImg) lightboxImg.src = '';
                document.body.style.overflow = 'auto';
            }, 300);
        };

        if(lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) closeLightbox();
        });
    }

    // 8. FAQ Accordion
    const faqBtns = document.querySelectorAll('.faq-btn');
    
    faqBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            const icon = this.querySelector('i');
            
            // Close all others
            faqBtns.forEach(otherBtn => {
                if (otherBtn !== this) {
                    otherBtn.nextElementSibling.classList.add('hidden');
                    otherBtn.querySelector('i').classList.remove('rotate-180');
                    otherBtn.classList.remove('text-brand-gold');
                }
            });
            
            // Toggle current
            content.classList.toggle('hidden');
            icon.classList.toggle('rotate-180');
            if(!content.classList.contains('hidden')) {
                this.classList.add('text-brand-gold');
            } else {
                this.classList.remove('text-brand-gold');
            }
        });
    });

    // 9. Testimonial Slider Setup
    const testimonials = [
        { name: "Bpk. Haryanto", city: "Surabaya", text: "Pendampingan spiritual di Padepokan Kemuning Jati sangat profesional. Saya menemukan ketenangan batin yang luar biasa setelah mengikuti sesi konsultasi.", rating: 5 },
        { name: "Ibu Ningsih", city: "Yogyakarta", text: "Pengobatan tradisionalnya sangat membantu pemulihan kesehatan saya secara holistik. Pelayanannya ramah dan menjunjung tinggi nilai budaya.", rating: 5 },
        { name: "Sdr. Dimas", city: "Jakarta", text: "Keris pusaka yang saya maharkan dirawat dengan sangat baik. Energi positifnya terasa nyata. Tempat yang sangat direkomendasikan bagi pencinta budaya.", rating: 5 },
        { name: "Bpk. Wahyu", city: "Semarang", text: "Konsultasi bisnis dan spiritual di sini memberikan pencerahan yang saya butuhkan. Sangat etis dan tidak ada unsur klenik yang menyesatkan.", rating: 5 },
        { name: "Ibu Retno", city: "Solo", text: "Suasana padepokan yang sakral namun tetap nyaman. Tirakat doa bersama sangat menyentuh hati dan menguatkan ikhtiar hidup.", rating: 5 },
        { name: "Bpk. Agung", city: "Malang", text: "Minyak perawatan pusaka kualitas premium. Aromanya sangat klasik dan menenangkan. Cocok untuk merawat koleksi tosan aji.", rating: 5 },
        { name: "Sdri. Ayu", city: "Bandung", text: "Layanan ramah, respon cepat, dan privasi sangat dijaga. Saya merasa aman menceritakan keluhan dan mendapatkan solusi yang bijaksana.", rating: 5 },
        { name: "Bpk. Kusuma", city: "Bali", text: "Nilai luhur Nusantara sangat terasa dalam setiap pelayanan. Ini bukan sekadar pengobatan, tapi juga pelestarian budaya yang patut diapresiasi.", rating: 5 }
    ];

    const track = document.getElementById('testimonial-track');
    const dotsContainer = document.getElementById('testimonial-dots');
    
    if (track && dotsContainer) {
        // Generate Cards
        testimonials.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'testimonial-card flex-shrink-0';
            card.innerHTML = `
                <div class="bg-brand-darker border border-gray-800 p-8 md:p-12 rounded-sm text-center relative max-w-3xl mx-auto">
                    <div class="absolute top-4 left-4 text-brand-gold/20 text-6xl font-heading">"</div>
                    
                    <div class="flex justify-center mb-6">
                        ${Array(item.rating).fill('<i class="fas fa-star text-brand-gold text-sm mx-1"></i>').join('')}
                    </div>
                    
                    <p class="text-gray-300 font-light text-lg md:text-xl italic mb-8 relative z-10 leading-relaxed">
                        "${item.text}"
                    </p>
                    
                    <div class="flex items-center justify-center">
                        <img src="https://ui-avatars.com/api/?name=${item.name.replace(' ', '+')}&background=d4af37&color=050505" alt="${item.name}" class="w-12 h-12 rounded-full mr-4 border-2 border-brand-gold">
                        <div class="text-left">
                            <h5 class="text-white font-bold text-sm">${item.name}</h5>
                            <span class="text-brand-gold text-xs uppercase tracking-wider">${item.city}</span>
                        </div>
                    </div>
                </div>
            `;
            track.appendChild(card);
            
            // Generate Dots
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        let currentSlide = 0;
        let slideInterval;
        const dots = document.querySelectorAll('.dot');
        const slideCount = testimonials.length;

        function goToSlide(index) {
            currentSlide = index;
            track.style.transform = `translateX(-${index * 100}%)`;
            
            dots.forEach(d => d.classList.remove('active'));
            dots[index].classList.add('active');
            
            resetInterval();
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slideCount;
            goToSlide(currentSlide);
        }

        function resetInterval() {
            clearInterval(slideInterval);
            slideInterval = setInterval(nextSlide, 5000);
        }

        // Start Auto Slide
        resetInterval();
    }


});
