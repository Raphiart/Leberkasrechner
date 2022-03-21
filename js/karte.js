var Map = L.map('meineKarte').setView([48.044363, 11.966227], 14); //Layers mit Tileserver und Copyright-Anzeige verbinden var OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {	maxZoom: 19, attribution: 'Kartendaten: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende | Kartenstil: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}).addTo(Map); var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende'}); var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {maxZoom: 17, attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}).addTo(Map); var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende'}).addTo(Map); //Layer definieren var baseMaps = { "OpenStreetMap": OpenStreetMap, "OpenstreetMap DE": OpenStreetMap_DE, "OpenTopoMap": OpenTopoMap, }; var overlayMaps = { "OpenRailwayMap": OpenRailwayMap, }; //Beim Klicken auf die Karte werden die angeklickten Koordinaten angezeigt var popup = L.popup(); function onMapClick(e) { popup .setLatLng(e.latlng) .setContent(e.latlng.toString()) .openOn(Map); } Map.on('click', onMapClick); //==============MARKIERER================ //Metzgerei Heimann var Heimann = L.marker([48.045325, 11.96527]).addTo(Map); Heimann.bindPopup("<b>Metzgerei Heimann</b><br>Do gibts sowohl an Leber-, ois a an Kaskas!").openPopup(); //Metzgerei Maisch var greenIcon = new L.Icon({ iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] }); var Maisch = L.marker([48.04408, 11.966831], {icon: greenIcon}).addTo(Map); Maisch.bindPopup("<b>Metzgerei Maisch</b><br>Leberkas vom Metzger Maisch gibts aus Grafing!"); 	 //Hier wird eine Gruppe von Metzgereien erstellt, damit diese in den Layer-Einstellungen deaktiviert werden kann var Metzgereien = L.layerGroup([Heimann, Maisch]); L.control.layers(baseMaps, overlayMaps, Metzgereien).addTo(Map);