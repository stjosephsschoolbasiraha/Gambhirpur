/*=========================================
      Teacher Appreciation Certificate
                JS PART 1
=========================================*/

/*=========================================
        GET ALL ELEMENTS
=========================================*/

const certificateForm = document.getElementById("certificateForm");

const certificateNo = document.getElementById("certificateNo");

const issueDate = document.getElementById("issueDate");

const teacherName = document.getElementById("teacherName");

const designation = document.getElementById("designation");

const department = document.getElementById("department");

const awardCategory = document.getElementById("awardCategory");

const message = document.getElementById("message");

const previewCertificateNo =
document.getElementById("previewCertificateNo");

const previewIssueDate =
document.getElementById("previewIssueDate");

const previewTeacherName =
document.getElementById("previewTeacherName");

const previewDesignation =
document.getElementById("previewDesignation");

const previewDepartment =
document.getElementById("previewDepartment");

const previewAwardCategory =
document.getElementById("previewAwardCategory");

const previewMessage =
document.getElementById("previewMessage");

const previewBtn =
document.getElementById("previewBtn");

const printBtn =
document.getElementById("printBtn");

const whatsappBtn =
document.getElementById("whatsappBtn");

/*=========================================
        FORMAT DATE
=========================================*/

function formatDate(dateValue){

if(!dateValue){

return "";

}

const date = new Date(dateValue);

return date.toLocaleDateString("en-IN",{

day:"2-digit",

month:"long",

year:"numeric"

});

}

/*=========================================
        LIVE PREVIEW
=========================================*/

function updatePreview(){

previewCertificateNo.textContent =
certificateNo.value || "APP-2026-001";

previewIssueDate.textContent =
formatDate(issueDate.value) || "26 July 2026";

previewTeacherName.textContent =
teacherName.value || "Teacher Name";

previewDesignation.textContent =
designation.value || "Teacher";

previewDepartment.textContent =
department.value || "Primary Wing";

previewAwardCategory.textContent =
awardCategory.value || "BEST TEACHER AWARD";

previewMessage.textContent =
message.value ||
"In recognition of your outstanding dedication, professional excellence and valuable contribution towards quality education at ST. JOSEPH'S SCHOOL.";

}/*=========================================
      Teacher Appreciation Certificate
                JS PART 2
=========================================*/

/*=========================================
        DEFAULT VALUES
=========================================*/

window.addEventListener("DOMContentLoaded",()=>{

const today = new Date();

issueDate.value = today.toISOString().split("T")[0];

certificateNo.value = "APP-2026-001";

designation.value = "Teacher";

department.value = "Primary Wing";

awardCategory.value = "Best Teacher Award";

updatePreview();

});

/*=========================================
        LIVE INPUT EVENTS
=========================================*/

certificateNo.addEventListener("input",updatePreview);

issueDate.addEventListener("change",updatePreview);

teacherName.addEventListener("input",updatePreview);

designation.addEventListener("change",updatePreview);

department.addEventListener("change",updatePreview);

awardCategory.addEventListener("change",updatePreview);

message.addEventListener("input",updatePreview);

/*=========================================
        PREVIEW BUTTON
=========================================*/

previewBtn.addEventListener("click",()=>{

updatePreview();

alert("Preview Updated Successfully.");

});

/*=========================================
            PRINT
=========================================*/

printBtn.addEventListener("click",()=>{

updatePreview();

setTimeout(()=>{

window.print();

},300);

});

/*=========================================
        RESET FORM
=========================================*/

certificateForm.addEventListener("reset",()=>{

setTimeout(()=>{

certificateNo.value="APP-2026-001";

const today=new Date();

issueDate.value=today.toISOString().split("T")[0];

designation.value="Teacher";

department.value="Primary Wing";

awardCategory.value="Best Teacher Award";

updatePreview();

},100);

});/*==========================================
        BUTTON EVENTS
==========================================*/

previewBtn.addEventListener("click",function(){

updatePreview();

});

printBtn.addEventListener("click",function(){

updatePreview();

window.print();

});

certificateForm.addEventListener("reset",function(){

setTimeout(function(){

previewCertificateNo.textContent="APP-2026-001";

previewTeacherName.textContent="Teacher Name";

previewDesignation.textContent="Teacher";

previewDepartment.textContent="Primary Wing";

previewAwardCategory.textContent="BEST TEACHER AWARD";

previewMessage.textContent=
"In recognition of your outstanding dedication, professional excellence and valuable contribution towards quality education at ST. JOSEPH'S SCHOOL.";

setDefaultDate();

},100);

});


/*==========================================
        DEFAULT DATE
==========================================*/

function setDefaultDate(){

const today=new Date();

const yyyy=today.getFullYear();

const mm=String(today.getMonth()+1).padStart(2,"0");

const dd=String(today.getDate()).padStart(2,"0");

const formatted=`${yyyy}-${mm}-${dd}`;

issueDate.value=formatted;

previewIssueDate.textContent=formatDate(formatted);

}

setDefaultDate();


/*==========================================
        LIVE INPUT EVENTS
==========================================*/

certificateNo.addEventListener("input",updatePreview);

issueDate.addEventListener("change",updatePreview);

teacherName.addEventListener("input",updatePreview);

designation.addEventListener("change",updatePreview);

department.addEventListener("change",updatePreview);

awardCategory.addEventListener("change",updatePreview);

message.addEventListener("input",updatePreview);


/*==========================================
        INITIAL PREVIEW
==========================================*/

updatePreview();


/*==========================================
        AFTER PRINT
==========================================*/

window.onafterprint=function(){

updatePreview();

};


/*==========================================
        END OF FILE
==========================================*/