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

var map;

DG.then(function () {
	map = DG.map('map', {
		center: [54.98, 82.89],
		zoom: 13
	});

	map.locate({ setView: true, watch: true })
		.on('locationfound', function (e) {
			DG.marker([e.latitude, e.longitude]).addTo(map);
		})
		.on('locationerror', function (e) {
			DG.popup()
				.setLatLng(map.getCenter())
				.setContent('Доступ к определению местоположения отключён')
				.openOn(map);
		});
});