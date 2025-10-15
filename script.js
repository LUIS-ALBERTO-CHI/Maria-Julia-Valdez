const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");
const allNavLinks = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main, section[id]");

// --- Toggle del menú móvil ---
menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});

// --- Cierra el menú móvil al hacer clic en un enlace ---
allNavLinks.forEach(link => {
    link.addEventListener("click", () => {
        if (navLinks.classList.contains("active")) {
            navLinks.classList.remove("active");
        }
    });
});

// --- Resaltado de enlace activo al hacer scroll (Método robusto) ---
const navHighlighter = () => {
    // Obtiene la posición actual del scroll
    let scrollY = window.pageYOffset;
    let currentSectionId = "";

    // Itera sobre cada sección para ver cuál está en la vista
    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;

        // Si la posición del scroll está dentro de los límites de la sección actual...
        // El offset de 150px ayuda a que el cambio sea más natural y no justo en el borde.
        if (scrollY >= sectionTop - 150 && scrollY < sectionTop + sectionHeight - 150) {
            currentSectionId = section.getAttribute('id');
        }
    });

    // Actualiza la clase 'active' en el enlace correspondiente
    allNavLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
};

window.addEventListener('scroll', navHighlighter);
// Llama a la función una vez al cargar la página para establecer el estado inicial correcto
document.addEventListener('DOMContentLoaded', navHighlighter);