date = new Date();
function renderDates(){
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
    var count = 0;
    for (x = day; x>0; x--){
        cell+= "<div class = 'prevDate'>" + (prevDate - x + 1)+ "</div>";
        count = count + 1;
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
    while (count > 0){
        document.getElementsByClassName('prevDate')[count-1].style.visibility = "hidden";
        count = count - 1;
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
  
  
  