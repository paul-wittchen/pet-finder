import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

export default function initMap(lon, lat, petImage, mapContainer) {
    mapboxgl.accessToken = 'pk.eyJ1IjoicGF1bDA3MTEiLCJhIjoiY2toMmxybmV6MGRwbzJwcGM4am55dDhjNyJ9.RDH0hBD2iTORkidOf0FNFg';
    const map = new mapboxgl.Map({
        container: mapContainer,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lon, lat],
        zoom: 14
        });
    new mapboxgl.Marker()
        .setLngLat([lon, lat])
        .addTo(map);
    const nav = new mapboxgl.NavigationControl();
        map.addControl(nav);
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
            enableHighAccuracy: true
            },
            trackUserLocation: true
            }));

    var geojson = {
        type: 'FeatureCollection',
        features: [{
            type: 'Feature',
            geometry: {
            type: 'Point',
            coordinates: [lon, lat],
            name: 'otterfing'
            }
        }]
    };
    var el1 = document.createElement('div');
    el1.style.cssText = `background-image: url(${petImage});
        background-size: cover;
        width: 72px;
        height: 72px;
        border-radius: 50%;
        box-shadow: 0px 0px 16px rgba(230, 230, 230, 0.267);`
    new mapboxgl.Marker(el1)
        .setLngLat(geojson.features[0].geometry.coordinates)
        .addTo(map)
}
