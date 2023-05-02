window.addEventListener('load', () => {
    const colorPicker = document.getElementById("colorPicker");
  
    function colorChange() {
      const chosenColor = colorPicker.value;
      colorPicker.style.backgroundColor = chosenColor;
    }
  
    colorPicker.addEventListener("input", () => {
      colorChange();
    });
  
    colorChange();
  });
  


  window.addEventListener('load', () => {
    const canvasColor = document.getElementById("canvasColor");
    const canvas = document.getElementById("canvas");
  
    function canvasColorChange() {
      const chosenColor = canvasColor.value;
      canvas.style.backgroundColor = chosenColor;
      canvasColor.style.backgroundColor = chosenColor;
    }
  
    canvasColor.addEventListener("input", () => {
        canvasColorChange();
    });
  
    canvasColorChange();
  });
  