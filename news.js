var useLocalStorage = false;

window.addEventListener('load', function () {
    if (useLocalStorage) {
        getNewsFromLocalStorage()
    } else {
        getAllNewsFromIndexedDb()
    }

});

window.addEventListener('load', function () {
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

function getAllNewsFromIndexedDb() {
    var db;
    var openRequest = indexedDB.open("wimbledon_db", 2);
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

            if (cursor) {

                // for(var i in cursor.value) {
                var title = cursor.value.newsTitle;
                var text = cursor.value.newsText;
                console.log("News title: " + title);
                console.log("News text: " + text);

                var template = document.getElementById("allNews");
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