var myvar = {
  'name': 'Chrome 49 Patch',
  'uas': 'User-Agent Switcher for Chrome',
  'ua-name': 'Chrome 60',
  'ua-flag': 'C60',
  'ua-string': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/60.0.3112.78 Safari/537.36'
};

(function() {
  // DRY
  document.title = myvar.name;
  Array.from(document.querySelectorAll('[data-t]'), function(element) {
    element.innerText = myvar[element.dataset.t];
  });
  Array.from(document.querySelectorAll('[data-v]'), function(element) {
    element.value = myvar[element.dataset.v];
  });

  Array.from(document.getElementById('ua').querySelectorAll('input'), function(element) {
    element.addEventListener('focus', function() {
      this.select();
    });
  });
})();
