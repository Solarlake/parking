import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.121.1/build/three.module.js";
import { GLTFLoader } from "https://cdn.jsdelivr.net/npm/three@0.121.1/examples/jsm/loaders/GLTFLoader.js";

const lotImage = new Image();
lotImage.src = '../static/images/park-sample2.png';

// filePath = '/static/json/results.json';
// const reader = new FileReader();
const jsonData = [{"cell phone": [518.94384765625, 269.96221923828125, 568.9249267578125, 395.4390563964844]}, {"cell phone": [590.8535766601562, 269.962646484375, 646.1244506835938, 405.38525390625]}, {"cell phone": [588.4761962890625, 439.7597351074219, 640.0865478515625, 577.5980834960938]}, {"cell phone": [734.2515869140625, 430.48297119140625, 785.7584228515625, 552.7469482421875]}, {"cell phone": [656.212158203125, 427.0877685546875, 711.6314086914062, 551.1632690429688]}, {"cell phone": [445.6293640136719, 267.1269836425781, 500.87646484375, 395.5002746582031]}, {"cell phone": [282.552490234375, 0.0, 340.4339294433594, 85.00904846191406]}, {"cell phone": [370.9868469238281, 246.29393005371094, 424.50732421875, 381.6708679199219]}, {"cell phone": [381.2575988769531, 0.0, 435.12689208984375, 86.84315490722656]}, {"cell phone": [590.160400390625, 0.3703206777572632, 644.1608276367188, 88.4701156616211]}, {"parking meter": [294.2742004394531, 423.5259094238281, 350.77960205078125, 573.3510131835938]}, {"cell phone": [840.842041015625, 0.0, 914.4485473632812, 98.06687927246094]}, {"cell phone": [824.0393676757812, 427.1169738769531, 915.572998046875, 628.7691040039062]}, {"cell phone": [747.7450561523438, 267.68212890625, 804.0455932617188, 395.84613037109375]}, {"parking meter": [50.94815444946289, 262.4114074707031, 130.45742797851562, 414.8065490722656]}, {"bottle": [751.4763793945312, 0.04534721374511719, 809.3207397460938, 83.50355529785156]}, {"cell phone": [680.0106811523438, 0.11336803436279297, 727.53076171875, 72.97804260253906]}, {"car": [825.4114379882812, 426.65185546875, 911.1068725585938, 623.341064453125]}, {"cell phone": [663.2909545898438, 273.3454284667969, 719.2548828125, 402.3709411621094]}, {"cell phone": [751.2937622070312, 0.0, 809.3853149414062, 82.84439849853516]}, {"cell phone": [502.47991943359375, 0.3433346748352051, 562.6624755859375, 85.03424835205078]}, {"cell phone": [592.4036865234375, 474.2517395019531, 639.7776489257812, 569.6195678710938]}, {"cell phone": [204.20370483398438, 259.8075256347656, 268.0956726074219, 397.4912109375]}, {"car": [50.833656311035156, 262.40350341796875, 130.03634643554688, 414.76763916015625]}]

// const jsonData = JSON.parse(fs.readFileSync(filePath));
// console.log(jsonData);

const lotJsonData = {
  
}

renderParkingLot(lotImage.width, lotImage.height, jsonData, lotJsonData);



function renderParkingLot(width, height, data, lotData) {
  // set up canvas with the right dimensions
  const scene = new THREE.Scene();
  const camera = new THREE.OrthographicCamera( width / - 2, width / 2, height / 2, height / - 2, 1, 1000 );
  const renderer = new THREE.WebGLRenderer({ canvas: document.querySelector('#bg') });
  document.body.appendChild(renderer.domElement);
  renderer.setPixelRatio(width / height);
  renderer.setSize(width, height);

  camera.position.setZ(30);

  renderer.render(scene, camera);

  
  // helper function for rendering a box on top of a parking spot thats full
  function renderFullSpot(data){
    
    const key = Object.keys(data)[0]
    console.log(data[key])

    let x1= data[key][0];
    let y1= data[key][1];
    let x2= data[key][2];
    let y2= data[key][3];
    
    const geometry = new THREE.BoxGeometry(x2-x1, y2-y1, 1);
    // const geometry = new THREE.IcosahedronGeometry(13, 0);

    const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
    const box = new THREE.Mesh(geometry, material);
    // console.log(data);
    // console.log(y1);
    box.position.x = x1 - width/2 + (x2-x1)/2;
    box.position.y = -y1 + height/2 - (y2-y1)/2;
    box.position.z = 0;

    scene.add(box);
  }

  // instead of rendering a box for each parking spot, we'll render a 3d model for each parking spot
  // uses a top down view of the car instead of a side view
  function renderCarSpot(data){
    const key = Object.keys(data)[0]
    // console.log(data[key])

    let x1= data[key][0];
    let y1= data[key][1];
    let x2= data[key][2];
    let y2= data[key][3];

    const loader = new GLTFLoader();

    loader.load('./static/models/untitled.glb', function (gltf) {
      gltf.scene.scale.set(20, 20, 20);
      gltf.scene.position.x = x1 - width / 2 + (x2 - x1) / 2;
      gltf.scene.position.y = -y1 + height / 2 - (y2 - y1) / 2 + 25;
      gltf.scene.position.z = 0;
      gltf.scene.rotation.x = Math.PI / 2;
      gltf.scene.rotation.y = -Math.PI / 2;
      // hard coded these cause idk math hehe
      
      scene.add(gltf.scene);
  }, undefined, function (error) {
      console.error(error);
  });

  
    
  }

  // for each obstruction, let's render a box
  for(let i = 0; i < data.length; i++){
    // renderFullSpot(data[i]);
    renderCarSpot(data[i]);
  }


  // const pointLight = new THREE.PointLight(0xffffff);
  // pointLight.position.set(5, 5, 5);
  // scene.add(pointLight);

  const ambientLight = new THREE.AmbientLight(0xffffff);
  scene.add(ambientLight);

  const background = new THREE.TextureLoader().load("../static/images/park-sample2.png");

  scene.background = background;

  var animate = function() {
    requestAnimationFrame(animate);
  
    renderer.render(scene, camera);
    
  };


  animate();


}
