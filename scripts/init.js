import * as THREE from '../ThreeJS/three.module.js';
export { THREE }
export { OBJLoader } from '../addons/loaders/OBJLoader.js';

import { addGround, addCube, addLine, addNinja } from './objects.js'
import { animationStart } from './animateFrame.js'

function init(){
  // Создаем камеру, сцену и рендерер
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 1, 5);


  const renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  let ambientLight = new THREE.AmbientLight( 0xcccccc, 0.4);
  scene.add(ambientLight)
  let spotLight = new THREE.SpotLight( 0xffffff, 0.8);
  scene.add(spotLight)

  addGround(scene)
  addCube(scene)
  addLine(scene)
  addNinja(scene)

  animationStart(scene, camera, renderer);
}
export {init}