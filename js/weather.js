import { WEATHER_UI } from './view.js';

WEATHER_UI.BTN_SEARCH.addEventListener('click', function () {
	alert("Нажата кнопка Поиска");
});

for (let city of WEATHER_UI.SAVED) {
	city.addEventListener('click', function (event) {
		const cityName = event.target.textContent;
		alert(cityName);

	})
}

function deleteClassesActive(){
    for (let tab of WEATHER_UI.TABS){
        const isCLassActive = tab.className === 'weather__tabs--btn weather__tabs--btnActive';

        if (isCLassActive){
            tab.classList.remove('weather__tabs--btnActive');
        }
    }
}

for (let tab of WEATHER_UI.TABS){
    tab.addEventListener('click', function (){
        deleteClassesActive();
        tab.classList.add('weather__tabs--btnActive');
		  const href = tab.getAttribute('href').slice(1);
		  const id = "#" + href;
		  document.querySelectorAll('.active').forEach(el => el.classList.remove('active'));
        document.querySelector(id).classList.add('active');
    })
}


/* вобщем, убери с табов класс weather__display, на первый добавь active или как тебе удобнее, 
for (let tab of WEATHER_UI.TABS){
    tab.addEventListener('click', function (e){
        e.preventDefault()
        deleteClassesActive();
        tab.classList.add('weather__tabs--btnActive');
        const href = tab.getAttribute('href').slice(1)
        document.querySelector([id='${href}']).classList.add('active')
    })
} */