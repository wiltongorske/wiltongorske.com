(function () {
  var cursorDot = document.getElementById("cursor-dot");

  if (!cursorDot || window.innerWidth <= 768) {
    return;
  }

  var mouseX = window.innerWidth / 2;
  var mouseY = window.innerHeight / 2;
  var currentX = mouseX;
  var currentY = mouseY;
  var delay = 0.1;

  document.addEventListener("mousemove", function (event) {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  function animate() {
    currentX += (mouseX - currentX) * delay;
    currentY += (mouseY - currentY) * delay;
    cursorDot.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
    window.requestAnimationFrame(animate);
  }

  window.requestAnimationFrame(animate);
})();

