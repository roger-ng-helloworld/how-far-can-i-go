var hwTemplates = {};

hwTemplates["../../views/app.html"] = "<h1 class=\"col-xs-16\">How far can I go</h1>\n" +
   "\n" +
   "<div class=\"right-rail col-md-11 col-md-push-5 \">\n" +
   "	<div class=\"js-slider slider\"></div>\n" +
   "	<div class=\"js-map map\"></div>\n" +
   "</div>\n" +
   "\n" +
   "<div class=\"js-prices prices col-md-5 col-md-pull-11 hidden-xs hidden-sm\"></div>\n" +
   " ";

hwTemplates["../../views/map.html"] = "<div id=\"js-google-maps\" class=\"google-maps\">Google Maps</div>";

hwTemplates["../../views/origin.html"] = "<select can-value=\"origin\">\n" +
   "	<option value=\"sydney\">Sydney</option>\n" +
   "	<option value=\"melbourne\">Melbourne</option>\n" +
   "	<option value=\"brisbane\">Brisbane</option>\n" +
   "	<option value=\"perth\">Perth</option>\n" +
   "	<option value=\"adelaide\">Adelaide</option>\n" +
   "	<option value=\"darwin\">Darwin</option>\n" +
   "	<option value=\"hobart\">Hobart</option>\n" +
   "</select>";

hwTemplates["../../views/prices.html"] = "<div class=\"price-panel col-xs-16\">\n" +
   "<h2>Deals</h2>\n" +
   "<ul>\n" +
   "	\n" +
   "	{{#products}}\n" +
   "		<li>\n" +
   "			<div class=\"img\"><img src=\"{{img}}\" /></div>\n" +
   "			<div class=\"city\">{{city}}</div>\n" +
   "			<div class=\"date\">{{date}} | {{journeyType}}</div>\n" +
   "			<div class=\"journey-type\"></div>\n" +
   "			<div class=\"price\">${{price}}</div>\n" +
   "			<div class=\"cta\"><a class=\"btn full\" href=\"{{cta}}\" target=\"_blank\">View</a></div>\n" +
   "		</li>\n" +
   "	{{/products}}\n" +
   "	\n" +
   "</ul>\n" +
   "</div>";

hwTemplates["../../views/slider.html"] = "<div id=\"js-slider\"></div>\n" +
   "\n" +
   "<p>\n" +
   "\n" +
   "Travelling from \n" +
   "\n" +
   "<select can-value=\"origin\">\n" +
   "	<option value=\"sydney\">Sydney</option>\n" +
   "	<option value=\"melbourne\">Melbourne</option>\n" +
   "	<option value=\"canberra\">Canberra</option>\n" +
   "	<option value=\"brisbane\">Brisbane</option>\n" +
   "	<option value=\"perth\">Perth</option>\n" +
   "	<option value=\"adelaide\">Adelaide</option>\n" +
   "	<option value=\"darwin\">Darwin</option>\n" +
   "	<option value=\"hobart\">Hobart</option>\n" +
   "</select>\n" +
   "\n" +
   "with the budget of \n" +
   "\n" +
   "<span class=\"budget\">${{budget}}</span>\n" +
   "\n" +
   "</p>";
