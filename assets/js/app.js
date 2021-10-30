const LngElement = document.querySelector("#longitude")
const LatElement = document.querySelector("#latitude")
const VeloElement = document.querySelector("#velocity")
const DarkButton = document.querySelector(".switch-class-button")
const Body = document.querySelector("body")

const darkmodefun = () => {
    Body.classList.toggle('dark')
}
DarkButton.addEventListener('click',darkmodefun)

var map = L.map('map').setView([0,0], 1);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

var myIcon = L.icon({
    iconUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/International_Space_Station.svg/1200px-International_Space_Station.svg.png',
    iconSize: [38, 32],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
});


var pathIcon = L.icon({
    iconUrl: 'https://www.svgrepo.com/show/331860/dot.svg',
    iconSize: [20, 20],
    // iconAnchor: [22, 94],
    // popupAnchor: [-3, -76],
    // shadowUrl: 'my-icon-shadow.png',
    // shadowSize: [68, 95],
    // shadowAnchor: [22, 94]
});

let marker = L.marker([0, 0], {icon: myIcon}).addTo(map)

const fetchSpaceStationDetails = async()=>{
    const res = await fetch("https://api.wheretheiss.at/v1/satellites/25544")
    const data = await res.json()
    const {latitude , longitude , velocity} = data
    LngElement.innerHTML = `Longitude : ${longitude.toFixed(2)} \u00B0`
    LatElement.innerHTML = `Latitude : ${latitude.toFixed(2)} \u00B0`
    VeloElement.innerHTML = `Velocity : ${velocity.toFixed(0)} `
    marker.setLatLng([latitude , longitude])
    L.marker([latitude,longitude],{icon:pathIcon}).addTo(map)
}

setInterval(fetchSpaceStationDetails, 1000)