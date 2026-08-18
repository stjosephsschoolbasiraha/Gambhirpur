/*=========================================
        MERIT CERTIFICATE
=========================================*/

const certificateNo = document.getElementById("certificateNo");
const issueDate = document.getElementById("issueDate");
const studentName = document.getElementById("studentName");
const studentClass = document.getElementById("studentClass");
const section = document.getElementById("section");
const academicSession = document.getElementById("academicSession");
const examination = document.getElementById("examination");
const percentage = document.getElementById("percentage");
const grade = document.getElementById("grade");
const position = document.getElementById("position");
const message = document.getElementById("message");

/*=========================================
        PREVIEW ELEMENTS
=========================================*/

const previewCertificateNo =
document.getElementById("previewCertificateNo");

const previewIssueDate =
document.getElementById("previewIssueDate");

const previewStudentName =
document.getElementById("previewStudentName");

const previewStudentName2 =
document.getElementById("previewStudentName2");

const previewStudentClass =
document.getElementById("previewStudentClass");

const previewSection =
document.getElementById("previewSection");

const previewAcademicSession =
document.getElementById("previewAcademicSession");

const previewExamination =
document.getElementById("previewExamination");

const previewPercentage =
document.getElementById("previewPercentage");

const previewGrade =
document.getElementById("previewGrade");

const previewPosition =
document.getElementById("previewPosition");

const previewMessage =
document.getElementById("previewMessage");

/*=========================================
      ACHIEVEMENT BOXES
=========================================*/

const previewPercentageBox =
document.getElementById("previewPercentageBox");

const previewGradeBox =
document.getElementById("previewGradeBox");

const previewPositionBox =
document.getElementById("previewPositionBox");

/*=========================================
      DATE FORMAT FUNCTION
=========================================*/

function formatDate(dateString){

    if(!dateString) return "";

    const options = {

        day:"2-digit",

        month:"long",

        year:"numeric"

    };

    return new Date(dateString).toLocaleDateString("en-GB",options);

}

/*=========================================
        UPDATE PREVIEW
=========================================*/

function updatePreview(){

    previewCertificateNo.textContent =
    certificateNo.value || "MER-2026-001";

    previewIssueDate.textContent =
    issueDate.value ? formatDate(issueDate.value) : "30 July 2026";

    previewStudentName.textContent =
    studentName.value || "Student Name";

    previewStudentName2.textContent =
    studentName.value || "Student Name";

    previewStudentClass.textContent =
    studentClass.value || "X";

    previewSection.textContent =
    section.value || "A";

    previewAcademicSession.textContent =
    academicSession.value || "2026-2027";

    previewExamination.textContent =
    examination.value || "Annual Examination";

    previewPercentage.textContent =
    percentage.value || "95";

    previewGrade.textContent =
    grade.value || "A1";

    previewPosition.textContent =
    position.value || "First Position";

    previewMessage.innerHTML =
    message.value;

   

}/*=========================================
        LIVE PREVIEW
=========================================*/

updatePreview();

const inputs = document.querySelectorAll(

    "#certificateForm input, #certificateForm select, #certificateForm textarea"

);

inputs.forEach(input=>{

    input.addEventListener("input",updatePreview);

    input.addEventListener("change",updatePreview);

});

/*=========================================
          PREVIEW BUTTON
=========================================*/

document
.getElementById("previewBtn")
.addEventListener("click",()=>{

    updatePreview();

});

/*=========================================
            PRINT
=========================================*/

document
.getElementById("printBtn")
.addEventListener("click",()=>{

    updatePreview();

    window.print();

});

/*=========================================
          RESET FORM
=========================================*/

document
.querySelector(".btn-reset")
.addEventListener("click",()=>{

    setTimeout(()=>{

        updatePreview();

    },100);

});

/*=========================================
      WHATSAPP SHARE
=========================================*/

document
.getElementById("whatsappBtn")
.addEventListener("click",async()=>{

    updatePreview();

    const certificate =
    document.getElementById("certificate");

    const canvas =
    await html2canvas(certificate,{

        scale:3,

        useCORS:true,

        backgroundColor:"#ffffff"

    });

    canvas.toBlob(async(blob)=>{

        const file = new File(

            [blob],

            "Merit-Certificate.png",

            {

                type:"image/png"

            }

        );

        if(

            navigator.canShare &&

            navigator.canShare({

                files:[file]

            })

        ){

            try{

                await navigator.share({

                    title:"Merit Certificate",

                    text:"Merit Certificate - ST. JOSEPH'S SCHOOL",

                    files:[file]

                });

            }

            catch(error){

                console.log(error);

            }

        }

        else{

            alert(

                "Your browser does not support direct WhatsApp sharing."

            );

        }

    });

});/*=========================================
        AUTO DATE
=========================================*/

window.addEventListener("DOMContentLoaded",()=>{

    if(!issueDate.value){

        const today = new Date();

        issueDate.value = today.toISOString().split("T")[0];

    }

    updatePreview();

});

/*=========================================
      ENTER KEY SUPPORT
=========================================*/

document
.getElementById("certificateForm")
.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        updatePreview();

    }

});

/*=========================================
      AUTO UPPERCASE NAME
=========================================*/

studentName.addEventListener("input",()=>{

    studentName.value = studentName.value
    .toLowerCase()
    .replace(/\b\w/g,letter=>letter.toUpperCase());

    updatePreview();

});

/*=========================================
      PERCENTAGE VALIDATION
=========================================*/

percentage.addEventListener("input",()=>{

    let value = parseFloat(percentage.value);

    if(value>100){

        percentage.value = 100;

    }

    if(value<0){

        percentage.value = 0;

    }

    updatePreview();

});

/*=========================================
      DEFAULT CERTIFICATE NUMBER
=========================================*/

if(certificateNo.value===""){

    certificateNo.value = "MER-2026-001";

}

/*=========================================
      DEFAULT SESSION
=========================================*/

if(academicSession.value===""){

    academicSession.value = "2026-2027";

}

/*=========================================
      INITIAL PREVIEW
=========================================*/

updatePreview();

/*=========================================
              END
=========================================*/