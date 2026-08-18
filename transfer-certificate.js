/*==================================================
        TRANSFER CERTIFICATE
              JS PART - 1
==================================================*/

//==============================
// INPUT IDS
//==============================

const fields = {

tcNo:"previewTcNo",

session:"previewSession",

studentName:"previewStudentName",

fatherName:"previewFatherName",

motherName:"previewMotherName",

address:"previewAddress",

admissionDate:"previewAdmissionDate",

transferDate:"previewTransferDate",

leavingDate:"previewLeavingDate",

character:"previewCharacter",

studentClass:"previewClass",

stream:"previewStream",

yearFrom:"previewYearFrom",

yearTo:"previewYearTo",

dob:"previewDOB",

dobWords:"previewDOBWords",

promotion:"previewPromotion"

};

//==============================
// LIVE PREVIEW
//==============================

Object.keys(fields).forEach(function(id){

const input=document.getElementById(id);

const preview=document.getElementById(fields[id]);

if(input && preview){

input.addEventListener("input",function(){

let value=input.value.trim();

if(value===""){

preview.textContent="____________";

}else{

preview.textContent=value;

}

});

}

});

//==============================
// DATE FORMAT
//==============================

function formatDate(date){

if(date==="") return "____________";

const d=new Date(date);

if(isNaN(d)) return date;

return d.toLocaleDateString("en-GB",{

day:"2-digit",

month:"long",

year:"numeric"

});

}

//==============================
// DATE FIELDS
//==============================

const dateFields=[

"admissionDate",

"transferDate",

"leavingDate",

"yearFrom",

"yearTo",

"dob"

];

dateFields.forEach(function(id){

const input=document.getElementById(id);

const preview=document.getElementById(fields[id]);

if(input && preview){

input.addEventListener("change",function(){

preview.textContent=formatDate(input.value);

});

}

});/*==================================================
        TRANSFER CERTIFICATE
              JS PART - 2
==================================================*/

//========================================
// AUTO ISSUE DATE
//========================================

window.addEventListener("load",function(){

const today=new Date();

const options={

day:"2-digit",

month:"long",

year:"numeric"

};

document.getElementById("previewIssueDate").textContent=

today.toLocaleDateString("en-GB",options);

});

//========================================
// RESET BUTTON
//========================================

const resetBtn=document.querySelector(".btn-reset");

resetBtn.addEventListener("click",function(){

setTimeout(function(){

//========================

document.getElementById("previewTcNo").textContent="____________";

document.getElementById("previewSession").textContent="____________";

document.getElementById("previewStudentName").textContent="__________________";

document.getElementById("previewFatherName").textContent="__________________";

document.getElementById("previewMotherName").textContent="__________________";

document.getElementById("previewAddress").textContent="________________________________________";

document.getElementById("previewAdmissionDate").textContent="____________";

document.getElementById("previewTransferDate").textContent="____________";

document.getElementById("previewLeavingDate").textContent="____________";

document.getElementById("previewCharacter").textContent="____________";

document.getElementById("previewClass").textContent="____________";

document.getElementById("previewStream").textContent="____________";

document.getElementById("previewYearFrom").textContent="____________";

document.getElementById("previewYearTo").textContent="____________";

document.getElementById("previewDOB").textContent="____________";

document.getElementById("previewDOBWords").textContent="________________________________";

document.getElementById("previewPromotion").textContent="____________";

//========================

const today=new Date();

document.getElementById("previewIssueDate").textContent=

today.toLocaleDateString("en-GB",{

day:"2-digit",

month:"long",

year:"numeric"

});

},100);

});

//========================================
// PRINT
//========================================

function printCertificate(){

window.print();

}

//========================================
// ENTER KEY
//========================================

document.querySelectorAll("input,textarea,select")

.forEach(function(element){

element.addEventListener("keypress",function(e){

if(e.key==="Enter"){

e.preventDefault();

}

});

});

//========================================
// AUTO FOCUS
//========================================

window.onload=function(){

document.getElementById("tcNo").focus();

};

//========================================
// REMOVE EXTRA SPACES
//========================================

document.querySelectorAll("input,textarea")

.forEach(function(box){

box.addEventListener("blur",function(){

this.value=this.value.trim().replace(/\s+/g," ");

});

});

//========================================
// CHARACTER LIMIT
//========================================

document.getElementById("address")

.addEventListener("input",function(){

if(this.value.length>180){

this.value=this.value.substring(0,180);

}

});/*==================================================
        TRANSFER CERTIFICATE
              JS PART - 3
==================================================*/

//==========================================
// AUTO SESSION
//==========================================

(function(){

const session=document.getElementById("session");

if(session && session.value===""){

const year=new Date().getFullYear();

session.value=year+"-"+(year+1);

document.getElementById("previewSession").textContent=session.value;

}

})();

//==========================================
// AUTO TC NUMBER
//==========================================

(function(){

const tc=document.getElementById("tcNo");

if(tc && tc.value===""){

const year=new Date().getFullYear();

const random=Math.floor(100+Math.random()*900);

tc.value="TC/"+year+"/"+random;

document.getElementById("previewTcNo").textContent=tc.value;

}

})();

//==========================================
// DATE OF BIRTH TO WORDS
//==========================================

const months=[

"January","February","March","April","May","June",

"July","August","September","October","November","December"

];

const ones=[

"","One","Two","Three","Four","Five","Six","Seven","Eight","Nine",

"Ten","Eleven","Twelve","Thirteen","Fourteen","Fifteen",

"Sixteen","Seventeen","Eighteen","Nineteen"

];

const tens=[

"","","Twenty","Thirty","Forty","Fifty",

"Sixty","Seventy","Eighty","Ninety"

];

function twoDigit(num){

if(num<20) return ones[num];

return tens[Math.floor(num/10)]

+(num%10?" "+ones[num%10]:"");

}

function yearWords(year){

let first=Math.floor(year/100);

let last=year%100;

return twoDigit(first)+" Hundred "+twoDigit(last);

}

function convertDOBWords(date){

if(!date) return "";

const d=new Date(date);

if(isNaN(d)) return "";

let day=twoDigit(d.getDate());

let month=months[d.getMonth()];

let year=yearWords(d.getFullYear());

return day+" "+month+" "+year;

}

const dob=document.getElementById("dob");

if(dob){

dob.addEventListener("change",function(){

const words=convertDOBWords(this.value);

document.getElementById("dobWords").value=words;

document.getElementById("previewDOBWords").textContent=

words || "________________________________";

});

}

//==========================================
// VALIDATION
//==========================================

function validateCertificate(){

const required=[

"studentName",

"fatherName",

"motherName",

"studentClass"

];

for(let id of required){

let box=document.getElementById(id);

if(box && box.value.trim()===""){

alert("Please fill : "+id);

box.focus();

return false;

}

}

return true;

}

//==========================================
// PRINT OVERRIDE
//==========================================

function printCertificate(){

if(!validateCertificate()) return;

window.print();

}

//==========================================
// LIVE UPPERCASE
//==========================================

document.querySelectorAll("input[type=text]")

.forEach(function(box){

box.addEventListener("input",function(){

if(

this.id==="studentName" ||

this.id==="fatherName" ||

this.id==="motherName"

){

this.value=this.value.toUpperCase();

}

});

});

//==========================================
// END
//==========================================