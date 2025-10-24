// ===================================
// Anton cafe-bar - Gallery JavaScript
// Image gallery and lightbox functionality
// ===================================

(function() {
    'use strict';

    // ===== Gallery Lightbox =====
    const galleryItems = document.querySelectorAll('.gallery-item');
    let currentImageIndex = 0;
    let lightboxOpen = false;

    // Create lightbox element
    function createLightbox() {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <button class="lightbox-close" aria-label="Close lightbox">&times;</button>
                <button class="lightbox-prev" aria-label="Previous image">‹</button>
                <button class="lightbox-next" aria-label="Next image">›</button>
                <div class="lightbox-image-container">
                    <div class="lightbox-image"></div>
                </div>
                <div class="lightbox-caption"></div>
                <div class="lightbox-counter"></div>
            </div>
        `;

        // Add lightbox styles
        const style = document.createElement('style');
        style.textContent = `
            .lightbox {
                position: fixed;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                z-index: 9999;
                display: none;
                align-items: center;
                justify-content: center;
                animation: fadeIn 0.3s ease;
            }

            .lightbox.active {
                display: flex;
            }

            .lightbox-overlay {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(0, 0, 0, 0.95);
            }

            .lightbox-content {
                position: relative;
                width: 90%;
                max-width: 1200px;
                height: 90vh;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                z-index: 1;
            }

            .lightbox-image-container {
                flex: 1;
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: center;
                padding: 2rem;
            }

            .lightbox-image {
                max-width: 100%;
                max-height: 100%;
                width: 100%;
                height: 100%;
                background-size: contain;
                background-position: center;
                background-repeat: no-repeat;
                animation: zoomIn 0.3s ease;
            }

            .lightbox-close {
                position: absolute;
                top: 20px;
                right: 20px;
                width: 50px;
                height: 50px;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid white;
                color: white;
                font-size: 2rem;
                cursor: pointer;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                z-index: 2;
            }

            .lightbox-close:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: rotate(90deg);
            }

            .lightbox-prev,
            .lightbox-next {
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 50px;
                height: 50px;
                background: rgba(255, 255, 255, 0.1);
                border: 2px solid white;
                color: white;
                font-size: 2.5rem;
                cursor: pointer;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                transition: all 0.3s ease;
                line-height: 1;
                padding-bottom: 5px;
            }

            .lightbox-prev {
                left: 20px;
            }

            .lightbox-next {
                right: 20px;
            }

            .lightbox-prev:hover,
            .lightbox-next:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: translateY(-50%) scale(1.1);
            }

            .lightbox-caption {
                color: white;
                font-size: 1.2rem;
                text-align: center;
                padding: 1rem;
                max-width: 800px;
            }

            .lightbox-counter {
                color: rgba(255, 255, 255, 0.7);
                font-size: 1rem;
                padding: 0.5rem;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }

            @keyframes zoomIn {
                from {
                    transform: scale(0.8);
                    opacity: 0;
                }
                to {
                    transform: scale(1);
                    opacity: 1;
                }
            }

            @media (max-width: 768px) {
                .lightbox-prev,
                .lightbox-next {
                    width: 40px;
                    height: 40px;
                    font-size: 2rem;
                }

                .lightbox-prev {
                    left: 10px;
                }

                .lightbox-next {
                    right: 10px;
                }

                .lightbox-close {
                    top: 10px;
                    right: 10px;
                    width: 40px;
                    height: 40px;
                    font-size: 1.5rem;
                }

                .lightbox-caption {
                    font-size: 1rem;
                }
            }
        `;
        document.head.appendChild(style);

        return lightbox;
    }

    // Initialize lightbox
    const lightbox = createLightbox();
    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector('.lightbox-image');
    const lightboxCaption = lightbox.querySelector('.lightbox-caption');
    const lightboxCounter = lightbox.querySelector('.lightbox-counter');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');

    // Open lightbox
    function openLightbox(index) {
        currentImageIndex = index;
        updateLightboxImage();
        lightbox.classList.add('active');
        lightboxOpen = true;
        document.body.style.overflow = 'hidden';
    }

    // Close lightbox
    function closeLightbox() {
        lightbox.classList.remove('active');
        lightboxOpen = false;
        document.body.style.overflow = '';
    }

    // Update lightbox image
    function updateLightboxImage() {
        const item = galleryItems[currentImageIndex];
        const imageDiv = item.querySelector('.gallery-image');
        const caption = item.querySelector('.gallery-caption').textContent;
        const background = window.getComputedStyle(imageDiv).background;

        lightboxImage.style.background = background;
        lightboxCaption.textContent = caption;
        lightboxCounter.textContent = `${currentImageIndex + 1} / ${galleryItems.length}`;

        // Add animation
        lightboxImage.style.animation = 'none';
        setTimeout(() => {
            lightboxImage.style.animation = 'zoomIn 0.3s ease';
        }, 10);
    }

    // Navigate to previous image
    function showPrevImage() {
        currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length;
        updateLightboxImage();
    }

    // Navigate to next image
    function showNextImage() {
        currentImageIndex = (currentImageIndex + 1) % galleryItems.length;
        updateLightboxImage();
    }

    // Event listeners
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', () => openLightbox(index));
        item.style.cursor = 'pointer';
    });

    lightboxClose.addEventListener('click', closeLightbox);
    lightboxOverlay.addEventListener('click', closeLightbox);
    lightboxPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        showPrevImage();
    });
    lightboxNext.addEventListener('click', (e) => {
        e.stopPropagation();
        showNextImage();
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (!lightboxOpen) return;

        switch(e.key) {
            case 'Escape':
                closeLightbox();
                break;
            case 'ArrowLeft':
                showPrevImage();
                break;
            case 'ArrowRight':
                showNextImage();
                break;
        }
    });

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;

    lightbox.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    });

    lightbox.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    });

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                showNextImage();
            } else {
                showPrevImage();
            }
        }
    }

    // ===== Gallery Filter (if categories are added) =====
    const galleryFilters = document.querySelectorAll('.gallery-filter');

    if (galleryFilters.length > 0) {
        galleryFilters.forEach(filter => {
            filter.addEventListener('click', () => {
                const category = filter.dataset.category;

                // Update active filter
                galleryFilters.forEach(f => f.classList.remove('active'));
                filter.classList.add('active');

                // Filter gallery items
                galleryItems.forEach(item => {
                    if (category === 'all' || item.dataset.category === category) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'scale(1)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'scale(0.8)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // ===== Gallery Items Hover Effect =====
    galleryItems.forEach(item => {
        const overlay = item.querySelector('.gallery-overlay');

        item.addEventListener('mouseenter', () => {
            overlay.style.transition = 'opacity 0.3s ease';
        });
    });

    // ===== Lazy Loading for Gallery Images =====
    const galleryObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'scale(1)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '50px'
    });

    galleryItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.9)';
        item.style.transition = `opacity 0.5s ease ${index * 0.1}s, transform 0.5s ease ${index * 0.1}s`;
        galleryObserver.observe(item);
    });

    console.log('Gallery initialized with', galleryItems.length, 'images');

})();
