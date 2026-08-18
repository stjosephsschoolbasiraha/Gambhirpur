/*=========================================
    ST. JOSEPH'S SCHOOL ERP
    ACADEMIC EXCELLENCE CERTIFICATE
    JAVASCRIPT PART 1-A
=========================================*/

"use strict";

/*=========================================
        DOM ELEMENTS
=========================================*/

const certificateForm = document.getElementById("certificateForm");

const certificateNo = document.getElementById("certificateNo");
const issueDate = document.getElementById("issueDate");

const studentName = document.getElementById("studentName");
const fatherName = document.getElementById("fatherName");

const studentClass = document.getElementById("studentClass");
const section = document.getElementById("section");
const session = document.getElementById("session");

const achievementTitle =
document.getElementById("achievementTitle");

const achievementDescription =
document.getElementById("achievementDescription");

/*=========================================
        PREVIEW ELEMENTS
=========================================*/

const previewCertificateNo =
document.getElementById("previewCertificateNo");

const previewIssueDate =
document.getElementById("previewIssueDate");

const previewStudentName =
document.getElementById("previewStudentName");

const previewFatherName =
document.getElementById("previewFatherName");

const previewClass =
document.getElementById("previewClass");

const previewSection =
document.getElementById("previewSection");

const previewSession =
document.getElementById("previewSession");

const previewAchievementTitle =
document.getElementById("previewAchievementTitle");

const previewAchievementDescription =
document.getElementById("previewAchievementDescription");

/*=========================================
            BUTTONS
=========================================*/

const previewBtn =
document.getElementById("previewBtn");

const printBtn =
document.getElementById("printBtn");

const whatsappBtn =
document.getElementById("whatsappBtn");

const resetBtn =
document.querySelector(".btn-reset");

/*=========================================
        LOCAL STORAGE KEY
=========================================*/

const CERTIFICATE_KEY =
"SJS_ACADEMIC_EXCELLENCE_LAST_NO";

/*=========================================
        DEFAULT VALUES
=========================================*/

const DEFAULT_ACHIEVEMENT =
"Academic Excellence Award";

const DEFAULT_DESCRIPTION =
"This Certificate is proudly awarded in recognition of outstanding academic excellence, dedication, discipline and exceptional performance during the academic session. St. Joseph's School congratulates the student and wishes continued success in all future endeavours.";

/*=========================================
        TODAY DATE
=========================================*/

function setTodayDate(){

    const today = new Date();

    const yyyy = today.getFullYear();

    const mm = String(
        today.getMonth()+1
    ).padStart(2,"0");

    const dd = String(
        today.getDate()
    ).padStart(2,"0");

    issueDate.value =
    `${yyyy}-${mm}-${dd}`;

}

/*=========================================
        FORMAT DATE
=========================================*/

function formatDate(dateValue){

    if(!dateValue)
        return "--/--/----";

    const date =
    new Date(dateValue);

    const dd =
    String(date.getDate())
    .padStart(2,"0");

    const mm =
    String(date.getMonth()+1)
    .padStart(2,"0");

    const yyyy =
    date.getFullYear();

    return `${dd}/${mm}/${yyyy}`;

}

/*=========================================
        CERTIFICATE NUMBER
=========================================*/

function generateCertificateNumber(){

    let lastNo =
    Number(
        localStorage.getItem(
            CERTIFICATE_KEY
        )
    );

    if(!lastNo){

        lastNo = 1;

    }

    const formatted =
    String(lastNo)
    .padStart(4,"0");

    certificateNo.value =
    `SJS-AEC-${formatted}`;

}

/*=========================================
        SAVE CERTIFICATE NUMBER
=========================================*/

function saveCertificateNumber(){

    const value =
    certificateNo.value;

    const number =
    parseInt(
        value.replace(
            "SJS-AEC-",
            ""
        )
    );

    localStorage.setItem(
        CERTIFICATE_KEY,
        number + 1
    );

}

/*=========================================
        INITIAL LOAD
=========================================*/

window.addEventListener(
"DOMContentLoaded",
()=>{

    setTodayDate();

    generateCertificateNumber();

});/*=========================================
        LIVE PREVIEW
=========================================*/

function updatePreview(){

    previewCertificateNo.textContent =
    certificateNo.value;

    previewIssueDate.textContent =
    formatDate(issueDate.value);

    previewStudentName.textContent =
    studentName.value.trim() || "Student Name";

    previewFatherName.textContent =
    fatherName.value.trim() || "Father's Name";

    previewClass.textContent =
    studentClass.value;

    previewSection.textContent =
    section.value;

    previewSession.textContent =
    session.value.trim() || "2026-2027";

    previewAchievementTitle.textContent =
    achievementTitle.value.trim() ||
    DEFAULT_ACHIEVEMENT;

    previewAchievementDescription.textContent =
    achievementDescription.value.trim() ||
    DEFAULT_DESCRIPTION;

}

/*=========================================
        CAPITALIZE TEXT
=========================================*/

function capitalizeWords(text){

    return text.replace(/\b\w/g,function(letter){

        return letter.toUpperCase();

    });

}

/*=========================================
        AUTO CAPITALIZATION
=========================================*/

studentName.addEventListener("input",()=>{

    studentName.value =
    capitalizeWords(studentName.value);

    updatePreview();

});

fatherName.addEventListener("input",()=>{

    fatherName.value =
    capitalizeWords(fatherName.value);

    updatePreview();

});

/*=========================================
        INPUT LISTENERS
=========================================*/

issueDate.addEventListener(

"change",

updatePreview

);

