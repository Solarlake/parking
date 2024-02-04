import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

document.addEventListener('DOMContentLoaded', function() {
    // const image = new Image("../static/images/park-sample2.png");
    const width = 1000; // image.width
    const height = 667; // image.height

    const lotJsonData = {
        "spots": [
            [57, -20, 175, 45],
            [57, 50, 176, 105],
            [58, 110, 175, 165],
            [58, 168, 175, 225],
            [57, 230, 176, 284],
            [57, 290, 176, 345],
            [56, 350, 176, 406],
            [56, 410, 176, 469],
            [56, 471, 176, 528],
            [56, 532, 176, 590],
            [56, 595, 176, 652],
            [56, 658, 176, 715],
      
            [-57, -20, 52, 45],
            [-57, 50, 52, 105],
            [-58, 110, 52, 165],
            [-58, 168, 52, 225],
            [-57, 230, 52, 284],
            [-57, 290, 52, 345],
            [-56, 350, 52, 406],
            [-56, 410, 52, 469],
            [-56, 471, 52, 528],
            [-56, 532, 52, 590],
            [-56, 595, 52, 652],
            [-56, 658, 52, 715]
        
        ]
    }

    // ====================
    
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(61.9, width/height, 0.1, 2000);
    camera.position.set(-200, 600, 300);
    camera.rotation.set(-Math.PI/3, 0, 0);
    // camera.rotation.set(-Math.PI/2, 0, 0);

    const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg'), alpha: true });
    document.getElementById( 'canvasBox' ).appendChild(renderer.domElement);

    renderer.setPixelRatio(width / height);
    renderer.setSize(width, height);

    const axisHelper = new THREE.AxesHelper(100);
    scene.add(axisHelper);

    const ambientLight = new THREE.AmbientLight(0xffffff);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(0, 1, 1);
    scene.add(directionalLight);

    // const background = new THREE.TextureLoader().load("../static/images/park-sample2.png");
    // scene.background = background;

    renderer.render(scene, camera);
    
    let cars = [];
    let takenSpots = [];
    let spotBoxes = [];

    function addCar(id, x1, y1, x2, y2) {
        console.log("addcar", id, x1, y1, x2, y2)
        const loader = new GLTFLoader();
        loader.load('./static/models/car_symmetric.glb', function (gltf) {
            const midpointX = (x1 + x2) / 2;
            const midpointZ = (y1 + y2) / 2;
            gltf.scene.scale.set(20, 20, 20);
            gltf.scene.position.set(midpointX - width/2, 0, midpointZ - height/2);
            gltf.scene.rotation.x = Math.PI / 2;
            gltf.scene.rotation.y = -Math.PI / 2;
            // gltf.scene.material = new THREE.MeshPhongMaterial({ color: 0xff0000 });
            // hard coded these cause idk math hehe

            gltf.scene.traverse((child) => {
                if (child.isMesh) {
                    child.material = new THREE.MeshPhongMaterial({ color: 0x888888 });
                }
            });
            
            scene.add(gltf.scene);
            cars[id] = gltf.scene;
        }, undefined, function (error) {
            console.error(error);
        });
    }

    // function addCar(id, x1, y1, x2, y2) {
    //     const geometry = new THREE.BoxGeometry(x2 - x1, 60, y2 - y1);
    //     const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    //     const box = new THREE.Mesh(geometry, material);

    //     const midpointX = (x1 + x2) / 2;
    //     const midpointZ = (y1 + y2) / 2;
    //     box.position.set(midpointX - width/2, 0, midpointZ - height/2); // # TODO use width and height

    //     cars[id] = box;
    //     scene.add(box);
    // }

    function moveCar(id, x1, y1, x2, y2) {
        const box = cars[id];
        const midpointX = (x1 + x2) / 2;
        const midpointZ = (y1 + y2) / 2;
        box.position.set(midpointX - width/2, 0, midpointZ - height/2);

        if (id == 12) {
            // camera.position.set(midpointX - width/2, 500, midpointZ - height/2);
        }

        const sizeX = x2 - x1;
        const sizeZ = y2 - y1;
        if (sizeX > sizeZ) {
            const vecX = x2 - x1;
            const vecZ = (y2 - y1) - (vecX/2);
            const length = Math.sqrt(vecX * vecX + vecZ * vecZ);
            const sizeX2 = vecX / length;
            const sizeZ2 = vecZ / length;
            const angle = Math.atan(sizeZ2/sizeX2);
            // console.log(angle + Math.PI/2)
            box.rotation.set(0, -angle, 0);
            if (id === 12) {
                // camera.rotation.set(-Math.PI/2, 0, -angle + Math.PI/2);
            }
        }
        else {
            const vecZ = y2 - y1;
            const vecX = (x2 - x1) - (vecZ/2);
            const length = Math.sqrt(vecX * vecX + vecZ * vecZ);
            const sizeX2 = vecX / length;
            const sizeZ2 = vecZ / length;
            const angle = Math.atan(sizeZ2/sizeX2);
            // console.log(angle + Math.PI/2)
            box.rotation.set(0, -angle, 0);
            if (id == 12) {
                // camera.rotation.set(-Math.PI/2, 0, -angle + Math.PI/2);
            }
        }
    }

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
            const x1 = element[key][0];
            const y1 = element[key][1];
            const x2 = element[key][2];
            const y2 = element[key][3];

            if (cars[key] === undefined) {
                addCar(key, x1, y1, x2, y2);
                console.log(cars.length, cars)
            } else {
                moveCar(key, x1, y1, x2, y2);
            }

            const taken = inSpot(x1, y1, x2, y2, lotJsonData.spots);
            // console.log(taken)
            if (taken) {
                takenSpots.push(taken);
            }

            function onlyUnique(value, index, array) {
                return array.indexOf(value) === index;
            }
            var unique = takenSpots.filter(onlyUnique);
        
            let openspots = lotJsonData.spots.length - unique.length;
            // console.log(openspots)
            document.getElementById('spotNumber').innerHTML = openspots;            
        });

        // takenSpots.forEach((spotIndex) => {
        //     // console.log(spotIndex);
        //     const x1 = lotJsonData.spots[spotIndex][0];
        //     const y1 = lotJsonData.spots[spotIndex][1];
        //     const x2 = lotJsonData.spots[spotIndex][2];
        //     const y2 = lotJsonData.spots[spotIndex][3];
        //     renderSpotBox(x1, y1, x2, y2, spotIndex);
        // });

        lotJsonData.spots.forEach((spot, index) => {
            const x1 = spot[0];
            const y1 = spot[1];
            const x2 = spot[2];
            const y2 = spot[3];
            renderSpotBox(x1, y1, x2, y2, index);
        });
    });

    startTracking();

    function animate() {
        requestAnimationFrame(animate);
        renderer.render(scene, camera);
    }
    animate();

    // ====================

    function inSpot(x1, y1, x2, y2, lotData) {
        // console.log(lotData)
        const midpointX = (x1 + x2) / 2;
        const midpointZ = (y1 + y2) / 2;
        // lotData.forEach((spot, index) => {
        //     // console.log(x1, y1, x2, y2, spot)
        //     if (midpointX > spot[0] && midpointX < spot[2] && midpointZ > spot[1] && midpointZ < spot[3]) {
        //         return index;
        //     }
        // });

        for (let i = 0; i < lotData.length; i++) {
            let spotX1 = lotData[i][0];
            let spotY1 = lotData[i][1];
            let spotX2 = lotData[i][2];
            let spotY2 = lotData[i][3];

            if (midpointX > spotX1 && midpointX < spotX2 && midpointZ > spotY1 && midpointZ < spotY2) {
                return i;
            }
        }
        return null;
    }

    function renderSpotBox(x1, y1, x2, y2, spotIndex) {
        if (spotBoxes[spotIndex] !== undefined) {
            scene.remove(spotBoxes[spotIndex]);
        }

        const geometry = new THREE.BoxGeometry(x2 - x1, 1, y2 - y1);

        var material = new THREE.MeshPhongMaterial({ color: 0xcccccc });
        if (!takenSpots.includes(spotIndex)) {
            material = new THREE.MeshPhongMaterial({ color: 0x93dd7d });
        }

        const box = new THREE.Mesh(geometry, material);

        const midpointX = (x1 + x2) / 2;
        const midpointZ = (y1 + y2) / 2;

        box.position.set(midpointX - width/2, 0, midpointZ - height/2); // # TODO use width and height

        scene.add(box);
        spotBoxes[spotIndex] = box;
    }
});