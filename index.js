// const express = require("express")
// const app = express();
// const port = 4000;
// const cors = require("cors");

// app.use(express.urlencoded({extended: true}));
// app.use(express.json());
// app.use(cors());

// app.get("/", cors(), async (req, res) => {
//     res.send("This is working")
// });

// app.listen(port, () => {
//     console.log(`Listening at http://localhost:${port}`)
// })

// Weather api section
const apiKey = "0c707a7dd73e32c0eff98fa433cb6ccd";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=imperial&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");




async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
    
    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
    else {
    
    var data = await response.json();

    console.log(data);

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°f";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = Math.round(data.wind.speed) + " mph";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png"
    }
    else if(data.weather[0].main === "Clear"){
        weatherIcon.src = "images/clear.png";
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    
}
saveCity();
}
searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})

function saveCity() {
    localStorage.setItem("city", searchBox.value);
}

function showCity() {
    localStorage.getItem("city");
}
showCity();


// JS for to-do list

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask(){
    if(inputBox.value === ''){
        alert("No task has been entered");
    }
    else {
        let li = document.createElement("li");
        li.innerHTML = inputBox.value;
        listContainer.appendChild(li);
        let span = document.createElement("span");
        span.innerHTML = "\u00d7";
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}

listContainer.addEventListener("click", function(e) {
    if(e.target.tagName === "LI") {
        e.target.classList.toggle("marked");
    }
    else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove();
        saveData();
    }

}, false);

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTask(){
    listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

// Countdown for special dates

var coutDownDate = new Date("Jan 1, 2024 00:00:00").getTime();


var x = setInterval(function() {
    var now = new Date().getTime();
    var distance = coutDownDate - now;

    var days = Math.floor(distance / (1000 * 60 * 60 *24));
    var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((distance % (1000 * 60 * 60))/ (1000 * 60));
    var seconds = Math.floor((distance % (1000 * 60)) / 1000);

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    if(distance < 0) {
        clearInterval(x);
        document.getElementById("newYearMessage").innerHTML = "Happy New Year, set some new goals!"
        document.getElementById("days").innerHTML = "00";
        document.getElementById("hours").innerHTML = "00";
        document.getElementById("minutes").innerHTML = "00";
        document.getElementById("seconds").innerHTML = "00";
        }

}, 1000);
