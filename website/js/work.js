// =========================================================
// ZEALICON — OUR WORK PAGE
// =========================================================


// =========================================================
// PORTFOLIO FILTER
// =========================================================

const filterButtons = document.querySelectorAll(".filter-button");
const portfolioCards = document.querySelectorAll(".portfolio-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active state from all buttons
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Add active state to clicked button
        button.classList.add("active");

        // Get selected filter
        const filter = button.dataset.filter;

        // Filter portfolio cards
        portfolioCards.forEach(card => {

            const category = card.dataset.category;

            if (filter === "all" || category === filter) {

                card.classList.remove("hidden");

            } else {

                card.classList.add("hidden");

            }

        });

    });

});


// =========================================================
// SCROLL REVEAL
// =========================================================

const revealElements = document.querySelectorAll(
    ".portfolio-card, .process-item, .camera-story-content"
);


if ("IntersectionObserver" in window) {

    const revealObserver = new IntersectionObserver(
        (entries, observer) => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("revealed");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.12
        }
    );


    revealElements.forEach(element => {

        element.classList.add("reveal");

        revealObserver.observe(element);

    });

} else {

    // Fallback for browsers without IntersectionObserver
    revealElements.forEach(element => {
        element.classList.add("revealed");
    });

}


// =========================================================
// IMAGE LIGHTBOX
// =========================================================

const portfolioImages = document.querySelectorAll(
    ".portfolio-image img"
);


let activeLightbox = null;
let previousFocusedElement = null;


// ---------------------------------------------------------
// CLEANUP FUNCTION
// ---------------------------------------------------------

function cleanupLightbox() {

    if (!activeLightbox) {
        return;
    }


    // Remove Escape key listener
    document.removeEventListener(
        "keydown",
        handleLightboxKeydown
    );


    // Restore background scrolling
    document.body.style.overflow = "";


    // Restore focus to the image that opened the lightbox
    if (
        previousFocusedElement &&
        typeof previousFocusedElement.focus === "function"
    ) {

        previousFocusedElement.focus();

    }


    // Remove lightbox from DOM
    activeLightbox.remove();


    // Reset references
    activeLightbox = null;
    previousFocusedElement = null;

}


// ---------------------------------------------------------
// ESCAPE KEY HANDLER
// ---------------------------------------------------------

function handleLightboxKeydown(event) {

    if (event.key === "Escape") {

        cleanupLightbox();

    }

}


// ---------------------------------------------------------
// OPEN LIGHTBOX
// ---------------------------------------------------------

function openLightbox(image) {

    // Prevent multiple lightboxes
    if (activeLightbox) {
        return;
    }


    // Remember the image that opened the lightbox
    previousFocusedElement = image;


    // Create overlay
    const lightbox = document.createElement("div");

    lightbox.className = "work-lightbox";


    lightbox.setAttribute("role", "dialog");
    lightbox.setAttribute("aria-modal", "true");
    lightbox.setAttribute(
        "aria-label",
        "Image preview"
    );


    lightbox.innerHTML = `

        <div class="lightbox">

            <button
                type="button"
                class="lightbox-close"
                aria-label="Close image preview"
            >
                <span aria-hidden="true">&times;</span>
            </button>

            <img
                class="lightbox-image"
                src="${image.src}"
                alt="${image.alt || "Portfolio image"}"
            >

        </div>

    `;


    document.body.appendChild(lightbox);


    // Save active lightbox
    activeLightbox = lightbox;


    // -----------------------------------------------------
    // CLOSE BUTTON
    // -----------------------------------------------------

    const closeButton =
        lightbox.querySelector(".lightbox-close");


    closeButton.addEventListener(
        "click",
        cleanupLightbox
    );


    // -----------------------------------------------------
    // CLICK OUTSIDE IMAGE
    // -----------------------------------------------------

    lightbox.addEventListener(
        "click",
        event => {

            if (event.target === lightbox) {

                cleanupLightbox();

            }

        }
    );


    // -----------------------------------------------------
    // ESCAPE KEY
    // -----------------------------------------------------

    document.addEventListener(
        "keydown",
        handleLightboxKeydown
    );


    // -----------------------------------------------------
    // LOCK BACKGROUND SCROLL
    // -----------------------------------------------------

    document.body.style.overflow = "hidden";


    // -----------------------------------------------------
    // FOCUS CLOSE BUTTON
    // -----------------------------------------------------

    closeButton.focus();

}


// =========================================================
// ATTACH LIGHTBOX TO PORTFOLIO IMAGES
// =========================================================

portfolioImages.forEach(image => {

    // Make image keyboard accessible
    image.setAttribute("tabindex", "0");
    image.setAttribute(
        "aria-label",
        "Open image preview"
    );


    // Mouse click
    image.addEventListener("click", () => {

        openLightbox(image);

    });


    // Keyboard accessibility
    image.addEventListener("keydown", event => {

        if (
            event.key === "Enter" ||
            event.key === " "
        ) {

            event.preventDefault();

            openLightbox(image);

        }

    });

});