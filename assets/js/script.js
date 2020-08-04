// Set themes
am4core.useTheme(am4themes_animated);

// Create the map chart
var chart = am4core.create("chartdiv", am4maps.MapChart);

// Chech if proper geodata is loaded
try {
  chart.geodata = am4geodata_worldLow;
} catch (e) {
  chart.raiseCriticalError(new Error("Map geodata could not be loaded. Please download the latest <a href=\"https://www.amcharts.com/download/download-v4/\">amcharts geodata</a> and extract its contents into the same directory as your amCharts files."));
}

// Set projection to be used
// @see {@link https://www.amcharts.com/docs/v4/reference/mapchart/#projection_property}
chart.projection = new am4maps.projections.Miller();

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
  "description": "Пендостан",
  "time": '22:24',
  "capital": "Washington",
  "currency": "$",
  "excange": "1$",
  "img_1": "https://cdn.lifehacker.ru/wp-content/uploads/2018/12/Kak-fotografirovat-kotikov-19-sovetov-ot-professionala_1544744286-1140x570.jpg",
  "img_2": "https://i.ytimg.com/vi/lkQ0LDx9jHs/maxresdefault.jpg"
}, {
  "id": "RU",
  "color": am4core.color("#3F4B3B"),
  "description": "This is Russia Blat!",
  "time": '03:24',
  "capital": "Moskva",
  "currency": "derevyanniy",
  "excange": "74 руб",
  "img_1": "https://bipbap.ru/wp-content/uploads/2017/10/tmp695682350633189377-640x640.jpg",
  "img_2": "https://proprikol.ru/wp-content/uploads/2019/07/kartinki-sobachki-35.jpg"
}, {
  "id": "UA",
  "color": am4core.color("#3F4B3B"),
  "description": "Привет из Украины",
  "time": '04:24',
  "capital": "Kyiv",
  "currency": "grivna",
  "excange": "28 грн",
  "img_1": "https://s1.stc.all.kpcdn.net/putevoditel/projectid_103889/images/tild6531-3732-4462-a337-333237636234__1.jpg",
  "img_2": "https://img.pravda.ru/image/preview/article/5/1/4/1042514_five.jpeg"
}]
var currentActive;
// Configure series
var polygonTemplate = polygonSeries.mapPolygons.template;
polygonTemplate.tooltipText = "{name}";
polygonTemplate.togglable = true;
polygonTemplate.propertyFields.fill = "color";


polygonTemplate.events.once("ready", function (ev) {
  var img_1 = document.getElementById("img_1");
  var img_2 = document.getElementById("img_2");
  var info = document.getElementById("info");
  img_1.innerHTML = '<img src="assets/img/3.png" class="minimized" >';
  img_2.innerHTML = '<img src="assets/img/4.png" class="minimized" >';
  info.innerHTML = "<i>Please, choose any country</i>";
});

polygonTemplate.events.on("hit", function (ev) {
  if (currentActive) {
    currentActive.isActive = false;
  }
  chart.zoomToMapObject(ev.target, 3, true);
  currentActive = ev.target;

  var data = ev.target.dataItem.dataContext;

  var capital = document.getElementById("capital");
  var time = document.getElementById("time");
  var currency = document.getElementById("currency");
  var excange = document.getElementById("excange");

  info.innerHTML = "<h3>" + data.name + " (" + data.id + ")</h3> <br/>";
  capital.innerHTML = "<strong>" + "Capital: " + "</strong>" + (data.capital || '');
  time.innerHTML = "<strong>" + "Time: " + "</strong>" + (data.time || '');
  currency.innerHTML = "<strong>" + "Currency: " + "</strong>" + (data.currency || '');
  excange.innerHTML = "<strong>" + "Exchange rate against $: " + "</strong>" + (data.excange || '');
  img_1.innerHTML = '<img src="' +(data.img_1 || 'assets/img/3.png') + '" class="minimized" >';
  img_2.innerHTML = '<img src="' +(data.img_2 || 'assets/img/4.png') + '" class="minimized" >';

  if (data.description) {
    info.innerHTML += data.description;
  } else {
    info.innerHTML += "<i>No description provided.</i>"
  }
});

var hoverState = polygonTemplate.states.create("hover");
hoverState.properties.fill = colorSet.getIndex(0);

// Configure "active" state
var activeState = polygonTemplate.states.create("active");
activeState.properties.fill = colorSet.getIndex(4);

// Add zoom control
chart.zoomControl = new am4maps.ZoomControl();