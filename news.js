'use strict';
// lab 8 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

window.addEventListener('load', function () {
    console.log("page is loaded!");
    getNewsFromLocalStorage()
});

function getNewsFromLocalStorage() {

    if (localStorage.getItem('news') === null) {
        console.log('local storage is empty');
    } else {
        console.log('local storage is not empty');

        var news = localStorage.getItem("news");
        var newsTitle = JSON.parse(news);
        var title = newsTitle.newsTitle;
        var text = newsTitle.newsText;

        var template = document.getElementById("allNews");
        template.innerHTML += "<div class=\"card card-style\">" +
            "   <div class=\"card-body\">" +
            "   <h4 class=\"card-title\">" + title + "</h4>" +
            "   <p class=\"card-text\">" + text + "</p>" + " </div>" +
            "   <p class=\"card-text\">" + "</p>" +
            "   </div>"
    }
}
