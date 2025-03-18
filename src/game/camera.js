import * as THREE from 'three';

export function setupCamera() {
  const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 2, 0);
  camera.rotation.order = 'YXZ';
  return camera;
}