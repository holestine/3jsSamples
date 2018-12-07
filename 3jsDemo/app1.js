var example = (function(){

    "use strict";
    
    var scene = new THREE.Scene(),
    renderer = new THREE.WebGLRenderer(),
    light = new THREE.AmbientLight(0xbbbbbb), // White ambient light
    crate,
	camera;
	
    function initScene(){
        //renderer.setSize( window.innerWidth, window.innerHeight );
        //document.getElementById("webgl-container").appendChild(renderer.domElement);
        //
        //scene.add(light);
		//
        //camera = new THREE.PerspectiveCamera(
		//	40,                                     // Field of View
		//	window.innerWidth / window.innerHeight, // Aspect Ratio
		//	1,                                      // Near Clipping Plane
		//	1000                                    // Far Clipping Plane
		//	);
		//	
        //camera.position.z= 100;
		//scene.add( camera );
	    //
		//crate = new THREE.Mesh(
		//	new THREE.BoxGeometry(10,10,10),
		//	new THREE.MeshLambertMaterial({
		//		color: 0x55ff22
		//		})
		//	);
		////crate.position.x = 30;
        //scene.add(crate);
		//
        //render();
    }

	// Recursively draw scene
    function render(){
		//crate.rotation.y +=0.01;
		//crate.rotation.x += 0.005;

        //renderer.render(scene, camera); 
        //requestAnimationFrame(render);
    }

    window.onload = initScene;
    
	// For debugging
    return {
        scene: scene
    }

})();
