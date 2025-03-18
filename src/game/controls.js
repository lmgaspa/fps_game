import * as THREE from 'three';

export function setupControls(camera, scene) {
  const keys = {};
  const bullets = [];
  let isMouseLocked = false;

  // Configuração de teclas
  document.addEventListener('keydown', (e) => keys[e.code] = true);
  document.addEventListener('keyup', (e) => keys[e.code] = false);

  // Configuração do mouse
  document.addEventListener('click', () => {
    if (!isMouseLocked) {
      document.body.requestPointerLock = document.body.requestPointerLock || 
                                          document.body.mozRequestPointerLock || 
                                          document.body.webkitRequestPointerLock;
      document.body.requestPointerLock();
      isMouseLocked = true;
    }
  });

  document.addEventListener('pointerlockchange', () => {
    isMouseLocked = document.pointerLockElement === document.body;
  }, false);

  document.addEventListener('mozpointerlockchange', () => {
    isMouseLocked = document.mozPointerLockElement === document.body;
  }, false);

  document.addEventListener('webkitpointerlockchange', () => {
    isMouseLocked = document.webkitPointerLockElement === document.body;
  }, false);

  document.addEventListener('mousemove', (e) => {
    if (isMouseLocked) {
      const sensitivity = 0.002;
      camera.rotation.y -= e.movementX * sensitivity;
      camera.rotation.x -= e.movementY * sensitivity;
      camera.rotation.x = Math.max(-Math.PI / 2, Math.min(Math.PI / 2, camera.rotation.x));
    }
  });

  // Configuração do tiro
  document.addEventListener('mousedown', (e) => {
    if (e.button === 0 && isMouseLocked) {
      const bulletGeometry = new THREE.SphereGeometry(0.1);
      const bulletMaterial = new THREE.MeshStandardMaterial({ color: 0xFFFF00 });
      const bullet = new THREE.Mesh(bulletGeometry, bulletMaterial);

      bullet.position.copy(camera.position);
      const direction = new THREE.Vector3(0, 0, -1).applyQuaternion(camera.quaternion);
      bullet.velocity = direction.multiplyScalar(2);

      scene.add(bullet);
      bullets.push(bullet);
    }
  });

  return { keys, bullets };
}