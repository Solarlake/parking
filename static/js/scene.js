import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

const jsonData = [{"cell phone": [518.94384765625, 269.96221923828125, 568.9249267578125, 395.4390563964844]}, {"cell phone": [590.8535766601562, 269.962646484375, 646.1244506835938, 405.38525390625]}, {"cell phone": [588.4761962890625, 439.7597351074219, 640.0865478515625, 577.5980834960938]}, {"cell phone": [734.2515869140625, 430.48297119140625, 785.7584228515625, 552.7469482421875]}, {"cell phone": [656.212158203125, 427.0877685546875, 711.6314086914062, 551.1632690429688]}, {"cell phone": [445.6293640136719, 267.1269836425781, 500.87646484375, 395.5002746582031]}, {"cell phone": [282.552490234375, 0.0, 340.4339294433594, 85.00904846191406]}, {"cell phone": [370.9868469238281, 246.29393005371094, 424.50732421875, 381.6708679199219]}, {"cell phone": [381.2575988769531, 0.0, 435.12689208984375, 86.84315490722656]}, {"cell phone": [590.160400390625, 0.3703206777572632, 644.1608276367188, 88.4701156616211]}, {"parking meter": [294.2742004394531, 423.5259094238281, 350.77960205078125, 573.3510131835938]}, {"cell phone": [840.842041015625, 0.0, 914.4485473632812, 98.06687927246094]}, {"cell phone": [824.0393676757812, 427.1169738769531, 915.572998046875, 628.7691040039062]}, {"cell phone": [747.7450561523438, 267.68212890625, 804.0455932617188, 395.84613037109375]}, {"parking meter": [50.94815444946289, 262.4114074707031, 130.45742797851562, 414.8065490722656]}, {"bottle": [751.4763793945312, 0.04534721374511719, 809.3207397460938, 83.50355529785156]}, {"cell phone": [680.0106811523438, 0.11336803436279297, 727.53076171875, 72.97804260253906]}, {"car": [825.4114379882812, 426.65185546875, 911.1068725585938, 623.341064453125]}, {"cell phone": [663.2909545898438, 273.3454284667969, 719.2548828125, 402.3709411621094]}, {"cell phone": [751.2937622070312, 0.0, 809.3853149414062, 82.84439849853516]}, {"cell phone": [502.47991943359375, 0.3433346748352051, 562.6624755859375, 85.03424835205078]}, {"cell phone": [592.4036865234375, 474.2517395019531, 639.7776489257812, 569.6195678710938]}, {"cell phone": [204.20370483398438, 259.8075256347656, 268.0956726074219, 397.4912109375]}, {"car": [50.833656311035156, 262.40350341796875, 130.03634643554688, 414.76763916015625]}]
const lotJsonData = {
    "spots": [
        [-20, 270, 55, 419],
        [61, 270, 134, 420],
        [139, 270, 207, 421],
        [213, 273, 280, 420],
        [286, 275, 357, 421],
        [363, 276, 430, 420],
        [435, 276, 502, 420],
        [508, 277, 579, 420],
        [584, 278, 654, 421],
        [658, 278, 725, 420],
        [731, 279, 798, 422],
        [807, 282, 900, 422],
  
        [-20, 424, 55, 568],
        [61, 425, 134, 568],
        [139, 426, 207, 568],
        [213, 425, 280, 568],
        [286, 426, 357, 568],
        [363, 425, 430, 568],
        [435, 425, 502, 568],
        [508, 425, 579, 568],
        [584, 426, 654, 568],
        [658, 425, 725, 568],
        [731, 427, 798, 568],
        [807, 427, 900, 568],
        
        [-20, -70, 53, 80],
        [59, -70, 130, 82],
        [138, -70, 205, 83],
        [212, -70, 281, 84],
        [285, -70, 357, 84],
        [365, -70, 434, 85],
        [436, -70, 505, 86],
        [511, -70, 585, 87],
        [587, -70, 659, 88],
        [666, -70, 730, 88],
        [735, -70, 802, 88],
        [809, -70, 909, 88]
    ]
  }

document.addEventListener('DOMContentLoaded', function() {

    // calculate which spots are taken
    let takenspots = []
    for(let i = 0; i < jsonData.length; i++){
        let taken = isInSpot(jsonData[i], lotJsonData);
        if(taken){
        takenspots.push(taken);
        }
    }

    function onlyUnique(value, index, array) {
        return array.indexOf(value) === index;
    }
    var unique = takenspots.filter(onlyUnique);


    let openspots = lotJsonData.spots.length - unique.length;
    console.log(openspots)
    document.getElementById('spotNumber').innerHTML = openspots;


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