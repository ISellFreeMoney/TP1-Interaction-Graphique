"use strict"; // good practice - see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode
////////////////////////////////////////////////////////////////////////////////
// Polygon Location Exercise
// Your task is to write a function that will take 2 arguments:
//   sides - how many edges the polygon has.
//   location - location of the center of the polygon as a THREE.Vector3.
// Return the mesh that defines the minimum number of triangles necessary
// to draw the polygon.
////////////////////////////////////////////////////////////////////////////////
/*global THREE, Coordinates, $, document*/

var camera, scene, renderer;
var windowScale;

function PolygonGeometry(sides, location) {
	var triangle = new THREE.BufferGeometry();


	// generate vertices
    var vertices=[];	
	for ( var pt = 0 ; pt < sides; pt++ )
	{
		// Add 90 degrees so we start at +Y axis, rotate counterclockwise around
		var angle = (Math.PI/2) + (pt / sides) * 2 * Math.PI;

		var x = Math.cos( angle );
		var y = Math.sin( angle );

		// Save the vertex location
	
		vertices.push( new THREE.Vector3( location.x+x, location.y+y, 0.0 ) );
	}

	// generate faces
	//var faces=new Float32Array( []);
	var faces=[];
	for ( var face = 0 ; face < sides-2; face++ )
	{
		// this makes a triangle fan, from the first +Y point around
	 	faces.push(vertices[0].x);
	 	faces.push(vertices[0].y);
	 	faces.push(vertices[0].z);

	 	faces.push(vertices[face+1].x);
	 	faces.push(vertices[face+1].y);
	 	faces.push(vertices[face+1].z);

	 	faces.push(vertices[face+2].x);
	 	faces.push(vertices[face+2].y);
	 	faces.push(vertices[face+2].z);	 	
	}

	const fv=new Float32Array(faces);

	// done: return it.
	triangle.setAttribute( 'position', new THREE.BufferAttribute( fv, 3 ) );
	return triangle;
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
	windowScale = 8;
	var windowWidth = windowScale * canvasRatio;
	var windowHeight = windowScale;

	camera = new THREE.OrthographicCamera( windowWidth / - 2, windowWidth / 2,
		windowHeight / 2, windowHeight / - 2, 0, 40 );

	var focus = new THREE.Vector3( 3,3,0 );
	camera.position.x = focus.x;
	camera.position.y = focus.y;
	camera.position.z = 10;
	camera.lookAt(focus);

	renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true});
	renderer.gammaInput = true;
	renderer.gammaOutput = true;
	renderer.setSize(canvasWidth, canvasHeight);
	renderer.setClearColor( 0xFFFFFF, 1.0 );

}
function showGrids() {
	// Background grid and axes. Grid step size is 1, axes cross at 0, 0
	Coordinates.drawGrid({size:100,scale:1,orientation:"z"});
	Coordinates.drawAxes({axisLength:4,axisOrientation:"x",axisRadius:0.02});
	Coordinates.drawAxes({axisLength:3,axisOrientation:"y",axisRadius:0.02});
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
	showGrids();
	var geo = PolygonGeometry(6, new THREE.Vector3( 3, 4, 0 ));
	var material = new THREE.MeshBasicMaterial( { color: 0xff0000, side: THREE.FrontSide } );
	var mesh = new THREE.Mesh( geo, material );
	scene.add( mesh );
	addToDOM();
	render();
} catch(e) {
	var errorReport = "Your program encountered an unrecoverable error, can not draw on canvas. Error was:<br/><br/>";
	$('#container').append(errorReport+e);
}
