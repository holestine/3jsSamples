var example = (function(){

    "use strict";
    
    var scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer(),
    light = new THREE.AmbientLight(0xbbbbbb), // White ambient light
    //granite,
	//shinyPlanet,
	dullPlanet,
	crate,
    camera;
	
    function initScene(){
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById("webgl-container").appendChild(renderer.domElement);

        scene.add(light);
		
        camera = new THREE.PerspectiveCamera(
			40,                                     // Field of View
			window.innerWidth / window.innerHeight, // Aspect Ratio
			1,                                      // Near Clipping Plane
			1000                                    // Far Clipping Plane
			);
			
        camera.position.z= 100;
		scene.add( camera );
				
		//var loader = new THREE.TextureLoader();
		//var disturbingTexture = loader.load('../textures/disturb.jpg');
		//var crateTexture = loader.load('../textures/crate.gif');
		//var earthTexture = loader.load('../textures/planets/earth_atmos_4096.jpg');
	
		crate = new THREE.Mesh(
			new THREE.BoxGeometry(10,10,10),
			new THREE.MeshLambertMaterial({
				color : 0x55ff22,
				//map   : crateTexture,
				})
			);
		crate.position.x = 20;
        scene.add(crate);

		dullPlanet = new THREE.Mesh(
			new THREE.SphereGeometry(10,32,32),
			new THREE.MeshLambertMaterial({
				color: 0xff0000,
				wireframe: true,
				//map: earthTexture, 
			})); 	
		dullPlanet.position.y = -15;
		scene.add(dullPlanet);
		
        //granite = new THREE.Mesh(
		//	new THREE.BoxGeometry(1,20,20),
		//	new THREE.MeshPhongMaterial({
		//		color : 0x5522ff,
		//		//map   : disturbingTexture, 
		//		})
		//	);
		//granite.position.x = -30;
        //scene.add(granite);
		
		//shinyPlanet = new THREE.Mesh(
		//	new THREE.SphereGeometry(10,32,32),
		//	new THREE.MeshPhongMaterial({
		//		color     : 0xff0000, 
		//		wireframe : true, 
		//		//map       : earthTexture, 
		//	})); 
		//shinyPlanet.position.y = 15;
		//scene.add(shinyPlanet);

        render();
    }

	// Recursively draw scene
    function render(){
		crate.rotation.y +=0.01;
		crate.rotation.x += 0.005;
		
        //granite.rotation.y -=0.01;
		//granite.rotation.x += 0.005;
        
		//shinyPlanet.rotation.x +=0.005;
		//shinyPlanet.rotation.y +=0.005;
		
		dullPlanet.rotation.x +=0.005;
		dullPlanet.rotation.y +=0.005;
		
        renderer.render(scene, camera); 
        requestAnimationFrame(render);
    }

    window.onload = initScene;
    
	// For debugging
    return {
        scene: scene
    }

})();
