const canvas = document.getElementById("canvas");

function clickHandler() {
  alert("You clicked the button!");   
}
        
Menu.CREATE.main("Click Me!", clickHandler)

Menu.CREATE.main("Hello");
Menu.CREATE.misc("World!");

Menu.draw(canvas);