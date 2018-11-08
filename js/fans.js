'use strict';
// lab 8  WORKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

window.addEventListener('load', function () {
        console.log("page is loaded!");
        getFansFromLocalStorage()

});

function getFansFromLocalStorage() {

    if (localStorage.getItem('fans') === null) {
        console.log('local storage is empty');
    } else {
        alert('local storage is not empty');
        var text = localStorage.getItem("fans");
        var template = document.getElementById("appeals");
        template.innerHTML += "<div class=\"card col-sm-12 col-lg-12 mt-3 fan-appeal-card\" id=\"appeal\">\n" +
            "                <div class=\"card-body fanbox-border\" >\n" +
            "                    <p class=\"card-text\">" + text + "</p>\n" +
            "                    <div class=\"row\">\n" +
            "                        <div class=\"col-md-3\">" + getCurrentDate() + "</div>\n" +
            "                        <div class=\"col-md-8 col-md-offset fan-rightstr\">Username</div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>";

        // document.getElementById("fan_appeal_form_id").reset();
    }
}

function getCurrentDate() {
    var currentdate = new Date();
    var dd = currentdate.getDate();
    var mm = currentdate.getMonth() + 1;
    var yyyy = currentdate.getFullYear();
    var hh = currentdate.getHours();
    var min = currentdate.getMinutes();
    if (min<10) {
        min = '0' + min;
    }
    var time = hh + ':' + min;

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var datetime = dd + '.' + mm + '.' + yyyy + ' ' + time;

    return datetime
}