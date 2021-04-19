const PHASE_NUMBER = 6;//how many phases in an EPQ project
var keys_values = [];  
var startValue = "";   //starting date value
var endValue = "";    //ending date value
displayDate = new Date();   //the displaying date for calendar

/*
things to do after all HTML elements are loaded
*/
function whenLoad(){
  var recievedData = window.location.href;
  console.log(recievedData);
  var separator = recievedData.split("?"); //url is split by qns mark
  keys_values = separator[1].split("&"); //url is split by &
  var i;
  for (i = 0; i<keys_values.length; i++){
    var values = keys_values[i].split("="); //get values by splitting via "="
    if (i == 6){
      startValue = values[1];
      startValue = startValue.slice(0,10);
    }
    if (i == 7){
      endValue = values[1];
      endValue = endValue.slice(0,10);
    }
  }
  showTime();
  //display dates for both tiny and big calendar
  renderDates('tiny big');
  
  //open the default sidebar
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

  //set the progress for progress bar:
  var slider = document.getElementById("progressBar");
  var progress = document.getElementById("progress");
  var endDate = new Date(endValue);
  var startDate = new Date(startValue);
  var now = new Date();

  // Find the distance between now and the count down date
  var distanceWhole = endDate - startDate;
  var distanceLeft = endDate - now;
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

/*
  show the clock
*/
function showTime(){
  var date = new Date();
  var h = date.getHours(); //0-23
  var m = date.getMinutes(); //0-59
  var s = date.getSeconds(); //0-59
  var session = "AM";

  h = (h < 10) ? "0" + h : h;
  m = (m < 10) ? "0" + m : m;
  s = (s < 10) ? "0" + s : s;

  var time = h + ":" + m + ":" + s + " "; 
  document.getElementById("MyClockDisplay").innerText = time;
  document.getElementById("MyClockDisplay").textContent  = time;

  setTimeout(showTime, 1000);
}

/*
 display the sidebar
*/
function openFeature(evt, featureName) {
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

/*
  input events
*/
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
  console.log(cal);
  var direction = identifier[1];
  console.log('change');
  if (direction == 'prev'){
      displayDate.setMonth(displayDate.getMonth() - 1);
      renderDates(cal);
  }
  else if (direction == 'next'){
    displayDate.setMonth(displayDate.getMonth() + 1);
      renderDates(cal);
  }
}

function renderDates(cal){
  displayDate.setDate(1);
  var currentDay = displayDate.getDay();
  var currentMonth = displayDate.getMonth();
  var currentYear = displayDate.getFullYear();
  //set boundaries for this month
  var lastDate = new Date(
    currentYear,
    currentMonth + 1,
      0
  ).getDate();
  var prevDate = new Date(
    currentYear,
    currentMonth,
      0
  ).getDate();
  //display calendar
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  
  if(cal.includes('big')){
    createBigCalendarDays(prevDate,lastDate,displayDate,currentDay,currentMonth,currentYear);
    console.log(currentMonth);
    document.getElementById("bigMonth").innerHTML = months[currentMonth]
  }
  if(cal.includes('tiny')){
    createTinyCalendarDays(prevDate,lastDate,displayDate,currentDay);
    document.getElementById("tinyMonth").innerHTML = months[currentMonth]
  }
}

function createBigCalendarDays(prevDate,lastDate,displayDate,currentDay,currentMonth,currentYear){
  // create startDate and endDate
  var endDate = new Date(endValue);
  var startDate = new Date(startValue);
  var totalWeeks = (endDate - startDate) / 1000;
  totalWeeks /= (60 * 60 * 24 * 7);
  totalWeeks = Math.abs(Math.round(totalWeeks));
  var weekNumbers = new Array();
  for(var i=0;i<PHASE_NUMBER;i++){
      var values = keys_values[i].split("=");
      weekNumbers[i] = parseInt(values[1]);
  }
  var cell = "";
  var count = 0;
  var today = new Date();
  //create dates in the previous month
  for (x = currentDay; x>0; x--){
      cell+= "<div class = 'prevDate'>" + (prevDate - x + 1)+ "</div>";
      count = count + 1;
  }
  //create the dates in this month
  for (i = 1; i <= lastDate; i++){
      if (i == today.getDate() && displayDate.getMonth() == today.getMonth()){
          cell += "<div class = 'today'>" + i + "</div>"
      }
      else{
          //create a date
          var newDate = new Date();
          newDate.setDate(i);
          newDate.setMonth(currentMonth);
          newDate.setFullYear(currentYear);
          newDate.setHours(0);
          newDate.setMinutes(0);
          newDate.setSeconds(0);
          //compare with weeks
          var difference = Math.round((newDate - startDate)/(60 * 60 * 24 * 7 * 1000));
          var phase = "";
          if(difference<=totalWeeks){
            //get the number in the keys_values
            var  m = PHASE_NUMBER;
            while(m>0){
              var values = keys_values[m-1].split("=");//get values by splitting via "="
              var weeksForPhase = weekNumbers[m-1];
              if(difference>=weeksForPhase){
                  var phase = values[0];
                  var phaseNumber = values[1];
                  break;
              }
              m--;
            }
          }
          //add class
          if(phase.length == 0){
            cell += "<div>" + i + "</div>"
          }else{
            cell += "<div" + " class='" + phase + "'" + ">" + i + "</div>"
          }
      }
  }
  document.getElementsByClassName("datesOfMonth big")[0].innerHTML = cell;
  while (count > 0){
      document.getElementsByClassName('prevDate')[count-1].style.visibility = "hidden";
      count = count - 1;
  }
}

function createTinyCalendarDays(prevDate,lastDate,displayDate,currentDay){
    var cell = "";
    var count = 0;
    var today = new Date();
    for (x = currentDay; x>0; x--){
        cell+= "<div class = 'prevDate'>" + (prevDate - x + 1)+ "</div>";
        count = count + 1;
    }
    for (i = 1; i <= lastDate; i++){
        if (i == today.getDate() && displayDate.getMonth() == today.getMonth()){
            console.log("sssss-"+i+"/"+displayDate.getMonth()+"/"+today.getMonth());
            cell += "<div class = 'today'>" + i + "</div>"
        }
        else{
            cell += "<div>" + i + "</div>"
        }
    }
    document.getElementsByClassName("datesOfMonth tiny")[0].innerHTML = cell;
    while (count > 0){
        document.getElementsByClassName('prevDate')[count-1].style.visibility = "hidden";
        count = count - 1;
    }
}


function addFrame(result) {
  if (result < 100) {
      progress.style.width = result + "%";
      progress.innerHTML = result + "%";
  }
  console.log("testProgressBar");
}

