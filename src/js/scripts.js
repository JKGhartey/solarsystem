import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import starsTexture from "../img/stars.jpg";
import sunTexture from "../img/sun.jpg";
import mercuryTexture from "../img/mercury.jpg";
import venusTexture from "../img/venus.jpg";
import earthTexture from "../img/earth.jpg";
import marsTexture from "../img/mars.jpg";
import jupiterTexture from "../img/jupiter.jpg";
import saturnTexture from "../img/saturn.jpg";
import saturnRingTexture from "../img/saturn ring.png";
import uranusTexture from "../img/uranus.jpg";
import uranusRingTexture from "../img/uranus ring.png";
import neptuneTexture from "../img/neptune.jpg";
import plutoTexture from "../img/pluto.jpg";

import earthMoonTexture from "../img/earthMoon.jpg";
import phobosTexture from "../img/phobos.jpg";
import demiosTexture from "../img/demios.jpg";
import ioTexture from "../img/io.jpg";
import europaTexture from "../img/europa.jpg";
import ganymedeTexture from "../img/ganymede.jpg";
import callistoTexture from "../img/callisto.jpg";

import mimasTexture from "../img/mimas.jpg";
import enceladusTexture from "../img/RS3_Enceladus.jpg";
import tethysTexture from "../img/RS3_Tethys.jpg";
import dioneTexture from "../img/dione.jpg";
import rheaTexture from "../img/RS3_Rhea.jpg";
import titanTexture from "../img/Titan.jpg";
import iapetusTexture from "../img/RS3_Iapetus.jpg";

import mirandaTexture from "../img/RS3_Miranda.jpg";
import arielTexture from "../img/Ariel-0.jpg";
import umbrielTexture from "../img/RS3_Umbriel.jpg";
import titaniaTexture from "../img/Titania.jpg";
import oberonTexture from "../img/RS3_Oberon.jpg";

import tritonTexture from "../img/RS3_Triton.jpg";
import proteusTexture from "../img/Proteus.jpg";
import nereidTexture from "../img/Nereid.jpg";

const renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, renderer.domElement);

camera.position.set(-90, 140, 140);
orbit.update();

const ambientLight = new THREE.AmbientLight(0x333333);
scene.add(ambientLight);

const cubeTextureLoader = new THREE.CubeTextureLoader();
scene.background = cubeTextureLoader.load([
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
  starsTexture,
]);

const textureLoader = new THREE.TextureLoader();

const sunGeo = new THREE.SphereGeometry(20, 30, 30); //create the sun sphere
const sunMat = new THREE.MeshBasicMaterial({
  map: textureLoader.load(sunTexture),
});
const sun = new THREE.Mesh(sunGeo, sunMat);
scene.add(sun);

