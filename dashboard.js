/*=========================================
    ST. JOSEPH'S SCHOOL ERP
        DASHBOARD JS v2.0
            PART - 1
=========================================*/

/*=============================
      FIREBASE IMPORTS
=============================*/

import { initializeApp }
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";

import {

    getAuth,
    onAuthStateChanged,
    signOut

}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

import {

    getFirestore,
    doc,
    getDoc

}
from "https://www.gstatic.com/firebasejs/11.10.0/firebase-firestore.js";

/*=============================
      FIREBASE CONFIG
=============================*/

const firebaseConfig = {

    apiKey:
    "AIzaSyCiCFhAb0Q9_ADYf7SR8ieK1BIsKgcVpdg",

    authDomain:
    "st-josephs-school-98ecd.firebaseapp.com",

    projectId:
    "st-josephs-school-98ecd",

    storageBucket:
    "st-josephs-school-98ecd.firebasestorage.app",

    messagingSenderId:
    "430248042976",

    appId:
    "1:430248042976:web:5a4b0f30a65d11e1d80b85"

};

/*=============================
      INITIALIZE FIREBASE
=============================*/

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

/*=============================
      HTML ELEMENTS
=============================*/

const adminName =
document.getElementById("adminName");

const officeUser =
document.getElementById("officeUser");

const currentDate =
document.getElementById("currentDate");

const currentTime =
document.getElementById("currentTime");

const logoutBtn =
document.getElementById("logoutBtn");

const loadingScreen =
document.getElementById("loadingScreen");

const welcomeHeading =
document.querySelector(".welcome h1");

const recentActivity =
document.getElementById("recentActivity");

/*=============================
      GLOBAL VARIABLES
=============================*/

let currentUser = null;

let currentUserData = null;

/*=============================
      LOADING FUNCTIONS
=============================*/

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

/*=============================
      DATE & TIME
=============================*/

function updateDateTime(){

    const now = new Date();

    if(currentDate){

        currentDate.textContent =

        now.toLocaleDateString(

            "en-IN",

            {

                weekday:"long",

                day:"2-digit",

                month:"long",

                year:"numeric"

            }

        );

    }

    if(currentTime){

        currentTime.textContent =

        now.toLocaleTimeString(

            "en-IN",

            {

                hour:"2-digit",

                minute:"2-digit",

                second:"2-digit",

                hour12:true

            }

        );

    }

}

updateDateTime();

setInterval(

    updateDateTime,

    1000

);

/*=============================
      HELPER FUNCTIONS
=============================*/

function redirectLogin(){

    window.location.replace(

        "login.html"

    );

}

function clearDashboard(){

    if(adminName){

        adminName.textContent = "";

    }

    if(officeUser){

        officeUser.textContent = "";

    }

}

function setOfficeUser(data){

    currentUserData = data;

    if(adminName){

        adminName.textContent =

        data.name || "Office Staff";

    }

    if(officeUser){

        officeUser.textContent =

        data.name || "Office Staff";

    }

}

/*=============================
      START LOADING
=============================*/

showLoading();

console.log(

    "Dashboard Initializing..."

);/*=========================================
      AUTHENTICATION
=========================================*/

onAuthStateChanged(auth, async (user) => {

    if (!user) {

        hideLoading();

        redirectLogin();

        return;

    }

    currentUser = user;

    try {

        const userRef = doc(db, "users", user.uid);

        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {

            console.error("User Document Not Found");

            await signOut(auth);

            redirectLogin();

            return;

        }

        const data = userSnap.data();

        /*=============================
              ROLE CHECK
        =============================*/

        if (data.role !== "office") {

            console.error("Access Denied");

            await signOut(auth);

            redirectLogin();

            return;

        }

        /*=============================
              STATUS CHECK
        =============================*/

        if (data.status !== "active") {

            console.error("Account Disabled");

            await signOut(auth);

            redirectLogin();

            return;

        }

        /*=============================
              USER VERIFIED
        =============================*/

        setOfficeUser(data);

        sessionStorage.setItem(
            "officeName",
            data.name
        );

        sessionStorage.setItem(
            "officeEmail",
            user.email
        );

        sessionStorage.setItem(
            "officeRole",
            data.role
        );

        console.log("Office Staff Verified ✔");

        /*=============================
              LOAD DASHBOARD
        =============================*/

        loadGreeting();

        loadRecentActivity();

        hideLoading();

    }

    catch (error) {

        console.error(error);

        clearDashboard();

        hideLoading();

        await signOut(auth);

        redirectLogin();

    }

});

