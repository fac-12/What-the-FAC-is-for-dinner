var xhr = new XMLHttpRequest();

xhr.onreadystatechange = function() {
  if(this.readyState == 4 && this.status == 200){
    var obj = JSON.parse(xhr.responseText);
  }
}
xhr.open("GET", "/getDishes", true);
xhr.send();
