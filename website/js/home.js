// ================= INQUIRY FORM =================

const inquiryForm = document.querySelector(".inquiry-form");
const formMessage = document.querySelector(".form-message");

if (inquiryForm) {

    inquiryForm.addEventListener("submit", (event) => {

        event.preventDefault();

        const name = document.querySelector("#name").value.trim();
        const email = document.querySelector("#email").value.trim();
        const phone = document.querySelector("#phone").value.trim();

        if (!name || !email || !phone) {

            formMessage.textContent =
                "Please fill in all required fields.";

            formMessage.style.color = "#8e3026";

            return;
        }


        formMessage.textContent =
            "Thank you! Your inquiry has been received.";

        formMessage.style.color = "#3D8060";

        inquiryForm.reset();

    });

}