/*=========================================
      DASHBOARD INITIALIZATION
=========================================*/

document.addEventListener("DOMContentLoaded", () => {

    document.title =
    "🏫 SJS Office Dashboard";

    console.log(
        "Dashboard Ready..."
    );

});

/*=========================================
      GREETING
=========================================*/

function loadGreeting() {

    if (!welcomeHeading) return;

    const hour = new Date().getHours();

    let greeting = "Welcome";

    if (hour >= 5 && hour < 12) {

        greeting = "Good Morning";

    }

    else if (hour >= 12 && hour < 17) {

        greeting = "Good Afternoon";

    }

    else if (hour >= 17 && hour < 21) {

        greeting = "Good Evening";

    }

    else {

        greeting = "Good Night";

    }

    welcomeHeading.innerHTML =

        `${greeting}, <span>${currentUserData.name}</span>`;

}

/*=========================================
      RECENT ACTIVITY
=========================================*/

function loadRecentActivity() {

    if (!recentActivity) return;

    recentActivity.innerHTML = `

        <li>✅ Dashboard Loaded Successfully</li>

        <li>🔐 Office Staff Verified</li>

        <li>📅 Date & Time Synced</li>

        <li>🔥 Firebase Connected</li>

        <li>📂 Firestore Connected</li>

    `;

}

console.log("Authentication Module Loaded");/*=========================================
      LOGOUT SYSTEM
=========================================*/

async function logout() {

    const confirmLogout = confirm(

        "Do you want to logout?"

    );

    if (!confirmLogout) return;

    try {

        showLoading();

        await signOut(auth);

        sessionStorage.clear();

        localStorage.clear();

        hideLoading();

        window.location.replace("login.html");

    }

    catch (error) {

        hideLoading();

        console.error(error);

        alert("Logout Failed");

    }

}

if (logoutBtn) {

    logoutBtn.addEventListener(

        "click",

        logout

    );

}

/*=========================================
      WINDOW EVENTS
=========================================*/

window.addEventListener(

    "focus",

    () => {

        updateDateTime();

    }

);

window.addEventListener(

    "online",

    () => {

        console.log(

            "Internet Connected ✔"

        );

    }

);

window.addEventListener(

    "offline",

    () => {

        alert(

            "Internet Connection Lost"

        );

    }

);

/*=========================================
      PAGE VISIBILITY
=========================================*/

document.addEventListener(

    "visibilitychange",

    () => {

        if (!document.hidden) {

            updateDateTime();

        }

    }

);

/*=========================================
      BACK BUTTON PROTECTION
=========================================*/

window.history.pushState(

    null,

    "",

    window.location.href

);

window.onpopstate = function () {

    window.history.pushState(

        null,

        "",

        window.location.href

    );

};

/*=========================================
      ERROR HANDLER
=========================================*/

window.addEventListener(

    "error",

    (event) => {

        console.error(

            "JavaScript Error :",

            event.message

        );

    }

);

/*=========================================
      PROMISE ERROR
=========================================*/

window.addEventListener(

    "unhandledrejection",

    (event) => {

        console.error(

            "Promise Error :",

            event.reason

        );

    }

);

/*=========================================
      DASHBOARD INFO
=========================================*/

const dashboardInfo = {

    app: "St. Joseph's School ERP",

    version: "2.0.0",

    developer: "Office Dashboard",

    firebase: "11.10.0",

    auth: "Firebase Authentication",

    database: "Cloud Firestore"

};

console.table(

    dashboardInfo

);

/*=========================================
      PAGE LOAD
=========================================*/

window.addEventListener(

    "load",

    () => {

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

"%cOffice Dashboard v2.0",

"color:#FFD700;font-size:18px;font-weight:bold;"

        );

        console.log(

"%cFirebase Connected ✔",

"color:green;font-size:14px;"

        );

        console.log(

"%cAuthentication Ready ✔",

"color:green;font-size:14px;"

        );

        console.log(

"%cFirestore Connected ✔",

"color:green;font-size:14px;"

        );

        console.log(

"%cDashboard Ready ✔",

"color:green;font-size:14px;"

        );

        console.log(

"%c========================================",

"color:#0B3D91;font-size:14px;font-weight:bold;"

        );

    }

);

/*=========================================
      END OF FILE
=========================================*/

console.log(

    "Dashboard JS v2.0 Loaded Successfully ✔"

);