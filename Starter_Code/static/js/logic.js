let myMap = L.map("map", 
    {
    center: [40.7,-94.5],
    zoom: 3
    }
  );

  let link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

  
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
    {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }
).addTo(myMap);

d3.json(link).then(function(data){
    function styleInfo(feature){return{
        opacity: 1,
        fillOpacity: 1,
        fillColor: getColor(feature.geometry.coordinates[2]),
        color: "#000000",
        radius: getRadius(feature.properties.mag),
        weight: .5
        }}
    function getColor(depth){
        switch(true)
        {
        case depth > 90: return "#ea2c2c";
        case depth > 70: return "#ea822c";
        case depth > 50: return "#ee9c00";
        case depth > 30: return "#eecc00";
        case depth > 10: return "#d4ee00";
        default: return "#98ee00"
        }   
    }
    
    function getRadius(magnitude) {
        if(magnitude == 0)
        {
            return 1;
        }return magnitude * 4;
    }
    L.geoJson(data,{pointToLayer:function(feature,coords){
    return L.circleMarker(coords);
},
style: styleInfo,
onEachFeature: function(feature,layer){layer.bindPopup("Magnitude: "+ feature.properties.mag +
"<br> location" + feature.properties.place)
}}).addTo(myMap);
})

var legend = L.control({ position: "bottomleft" });

legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend");
  div.innerHTML += "<h4>Depth</h4>";
  div.innerHTML += '<i style="background: #ea2c2c"></i><span> > 90</span><br>';
  div.innerHTML += '<i style="background: #ea822c"></i><span> > 70</span><br>';
  div.innerHTML += '<i style="background: #ee9c00"></i><span> > 50</span><br>';
  div.innerHTML += '<i style="background: #eecc00"></i><span> > 30</span><br>';
  div.innerHTML += '<i style="background: #d4ee00"></i><span> > 10</span><br>';

  return div;
};
legend.addTo(myMap);

  

  