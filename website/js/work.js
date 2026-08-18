// =========================================================
// ZEALICON — OUR WORK PAGE
// =========================================================


// =========================================================
// PORTFOLIO FILTER
// =========================================================

const filterButtons =
    document.querySelectorAll(".filter-button");

const portfolioCards =
    document.querySelectorAll(".portfolio-card");


filterButtons.forEach(button => {

    button.addEventListener("click", () => {

        // Remove active state
        filterButtons.forEach(btn => {
            btn.classList.remove("active");
        });

        // Activate clicked button
        button.classList.add("active");


        const filter =
            button.getAttribute("data-filter");


        portfolioCards.forEach(card => {

            const category =
                card.getAttribute("data-category");


            if (
                filter === "all" ||
                category === filter
            ) {

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

const revealElements =
    document.querySelectorAll(
        ".portfolio-card, .process-item, .camera-story-content"
    );


const revealObserver =
    new IntersectionObserver(
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



// =========================================================
// IMAGE LIGHTBOX
// =========================================================

const portfolioImages =
    document.querySelectorAll(".portfolio-image img");


portfolioImages.forEach(image => {

    image.addEventListener("click", () => {

        const lightbox =
            document.createElement("div");

        lightbox.className =
            "work-lightbox";


        lightbox.innerHTML = `

            <div class="lightbox-close">
                ×
            </div>

            <img
                src="${image.src}"
                alt="${image.alt}"
            >

        `;


        document.body.appendChild(lightbox);


        // Close button
        const closeButton =
            lightbox.querySelector(".lightbox-close");


        closeButton.addEventListener(
            "click",
            () => {
                lightbox.remove();
            }
        );


        // Click outside image
        lightbox.addEventListener(
            "click",
            event => {

                if (
                    event.target === lightbox
                ) {
                    lightbox.remove();
                }

            }
        );


        // Escape key
        document.addEventListener(
            "keydown",
            function closeWithEscape(event) {

                if (event.key === "Escape") {

                    lightbox.remove();

                    document.removeEventListener(
                        "keydown",
                        closeWithEscape
                    );

                }

            }
        );

    });

});