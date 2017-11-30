/*eslint-disable*/

var table = document.getElementById('table');

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200){
    var allDishes = JSON.parse(xhr.responseText);
    renderData(allDishes);
    }
  else {
    // alert("Sorry, something went wrong!");
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

    if ((newRow.previousSibling.lastChild.previousSibling.textContent) && newRow.previousSibling.lastChild.previousSibling.textContent === obj.dishes) dish.textContent = "";
    else dish.textContent = obj.dishes;

    if ((newRow.previousSibling.firstChild.nextSibling.textContent) && newRow.previousSibling.firstChild.nextSibling.textContent === obj.gitter) gitter.textContent = "";
    else gitter.textContent = obj.gitter;

    if ((newRow.previousSibling.firstChild.textContent) && newRow.previousSibling.firstChild.textContent === obj.users) person.textContent = "";
    else person.textContent = obj.users;

    newRow.appendChild(person);
    newRow.appendChild(gitter);
    newRow.appendChild(dish);
    newRow.appendChild(diet);

  })
}
