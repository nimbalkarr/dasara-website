
document.addEventListener("DOMContentLoaded", () => {

    // MOBILE NAVIGATION
    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    function closeMobileMenu() {
        if (!menuToggle || !navLinks) return;

        navLinks.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
        menuToggle.setAttribute("aria-label", "Open navigation");
    }

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );
        });

        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMobileMenu);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 780) {
                closeMobileMenu();
            }
        });
    }

    // MENU CATEGORY FILTERS
    const filterButtons = document.querySelectorAll(".filter-btn");
    const menuCards = document.querySelectorAll(".menu-card");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const selectedCategory = button.dataset.filter;

            filterButtons.forEach(item => {
                const active = item === button;
                item.classList.toggle("active", active);
                item.setAttribute("aria-pressed", String(active));
            });

            menuCards.forEach(card => {
                const category = card.dataset.category;
                const show =
                    selectedCategory === "all" ||
                    category === selectedCategory;

                card.classList.toggle("is-hidden", !show);
            });
        });
    });

    // IMAGE GALLERY LIGHTBOX
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightboxImage");
    const lightboxCaption = document.getElementById("lightboxCaption");
    const closeButton = document.getElementById("lightboxClose");
    const previousButton = document.getElementById("lightboxPrev");
    const nextButton = document.getElementById("lightboxNext");

    const galleryLinks = Array.from(
        document.querySelectorAll(".lightbox-link")
    );

    let currentImageIndex = 0;
    let previousFocus = null;

    function showImage(index) {
        if (!galleryLinks.length || !lightboxImage) return;

        currentImageIndex =
            (index + galleryLinks.length) % galleryLinks.length;

        const link = galleryLinks[currentImageIndex];
        const image = link.querySelector("img");

        lightboxImage.src = link.href;
        lightboxImage.alt = image ? image.alt : "DASARA restaurant photo";

        if (lightboxCaption) {
            lightboxCaption.textContent = image ? image.alt : "";
        }
    }

    function openLightbox(index) {
        if (!lightbox) return;

        previousFocus = document.activeElement;
        showImage(index);

        lightbox.classList.add("open");
        lightbox.setAttribute("aria-hidden", "false");
        document.body.classList.add("no-scroll");

        if (closeButton) closeButton.focus();
    }

    function closeLightbox() {
        if (!lightbox) return;

        lightbox.classList.remove("open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("no-scroll");

        if (previousFocus && typeof previousFocus.focus === "function") {
            previousFocus.focus();
        }
    }

    galleryLinks.forEach((link, index) => {
        link.addEventListener("click", event => {
            event.preventDefault();
            openLightbox(index);
        });
    });

    if (closeButton) {
        closeButton.addEventListener("click", closeLightbox);
    }

    if (previousButton) {
        previousButton.addEventListener("click", () => {
            showImage(currentImageIndex - 1);
        });
    }

    if (nextButton) {
        nextButton.addEventListener("click", () => {
            showImage(currentImageIndex + 1);
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", event => {
            if (event.target === lightbox) {
                closeLightbox();
            }
        });
    }

    document.addEventListener("keydown", event => {
        if (!lightbox || !lightbox.classList.contains("open")) return;

        if (event.key === "Escape") {
            closeLightbox();
        }

        if (event.key === "ArrowLeft") {
            showImage(currentImageIndex - 1);
        }

        if (event.key === "ArrowRight") {
            showImage(currentImageIndex + 1);
        }
    });

    // AUTOMATIC COPYRIGHT YEAR
    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // REPORT MISSING IMAGES IN THE BROWSER CONSOLE
    document.querySelectorAll("img").forEach(image => {
        image.addEventListener("error", () => {
            console.warn(
                "Image could not be loaded:",
                image.getAttribute("src")
            );
        });
    });

    console.log("DASARA website loaded successfully.");
});
