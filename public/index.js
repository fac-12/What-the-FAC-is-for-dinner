/*eslint-disable*/

var table = document.getElementById('table');
var loginModal = document.getElementById('loginModal');
var loginButton = document.getElementById('login-button');
var logoutButton = document.getElementById('logout-button');
var closeLogIn = document.getElementById('closeLogin');
var signUpModal = document.getElementById('signUpModal');
var signUpButton = document.getElementById('signup-button');
var closeSignUp = document.getElementById('closeSignUp');
var userInfo = document.getElementById('userInfo');
var formSection = document.getElementById('form-section')

logoutButton.addEventListener("click", function(){
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 302){
      location.reload();
    }
  }
  xhr.open("GET", "/logOut", true);
  xhr.send();
})

loginButton.addEventListener("click", function(){
  loginModal.style.display = "block";
})

closeLogIn.addEventListener("click", function(){
  loginModal.style.display= "none";
})

window.addEventListener("click", function(e){
  if(e.target == loginModal){
    loginModal.style.display = "none";
  }
})

signUpButton.addEventListener("click", function(){
  signUpModal.style.display = "block";
})

closeSignUp.addEventListener("click", function(){
  signUpModal.style.display= "none";
})

window.addEventListener("click", function(e){
  if(e.target == signUpModal){
    signUpModal.style.display = "none";
  }
})


var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200){
    var allDishes = JSON.parse(xhr.responseText);
    renderData(allDishes);
  }
}
xhr.open("GET", "/getDishes", true);
xhr.send();

var renderData = function(responseObj){
  while(table.childNodes.length > 2){
    table.removeChild(table.lastChild);
  }
  responseObj.forEach(function(obj){
    var newRow = document.createElement('tr');
    newRow.classList = "table-row";
    table.appendChild(newRow);

    var person = document.createElement('td');
    var gitter = document.createElement('td');
    var dish = document.createElement('td');
    var diet = document.createElement('td');
    var binCell = document.createElement('td');
    var binIcon = document.createElement('i');
    binIcon.classList = 'fa fa-trash';
    binIcon.style.color = "grey";
    binCell.appendChild(binIcon);

    diet.textContent = obj.diet;
    dish.textContent = obj.dishes;
    gitter.textContent = obj.gitter;
    person.textContent = obj.users;

    newRow.appendChild(person);
    newRow.appendChild(gitter);
    newRow.appendChild(dish);
    newRow.appendChild(diet);
    newRow.appendChild(binIcon);

  });

  var userCheckXhr = new XMLHttpRequest();

  userCheckXhr.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 200){
        var userData = JSON.parse(userCheckXhr.responseText);
        displayUser(userData);
      }
  }
  userCheckXhr.open("GET", "/userCheck", true);
  userCheckXhr.send();
}

var displayUser = function(responseObj){
  var fromRes = document.createTextNode(responseObj.username);
  userInfo.appendChild(fromRes);
  userInfo.style.display = "block";
  loginButton.style.display = "none";
  signUpButton.style.display = "none";
  formSection.style.display = "flex";
  logoutButton.style.display = "block";

  var deleteHeader = document.getElementById('deleteHeader');

  var tableRowArray = Array.from(document.getElementsByClassName('table-row'));

  tableRowArray.forEach(function(row) {
    if (row.childNodes[1].textContent === responseObj.username) {
      row.childNodes[4].style.color = "black";
      row.childNodes[4].style.cursor = "pointer";
      row.childNodes[4].addEventListener('click', deleteAJAX);
    };
  });

}

var deleteAJAX = function(event) {
  var row = event.target.parentNode;
  var dishObj = {
    name: row.childNodes[0].textContent,
    gitterhandle: row.childNodes[1].textContent,
    dish: row.childNodes[2].textContent,
    dietary: row.childNodes[3].textContent.split(', '),
  };

  var deleteXHR = new XMLHttpRequest();

  deleteXHR.onreadystatechange = function() {
    if(this.readyState == 4 && this.status == 302){
      location.reload();
    }
  }

  deleteXHR.open('POST', '/deleteDish', true);
  deleteXHR.send(JSON.stringify(dishObj));
}
