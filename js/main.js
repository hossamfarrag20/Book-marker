var inName = document.getElementById('exampleFormControlInput1');
var inUrl = document.getElementById('exampleFormControlInput2');
var bton = document.getElementsByClassName('submition');
var btonupdate = document.getElementById('button-update');
var displayArea = document.getElementById('display-area');
var link = document.getElementById('link');


var bookmarksValue = [];
if (localStorage.getItem('bookmarksValue') != null) {
    bookmarksValue = JSON.parse(localStorage.getItem('bookmarksValue'));
    displayValue();
};


// =================Main Function================
function getValue() {
    var BookmarksContainer = {
        name: inName.value,
        webUrl: inUrl.value
    };


    if (BookmarksContainer.name != "" && BookmarksContainer.webUrl != "") {
        // ==================Test Name is Excit Function================
        var excite = bookmarksValue.some(function (nameEx) {
            return nameEx.name.toLowerCase() == BookmarksContainer.name.toLocaleLowerCase();
        });

        if (!excite) {
            if (isValidURL(BookmarksContainer.webUrl)) {
                bookmarksValue.push(BookmarksContainer);
                localStorage.setItem('bookmarksValue', JSON.stringify(bookmarksValue));
                displayValue();
                clearIn();
            } else {
                alert("The Url Is not Valid");
            }
        }
        else {
            alert('Name Already Excite');
        }
    } else {
        alert("Please Be Sure To not Leave Any Empty Input");
    }

}

// ==================Test Url Function================
function isValidURL(urlString) {
    try {
        new URL(urlString);
        return true;
    } catch (e) {
        return false;
    }
}


// =================Clear Function================
function clearIn() {
    inName.value = "";
    inUrl.value = "";
}


// =================Display Function================
function displayValue() {
    var container = ``;
    for (var i = 0; i < bookmarksValue.length; i++) {
        container = container +
            `<tr>
                        <td>
                            <p class="text-center  mb-0 mt-1">${i + 1}</p>
                        </td>
                        <td>
                            <p class="text-center mb-0 mt-1">${bookmarksValue[i].name}</p>
                        </td>
                        <td>
                            <div class="text-center mb-0">
                                <a href="${bookmarksValue[i].webUrl}" id="link" target = _blank  type="button" class="btn btn-info">
                                    <span class="fa fa-eye ico"></span>
                                    <span class = "submition">Visit</span>
                                </a>
                            </div>
                        </td>
                        <td>
                            <div class="text-center mb-0">
                                <button type="button" id = "deletbutton" onclick="deleteButton(${i})" class="btn btn-danger">
                                    <span class="fa fa-trash ico"></span>
                                    <span class = "submition">Delete</span>
                                </button>
                            </div>
                        </td>
                        <td>
                            <div class="text-center mb-0">
                                <button type="button" id = "updatebutton" onclick="updateButton(${i})" class="btn btn-warning">
                                    <span class="fa fa-edit ico"></span>
                                    <span class = "submition">Update</span>
                                </button>
                            </div>
                        </td>
                    </tr>`;
    }

    displayArea.innerHTML = container;
}

// =================Deleting Function================
function deleteButton(idnum) {
    bookmarksValue.splice(idnum, 1);
    localStorage.setItem('bookmarksValue', JSON.stringify(bookmarksValue));
    displayValue();
};

// =================Return value Function================
function updateButton(idret) {
    inName.value = bookmarksValue[idret].name;
    inUrl.value = bookmarksValue[idret].webUrl;
    btonupdate.innerHTML = `<button type="submit" onclick="updateTheReturnValue(${idret})" class="btn btn-primary px-4 submition">Update</button>`;
};


// =================Update Function================
function updateTheReturnValue(idretupdate) {
    var BookmarksContainer = {
        name: inName.value,
        webUrl: inUrl.value
    }

    if (BookmarksContainer.name != "" && BookmarksContainer.webUrl != "") {
        // ==================Test Name is Excit Function================
        var excite = bookmarksValue.some(function (nameEx, index) {
            return index !== idretupdate && nameEx.name.toLowerCase() == BookmarksContainer.name.toLocaleLowerCase();
        });

        if (!excite) {
            if (isValidURL(BookmarksContainer.webUrl)) {
                bookmarksValue.splice(idretupdate, 1, BookmarksContainer);
                localStorage.setItem('bookmarksValue', JSON.stringify(bookmarksValue));
                displayValue();
                clearIn()
                btonupdate.innerHTML = `<button type="submit" onclick="getValue()" class="btn btn-danger px-4 submition">Submit</button>`;
            } else {
                alert("The Url Is not Valid");
            }
        }
        else {
            alert('Name Already Excite');
        }
    } else {
        alert("Please Be Sure To not Leave Any Empty Input");
    }

};


// =================Search Function================
var searchin = document.getElementById('exampleFormControlInput3');
function searchon() {
    var cut = '';
    var container = ``;
    cut = searchin.value.toLocaleLowerCase();

    for (var i = 0; i < bookmarksValue.length; i++) {
        if (bookmarksValue[i].name.toLowerCase().includes(cut)) {
            container = container +
                `     <tr>
                            <td>
                                <p class="text-center mb-0 mt-1">${i + 1}</p>
                            </td>
                            <td>
                                <p class="text-center mb-0 mt-1">${bookmarksValue[i].name}</p>
                            </td>
                            <td>
                                <div class="text-center mb-0">
                                    <a href="${bookmarksValue[i].webUrl}" id="link" target = _blank  type="button" class="btn btn-info">
                                        <span class="fa fa-eye ico"></span>
                                        <span class = "submition">Visit</span>
                                    </a>
                                </div>
                            </td>
                            <td>
                                <div class="text-center mb-0">
                                    <button type="button" id = "deletbutton" onclick="deleteButton(${i})" class="btn btn-danger">
                                        <span class="fa fa-trash ico"></span>
                                        <span class = "submition">Delete</span>
                                    </button>
                                </div>
                            </td>
                            <td>
                                <div class="text-center mb-0">
                                    <button type="button" id = "updatebutton" onclick="updateButton(${i})" class="btn btn-warning">
                                        <span class="fa fa-edit ico"></span>
                                        <span class = "submition">Update</span>
                                    </button>
                                </div>
                            </td>
                        </tr>`;
        }

    }

    displayArea.innerHTML = container;
}
