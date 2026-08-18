//==================================================
// EXPERIENCE CERTIFICATE GENERATOR
// P1 - ELEMENTS & LIVE PREVIEW
//==================================================

//======================================
// FORM ELEMENTS
//======================================

const certificateForm = document.getElementById("certificateForm");

const certificateNo = document.getElementById("certificateNo");
const issueDate = document.getElementById("issueDate");
const employeeName = document.getElementById("employeeName");
const designation = document.getElementById("designation");
const department = document.getElementById("department");
const joiningDate = document.getElementById("joiningDate");
const relievingDate = document.getElementById("relievingDate");
const remarks = document.getElementById("remarks");

//======================================
// BUTTONS
//======================================

const previewBtn = document.getElementById("previewBtn");
const printBtn = document.getElementById("printBtn");
const whatsappBtn = document.getElementById("whatsappBtn");

//======================================
// CERTIFICATE
//======================================

const certificate = document.getElementById("certificate");

//======================================
// PREVIEW ELEMENTS
//======================================

const previewCertificateNo =
document.getElementById("previewCertificateNo");

const previewIssueDate =
document.getElementById("previewIssueDate");

const previewEmployeeName =
document.getElementById("previewEmployeeName");

const previewDesignation =
document.getElementById("previewDesignation");

const previewDepartment =
document.getElementById("previewDepartment");

const previewJoiningDate =
document.getElementById("previewJoiningDate");

const previewRelievingDate =
document.getElementById("previewRelievingDate");

const previewRemarks =
document.getElementById("previewRemarks");

//======================================
// DATE FORMAT FUNCTION
//======================================

function formatDate(dateValue){

    if(!dateValue){

        return "";

    }

    const options={

        day:"2-digit",
        month:"long",
        year:"numeric"

    };

    return new Date(dateValue).toLocaleDateString(
        "en-GB",
        options
    );

}

//======================================
// UPDATE PREVIEW
//======================================

function updatePreview(){

    previewCertificateNo.textContent =
    certificateNo.value.trim() || "SJS-EXP-0001";

    previewIssueDate.textContent =
    formatDate(issueDate.value);

    previewEmployeeName.textContent =
    employeeName.value.trim() || "Employee Name";

    previewDesignation.textContent =
    designation.value || "Teacher";

    previewDepartment.textContent =
    department.value || "Primary Wing";

    previewJoiningDate.textContent =
    formatDate(joiningDate.value) || "01 April 2024";

    previewRelievingDate.textContent =
    formatDate(relievingDate.value) || "31 March 2026";

    previewRemarks.innerHTML =
    remarks.value.replace(/\n/g,"<br>");

}//==================================================
// P2 - EVENTS & DEFAULT VALUES
//==================================================

//======================================
// SET TODAY DATE
//======================================

window.addEventListener("load",()=>{

    const today = new Date();

    const yyyy = today.getFullYear();

    const mm = String(today.getMonth()+1).padStart(2,"0");

    const dd = String(today.getDate()).padStart(2,"0");

    issueDate.value = `${yyyy}-${mm}-${dd}`;

    updatePreview();

});

//======================================
// LIVE INPUT EVENTS
//======================================

certificateNo.addEventListener("input",updatePreview);

issueDate.addEventListener("change",updatePreview);

employeeName.addEventListener("input",updatePreview);

designation.addEventListener("change",updatePreview);

department.addEventListener("change",updatePreview);

joiningDate.addEventListener("change",updatePreview);

relievingDate.addEventListener("change",updatePreview);

remarks.addEventListener("input",updatePreview);

//======================================
// PREVIEW BUTTON
//======================================

previewBtn.addEventListener("click",()=>{

    updatePreview();

});

//======================================
// PRINT BUTTON
//======================================

printBtn.addEventListener("click",()=>{

    updatePreview();

    window.print();

});

//======================================
// RESET FORM
//======================================

certificateForm.addEventListener("reset",()=>{

    setTimeout(()=>{

        const today = new Date();

        const yyyy = today.getFullYear();

        const mm = String(today.getMonth()+1).padStart(2,"0");

        const dd = String(today.getDate()).padStart(2,"0");

        issueDate.value = `${yyyy}-${mm}-${dd}`;

        updatePreview();

    },100);

});

//======================================
// PREVENT ENTER SUBMIT
//======================================

certificateForm.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

    }

});//==================================================
// P3 - WHATSAPP SHARE & INITIALIZATION
//==================================================

//======================================
// WHATSAPP SHARE
//======================================

whatsappBtn.addEventListener("click",()=>{

    updatePreview();

    html2canvas(certificate,{

        scale:3,
        useCORS:true,
        backgroundColor:"#ffffff"

    }).then(canvas=>{

        canvas.toBlob(blob=>{

            const file=new File(

                [blob],

                "Experience-Certificate.png",

                {

                    type:"image/png"

                }

            );

            if(

                navigator.canShare &&
                navigator.canShare({files:[file]})

            ){

                navigator.share({

                    title:"Experience Certificate",

                    text:"Experience Certificate",

                    files:[file]

                });

            }

            else{

                const link=document.createElement("a");

                link.href=canvas.toDataURL("image/png");

                link.download="Experience-Certificate.png";

                link.click();

            }

        });

    });

});

//======================================
// AUTO LIVE PREVIEW
//======================================

const allFields=document.querySelectorAll(

"#certificateForm input,#certificateForm textarea,#certificateForm select"

);

allFields.forEach(field=>{

    field.addEventListener("input",updatePreview);

    field.addEventListener("change",updatePreview);

});

//======================================
// INITIAL PREVIEW
//======================================

updatePreview();

//======================================
// AFTER PRINT
//======================================

window.onafterprint=function(){

    console.log("Experience Certificate Printed.");

};

//======================================
// READY
//======================================

console.log(

"Experience Certificate Generator Loaded Successfully."

);