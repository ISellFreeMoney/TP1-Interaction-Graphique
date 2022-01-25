"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Vertex Order Exercise
// Your task is to determine the problem and fix the vertex drawing order.
// Check the function someObject()
// and correct the code that starts at line 17.
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document*/

var camera, scene, renderer;
var windowScale;

function someObject(material, x1, y1, x2, y2, i) {

var geometry = new THREE.BufferGeometry();

for(var j = 1; j < i; j++) {
	const vertices = new Float32Array([
		j * x1, y1, 0.0,
		j * x2, y1, 0.0,
		j * x2, y2, 0.0,
		j * x1, y1, 0.0,
		j * x2, y2, 0.0,
		j * x1, y2, 0.0,

	]);
	geometry.setAttribute( 'position', new THREE.BufferAttribute( vertices, 3 ) );
	var mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );
}

	



	// var geometry = new THREE.Geometry();

	// // Student: some data below must be fixed
	// // for both triangles to appear !
	// geometry.vertices.push( new THREE.Vector3( 3, 3, 0 ) );
	// geometry.vertices.push( new THREE.Vector3( 7, 3, 0 ) );
	// geometry.vertices.push( new THREE.Vector3( 7, 7, 0 ) );
	// geometry.vertices.push( new THREE.Vector3( 3, 7, 0 ) );

	// geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
	// geometry.faces.push( new THREE.Face3( 2, 0, 3 ) );

	var mesh = new THREE.Mesh( geometry, material );

	scene.add( mesh );
}

function init() {
	// Setting up some parameters
	var canvasWidth = 846;
	var canvasHeight = 494;
	// For grading the window is fixed in size; here's general code:
	//var canvasWidth = window.innerWidth;
	//var canvasHeight = window.innerHeight;
	var canvasRatio = canvasWidth / canvasHeight;
	// scene
	scene = new THREE.Scene();

	// Camera: Y up, X right, Z up
	windowScale = 10;
	var windowWidth = windowScale * canvasRatio;
	var windowHeight = windowScale;

	camera = new THREE.OrthographicCamera( windowWidth / - 2, windowWidth / 2,
		windowHeight / 2, windowHeight / - 2, 0, 40 );

	var focus = new THREE.Vector3( 5,4,0 );
	camera.position.x = focus.x;
	camera.position.y = focus.y;
	camera.position.z = 10;
	camera.lookAt( focus );

	renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize( canvasWidth, canvasHeight );
	renderer.setClearColor( 0xFFFFFF, 1.0 );

}

function addToDOM() {
	var container = document.getElementById('webGL');
	var canvas = container.getElementsByTagName('canvas');
	if (canvas.length>0) {
		container.removeChild(canvas[0]);
	}
	container.appendChild( renderer.domElement );
}


function render() {
	renderer.render( scene, camera );
}


// Main body of the script
try {
	init();
	var material = new THREE.MeshBasicMaterial( { color: 0xF6831E, side: THREE.FrontSide } );
	someObject(material, 1, 2, 2, 2, 10);
	addToDOM();
	render();
} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport+e);
}
