'use strict';

var useLocalStorage = false;

window.addEventListener('load', function () {
    console.log("Page is loaded!");

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    function updateOnlineStatus(event) {

        if (event.type === 'online') {
            if (localStorage.getItem('news') === null) {
                console.log('no item to load')
            } else {
                var unsavedItem = localStorage.getItem('news');
                sendNewsToServer(unsavedItem);
                localStorage.removeItem('news')
            }
        } else {

        }
    }

});


// admin page validation.
//news title and text validation
function addNews() {

    var elements = document.forms["newsForm"].elements;
    var isTitleValidate = false;
    var isNewsValidate = false;

    if (document.newsForm.title.value.trim() === "") {
        alert("Please add title!");
        document.newsForm.title.focus();
        document.newsForm.title.style.border = "1px solid red";

    } else {
        isTitleValidate = true;
    }
    if (document.newsForm.text.value.trim() === "") {
        alert('You have not added the text!');
        document.newsForm.text.focus();
        document.newsForm.text.style.border = "1px solid red";

    } else {
        isNewsValidate = true;
    }
var news = new NewsObject(elements.title.value, elements.text.value)

    if (isTitleValidate && isNewsValidate) {
        if (isOnline()) {
            sendNewsToServer(news)
        } else {

            if (useLocalStorage) {
                saveNewsToLocalStorage(news)
            } else {
                saveNewsToIndexedDB(news);
                document.getElementById("newsForm_id").reset();
            }
        }
    }

    function saveNewsToIndexedDB(newsObj) {
        var db;

        var openRequest = indexedDB.open("wimbledon_db", 3);
// запускається лише раз при створенні БД і щоразу при оновленні весії БД
        openRequest.onupgradeneeded = function (e) { //e - event ф-ція, яка вертає івент (об'єкт БД, з якої ми можемо тягнути резльтат)
            var thisDB = e.target.result;

            if (!thisDB.objectStoreNames.contains("news")) {
                thisDB.createObjectStore("news", {autoIncrement: true}); //object store - сворити таблицю (news - назва таблиці)
            }
            console.log('onupgradeneeded')
        };

        openRequest.onsuccess = function (e) { // виконується, якщо з'єднаня до БД є успішним
            console.log("IndexedDB is running successfully"); // івент вертає БД

            db = e.target.result;

            var transaction = db.transaction(["news"], "readwrite");
            var store = transaction.objectStore("news"); // звертаємось таблиці з назвою news

            var request = store.add(newsObj); // додає об'єкт в бд

            request.onerror = function (e) {
                console.log("Error", e.target.error.name);
            };

            request.onsuccess = function (e) {
                alert("News is added successfully!");
            };
        };

        openRequest.onerror = function (e) {
            alert("IndexedDB error: " + e)
        };
    }
}


// Fan appeal
function addFans() {

    var elements = document.forms["fan_appeal_form"].elements;
    var isFansValidate = false;

    if (document.fan_appeal_form.message_text.value.trim() === "") {
        alert("Please add text!");
        document.fan_appeal_form.message_text.focus();
        document.fan_appeal_form.message_text.border = "1px solid red";
    } else {
        isFansValidate = true;
    }

    if (isFansValidate) {

        var appeal = new AppealObject(elements.message_text.value);

        if (isOnline()) {
            sendAppealToServer(appeal);
            var template = document.getElementById("appeals");
            template.innerHTML += "<div class=\"card col-sm-12 col-lg-12 mt-3 fan-appeal-card\" id=\"appeal\">\n" +
                "                <div class=\"card-body fanbox-border\" >\n" +
                "                    <p class=\"card-text\">" + appeal.appeal + "</p>\n" +
                "                    <div class=\"row\">\n" +
                "                        <div class=\"col-md-3\">" + getCurrentDate() + "</div>\n" +
                "                        <div class=\"col-md-8 col-md-offset fan-rightstr\">Username</div>\n" +
                "                    </div>\n" +
                "                </div>\n" +
                "            </div>";
        } else {
            if (useLocalStorage) {
                saveFansToLocalStorage(appeal)
            } else {
                saveFansToIndexedDB(appeal);
                document.getElementById("fan_appeal_form_id").reset();
            }
        }
    }
}

function saveFansToIndexedDB(fansObj) {
    var db;
    var openRequest = indexedDB.open("wimbledon_db", 3);
// запускається лише раз при створенні БД і щоразу при оновленні весії БД
    openRequest.onupgradeneeded = function (e) { //e - event ф-ція, яка вертає івент (об'єкт БД, з якої ми можемо тягнути резльтат)
        var thisDb = e.target.result;

        if (!thisDb.objectStoreNames.contains("fans")) {
            thisDb.createObjectStore("fans", {autoIncrement: true});
             //object store - сворити таблицю (news - назва таблиці)
        }
        alert('onupgradeneeded')
    };

    openRequest.onsuccess = function (e) { // виконується, якщо з'єднаня до БД є успішним
        alert("IndexedDB is running successfully"); // івент вертає БД

        db = e.target.result;

        var transaction = db.transaction(["fans"], "readwrite");
        var store = transaction.objectStore("fans"); // звертаємось таблиці з назвою news

        var request = store.add(fansObj); // додає об'єкт в бд

        request.onerror = function (e) {
            console.log("Error", e.target.error.name);
        };

        request.onsuccess = function (e) {
            alert("Fan's appeal is added successfully!");
        };
    };

    openRequest.onerror = function (e) {
        alert("IndexedDB error: " + e)
    };

}

// Local Storage
function saveNewsToLocalStorage(newsObject) {
    alert(newsObject);
    localStorage.setItem('news', JSON.stringify(newsObject));
    console.log("saved to local storage");
    document.getElementById("newsForm_id").reset();
}

// news image validation
function validateImage() {

    if (document.imageForm.file.value === "") {
        alert("Please add image!");
        document.imageForm.file.focus();

        return false;
    }
    alert('Your image is added!');
    return (true);
}

function saveFansToLocalStorage(fansObject) {
    console.log("fansObject" + fansObject);
    localStorage.setItem('fans', fansObject);
    console.log("saved to local storage");
}

function isOnline() {
    return window.navigator.onLine;
}






function sendNewsToServer(data) {
    let url = 'http://localhost:3012/news'; //шлях на сервер

    postRequest(url, data)
        .then(data => console.log(data))
        .catch(error => console.error(error));

    function postRequest(url, data) {
        return fetch(url, {    //fetch - новий аналог XMLHTTPRequest, щоб подавати CRUD запити на сервер,
            credentials: 'same-origin',   // перший параметр fetch - адреса сервера, другий - характеристики запиту (об'єкт, вид запиту (пост).. тощо)
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({         //вказуємо в якому форматі даних ми передаємо об'єк для збереження на сервер
                'Content-Type': 'application/json'
            }),
        })
            .then(response => response.json())  //виконується звернення до сервера
    }

}

function sendAppealToServer(data) {
    let url = 'http://localhost:3012/appeals';  //адреса сервера, до якого будуть подаватися запити

    postRequest(url, data)
        .then(data => console.log(data))
        .catch(error => console.error(error));

    function postRequest(url, data) {
        return fetch(url, {
            credentials: 'same-origin',
            method: 'POST',
            body: JSON.stringify(data),
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
        })
            .then(response => response.json())
    }

}

class NewsObject {
    constructor(title, text) {
        this.title = title;
        this.text = text;
    }
}

class AppealObject {
    constructor(appeal) {
        this.appeal = appeal;
    }
}


