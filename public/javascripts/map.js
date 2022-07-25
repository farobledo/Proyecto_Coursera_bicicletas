var map = L.map('main_map').setView([51.505, -0.09], 13);

L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png',{

attribution: ' &copy; <a href="http://openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}).addTo(map);

L.marker([-0.09, 51.505]).addTo(map);
 
L.marker([-51.508, -0.11]).addTo(map)


$ajax({
    dataType: "json",
    url: 'api/bicicletas',
    success: function(result) {
        console.log(result);
        result.bicicleta.forEach(function(bicicleta) {
            L.marker(bici.ubucacion, {title: bici.id}).addTo(map);
        });
        
    }

});


