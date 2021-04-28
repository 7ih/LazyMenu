let Menu = {
  // canvas, width, height = null
  main: {
    fontSize: 64,
    top: 50,
    left: 50,
    margin: 10,
    paddingLeft: 5,
    font: "Arial",
    text: ["black"],
    bg: ["dodgerBlue", "red"]
  },
  misc: {
    fontSize: 32,
    top: 300,
    left: 50,
    margin: 10,
    paddingLeft: 5,
    font: "Arial",
    text: ["black"],
    bg: ["lime"]
  },
  all: {
    width: null,
    height: null,
    fontSize: null,
    top: null,
    left: null,
    margin: null,
    paddingLeft: null,
    font: null,
    text: null,
    bg: null
  },

  img: {
    src: null,
    left: 500,
    top: 65
  },

  buttons: {
    main: [],
    misc: []
  },

  CREATE: {
    main: function (name, handler, options) {
      Menu.buttons.main.push({
        text: name,
        action: handler,
        ...options
        /*
          Current options:
          removeEventListener - boolean
          centerText - boolean
        */
      });
    },
    misc: function (name, handler, options) {
      Menu.buttons.misc.push({
        text: name,
        action: handler,
        ...options
      });
    }
  }
}

Menu.draw = function (canvas) {
  if (!canvas) {
    throw new Error("Please enter the canvas element as draw parameter");
    return;
  }
  Menu.canvas = canvas;

  var props = Menu.all;
  for (let i = 0; i < Object.keys(props).length; i++) {
    var value = Object.values(props)[i]
    if (value) {
      var prop = Object.keys(props)[i];
      Menu.main[prop] = value;
      Menu.misc[prop] = value;
    }
  }

  function calculateButtonWidth(id) {
    var array = Menu.buttons[id];
    var max = 0;
    for (let i = 0; i < array.length; i++) {
      var stringLength = array[i].text.length;
      if (stringLength > max) max = stringLength;
    }
    var buttonWidth = Menu[id].fontSize * (max / 1.8) + Menu[id].paddingLeft;
    return buttonWidth;
  }

  if (!Menu.main.width) Menu.main.width = calculateButtonWidth("main");
  if (!Menu.main.height) Menu.main.height = Menu.main.fontSize * 1.4;

  if (!Menu.misc.width) Menu.misc.width = calculateButtonWidth("misc");
  if (!Menu.misc.height) Menu.misc.height = Menu.misc.fontSize * 1.4;

  var canvas = Menu.canvas;
  var ctx = canvas.getContext('2d');

  var main = Menu.buttons.main;
  var misc = Menu.buttons.misc;

  function menuButtonClick(e) {
    e.preventDefault();

    var pos = {
      x: e.touches ? e.touches[0].clientX.realPos("x") : e.clientX.realPos("x"),
      y: e.touches ? e.touches[0].clientY.realPos("y") : e.clientY.realPos("y")
    };

    for (let i = 0; i < main.length; i++) {
      var m = main[i];
      var config = Menu.main;

      if (Menu.posOnButton(pos, m, config)) {
        if (m.removeEventListeners == null || m.removeEventListeners == true) {
          canvas.removeEventListener('mousemove', menuButtonHover);
          canvas.removeEventListener('click', menuButtonClick);
          canvas.removeEventListener('touchstart', menuButtonClick);
        }
        canvas.style.cursor = "default";
        m.action();
      }
    }
    for (let i = 0; i < misc.length; i++) {
      var m = misc[i];
      var config = Menu.misc;

      if (Menu.posOnButton(pos, m, config)) {
        if (m.removeEventListeners == true) {
          canvas.removeEventListener('mousemove', menuButtonHover);
          canvas.removeEventListener('click', menuButtonClick);
          canvas.removeEventListener('touchstart', menuButtonClick);
        }
        canvas.style.cursor = "default";
        m.action();
      }
    }
  }

  function menuButtonHover(e) {
    var pos = {
      x: e.clientX.realPos("x"),
      y: e.clientY.realPos("y")
    };

    var buttonHover = false;
    for (let i = 0; i < main.length; i++) {
      var m = main[i];
      var config = Menu.main;

      if (Menu.posOnButton(pos, m, config))
        buttonHover = true;
    }
    for (let i = 0; i < misc.length; i++) {
      var m = misc[i];
      var config = Menu.misc;

      if (Menu.posOnButton(pos, m, config))
        buttonHover = true;
    }
    if (buttonHover) canvas.style.cursor = "pointer";
    else canvas.style.cursor = "default";
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (Menu.img.src) {
    logo = new Image();
    logo.onload = function () { ctx.drawImage(logo, Menu.img.left, Menu.img.top); }
    logo.src = Menu.img.src;
  }

  for (let i = 0; i < main.length; i++) {
    var m = main[i];
    var config = Menu.main;

    m.x = config.left;
    m.y = config.top + i * (config.height + config.margin);

    Menu.drawButton(m, config, i % 2 == 0);
  }

  var optionsRow = 0;
  var evenColor = true;
  for (let i = 0; i < misc.length; i++) {

    if (i > 0) {
      if (i % 2 == 0) optionsRow++;
      else evenColor = !evenColor;
    }

    var m = misc[i];
    var config = Menu.misc;

    m.x = config.left + optionsRow * (config.width + config.margin);
    m.y = i % 2 == 0 ? config.top : config.top + config.height + config.margin;

    Menu.drawButton(m, config, evenColor);
  }

  canvas.addEventListener('mousemove', menuButtonHover);
  canvas.addEventListener('click', menuButtonClick);
  canvas.addEventListener('touchstart', menuButtonClick);
}

Menu.posOnButton = function (pos, button, config) {
  if (!button.action) return;
  if (pos.x > button.x && pos.x < button.x + config.width && pos.y > button.y && pos.y < button.y + config.height)
    return true;
  else return false;
}

Menu.drawButton = function (button, config, evenColor) {
  function execDraw() {
    var ctx = Menu.canvas.getContext('2d');
    ctx.beginPath();
    ctx.rect(button.x, button.y, config.width, config.height);
    if (evenColor) ctx.fillStyle = config.bg[0];
    else ctx.fillStyle = config.bg.length > 1 ? config.bg[1] : config.bg[0];
    ctx.fill();

    ctx.font = `${config.fontSize}px ${config.font}`;
    if (evenColor) ctx.fillStyle = config.text[0];
    else ctx.fillStyle = config.text.length > 1 ? config.text[1] : config.text[0];
    ctx.textAlign = button.centerText ? "center" : "start";
    var textX = button.centerText ? button.x + config.width / 2 : button.x + config.paddingLeft;
    ctx.fillText(button.text, textX, button.y + config.fontSize);
  }
  if (!document.fonts.check(`${config.fontSize}px ${config.font}`)) {
    document.fonts.load(`${config.fontSize}px ${config.font}`).then(execDraw);
  }
  else execDraw();
}

Number.prototype.realPos = function (axis) {
  var bounds = Menu.canvas.getBoundingClientRect();
  if (axis === "x") return this / bounds.width * canvas.width;
  else if (axis === "y") return this / bounds.height * canvas.height;
}