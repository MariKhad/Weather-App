import { WEATHER_UI } from './view.js';
addEventListener('DOMContentLoaded', savedCityShow);
addEventListener('DOMContentLoaded', savedCityDelete);
addEventListener('DOMContentLoaded', getData);

const WEATHER_URL = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_URL = 'https://api.openweathermap.org/data/2.5/forecast';
const IMG_URL = 'http://openweathermap.org/img/w/'
const API_WEATHER = 'f660a2fb1e4bad108d6160b7f58c555f';
const API_FORECAST = 'a1cc7dc6cb10240ba58f80b279bd9acb';
const UNITS = 'metric';
const FORECAST_ITEM_LIMIT = "10";
let cityName;
let savedCities = document.querySelectorAll('.weather__city');
let savedCitiesBtns = document.querySelectorAll('.weather__city--del');
const List = Array.from(savedCities);
let cityList = [];
List.forEach(city => cityList.push(city.textContent));


WEATHER_UI.FORM.addEventListener('submit', getData);

async function getData() {
	if (WEATHER_UI.SEARCH_INPUT.value !== "") {
		cityName = WEATHER_UI.SEARCH_INPUT.value;
		const url1 = `${WEATHER_URL}?q=${cityName}&appid=${API_WEATHER}&units=${UNITS}`;
		const url2 = `${FORECAST_URL}?q=${cityName}&appid=${API_WEATHER}&cnt=${FORECAST_ITEM_LIMIT}&units=${UNITS}`;
		Promise.all([
			await fetch(url1),
			await fetch(url2),
		])
			.then(async ([json1, json2]) => {
				const weather = await json1.json();
				const forecast = await json2.json();
				getWeather(weather);
				getForecast(forecast);
			})
			.catch(err => alert(err))
	} else {
		alert("Enter the city, please")
	}
}


function getWeather(json) {
	cityName = WEATHER_UI.SEARCH_INPUT.value;
	let temp = json.main.temp;
	temp = tempFormat(temp);
	WEATHER_UI.NOW_TEMP.textContent = temp;
	let srcUrl = `${IMG_URL}${json.weather[0].icon}.png`;
	WEATHER_UI.NOW_IMG.src = srcUrl;
	for (let city of WEATHER_UI.CITY_NAME) {
		city.textContent = json.name;
	}
	WEATHER_UI.DETAILS_TEMP.textContent = "Temperature: " + temp;
	let feels = json.main.feels_like;
	feels = tempFormat(feels);
	WEATHER_UI.DETAILS_FEELS.textContent = "Feels like: " + feels;
	let pres = json.weather[0].main;
	WEATHER_UI.DETAILS_PRES.textContent = "Weather: " + pres;
	let rise = (json.sys.sunrise);
	rise = timeFormat(rise);
	WEATHER_UI.DETAILS_SUNRISE.textContent = "Sunrise: " + rise;
	let set = (json.sys.sunset);
	set = timeFormat(set);
	WEATHER_UI.DETAILS_SUNSET.textContent = "Sunset: " + set;

}

function createCityNode(cityName) {
	let li = document.createElement('li')
	let btnCity = document.createElement('button');
	let btnCityDel = document.createElement('button');
	btnCity.textContent = cityName;
	btnCity.classList.add('weather__city');
	btnCityDel.classList.add('weather__city--del');
	li.append(btnCity);
	li.append(btnCityDel);
	ul.prepend(li);
}


function getForecast(json) {
	listForecast.innerHTML="";
	let arrayForecast = [].concat(json.list)
	for (let item of arrayForecast) {
		let li = document.createElement('li')
		li.classList.add('forecast__list--item')
		let day = document.createElement('div');
		day.classList.add('forecast__day')
		day.textContent = dateFormat(item.dt);
		let time = document.createElement('div');
		time.classList.add('forecast__time');
		time.textContent = timeFormat(item.dt);
		let param = document.createElement('div');
		param.classList.add('forecast__parameters');
		let temp = document.createElement('p');
		temp.classList.add('forecast__temp');
		temp.textContent = "Temperature: " + tempFormat(item.main.temp);
		let feels = document.createElement('p');
		feels.classList.add('forecast__feels');
		feels.textContent = "Feels like: " + tempFormat(item.main.feels_like);
		param.append(temp);
		param.append(feels);
		let prep = document.createElement('div');
		prep.classList.add('forecast__precipitatios');
		let text = document.createElement('p');
		text.classList.add('forecast__precipitatios--text');
		text.textContent = item.weather[0].main;
		let img = document.createElement('img');
		let imgUrl = `${IMG_URL}${item.weather[0].icon}.png`;
		img.setAttribute('src', imgUrl);
		prep.append(text);
		prep.append(img);
		li.append(day);
		li.append(time);
		li.append(param);
		li.append(prep);
		listForecast.append(li);
	}
}

WEATHER_UI.SAVED_BTN.addEventListener('click', getSaved);

function getSaved() {
	cityName = WEATHER_UI.SEARCH_INPUT.value;
	if (cityList.find(item => item === cityName)) {
		alert("This city is already in the list");
	} else {
		cityList.unshift(cityName);
		createCityNode(cityName);
		savedCities = document.querySelectorAll('.weather__city');
		savedCitiesBtns = document.querySelectorAll('.weather__city--del');
		savedCityShow();
		savedCityDelete();
	}
};

function savedCityShow() {
	for (let city of savedCities) {
		city.addEventListener('click', function (event) {
			cityName = event.target.textContent;
			WEATHER_UI.SEARCH_INPUT.value = cityName;
			getData();
		})
	}
}

function savedCityDelete() {
	for (let btn of savedCitiesBtns) {
		btn.addEventListener('click', function (event) {
			const targetCity = event.target;
			cityName = targetCity.previousSibling.textContent;
			cityList = cityList.filter(item => item !== cityName);
			targetCity.parentNode.remove();
			savedCities = document.querySelectorAll('.weather__city');
			savedCitiesBtns = document.querySelectorAll('.weather__city--del');
		});
	}
}


function deleteClassesActive() {
	WEATHER_UI.TABS.forEach(el => el.classList.remove('weather__tabs--btnactive'));
}

for (let tab of WEATHER_UI.TABS) {
	tab.addEventListener('click', function () {
		deleteClassesActive();
		tab.classList.add('weather__tabs--btnactive')
		const href = tab.getAttribute('href').slice(1);
		const id = "#" + href;
		document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
		document.querySelector(id).classList.add('active');
	})
}

function tempFormat(a) {
	let round = Math.round(+a) + "°";
	return round;
}

function timeFormat(ms) {
	return new Date(ms * 1000).toLocaleTimeString('en-GB', {
		hour: 'numeric',
		minute: 'numeric'
	})
}

function dateFormat(date) {
	return new Date(date * 1000).toLocaleDateString('en-GB', {
		month: 'short',
		day: '2-digit',
	})
}


/* function addZero(time) {
	if (time < 10) {
		time = "0" + String(time);
	}
	return time;
}

function getTime(unix) {
	let time = new Date(unix * 1000);
	let hours = time.getHours();
	hours = addZero(hours);
	let minutes = 0 + time.getMinutes();
	minutes = addZero(minutes);
	let fullTime = hours + ":" + minutes;
	return fullTime;
} */

