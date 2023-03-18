import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { TrackballControls } from "three/examples/jsm/controls/TrackballControls";
import {
  CSS3DRenderer,
  CSS3DObject,
} from "three/examples/jsm/renderers/CSS3DRenderer.js";


const scene = new THREE.Scene();

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);


const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  1,
  1000
);
camera.position.set(0, 0, 5);
const controls = new OrbitControls(camera, renderer.domElement);
controls.addEventListener("change", function () {
  renderer.render(scene, camera);
});

const loader = new GLTFLoader();
loader.load(
  "../static/craftsman/scene.gltf",
  function (gltf) {
    console.log(11);
    // gltf.scene.traverse(function (child) {
    //   if (child.isMesh) {
    //     child.material.emissive = child.material.color;
    //     child.material.emissiveMap = child.material.map;
    //   }
    // });
    scene.add(gltf.scene);
    renderer.render(scene, camera);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

// 添加光源
const light = new THREE.AmbientLight(0xffffff);
scene.add(light);
let pointLight = new THREE.PointLight(0xffffff, 1, 0);
pointLight.position.set(100, 100, 100); //设置点光源位置
scene.add(pointLight); //将点光源添加至场景

renderer.render(scene, camera);

window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}
