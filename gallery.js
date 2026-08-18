/*==================================================
        ST. JOSEPH'S SCHOOL
            GALLERY
            PART 1
==================================================*/


// ==========================================
// ELEMENTS
// ==========================================

const galleryTrack =
document.getElementById("galleryTrack");

const galleryCards =
document.querySelectorAll(".gallery-card");

const prevBtn =
document.querySelector(".prev");

const nextBtn =
document.querySelector(".next");

const dots =
document.querySelectorAll(".dot");

const lightbox =
document.getElementById("lightbox");

const lightboxImage =
document.getElementById("lightboxImage");

const lightboxCaption =
document.getElementById("lightboxCaption");

const closeLightbox =
document.getElementById("closeLightbox");



// ==========================================
// VARIABLES
// ==========================================

let currentSlide = 0;

const totalSlides = galleryCards.length;



// ==========================================
// UPDATE DOTS
// ==========================================

function updateDots(){

    dots.forEach(function(dot){

        dot.classList.remove("active");

    });

    if(dots[currentSlide]){

        dots[currentSlide].classList.add("active");

    }

}



// ==========================================
// SHOW SLIDE
// ==========================================

function showSlide(index){

    if(index < 0){

        currentSlide = totalSlides - 1;

    }

    else if(index >= totalSlides){

        currentSlide = 0;

    }

    else{

        currentSlide = index;

    }

    const cardWidth =
    galleryCards[0].offsetWidth + 30;

    galleryTrack.scrollTo({

        left: currentSlide * cardWidth,

        behavior:"smooth"

    });

    updateDots();

}



// ==========================================
// BUTTON EVENTS
// ==========================================

nextBtn.addEventListener("click",function(){

    showSlide(currentSlide + 1);

});



prevBtn.addEventListener("click",function(){

    showSlide(currentSlide - 1);

});
/*==================================================
            PART 2
     AUTO SLIDER + LIGHTBOX
==================================================*/


// ==========================================
// AUTO SLIDE
// ==========================================

let autoSlide = setInterval(function(){

    showSlide(currentSlide + 1);

},5000);



// ==========================================
// STOP AUTO SLIDE ON HOVER
// ==========================================

galleryTrack.addEventListener("mouseenter",function(){

    clearInterval(autoSlide);

});



// ==========================================
// START AGAIN
// ==========================================

galleryTrack.addEventListener("mouseleave",function(){

    autoSlide = setInterval(function(){

        showSlide(currentSlide + 1);

    },5000);

});



// ==========================================
// DOT NAVIGATION
// ==========================================

dots.forEach(function(dot,index){

    dot.addEventListener("click",function(){

        showSlide(index);

    });

});



// ==========================================
// OPEN LIGHTBOX
// ==========================================

galleryCards.forEach(function(card){

    card.addEventListener("click",function(){

        const image =
        card.querySelector("img");

        const title =
        card.querySelector("h3");

        lightbox.classList.add("active");

        lightboxImage.src =
        image.src;

        lightboxCaption.innerHTML =
        title.innerHTML;

    });

});



// ==========================================
// CLOSE LIGHTBOX
// ==========================================

closeLightbox.addEventListener("click",function(){

    lightbox.classList.remove("active");

});



// ==========================================
// CLOSE BY CLICKING OUTSIDE
// ==========================================

lightbox.addEventListener("click",function(e){

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});



// ==========================================
// ESC KEY CLOSE
// ==========================================

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        lightbox.classList.remove("active");

    }

});
/*==================================================
            PART 2
     AUTO SLIDER + LIGHTBOX
==================================================*/


// ==========================================
// AUTO SLIDE
// ==========================================

let autoSlide = setInterval(function(){

    showSlide(currentSlide + 1);

},5000);



// ==========================================
// STOP AUTO SLIDE ON HOVER
// ==========================================

galleryTrack.addEventListener("mouseenter",function(){

    clearInterval(autoSlide);

});



// ==========================================
// START AGAIN
// ==========================================

galleryTrack.addEventListener("mouseleave",function(){

    autoSlide = setInterval(function(){

        showSlide(currentSlide + 1);

    },5000);

});



// ==========================================
// DOT NAVIGATION
// ==========================================

dots.forEach(function(dot,index){

    dot.addEventListener("click",function(){

        showSlide(index);

    });

});



// ==========================================
// OPEN LIGHTBOX
// ==========================================

galleryCards.forEach(function(card){

    card.addEventListener("click",function(){

        const image =
        card.querySelector("img");

        const title =
        card.querySelector("h3");

        lightbox.classList.add("active");

        lightboxImage.src =
        image.src;

        lightboxCaption.innerHTML =
        title.innerHTML;

    });

});



// ==========================================
// CLOSE LIGHTBOX
// ==========================================

closeLightbox.addEventListener("click",function(){

    lightbox.classList.remove("active");

});



// ==========================================
// CLOSE BY CLICKING OUTSIDE
// ==========================================

lightbox.addEventListener("click",function(e){

    if(e.target===lightbox){

        lightbox.classList.remove("active");

    }

});



// ==========================================
// ESC KEY CLOSE
// ==========================================

document.addEventListener("keydown",function(e){

    if(e.key==="Escape"){

        lightbox.classList.remove("active");

    }

});