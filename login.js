/*==================================================
    ST. JOSEPH'S SCHOOL ERP
        LOGIN JS v4.0
            PART - 1
==================================================*/

/*=========================================
        FIREBASE IMPORTS
=========================================*/

import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {

    getAuth,
    signInWithEmailAndPassword,
    setPersistence,
    browserSessionPersistence

}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {

    getFirestore,
    doc,
    getDoc

}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

/*=========================================
        FIREBASE CONFIG
=========================================*/

const firebaseConfig = {

    apiKey: "AIzaSyCiCFhAb0Q9_ADYf7SR8ieK1BIsKgcVpdg",

    authDomain: "st-josephs-school-98ecd.firebaseapp.com",

    projectId: "st-josephs-school-98ecd",

    storageBucket: "st-josephs-school-98ecd.firebasestorage.app",

    messagingSenderId: "430248042976",

    appId: "1:430248042976:web:5a4b0f30a65d11e1d80b85"

};

/*=========================================
        INITIALIZE FIREBASE
=========================================*/

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

/*=========================================
        HTML ELEMENTS
=========================================*/

const loginForm =
document.getElementById("loginForm");

const email =
document.getElementById("email");

const password =
document.getElementById("password");

const loginBtn =
document.getElementById("loginBtn");

const togglePassword =
document.getElementById("togglePassword");

const loadingScreen =
document.getElementById("loadingScreen");

const messageBox =
document.getElementById("messageBox");

const messageText =
document.getElementById("messageText");

/*=========================================
        LOADING FUNCTIONS
=========================================*/

function showLoading(){

    if(loadingScreen){

        loadingScreen.classList.add("show");

    }

}

function hideLoading(){

    if(loadingScreen){

        loadingScreen.classList.remove("show");

    }

}

/*=========================================
        MESSAGE FUNCTIONS
=========================================*/

function showMessage(message){

    if(messageBox){

        messageBox.classList.add("show");

    }

    if(messageText){

        messageText.textContent = message;

    }

}

function hideMessage(){

    if(messageBox){

        messageBox.classList.remove("show");

    }

}

/*=========================================
        INITIAL PAGE
=========================================*/

window.addEventListener("load",()=>{

    hideLoading();

    hideMessage();

    loginBtn.disabled = false;

    email.focus();

    console.log("Login Page Ready");

});/*=========================================
        LOGIN AUTHENTICATION
=========================================*/

loginForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    hideMessage();

    loginBtn.disabled = true;

    showLoading();

    const userEmail = email.value.trim();

    const userPassword = password.value;

    if(userEmail === "" || userPassword === ""){

        hideLoading();

        loginBtn.disabled = false;

        showMessage("Please fill all required fields.");

        return;

    }

    try{

        /*==============================
            SESSION LOGIN ONLY
        ==============================*/

        await setPersistence(

            auth,

            browserSessionPersistence

        );

        /*==============================
            FIREBASE LOGIN
        ==============================*/

        const credential =

        await signInWithEmailAndPassword(

            auth,

            userEmail,

            userPassword

        );

        const user = credential.user;

        /*==============================
            FIRESTORE USER
        ==============================*/

        const userRef =

        doc(

            db,

            "users",

            user.uid

        );

        const userSnap =

        await getDoc(userRef);

        if(!userSnap.exists()){

            throw new Error(

                "User profile not found."

            );

        }

        const userData = userSnap.data();

        /*==============================
            ROLE CHECK
        ==============================*/

        if(userData.role !== "office"){

            throw new Error(

                "Access denied."

            );

        }

        /*==============================
            STATUS CHECK
        ==============================*/

        if(userData.status !== "active"){

            throw new Error(

                "Your account is inactive."

            );

        }

        /*==============================
            SESSION STORAGE
        ==============================*/

        sessionStorage.setItem(

            "officeName",

            userData.name || ""

        );

        sessionStorage.setItem(

            "officeEmail",

            user.email

        );

        sessionStorage.setItem(

            "officeRole",

            userData.role

        );

        /*==============================
            SUCCESS
        ==============================*/

        showMessage(

            "Login Successful..."

        );

        setTimeout(()=>{

            window.location.replace(

                "dashboard.html"

            );

        },1000);

    }

    catch(error){

        hideLoading();

        loginBtn.disabled = false;

        let message = "Login Failed.";

        switch(error.code){

            case "auth/invalid-email":

                message =

                "Invalid Email Address.";

                break;

            case "auth/invalid-credential":

                message =

                "Incorrect Email or Password.";

                break;

            case "auth/user-disabled":

                message =

                "Account Disabled.";

                break;

            case "auth/network-request-failed":

                message =

                "No Internet Connection.";

                break;

            case "auth/too-many-requests":

                message =

                "Too Many Attempts. Try Again Later.";

                break;

            default:

                message =

                error.message;

        }

        showMessage(message);

    }

});/*=========================================
        PASSWORD TOGGLE
=========================================*/

togglePassword.addEventListener("click",()=>{

    if(password.type==="password"){

        password.type="text";

        togglePassword.innerHTML=
        '<i class="fa-solid fa-eye-slash"></i>';

    }

    else{

        password.type="password";

        togglePassword.innerHTML=
        '<i class="fa-solid fa-eye"></i>';

    }

});

/*=========================================
        ENTER KEY SUPPORT
=========================================*/

email.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        password.focus();

    }

});

password.addEventListener("keydown",(e)=>{

    if(e.key==="Enter"){

        e.preventDefault();

        loginForm.requestSubmit();

    }

});

/*=========================================
        PAGE SECURITY
=========================================*/

window.history.pushState(
    null,
    "",
    window.location.href
);

window.onpopstate=function(){

    window.history.pushState(
        null,
        "",
        window.location.href
    );

};

/*=========================================
        WINDOW EVENTS
=========================================*/

window.addEventListener("online",()=>{

    console.log("Internet Connected");

});

window.addEventListener("offline",()=>{

    showMessage(
        "Internet Connection Lost."
    );

});

window.addEventListener("error",(event)=>{

    console.error(
        "JavaScript Error:",
        event.message
    );

});

window.addEventListener("unhandledrejection",(event)=>{

    console.error(
        "Promise Error:",
        event.reason
    );

});

/*=========================================
        DEVTOOLS BLOCK
=========================================*/

document.addEventListener("contextmenu",(e)=>{

    e.preventDefault();

});

document.addEventListener("keydown",(e)=>{

    if(

        e.key==="F12" ||

        (e.ctrlKey &&
         e.shiftKey &&
        (
            e.key==="I" ||
            e.key==="J" ||
            e.key==="C"
        )) ||

        (e.ctrlKey &&
         e.key==="U")

    ){

        e.preventDefault();

    }

});

/*=========================================
        CONSOLE
=========================================*/

console.clear();

console.log(
"%c========================================",
"color:#0B3D91;font-size:14px;font-weight:bold;"
);

console.log(
"%cST. JOSEPH'S SCHOOL ERP",
"color:#0B3D91;font-size:22px;font-weight:bold;"
);

console.log(
"%cOffice Staff Login v4.0",
"color:#FFD700;font-size:18px;font-weight:bold;"
);

console.log(
"%cFirebase Ready ✔",
"color:green;font-size:14px;"
);

console.log(
"%cSession Login Enabled ✔",
"color:green;font-size:14px;"
);

console.log(
"%cFirestore Verification ✔",
"color:green;font-size:14px;"
);

console.log(
"%cLogin System Ready ✔",
"color:green;font-size:14px;"
);

console.log(
"%c========================================",
"color:#0B3D91;font-size:14px;font-weight:bold;"
);