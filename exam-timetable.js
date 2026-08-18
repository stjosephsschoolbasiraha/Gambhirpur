//==================================================
// ST. JOSEPH'S SCHOOL
// EXAM TIME TABLE GENERATOR
// JS - P1
//==================================================


//==================================================
// FORM ELEMENTS
//==================================================

const examName =
document.getElementById("examName");

const academicSession =
document.getElementById("academicSession");

const studentClass =
document.getElementById("studentClass");

const section =
document.getElementById("section");

const startDate =
document.getElementById("startDate");

const endDate =
document.getElementById("endDate");

const startTime =
document.getElementById("startTime");

const endTime =
document.getElementById("endTime");

const instructions =
document.getElementById("instructions");

const examIncharge =
document.getElementById("examIncharge");

const principalName =
document.getElementById("principalName");


//==================================================
// BUTTONS
//==================================================

const addSubjectBtn =
document.getElementById("addSubjectBtn");

const previewBtn =
document.getElementById("previewBtn");

const printBtn =
document.getElementById("printBtn");

const pdfBtn =
document.getElementById("pdfBtn");

const whatsappBtn =
document.getElementById("whatsappBtn");

const resetBtn =
document.getElementById("resetBtn");


//==================================================
// SUBJECT CONTAINER
//==================================================

const subjectRows =
document.getElementById("subjectRows");


//==================================================
// PREVIEW ELEMENTS
//==================================================

const previewExamName =
document.getElementById("previewExamName");

const previewSession =
document.getElementById("previewSession");

const previewClass =
document.getElementById("previewClass");

const previewSection =
document.getElementById("previewSection");

const previewExamPeriod =
document.getElementById("previewExamPeriod");

const previewTableBody =
document.getElementById("previewTableBody");

const previewInstructions =
document.getElementById("previewInstructions");

const previewExamIncharge =
document.getElementById("previewExamIncharge");

const previewPrincipal =
document.getElementById("previewPrincipal");


//==================================================
// EXAM NAME POPUP
//==================================================

const examNameBtn =
document.getElementById("examNameBtn");

const examNamePopup =
document.getElementById("examNamePopup");

const examOptions =
document.querySelectorAll(".exam-option");


//==================================================
// EXAM NAME POPUP - OPEN / CLOSE
//==================================================

if(examNameBtn && examNamePopup){

    examNameBtn.addEventListener("click",(e)=>{

        e.stopPropagation();

        examNamePopup.classList.toggle("show");

    });

}


//==================================================
// SELECT EXAM NAME
//==================================================

examOptions.forEach(option=>{

    option.addEventListener("click",()=>{

        examName.value =
        option.dataset.value;

        examNamePopup.classList.remove("show");

        updatePreview();

    });

});


//==================================================
// CLOSE POPUP OUTSIDE
//==================================================

document.addEventListener("click",(e)=>{

    if(

        examNamePopup &&

        !examNamePopup.contains(e.target) &&

        e.target !== examNameBtn

    ){

        examNamePopup.classList.remove("show");

    }

});


//==================================================
// DATE FORMAT
//==================================================

function formatDate(dateValue){

    if(!dateValue){

        return "__________";

    }

    const date =
    new Date(dateValue + "T00:00:00");

    return date.toLocaleDateString(
        "en-GB",
        {
            day:"2-digit",
            month:"short",
            year:"numeric"
        }
    );

}


//==================================================
// DAY FORMAT
//==================================================

function getDay(dateValue){

    if(!dateValue){

        return "—";

    }

    const date =
    new Date(dateValue + "T00:00:00");

    return date.toLocaleDateString(
        "en-GB",
        {
            weekday:"long"
        }
    );

}


//==================================================
// TIME FORMAT
//==================================================

function formatTime(timeValue){

    if(!timeValue){

        return "—";

    }

    const parts =
    timeValue.split(":");

    let hour =
    parseInt(parts[0]);

    const minute =
    parts[1];

    const period =
    hour >= 12 ? "PM" : "AM";

    hour =
    hour % 12 || 12;

    return `${String(hour).padStart(2,"0")}:${minute} ${period}`;

}


