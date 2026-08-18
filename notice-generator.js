/*=========================================
    ST. JOSEPH'S SCHOOL ERP
    NOTICE GENERATOR JS - P1
=========================================*/

// Form Elements

const noticeNo = document.getElementById("noticeNo");
const noticeDate = document.getElementById("noticeDate");

const previewNoticeNo =
document.getElementById("previewNoticeNo");

const previewDate =
document.getElementById("previewDate");


/*=========================================
        AUTO NOTICE NUMBER
=========================================*/

function generateNoticeNumber(){

    let count =
    localStorage.getItem("noticeCount");

    if(count === null){

        count = 1;

    }else{

        count = parseInt(count);

    }

    let number =
    "SJS" + String(count).padStart(2,"0");

    noticeNo.value = number;

    previewNoticeNo.innerText = number;

}

generateNoticeNumber();


/*=========================================
        SAVE NEXT NUMBER
=========================================*/

function saveNextNotice(){

    let count =
    localStorage.getItem("noticeCount");

    if(count === null){

        count = 1;

    }else{

        count = parseInt(count);

    }

    count++;

    localStorage.setItem(
        "noticeCount",
        count
    );

}


/*=========================================
        AUTO DATE
=========================================*/

const today = new Date();

const yyyy = today.getFullYear();

const mm =
String(today.getMonth()+1)
.padStart(2,"0");

const dd =
String(today.getDate())
.padStart(2,"0");

noticeDate.value =
`${yyyy}-${mm}-${dd}`;

previewDate.innerText =
`${dd}/${mm}/${yyyy}`;


/*=========================================
        DATE CHANGE
=========================================*/

noticeDate.addEventListener(
"change",

function(){

    let value =
    noticeDate.value.split("-");

    previewDate.innerText =
    value[2]+"/"+
    value[1]+"/"+
    value[0];

});

console.log(
"Notice Generator JS Loaded"
);/*=========================================
        FORM ELEMENTS
=========================================*/

const noticeFor =
document.getElementById("noticeFor");

const subject =
document.getElementById("subject");

const noticeContent =
document.getElementById("noticeContent");

const previewNoticeFor =
document.getElementById("previewNoticeFor");

const previewSubject =
document.getElementById("previewSubject");

const previewContent =
document.getElementById("previewContent");


/*=========================================
        LIVE NOTICE FOR
=========================================*/

noticeFor.addEventListener("change",function(){

    previewNoticeFor.innerText =
    noticeFor.value;

});


/*=========================================
        LIVE SUBJECT
=========================================*/

subject.addEventListener("input",function(){

    if(subject.value.trim()===""){

        previewSubject.innerText =
        "Notice Subject";

    }else{

        previewSubject.innerText =
        subject.value;

    }

});


/*=========================================
        LIVE NOTICE CONTENT
=========================================*/

noticeContent.addEventListener("input",function(){

    if(noticeContent.value.trim()===""){

        previewContent.innerHTML =
        "Your official school notice will appear here...";

    }else{

        previewContent.innerText =
        noticeContent.value;

    }

});


/*=========================================
        RESET BUTTON
=========================================*/

document.getElementById("resetBtn")
.addEventListener("click",function(){

    noticeFor.selectedIndex=0;

    subject.value="";

    noticeContent.value="";

    previewNoticeFor.innerText=
    noticeFor.value;

    previewSubject.innerText=
    "Notice Subject";

    previewContent.innerHTML=
    "Your official school notice will appear here...";

});


/*=========================================
        PREVIEW BUTTON
=========================================*/

document.getElementById("previewBtn")
.addEventListener("click",function(){

    alert("Notice Preview Updated Successfully.");

});/*=========================================
            PRINT
=========================================*/

document.getElementById("printBtn")
.addEventListener("click",function(){

    window.print();

});


/*=========================================
        PDF DOWNLOAD
=========================================*/

document.getElementById("pdfBtn")
.addEventListener("click",async function(){

    const notice =
    document.getElementById("noticePreview");

    const canvas =
    await html2canvas(notice,{
        scale:2
    });

    const img =
    canvas.toDataURL("image/png");

    const { jsPDF } = window.jspdf;

    const pdf =
    new jsPDF("p","mm","a4");

    pdf.addImage(
        img,
        "PNG",
        0,
        0,
        210,
        297
    );

    pdf.save(
        noticeNo.value + ".pdf"
    );

});


/*=========================================
        WHATSAPP SHARE
=========================================*/

document.getElementById("whatsappBtn")
.addEventListener("click",function(){

    let text =

"ST. JOSEPH'S SCHOOL\n\n"+

"Notice No : "
+ noticeNo.value +

"\nDate : "
+ previewDate.innerText +

"\n\nTo : "
+ noticeFor.value +

"\n\nSubject : "
+ subject.value +

"\n\n"
+ noticeContent.value;

    let url =

"https://wa.me/?text="

+ encodeURIComponent(text);

    window.open(
        url,
        "_blank"
    );

});


/*=========================================
    AUTO NEXT NOTICE NUMBER
=========================================*/

document.getElementById("pdfBtn")
.addEventListener("click",function(){

    saveNextNotice();

});

document.getElementById("printBtn")
.addEventListener("click",function(){

    saveNextNotice();

});


/*=========================================
            PAGE LOAD
=========================================*/

window.onload=function(){

    previewNoticeFor.innerText =
    noticeFor.value;

};