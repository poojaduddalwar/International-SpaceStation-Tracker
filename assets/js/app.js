var map = L.map('map').setView([0,0], 1);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

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
    const {latitude , longitude} = data
    // console.log(latitude,longitude)
    // console.log(data)
    marker.setLatLng([latitude , longitude])
    L.marker([latitude,longitude],{icon:pathIcon}).addTo(map)
    //setLatLng function changes the marker position to the given point
}

// To see live location -> call function after 1 sec
// fetchSpaceStationDetails()

//A function which calls particular function after set interval, here to give live location-
setInterval(fetchSpaceStationDetails, 1000)

// console.log(L)

// var map = L.map('map').setView([20.9320, 77.7523], 1);
//L.map is kind of initialize the function that initializes the leaflet map inside the element whose id you specify.
//setview function sets the view
//in setview the 2nd parameter is the initial zoom level which is going to show up on the load
//in setview the 1nd parameter which is array is the latitude and longitude

// L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//     attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
// }).addTo(map);

// //the marker function also accepts 2 parameters that are latitude and longitude
// L.marker([20.9320, 77.7523]).addTo(map)
//     .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
//     .openPopup();