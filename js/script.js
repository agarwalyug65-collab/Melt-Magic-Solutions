// =========================
// MOBILE MENU TOGGLE
// =========================

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

if (menuButton) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

const navLinks = document.querySelectorAll("nav a");
navLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navMenu) navMenu.classList.remove("active");
    });
});


// =========================
// CONTACT FORM SUBMISSION
// =========================

const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (contactForm) {
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const email = document.getElementById("email").value.trim();
        const message = document.getElementById("message").value.trim();
        const submitBtn = contactForm.querySelector("button[type='submit']");

        if (!name || !email || !message) {
            formMessage.style.color = "#d9534f";
            formMessage.textContent = "Please fill in all required fields.";
            return;
        }

        formMessage.style.color = "#555";
        formMessage.textContent = "Sending your enquiry...";
        if (submitBtn) submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        })
        .then(async (response) => {
            let json = await response.json();
            if (response.status === 200) {
                formMessage.style.color = "#28a745";
                formMessage.textContent = "Thank you! Your enquiry has been sent successfully.";
                contactForm.reset();
            } else {
                formMessage.style.color = "#d9534f";
                formMessage.textContent = json.message || "Something went wrong. Please try again.";
            }
        })
        .catch(() => {
            formMessage.style.color = "#d9534f";
            formMessage.textContent = "Connection error. Please try again later.";
        })
        .finally(() => {
            if (submitBtn) submitBtn.disabled = false;
        });
    });
}


// =========================
// DYNAMIC FOOTER YEAR
// =========================

const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}


// =========================
// SCROLL ANIMATIONS (INTERSECTION OBSERVER)
// =========================

const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("visible");
        }
    });
}, observerOptions);

document.querySelectorAll(".section").forEach(section => {
    observer.observe(section);
});
