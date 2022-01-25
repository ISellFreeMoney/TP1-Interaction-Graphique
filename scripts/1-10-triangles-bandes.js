"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Fixing Incorrect JavaScript exercise
////////////////////////////////////////////////////////////////////////////////
// Your task is to find the syntax errors in this Javacript
// until it shows the the Gold Cube!
// WebGL is not supported in Internet Explorer
// There are 3 syntax errors in this code
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document, window*/

var camera, scene, renderer;
var windowScale;
var cameraControls;
var clock = new THREE.Clock();

function drawPlan(l, h, i) {

	var square_material = new THREE.MeshBasicMaterial( { color: 0xF6831E, side: THREE.DoubleSide } );
	var square;
	for(var j = 1; j < i; j++) {
		var square = new THREE.BufferGeometry();
		// Your code goes here
		const vertices = new Float32Array([
			j * x1, y1, 0.0,
			j * x2, y1, 0.0,
			j * x2, y2, 0.0,
			j * x1, y1, 0.0,
			j * x2, y2, 0.0,
			j * x1, y2, 0.0,

		]);

	}
		// don't forget to return the geometry!	The following line is required!
		return square;
	
}

function init() {
	var canvasWidth = 846;
	var canvasHeight = 494;
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;
	// SCENE
	scene = new THREE.Scene();
	scene.fog = new THREE.Fog(0x808080, 2000, 4000);
	// LIGHTS
	scene.add(new THREE.AmbientLight(0x222222));

	// RENDERER

	renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(scene.fog.color, 1);

	var container = document.getElementById('webGL');
	container.appendChild(renderer.domElement);


	// CAMERA
	camera = new THREE.PerspectiveCamera(45, canvasRatio, 1, 4000);
	camera.position.set(-200, 200, -150);
	// CONTROLS
	cameraControls = new THREE.OrbitControls(camera, renderer.domElement);
	cameraControls.target.set(0, 0, 0);

	//draw the coordinate grid
}

function animate() {
	requestAnimationFrame(animate);
	render();
}

function render() {
	var delta = clock.getDelta();
	cameraControls.update(delta);
	renderer.render(scene, camera);
}

init();
drawPlan(10,10,10);
animate();
