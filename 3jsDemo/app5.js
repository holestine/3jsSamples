var example = (function () {

  "use strict";

  var scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer(),
    light = new THREE.AmbientLight(0xbbbbbb), // White ambient light
    light2 = new THREE.PointLight(0x222222, 20, 50, 2),
    time = 0,
    camera,
    crate,
    granite,
    dullPlanet,
    shinyPlanet,
    cloudMesh,
    sun,
    starMesh;

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

    camera.position.z = 100;
    scene.add(camera);

    scene.add(light2);
    sun = new THREE.Mesh(
      new THREE.OctahedronBufferGeometry(1),
      new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true
      }));
    sun.position.set(light2.position.x, light2.position.y, light2.position.z);
    scene.add(sun);

    var loader = new THREE.TextureLoader();
    var disturbingTexture = loader.load('disturb.jpg');
    var crateTexture = loader.load('crate.gif');
    var earthTexture = loader.load('planets/earth_atmos_4096.jpg');
    var earthNormals = loader.load('planets/earth_normal_2048.jpg');
    var cloudTexture = loader.load('planets/earth_clouds_2048.png');
    var specularTexture = loader.load('planets/earth_specular_2048.jpg');
    var starTexture = loader.load('starfield.png');

    crate = new THREE.Mesh(
      new THREE.BoxGeometry(10, 10, 10),
      new THREE.MeshLambertMaterial({
        map: crateTexture,
        color: 0xffffff
      })
    );
    crate.position.x = 30;
    scene.add(crate);

    granite = new THREE.Mesh(
      new THREE.BoxGeometry(1, 20, 20),
      new THREE.MeshPhongMaterial({
        map: disturbingTexture,
        specular: 0x888888,
        shininess: 10,
        bumpMap: disturbingTexture
      })
    );
    granite.position.x = -30;
    scene.add(granite);

    shinyPlanet = new THREE.Mesh(
      new THREE.SphereGeometry(10, 32, 32),
      new THREE.MeshPhongMaterial({
        color: 0xffffff,
        specular: 0xffffff,// Set color and specular the same for metalic look
        wireframe: false,
        map: earthTexture,
        bumpMap: earthNormals,
        shininess: 1,
        specularMap: specularTexture,
      }));

    shinyPlanet.position.y = 15;
    scene.add(shinyPlanet);

    cloudMesh = new THREE.Mesh(
      new THREE.SphereGeometry(10.1, 32, 32),
      new THREE.MeshPhongMaterial({
        map: cloudTexture,
        bumpMap: cloudTexture,
        side: THREE.DoubleSide,
        opacity: 0.8,
        transparent: true,
        depthWrite: false,
      }));
    cloudMesh.position.y = shinyPlanet.position.y;
    scene.add(cloudMesh)

    starMesh = new THREE.Mesh(
      new THREE.SphereGeometry(100, 8, 8),
      new THREE.MeshPhongMaterial({
        map: starTexture,
        side: THREE.BackSide,
        depthWrite: false,
      }));
    scene.add(starMesh)

    dullPlanet = new THREE.Mesh(
      new THREE.SphereGeometry(10, 32, 32),
      new THREE.MeshLambertMaterial({
        color: 0xffffff,
        map: earthTexture,
        wireframe: false
      }));

    dullPlanet.position.y = -15;
    scene.add(dullPlanet);

    render();
  }

  // Recursively draw scene
  function render() {
    light2.position.set(25 * Math.sin(-time), 0, 25 * Math.cos(time));
    sun.position.set(light2.position.x, light2.position.y, light2.position.z);

    crate.rotation.y += 0.01;
    crate.rotation.x += 0.005;

    granite.rotation.y -= 0.01;
    granite.rotation.x += 0.005;

    shinyPlanet.rotation.y += 0.005;
    cloudMesh.rotation.y += 0.0025;
    starMesh.rotation.y -= 0.0005;

    dullPlanet.rotation.y += 0.005;

    renderer.render(scene, camera);
    requestAnimationFrame(render);

    time += .025;
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
