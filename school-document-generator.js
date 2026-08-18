//==================================================
// SCHOOL DOCUMENT GENERATOR
// PREMIUM ERP
// PART - 1
//==================================================



//======================================
// DOCUMENT CONTAINER
//======================================

const documentContainer =
document.getElementById("documentContainer");



//======================================
// ALL MENU BUTTONS
//======================================

const menuButtons =
document.querySelectorAll(".menu-btn");



//======================================
// EXAM DOCUMENTS
//======================================

const examTimetable =
document.getElementById("examTimetable");

const examNotice =
document.getElementById("examNotice");



//======================================
// OFFICE DOCUMENTS
//======================================

const officialNotice =
document.getElementById("officialNotice");

const circular =
document.getElementById("circular");

const officeOrder =
document.getElementById("officeOrder");

const parentMeeting =
document.getElementById("parentMeeting");



//======================================
// DISCIPLINE
//======================================

const warningLetter =
document.getElementById("warningLetter");



//======================================
// REMOVE ACTIVE
//======================================

function removeActive(){

    menuButtons.forEach(button=>{

        button.classList.remove("active");

    });

}



//======================================
// SET ACTIVE
//======================================

function setActive(button){

    removeActive();

    button.classList.add("active");

}



//======================================
// EMPTY PAGE
//======================================

function showWelcome(){

    documentContainer.innerHTML=`

        <div class="empty-state">

            <i class="fa-regular fa-file-lines"></i>

            <h2>

                Select Any Document

            </h2>

            <p>

                Choose any document
                from the left panel.

            </p>

        </div>

    `;

}



//======================================
// INITIAL LOAD
//======================================

window.addEventListener("load",()=>{

    showWelcome();

});



//======================================
// READY
//======================================

console.log(

"School Document Generator Loaded."

);//==================================================
// SCHOOL DOCUMENT GENERATOR
// PREMIUM ERP
// PART - 2
//==================================================



//======================================
// LOAD DOCUMENT
//======================================

function loadDocument(title,icon){

    documentContainer.innerHTML=`

        <div class="document-workspace">

            <div class="document-header">

                <i class="${icon}"></i>

                <h2>${title}</h2>

            </div>

            <div class="document-placeholder">

                <i class="${icon}"></i>

                <h3>${title}</h3>

                <p>

                    This document is under development.

                </p>

            </div>

        </div>

    `;

}



//======================================
// EXAM DOCUMENTS
//======================================

examTimetable.addEventListener("click",()=>{

    setActive(examTimetable);

    loadDocument(

        "Exam Time Table",

        "fa-solid fa-calendar-days"

    );

});



examNotice.addEventListener("click",()=>{

    setActive(examNotice);

    loadDocument(

        "Exam Notice",

        "fa-solid fa-bullhorn"

    );

});



//======================================
// OFFICE DOCUMENTS
//======================================

officialNotice.addEventListener("click",()=>{

    setActive(officialNotice);

    loadDocument(

        "Official Notice",

        "fa-solid fa-file-circle-exclamation"

    );

});



circular.addEventListener("click",()=>{

    setActive(circular);

    loadDocument(

        "Circular",

        "fa-solid fa-scroll"

    );

});



officeOrder.addEventListener("click",()=>{

    setActive(officeOrder);

    loadDocument(

        "Office Order",

        "fa-solid fa-file-signature"

    );

});



parentMeeting.addEventListener("click",()=>{

    setActive(parentMeeting);

    loadDocument(

        "Parent Meeting Notice",

        "fa-solid fa-users"

    );

});



//======================================
// DISCIPLINE
//======================================

warningLetter.addEventListener("click",()=>{

    setActive(warningLetter);

    loadDocument(

        "Student Warning Letter",

        "fa-solid fa-triangle-exclamation"

    );

});



//======================================
// READY
//======================================

console.log(

"All Document Buttons Connected."

);//==================================================
// SCHOOL DOCUMENT GENERATOR
// PREMIUM ERP
// PART - 3
//==================================================



//======================================
// EXAM TIME TABLE
//======================================

function openExamTimeTable(){

    loadDocument(
        "Exam Time Table",
        "fa-solid fa-calendar-days"
    );

}



//======================================
// EXAM NOTICE
//======================================

function openExamNotice(){

    loadDocument(
        "Exam Notice",
        "fa-solid fa-bullhorn"
    );

}



//======================================
// OFFICIAL NOTICE
//======================================

function openOfficialNotice(){

    loadDocument(
        "Official Notice",
        "fa-solid fa-file-circle-exclamation"
    );

}



//======================================
// CIRCULAR
//======================================

function openCircular(){

    loadDocument(
        "Circular",
        "fa-solid fa-scroll"
    );

}



//======================================
// OFFICE ORDER
//======================================

function openOfficeOrder(){

    loadDocument(
        "Office Order",
        "fa-solid fa-file-signature"
    );

}



//======================================
// PARENT MEETING NOTICE
//======================================

function openParentMeetingNotice(){

    loadDocument(
        "Parent Meeting Notice",
        "fa-solid fa-users"
    );

}



//======================================
// WARNING LETTER
//======================================

function openWarningLetter(){

    loadDocument(
        "Student Warning Letter",
        "fa-solid fa-triangle-exclamation"
    );

}



//======================================
// BUTTON EVENTS
//======================================

examTimetable.onclick=()=>{

    setActive(examTimetable);

    openExamTimeTable();

};



examNotice.onclick=()=>{

    setActive(examNotice);

    openExamNotice();

};



officialNotice.onclick=()=>{

    setActive(officialNotice);

    openOfficialNotice();

};



circular.onclick=()=>{

    setActive(circular);

    openCircular();

};



officeOrder.onclick=()=>{

    setActive(officeOrder);

    openOfficeOrder();

};



parentMeeting.onclick=()=>{

    setActive(parentMeeting);

    openParentMeetingNotice();

};



warningLetter.onclick=()=>{

    setActive(warningLetter);

    openWarningLetter();

};



//======================================
// READY
//======================================

console.log(
    "Document Loader Ready."
);