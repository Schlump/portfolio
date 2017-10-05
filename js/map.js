// ;(function() {


$(document).ready(function () {

        var map,
            baseMaps,
            myIcon,
            popup,
            overlayMaps;


        var getColor,
            highlightFeature,
            resetHighlight,
            style,
            propo;

        var geojson;


        var OpenStreetMap = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        });

        //add map, specify zoom and start extent
        map = L.map('mapsa', {
            center: new L.LatLng(41.85, -87.60),
            zoom: 10,
            attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
            layers: [OpenStreetMap]
            });

            // control that shows state info on hover
            var info = L.control();


            info.onAdd = function (map) {
                this._div = L.DomUtil.create('div', 'info');
                this.update();
                return this._div;
            };

 

            info.update = function (props) {
                this._div.innerHTML = '<h4>Info</h4>'+  (props ?
                    '<b style="text-align: left;">Beat: ' + props.beat_num +'<br>'+
                    '<b>Assault rate: '+ Math.round(props.rate_ASSAULT) + '   ' +'</b><br>'+
                    '<b>Burglary rate: '+ Math.round(props.rate_BURGLARY) + '   ' +'</b><br>'+
                    '<b>Homicide rate: '+ Math.round(props.rate_HOMICIDE) + '   ' +'</b>'
                    : ' ');
            };

            info.addTo(map);


            function onEachFeature(feature, layer) {
                layer.on({
                mouseover: highlightFeature,
                mouseout: resetHighlight,
                });
                // does this feature have a property named popupContent?
                if (feature.properties && feature.properties.popupContent) {
                    layer.bindPopup(feature.properties.popupContent);
                }
            }


            function style(feature) {
                return {
                    weight: 0.5,
                    opacity: 0.5,
                    dashArray: '3',
                    fillOpacity: 0.1
                };
            }

            function highlightFeature(e) {
                var layer = e.target;

                layer.setStyle({
                    weight: 5,
                    color: '#666',
                    dashArray: '',
                    fillOpacity: 0.7
                });


                info.update(layer.feature.properties);
            }



            function resetHighlight(e) {
                burglary.resetStyle(e.target);
                homicide.resetStyle(e.target);
                assault.resetStyle(e.target);
                info.update();
            }


            homicide = L.geoJSON(data, {
            onEachFeature: onEachFeature,
            style: function(feature) {
                switch (feature.properties.homicide_hotcold) {
                    case 'hot': return {color: "#de2d26",    weight: 0.5};
                    case 'cold':   return {color: "#2b8cbe", weight: 0.5};
                    case null:   return {color: "#FFFFFF",   weight: 0.5};
                }
            }});

            assault = L.geoJSON(data, {
            onEachFeature: onEachFeature,
            style: function(feature) {
                switch (feature.properties.assault_hotcold) {
                    case 'hot': return {color: "#de2d26",    weight: 0.5};
                    case 'cold':   return {color: "#2b8cbe", weight: 0.5};
                    case null:   return {color: "#FFFFFF",   weight: 0.5};
                }
            }});

            burglary = L.geoJSON(data, {
            onEachFeature: onEachFeature,
            style: function(feature) {
                switch (feature.properties.burglary_hotcold) {
                    case 'hot': return {color: "#de2d26",    weight: 0.5};
                    case 'cold':   return {color: "#2b8cbe", weight: 0.5};
                    case null:   return {color: "#FFFFFF",   weight: 0.5};

                }
            }});

            burglary.addTo(map) ;



            var overlayMaps = {
            "Burglary  ": burglary,
            "Homicide": homicide,
            "Assault  ": assault
            };

            var legend = L.control({position: 'bottomright'});

            legend.onAdd = function (map) {

                var div = L.DomUtil.create('div', 'info legend'),
                    labels = []
                    labels.push(
                            '<i style="text-align:center;color:black;width:40px;background:#de2d26"><b>Hot</b></i>'+'<br>'+
                            '<i style="text-align:center;color:black;width:40px;background:#2b8cbe"><b>Cold</b></i>'
                    )

                div.innerHTML = labels.join('<br>');
                return div;
            };

            legend.addTo(map);



            // L.control.layers(overlayMaps, {position: 'topleft'}).addTo(map);
            //scale bar
            // L.control.scale({maxWidth: 200}).addTo(map);

            var layerControl = L.control.layers(overlayMaps, null, {position:'topleft'}).addTo(map);

        $('#portfolioModal1').on('show.bs.modal', function (e) {
            setTimeout(function(){;
                map.invalidateSize();
            }, 250);                        
        })
    


});

