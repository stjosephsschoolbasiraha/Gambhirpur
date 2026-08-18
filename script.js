// ===== Premium Admission Popup =====

window.addEventListener("load", function () {

    setTimeout(function () {

        document.getElementById("welcomePopup").style.display = "flex";

    }, 5000);

});

document.getElementById("popupClose").addEventListener("click", function () {

    document.getElementById("welcomePopup").style.display = "none";

});

document.getElementById("popupLater").addEventListener("click", function () {

    document.getElementById("welcomePopup").style.display = "none";

});