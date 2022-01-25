"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Draw a Square Exercise
// Your task is to complete the function square (at line 28).
// The function takes 4 arguments - coordinates x1, y1, x2, y2
// for the square and returns a geometry object (THREE.Geometry())
// that defines a square at the provided coordinates.
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, document*/

var camera, scene, renderer;
var windowScale;

function exampleTriangle(i) {
	// This code demonstrates how to draw a triangle
	var triangle = new THREE.BufferGeometry();
	var triangleMaterial = new THREE.MeshBasicMaterial({ color: 0x2685AA, side: THREE.DoubleSide });

	for (var j = 1; j < i; j++) {
		const vertices = new Float32Array([
			j * 1, 10, 0.0,
			j * 2, 10, 0.0,
			j * 2, 10, 0.0,
		]);
		console.log(vertices);
		triangle.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
		var triangleMesh = new THREE.Mesh(triangle, triangleMaterial);
		scene.add(triangleMesh);
	}

}


function init() {
	// Set up some parameters
	var canvasWidth = 846;
	var canvasHeight = 494;
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;
	// scene
	scene = new THREE.Scene();

	// Camera: Y up, X right, Z up
	windowScale = 12;
	var windowWidth = windowScale * canvasRatio;
	var windowHeight = windowScale;

	camera = new THREE.OrthographicCamera(windowWidth / -2, windowWidth / 2, windowHeight / 2, windowHeight / -2, 0, 40);

	var focus = new THREE.Vector3(5, 5, 0);
	camera.position.x = focus.x;
	camera.position.y = focus.y;
	camera.position.z = 20;
	camera.lookAt(focus);

	renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor(0xFFFFFF, 1.0);
}

function addToDOM() {
	var container = document.getElementById('webGL');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length > 0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild(renderer.domElement);
}

function render() {
	renderer.render(scene, camera);
}

try {
	init();
	exampleTriangle(10);
	addToDOM();
	render();
} catch (e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport + e);
}


