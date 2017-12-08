/*eslint-disable*/

var table = document.getElementById('table');
var loginModal = document.getElementById('loginModal');
var loginButton = document.getElementById('login-button');
var logoutButton = document.getElementById('logout-button');
var closeLogIn = document.getElementById('closeLogin');
var signUpModal = document.getElementById('signUpModal');
var signUpForm = document.getElementById('signUpForm');
var signUpButton = document.getElementById('signup-button');
var modalSignUpButton = document.getElementById('modalSignUpButton');
var closeSignUp = document.getElementById('closeSignUp');
var nameinput = document.getElementById('nameinput');
var messages = document.getElementById('messages');
var originalpassword = document.getElementById('originalpassword');
var confirmpassword = document.getElementById('confirmpassword');
var userInfo = document.getElementById('userInfo');
var formSection = document.getElementById('form-section');
var title = document.getElementById('title');
var addDishButton = document.getElementById('addDish-button');
var addDishModal = document.getElementById('dish-modal');


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
  } else if (e.target == addDishModal) {
      addDishModal.style.display = "none";
  } else if(e.target == signUpModal){
    signUpModal.style.display = "none";
  }
})

signUpButton.addEventListener("click", function(){
  signUpModal.style.display = "block";
})

addDishButton.addEventListener("click", function() {
  addDishModal.style.display = "block";
});



modalSignUpButton.addEventListener("click", function() {
  console.log('submitted');
  while(messages.firstChild){
    messages.removeChild(messages.firstChild);
  }
});

closeSignUp.addEventListener("click", function(){
  signUpModal.style.display= "none";
});

nameinput.addEventListener('invalid', function(e){
  e.preventDefault();
  while(messages.firstChild){
    messages.removeChild(messages.firstChild);
      }
  var p = document.createElement('p');
  p.textContent = 'Please enter only letters for your name';
  messages.appendChild(p);
});


confirmpassword.addEventListener('keyup', function(e){
  if(e.target.value === originalpassword.value) {
      e.target.className = "passwordMatch";
  } else {
    e.target.className = "passwordNotMatch";
  }
})

signUpForm.addEventListener("submit", function(e){
  if (originalpassword.value !== confirmpassword.value){
    e.preventDefault();
    while(messages.firstChild){
      messages.removeChild(messages.firstChild);
    }
  var p = document.createElement('p');
  p.textContent = 'Passwords do not match!';
  messages.appendChild(p);
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
        window.localStorage.add
      }
  }
  userCheckXhr.open("GET", "/userCheck", true);
  userCheckXhr.send();
}

var displayUser = function(responseObj){
  var linebreak = document.createElement('br');
  title.textContent = 'What the FAC is for dinner,';
  title.appendChild(linebreak);
  var username = document.createTextNode(responseObj.username + '?');
  title.appendChild(username);
  userInfo.style.display = "block";
  loginButton.style.display = "none";
  signUpButton.style.display = "none";
  formSection.style.display = "flex";
  logoutButton.style.display = "inline";
  addDishButton.style.display = "inline";

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