//==================================================
// EXAM PERIOD
//==================================================

function updateExamPeriod(){

    const start =
    formatDate(startDate.value);

    const end =
    formatDate(endDate.value);

    if(

        startDate.value &&
        endDate.value

    ){

        previewExamPeriod.textContent =
        `${start} – ${end}`;

    }

    else if(startDate.value){

        previewExamPeriod.textContent =
        start;

    }

    else{

        previewExamPeriod.textContent =
        "__________";

    }

}


//==================================================
// CREATE SUBJECT ROW
//==================================================

function createSubjectRow(){

    const row =
    document.createElement("div");

    row.className =
    "subject-row";


    row.innerHTML = `

        <div class="form-group">

            <label>
                Date
            </label>

            <input
            type="date"
            class="subject-date">

        </div>


        <div class="form-group">

            <label>
                Subject
            </label>

            <input
            type="text"
            class="subject-name"
            placeholder="Physics">

        </div>


        <div class="form-row">


            <div class="form-group">

                <label>
                    Start
                </label>

                <input
                type="time"
                class="subject-start"
                value="08:00">

            </div>


            <div class="form-group">

                <label>
                    End
                </label>

                <input
                type="time"
                class="subject-end"
                value="11:00">

            </div>


        </div>


        <button
        type="button"
        class="remove-subject"
        title="Remove Subject">

            <i class="fa-solid fa-trash"></i>

        </button>

    `;


    subjectRows.appendChild(row);


    attachRowEvents(row);


    updatePreview();

}


//==================================================
// ATTACH SUBJECT ROW EVENTS
//==================================================

function attachRowEvents(row){

    const fields =
    row.querySelectorAll(
        "input"
    );


    fields.forEach(field=>{

        field.addEventListener(
            "input",
            updatePreview
        );

        field.addEventListener(
            "change",
            updatePreview
        );

    });


    const removeBtn =
    row.querySelector(
        ".remove-subject"
    );


    removeBtn.addEventListener(
        "click",
        ()=>{

            row.remove();

            updatePreview();

        }
    );

}


//==================================================
// ADD SUBJECT
//==================================================

addSubjectBtn.addEventListener(
    "click",
    ()=>{

        createSubjectRow();

    }
);


//==================================================
// GET SUBJECT DATA
//==================================================

function getSubjectData(){

    const rows =
    document.querySelectorAll(
        ".subject-row"
    );


    const subjects = [];


    rows.forEach(row=>{

        const date =
        row.querySelector(
            ".subject-date"
        ).value;

        const subject =
        row.querySelector(
            ".subject-name"
        ).value.trim();

        const start =
        row.querySelector(
            ".subject-start"
        ).value;

        const end =
        row.querySelector(
            ".subject-end"
        ).value;


        if(

            date ||
            subject ||
            start ||
            end

        ){

            subjects.push({

                date:date,

                subject:
                subject || "Subject",

                start:start,

                end:end

            });

        }

    });


    return subjects;

}


//==================================================
// UPDATE TIMETABLE
//==================================================

function updateTimetable(){

    const subjects =
    getSubjectData();


    previewTableBody.innerHTML = "";


    if(subjects.length === 0){

        const row =
        document.createElement("tr");


        row.innerHTML = `

            <td>1</td>

            <td>—</td>

            <td>—</td>

            <td class="subject-preview">
                Subject
            </td>

            <td>
                —
            </td>

        `;


        previewTableBody.appendChild(row);

        return;

    }


    subjects.forEach(
        (item,index)=>{

            const row =
            document.createElement("tr");


            const time =

                item.start &&
                item.end

                ?

                `${formatTime(item.start)}
                – ${formatTime(item.end)}`

                :

                "—";


            row.innerHTML = `

                <td>
                    ${index + 1}
                </td>

                <td>
                    ${formatDate(item.date)}
                </td>

                <td>
                    ${getDay(item.date)}
                </td>

                <td class="subject-preview">
                    ${escapeHTML(item.subject)}
                </td>

                <td>
                    ${time}
                </td>

            `;


            previewTableBody.appendChild(row);

        }
    );

}


