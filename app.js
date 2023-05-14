function addTodo() {

    if (!todoInput.value) {
        return
    }

    var liElement = document.createElement("li"); // create element
    //assign value
    liElement.className = "list-group-item bg-info d-flex align-items-center justify-content-between"

    var liText = document.createTextNode(todoInput.value) // create li text

    liElement.appendChild(liText);


    var div = document.createElement("div");


    // edit btn
    var editBtn = document.createElement("button");
    var editBtnText = document.createTextNode("Edit");
    editBtn.appendChild(editBtnText);
    editBtn.className = "btn btn-secondary m-1"
    editBtn.setAttribute("onclick", "editBtn(this)")


    //delet btn
    var delBtn = document.createElement("button");
    var delText = document.createTextNode("Delete");
    delBtn.appendChild(delText);
    delBtn.className = "btn btn-danger m-1";
    delBtn.setAttribute("onclick", "del(this)")




    div.appendChild(editBtn);
    div.appendChild(delBtn);


    liElement.appendChild(div);

    ulParent.append(liElement);
    todoInput.value = ""

}

function deleteAll() {
    ulParent.innerHTML = "";
}


function editBtn(elem) {
    var li = elem.parentNode.parentNode;
    var placeHolder = li.firstChild.nodeValue;
    var editValue = prompt("Edit Value", placeHolder);

    li.firstChild.nodeValue = editValue;

}

function del(element) {
    element.parentNode.parentNode.remove()

}