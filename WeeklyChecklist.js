var keys_values = [];
var i;
var startValue = "";
var endValue = "";
function whenLoad(){
  var recievedData = window.location.href
  console.log(recievedData);
  var separator = recievedData.split("?"); //url is split by qns mark
  keys_values = separator[1].split("&"); //url is split by &
  for (i = 0; i<keys_values.length; i++){
    var values = keys_values[i].split("="); //get values by splitting via "="
    console.log(values);
    if (i == 6){
      startValue = values[1];
      startValue = startValue.slice(0,10);
      console.log(startValue);
    }
    if (i == 7){
      endValue = values[1];
      endValue = endValue.slice(0,10);
      console.log(endValue);
    }
  }
  showTime();
  date = new Date();
  renderDates('both');
  document.getElementById("defaultOpen").click();

  var myNodelist = document.getElementsByTagName("LI");
  var i;
  for (i = 0; i < myNodelist.length; i++) {
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    myNodelist[i].appendChild(span);
}
  close = document.getElementsByClassName("close");
  var i;
  for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
          var div = this.parentElement;
          div.style.display = "none";
      }
  }

  var list = document.querySelector('ul');
  list.addEventListener('click', function(ev) {
      if (ev.target.tagName === 'LI') {
          ev.target.classList.toggle('checked');
      }
  }, false);

  //progress bar:
var slider = document.getElementById("progressBar");
var progress = document.getElementById("progress");

// Set start and end date
var endDate = new Date(endValue);
var startDate = new Date(startValue);
console.log(startDate);
console.log(endDate);
// Get todays date and time
var now = new Date();

// Find the distance between now and the count down date
var distanceWhole = endDate - startDate;
var distanceLeft = endDate - now;
console.log(distanceWhole);
// Time calculations for minutes and percentage progressed
var minutesLeft = Math.floor(distanceLeft / (1000 * 60));
var minutesTotal = Math.floor(distanceWhole / (1000 * 60));
var result = Math.floor(((minutesTotal - minutesLeft) / minutesTotal) * 100);
console.log(result);

    setInterval(addFrame(result), 100);
  template();
} 
var session_seconds = "10";
var session_minutes = 0;
function template() {
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;
}

function showTime(){
  var date = new Date();
  var h = date.getHours(); //0-23
  var m = date.getMinutes(); //0-59
  var s = date.getSeconds(); //0-59
  var session = "AM";

  if (h == 0){
      h = 12;
  }
  if (h>12){
      h = h - 12;
      session = "PM"
  }
  if (h == 12 & s>0){
      session = "AM"
  }

  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " " + session; 
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent  = time;

  setTimeout(showTime, 1000);
}

function openFeature(evt, featureName) {
  console.log("openFeature");
  var i, tabcontent, tablinks;
  var tinyCalendar = document.getElementById("tinyCalendar");
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(featureName).style.display = "block";
  evt.currentTarget.className += " active";
  //to delete tiny calendar when clicked on C.tab
  if (featureName == 'Calendar'){
    tinyCalendar.style.display = "none";
    for (i = 0; i<keys_values.length; i++){
      var recievedData = window.location.href;
      var values = keys_values[i].split("="); //get values by splitting via "="
      
    }
  }
  else{
    tinyCalendar.style.display = "block";
  }
  //send data to focus when clicked on focus tab
  if (featureName == 'Focus'){
    var ULTasks = document.getElementById("myUL");
    var LItasks = document.getElementsByTagName("li");
    var dropDown = document.getElementById("dropdown");
    var dropDownLength = dropDown.children.length;
    var i,j;
    for ( j = dropDownLength-1; j >= 0; j--){
      console.log(dropDownLength);
      dropDown.removeChild(dropDown.children[j]); 
    }
    for (i = 0; i < LItasks.length; i++){
      var option = document.createElement('option');
      option.innerText = LItasks[i].innerText;
      // console.log(LItasks[i].innerText);
      dropDown.appendChild(option);
      // console.log(dropDown);
    }
  }
}

function newElement() {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === '') {
      alert("You must write something!");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";
  
    var span = document.createElement("SPAN");
    var txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
  
    for (i = 0; i < close.length; i++) {
      close[i].onclick = function() {
        var div = this.parentElement;
        div.style.display = "none";
      }
    }
  }

function changeDate(para){
  var identifier = para.split(' ');
  var cal = identifier[0];
  var direction = identifier[1];
  if (direction == 'prev'){
      date.setMonth(date.getMonth() - 1);
      renderDates(cal);
  }
  else if (direction == 'next'){
      date.setMonth(date.getMonth() + 1);
      renderDates(cal);
  }
}

function renderDates(cal){
  console.log("dates render");
  date.setDate(1);
  var day = date.getDay();
  var lastDate = new Date(
      date.getFullYear(),
      date.getMonth() + 1,
      0
  ).getDate();
  var prevDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      0
  ).getDate(); 
  var today = new Date();
  console.log(today);
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  document.getElementById("currDate").innerHTML = date.toDateString();
  document.getElementById("month").innerHTML = months[date.getMonth()]

  var cell = "";
  for (x = day; x>0; x--){
      cell+= "<div class = 'prevDate'>" + (prevDate - x + 1)+ "</div>";
  }
  for (i = 1; i <= lastDate; i++){
      if (i == today.getDate() && date.getMonth() == today.getMonth()){
          cell += "<div class = 'today'>" + i + "</div>"
      }
      else{
          cell += "<div>" + i + "</div>"
      }
  }
  if(cal == 'tiny'){
    document.getElementsByClassName("datesOfMonth tiny")[0].innerHTML = cell;
  }
  else if(cal == 'big'){
    document.getElementsByClassName("datesOfMonth big")[0].innerHTML = cell;
  }
  else{
    document.getElementsByClassName("datesOfMonth tiny")[0].innerHTML = cell;
    document.getElementsByClassName("datesOfMonth big")[0].innerHTML = cell;
  }

}

function addFrame(result) {
  if (result < 100) {
      progress.style.width = result + "%";
      progress.innerHTML = result + "%";
  }
  console.log("testProgressBar");
}

