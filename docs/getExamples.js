window.onload = async function() {
  var $el = ()=>{return document.getElementById("examples")} // wtf

  $el().insertAdjacentText('afterbegin', "Fetching examples...");

  var examples = await new Promise((res, rej) => {
    fetch('info.json').then(response => {
      if (response.ok) return response.json();
      else rej(response.status);
    }).then(data => res(data.examples))
  }).catch(e => alert("Couldn't retrieve examples. Error: " + e));

  var list = "";

  while($el().firstChild) {$el().removeChild($el().firstChild);}

  for (let i = 0; i < examples.length; i++) {
    var e = examples[i];

    var source = await new Promise((res) => {
      fetch(e.source).then(response => {
        if (response.ok) return response.text();
        else res("Error: " + response.status);
      }).then(data => res(data))
    });

    $el().insertAdjacentHTML('beforeend',
      `<li><a href="${e.link}" target="_blank">${e.name}</a></li>
      <button class="source">view source</button>
      <pre style="max-height: 0; transition: all 0.5s; overflow: auto;"><code>${source}</code></pre>`
    );

    if (i+1 == examples.length) {
      var buttons = document.querySelectorAll(".source");

      for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", function() {
          var source = this.nextElementSibling;
          if (parseInt(getComputedStyle(source).maxHeight) > 0) source.style.maxHeight = "0";
          else source.style.maxHeight = "500px";
        });
      }
    }
  }
}