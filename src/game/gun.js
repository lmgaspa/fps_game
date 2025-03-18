import * as THREE from 'three';

export function createGun() {
  const gun = new THREE.Group();

  // Corpo do rifle (metal)
  const bodyGeometry = new THREE.BoxGeometry(0, 0, 0);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0x555555, metalness: 0, roughness: 0 });
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  gun.add(body);

  // Cano do rifle (metal)
  const barrelGeometry = new THREE.CylinderGeometry(0.2, 0.1, 1.5);
  const barrelMaterial = new THREE.MeshStandardMaterial({ color: 0x333333, metalness: 0.9, roughness: 0.2 });
  const barrel = new THREE.Mesh(barrelGeometry, barrelMaterial);
  barrel.position.set(0, 0, -0.75);
  barrel.rotation.x = Math.PI / 2;
  gun.add(barrel);

  // Coronha (madeira)
  const stockGeometry = new THREE.BoxGeometry(0, 0, 0);
  const stockMaterial = new THREE.MeshStandardMaterial({ color: 0, roughness: 0.8 }); // Cor de madeira
  const stock = new THREE.Mesh(stockGeometry, stockMaterial);
  stock.position.set(-0.8, 0, 0);
  gun.add(stock);

  // Carregador (metal)
  const magazineGeometry = new THREE.BoxGeometry(0.3, 0.6, 0.2);
  const magazineMaterial = new THREE.MeshStandardMaterial({ color: 0x444444, metalness: 0.8, roughness: 0.4 });
  const magazine = new THREE.Mesh(magazineGeometry, magazineMaterial);
  magazine.position.set(0.2, -0.3, 0);
  gun.add(magazine);

  // Mira (metal)
  const sightGeometry = new THREE.BoxGeometry(0.1, 0.05, 0.3);
  const sightMaterial = new THREE.MeshStandardMaterial({ color: 0x666666, metalness: 0.9, roughness: 0.2 });
  const sight = new THREE.Mesh(sightGeometry, sightMaterial);
  sight.position.set(0, 0.2, 0);
  gun.add(sight);

  // Posiciona a arma na tela
  gun.position.set(0.5, -0.5, -1);
  gun.rotation.x = 0.2;

  return gun;
}