import { WEATHER_UI } from './view.js';

const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let cityName;

for (let city of WEATHER_UI.SAVED) {
	city.addEventListener('click', function (event) {
		cityName = event.target.textContent;
		WEATHER_UI.SEARCH_INPUT.value = cityName;
		WEATHER_UI.BTN_SEARCH.click();
	})
}

function deleteClassesActive() {
	for (let tab of WEATHER_UI.TABS) {
		const isCLassActive = tab.className === 'weather__tabs--btn weather__tabs--btnActive';

		if (isCLassActive) {
			tab.classList.remove('weather__tabs--btnActive');
		}
	}
}

function tempRound(a) {
	let round = Math.round(+a - 273.15);
	return round;
}

function addZero(time) {
	if (time < 10) {
		time = "0" + String(time);
	}
   return time;
}



for (let tab of WEATHER_UI.TABS) {
	tab.addEventListener('click', function () {
		deleteClassesActive();
		tab.classList.add('weather__tabs--btnActive');
		const href = tab.getAttribute('href').slice(1);
		const id = "#" + href;
		console.log("нажата клавиша");
		document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
		document.querySelector(id).classList.add('active');
	})
}

WEATHER_UI.BTN_SEARCH.addEventListener('click', async function () {
	cityName = (WEATHER_UI.SEARCH_INPUT.value).toLowerCase();
	const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
	let response = await fetch(url);
	if (response.ok) {
		let json = await response.json();
		let temp = json.main.temp;
		temp = tempRound(temp);
		WEATHER_UI.NOW_TEMP.textContent = temp + "°";
		WEATHER_UI.DETAILS_TEMP.textContent = "Temperature: " + temp + "°";
		let feels = json.main.feels_like;
		feels = tempRound(feels);
		WEATHER_UI.DETAILS_FEELS.textContent = "Feels like: " + feels + "°";
		let pres = json.weather[0].main;
		WEATHER_UI.DETAILS_PRES.textContent = "Weather: " + pres;
		let rise = (json.sys.sunrise);
		let rise_time = new Date(rise * 1000);
		let rise_hours = rise_time.getHours();
		rise_hours = addZero(rise_hours);
		alert(rise_hours);
		let rise_minutes = 0 + rise_time.getMinutes();
		rise_minutes = addZero(rise_minutes);
		WEATHER_UI.DETAILS_SUNRISE.textContent = "Sunrise: " + rise_hours + ":" + rise_minutes;
		let set = (json.sys.sunset);
		let set_time = new Date(set * 1000);
		let set_hours = set_time.getHours();
		set_hours = addZero(set_hours);
		alert(set_hours);
		let set_minutes = 0 + set_time.getMinutes();
		set_minutes = addZero(set_minutes);
		WEATHER_UI.DETAILS_SUNSET.textContent = "Sunset: " + set_hours + ":" + set_minutes;
		let srcUrl = `http://openweathermap.org/img/w/${json.weather[0].icon}.png`;
		WEATHER_UI.NOW_IMG.src = srcUrl;
		for (let city of WEATHER_UI.CITY_NAME) {
			city.textContent = json.name;
		}

	} else {
		alert("Ошибка HTTP: " + response.status);
	}
});

