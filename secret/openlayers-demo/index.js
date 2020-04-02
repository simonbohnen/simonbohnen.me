(function() {

    const heatmapLayer = new ol.layer.Heatmap({
        source: new ol.source.Vector({
            url: 'data/heatmap.json',
            format: new ol.format.GeoJSON()
        }),
        blur: 30,
        radius: 15,
        gradient: [
            "#FFEE55",
            "#DD3300"
        ],
        //Heatmap soll erst ab Zoomlevel 80 oder höher angezeigt werden
        maxResolution: 80
    });

    let styleFunction = function (feature, resolution) {
        if(feature.getGeometry() instanceof ol.geom.GeometryCollection) {
            let geometries = feature.getGeometry().getGeometries();
            const point = geometries[0];
            const polygon = geometries[1];

            //Style, der das Feuer-Icon anzeigt
            const pointStyle = new ol.style.Style({
                geometry: point,
                image: new ol.style.Icon({
                    src: "fire_icon.png",
                    anchor: [0.5, 0.5],
                    anchorXUnits: 'fraction',
                    anchorYUnits: 'fraction',
                    scale: 0.2
                })
            });

            //Umriss des Polygons
            const polygonStyle = new ol.style.Style({
                geometry: polygon,
                stroke: new ol.style.Stroke({
                    color: "#FF0000"
                })
            });

            return [pointStyle, polygonStyle];
        }
    };

    //Der Layer, der die Umrisse, Marker und weiter Inforationen zu den Feuern enthält
    const geojson_layer = new ol.layer.Vector({
        source: new ol.source.Vector({
            url: 'data/majorIncidents.json',
            format: new ol.format.GeoJSON()
        }),
        style: styleFunction
    });

    const map = new ol.Map({
        target: 'map',
        //Maßstab ist manchmal ganz hilfreich
        controls: ol.control.defaults().extend([
            new ol.control.ScaleLine()
        ]),
        //Die verschiedenen BaseLayer: OpenStreetMap, OpenTopoMap oder eine Outdoor-Karte von Mapbox
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
            //Zur Mapbox-Karte kann Hillshading oder Höhenlinien dazugeschaltet werden.
            //Leider konnte ich die Höhenlinien bei der OpenTopoMap nicht isolieren.
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
            heatmapLayer,
            geojson_layer
        ],
        //Ansicht Südostaustraliens
        view: new ol.View({
            center: ol.proj.transform([144, -37], 'EPSG:4326', 'EPSG:3857'),
            zoom: 6
        })
    });

    //Erzeugt den LayerSwitcher-Button oben rechts
    const layerSwitcher = new ol.control.LayerSwitcher({
        tipLabel: 'Legend' // Optional label for button
    });
    map.addControl(layerSwitcher);


    //Popup
    const container = document.getElementById('popup'),
        content_element = document.getElementById('popup-content'),
        closer = document.getElementById('popup-closer');

    closer.onclick = function() {
        overlay.setPosition(undefined);
        closer.blur();
        return false;
    };
    const overlay = new ol.Overlay({
        element: container,
        autoPan: true,
        offset: [10, 0]
    });
    map.addOverlay(overlay);

    const fullscreen = new ol.control.FullScreen();
    map.addControl(fullscreen);

    map.on('click', function(evt){
        const feature = map.forEachFeatureAtPixel(evt.pixel,
            function (feature, layer) {
                return feature;
            },
            {
                hitTolerance: 6
            });
        if (feature) {
            const geometry = feature.getGeometry();
            let coord;
            //Auswahl des Markerpunktes
            if(geometry instanceof ol.geom.GeometryCollection) {
                geometry.getGeometries().forEach(function(geom) {
                    if(geom instanceof ol.geom.Point) {
                        coord = geom.getCoordinates();
                    }
                });
            }

            //Anzeigen der weiteren Informationen zum Feuer
            let content = '<h3>' + feature.get('title') + '</h3>';
            content += '<h5>' + feature.get('description') + '</h5>';

            content_element.innerHTML = content;
            overlay.setPosition(coord);
        }
    });
})();