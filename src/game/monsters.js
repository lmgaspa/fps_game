import * as THREE from 'three';

function createMonster(x, z) {
  const monster = new THREE.Group();

  // Corpo
  const bodyGeometry = new THREE.BoxGeometry(1, 2, 1);
  const bodyMaterial = new THREE.MeshStandardMaterial({ color: 0xdd0000 }); // Vermelho escuro
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 1;
  monster.add(body);

  // Cabeça
  const headGeometry = new THREE.SphereGeometry(0.6);
  const headMaterial = new THREE.MeshStandardMaterial({ color: 0x000000 }); // Preto
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.y = 2.2;
  monster.add(head);

  // Braços
  const armGeometry = new THREE.BoxGeometry(0.4, 1.5, 0.4);
  const leftArm = new THREE.Mesh(armGeometry, bodyMaterial);
  leftArm.position.set(0.8, 1, 0);
  monster.add(leftArm);

  const rightArm = new THREE.Mesh(armGeometry, bodyMaterial);
  rightArm.position.set(-0.8, 1, 0);
  monster.add(rightArm);

  // Pernas
  const legGeometry = new THREE.BoxGeometry(0.4, 1.5, 0.4);
  const leftLeg = new THREE.Mesh(legGeometry, bodyMaterial);
  leftLeg.position.set(0.3, -0.5, 0);
  monster.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeometry, bodyMaterial);
  rightLeg.position.set(-0.3, -0.5, 0);
  monster.add(rightLeg);

  monster.position.set(x, 0, z);
  monster.health = 5; // Vida do monstro
  return monster;
}

export function createMonsters(scene) {
  const monsters = [];
  
  // Criar 3 monstros em posições aleatórias
  for (let i = 0; i < 18; i++) {
    const monster = createMonster(
      Math.random() * 40 - 20,
      Math.random() * 40 - 20
    );
    scene.add(monster);
    monsters.push(monster);
  }

  return { monsters };
}