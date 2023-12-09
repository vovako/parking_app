const apiOrigin = 'https://hack-zmark.p.tnnl.in';
const jwtAccess = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXIiOjEsInBhc3MiOiIxMjM0NSIsInBob25lIjoiODk4NzE5MTEyNDAiLCJpc19pbnZhbGlkIjpmYWxzZSwidGVsZWdyYW0iOjAsInJvbGUiOiJ1c2VyIn0sImV4cCI6MTcwMTAyODY3NiwiaWF0IjoxNzAwOTQyMjc2fQ.zU_Qkp4M2OafM9u5LdVINwwuyzJIlBLEbQfiwAGBCn8'

function serverQuery(link, json) {
	return new Promise(function (resolve, reject) {
		fetch(link, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtAccess}`
			},
			body: JSON.stringify(json)
		})
			.then(res => res.json())
			.then(json => {
				resolve(json)
			})
	})
}
// fetch(`${apiOrigin}/auth/login`, {
// 	method: 'POST',
// 	headers: {
// 		'Content-Type': 'application/json',
// 	},
// 	body: JSON.stringify({
// 		"number": "89871911240",
// 		"pass": "12345"
// 	})
// })
// 	.then(response => response.json())
// 	.then(result => console.log(result))

const store = {}

let map;
const myPos = []
DG.then(function () {
	map = DG.map('map', {
		fullscreenControl: false,
		zoomControl: false,
	});

	getMyLocation(map)
		.then(location => {

			DG.marker([location.latitude, location.longitude], {
				icon: DG.divIcon({
					iconSize: [37, 41],
					html: `<img src="img/user-mark.png" alt=""/>`
				})
			}).addTo(map)

			getParking(location.latitude, location.longitude, 10000)
				.then(json => {
					const data = json.data
					store.parkingData = data
					parkinfo.classList.add('active')

					const group = DG.featureGroup(data.map(i => {
						const label = i.cheapSpot !== null ? `${i.cheapSpot} ₽/ч` : '';
						return DG.marker([i.lat, i.long], {
							icon: DG.divIcon({
								html: `<div data-park-id="${i.id_parking}" style="background-color: black; color: white; border-radius: 999px; border: none; padding: 4px; display: flex; justify-content: center; align-items: center; white-space: nowrap;">${label}<div style="pointer-events: none; border-radius: 16px; background: linear-gradient(180deg, #5457DB 0%, #4823DD 100%); aspect-ratio: 1; width: 16px; display: flex; justify-content: center; align-items: center;">Р</div></div>`
							})
						})
					}))
					group.addTo(map)
					group.on('click', (e) => {
						map.setView([e.latlng.lat, e.latlng.lng])
						const parkData = store.parkingData.filter(parks => parks.id_parking === store.parkId)
						console.log(parkData);
						showParkInfo()
					})
				})
		})

});




function getMyLocation(map) {
	return new Promise(function (resolve, reject) {
		map.locate({ setView: true, zoom: 1 })
			.on('locationfound', function (e) {
				myPos[0] = location.latitude
				myPos[1] = location.longitude
				// updateGeometries(myPos[0], myPos[1])
				resolve(e)
			})
	})
}
function getParking(lat, long, range) {
	return new Promise(function (resolve, reject) {
		fetch(`${apiOrigin}/api/reservation/getParkings`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Authorization: `Bearer ${jwtAccess}`
			},
			body: JSON.stringify({
				"lat": lat,
				"long": long,
				"range": range
			})
		})
			.then(res => res.json())
			.then(json => {
				resolve(json)
			})
	})
}
function showParkInfo() {
	const parkInfoEl = document.querySelector('.place-info')
	parkInfoEl.classList.add('active')
}
function updateGeometries(lat, lon) {
	fetch('http://routing.api.2gis.com/routing/7.0.0/global?key=33a9eb92-f633-4ce8-a77d-2c274e8108c3', {
		method: 'post',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			start: { lat, lon },
			durations: [300, 600, 1200],
			utc: new Date().toISOString(),
			traffic_mode: 'jam',
			route_mode: 'fastest',
			transport: 'car'
		})
	})
		.then(res => res.json())
		.then(json => console.log(json))

}


const locationBtn = document.querySelector('.app-body__location')
locationBtn.addEventListener('click', function () {
	getMyLocation(map)
})

const parkinfo = document.querySelector('.place-info')
const parkTitleEl = document.querySelector('.place-info__arend-btn')
const parkTitle = document.querySelector('.place-info__title')
const parkImageEl = document.querySelector('.place-full-info__image')
const placeFullInfo = document.querySelector('.place-full-info')
const parkCloseBtn = document.querySelector('.place-full-info__close-btn')
const parkBackBtn = document.querySelector('.place-full-info__back-btn')
const parkArendBtn = document.querySelector('.place-full-info__arend-btn')
const parkToMarkupBtn = document.querySelector('.place-full-info__tomarkup-btn')
const parkToSummaryBtn = document.querySelector('.place-full-info__tosummary-btn')
const parkToPayBtn = document.querySelector('.place-full-info__to-pay-btn')
const parkToFinishBtn = document.querySelector('.place-full-info__to-finish-btn')
const parkToMainBtn = document.querySelector('.place-full-info__to-main-btn')
const fullInfoContentList = {
	info: document.querySelector('[data-content="info"]'),
	datetime: document.querySelector('[data-content="datetime"]'),
	markup: document.querySelector('[data-content="markup"]'),
	summary: document.querySelector('[data-content="summary"]'),
	pay: document.querySelector('[data-content="pay"]'),
	finish: document.querySelector('[data-content="finish"]'),
}
parkTitleEl.addEventListener('click', function () {
	placeFullInfo.classList.add('active')
	parkCloseBtn.classList.remove('dn')

	const bodyInfo = document.querySelector('.place-full-info')
	const bodyInfoContent = document.querySelector('.place-full-info__body')
	bodyInfo.style.justifyContent = null
	bodyInfoContent.style.borderBottomRightRadius = null
	bodyInfoContent.style.borderBottomLeftRadius = null
})
parkTitle.addEventListener('click', function() {
	console.log(store.parkingData);
	map.setView([store.parkingData[0].lat, store.parkingData[0].long])
})
parkCloseBtn.addEventListener('click', function () {
	placeFullInfo.classList.remove('active')
	toContentFullInfo('info')
	parkBackBtn.classList.add('dn')
	parkImageEl.classList.remove('dn')
})
parkArendBtn.addEventListener('click', function () {
	toContentFullInfo('datetime')
	parkBackBtn.classList.remove('dn')
	parkImageEl.classList.add('dn')
})
parkToMarkupBtn.addEventListener('click', function () {
	toContentFullInfo('markup')
	updateDatetimesParking()
	const countHoursArend = getCountHoursArend(new Date(store.fromDatetime), new Date(store.toDatetime))
	updateCountHoursArend(countHoursArend)
})
parkToSummaryBtn.addEventListener('click', function () {
	toContentFullInfo('summary')
})
parkToPayBtn.addEventListener('click', function () {
	toContentFullInfo('pay')
})
parkToFinishBtn.addEventListener('click', function () {
	toContentFullInfo('finish')
	parkBackBtn.classList.add('dn')
	parkCloseBtn.classList.add('dn')

	const bodyInfo = document.querySelector('.place-full-info')
	const bodyInfoContent = document.querySelector('.place-full-info__body')
	bodyInfo.style.justifyContent = 'center'
	bodyInfoContent.style.borderBottomRightRadius = '12px'
	bodyInfoContent.style.borderBottomLeftRadius = '12px'
})
parkToMainBtn.addEventListener('click', function () {
	placeFullInfo.classList.remove('active')
	toContentFullInfo('info')
	parkBackBtn.classList.add('dn')
	parkImageEl.classList.remove('dn')
})
parkBackBtn.addEventListener('click', function () {
	switch (getCurrentFullInfoContent().dataset.content) {
		case 'datetime':
			toContentFullInfo('info')
			parkBackBtn.classList.add('dn')
			parkImageEl.classList.remove('dn')
			break;
		case 'markup':
			toContentFullInfo('datetime')
			break;
		case 'summary':
			toContentFullInfo('markup')
			break;
		case 'pay':
			toContentFullInfo('summary')
			break;
	}

})

function getCurrentFullInfoContent() {
	return document.querySelector('.place-full-info__content.active')
}
function toContentFullInfo(content) {
	const curContent = getCurrentFullInfoContent()
	curContent.classList.remove('active')
	fullInfoContentList[content].classList.add('active')
}
function updateChocedSpotNumber(num) {
	const allBoxes = document.querySelectorAll('.choced-spot')
	allBoxes.forEach(box => {
		box.textContent = num
	})
}
function getFormatDate(date) {
	const parts = new Intl.DateTimeFormat("ru", { dateStyle: "long" }).format(new Date(date)).split(' ')
	return `${parts[0]} ${parts[1]}`
}
function updateDatetimesParking() {
	const timeFrom = document.querySelector('[name="time-from"]')
	const dateFrom = document.querySelector('[name="date-from"]')
	const timeTo = document.querySelector('[name="time-to"]')
	const dateTo = document.querySelector('[name="date-to"]')
	const formatDatetimeFrom = `${getFormatDate(dateFrom.value)}, ${[...timeFrom.children].filter(t => t.value === timeFrom.value)[0].textContent}`
	const formatDatetimeTo = `${getFormatDate(dateTo.value)}, ${[...timeTo.children].filter(t => t.value === timeTo.value)[0].textContent}`
	const boxesFrom = document.querySelectorAll('.datetime-from')
	boxesFrom.forEach(from => {
		from.textContent = formatDatetimeFrom
		from.parentElement.parentElement.querySelector('.datetime-to').textContent = formatDatetimeTo
	})
	store.fromDatetime = `${dateFrom.value}T${timeFrom.value.length === 1 ? `0${timeFrom.value}` : timeFrom.value}:00:00`
	store.toDatetime = `${dateTo.value}T${timeTo.value.length === 1 ? `0${timeTo.value}` : timeTo.value}:00:00`
}
function getCountHoursArend(from, to) {
	return (to - from) / 3600000
}
function updateCountHoursArend(countHours) {
	const countHoursArendBoxes = document.querySelectorAll('.count-hours-arend')
	countHoursArendBoxes.forEach(b => {
		b.textContent = countHours
	})
}
const ratingPage = document.querySelector('.rating')
const addFeedbackBtn = document.querySelector('.rating__submit-btn')
const ratingNotice = document.querySelector('.app-notify')
addFeedbackBtn.addEventListener('click', function () {
	const wrapper = document.querySelector('.rating__wrapper')
	if (wrapper.classList.contains('active')) {
		ratingPage.classList.remove('active')
		wrapper.classList.remove('active')
		ratingNotice.classList.remove('active')
		window.requestAnimationFrame(() => {
			ratingNotice.classList.add('active')
		})
	} else {
		wrapper.classList.add('active')
	}
})
const backFromFeedbackBtn = document.querySelector('.rating__back-btn')
backFromFeedbackBtn.addEventListener('click', function () {
	const wrapper = document.querySelector('.rating__wrapper')
	if (wrapper.classList.contains('active')) {
		wrapper.classList.remove('active')
	} else {
		ratingPage.classList.remove('active')
	}
})
const openRatingPageBtn = document.querySelector('.place-full-info__add-rating-btn')
openRatingPageBtn.addEventListener('click', function() {
	ratingPage.classList.add('active')
})
const toProfileBtn = document.querySelector('.to-profile-btn')
const profilePage = document.querySelector('.profile-page')
toProfileBtn.addEventListener('click', function() {
	const activeBtn = document.querySelector('.app-nav__btn.active')
	activeBtn.classList.remove('active')
	toProfileBtn.classList.add('active')
	profilePage.classList.add('active')
})
const toMapBtn = document.querySelector('.to-map-btn')
toMapBtn.addEventListener('click', function () {
	const activeBtn = document.querySelector('.app-nav__btn.active')
	activeBtn.classList.remove('active')
	toMapBtn.classList.add('active')
	profilePage.classList.remove('active')
})

document.addEventListener('click', function (evt) {
	const target = evt.target
	console.log(target);
	if (target.classList.contains('place-full-info-markup__spot')) {
		const oldActive = document.querySelector('.place-full-info-markup__spot.active')
		if (oldActive) {
			oldActive.classList.remove('active')
		}
		target.classList.add('active')
		store.spot = +target.textContent
		updateChocedSpotNumber(store.spot)
	} else if (target.hasAttribute('data-park-id')) {
		store.parkId = target.dataset.parkId
	} else if (target.classList.contains('rating__feedback-btn')) {
		const rating = +target.dataset.feedback
		const stars = document.querySelectorAll('.rating__feedback-btn')
		stars.forEach((star, i) => {
			star.firstElementChild.src = i < rating ? 'img/star.svg' : 'img/star-empty.svg'
		})
	}
})

window.addEventListener('load', async () => {
	if ('serviceWorker' in self.navigator) {
		try {
			const reg = await self.navigator.serviceWorker.register('/sw.js')
			console.log('Service worker success register', reg);
		}
		catch (e) {
			console.log('Service worker fail register', e);
		}
	}
})
