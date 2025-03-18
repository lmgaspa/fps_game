export function checkCollision(position, buildings) {
    for (const building of buildings) {
      const distance = position.distanceTo(building.position);
      if (distance < 3) {
        return true;
      }
    }
    return false;
  }