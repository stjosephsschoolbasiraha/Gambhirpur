//==================================================
// CHARACTER CERTIFICATE GENERATOR
// ST. JOSEPH'S SCHOOL
// JAVASCRIPT
//==================================================


//==================================================
// FORM ELEMENTS
//==================================================

const certificateNo =
document.getElementById("certificateNo");

const issueDate =
document.getElementById("issueDate");

const session =
document.getElementById("session");

const purpose =
document.getElementById("purpose");

const studentName =
document.getElementById("studentName");

const fatherName =
document.getElementById("fatherName");

const motherName =
document.getElementById("motherName");

const studentClass =
document.getElementById("studentClass");

const section =
document.getElementById("section");

const dob =
document.getElementById("dob");

const character =
document.getElementById("character");

const remarks =
document.getElementById("remarks");


//==================================================
// BUTTONS
//==================================================

const previewBtn =
document.getElementById("previewBtn");

const printBtn =
document.getElementById("printBtn");

const whatsappBtn =
document.getElementById("whatsappBtn");

const resetBtn =
document.getElementById("resetBtn");


//==================================================
// CERTIFICATE
//==================================================

const certificate =
document.getElementById("certificate");


//==================================================
// PREVIEW ELEMENTS
//==================================================

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

const previewDOB =
document.getElementById("previewDOB");

const previewCharacter =
document.getElementById("previewCharacter");

const previewPurpose =
document.getElementById("previewPurpose");

const previewRemarks =
document.getElementById("previewRemarks");


//==================================================
// DATE FORMAT
//==================================================

function formatDate(dateValue){

    if(!dateValue){

        return "";

    }

    const date = new Date(dateValue + "T00:00:00");

    return date.toLocaleDateString(
        "en-GB",
        {
            day:"2-digit",
            month:"long",
            year:"numeric"
        }
    );

}


//==================================================
// TODAY DATE
//==================================================

function setTodayDate(){

    const today = new Date();

    const yyyy =
    today.getFullYear();

    const mm =
    String(today.getMonth()+1)
    .padStart(2,"0");

    const dd =
    String(today.getDate())
    .padStart(2,"0");

    issueDate.value =
    `${yyyy}-${mm}-${dd}`;

}


//==================================================
// UPDATE PREVIEW
//==================================================

function updatePreview(){

    previewCertificateNo.textContent =
    certificateNo.value.trim()
    || "SJS-CC-001";


    previewIssueDate.textContent =
    formatDate(issueDate.value)
    || "DD Month YYYY";


    previewStudentName.textContent =
    studentName.value.trim()
    || "__________________";


    previewFatherName.textContent =
    fatherName.value.trim()
    || "__________________";


    previewClass.textContent =
    studentClass.value
    || "______";


    previewSection.textContent =
    section.value.trim()
    || "______";


    previewDOB.textContent =
    formatDate(dob.value)
    || "__________________";


    previewCharacter.textContent =
    character.value
    || "VERY GOOD";


    previewPurpose.textContent =
    purpose.value
    || "Higher Education";


    if(remarks.value.trim()){

        previewRemarks.textContent =
        remarks.value.trim();

    }
    else{

        previewRemarks.textContent =
        "_______________________________";

    }

}


//==================================================
// LIVE INPUT
//==================================================

const allFields = [

    certificateNo,
    issueDate,
    session,
    purpose,
    studentName,
    fatherName,
    motherName,
    studentClass,
    section,
    dob,
    character,
    remarks

];


allFields.forEach(field=>{

    if(!field) return;

    field.addEventListener(
        "input",
        updatePreview
    );

    field.addEventListener(
        "change",
        updatePreview
    );

});


//==================================================
// PREVIEW BUTTON
//==================================================

previewBtn.addEventListener("click",()=>{

    updatePreview();

});


//==================================================
// PRINT BUTTON
//==================================================

printBtn.addEventListener("click",()=>{

    updatePreview();

    window.print();

});


//==================================================
// RESET BUTTON
//==================================================

resetBtn.addEventListener("click",()=>{

    certificateNo.value =
    "SJS-CC-001";

    session.value =
    "2026-2027";

    purpose.value =
    "Higher Education";

    studentName.value =
    "";

    fatherName.value =
    "";

    motherName.value =
    "";

    studentClass.value =
    "";

    section.value =
    "";

    dob.value =
    "";

    character.value =
    "Very Good";

    remarks.value =
    "";

    setTodayDate();

    updatePreview();

});


//==================================================
// WHATSAPP / DOCUMENT SHARE
//==================================================

whatsappBtn.addEventListener(
"click",
async()=>{

    updatePreview();


    //========================================
    // GENERATE A4 IMAGE
    //========================================

    try{

        const canvas =
        await html2canvas(
            certificate,
            {

                scale:4,

                useCORS:true,

                allowTaint:true,

                backgroundColor:"#ffffff",

                logging:false,

                width:certificate.scrollWidth,

                height:certificate.scrollHeight

            }
        );


        //====================================
        // CONVERT TO PNG
        //====================================

        canvas.toBlob(
        async(blob)=>{

            if(!blob){

                alert(
                    "Certificate image could not be generated."
                );

                return;

            }


            const file =
            new File(

                [blob],

                "Character-Certificate.png",

                {
                    type:"image/png"
                }

            );


            //================================
            // MOBILE / SUPPORTED SHARE
            //================================

            if(

                navigator.share &&

                navigator.canShare &&

                navigator.canShare({

                    files:[file]

                })

            ){

                try{

                    await navigator.share({

                        title:
                        "Character Certificate",

                        text:
                        "Character Certificate",

                        files:[file]

                    });

                }

                catch(error){

                    console.log(
                        "Share cancelled:",
                        error
                    );

                }

            }


            //================================
            // DESKTOP FALLBACK
            //================================

            else{

                const link =
                document.createElement("a");

                link.href =
                URL.createObjectURL(blob);

                link.download =
                "Character-Certificate.png";

                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);

                URL.revokeObjectURL(
                    link.href
                );

                alert(
                    "Character Certificate A4 image downloaded."
                );

            }

        },
        "image/png"
        );

    }

    catch(error){

        console.error(
            "Certificate generation error:",
            error
        );

        alert(
            "Unable to generate certificate."
        );

    }

});


//==================================================
// INITIALIZE
//==================================================

window.addEventListener(
"load",
()=>{

    setTodayDate();

    updatePreview();

});


//==================================================
// AFTER PRINT
//==================================================

window.addEventListener(
"afterprint",
()=>{

    console.log(
        "Character Certificate Printed Successfully."
    );

});


//==================================================
// PREVENT ENTER SUBMIT
//==================================================

document.addEventListener(
"keydown",
(event)=>{

    if(

        event.key === "Enter" &&

        event.target.tagName !== "TEXTAREA"

    ){

        event.preventDefault();

    }

});


//==================================================
// READY
//==================================================

console.log(
    "Character Certificate Generator Loaded Successfully."
);