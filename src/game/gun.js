import * as THREE from 'three';

export function createGun() {
  const gun = new THREE.Group();

  // Corpo do rifle
  const bodyGeometry = new THREE.BoxGeometry(1, 0.5, 0.2);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x808080 }); // Cinza
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  gun.add(body);

  // Cano do rifle
  const barrelGeometry = new THREE.CylinderGeometry(0.1, 0.1, 1);
  const barrelMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Preto
  const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
  barrel.position.set(0, 0, -0.5);
  barrel.rotation.x = Math.PI / 2;
  gun.add(barrel);

  // Posiciona a arma na tela
  gun.position.set(0.5, -0.5, -1);
  gun.rotation.x = 0.2;
  
  return gun;
}