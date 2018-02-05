var tour_locations = [	
  [-77.036871, 38.907192], //DC
  [-0.127758, 51.507351], //London
  [2.352222,48.856614], //Paris
  [-66.105722, 18.466334], //San Jian
  [-70.669265,-33.44889], //Santiago
  [116.407395,39.904211], //Beijing
];

var map_tour = function(map) {
  setInterval(function() {
    var rand_loc  = tour_locations[Math.floor(Math.random()*tour_locations.length)];
    map.flyTo({
      center: rand_loc,
      zoom: 6,
      speed: 0.4,
      curve: 1
    });
  }, 4000);
};

var initMap = function() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZXJlcHRvciIsImEiOiJjamQ1Mmt6MHYwd3c4MnFyenFzYW1nMzdlIn0.KJC451v713zEG-NOODZ35g';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/dark-v9',
    center: [-18.143525360151557,37.87252922278667],
    zoom: 2,
    maxZoom: 8
  });
	map.scrollZoom.disable();

  map.on('load', function() {
		map.addSource('peers', {
			type: 'geojson',
			data: 'https://s3.amazonaws.com/trtlpeers/peers.geojson'
		});

		map.addLayer({
			id: 'peers-heat',
			type: 'heatmap',
			source: 'peers',
			maxzoom: 10,
			paint: {
				// increase weight as diameter breast height increases
				'heatmap-weight': {
					property: 'dbh',
					type: 'exponential',
					stops: [
						[1, 0],
						[62, 1]
					]
				},
				// increase intensity as zoom level increases
				'heatmap-intensity': {
					stops: [
						[11, 1],
						[15, 3]
					]
				},
				// assign color values be applied to points depending on their density
				'heatmap-color': [
					'interpolate',
					['linear'],
					['heatmap-density'],
					0, 'rgba(0,222,0,0)',
					0.2, 'rgb(0,209,0)',
					0.4, 'rgb(0,189,0)',
					0.6, 'rgb(0,169,0)',
					0.8, 'rgb(0,144,0)'
				],
				// increase radius as zoom increases
				'heatmap-radius': {
					stops: [
						[1, 5],
						[5, 9]
					]
				},
				// decrease opacity to transition into the circle layer
				'heatmap-opacity': {
					default: 1,
					stops: [
						[14, 1],
						[15, 0]
					]
				},
			}
		}, 'waterway-label');	

    //map_tour(this); disabled for now
  });
};
