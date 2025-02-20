const form = document.querySelector("form");
const getLocation = document.getElementById("getLocation");
const city = document.getElementById("city");
const weatherUpdate = document.getElementById("weatherUpdate");
const userRequest = document.querySelector(".userRequest");

const weatherRender = [];
form.addEventListener("submit", (e) => {
    e.preventDefault();
    getLocation.innerHTML = "Loading...";
    axios(
        `https://api.weatherapi.com/v1/current.json?key=6a291f122a5c47a1a89190002251502&q=${city.value}&aqi=no`
    ).then((res) => {
        let newWeather = `
                <div class="card mt-3" style="width: 18rem;">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-center flex-wrap g-2">
                        <h5 class="locationName card-title fs-3">${res.data.location.name} ${res.data.location.country}</h5>
                        <p class="card-text text">${res.data.location.localtime}</p>
                        </div>
                        <div class="d-flex flex-wrap justify-content-between align-items-center">
                            <h2 class="card-text fs-1 text-warning">
                            <span><i class="icon fa-solid fa-temperature-three-quarters"></i></span>
                            ${res.data.current.temp_c}°C</h2>
                            <div style="width: 20%">
                            <img class="w-100 h-auto" src="${res.data.current.condition.icon}" alt="weather-icon" />
                            </div>
                        </div>
                        <p class="card-text fs-5 text-white">
                        <span class = "me-2"><i class="icon text-info fa-solid fa-droplet"></i></span>
                        ${res.data.current.humidity}%</p>
                        <p class="card-text fs-5 text-white">
                        <span class = "me-2"><i class="icon fs-4 fa-solid fa-wind"></i></span>
                        ${res.data.current.wind_kph}km/h</p>
                        <p class="card-text fs-5 text-white">${res.data.current.condition.text}</p>
                        </div>
                </div>
            `;
        if (!weatherRender.includes(newWeather)) {
            weatherRender.unshift(newWeather);
            weatherUpdate.innerHTML = weatherRender.join("");
        }
    })
        .catch(() => {
            alert("No City Found.");
        })
        .finally(() => {
            city.value = "";
            getLocation.innerHTML = "Show Weather";
            userRequest.style.display = "none"
        });
});