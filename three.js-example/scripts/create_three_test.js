
window.onlad = init();

var scene, camera, renderer;
var cube;
var mouse, raycaster;
var isShiftDown = false;
var objects = [];
init();
render();

function init() {

	var container = document.querySelector("#three_js");
	var header_h = document.getElementsByClassName('container').offsetHeight;
	container = document.createElement( 'div' );
	three_js.appendChild( container );

	scene = new THREE.Scene(); //создание сцены
	scene.background = new THREE.Color(0xffffff); // задний фон
	camera = new THREE.PerspectiveCamera(65, window.innerWidth / window.innerHeight,0.1, 2000); // положение камеры
	camera.position.set( 500, 800, 1300 );
	camera.lookAt( new THREE.Vector3() );

	var rollOverGeo = new THREE.BoxGeometry( 50, 50, 50 ); // кубик помощник
	var	rollOverMaterial = new THREE.MeshBasicMaterial( { color: 0xff0000, opacity: 0.5, transparent: true } ); // материал куба
	var	rollOverMesh = new THREE.Mesh( rollOverGeo, rollOverMaterial ); // отрисовка куба
	scene.add( rollOverMesh ); // добавление на стену

	var cubeGeo = new THREE.BoxGeometry( 50, 50, 50 ); // кубик
	var cubeMaterial = new THREE.MeshLambertMaterial( { color: 0xfeb74c } ); // материал кубика

	var gridHelper = new THREE.GridHelper( 1000, 20 ); // сетка для помощи 
	scene.add( gridHelper ); // добавление сетки на сцену

	raycaster = new THREE.Raycaster();
	mouse = new THREE.Vector2();

	var geometry = new THREE.PlaneBufferGeometry( 1000, 1000 );
	geometry.rotateX( - Math.PI / 2 );
	var plane = new THREE.Mesh( geometry, new THREE.MeshBasicMaterial( { visible: false } ) );
	scene.add( plane );
    objects.push( plane );

	renderer = new THREE.WebGLRenderer( { antialias: true } );// метод рендеринга
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth , window.innerHeight);
	container.appendChild( renderer.domElement );
	document.addEventListener( 'mousemove', onDocumentMouseMove, false );
	document.addEventListener( 'mousedown', onDocumentMouseDown, false );
	document.addEventListener( 'keydown', onDocumentKeyDown, false );
	document.addEventListener( 'keyup', onDocumentKeyUp, false );

	window.addEventListener( 'resize', onWindowResize, false );

	
}

function onWindowResize() {
	var container = document.querySelector("#three_js");
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth , window.innerHeight );
}

function onDocumentMouseMove( event ) {
	var container = document.querySelector("#three_js");
	event.preventDefault();
	mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( objects );
	if ( intersects.length > 0 ) {
		var intersect = intersects[ 0 ];
		rollOverMesh.position.copy( intersect.point ).add( intersect.face.normal );
		rollOverMesh.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
	}
	render();
}

function onDocumentMouseDown( event ) {
	var container = document.querySelector("#three_js");
	event.preventDefault();
	mouse.set( ( event.clientX / window.innerWidth ) * 2 - 1, - ( event.clientY / window.innerHeight ) * 2 + 1 );
	raycaster.setFromCamera( mouse, camera );
	var intersects = raycaster.intersectObjects( objects );
	if ( intersects.length > 0 ) {
		var intersect = intersects[ 0 ];
		// delete cube
		if ( isShiftDown ) {
			if ( intersect.object != plane ) {
				scene.remove( intersect.object );
				objects.splice( objects.indexOf( intersect.object ), 1 );
			}
		// create cube
		} else {
			var voxel = new THREE.Mesh( cubeGeo, cubeMaterial );
			voxel.position.copy( intersect.point ).add( intersect.face.normal );
			voxel.position.divideScalar( 50 ).floor().multiplyScalar( 50 ).addScalar( 25 );
			scene.add( voxel );
			objects.push( voxel );
		}
	render();
	}
}
function onDocumentKeyDown( event ) {
	switch( event.keyCode ) {
		case 16: isShiftDown = true; break;
	}
}

function onDocumentKeyUp( event ) {
	switch ( event.keyCode ) {
		case 16: isShiftDown = false; break;
	}
}

function render () {
	renderer.render(scene, camera);
}