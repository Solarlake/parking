import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js";

document.addEventListener('DOMContentLoaded', function() {
    // const image = new Image("../static/images/park-sample2.png");
    const width = 1000; // image.width
    const height = 667; // image.height

    // ====================
    
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(61.9, width/height, 0.1, 2000);
    camera.position.set(0, 500, 500);
    camera.rotation.set(-Math.PI/4, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
    renderer.setPixelRatio(width / height);
    renderer.setSize(width, height);

    const axisHelper = new THREE.AxesHelper(100);
    scene.add(axisHelper);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const background = new THREE.TextureLoader().load("../static/images/park-sample2.png");
    scene.background = background;

    renderer.render(scene, camera);

    // ...

    // const loader = new THREE.STLLoader();
    // loader.load('../static/models/car.stl', function(geometry) {
    //     const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
    //     const car = new THREE.Mesh(geometry, material);
    //     car.position.set(0, 0, 0); // Set the position of the car
    //     scene.add(car);
    // });

    // ...

    let cars = [];

    function addCar(id, x1, y1, x2, y2) {
        const geometry = new THREE.BoxGeometry(x2 - x1, 60, y2 - y1);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const box = new THREE.Mesh(geometry, material);

        const midpointX = (x1 + x2) / 2;
        const midpointZ = (y1 + y2) / 2;
        box.position.set(midpointX - width/2, 0, midpointZ - height/2); // # TODO use width and height

        cars[id] = box;
        scene.add(box);
    }

    function moveCar(id, x1, y1, x2, y2) {
        const box = cars[id];
        const midpointX = (x1 + x2) / 2;
        const midpointZ = (y1 + y2) / 2;
        box.position.set(midpointX - width/2, 0, midpointZ - height/2);
        cars[id] = box;
    }

    // function initCars() {
    //     fetch('/api/get')
    //         .then(response => response.json())
    //         .then(data => {
    //             data.forEach((element) => {
    //                 const key = Object.keys(element)[0];
    //                 addCar(key, element[keys][0], element[keys][1], element[keys][2], element[keys][3]);
    //             });
    //         });
    // }

    // function updateCars() {
    //     fetch('/api/get')
    //         .then(response => response.json())
    //         .then(data => {
    //             data.forEach((element) => {
    //                 const key = Object.keys(element)[0];
    //                 if (cars[key] === undefined) {
    //                     addCar(key, element[key][0], element[key][1], element[key][2], element[key][3]);
    //                 } else {
    //                     moveCar(key, element[key][0], element[key][1], element[key][2], element[key][3]);
    //                 }
    //             });
    //         });
    // }

    function startTracking() {
        fetch('/api/start')
            .then(response => response.json())
            .then(data => console.log(data));
    }

    const socket = io.connect();
    socket.on('data', function(data) {
        if (data === undefined) return;

        data.forEach((element) => {
            const key = Object.keys(element)[0];
            if (cars[key] === undefined) {
                addCar(key, element[key][0], element[key][1], element[key][2], element[key][3]);
            } else {
                moveCar(key, element[key][0], element[key][1], element[key][2], element[key][3]);
            }
        });
    });

    startTracking();
    // initCars();
    // setInterval(updateCars, 50);

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();
});