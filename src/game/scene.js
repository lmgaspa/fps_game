import * as THREE from 'three';

export function createScene() {
  const scene = new THREE.Scene();
  
  // Luzes
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(10, 20, 10);
  scene.add(directionalLight);

  // Chão (grama)
  const groundGeometry = new THREE.PlaneGeometry(100, 100);
  const groundMaterial = new THREE.MeshStandardMaterial({ color: 0x228B22 }); // Verde
  const ground = new THREE.Mesh(groundGeometry, groundMaterial);
  ground.rotation.x = -Math.PI / 2;
  scene.add(ground);

  // Ruas
  const streetGeometry = new THREE.PlaneGeometry(100, 5);
  const streetMaterial = new THREE.MeshStandardMaterial({ color: 0x333333 }); // Preto
  const street1 = new THREE.Mesh(streetGeometry, streetMaterial);
  street1.rotation.x = -Math.PI / 2;
  street1.position.set(0, 0.01, 0);
  scene.add(street1);

  const street2 = new THREE.Mesh(streetGeometry, streetMaterial);
  street2.rotation.x = -Math.PI / 2;
  street2.rotation.z = Math.PI / 2;
  street2.position.set(0, 0.01, 0);
  scene.add(street2);

  return scene;
}