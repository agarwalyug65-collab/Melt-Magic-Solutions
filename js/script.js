document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("contactForm");
    const submitBtn = document.getElementById("submitBtn");
    const formStatus = document.getElementById("formStatus");

    if (form) {
        form.addEventListener("submit", function (e) {
            // Display submitting state
            submitBtn.disabled = true;
            submitBtn.innerText = "Sending Enquiry...";
            formStatus.innerText = "";
            formStatus.className = "form-status";
        });
    }
});
