import * as THREE from 'three';
import { setupCamera } from './game/camera.js';
import { createScene } from './game/scene.js';
import { createBuildings } from './game/buildings.js';
import { createMonsters } from './game/monsters.js';
import { createGun } from './game/gun.js';
import { setupControls } from './game/controls.js';
import { updateBullets } from './game/bullets.js';
import { checkCollision } from './utils/collision.js';

// Inicialização do jogo
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Criar cena e câmera
const scene = createScene();
const camera = setupCamera();
scene.add(camera);

// Criar elementos do jogo
const { buildings } = createBuildings(scene);
const gun = createGun();
camera.add(gun);

// Configurar controles
const { keys, bullets } = setupControls(camera, scene);

// Posição inicial do jogador para respawn
const playerStartPosition = new THREE.Vector3(0, 2, 0);

// Estado do jogo
let gameOver = false;
let monsters = [];
let monstersSpawnTimeout = null;

// Função para spawnar monstros
function spawnMonsters() {
  // Remover monstros existentes
  for (const monster of monsters) {
    scene.remove(monster);
  }
  monsters = [];

  // Criar novos monstros após 5 segundos
  monstersSpawnTimeout = setTimeout(() => {
    const result = createMonsters(scene);
    monsters = result.monsters;
    console.log("Monstros apareceram!");
  }, 5000);
}

// Função para resetar o jogo quando o jogador morre
function respawnPlayer() {
  gameOver = false;
  
  // Reposicionar o jogador
  camera.position.copy(playerStartPosition);
  camera.rotation.set(0, 0, 0);
  
  // Remover todas as balas
  for (const bullet of bullets) {
    scene.remove(bullet);
  }
  bullets.length = 0;
  
  // Respawnar monstros após 5 segundos
  spawnMonsters();
}

// Spawnar monstros pela primeira vez
spawnMonsters();

// Função de animação
function animate() {
  requestAnimationFrame(animate);

  if (!gameOver) {
    // Movimento do personagem
    const speed = 0.2;
    const direction = new THREE.Vector3();

    if (keys['KeyW']) direction.z -= 1;
    if (keys['KeyS']) direction.z += 1;
    if (keys['KeyA']) direction.x -= 1;
    if (keys['KeyD']) direction.x += 1;

    direction.normalize().multiplyScalar(speed);
    direction.applyEuler(new THREE.Euler(0, camera.rotation.y, 0));

    const newPosition = camera.position.clone().add(direction);
    if (!checkCollision(newPosition, buildings)) {
      camera.position.add(direction);
    }

    // Movimento dos monstros
    for (let i = monsters.length - 1; i >= 0; i--) {
      const monster = monsters[i];
      const monsterDirection = new THREE.Vector3()
        .subVectors(camera.position, monster.position)
        .normalize()
        .multiplyScalar(0.1);
      
      monster.position.add(monsterDirection);

      // Verificar colisão com prédios
      if (checkCollision(monster.position, buildings)) {
        monster.position.sub(monsterDirection);
      }

      // Ver se o monstro pegou o jogador
      if (monster.position.distanceTo(camera.position) < 2) {
        gameOver = true;
        
        // Adicionar atraso para mensagem de game over e respawn
        setTimeout(() => {
          alert("GAME OVER! Um monstro te pegou!");
          respawnPlayer();
        }, 100);
      }
    }

    // Atualizar balas e verificar colisões
    updateBullets(bullets, monsters, scene);

    // Verificar vitória
    if (monsters.length === 0 && !monstersSpawnTimeout) {
      gameOver = true;
      setTimeout(() => {
        alert("VOCÊ VENCEU! Todos os monstros foram derrotados!");
        respawnPlayer();
      }, 100);
    }
  }

  renderer.render(scene, camera);
}

// Redimensionar a janela
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Iniciar o jogo
animate();