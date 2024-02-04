document.addEventListener('DOMContentLoaded', function() {
    // const image = new Image("../static/images/park-sample2.png");
    width = 1000; // image.width
    height = 667; // image.height

    // ====================
    
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(61.9, width/height, 0.1, 2000);
    camera.position.set(0, 500, 400);
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

    function renderCar(data) {
        key = Object.keys(data)[0]

        let x1 = data[key][0];
        let y1 = data[key][1];
        let x2 = data[key][2];
        let y2 = data[key][3];

        const geometry = new THREE.BoxGeometry(x2 - x1, 60, y2 - y1);
        const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
        const box = new THREE.Mesh(geometry, material);

        const midpointX = (x1 + x2) / 2;
        const midpointZ = (y1 + y2) / 2;
        box.position.set(midpointX - 500, 0, midpointZ - 500);

        scene.add(box);
    }

    function clearScene() {
        scene.children.forEach(child => {
            if (child instanceof THREE.Mesh) {
                scene.remove(child);
            }
        });
    }

    function updateScene(data) {
        clearScene();
        data.forEach(element => {
            renderCar(element);
        });
        renderer.render(scene, camera);
        clearScene();
    }

    function startTracking() {
        fetch('/api/start')
            .then(response => response.json())
            .then(data => console.log(data));
    }

    function getData() {
        fetch('/api/get')
            .then(response => response.json())
            .then(data => updateScene(data));
    }

    startTracking();

    setInterval(getData, 100);
});