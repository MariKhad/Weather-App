import { WEATHER_UI } from './view.js';

const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
let cityName;
let savedCities = document.querySelectorAll('.weather__city');
const List = Array.from(savedCities);
const cityList = [];
List.forEach(city => cityList.push(city.textContent));


WEATHER_UI.FORM.addEventListener('submit', getWeather);

async function getWeather() {
	alert("Начало выполнения функции getWEather");
	if (WEATHER_UI.SEARCH_INPUT.value !== "") {
		cityName = WEATHER_UI.SEARCH_INPUT.value;
		console.log(cityName);
		const url = `${serverUrl}?q=${cityName}&appid=${apiKey}`;
		let response = await fetch(url);
		if (response.ok) {
			let json = await response.json();
			let temp = json.main.temp;
			temp = tempRound(temp);
			WEATHER_UI.NOW_TEMP.textContent = temp + "°";
			let srcUrl = `http://openweathermap.org/img/w/${json.weather[0].icon}.png`;
			WEATHER_UI.NOW_IMG.src = srcUrl;
			for (let city of WEATHER_UI.CITY_NAME) {
				city.textContent = json.name;
			}
			WEATHER_UI.DETAILS_TEMP.textContent = "Temperature: " + temp + "°";
			let feels = json.main.feels_like;
			feels = tempRound(feels);
			WEATHER_UI.DETAILS_FEELS.textContent = "Feels like: " + feels + "°";
			let pres = json.weather[0].main;
			WEATHER_UI.DETAILS_PRES.textContent = "Weather: " + pres;
			let rise = (json.sys.sunrise);
			rise = getDate(rise);
			WEATHER_UI.DETAILS_SUNRISE.textContent = "Sunrise: " + rise;
			let set = (json.sys.sunset);
			set = getDate(set);
			WEATHER_UI.DETAILS_SUNSET.textContent = "Sunset: " + set;
		} else {
			alert("Ошибка HTTP: " + response.status);
		}
	}
};

WEATHER_UI.SAVED_BTN.addEventListener('click', getSaved);

function getSaved() {
	cityName = WEATHER_UI.SEARCH_INPUT.value;
	if (cityList.find(item => item === cityName)) {
		alert("This city is already in the list");
	} else {
		cityList.unshift(cityName);
		let li = document.createElement('li')
		let btnCity = document.createElement('button');
		let btnCityDel = document.createElement('button');
		btnCity.textContent = cityName;
		btnCity.classList.add('weather__city');
		btnCityDel.classList.add('weather__city--del');
		li.append(btnCity);
		li.append(btnCityDel);
		ul.prepend(li);
		savedCities = document.querySelectorAll('.weather__city');
		for (let city of savedCities) {
			city.addEventListener('click', function (event) {
				cityName = event.target.textContent;
				alert(cityName);
				WEATHER_UI.SEARCH_INPUT.value = cityName;
				getWeather();
			})
		}
	}
};

WEATHER_UI.BTNS_DEL.addEventListener('click', function (event) {
	cityName = event.target.previousSibling.textContent;
	alert(cityName);
});



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

function getDate(unix) {
	let time = new Date(unix * 1000);
	let hours = time.getHours();
	hours = addZero(hours);
	let minutes = 0 + time.getMinutes();
	minutes = addZero(minutes);
	let fullTime = hours + ":" + minutes;
	return fullTime;
}

for (let tab of WEATHER_UI.TABS) {
	tab.addEventListener('click', function () {
		deleteClassesActive();
		tab.classList.add('weather__tabs--btnActive');
		const href = tab.getAttribute('href').slice(1);
		const id = "#" + href;
		document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
		document.querySelector(id).classList.add('active');
	})
}


