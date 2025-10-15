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

// --- Lógica de Paginación para la sección de Proyectos ---
document.addEventListener('DOMContentLoaded', () => {
    const projectsPerPage = 3; // Cambia este número para mostrar más o menos proyectos por página
    const projectGrid = document.querySelector('.proyectos-grid');
    const allProjects = Array.from(projectGrid.querySelectorAll('.proyecto-card'));
    const paginationContainer = document.querySelector('.proyectos-pagination');

    const totalPages = Math.ceil(allProjects.length / projectsPerPage);

    // Si no hay suficientes proyectos para necesitar paginación, no hacemos nada
    if (totalPages <= 1) {
        paginationContainer.style.display = 'none';
        return;
    }

    // Función para mostrar la página correcta
    function showPage(page) {
        // Oculta todos los proyectos
        allProjects.forEach(project => project.style.display = 'none');

        // Muestra solo los proyectos de la página actual
        const startIndex = (page - 1) * projectsPerPage;
        const endIndex = startIndex + projectsPerPage;
        allProjects.slice(startIndex, endIndex).forEach(project => project.style.display = 'block');

        // Actualiza el punto de paginación activo
        document.querySelectorAll('.proyectos-pagination .pagination-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index + 1 === page);
        });
    }

    // Crea los puntos de paginación
    for (let i = 1; i <= totalPages; i++) {
        const dot = document.createElement('span');
        dot.classList.add('pagination-dot');
        dot.addEventListener('click', () => showPage(i));
        paginationContainer.appendChild(dot);
    }

    // Muestra la primera página por defecto
    showPage(1);
});