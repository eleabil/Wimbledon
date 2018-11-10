var useLocalStorage = false;

window.addEventListener('load', function () {
    if (useLocalStorage) {
        getFansFromLocalStorage()
    } else {
        getAllFansFromIndexedDb()
    }

});

window.addEventListener('load', function () {
    getFansFromLocalStorage()
});

function getFansFromLocalStorage() {

    if (localStorage.getItem('fans') === null) {
        //console.log('local storage is empty');
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

        document.getElementById("fan_appeal_form_id").reset();

    }
}

function getCurrentDate() {
    var currentdate = new Date();
    var dd = currentdate.getDate();
    var mm = currentdate.getMonth() + 1;
    var yyyy = currentdate.getFullYear();

    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var datetime = dd + '.' + mm + '.' + yyyy;

    return datetime
}

function getAllFansFromIndexedDb() {
    var db;
    var openRequest = indexedDB.open("wimbledon_db", 2);

    openRequest.onupgradeneeded = function (e) {
        var thisDB = e.target.result;

        if (!thisDB.objectStoreNames.contains("fans")) {
            thisDB.createObjectStore("fans", {autoIncrement: true});
        }

        alert('onupgradeneeded')
    };

    openRequest.onsuccess = function (e) {
        alert("Running indexedDb success");
        db = e.target.result;

        var s = "";

        db.transaction(["fans"], "readonly").objectStore("fans").openCursor().onsuccess = function (e) {
            var cursor = e.target.result;

            if (cursor) {

                for (var i in cursor.value) {
                    var fans = cursor.value;
                    var template = document.getElementById("appeals");
                    template.innerHTML += "<div class=\"card col-sm-12 col-lg-12 mt-3 fan-appeal-card\" id=\"appeal\">\n" +
                        "                <div class=\"card-body fanbox-border\" >\n" +
                        "                    <p class=\"card-text\">" + fans + "</p>\n" +
                        "                    <div class=\"row\">\n" +
                        "                        <div class=\"col-md-3\">" + getCurrentDate() + "</div>\n" +
                        "                        <div class=\"col-md-8 col-md-offset fan-rightstr\">Username</div>\n" +
                        "                    </div>\n" +
                        "                </div>\n" +
                        "            </div>";

                    document.getElementById("fan_appeal_form_id").reset();
                }


                cursor.continue();
            }
        }

    };

    openRequest.onerror = function (e) {
        alert('Running indexedDb error: ' + e)
    };

}