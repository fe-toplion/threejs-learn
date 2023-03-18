import * as THREE from "three";

const scene = THREE.Scene();

const camera = THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000)

const renderer = THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

