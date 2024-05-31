var bookmarkName = document.getElementById('bookmarkName')
var bookmarkURL = document.getElementById('bookmarkURL')
var submitBtn = document.getElementById('submitBtn')
var tableContent = document.getElementById('tableContent')
var closeBtn = document.getElementById('closeBtn')
var boxInfo = document.getElementById('boxInfo')


var sitesArr;
if (localStorage.getItem('table') == null) {
    sitesArr = []
}
else {
    sitesArr = JSON.parse(localStorage.getItem('table'))
    display()
}


submitBtn.onclick = function () {
    if (nameRegex.test(bookmarkName.value) == true && urlRegex.test(bookmarkURL.value) == true)
        {
            addSite()  
        }
    else
        {
            boxInfo.classList.replace('d-none','d-block')
        }
}


function addSite() {
    var sitesObj = {
        bookmarkN: bookmarkName.value,
        bookmarkU: bookmarkURL.value,
    }
    sitesArr.push(sitesObj)
    localStorage.setItem('table', JSON.stringify(sitesArr))
    clearSite()
    display()
}

function clearSite() {
    bookmarkName.value = null;
    bookmarkURL.value = null;
}

function display() {
    var box = ''
    for (var i = 0; i < sitesArr.length; i++)
        box += `<tr>
    <td>${i + 1}</td>
    <td>${sitesArr[i].bookmarkN}</td>              
    <td>
      <button class="btn btn-visit bg-success " >
      <i class="fa-solid fa-eye pe-2"></i>
      <a target="_blank" class="text-decoration-none text-black" href="${sitesArr[i].bookmarkU}">Visit</a>
      </button>
    </td>
    <td>
      <button class="btn btn-delete pe-2 bg-danger" onclick="deleteFun(${i})" >
        <i class="fa-solid fa-trash-can"></i>
        Delete
      </button>
    </td>
</tr>`
    tableContent.innerHTML = box
}


function deleteFun(index) {
    sitesArr.splice(index, 1)
    localStorage.setItem('table', JSON.stringify(sitesArr))
    display()
}


var nameRegex = /^\w{3,}(\s)*(\w)*$/
var urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/

bookmarkName.oninput = function () {

    if (nameRegex.test(bookmarkName.value) == true) {
        bookmarkName.classList.add('is-valid')
        bookmarkName.classList.remove('is-invalid')
    }
    else {
        bookmarkName.classList.add('is-invalid')
        bookmarkName.classList.remove('is-valid')
    }
}
bookmarkURL.oninput = function () {

    if (urlRegex.test(bookmarkURL.value) == true) {
        bookmarkURL.classList.add('is-valid')
        bookmarkURL.classList.remove('is-invalid')
    }
    else {
        bookmarkURL.classList.add('is-invalid')
        bookmarkURL.classList.remove('is-valid')
    }
}


closeBtn.onclick = function () {
    boxInfo.classList.replace('d-block', 'd-none')
}