//==================================================
// ESCAPE HTML
//==================================================

function escapeHTML(text){

    const div =
    document.createElement("div");

    div.textContent =
    text;

    return div.innerHTML;

}


//==================================================
// UPDATE INSTRUCTIONS
//==================================================

function updateInstructions(){

    const text =
    instructions.value.trim();


    if(!text){

        previewInstructions.innerHTML = `

            <p>
                No special instructions.
            </p>

        `;

        return;

    }


    const lines =
    text.split("\n");


    previewInstructions.innerHTML =
    lines
    .filter(line=>line.trim())
    .map(line=>{

        return `<p>
            ${escapeHTML(line)}
        </p>`;

    })
    .join("");

}


//==================================================
// UPDATE PREVIEW
//==================================================

function updatePreview(){


    // EXAM NAME

    previewExamName.textContent =

        examName.value.trim()

        ?

        examName.value.trim().toUpperCase()

        :

        "ANNUAL EXAMINATION";


    // SESSION

    previewSession.textContent =

        academicSession.value.trim()

        ||

        "2026-2027";


    // CLASS

    previewClass.textContent =

        studentClass.value

        ||

        "All Classes";


    // SECTION

    previewSection.textContent =

        section.value.trim()

        ||

        "All";


    // PERIOD

    updateExamPeriod();


    // INSTRUCTIONS

    updateInstructions();


    // AUTHORITY

    previewExamIncharge.textContent =

        examIncharge.value.trim()

        ||

        "Examination In-Charge";


    previewPrincipal.textContent =

        principalName.value.trim()

        ||

        "Principal";


    // TABLE

    updateTimetable();

}


//==================================================
// LIVE INPUT EVENTS
//==================================================

const mainFields =
document.querySelectorAll(`

    #examName,
    #academicSession,
    #studentClass,
    #section,
    #startDate,
    #endDate,
    #startTime,
    #endTime,
    #instructions,
    #examIncharge,
    #principalName

`);


mainFields.forEach(field=>{

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

        document
        .getElementById(
            "examTimetablePreview"
        )
        .scrollIntoView({

            behavior:"smooth",
            block:"start"

        });

    }
);


//==================================================
// PRINT
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

        if(
            !confirm(
                "Reset the entire examination timetable?"
            )
        ){

            return;

        }


        examName.value =
        "Annual Examination";

        academicSession.value =
        "2026-2027";

        studentClass.value =
        "All Classes";

        section.value =
        "All";

        startDate.value =
        "";

        endDate.value =
        "";

        startTime.value =
        "08:00";

        endTime.value =
        "11:00";

        instructions.value =

`Students must report to school 15 minutes before the examination.
Students must bring all necessary stationery items.
Mobile phones and electronic devices are not allowed in the examination hall.`;

        examIncharge.value =
        "Examination In-Charge";

        principalName.value =
        "Principal";


        // RESET SUBJECTS

        subjectRows.innerHTML = "";


        createSubjectRow();


        updatePreview();

    }
);


//==================================================
// INITIALIZE FIRST SUBJECT ROW
//==================================================

const firstSubjectRow =
document.querySelector(
    ".subject-row"
);


if(firstSubjectRow){

    attachRowEvents(
        firstSubjectRow
    );

}


//==================================================
// INITIAL PREVIEW
//==================================================

updatePreview();


//==================================================
// AFTER PRINT
//==================================================

window.onafterprint = function(){

    console.log(
        "Exam Time Table Printed Successfully."
    );

};


//==================================================
// READY
//==================================================

console.log(
    "Exam Time Table Generator Loaded Successfully."
);