const apiOrigin = 'https://hack-zmark.p.tnnl.in';


// fetch(`${apiOrigin}/auth/login`, {
// 	method: 'POST',
// 	body: JSON.stringify({
// 		"number": "89871911240",
// 		"pass": "12345"
// 	})
// })
// 	.then(response => response.json())
// 	.then(result => console.log(result))

fetch(`${apiOrigin}/api/reservation/getParkings`, {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json',
		Authorization: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkX3VzZXIiOjEsInBhc3MiOiIxMjM0NSIsInBob25lIjoiODk4NzE5MTEyNDAiLCJpc19pbnZhbGlkIjpmYWxzZX0sImV4cCI6MTcwMDk0MjExMSwiaWF0IjoxNzAwODU1NzExfQ.L9gJCfPlz5YPiDJe_dty-YzheBQrAweKwRPXW2dOr4w"
	},
	body: JSON.stringify({
		"lat": 51.79269,
		"long": 55.12639,
		"range": 10000
	})
})
	.then(res => res.json())
	.then(json => {
		console.log(json);
	})

let map;
DG.then(function () {
	map = DG.map('map', {
		center: [54.98, 82.89],
		zoom: 13,
		fullscreenControl: false,
		zoomControl: false
	});

	// map.locate({ setView: true, watch: true })
	// 	.on('locationfound', function (e) {
	// 		DG.marker([e.latitude, e.longitude]).addTo(map);
	// 	})
	// 	.on('locationerror', function (e) {
	// 		DG.popup()
	// 			.setLatLng(map.getCenter())
	// 			.setContent('Доступ к определению местоположения отключён')
	// 			.openOn(map);
	// 	});
});


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
