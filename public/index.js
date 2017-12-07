/*eslint-disable*/

var table = document.getElementById('table');
var loginModal = document.getElementById('loginModal');
var loginButton = document.getElementById('login-button');
var logoutButton = document.getElementById('logout-button');
var closeLogIn = document.getElementById('closeLogin');
var signUpModal = document.getElementById('signUpModal');
var signUpButton = document.getElementById('signup-button');
var closeSignUp = document.getElementById('closeSignUp');
var nameinput = document.getElementById('nameinput');
var messages = document.getElementById('messages');
var originalpassword = document.getElementById('originalpassword');
var confirmpassword = document.getElementById('confirmpassword');
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
  console.log(e.target.value);
  console.log(originalpassword.value);
  if(e.target.value === originalpassword.value) {
      e.target.className = "passwordMatch";
  } else {
    e.target.className = "passwordNotMatch";
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
    table.appendChild(newRow);

    var person = document.createElement('td');
    var gitter = document.createElement('td');
    var dish = document.createElement('td');
    var diet = document.createElement('td');

    diet.textContent = obj.diet;
    dish.textContent = obj.dishes;
    gitter.textContent = obj.gitter;
    person.textContent = obj.users;

    newRow.appendChild(person);
    newRow.appendChild(gitter);
    newRow.appendChild(dish);
    newRow.appendChild(diet);

  })
}

var userCheckXhr = new XMLHttpRequest();

userCheckXhr.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200){
      var userData = JSON.parse(userCheckXhr.responseText);
      console.log(userData);
      window.localStorage.add
      displayUser(userData);
    }
}
userCheckXhr.open("GET", "/userCheck", true);
userCheckXhr.send();

var displayUser = function(responseObj){
  var fromRes = document.createTextNode(responseObj.username);
  userInfo.appendChild(fromRes);
  userInfo.style.display = "block";
  loginButton.style.display = "none";
  signUpButton.style.display = "none";
  formSection.style.display = "flex";
  logoutButton.style.display = "block";
}
