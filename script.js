'use strict';

// lab 8 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

function sendDataToServer() {
}

window.addEventListener('load', function () {
    console.log("page is loaded!");

    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);

    function updateOnlineStatus(event) {

        if (event.type === 'online') {
            if (localStorage.getItem('news') === null) {
                console.log('there is no news to load')
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
        //      return false;
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
        if (isOnline()) {

        } else {
            var newsObject = {
                "newsTitle": document.newsForm.title.value,
                "newsText": elements.text.value
            };
            saveNewsToLocalStorage(newsObject);
        }
    }
}

function saveNewsToLocalStorage(newsObject) {
    console.log(newsObject);
    localStorage.setItem('news', JSON.stringify(newsObject));
    console.log("saved to local storage");
    document.getElementById("newsForm_id").reset();
}

// image validation
function validateImage() {

    if (document.imageForm.file.value === "") {
        alert("Please add image!");
        document.imageForm.file.focus();

        return false;
    }
    alert('Your image is added!');
    return (true);
}


// Fan appeal
function addFans() {

    var elements = document.forms["fan_appeal_form"].elements;
    var isFansValidate = false;

    if (document.fan_appeal_form.message_text.value.trim() === "") {
        alert("Please add text!");
        document.fan_appeal_form.message_text.focus();
        document.fan_appeal_form.message_text.style.border = "1px solid red";
    } else {
        isFansValidate = true;

    }

    if (isFansValidate) {
        if (isOnline()) {
            addFansIfOnline();
        } else {
            var fansAppeal = elements.message_text.value;
            saveFansToLocalStorage(fansAppeal);
            document.getElementById("fan_appeal_form_id").reset();
        }
    }
}

function saveFansToLocalStorage(fansObject) {
    console.log("fansObject: " + fansObject);
    localStorage.setItem('fans', fansObject);
    console.log("saved to local storage");
}

function isOnline() {
    return window.navigator.onLine;
}

function addFansIfOnline() {
    var fail = false;
    var text = document.forms["fan_appeal_form"]["message_text"].value;
    var currentDate = getCurrentDate();
    if (text === "" || text === " ") {
        fail = true
    }
    if (fail) {
        alert("You have not added the text!");

    } else {

        var template = document.getElementById("appeals");
        template.innerHTML += "<div class=\"card col-sm-12 col-lg-12 mt-3 fan-appeal-card\" id=\"appeal\">\n" +
            "                <div class=\"card-body fanbox-border\" >\n" +
            "                    <p class=\"card-text\">" + text + "</p>\n" +
            "                    <div class=\"row\">\n" +
            "                        <div class=\"col-md-3\">" + currentDate + "</div>\n" +
            "                        <div class=\"col-md-8 col-md-offset fan-rightstr\">Username</div>\n" +
            "                    </div>\n" +
            "                </div>\n" +
            "            </div>";
        var input_form = document.forms["fan_appeal_form"];
        input_form.reset();

        saveFansToLocalStorage(text);
    }
    return false;
}


