/*eslint-disable*/

var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200){
    var obj = JSON.parse(xhr.responseText);
    console.log(obj);
  }
}
xhr.open("GET", "/getDishes", true);
xhr.send();
