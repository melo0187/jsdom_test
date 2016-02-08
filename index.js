var fs = require('fs');
var path = require('path');
var jsdom = require('jsdom').jsdom;
var serializeDocument = require('jsdom').serializeDocument;

var htmlSource = fs.readFileSync('sample.html', 'utf8');
var document = jsdom(htmlSource);
  
var s = document.createElement("script");
s.type = 'text/javascript';
s.innerHTML = `
var _paq = _paq || [];
_paq.push(['trackPageView']);
_paq.push(['enableLinkTracking']);
(function() {
  var u="//your/piwik/";
  _paq.push(['setTrackerUrl', u+'js/index.php']);
  _paq.push(['setSiteId', 1]);
  var d=document, g=d.createElement('script'), s=d.getElementsByTagName('script')[0];
  g.type='text/javascript'; g.async=true; g.defer=true; g.src=u+'js/index.php'; s.parentNode.insertBefore(g,s);
})();
`;

var first_script = document.getElementsByTagName('script')[0];
first_script.parentNode.insertBefore(s, first_script);

fs.writeFileSync("sample_tracking.html", serializeDocument(document), "utf8");
