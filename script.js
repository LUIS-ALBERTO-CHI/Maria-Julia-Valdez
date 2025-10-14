const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navbar = document.querySelector(".navbar");
const desktopNavLinks = document.querySelectorAll(".navbar .nav-link");
const mobileNavLinks = document.querySelectorAll(".mobile-nav .mobile-nav-link");
const sections = document.querySelectorAll("main section");

hamburger.addEventListener("click", () => {
    // Activa/desactiva el menú y la animación del ícono
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
});

// Cierra el menú al hacer clic en un enlace (para móviles)
desktopNavLinks.forEach(link => {
    link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    });
});

// Cambia el fondo de la navbar al hacer scroll
window.addEventListener("scroll", () => {
    // Efecto de scroll para la navbar de escritorio
    if (window.scrollY > 50) {
        navbar.classList.add("scrolled");
    } else {
        navbar.classList.remove("scrolled");
    }

    // Resaltar enlace activo en la navegación móvil al hacer scroll
    let currentSection = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        // El 150 es un offset para que el cambio ocurra un poco antes de llegar a la sección
        if (pageYOffset >= sectionTop - sectionHeight / 3) {
            currentSection = section.getAttribute("id") || "hero"; // La sección hero no tiene id, así que la manejamos por defecto
        }
    });

    // Si estamos en la sección hero, el enlace activo es el de href="#"
    if (currentSection === "hero") {
        currentSection = "#";
    } else {
        currentSection = "#" + currentSection;
    }

    mobileNavLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === currentSection) {
            link.classList.add("active");
        }
    });
});