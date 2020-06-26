/**
 * --------------------------------------------------------
 * This demo was created using amCharts V4 preview release.
 *
 * V4 is the latest installement in amCharts data viz
 * library family, to be released in the first half of
 * 2018.
 *
 * For more information and documentation visit:
 * https://www.amcharts.com/docs/v4/
 * --------------------------------------------------------
 */

 // Set themes
am4core.useTheme(am4themes_animated);

// Create the map chart
var chart = am4core.create("chartdiv", am4maps.MapChart);


// Chech if proper geodata is loaded
try {
	chart.geodata = am4geodata_worldLow;
}
catch (e) {
	chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
}

// Set projection to be used
// @see {@link https://www.amcharts.com/docs/v4/reference/mapchart/#projection_property}
chart.projection = new am4maps.projections.Miller();

// // Create map instance
// var chart = am4core.create("chartdiv", am4maps.MapChart);
// am4core.useTheme(am4themes_animated);
// // Set map definition
// chart.geodata = am4geodata_worldLow;

// // Set projection
// chart.projection = new am4maps.projections.Miller();

// Create map polygon series
var polygonSeries = chart.series.push(new am4maps.MapPolygonSeries());
// Make map load polygon (like country names) data from GeoJSON
polygonSeries.useGeodata = true;
polygonSeries.exclude = ["AQ"]; // Exclude Antractica
polygonSeries.tooltip.fill = am4core.color("#000000");



var colorSet = new am4core.ColorSet();

// Add some custom data
polygonSeries.data = [{
  "id": "US",
  "color": am4core.color("#3F4B3B"),
  "description": "Пендостан"
}, {
  "id": "RU",
  "color": am4core.color("#3F4B3B"),
  "description": "This is Russia Blat!"
}, {
  "id": "UA",
  "color": am4core.color("#3F4B3B"),
  "description": "Привет из Украины"
}]
var currentActive;
// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.togglable = true;
// polygonTemplate.fill = am4core.color("#5CAB7D");
polygonTemplate.propertyFields.fill = "color";

polygonTemplate.events.on("hit", function(ev) {
	if (currentActive) {	
		currentActive.isActive = false;
	}
	chart.zoomToMapObject(ev.target, 3, true);
	currentActive = ev.target;

	var data = ev.target.dataItem.dataContext;
  var info = document.getElementById("info");
  info.innerHTML = "<h3>" + data.name + " (" + data.id  + ")</h3>";
  if (data.description) {
    info.innerHTML += data.description;
  }
  else {
    info.innerHTML += "<i>No description provided.</i>"
  }
});

// Create hover state and set alternative fill color
// var hs = polygonTemplate.states.create("hover");
// hs.properties.fill = am4core.color("#5A9367");

var hoverState = polygonTemplate.states.create("hover");
hoverState.properties.fill = colorSet.getIndex(0);

// Configure "active" state
var activeState = polygonTemplate.states.create("active");
activeState.properties.fill = colorSet.getIndex(4);

// Add zoom control
chart.zoomControl = new am4maps.ZoomControl();