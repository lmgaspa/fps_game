import * as THREE from 'three';

export function updateBullets(bullets, monsters, scene) {
  for (let i = bullets.length - 1; i >= 0; i--) {
    const bullet = bullets[i];
    bullet.position.add(bullet.velocity);

    // Verifica colisão da bala com monstros
    for (let j = monsters.length - 1; j >= 0; j--) {
      const monster = monsters[j];
      if (bullet.position.distanceTo(monster.position) < 1) {
        monster.health -= 1;
        if (monster.health <= 0) {
          scene.remove(monster);
          monsters.splice(j, 1);
        }
        scene.remove(bullet);
        bullets.splice(i, 1);
        break;
      }
    }

    // Remove a bala se sair da cena
    if (bullet && bullet.position.length() > 100) {
      scene.remove(bullet);
      bullets.splice(i, 1);
    }
  }

  return bullets;
}