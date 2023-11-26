const apiOrigin = 'https://hack-zmark.p.tnnl.in';

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

let map;
const myPos = []
DG.then(function () {
	map = DG.map('map', {
		fullscreenControl: false,
		zoomControl: false
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
					console.log(json)

					const group = DG.featureGroup(data.map(i => {
						const label = i.cheapSpot !== null ? `${i.cheapSpot} ₽/ч` : '';
						return DG.marker([i.lat, i.long], {
							icon: DG.divIcon({
								html: `<div style="background-color: black; color: white; border-radius: 999px; border: none; padding: 4px; display: flex; justify-content: center; align-items: center; white-space: nowrap;">${label}<div style="border-radius: 16px; background: linear-gradient(180deg, #5457DB 0%, #4823DD 100%); aspect-ratio: 1; width: 16px; display: flex; justify-content: center; align-items: center;">Р</div></div>`
							})
						})
					}))
					group.addTo(map)
					group.on('click', (e) => {
						map.setView([e.latlng.lat, e.latlng.lng])
						showParkInfo()
					})
				})
		})

});




function getMyLocation(map) {
	return new Promise(function (resolve, reject) {
		map.locate({ setView: true })
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
				Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXIiOjEsInBhc3MiOiIxMjM0NSIsInBob25lIjoiODk4NzE5MTEyNDAiLCJpc19pbnZhbGlkIjpmYWxzZSwidGVsZWdyYW0iOjAsInJvbGUiOiJ1c2VyIn0sImV4cCI6MTcwMTAyODY3NiwiaWF0IjoxNzAwOTQyMjc2fQ.zU_Qkp4M2OafM9u5LdVINwwuyzJIlBLEbQfiwAGBCn8"
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

const parkTitleEl = document.querySelector('.place-info__arend-btn')
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
