import * as THREE from 'three';

function createBuilding(x, z) {
  const building = new THREE.Group();

  // Base do prédio
  const baseHeight = Math.random() * 10 + 10;
  const baseGeometry = new THREE.BoxGeometry(4, baseHeight, 4);
  const baseMaterial = new THREE.MeshStandardMaterial({ color: Math.random() * 0xffffff });
  const base = new THREE.Mesh(baseGeometry, baseMaterial);
  base.position.y = baseHeight / 2;
  building.add(base);

  // Janelas
  const windowGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.1);
  const windowMaterial = new THREE.MeshStandardMaterial({ color: 0xADD8E6 }); // Azul claro
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < baseHeight; j += 1.5) {
      const window = new THREE.Mesh(windowGeometry, windowMaterial);
      window.position.set(i - 1.5, j + 0.5, 2);
      building.add(window);
    }
  }

  building.position.set(x, 0, z);
  return building;
}

export function createBuildings(scene) {
  const buildings = [];

  for (let i = -40; i <= 40; i += 10) {
    for (let j = -40; j <= 40; j += 10) {
      // Verifica se a posição não está na rua
      if (Math.abs(i) > 2.5 && Math.abs(j) > 2.5) {
        if (Math.random() > 0.5) { // 50% de chance de criar um prédio
          const building = createBuilding(i, j);
          scene.add(building);
          buildings.push(building);
        }
      }
    }
  }

  return { buildings };
}