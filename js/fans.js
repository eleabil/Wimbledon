
var useLocalStorage = false;

window.addEventListener('load', function () {
    getData()

});

function getData() {
    alert("getData");
    if (isOnline()) {
        getAppealFromServer()
    }
    else {
        if (useLocalStorage) {
            getFansFromLocalStorage()
        } else {
            getAllFansFromIndexedDb()
        }
    }
}


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

function getAllFansFromIndexedDb() {

     var db;
     var openRequest = indexedDB.open("wimbledon_db", 3);

/*     openRequest.onupgradeneeded = function (e) {
         var thisDb = e.target.result;

         if (!thisDb.objectStoreNames.contains("fans")) {
             thisDb.createObjectStore("fans", {autoIncrement: true});
         }
         alert('onupgradeneeded')
     };*/

    openRequest.onsuccess = function (e) {
        alert("Running indexedDb success");
        db = e.target.result;

        var transaction = db.transaction(["fans"], "readonly");
        transaction.objectStore("fans").openCursor().onsuccess = function (e) {
            var cursor = e.target.result;

            var template = document.getElementById("appeals");

            if (cursor) {

               // for (var i in cursor.value) {
                    var fans = cursor.value;
                    // var template = document.getElementById("appeals");
                    template.innerHTML += "<div class=\"card col-sm-12 col-lg-12 mt-3 fan-appeal-card\" id=\"appeal\">\n" +
                        "                <div class=\"card-body fanbox-border\" >\n" +
                        "                    <p class=\"card-text\">" + fans + "</p>\n" +
                        "                    <div class=\"row\">\n" +
                        "                        <div class=\"col-md-3\">" + getCurrentDate() + "</div>\n" +
                        "                        <div class=\"col-md-8 col-md-offset fan-rightstr\">Username</div>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "            </div>";

                //}
                cursor.continue();
            }
        }

    };

    openRequest.onerror = function (e) {
        alert('Running indexedDb error: ' + e)
    };

}






function getAppealFromServer() {
    let url = 'http://localhost:3012/appeals';
    fetch(url)
        .then(response => response.json())
        .then(data => {

            for (i in data) {
                var template = document.getElementById("appeals");
                template.innerHTML += "<div class=\"card col-sm-12 col-lg-12 mt-3 fan-appeal-card\" id=\"appeal\">\n" +
                    "                <div class=\"card-body fanbox-border\" >\n" +
                    "                    <p class=\"card-text\">" + data[i].appeal + "</p>\n" +
                    "                    <div class=\"row\">\n" +
                    "                        <div class=\"col-md-3\">" + getCurrentDate() + "</div>\n" +
                    "                        <div class=\"col-md-8 col-md-offset fan-rightstr\">Username</div>\n" +
                    "                    </div>\n" +
                    "                </div>\n" +
                    "            </div>";

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