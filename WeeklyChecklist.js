function getValues(){ 
  var recievedData = window.location.href
   console.log(recievedData);
   
}

function whenLoad(){
  getValues();
  showTime();
  date = new Date();
  renderDates();
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
var endDate = new Date("Mar 1, 2022 10:00:00").getTime();
var startDate = new Date("Jun 20, 2020, 10:00:00").getTime();

// Get todays date and time
var now = new Date().getTime();

// Find the distance between now and the count down date
var distanceWhole = endDate - startDate;
var distanceLeft = endDate - now;

// Time calculations for minutes and percentage progressed
var minutesLeft = Math.floor(distanceLeft / (1000 * 60));
var minutesTotal = Math.floor(distanceWhole / (1000 * 60));
var result = Math.floor(((minutesTotal - minutesLeft) / minutesTotal) * 100);
console.log(result);

    setInterval(addFrame(result), 100);
  
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
  console.log("date changed "+para);
  if (para == 'prev'){
      date.setMonth(date.getMonth() - 1);
      renderDates();
  }
  else if (para == 'next'){
      date.setMonth(date.getMonth() + 1);
      renderDates();
  }
}

function renderDates(){
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
  document.getElementsByClassName("datesOfMonth")[0].innerHTML = cell;
}

function addFrame(result) {
  if (result < 100) {
      progress.style.width = result + "%";
      progress.innerHTML = result + "%";
  }
  console.log("testProgressBar");
}