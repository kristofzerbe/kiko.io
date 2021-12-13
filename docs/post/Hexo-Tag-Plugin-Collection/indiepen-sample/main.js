function updateClock() {
    var currentTime = new Date();
    var currentHours = currentTime.getHours();
    var currentMinutes = currentTime.getMinutes();
    var currentSeconds = currentTime.getSeconds();
 
    currentMinutes = (currentMinutes < 10 ? "0" : "") + currentMinutes;
    currentSeconds = (currentSeconds < 10 ? "0" : "") + currentSeconds;
 
    var currentTimeString = currentHours + ":" + currentMinutes + ":" + currentSeconds;
 
    document.querySelector("#clock").innerHTML = currentTimeString;
}
setInterval(updateClock, 1000);