var useLocalStorage = false;

window.addEventListener('load', function () {
    getData()

});

function getData() {
    alert("getData");
    if (isOnline()) {
        getNewsFromServer()
    }
    else {
        if (useLocalStorage) {
            getNewsFromLocalStorage()
        } else {
            getAllNewsFromIndexedDb()
        }
    }
}

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

function getAllNewsFromIndexedDb() {
    var db;
    var openRequest = indexedDB.open("wimbledon_db", 3);
    console.log("getAllNewsFromIndexedDb() is started");
    openRequest.onupgradeneeded = function (e) {
        var thisDB = e.target.result;

        if (!thisDB.objectStoreNames.contains("news")) {
            thisDB.createObjectStore("news", {autoIncrement: true});
        }
        console.log('onupgradeneeded')
    };

    openRequest.onsuccess = function (e) {
        console.log("IndexedDB is running successfully");
        db = e.target.result;

        db.transaction(["news"], "readonly").objectStore("news").openCursor().onsuccess = function (e) {
            var cursor = e.target.result;

            var template = document.getElementById("allNews");
            if (cursor) {

                // for(var i in cursor.value) {
                var title = cursor.value.newsTitle;
                var text = cursor.value.newsText;
                console.log("News title: " + title);
                console.log("News text: " + text);

                template.innerHTML += "<div class=\"card card-style\">" +
                    "   <div class=\"card-body\">" +
                    "   <h4 class=\"card-title\">" + title + "</h4>" +
                    "   <p class=\"card-text\">" + text + "</p>" + " </div>" +
                    "   <p class=\"card-text\">" + "</p>" +
                    "   </div>"

            }

            cursor.continue();
        }
    };

    openRequest.onerror = function (e) {
        console.log("IndexedDB error: " + e);
    };

}



function getNewsFromServer() {
    let url = 'http://localhost:3012/news';
    fetch(url)
        .then(response => response.json())
        .then(data => {

            for (i in data) {

                var template = document.getElementById("allNews");
                template.innerHTML += "<div class=\"card card-style\">" +
                    "   <div class=\"card-body\">" +
                    "   <h4 class=\"card-title\">" + data[i].title + "</h4>" +
                    "   <p class=\"card-text\">" + data[i].text + "</p>" + " </div>" +
                    "   <p class=\"card-text\">" + "</p>" +
                    "   </div>"


                alert(data[i]);
            }

            console.log(data);// Prints result from `response.json()`
        })
        .catch(error => console.error(error));
}

window.addEventListener('online', getData);

function isOnline() {
    return window.navigator.onLine;
}