studentClass.addEventListener(

"change",

updatePreview

);

section.addEventListener(

"change",

updatePreview

);

session.addEventListener(

"input",

updatePreview

);

achievementTitle.addEventListener(

"input",

updatePreview

);

achievementDescription.addEventListener(

"input",

updatePreview

);

/*=========================================
        LIVE PREVIEW BUTTON
=========================================*/

previewBtn.addEventListener(

"click",

function(){

    updatePreview();

}

);

/*=========================================
        RESET FORM
=========================================*/

resetBtn.addEventListener(

"click",

function(){

    setTimeout(()=>{

        setTodayDate();

        achievementTitle.value =
        DEFAULT_ACHIEVEMENT;

        achievementDescription.value =
        DEFAULT_DESCRIPTION;

        generateCertificateNumber();

        updatePreview();

    },50);

});

/*=========================================
        INITIAL PREVIEW
=========================================*/

window.addEventListener(

"load",

()=>{

    updatePreview();

});/*=========================================
        FORM VALIDATION
=========================================*/

function validateForm(){

    if(studentName.value.trim()===""){

        alert("Please enter Student Name.");

        studentName.focus();

        return false;

    }

    if(fatherName.value.trim()===""){

        alert("Please enter Father's Name.");

        fatherName.focus();

        return false;

    }

    if(session.value.trim()===""){

        alert("Please enter Academic Session.");

        session.focus();

        return false;

    }

    return true;

}

/*=========================================
        PRINT CERTIFICATE
=========================================*/

printBtn.addEventListener("click",()=>{

    if(!validateForm()) return;

    updatePreview();

    setTimeout(()=>{

        window.print();

        saveCertificateNumber();

        generateCertificateNumber();

        updatePreview();

    },300);

});

/*=========================================
        WHATSAPP SHARE
=========================================*/

whatsappBtn.addEventListener("click",()=>{

    if(!validateForm()) return;

    updatePreview();

    const message =

`🏆 ST. JOSEPH'S SCHOOL

ACADEMIC EXCELLENCE CERTIFICATE

Certificate No : ${certificateNo.value}

Student : ${studentName.value}

Father : ${fatherName.value}

Class : ${studentClass.value}

Section : ${section.value}

Session : ${session.value}

Achievement :
${achievementTitle.value}

Issued On :
${formatDate(issueDate.value)}`;

    const url =
    "https://wa.me/?text=" +
    encodeURIComponent(message);

    window.open(
        url,
        "_blank"
    );

});

/*=========================================
        ENTER KEY
=========================================*/

certificateForm.addEventListener(

"keydown",

function(e){

    if(e.key==="Enter"){

        e.preventDefault();

    }

});

/*=========================================
        AUTO PREVIEW
=========================================*/

certificateForm
.querySelectorAll(

"input,textarea,select"

)

.forEach(function(field){

    field.addEventListener(

        "input",

        updatePreview

    );

    field.addEventListener(

        "change",

        updatePreview

    );

});

/*=========================================
        PAGE LOAD
=========================================*/

window.addEventListener(

"load",

()=>{

    updatePreview();

});/*=========================================
        NEW CERTIFICATE
=========================================*/

function newCertificate(){

    certificateForm.reset();

    setTodayDate();

    generateCertificateNumber();

    achievementTitle.value =
    DEFAULT_ACHIEVEMENT;

    achievementDescription.value =
    DEFAULT_DESCRIPTION;

    previewStudentName.textContent =
    "Student Name";

    previewFatherName.textContent =
    "Father's Name";

    previewClass.textContent =
    studentClass.value;

    previewSection.textContent =
    section.value;

    previewSession.textContent =
    "2026-2027";

    previewAchievementTitle.textContent =
    DEFAULT_ACHIEVEMENT;

    previewAchievementDescription.textContent =
    DEFAULT_DESCRIPTION;

    updatePreview();

}

/*=========================================
        RESET BUTTON
=========================================*/

resetBtn.addEventListener(

"click",

function(){

    setTimeout(

        newCertificate,

        100

    );

});

/*=========================================
        SAVE BEFORE EXIT
=========================================*/

window.addEventListener(

"beforeunload",

function(){

    localStorage.setItem(

        "SJS_LAST_SESSION",

        session.value

    );

});

/*=========================================
        RESTORE SESSION
=========================================*/

window.addEventListener(

"DOMContentLoaded",

function(){

    const lastSession =

    localStorage.getItem(

        "SJS_LAST_SESSION"

    );

    if(lastSession){

        session.value =

        lastSession;

    }

    updatePreview();

});

/*=========================================
        AUTO TRIM
=========================================*/

function cleanSpaces(input){

    input.value =

    input.value

    .replace(/\s+/g," ")

    .trimStart();

}

[

studentName,

fatherName,

session,

achievementTitle,

achievementDescription

].forEach(function(field){

    field.addEventListener(

        "input",

        function(){

            cleanSpaces(field);

        }

    );

});

/*=========================================
        KEYBOARD SHORTCUTS
=========================================*/

document.addEventListener(

"keydown",

function(e){

    /* Ctrl + P */

    if(e.ctrlKey && e.key==="p"){

        e.preventDefault();

        printBtn.click();

    }

    /* Ctrl + R */

    if(e.ctrlKey && e.key==="r"){

        e.preventDefault();

        resetBtn.click();

    }

});

/*=========================================
        INITIAL START
=========================================*/

(function(){

    setTodayDate();

    generateCertificateNumber();

    updatePreview();

})();

/*=========================================
        END OF FILE
=========================================*/