// Required variables
var session_seconds = "00";
var session_minutes = 1; //set as 20

// Audio files
var click_sound = new Audio("click.mp3");
var bell = new Audio("bell.mp3");

// Starting template for the timer
function template() {
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;
}

function start_timer() {
  click_sound.play();

  session_seconds = 5;
  session_minutes = session_minutes - 1;

  // Add the seconds and minutes to the page
  document.getElementById("minutes").innerHTML = session_minutes;
  document.getElementById("seconds").innerHTML = session_seconds;

  // Start the countdown
  minutes_interval = setInterval(minutesTimer, 60000);
  seconds_interval = setInterval(secondsTimer, 1000); 

  document.getElementById("addBtn").style.visibility = "hidden";
  document.getElementById("minusBtn").style.visibility = "hidden";
  document.getElementById("startBtn").disabled = true;
  document.getElementById("dropdown").disabled = true;
}
function minutesTimer() {
  session_minutes = session_minutes - 1;
  document.getElementById("minutes").innerHTML = session_minutes;
}
// Function for second counter
function secondsTimer() {
  session_seconds = session_seconds - 1;
  document.getElementById("seconds").innerHTML = session_seconds;

  // Check if the seconds and minutes counter has reached 0
  // If reached 0 then end the session
  if (session_seconds <= 0) {
    if (session_minutes <= 0) {
      // Clears the interval i.e. stops the counter
      clearInterval(minutes_interval);
      clearInterval(seconds_interval);

      // Add the message to the html
      document.getElementById("done").innerHTML =
        "Session Completed!! Take a Break. Would you like to note down something?" + "<button onclick ='dialogueBox()' id ='dialogueBox'>Yes</button>"+"<button onclick='reset_timer()'>No</button>"
        + "<div id='myModal' class='modal'>"+"<div class='modal-content'>"+
    "<p>What have you accomplished this session?</p> <input>"+
    "<button onclick='reset_timer()'>Done</button>"+
  "</div>"+"</div>";

      // Make the html message div visible
      document.getElementById("done").classList.add("show_message");
      // PLay the bell sound to tell the end of session
      bell.play();
    }
    // Reset the session seconds to 60
    session_seconds = 60;
  }
}
function dialogueBox(){
  var modal = document.getElementById('myModal');
  // Get the button that opens the modal
  var btn = document.getElementById('dialogueBox');
  // When the user clicks the button, open the modal 
  btn.onclick = function() {
    modal.style.display = 'block';
  }
}
function reset_timer(){
  document.getElementById("addBtn").style.visibility = "visible";
  document.getElementById("minusBtn").style.visibility= "visible";
  document.getElementById("startBtn").disabled = false;
  document.getElementById("dropdown").disabled = false;
  document.getElementById("done").style.transition= "0.5s ease";
  document.getElementById("done").style.display= "none";


  session_minutes = 20;
  document.getElementById("minutes").innerHTML = session_minutes;
  session_seconds = "00";
  document.getElementById("seconds").innerHTML = session_seconds;
  clearInterval(minutes_interval);
  clearInterval(seconds_interval);
}
function addTime(){
  session_minutes = session_minutes + 5;
  document.getElementById("minutes").innerHTML = session_minutes;
  if (session_minutes >= 60){
    document.getElementById("addBtn").disabled = true;
  }
  else{
    document.getElementById("minusBtn").disabled = false;
  }
}

function minusTime(){
  session_minutes = session_minutes - 5;
  document.getElementById("minutes").innerHTML = session_minutes;
  if (session_minutes <= 0){
    document.getElementById("minusBtn").disabled = true;
  }
  else {
    document.getElementById("addBtn").disabled = false;
  }
}

//dropDown List
