var Map,
    cm,
    ll = new L.LatLng(-36.852668, 174.762675),
    ll2 = new L.LatLng(-36.86, 174.77);

function showCoordinates (e) {
    alert(e.latlng);
}

function centerMap (e) {
    Map.panTo(e.latlng);
}

function zoomIn (e) {
    Map.zoomIn();
}

function zoomOut (e) {
    Map.zoomOut();
}

Map = L.map('meineKarte', {
    center: ll,
    zoom: 15,
    contextmenu: true,
contextmenuWidth: 180,
    contextmenuItems: [{
        text: 'Koordinaten anzeigen',
        callback: showCoordinates
    }, {
        text: 'Karte hier zentrieren',
        callback: centerMap
    }, '-', {
        text: 'Hereinzoomen',
        icon: 'ext/images/zoom-in.png',
        callback: zoomIn
    }, {
        text: 'Herauszoomen',
        icon: 'ext/images/zoom-out.png',
        callback: zoomOut
}]
});

        //Layers mit Tileserver und Copyright-Anzeige verbinden     
        var OpenStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende'}).addTo(Map);
        var OpenRailwayMap = L.tileLayer('https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png', {	maxZoom: 19, attribution: 'Kartendaten: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende | Kartenstil: &copy; <a href="https://www.OpenRailwayMap.org">OpenRailwayMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}).addTo(Map);
        var OpenStreetMap_DE = L.tileLayer('https://{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png', {maxZoom: 18, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>-Mitwirkende'});
        var OpenTopoMap = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {maxZoom: 17, attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'}).addTo(Map);

        //Layer definieren
        var baseMaps = {
            "OpenTopoMap": OpenTopoMap,
            "OpenStreetMap": OpenStreetMap,
            "OpenStreetMap DE": OpenStreetMap_DE,
        };

        var overlayMaps = {
            "OpenRailwayMap": OpenRailwayMap,
        };


        //==============MARKIERER================

        //Metzgerei Heimann
        var Heimann = L.marker([48.045325, 11.96527]).addTo(Map);
        Heimann.bindPopup("<b>Metzgerei Heimann</b><br>Do gibts sowohl an Leber-, ois a an Kaskas!").openPopup();

        //Metzgerei Maisch
        var gruenesIcon = new L.Icon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
        var Maisch = L.marker([48.04408, 11.966831], {icon: gruenesIcon}).addTo(Map);
        Maisch.bindPopup("<b>Metzgerei Maisch</b><br>Leberkas vom Metzger Maisch gibts aus Grafing!");
	
        //Metzgerei Kammerloher
        var gelbesIcon = new L.Icon({iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-gold.png', shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png', iconSize: [25, 41], iconAnchor: [12, 41], popupAnchor: [1, -34], shadowSize: [41, 41] });
        var Kammerloher = L.marker([48.046904, 11.967248], {icon: gelbesIcon}).addTo(Map);
        Kammerloher.bindPopup("<b>Metzgerei Kammerloher</b><br>Fleisch & Wurscht vom Feinsten!");

        //Hier wird eine Gruppe von Metzgereien erstellt, damit diese in den Layer-Einstellungen deaktiviert werden kann

        var Metzgereien = L.layerGroup([Heimann, Maisch]);


        L.control.layers(baseMaps, overlayMaps, Metzgereien).addTo(Map);

        //Suche in Leaflet
        Map.addControl( new L.Control.Search({
            url: 'https://nominatim.openstreetmap.org/search?format=json&q={s}',
            jsonpParam: 'json_callback',
            propertyName: 'display_name',
            propertyLoc: ['lat','lon'],
            marker: L.marker([0,0],{icon: gruenesIcon}),
            autoCollapse: true,
            autoType: false,
            minLength: 2
        }) );

        //Fullscreen
        Map.addControl(new L.Control.Fullscreen());

        

