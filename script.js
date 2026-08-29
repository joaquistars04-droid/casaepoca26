/*=========================================
    CASA ÉPOCA - JAVASCRIPT
=========================================*/

/*=========================================
    MENÚ HAMBURGUESA (MOBILE)
=========================================*/

const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".navbar ul");
const navBackdrop = document.querySelector(".nav-backdrop");

if(navToggle && navMenu && navBackdrop){

    const closeMenu = () => {

        navMenu.classList.remove("open");
        navToggle.classList.remove("active");
        navBackdrop.classList.remove("active");
        navToggle.setAttribute("aria-expanded","false");
        document.body.style.overflow = "";

    };

    const openMenu = () => {

        navMenu.classList.add("open");
        navToggle.classList.add("active");
        navBackdrop.classList.add("active");
        navToggle.setAttribute("aria-expanded","true");
        document.body.style.overflow = "hidden";

    };

    navToggle.addEventListener("click", () => {

        if(navMenu.classList.contains("open")){

            closeMenu();

        } else {

            openMenu();

        }

    });

    navBackdrop.addEventListener("click", closeMenu);

    navMenu.querySelectorAll("a").forEach(link => {

        link.addEventListener("click", closeMenu);

    });

}


// Navbar cambia al hacer scroll
const navbar = document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.background = "rgba(10,10,10,.95)";
        navbar.style.padding = "15px 8%";
        navbar.style.boxShadow = "0 5px 20px rgba(0,0,0,.5)";

    } else {

        navbar.style.background = "rgba(0,0,0,.35)";
        navbar.style.padding = "22px 8%";
        navbar.style.boxShadow = "none";

    }

});


/*=========================================
    CONTADORES ANIMADOS
=========================================*/

const counters = document.querySelectorAll(".numero");

const startCounter = (counter) => {

    const target = +counter.getAttribute("data-target");
    let current = 0;

    const increment = target / 150;

    const update = () => {

        current += increment;

        if (current < target) {

            counter.innerText = Math.floor(current);

            requestAnimationFrame(update);

        } else {

            counter.innerText = target.toLocaleString();

        }

    }

    update();

}


const observer = new IntersectionObserver(entries => {

    entries.forEach(entry => {

        if(entry.isIntersecting){

            startCounter(entry.target);

            observer.unobserve(entry.target);

        }

    });

},{threshold:.5});

counters.forEach(counter=>observer.observe(counter));


/*=========================================
    ANIMACIÓN AL APARECER
=========================================*/

const sections = document.querySelectorAll("section");

const reveal = new IntersectionObserver(entries=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{threshold:.15});

sections.forEach(section=>{

section.classList.add("hidden");

reveal.observe(section);

});


/*=========================================
    BOTÓN VOLVER ARRIBA
=========================================*/

const btnTop = document.createElement("button");

btnTop.innerHTML = "↑";

btnTop.className = "btn-top";

document.body.appendChild(btnTop);

window.addEventListener("scroll",()=>{

if(window.scrollY>500){

btnTop.classList.add("active");

}else{

btnTop.classList.remove("active");

}

});

btnTop.addEventListener("click",()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

});


/*=========================================
    EFECTO EN TARJETAS
=========================================*/

const cards=document.querySelectorAll(".card");

cards.forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

card.style.transform=`
perspective(900px)
rotateX(${-(y-rect.height/2)/20}deg)
rotateY(${(x-rect.width/2)/20}deg)
scale(1.05)
`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="rotateX(0deg) rotateY(0deg)";

});

});


/*=========================================
    GALERÍA MULTI-ÁNGULO (AUTOS)
=========================================*/

document.querySelectorAll(".auto-card").forEach(card=>{

    const mainImg = card.querySelector(".auto-main-img");

    const thumbs = [...card.querySelectorAll(".auto-thumb")];

    const counter = card.querySelector(".auto-counter");

    const prevBtn = card.querySelector(".auto-prev");

    const nextBtn = card.querySelector(".auto-next");

    if(!mainImg || thumbs.length === 0) return;

    let index = 0;

    const render = () => {

        mainImg.src = thumbs[index].src;

        mainImg.alt = thumbs[index].alt;

        thumbs.forEach(t=>t.classList.remove("active"));

        thumbs[index].classList.add("active");

        if(counter) counter.textContent = `${index+1}/${thumbs.length}`;

    };

    thumbs.forEach((thumb,i)=>{

        thumb.addEventListener("click",()=>{

            index = i;

            render();

        });

    });

    if(prevBtn){

        prevBtn.addEventListener("click",(e)=>{

            e.stopPropagation();

            index = (index - 1 + thumbs.length) % thumbs.length;

            render();

        });

    }

    if(nextBtn){

        nextBtn.addEventListener("click",(e)=>{

            e.stopPropagation();

            index = (index + 1) % thumbs.length;

            render();

        });

    }

});


