// ====================================
// 1. MOBILE NAVIGATION
// ====================================

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

    const isOpen = navLinks.classList.contains("show");

    menuToggle.textContent = isOpen ? "✕" : "☰";
    menuToggle.setAttribute("aria-expanded", isOpen);

});

// Close mobile menu after clicking a link

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("show");

        menuToggle.textContent = "☰";
        menuToggle.setAttribute("aria-expanded", "false");

    });

});


// ====================================
// 2. ACTIVE NAVIGATION
// ====================================

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 150) {
            currentSection = section.getAttribute("id");
        }

    });

    navigationLinks.forEach(link => {

        link.classList.remove("active");

        if (link.getAttribute("href") === "#" + currentSection) {
            link.classList.add("active");
        }

    });

}

window.addEventListener("scroll", updateActiveNavigation);
updateActiveNavigation();


// ====================================
// 3. PROGRAM DETAILS MODAL
// ====================================

const programDetails = {

    fitness: {
        title: "Fitness Program",
        description:
            "Our Fitness Program focuses on building strength, improving endurance, and developing healthy habits. Each session is designed to help you achieve your personal fitness goals at your own pace."
    },

    signature: {
        title: "Signature Program",
        description:
            "Our Signature Program combines strength training, mindful movement, flexibility, and personalized wellness coaching. It offers a balanced approach to improving both physical and mental well-being."
    },

    elegant: {
        title: "Elegant Program",
        description:
            "Our Elegant Program focuses on graceful movement, flexibility, balance, and relaxation. This program is perfect for individuals who prefer a gentle yet effective approach to fitness."
    }

};

const programButtons = document.querySelectorAll(".program-btn");

const modal = document.getElementById("programModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const closeModal = document.getElementById("closeModal");
const modalContact = document.getElementById("modalContact");

programButtons.forEach(button => {

    button.addEventListener("click", () => {

        const program = button.dataset.program;

        modalTitle.textContent = programDetails[program].title;

        modalDescription.textContent =
            programDetails[program].description;

        modal.classList.add("show");

        document.body.style.overflow = "hidden";

    });

});

function hideModal() {

    modal.classList.remove("show");

    document.body.style.overflow = "";

}

closeModal.addEventListener("click", hideModal);

modalContact.addEventListener("click", hideModal);

modal.addEventListener("click", (event) => {

    if (event.target === modal) {
        hideModal();
    }

});

document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        hideModal();
    }

});


// ====================================
// 4. TESTIMONIAL SLIDER
// ====================================

const testimonials = [

    {
        name: "Sofia Bennett",
        role: "Wellness Client",
        text:
            "I was searching for a way to reconnect with myself, and Sage & Strength gave me exactly what I needed. The experience has truly transformed my lifestyle.",
        image: "images/testimonials1.jpg",
        secondImage: "images/testimonial2.jpg"
    },

    {
        name: "Olivia Carter",
        role: "Fitness Member",
        text:
            "Joining Sage & Strength was one of the best decisions I made. The instructors are supportive, and every session helps me feel stronger and more confident.",
        image: "images/testimonial2.jpg",
        secondImage: "images/testimonial3.jpg"
    },

    {
        name: "Emma Wilson",
        role: "Signature Program Member",
        text:
            "The Signature Program helped me develop a healthier lifestyle. I love how the sessions focus on both physical strength and mental wellness.",
        image: "images/testimonial3.jpg",
        secondImage: "images/testimonials1.jpg"
    }

];


let currentTestimonial = 0;

const testimonialImg = document.getElementById("testimonialImg");
const testimonialImg2 = document.getElementById("testimonialImg2");

const testimonialText = document.getElementById("testimonialText");
const testimonialName = document.getElementById("testimonialName");
const testimonialRole = document.getElementById("testimonialRole");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const sliderDots = document.getElementById("sliderDots");


// Create slider dots

testimonials.forEach((testimonial, index) => {

    const dot = document.createElement("button");

    dot.classList.add("dot");
    dot.setAttribute("aria-label", `Show testimonial ${index + 1}`);

    dot.addEventListener("click", () => {

        currentTestimonial = index;

        updateTestimonial();

    });

    sliderDots.appendChild(dot);

});


function updateTestimonial() {

    const testimonial = testimonials[currentTestimonial];

    testimonialImg.src = testimonial.image;
    testimonialImg2.src = testimonial.secondImage;

    testimonialText.textContent = testimonial.text;
    testimonialName.textContent = "— " + testimonial.name;
    testimonialRole.textContent = testimonial.role;

    const dots = document.querySelectorAll(".dot");

    dots.forEach((dot, index) => {

        dot.classList.toggle(
            "active",
            index === currentTestimonial
        );

    });

}


// Next testimonial

nextBtn.addEventListener("click", () => {

    currentTestimonial++;

    if (currentTestimonial >= testimonials.length) {
        currentTestimonial = 0;
    }

    updateTestimonial();

});


// Previous testimonial

prevBtn.addEventListener("click", () => {

    currentTestimonial--;

    if (currentTestimonial < 0) {
        currentTestimonial = testimonials.length - 1;
    }

    updateTestimonial();

});


// Display first testimonial

updateTestimonial();


// ====================================
// 5. EMAIL SUBSCRIPTION
// ====================================

const subscribeForm = document.getElementById("subscribeForm");
const emailInput = document.getElementById("email");
const formMessage = document.getElementById("formMessage");

subscribeForm.addEventListener("submit", (event) => {

    event.preventDefault();

    const email = emailInput.value.trim();

    if (email === "") {

        formMessage.textContent =
            "Please enter your email address.";

        return;

    }

    if (!emailInput.checkValidity()) {

        formMessage.textContent =
            "Please enter a valid email address.";

        return;

    }

    formMessage.textContent =
        "Thank you for joining our community!";

    subscribeForm.reset();

});


// ====================================
// 6. SCROLL REVEAL ANIMATION
// ====================================

const revealElements = document.querySelectorAll(
    ".about-image, .about-content, .program-card, .testimonial-content, .contact-content"
);

revealElements.forEach(element => {
    element.classList.add("reveal");
});

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add("active");

            observer.unobserve(entry.target);

        }

    });

}, {
    threshold: 0.1
});

revealElements.forEach(element => {
    observer.observe(element);
});