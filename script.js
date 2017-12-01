// function grabbed from here: https://stackoverflow.com/questions/324486/how-do-you-read-css-rule-values-with-javascript
function getStyle(className) {
  var classes = document.styleSheets[0].rules || document.styleSheets[0].cssRules;
  for (var x = 0; x < classes.length; x++) {
    if (classes[x].selectorText && classes[x].selectorText.split(',').includes(className)) {
      return classes[x].cssText ? classes[x].cssText : classes[x].style.cssText;
    }
  }
  return '';
}

function showStyles(e) {
  var target = e.target;
  
  var bgColor = target.style.background;
  target.style.background = 'lightyellow';
  addEventListener('mouseout', function() { target.style.background = bgColor; });
  
  var classes = target.className.split(/ /g);
  styles.innerHTML = '';
  // console.log(classes)
  if (classes[0].length === 0) {
    styles.innerHTML = '(no bootstrap classes exist on this element)';
    return;
  }
  classes.forEach(function(c) {
    var style = getStyle('.'+c)
      .replace(/\{/g, '{\n    ')
      .replace(/;/g, ';\n    ')
      .replace(/\s{5}}/g, '}\n');
    styles.innerHTML += style + '\n';
  });
}

var button = document.querySelector('#go');
var render = document.querySelector('#render');
var styles = document.querySelector('#styles');
var input = document.querySelector('#input');
var loadEx = document.querySelector('#load-example');

button.addEventListener('click', function() {
  render.innerHTML = input.value.replace(/^\s+|\s+$/g, '');
  var renderedElem = render.firstChild;
  renderedElem.addEventListener('mouseover', showStyles);
});

loadEx.addEventListener('click', function() {
  input.value = `<div class="jumbotron">
  <h1 class="display-3">Hello, world!</h1>
  <p class="lead">This is a simple hero unit, a simple jumbotron-style component for
                  calling extra attention to featured content or information.</p>
  <hr class="my-2">
  <p>It uses utility classes for typography and
     spacing to space content out within the larger container.</p>
  <p class="lead">
    <a class="btn btn-primary btn-lg" href="#!" role="button">Some action</a>
  </p>
</div>
`
})