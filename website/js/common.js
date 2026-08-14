// ================= NAVBAR =================

const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }
});


// ================= MOBILE MENU =================

const menuToggle = document.querySelector(".menu-toggle");
const mainNav = document.querySelector(".main-nav");

if (menuToggle && mainNav) {

    menuToggle.addEventListener("click", () => {
        mainNav.classList.toggle("mobile-open");
        menuToggle.classList.toggle("active");
    });


    // Close menu after clicking a link

    const navLinks = mainNav.querySelectorAll("a");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {
            mainNav.classList.remove("mobile-open");
            menuToggle.classList.remove("active");
        });

    });

}