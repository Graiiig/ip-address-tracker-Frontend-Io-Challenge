// *** ressource : https://stackoverflow.com/questions/391979/how-to-get-clients-ip-address-using-javascript

// *** Get informations on load
fetch('https://ipapi.co/json')
    .then(response => response.json())
    .then(function (infos) {
        document.querySelector('.ip').innerHTML = infos.ip
        document.querySelector('.location').innerHTML = infos.city + ", " + infos.country
        document.querySelector('.timezone').innerHTML = infos.timezone
        document.querySelector('.isp').innerHTML = infos.org
        createMap(infos.lat, infos.lon);
    })

// *** Get informations on submit
let buttonInput = document.querySelector('.submit-ip');
buttonInput.addEventListener('click', function () {
    let ipLength = document.querySelector('input').value.length;
    if (ipLength > 6) {
        fetch('https://ipapi.co/' + document.querySelector('input').value + '/json')
            .then(response => response.json())
            .then(function (infos) {

                if (infos.code == 422) {
                    alert('IP Not Valid !');
                } else {
                    document.querySelector('.ip').innerHTML = infos.ip
                    document.querySelector('.location').innerHTML = infos.city + ", " + infos.region + ", " + infos.country
                    document.querySelector('.timezone').innerHTML = infos.timezone
                    document.querySelector('.isp').innerHTML = infos.org
                    moveMap(infos.lat, infos.lon);
                }
            })

    } else {
        alert('IP not valid !');
    }
})

// *** Function to create and initialize Map
function createMap(lat, lon) {
    var map = L.map('mapid', {
        center: [lat, lon],
        zoom: 13
    });
    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { 
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });

    L.marker([lat, lon]).addTo(map);
    map.addLayer(osmLayer);
}



function moveMap(lat, lon) {

    var elem = document.querySelector('#mapid');
    elem.parentNode.removeChild(elem);
    let header = document.querySelector('.header');
    let mapContainer = document.createElement('div');
    mapContainer.setAttribute("id", "mapid");
    header.parentNode.insertBefore(mapContainer, header.nextSibling);

    var map = L.map('mapid', {
        center: [lat, lon],
        zoom: 13
    });

    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', { // LIGNE 20
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });

    L.marker([lat, lon]).addTo(map);
    map.addLayer(osmLayer);
}
