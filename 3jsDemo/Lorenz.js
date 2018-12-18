var example = (function () {

  "use strict";

  var scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer(),
    light = new THREE.AmbientLight(0xbbbbbb), // White ambient light
    light2 = new THREE.PointLight(0xffffff, 10, 50, 2),
    time = 0,
    camera,
    starMesh,
    rk4lorenzMesh,
    eulerlorenzMesh,
    rk4material,
    rk4path,
    rk4pos,
    rk4newpos,
    step,
    rate = 1;

  document.getElementById("webgl-container").addEventListener("click", toggleTime);
  function toggleTime() { rate = (rate+1)%3; }

  function initScene() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("webgl-container").appendChild(renderer.domElement);

    scene.add(light);

    camera = new THREE.PerspectiveCamera(
      40,                                     // Field of View
      window.innerWidth / window.innerHeight, // Aspect Ratio
      1,                                      // Near Clipping Plane
      1000                                    // Far Clipping Plane
    );

    camera.position.z = 200;
    scene.add(camera);

    light2.position.set(0, 0, 25);
    scene.add(light2);


    var loader = new THREE.TextureLoader();
    var starTexture = loader.load('starfield.png');

    starMesh = new THREE.Mesh(
      new THREE.SphereGeometry(200, 8, 8),
      new THREE.MeshPhongMaterial({
        map: starTexture,
        side: THREE.BackSide,
        depthWrite: false,
      }));
    scene.add(starMesh)



    step = .002;
    rk4path = new THREE.CurvePath();
    rk4pos = new THREE.Vector3(150, 50, 150);
    rk4newpos = RK4Lorenz(rk4pos, step);

    //var eulerpath = new THREE.CurvePath();
    //var eulerpos = new THREE.Vector3(5, 5, 5);
    //var eulernewpos = Euler(eulerpos, Lorenz(eulerpos), step);

    //for (var i = 0; i < 1000; i++) {
    //    eulerpath.add(new THREE.LineCurve(eulerpos, eulernewpos));
    //    eulerpos = eulernewpos
    //    eulernewpos = Euler(eulerpos, Lorenz(eulerpos), step);
    //}

    for (var i = 0; i < 5000; i++) {
      rk4path.add(new THREE.LineCurve(rk4pos, rk4newpos));
      rk4pos = rk4newpos;
      rk4newpos = RK4Lorenz(rk4pos, step);
    }

    rk4material = new THREE.MeshPhongMaterial({
      color: 0x558800,
      wireframe: false,
      emissive: 0x115511,
      reflectivity: 10
    });

    //var eulermaterial = new THREE.MeshLambertMaterial({
    //    color: 0x55880000,
    //    wireframe: false
    //}); 

    rk4lorenzMesh = new THREE.Mesh(
      new THREE.TubeGeometry(rk4path, 5000, .4, 50, false),
      rk4material);
    scene.add(rk4lorenzMesh);

    //eulerlorenzMesh = new THREE.Mesh(
    //    new THREE.TubeGeometry(eulerpath, 5000, .2, 8, false),
    //    eulermaterial);
    //scene.add(eulerlorenzMesh);

    render();
  }


  function Euler(pos, slope, dt) {
    return new THREE.Vector3(pos.x + slope.x * dt, pos.y + slope.y * dt, pos.z + slope.z * dt);
  }

  function RK4Lorenz(start, dt) {
    // Obtain and store slopes at starting point
    var f1 = Lorenz(start);

    // Obtain and store second set of slopes with first set of slopes and half time step
    var f2 = Lorenz(Euler(start, f1, dt / 2));

    // Obtain and store third set of slopes with second set of slopes and half time step
    var f3 = Lorenz(Euler(start, f2, dt / 2));

    // Obtain and store fourth set of slopes with third set of slopes and full time step
    var f4 = Lorenz(Euler(start, f3, dt));

    // Compute weighted average of slopes according to Runge-Kutta fourth order algorithm
    var rkSlope = new THREE.Vector3(f1.x / 6 + f2.x / 3 + f3.x / 3 + f4.x / 6,
      f1.y / 6 + f2.y / 3 + f3.y / 3 + f4.y / 6,
      f1.z / 6 + f2.z / 3 + f3.z / 3 + f4.z / 6);

    // Return next position using Euler, Runge-Kutta slope and full time step
    return Euler(start, rkSlope, dt);
  }

  function Lorenz(pos) {
    var SIGMA = 10;
    var RHO = 28;
    var BETA = 8 / 3;

    return new THREE.Vector3(SIGMA * (pos.y - pos.x),
      pos.x * (RHO - pos.z) - pos.y,
      pos.x * pos.y - BETA * pos.z);
  }

  // Recursively draw scene
  function render() {
    //rk4path.add(new THREE.LineCurve(rk4pos, rk4newpos));
    //rk4pos = rk4newpos;
    //rk4newpos = RK4Lorenz(rk4pos, step);
    //rk4lorenzMesh = new THREE.Mesh(
    //    new THREE.TubeGeometry(rk4path, 5000, .2, 8, false),
    //    rk4material);
    //scene.add(rk4lorenzMesh);

    starMesh.rotation.y -= 0.0005;
    starMesh.rotation.x -= 0.00025;

    //rk4lorenzMesh.x -= 100;
    rk4lorenzMesh.rotation.x += 0.00125 * rate;
    rk4lorenzMesh.rotation.y += 0.005 * rate;

    renderer.render(scene, camera);
    requestAnimationFrame(render);
  }

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  window.onload = initScene;
  window.addEventListener('resize', resize, false);

  // For debugging
  return {
    scene: scene
  }

})();
