/*const map = new ol.Map({
    target: 'map',
    layers: [
        new TileLayer({
            source: new XYZ({
                url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
            })
        })
    ],
    view: new ol.View({
        center: ol.proj.fromLonLat([37.41, 8.82]),
        zoom: 4
    })
});*/

(function() {
    var styles = {
        'Point': [new ol.style.Style({
            image: new ol.style.Circle({
                radius: 8,
                fill: new ol.style.Fill({
                    color: [255, 255, 255, 0.3]
                }),
                stroke: new ol.style.Stroke({color: '#cb1d1d', width: 2})
            })
        })],
        'LineString': [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'green',
                width: 1
            })
        })],
        'Polygon': [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'blue',
                lineDash: [4],
                width: 3
            }),
            fill: new ol.style.Fill({
                color: 'rgba(0, 0, 255, 0.1)'
            })
        })],
        'Circle': [new ol.style.Style({
            stroke: new ol.style.Stroke({
                color: 'red',
                width: 2
            }),
            fill: new ol.style.Fill({
                color: 'rgba(255,0,0,0.2)'
            })
        })]
    };

    var styleFunction = function(feature, resolution) {
        return styles[feature.getGeometry().getType()];
    };

    var geojson_layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'file.geojson',
            format: new ol.format.GeoJSON()
        }),
        style: styleFunction
    });

    var map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Group({
                'title': 'Base maps',
                layers: [
                    new ol.layer.Tile({
                        title: 'OSM',
                        type: 'base',
                        visible: true,
                        source: new ol.source.OSM()
                    }),
                    new ol.layer.Tile({
                        type: 'base',
                        title: 'OpenTopoMap',
                        source: new ol.source.XYZ({
                            url: 'https://{a-c}.tile.opentopomap.org/{z}/{x}/{y}.png'
                        })
                    }),
                    new ol.layer.Tile({
                        type: 'base',
                        title: 'Mapbox Outdoors',
                        source: new ol.source.XYZ({
                            url: 'https://api.mapbox.com/styles/v1/simonbohnen/cjxm0imqv0cl41coa3ipspg6c/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2ltb25ib2huZW4iLCJhIjoiY2p4aW9leGZhMXNkNTQxbDdjeGlxN3c2dCJ9.l9OK6BGObhF7BqaVLMTN-w'
                        })
                    }),
                ]
            }),
            new ol.layer.Group({
                title: 'Overlays',
                layers: [
                    new ol.layer.Tile({
                        title: 'Hillshade',
                        source: new ol.source.XYZ({
                            url: 'https://api.mapbox.com/styles/v1/simonbohnen/cjxlzuadi0bll1coc00khaagd/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2ltb25ib2huZW4iLCJhIjoiY2p4aW9leGZhMXNkNTQxbDdjeGlxN3c2dCJ9.l9OK6BGObhF7BqaVLMTN-w'
                        })
                    }),
                    new ol.layer.Tile({
                        title: 'Contour',
                        source: new ol.source.XYZ({
                            url: 'https://api.mapbox.com/styles/v1/simonbohnen/cjxm02lsr0c6v1coa2p7i0dgw/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2ltb25ib2huZW4iLCJhIjoiY2p4aW9leGZhMXNkNTQxbDdjeGlxN3c2dCJ9.l9OK6BGObhF7BqaVLMTN-w'
                        })
                    }),
                ]
            }),
            geojson_layer
        ],
        view: new ol.View({
            center: ol.proj.transform([-0.92, 52.96], 'EPSG:4326', 'EPSG:3857'),
            zoom: 6
        })
    });

    var layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Légende' // Optional label for button
    });
    map.addControl(layerSwitcher);


    /**
     * Popup
     **/
    var
        container = document.getElementById('popup'),
        content_element = document.getElementById('popup-content'),
        closer = document.getElementById('popup-closer');

    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
    var overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        offset: [0, -10]
    });
    map.addOverlay(overlay);

    var fullscreen = new ol.control.FullScreen();
    map.addControl(fullscreen);

    map.on('click', function(evt){
        var feature = map.forEachFeatureAtPixel(evt.pixel,
            function(feature, layer) {
                return feature;
            });
        if (feature) {
            var geometry = feature.getGeometry();
            var coord = geometry.getCoordinates();

            var content = '<h3>' + feature.get('name') + '</h3>';
            content += '<h5>' + feature.get('description') + '</h5>';

            content_element.innerHTML = content;
            overlay.setPosition(coord);

            //console.info(feature.getProperties());
        }
    });
    map.on('pointermove', function(e) {
        if (e.dragging) return;

        var pixel = map.getEventPixel(e.originalEvent);
        var hit = map.hasFeatureAtPixel(pixel);

        //map.getTarget().style.cursor = hit ? 'pointer' : '';
    });

})();