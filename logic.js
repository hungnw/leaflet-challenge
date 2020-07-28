// Create the tile layer that will be the background of our map

var streetmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
});

var satellitemap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.satellite",
  accessToken: API_KEY
});

var outdoorsmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.outdoors",
  accessToken: API_KEY
});

var piratesmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.pirates",
  accessToken: API_KEY
});

var comicmap = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.comic",
  accessToken: API_KEY
});

var baseMaps = {
    "Satellite Map": satellitemap,
    "Street Map": streetmap,
    "Outdoors Map": outdoorsmap,
    "Pirates Map": piratesmap,
    "Comic Map": comicmap
};

// Initialize all of the LayerGroups we'll be using
var layers = {
  HOUR: new L.LayerGroup(),
  DAY: new L.LayerGroup(),
  WEEK: new L.LayerGroup(),
  MONTH: new L.LayerGroup()
};

// Create the map with our layers
var map = L.map("map-id", {
  center: [37.0902, -95.7129],
  zoom: 4,
  layers: [satellitemap, layers.WEEK]
});

// Create an overlays object to add to the layer control
// https://github.com/ismyrnow/leaflet-groupedlayercontrol

var groupedOverlays = {
  "Earthquakes": {
    "Past Hour": layers.HOUR,
    "Past Day": layers.DAY,
    "Past Week": layers.WEEK,
    "Past Month": layers.MONTH
  }
};

var options = {

  // Make the group exclusive (use radio inputs)
  exclusiveGroups: ["Earthquakes"],

  // Show a checkbox next to non-exclusive group labels for toggling all
  groupCheckboxes: false
};

// Create a control for our layers, add our overlay layers to it
var layerControl = L.control.groupedLayers(baseMaps, groupedOverlays, options).addTo(map);

function chooseColor(mag) {
  var color = "";
  if (mag > 5) {
    color = "#FF0000";
  }
  else if (mag <= 5 && mag > 4) {
    color = "#DF7401";
  }
  else if (mag <= 4 && mag > 3) {
    color = "#FE9A2E";
  }
  else if (mag <= 3 && mag > 2) {
    color = "#F7BE81";
  }
  else if (mag <= 2 && mag > 1) {
    color = "#F7FE2E";
  }
  else {
    color = "#2EFE2E";
  }
  return color;
}

// Earthquakes - Past hour
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson", function(response) {
  // Loop through the array
  for (var index = 0; index < response.features.length; index++) {
    var earthquake = response.features[index];

    // For each, create a marker and bind a popup with the name
      var eqMarker = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
        fillOpacity: 0.75, stroke: false, fillColor: chooseColor(earthquake.properties.mag), radius: earthquake.properties.mag*25000})
        .bindPopup("<h3>" + earthquake.properties.place + "</h3><hr>" + new Date(earthquake.properties.time) + "<hr>" + earthquake.properties.mag + " Magnitude");

    
    // Add the new marker to the appropriate layer
    eqMarker.addTo(layers["HOUR"]);
  }
});

// Earthquakes - Past day
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(response) {
  // Loop through the array
  for (var index = 0; index < response.features.length; index++) {
    var earthquake = response.features[index];

    // For each, create a marker and bind a popup with the name
      var eqMarker = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
        fillOpacity: 0.75, stroke: false, fillColor: chooseColor(earthquake.properties.mag), radius: earthquake.properties.mag*25000})
        .bindPopup("<h3>" + earthquake.properties.place + "</h3><hr>" + new Date(earthquake.properties.time) + "<hr>" + earthquake.properties.mag + " Magnitude");

    
    // Add the new marker to the appropriate layer
    eqMarker.addTo(layers["DAY"]);
  }
});

// Earthquakes - Past week
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson", function(response) {
  // Loop through the array
  for (var index = 0; index < response.features.length; index++) {
    var earthquake = response.features[index];

    // For each, create a marker and bind a popup with the name
      var eqMarker = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
        fillOpacity: 0.75, stroke: false, fillColor: chooseColor(earthquake.properties.mag), radius: earthquake.properties.mag*25000})
        .bindPopup("<h3>" + earthquake.properties.place + "</h3><hr>" + new Date(earthquake.properties.time) + "<hr>" + earthquake.properties.mag + " Magnitude");

    
    // Add the new marker to the appropriate layer
    eqMarker.addTo(layers["WEEK"]);
  }
});

// Earthquakes - Past month
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_month.geojson", function(response) {
  // Loop through the array
  for (var index = 0; index < response.features.length; index++) {
    var earthquake = response.features[index];

    // For each, create a marker and bind a popup with the name
      var eqMarker = L.circle([earthquake.geometry.coordinates[1], earthquake.geometry.coordinates[0]], {
        fillOpacity: 0.75, stroke: false, fillColor: chooseColor(earthquake.properties.mag), radius: earthquake.properties.mag*25000})
        .bindPopup("<h3>" + earthquake.properties.place + "</h3><hr>" + new Date(earthquake.properties.time) + "<hr>" + earthquake.properties.mag + " Magnitude");

    
    // Add the new marker to the appropriate layer
    eqMarker.addTo(layers["MONTH"]);
  }
});

function onEachFeature(feature, layer) {
    markers.addLayer(L.circle([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], {
      fillOpacity: 0.75,color: "white",fillColor: f_get_color(feature.properties.mag),radius: feature.properties.mag*10000})
      .bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p><hr><p>" + feature.properties.mag + " Magnitude </p>"));
    
    quakes.addLayer(L.marker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]])
    .bindPopup("<h3>" + feature.properties.place + "</h3><hr><p>" + new Date(feature.properties.time) + "</p><hr><p>" + feature.properties.mag + " Magnitude </p>"));
}

function getColor(d) {
    return d > 5 ? '#FF0000' :
           d > 4  ? '#DF7401' :
           d > 3  ? '#FE9A2E' :
           d > 2  ? '#F7BE81' :
           d > 1   ? '#F7FE2E' :
                      '#2EFE2E';
}

var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {

    var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }

    return div;
};

legend.addTo(map);