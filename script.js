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
    alert("saved to local storage");
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

        } else {
            var fansAppeal = elements.message_text.value;
            saveFansToLocalStorage(fansAppeal);
            document.getElementById("fan_appeal_form_id").reset();
        }
    }
}

function saveFansToLocalStorage(fansObject) {
    console.log(fansObject);
    localStorage.setItem('fans', fansObject);
    alert("saved to local storage");
}

function isOnline() {
    return window.navigator.onLine;
}



