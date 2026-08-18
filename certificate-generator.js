/*=========================================
      SJS ERP CERTIFICATE GENERATOR
=========================================*/

"use strict";

/*=========================================
            DOM ELEMENTS
=========================================*/

const searchInput = document.getElementById("searchCertificate");

const certificateCards = document.querySelectorAll(".certificate-card");

const currentDate = document.getElementById("currentDate");

/*=========================================
            CURRENT DATE
=========================================*/

function showCurrentDate() {

    const today = new Date();

    const options = {

        weekday: "long",

        day: "numeric",

        month: "long",

        year: "numeric"

    };

    currentDate.textContent =
        today.toLocaleDateString("en-IN", options);

}

showCurrentDate();

/*=========================================
        LIVE SEARCH FUNCTION
=========================================*/

function searchCertificates() {

    const value =
        searchInput.value.toLowerCase().trim();

    certificateCards.forEach(function(card) {

        const title =
            card.querySelector("h3")
            .textContent
            .toLowerCase();

        const description =
            card.querySelector("p")
            .textContent
            .toLowerCase();

        if (
            title.includes(value) ||
            description.includes(value)
        ) {

            card.style.display = "block";

        }

        else {

            card.style.display = "none";

        }

    });

}

searchInput.addEventListener(

    "keyup",

    searchCertificates

);

/*=========================================
        ENTER KEY SUPPORT
=========================================*/

searchInput.addEventListener(

    "keydown",

    function(event){

        if(event.key==="Enter"){

            event.preventDefault();

            searchCertificates();

        }

    }

);

/*=========================================
        SEARCH PLACEHOLDER
=========================================*/

const placeholders = [

    "Search Character Certificate...",

    "Search Transfer Certificate...",

    "Search Merit Certificate...",

    "Search Academic Excellence...",

    "Search Experience Certificate...",

    "Search Appreciation Certificate..."

];

let placeholderIndex = 0;

function changePlaceholder(){

    searchInput.placeholder =
        placeholders[placeholderIndex];

    placeholderIndex++;

    if(placeholderIndex>=placeholders.length){

        placeholderIndex=0;

    }

}

setInterval(changePlaceholder,2500);/*=========================================
        PAGE LOADER ANIMATION
=========================================*/

window.addEventListener("load", function () {

    document.body.style.opacity = "1";

    document.body.style.transition = "0.4s";

});

/*=========================================
        CARD HOVER EFFECT
=========================================*/

certificateCards.forEach(function(card){

    card.addEventListener("mouseenter",function(){

        card.style.transform="translateY(-8px) scale(1.02)";

    });

    card.addEventListener("mouseleave",function(){

        card.style.transform="translateY(0) scale(1)";

    });

});

/*=========================================
        ACTIVE BUTTON EFFECT
=========================================*/

const generateButtons =
document.querySelectorAll(".certificate-card button");

generateButtons.forEach(function(button){

    button.addEventListener("click",function(){

        button.innerHTML=

        '<i class="fa-solid fa-spinner fa-spin"></i> Opening...';

    });

});

/*=========================================
        NO RESULT MESSAGE
=========================================*/

const certificateGrid =
document.querySelectorAll(".certificate-grid");

const noResult=document.createElement("div");

noResult.className="no-result";

noResult.innerHTML=`

<i class="fa-solid fa-circle-exclamation"></i>

<h2>No Certificate Found</h2>

<p>

Try searching with another keyword.

</p>

`;

function checkSearchResult(){

    let visible=0;

    certificateCards.forEach(function(card){

        if(card.style.display!=="none"){

            visible++;

        }

    });

    if(visible===0){

        if(!document.querySelector(".no-result")){

            document.querySelector(".main")
            .appendChild(noResult);

        }

    }

    else{

        if(document.querySelector(".no-result")){

            noResult.remove();

        }

    }

}

searchInput.addEventListener(

"keyup",

checkSearchResult

);

/*=========================================
        RIPPLE EFFECT
=========================================*/

generateButtons.forEach(function(button){

    button.addEventListener("click",function(e){

        const ripple=document.createElement("span");

        ripple.classList.add("ripple");

        const rect=this.getBoundingClientRect();

        ripple.style.left=(e.clientX-rect.left)+"px";

        ripple.style.top=(e.clientY-rect.top)+"px";

        this.appendChild(ripple);

        setTimeout(function(){

            ripple.remove();

        },600);

    });

});

/*=========================================
        SCROLL ANIMATION
=========================================*/

const observer=new IntersectionObserver(

(entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show-card");

}

});

},

{

threshold:0.15

}

);

certificateCards.forEach(function(card){

observer.observe(card);

});

/*=========================================
        CONSOLE MESSAGE
=========================================*/

console.log(

"%cSJS ERP Certificate Generator Loaded",

"color:#0B3D91;font-size:18px;font-weight:bold;"

);

console.log(

"Developed for St. Joseph's School ERP"

);/*=========================================
        KEYBOARD SHORTCUTS
=========================================*/

document.addEventListener("keydown", function (event) {

    /* Ctrl + K => Focus Search */

    if (event.ctrlKey && event.key.toLowerCase() === "k") {

        event.preventDefault();

        searchInput.focus();

        searchInput.select();

    }

    /* ESC => Clear Search */

    if (event.key === "Escape") {

        searchInput.value = "";

        searchCertificates();

        checkSearchResult();

    }

});

/*=========================================
        BACK TO TOP BUTTON
=========================================*/

const topButton = document.createElement("button");

topButton.className = "back-to-top";

topButton.innerHTML =

'<i class="fa-solid fa-arrow-up"></i>';

document.body.appendChild(topButton);

window.addEventListener("scroll", function () {

    if (window.scrollY > 300) {

        topButton.style.display = "flex";

    }

    else {

        topButton.style.display = "none";

    }

});

topButton.addEventListener("click", function () {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

});

/*=========================================
        PAGE VISIT COUNTER
=========================================*/

let visits =

Number(localStorage.getItem("certificateVisits")) || 0;

visits++;

localStorage.setItem("certificateVisits", visits);

console.log("Certificate Page Visits :", visits);

/*=========================================
        BUTTON CLICK COUNTER
=========================================*/

generateButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        let total =

        Number(localStorage.getItem("generatedCertificates")) || 0;

        total++;

        localStorage.setItem(

            "generatedCertificates",

            total

        );

        console.log(

            "Generated Certificates :", total

        );

    });

});

/*=========================================
        WELCOME MESSAGE
=========================================*/

setTimeout(function () {

    console.log(

        "%cWelcome to SJS ERP",

        "background:#0B3D91;color:white;padding:8px 12px;border-radius:5px;font-size:14px;font-weight:bold;"

    );

}, 800);

/*=========================================
        DISABLE RIGHT CLICK
=========================================*/

document.addEventListener("contextmenu", function (e) {

    e.preventDefault();

});

/*=========================================
        DISABLE F12
=========================================*/

document.addEventListener("keydown", function (e) {

    if (e.key === "F12") {

        e.preventDefault();

    }

});

/*=========================================
        WINDOW TITLE EFFECT
=========================================*/

const defaultTitle = document.title;

window.addEventListener("blur", function () {

    document.title = "Come Back | SJS ERP";

});

window.addEventListener("focus", function () {

    document.title = defaultTitle;

});

/*=========================================
        PAGE READY
=========================================*/

document.addEventListener("DOMContentLoaded", function () {

    console.log("Certificate Generator Ready");

});

/*=========================================
        END OF FILE
=========================================*/