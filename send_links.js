

var links = [].slice.apply(document.getElementsByTagName('a'));
links = links.map(function(element) {
  var href = element.href;
  var hashIndex = href.indexOf('#');
  if (hashIndex >= 0) {
    href = href.substr(0, hashIndex);
  }
  return href;
});

links.sort();

var kBadPrefix = 'javascript';
for (var i = 0; i < links.length;) {
  if (((i > 0) && (links[i] == links[i - 1])) ||
      (links[i] == '') ||
      (kBadPrefix == links[i].toLowerCase().substr(0, kBadPrefix.length)) ||
      (links[i].includes('google')) ||
      !(links[i].match('.*login.*') || links[i].match('.*sign.*')) ) {
    links.splice(i, 1);
  } else {
    ++i;
  }
}

var data = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(links));
var element = document.createElement('a');
element.setAttribute('href', data);
element.setAttribute('download', 'test.json');

element.style.display = 'none';
document.body.appendChild(element);

element.click();

document.body.removeChild(element);

chrome.extension.sendRequest(links);
