//==================================================
// STUDENT WARNING LETTER GENERATOR
// ST. JOSEPH'S SCHOOL
// JAVASCRIPT
//==================================================


//==================================================
// FORM ELEMENTS
//==================================================

const warningNo =
document.getElementById("warningNo");

const issueDate =
document.getElementById("issueDate");

const session =
document.getElementById("session");

const warningLevel =
document.getElementById("warningLevel");

const studentName =
document.getElementById("studentName");

const admissionNo =
document.getElementById("admissionNo");

const studentClass =
document.getElementById("studentClass");

const section =
document.getElementById("section");

const parentName =
document.getElementById("parentName");

const incidentDate =
document.getElementById("incidentDate");

const reason =
document.getElementById("reason");

const incidentDescription =
document.getElementById("incidentDescription");

const improvement =
document.getElementById("improvement");

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
// A4 DOCUMENT
//==================================================

const warningLetter =
document.getElementById("warningLetter");


//==================================================
// PREVIEW ELEMENTS
//==================================================

const previewWarningNo =
document.getElementById("previewWarningNo");

const previewIssueDate =
document.getElementById("previewIssueDate");

const previewWarningLevel =
document.getElementById("previewWarningLevel");

const previewStudentName =
document.getElementById("previewStudentName");

const previewParentName =
document.getElementById("previewParentName");

const previewClass =
document.getElementById("previewClass");

const previewSection =
document.getElementById("previewSection");

const previewAdmissionNo =
document.getElementById("previewAdmissionNo");

const previewIncidentDate =
document.getElementById("previewIncidentDate");

const previewReason =
document.getElementById("previewReason");

const previewDescription =
document.getElementById("previewDescription");

const previewImprovement =
document.getElementById("previewImprovement");

const previewRemarks =
document.getElementById("previewRemarks");


//==================================================
// DATE FORMATTER
//==================================================

