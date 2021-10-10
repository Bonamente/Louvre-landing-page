mapboxgl.accessToken = 'pk.eyJ1IjoiYm9uYW1lbnRlIiwiYSI6ImNrdWxicXp2dDBodmoybm1vb2p4MHJ2NXgifQ.1QU5uqrhY3jxCwrpABoGHA';

const map = new mapboxgl.Map({
container: 'map',
style: 'mapbox://styles/mapbox/light-v10',
center: [2.3364, 48.86091],
zoom: 15.75,
});

const marker1 = new mapboxgl.Marker({ color: 'black'})
.setLngLat([2.3364, 48.86091])
.addTo(map);

const marker2 = new mapboxgl.Marker({ color: 'grey'})
.setLngLat([2.3333, 48.8602])
.addTo(map);

const marker3 = new mapboxgl.Marker({ color: 'grey'})
.setLngLat([2.3397, 48.8607])
.addTo(map);

const marker4 = new mapboxgl.Marker({ color: 'grey'})
.setLngLat([2.3330, 48.8619])
.addTo(map);

const marker5 = new mapboxgl.Marker({ color: 'grey'})
.setLngLat([2.3365, 48.8625])
.addTo(map);

map.addControl(new mapboxgl.NavigationControl());