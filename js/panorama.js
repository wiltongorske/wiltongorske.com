import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js";

(function () {
  var container = document.getElementById("three-panorama");
  var probe = document.createElement("canvas");
  var hasWebGL =
    !!window.WebGLRenderingContext &&
    !!(probe.getContext("webgl") || probe.getContext("experimental-webgl"));

  if (!container || !hasWebGL) {
    return;
  }

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (prefersReducedMotion.matches) {
    return;
  }

  var renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
  renderer.setSize(window.innerWidth, window.innerHeight);
  container.appendChild(renderer.domElement);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(
    72,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  var geometry = new THREE.SphereGeometry(60, 96, 64);
  geometry.scale(-1, 1, 1);

  var material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 0,
    transparent: true,
  });
  var sphere = new THREE.Mesh(geometry, material);
  scene.add(sphere);

  var loader = new THREE.TextureLoader();
  loader.load(
    "images/street-view-360.jpg",
    function (texture) {
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearFilter;
      material.map = texture;
      material.opacity = 1;
      material.needsUpdate = true;
      document.body.classList.add("three-ready");
    },
    undefined,
    function () {
      stop();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      container.textContent = "";
    }
  );

  var baseLon = -18;
  var rotationSpeed = 1.8;
  var baseLat = 22;
  var latAmplitude = 3;
  var clock = new THREE.Clock();
  var target = new THREE.Vector3();
  var isRunning = true;

  function lookAround() {
    if (!isRunning) {
      return;
    }

    var elapsed = clock.getElapsedTime();
    var lon = baseLon + elapsed * rotationSpeed;
    var lat = baseLat + Math.sin(elapsed * 0.042 + 1.2) * latAmplitude;
    var phi = THREE.MathUtils.degToRad(90 - lat);
    var theta = THREE.MathUtils.degToRad(lon);
    target.set(
      Math.sin(phi) * Math.cos(theta),
      Math.cos(phi),
      Math.sin(phi) * Math.sin(theta)
    );

    camera.lookAt(target);
    renderer.render(scene, camera);
    window.requestAnimationFrame(lookAround);
  }

  function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  }

  function stop() {
    isRunning = false;
    document.body.classList.remove("three-ready");
  }

  window.addEventListener("resize", handleResize);

  function handleReducedMotion(event) {
    if (event.matches) {
      stop();
    }
  }

  if (typeof prefersReducedMotion.addEventListener === "function") {
    prefersReducedMotion.addEventListener("change", handleReducedMotion);
  } else if (typeof prefersReducedMotion.addListener === "function") {
    prefersReducedMotion.addListener(handleReducedMotion);
  }

  lookAround();
})();
