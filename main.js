import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg"),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);
// renderer.render(scene, camera);

// GEOMERYT

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
// const material = new THREE.MeshBasicMaterial({
//   color: 0xff6347,
//   wireframe: true,
// });
const material = new THREE.MeshStandardMaterial({
  color: 0xff6347,
  wireframe: true,
});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

const pointLight = new THREE.PointLight(0xffffff);

pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);

scene.add(pointLight, ambientLight);

// const lightHelper = new THREE.PointLightHelper(pointLight);
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffa500 });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(100).fill().forEach(addStar);

// const spaceTexture = new THREE.TextureLoader().load("./space.jpg");
// scene.background = spaceTexture;

// Avatar JadoTexture

const jadoTexture = new THREE.TextureLoader().load("./Up.png");
const jado = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial({ map: jadoTexture })
);

scene.add(jado);

//Earth

// const earthTexture = new THREE.TextureLoader().load("./mooon.jpeg");

// const earth = new THREE.Mesh(
//   new THREE.SphereGeometry(3, 32, 32),
//   new THREE.MeshStandardMaterial({ map: earthTexture })
// );

// scene.add(earth);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  // earth.rotation.x += 0.05;
  // earth.rotation.y += 0.075;
  // earth.rotation.z += 0.05;

  jado.rotation.y += 0.01;
  jado.rotation.z += 0.01;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.position.y = t * -0.0002;
}

document.body.onscroll = moveCamera;

//ADDING SOUND
const listener = new THREE.AudioListener();
camera.add(listener);
// create a global audio source
const sound = new THREE.Audio(listener);
const audioLoader = new THREE.AudioLoader();
audioLoader.load("./audio.mp3", function (buffer) {
  sound.setBuffer(buffer);
  sound.setLoop(true);
  sound.setVolume(0.5);

  document.getElementById("play").addEventListener("click", () => {
    sound.play();
  });
});

function animate() {
  requestAnimationFrame(animate);
  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;
  controls.update();
  renderer.render(scene, camera);
}

animate();

/** CONTENTS DISPLAY HANDLING */

document.getElementById("reset").addEventListener("click", () => {
  document.getElementById("about").style.display = "none";
  document.getElementById("skills").style.display = "none";
  document.getElementById("projects").style.display = "none";
});

document.getElementById("navabout").addEventListener("click", () => {
  document.getElementById("about").style.display = "block";
  document.getElementById("skills").style.display = "none";
  document.getElementById("projects").style.display = "none";
});

document.getElementById("navskills").addEventListener("click", () => {
  document.getElementById("about").style.display = "none";
  document.getElementById("skills").style.display = "block";
  document.getElementById("projects").style.display = "none";
});

document.getElementById("navprojects").addEventListener("click", () => {
  document.getElementById("about").style.display = "none";
  document.getElementById("skills").style.display = "none";
  document.getElementById("projects").style.display = "flex";
});

document.getElementById("menubar").addEventListener("click", () => {
  document.getElementById("mobile__Device").style.display = "block";
});
