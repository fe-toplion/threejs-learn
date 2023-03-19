import * as THREE from "three";

// 场景
const scene = new THREE.Scene();

// 相机
const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.set(-10, 10, 10);
camera.lookAt(scene.position);

// 渲染器
const renderer = new THREE.WebGLRenderer();
renderer.setClearColor(new THREE.Color(0x000000)); // 设置渲染背景色
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;

// 在场景中添加元素
// 添加坐标系
const axes = new THREE.AxesHelper(20);
scene.add(axes);

// 添加平面
const planeGeomtry = new THREE.PlaneGeometry(15, 10);
const planeMaterial = new THREE.MeshLambertMaterial({color: 0xeeeeee});
const plane = new THREE.Mesh(planeGeomtry, planeMaterial);
plane.rotation.x = -0.5 * Math.PI;
plane.position.set(0, 0, 0);
plane.receiveShadow = true;
scene.add(plane);

// 添加方块
const cubeGeomtry = new THREE.BoxGeometry(1, 1, 1);
const cubeMaterial = new THREE.MeshLambertMaterial({color: 0xff0000, wireframe: false});
const cube = new THREE.Mesh(cubeGeomtry, cubeMaterial);
cube.position.set(-2, 0.5, 0);
cube.castShadow = true;
scene.add(cube)

// 添加球体
const sphereGeomtry = new THREE.SphereGeometry(1, 30, 30);
const sphereMaterial = new THREE.MeshLambertMaterial({color: 0x00ff00, wireframe: false});
const sphere = new THREE.Mesh(sphereGeomtry, sphereMaterial);
sphere.position.set(2, 1, 0);
sphere.castShadow = true;
scene.add(sphere)

// 添加光源
const spotLight = new THREE.SpotLight(0xffffff);
spotLight.position.set(-10, 12, -10);
spotLight.castShadow = true;
scene.add(spotLight);



// 将渲染器中的内容添加到文档节点中，完成渲染
document.querySelector("#app").appendChild(renderer.domElement);


// 窗口改变后，重新设置宽高比，和渲染器尺寸
window.addEventListener("resize", onWindowResize, false);
function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
}

let step = 0;
function renderScene() {
  // 方块旋转
  cube.rotation.x += 0.02;
  cube.rotation.y += 0.02;
  cube.rotation.z += 0.02;

  // 球体弹跳动画
  step += 0.04;
  sphere.position.x = 1 + (-4 * Math.cos(step));
  sphere.position.y = 1 + (3 * Math.abs(Math.sin(step)));

  requestAnimationFrame(renderScene);
  // 计算在摄像机指定角度下，浏览器中scene的样子。可以理解为将摄像机中拍摄的场景，渲染成画面
  renderer.render(scene, camera);
}

renderScene()