function formatDate(dateValue){

    if(!dateValue){

        return "";

    }

    const date =
    new Date(dateValue + "T00:00:00");

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
// SET TODAY
//==================================================

function setTodayDate(){

    const today =
    new Date();

    const yyyy =
    today.getFullYear();

    const mm =
    String(
        today.getMonth() + 1
    ).padStart(2,"0");

    const dd =
    String(
        today.getDate()
    ).padStart(2,"0");

    issueDate.value =
    `${yyyy}-${mm}-${dd}`;

}


//==================================================
// UPDATE PREVIEW
//==================================================

function updatePreview(){


    //==============================================
    // WARNING NUMBER
    //==============================================

    previewWarningNo.textContent =

        warningNo.value.trim()
        || "SJS-WL-001";


    //==============================================
    // ISSUE DATE
    //==============================================

    previewIssueDate.textContent =

        formatDate(issueDate.value)
        || "DD Month YYYY";


    //==============================================
    // WARNING LEVEL
    //==============================================

    previewWarningLevel.textContent =

        (
            warningLevel.value
            || "First Warning"
        ).toUpperCase();


    //==============================================
    // STUDENT
    //==============================================

    previewStudentName.textContent =

        studentName.value.trim()
        || "______________________";


    //==============================================
    // PARENT
    //==============================================

    previewParentName.textContent =

        parentName.value.trim()
        || "______________________";


    //==============================================
    // CLASS
    //==============================================

    previewClass.textContent =

        studentClass.value
        || "______";


    //==============================================
    // SECTION
    //==============================================

    previewSection.textContent =

        section.value.trim()
        || "______";


    //==============================================
    // ADMISSION NUMBER
    //==============================================

    previewAdmissionNo.textContent =

        admissionNo.value.trim()
        || "__________";


    //==============================================
    // INCIDENT DATE
    //==============================================

    previewIncidentDate.textContent =

        formatDate(incidentDate.value)
        || "__________________";


    //==============================================
    // REASON
    //==============================================

    previewReason.textContent =

        reason.value
        || "__________________";


    //==============================================
    // DESCRIPTION
    //==============================================

    if(
        incidentDescription.value.trim()
    ){

        previewDescription.innerHTML =

            escapeHTML(
                incidentDescription.value.trim()
            ).replace(/\n/g,"<br>");

    }

    else{

        previewDescription.textContent =

            "The details of the incident will appear here.";

    }


    //==============================================
    // IMPROVEMENT
    //==============================================

    if(
        improvement.value.trim()
    ){

        previewImprovement.innerHTML =

            escapeHTML(
                improvement.value.trim()
            ).replace(/\n/g,"<br>");

    }

    else{

        previewImprovement.textContent =

            "The required improvement will appear here.";

    }


    //==============================================
    // REMARKS
    //==============================================

    if(
        remarks.value.trim()
    ){

        previewRemarks.innerHTML =

            escapeHTML(
                remarks.value.trim()
            ).replace(/\n/g,"<br>");

    }

    else{

        previewRemarks.textContent =

            "No additional remarks.";

    }

}


//==================================================
// SAFE HTML
//==================================================

function escapeHTML(text){

    const div =
    document.createElement("div");

    div.textContent =
    text;

    return div.innerHTML;

}


//==================================================
// ALL FORM FIELDS
//==================================================

const allFields = [

    warningNo,
    issueDate,
    session,
    warningLevel,
    studentName,
    admissionNo,
    studentClass,
    section,
    parentName,
    incidentDate,
    reason,
    incidentDescription,
    improvement,
    remarks

];


//==================================================
// LIVE PREVIEW
//==================================================

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

previewBtn.addEventListener(
    "click",
    ()=>{

        updatePreview();

    }
);


//==================================================
// PRINT BUTTON
//==================================================

printBtn.addEventListener(
    "click",
    ()=>{

        updatePreview();

        window.print();

    }
);


//==================================================
// RESET
//==================================================

resetBtn.addEventListener(
    "click",
    ()=>{

        warningNo.value =
        "SJS-WL-001";

        session.value =
        "2026-2027";

        warningLevel.value =
        "First Warning";

        studentName.value =
        "";

        admissionNo.value =
        "";

        studentClass.value =
        "";

        section.value =
        "";

        parentName.value =
        "";

        incidentDate.value =
        "";

        reason.value =
        "";

        incidentDescription.value =
        "";

        improvement.value =
        "";

        remarks.value =
        "";

        setTodayDate();

        updatePreview();

    }
);


//==================================================
// WHATSAPP / FILE SHARE
//==================================================

whatsappBtn.addEventListener(
    "click",
    async()=>{

        updatePreview();


        //==========================================
        // CHECK HTML2CANVAS
        //==========================================

        if(
            typeof html2canvas === "undefined"
        ){

            alert(
                "Document sharing library is not loaded."
            );

            return;

        }


        try{


            //======================================
            // CREATE A4 IMAGE
            //======================================

            const canvas =
            await html2canvas(
                warningLetter,
                {

                    scale:4,

                    useCORS:true,

                    allowTaint:true,

                    backgroundColor:"#ffffff",

                    logging:false,

                    width:
                        warningLetter.scrollWidth,

                    height:
                        warningLetter.scrollHeight

                }
            );


            //======================================
            // CREATE PNG
            //======================================

            canvas.toBlob(
            async(blob)=>{

                if(!blob){

                    alert(
                        "Warning letter could not be generated."
                    );

                    return;

                }


                const file =
                new File(

                    [blob],

                    "Student-Warning-Letter.png",

                    {
                        type:"image/png"
                    }

                );


                //==================================
                // NATIVE SHARE
                //==================================

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
                            "Student Warning Letter",

                            text:
                            "Student Warning Letter",

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


                //==================================
                // DESKTOP FALLBACK
                //==================================

                else{

                    const url =
                    URL.createObjectURL(blob);

                    const link =
                    document.createElement("a");

                    link.href =
                    url;

                    link.download =
                    "Student-Warning-Letter.png";

                    document.body.appendChild(link);

                    link.click();

                    document.body.removeChild(link);

                    setTimeout(
                        ()=>{
                            URL.revokeObjectURL(url);
                        },
                        1000
                    );


                    alert(
                        "Complete A4 warning letter downloaded."
                    );

                }

            },

            "image/png"

            );

        }

        catch(error){

            console.error(
                "Warning letter generation error:",
                error
            );

            alert(
                "Unable to generate warning letter."
            );

        }

    }
);


//==================================================
// INITIAL LOAD
//==================================================

window.addEventListener(
    "load",
    ()=>{

        setTodayDate();

        updatePreview();

    }
);


//==================================================
// AFTER PRINT
//==================================================

window.addEventListener(
    "afterprint",
    ()=>{

        console.log(
            "Student Warning Letter Printed Successfully."
        );

    }
);


//==================================================
// PREVENT ACCIDENTAL ENTER SUBMIT
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

    }
);


//==================================================
// READY
//==================================================

console.log(
    "Student Warning Letter Generator Loaded Successfully."
);