function createPlanete(size, texture, position, ring) {
  const geo = new THREE.SphereGeometry(size, 30, 30);
  const mat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const mesh = new THREE.Mesh(geo, mat);
  const obj = new THREE.Object3D();
  obj.add(mesh);
  if (ring) {
    const ringGeo = new THREE.RingGeometry(
      ring.innerRadius,
      ring.outerRadius,
      32
    );
    const ringMat = new THREE.MeshBasicMaterial({
      map: textureLoader.load(ring.texture),
      side: THREE.DoubleSide,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    obj.add(ringMesh);
    ringMesh.position.x = position;
    ringMesh.rotation.x = -0.5 * Math.PI;
  }
  scene.add(obj);
  mesh.position.x = position;
  return { mesh, obj };
}

// Creating the moons
function createMoon(size, texture, planet, distanceFactor = 3) {
  const moonGeo = new THREE.SphereGeometry(size, 30, 30);
  const moonMat = new THREE.MeshStandardMaterial({
    map: textureLoader.load(texture),
  });
  const moonMesh = new THREE.Mesh(moonGeo, moonMat);

  // Create a pivot point and add it to the planet's obj
  const pivot = new THREE.Object3D();
  planet.obj.add(pivot);

  // Set the pivot point's position to the same as the planet's mesh position
  pivot.position.copy(planet.mesh.position);

  // Set the moon's initial position relative to the pivot point
  const distance =
    planet.mesh.geometry.parameters.radius + size * distanceFactor;
  moonMesh.position.set(distance, 0, 0);

  // Add the moon mesh to the pivot point
  pivot.add(moonMesh);

  // Add a rotate function to the pivot object
  pivot.rotate = function (angle) {
    pivot.rotation.y += angle;
  };

  return { moonMesh, pivot };
}

// Creating the planets
const mercury = createPlanete(3.2, mercuryTexture, 28);
const venus = createPlanete(5.8, venusTexture, 44);
const earth = createPlanete(6, earthTexture, 62);
const mars = createPlanete(4, marsTexture, 78);
const jupiter = createPlanete(12, jupiterTexture, 100);
const saturn = createPlanete(10, saturnTexture, 138, {
  innerRadius: 10,
  outerRadius: 20,
  texture: saturnRingTexture,
});
const uranus = createPlanete(7, uranusTexture, 176, {
  innerRadius: 7,
  outerRadius: 12,
  texture: uranusRingTexture,
});
const neptune = createPlanete(7, neptuneTexture, 200);
const pluto = createPlanete(2.8, plutoTexture, 216);

// Moons
const earthMoon = createMoon(1.6, earthMoonTexture, earth);
const phobos = createMoon(0.9, phobosTexture, mars, 4);
const demios = createMoon(0.5, demiosTexture, mars);

const io = createMoon(1.8, ioTexture, jupiter, 2.5);
const europa = createMoon(1.6, europaTexture, jupiter, 3);
const ganymede = createMoon(2.6, ganymedeTexture, jupiter, 3.5);
const callisto = createMoon(2.4, callistoTexture, jupiter, 4);

const mimas = createMoon(0.6, mimasTexture, saturn, 2);
const enceladus = createMoon(1, enceladusTexture, saturn, 2.5);
const tethys = createMoon(1.2, tethysTexture, saturn, 3);
const dione = createMoon(1.4, dioneTexture, saturn, 3.5);
const rhea = createMoon(1.6, rheaTexture, saturn, 4);
const titan = createMoon(2.8, titanTexture, saturn, 5);
const iapetus = createMoon(1.8, iapetusTexture, saturn, 6);

const miranda = createMoon(0.8, mirandaTexture, uranus, 1.5);
const ariel = createMoon(1.2, arielTexture, uranus, 2);
const umbriel = createMoon(1.2, umbrielTexture, uranus, 2.5);
const titania = createMoon(1.6, titaniaTexture, uranus, 3);
const oberon = createMoon(1.6, oberonTexture, uranus, 3.5);

const triton = createMoon(2, tritonTexture, neptune, 3);
const proteus = createMoon(1.6, proteusTexture, neptune, 4);
const nereid = createMoon(1.6, nereidTexture, neptune, 4.5);

const pointLight = new THREE.PointLight(0xffffff, 2, 300);
scene.add(pointLight);

function animate() {
  //Self-rotation
  sun.rotateY(0.004);
  mercury.mesh.rotateY(0.004);
  venus.mesh.rotateY(0.002);
  earth.mesh.rotateY(0.02);
  mars.mesh.rotateY(0.018);
  jupiter.mesh.rotateY(0.04);
  saturn.mesh.rotateY(0.038);
  uranus.mesh.rotateY(0.03);
  neptune.mesh.rotateY(0.032);
  pluto.mesh.rotateY(0.008);

  //Around-sun-rotation
  mercury.obj.rotateY(0.04);
  venus.obj.rotateY(0.015);
  earth.obj.rotateY(0.01);
  mars.obj.rotateY(0.008);
  jupiter.obj.rotateY(0.002);
  saturn.obj.rotateY(0.0009);
  uranus.obj.rotateY(0.0004);
  neptune.obj.rotateY(0.0001);
  pluto.obj.rotateY(0.00007);

  // Moon Rotations
  earthMoon.pivot.rotate(0.03);

  phobos.pivot.rotate(0.04);
  demios.pivot.rotate(0.05);

  io.pivot.rotate(0.06);
  europa.pivot.rotate(0.05);
  ganymede.pivot.rotate(0.04);
  callisto.pivot.rotate(0.03);

  mimas.pivot.rotate(0.08);
  enceladus.pivot.rotate(0.07);
  tethys.pivot.rotate(0.06);
  dione.pivot.rotate(0.05);
  rhea.pivot.rotate(0.04);
  titan.pivot.rotate(0.03);
  iapetus.pivot.rotate(0.02);

  miranda.pivot.rotate(0.08);
  ariel.pivot.rotate(0.07);
  umbriel.pivot.rotate(0.06);
  titania.pivot.rotate(0.05);
  oberon.pivot.rotate(0.04);

  triton.pivot.rotate(0.04);
  proteus.pivot.rotate(0.03);
  nereid.pivot.rotate(0.05);

  renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);

window.addEventListener("resize", function () {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});
