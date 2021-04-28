const canvas = document.getElementsByTagName('canvas')[0];

Menu.CREATE.main("Install", function() {
  window.location.href = "https://lazymenu.hmarin.repl.co/getting-started.html";
});
Menu.CREATE.main("Docs", function() {
  window.location.href = "https://lazymenu.hmarin.repl.co/docs.html";
});
Menu.CREATE.main("Examples", function() {
  window.location.href = "https://lazymenu.hmarin.repl.co/examples.html";
});

let version;
Menu.CREATE.misc("About", async function() {
  if (!version) {
    version = await new Promise((res) => {
      fetch('info.json').then(response => {
        if (response.ok) return response.json();
        else res("unknown");
      }).then(data => res(data.version))
    });
  }
  alert(`
  This page is created using the LazyMenu API for JS canvas, no CSS.
  Current version: ${version}
  
  Created by:
  @7ih Github
  @hMarin replit.com
  
  Read the docs for more information.`
  );
});
Menu.CREATE.misc("Page Source", async function() {
  window.open("https://lazymenu.hmarin.repl.co/index/script.js", '_blank');
});
Menu.CREATE.misc("Projects", function() {
  window.open("https://projects.hmarin.repl.co/", '_blank');
});

Menu.main.fontSize = 80;
Menu.main.width = 500;
Menu.misc.fontSize = 50;
Menu.misc.paddingLeft = 5;
Menu.misc.top = 700;
Menu.misc.width = 365;
Menu.img.src = "img/logo.png";
Menu.img.left = 675;
Menu.img.top = 150;
Menu.draw(canvas);