/*=========================================
    VISOR DE IMÁGENES (LIGHTBOX)
=========================================*/

const lightbox = document.createElement("div");

lightbox.className = "lightbox";

lightbox.innerHTML = `
    <button class="lightbox-close" aria-label="Cerrar">&times;</button>
    <button class="lightbox-nav lightbox-prev" aria-label="Foto anterior"><i class="fa-solid fa-chevron-left"></i></button>
    <img src="" alt="">
    <button class="lightbox-nav lightbox-next" aria-label="Foto siguiente"><i class="fa-solid fa-chevron-right"></i></button>
    <span class="lightbox-counter"></span>
`;

document.body.appendChild(lightbox);

const lightboxImg = lightbox.querySelector("img");
const lightboxCounter = lightbox.querySelector(".lightbox-counter");
const lightboxPrev = lightbox.querySelector(".lightbox-prev");
const lightboxNext = lightbox.querySelector(".lightbox-next");

let currentGallery = [];
let currentIndex = 0;

const renderLightbox = () => {

    const item = currentGallery[currentIndex];

    lightboxImg.src = item.src;

    lightboxImg.alt = item.alt || "";

    if(currentGallery.length > 1){

        lightboxCounter.textContent = `${currentIndex+1}/${currentGallery.length}`;

    }

};

const openLightbox = (gallery, startIndex) => {

    currentGallery = gallery;

    currentIndex = startIndex;

    lightbox.classList.toggle("has-gallery", currentGallery.length > 1);

    renderLightbox();

    lightbox.classList.add("active");

    document.body.style.overflow = "hidden";

};

const closeLightbox = () => {

    lightbox.classList.remove("active");

    document.body.style.overflow = "";

};

const showPrev = () => {

    currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;

    renderLightbox();

};

const showNext = () => {

    currentIndex = (currentIndex + 1) % currentGallery.length;

    renderLightbox();

};

// Autos: la galería completa de ángulos entra al lightbox

document.querySelectorAll(".auto-card").forEach(card=>{

    const mainImg = card.querySelector(".auto-main-img");

    const thumbs = [...card.querySelectorAll(".auto-thumb")];

    if(!mainImg || thumbs.length === 0) return;

    mainImg.addEventListener("click",()=>{

        const gallery = thumbs.map(t=>({src:t.src, alt:t.alt}));

        const activeIndex = thumbs.findIndex(t=>t.classList.contains("active"));

        openLightbox(gallery, activeIndex >= 0 ? activeIndex : 0);

    });

});

// Resto de imágenes (colección, historia, galería): una sola foto sin navegación

document.querySelectorAll(".card img:not(.auto-thumb):not(.auto-main-img), .galeria-grid img").forEach(img=>{

    img.addEventListener("click",()=>{

        openLightbox([{src:img.src, alt:img.alt}], 0);

    });

});

lightbox.querySelector(".lightbox-close").addEventListener("click", closeLightbox);

lightboxPrev.addEventListener("click",(e)=>{ e.stopPropagation(); showPrev(); });

lightboxNext.addEventListener("click",(e)=>{ e.stopPropagation(); showNext(); });

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        closeLightbox();

    }

});

document.addEventListener("keydown",(e)=>{

    if(!lightbox.classList.contains("active")) return;

    if(e.key === "Escape"){

        closeLightbox();

    } else if(e.key === "ArrowLeft" && currentGallery.length > 1){

        showPrev();

    } else if(e.key === "ArrowRight" && currentGallery.length > 1){

        showNext();

    }

});

/*=========================================
    AÑO AUTOMÁTICO
=========================================*/

const copy = document.querySelector(".copy");

if(copy){

copy.innerHTML = `© ${new Date().getFullYear()} Casa Época. Todos los derechos reservados.`;

}