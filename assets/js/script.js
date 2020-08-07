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
var time = new Date().toLocaleTimeString('en-US', {timeZone: 'America/Denver'});

// Add some custom data
polygonSeries.data = [{
  "id": "US",
  "color": am4core.color("#3F4B3B"),
  "description": "United States of America",
  "time": 'America/Vancouver',
  "flag": 'usa',
  "capital": "Washington",
  "currency": "United States dollar ($) (USD)",
  "excange": "1$",
  "img_1": "https://cdn.lifehacker.ru/wp-content/uploads/2018/12/Kak-fotografirovat-kotikov-19-sovetov-ot-professionala_1544744286-1140x570.jpg",
  "img_2": "https://i.ytimg.com/vi/lkQ0LDx9jHs/maxresdefault.jpg"
}, {
  "id": "RU",
  "color": am4core.color("#3F4B3B"),
  "description": "Russian Federation",
  "time": 'Europe/Moscow',
  "flag": 'russia',
  "capital": "Moscow",
  "currency": "Russian ruble (₽) (RUB)",
  "excange": "74 руб",
  "img_1": "https://bipbap.ru/wp-content/uploads/2017/10/tmp695682350633189377-640x640.jpg",
  "img_2": "https://proprikol.ru/wp-content/uploads/2019/07/kartinki-sobachki-35.jpg"
}, {
  "id": "DE",
  "color": am4core.color("#3F4B3B"),
  "description": "Germany",
  "time": 'Europe/Berlin',
  "flag": 'germany',
  "capital": "Berlin",
  "currency": "Euro (€) (EUR)",
  "excange": "74 руб",
  "img_1": "https://bipbap.ru/wp-content/uploads/2017/10/tmp695682350633189377-640x640.jpg",
  "img_2": "https://proprikol.ru/wp-content/uploads/2019/07/kartinki-sobachki-35.jpg"
}, {
  "id": "CA",
  "color": am4core.color("#3F4B3B"),
  "description": "Canada",
  "time": 'America/Toronto',
  "flag": 'canada',
  "capital": "Ottawa",
  "currency": "Canadian dollar ($) (CAD)",
  "excange": "74 руб",
  "img_1": "https://bipbap.ru/wp-content/uploads/2017/10/tmp695682350633189377-640x640.jpg",
  "img_2": "https://proprikol.ru/wp-content/uploads/2019/07/kartinki-sobachki-35.jpg"
}, {
  "id": "GB",
  "color": am4core.color("#3F4B3B"),
  "description": "United Kingdom of Great Britain",
  "time": 'Europe/London',
  "flag": 'GB',
  "capital": "London",
  "currency": "Pound sterling (GBP)",
  "excange": "74 руб",
  "img_1": "https://bipbap.ru/wp-content/uploads/2017/10/tmp695682350633189377-640x640.jpg",
  "img_2": "https://proprikol.ru/wp-content/uploads/2019/07/kartinki-sobachki-35.jpg"
}, {
  "id": "JP",
  "color": am4core.color("#3F4B3B"),
  "description": "Japan",
  "time": 'Asia/Tokyo',
  "flag": 'japan',
  "capital": "Tokyo",
  "currency": "Japanese yen (¥) (JPY)",
  "excange": "74 руб",
  "img_1": "https://bipbap.ru/wp-content/uploads/2017/10/tmp695682350633189377-640x640.jpg",
  "img_2": "https://proprikol.ru/wp-content/uploads/2019/07/kartinki-sobachki-35.jpg"
}, {
  "id": "IT",
  "color": am4core.color("#3F4B3B"),
  "description": "Italian Republic",
  "time": 'Europe/Rome',
  "flag": 'italy',
  "capital": "Rome",
  "currency": "Euro (€) (EUR)",
  "excange": "74 руб",
  "img_1": "https://bipbap.ru/wp-content/uploads/2017/10/tmp695682350633189377-640x640.jpg",
  "img_2": "https://proprikol.ru/wp-content/uploads/2019/07/kartinki-sobachki-35.jpg"
}, {  
  "id": "FR",
  "color": am4core.color("#3F4B3B"),
  "description": "France",
  "time": 'Europe/Paris',
  "flag": 'france',
  "capital": "Paris",
  "currency": "Euro (€) (EUR)",
  "excange": "74 руб",
  "img_1": "https://bipbap.ru/wp-content/uploads/2017/10/tmp695682350633189377-640x640.jpg",
  "img_2": "https://proprikol.ru/wp-content/uploads/2019/07/kartinki-sobachki-35.jpg"
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
  img_1.innerHTML = '<img src="assets/img/3.png" />';
  img_2.innerHTML = '<img src="assets/img/4.png" />';
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
  var flag = document.getElementById("flag");
  var description = document.getElementById("description");
  // var excange = document.getElementById("excange");

  info.innerHTML = "<h3>" + data.name + " (" + data.id + ")</h3> <br/>";
  capital.innerHTML = "<strong>" + "Capital: " + "</strong>" + (data.capital || '');
  time.innerHTML = "<strong>" + "Time: " + "</strong>" + (new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', timeZone: data.time }) || '');
  currency.innerHTML = "<strong>" + "Currency: " + "</strong>" + (data.currency || '');
  // excange.innerHTML = "<strong>" + "Exchange rate against $: " + "</strong>" + (data.excange || '');
  flag.innerHTML =  '<img src="assets/img/flags/' + data.flag + '.gif" />';
  img_1.innerHTML = '<img src="' +(data.img_1 || 'assets/img/3.png') + '" class="minimized" />';
  img_2.innerHTML = '<img src="' +(data.img_2 || 'assets/img/4.png') + '" class="minimized" />';
  description.innerHTML = data.description || "<i>No description provided.</i>";
});

var hoverState = polygonTemplate.states.create("hover");
hoverState.properties.fill = colorSet.getIndex(0);

// Configure "active" state
var activeState = polygonTemplate.states.create("active");
activeState.properties.fill = colorSet.getIndex(4);

// Add zoom control
chart.zoomControl = new am4maps.ZoomControl();