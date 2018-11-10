'use strict';

var useLocalStorage = false;

function sendDataToServer() {
}

window.addEventListener('load', function () {
    alert("Page is loaded!");

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    function updateOnlineStatus(event) {

        if (event.type === 'online') {
            if (localStorage.getItem('news') === null) {
                console.log('no item to load')
            } else {
                var unsavedItem = localStorage.getItem('news');
                sendDataToServer(unsavedItem);
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

    if (isTitleValidate && isNewsValidate) {
        if (!isOnline()) {

        } else {
            var newsObject = {
                "newsTitle": elements.title.value,
                "newsText": elements.text.value
            };

            if (useLocalStorage) {
                saveNewsToLocalStorage(newsObject)
            } else {
                saveNewsToIndexedDB(newsObject);
                document.getElementById("newsForm_id").reset();
            }
        }
    }

    function saveNewsToIndexedDB(newsObj) {
        var db;
        console.log('News is saved to IndexedDB');
        var openRequest = indexedDB.open("wimbledon_db", 2);
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
        if (!isOnline()) {

        } else {
            var fansAppeal = elements.message_text.value;
            if (useLocalStorage) {
                saveFansToLocalStorage(fansAppeal)
            } else {
                saveFansToIndexedDB(fansAppeal);
                document.getElementById("fan_appeal_form_id").reset();
            }
        }
    }
}


function saveFansToIndexedDB(newsObj) {
    var db;
    alert('saveAppealToIndexedDB');
    var openRequest = indexedDB.open("wimbledon_db", 2);
// запускається лише раз при створенні БД і щоразу при оновленні весії БД
    openRequest.onupgradeneeded = function (e) { //e - event ф-ція, яка вертає івент (об'єкт БД, з якої ми можемо тягнути резльтат)
        var thisDB = e.target.result;

        if (!thisDB.objectStoreNames.contains("fans")) {
            thisDB.createObjectStore("fans", {autoIncrement: true}); //object store - сворити таблицю (news - назва таблиці)
        }

        console.log('onupgradeneeded')
    };

    openRequest.onsuccess = function (e) { // виконується, якщо з'єднаня до БД є успішним
        alert("IndexedDB is running successfully"); // івент вертає БД

        db = e.target.result;


        var transaction = db.transaction(["fans"], "readwrite");
        var store = transaction.objectStore("fans"); // звертаємось таблиці з назвою news

        var request = store.add(newsObj); // додає об'єкт в бд

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



