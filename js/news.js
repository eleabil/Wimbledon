'use strict';
// lab 8 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

window.addEventListener('load', function () {
    console.log("page is loaded!");
    getNewsFromLocalStorage()
});

function getNewsFromLocalStorage() {

    if (localStorage.getItem('news') === null) {
        alert('local storage is empty');
    } else {
        alert('local storage is not empty');

        var news = localStorage.getItem("news");

        // var test = JSON.stringify(news);
        var newsTitle = JSON.parse(news);
        var title = newsTitle.newsTitle;
        var text = newsTitle.newsText;

        var template = document.getElementById("allNews");
        template.innerHTML += "<div class=\"card card-style\">" +
            "   <div class=\"card-body\">" +
            "   <h4 class=\"card-title\">" + title + "</h4>" +
            "   <p class=\"card-text\">" + text + "</p>" + " </div>" +
            "   <p class=\"card-text\">" + getCurrentDate() + "</p>" +
            "   </div>"
    }
}

function getCurrentDate() {
    var currentdate = new Date();
    var dd = currentdate.getDate();
    var mm = currentdate.getMonth() + 1;
    var yyyy = currentdate.getFullYear();
    var hh = currentdate.getHours();
    var min = currentdate.getMinutes();
    if (min < 10) {
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