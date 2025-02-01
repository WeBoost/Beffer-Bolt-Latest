import { BoxGeometry, CylinderGeometry, Mesh, MeshStandardMaterial, Group } from 'three';
import { loadMaterial } from './materials';

// Hardware component definitions and generators
export const createDoorHandle = async (type: string = 'standard'): Promise<Group> => {
  const handleGroup = new Group();
  
  const handleTypes = {
    standard: {
      material: 'metal/brushedSteel',
      dimensions: { length: 0.15, radius: 0.01 }
    },
    premium: {
      material: 'metal/copper',
      dimensions: { length: 0.18, radius: 0.012 }
    },
    luxury: {
      material: 'metal/brushedSteel',
      dimensions: { length: 0.2, radius: 0.015 }
    }
  };

  const config = handleTypes[type] || handleTypes.standard;
  const material = await loadMaterial(...config.material.split('/'));

  // Handle grip
  const handleGeometry = new CylinderGeometry(
    config.dimensions.radius,
    config.dimensions.radius,
    config.dimensions.length,
    32
  );
  const handle = new Mesh(handleGeometry, material);
  handle.rotation.z = Math.PI / 2;

  // Handle mount
  const mountGeometry = new CylinderGeometry(
    config.dimensions.radius * 1.5,
    config.dimensions.radius * 1.5,
    0.02,
    32
  );
  const mount = new Mesh(mountGeometry, material);
  mount.rotation.x = Math.PI / 2;

  handleGroup.add(handle, mount);
  handleGroup.name = 'handle';

  return handleGroup;
};

export const createLockSet = async (type: string = 'standard'): Promise<Group> => {
  const lockGroup = new Group();

  const lockTypes = {
    standard: {
      material: 'metal/brushedSteel',
      dimensions: { width: 0.05, height: 0.08, depth: 0.02 }
    },
    security: {
      material: 'metal/brushedSteel',
      dimensions: { width: 0.06, height: 0.1, depth: 0.025 }
    }
  };

  const config = lockTypes[type] || lockTypes.standard;
  const material = await loadMaterial(...config.material.split('/'));

  // Lock body
  const lockGeometry = new BoxGeometry(
    config.dimensions.width,
    config.dimensions.height,
    config.dimensions.depth
  );
  const lock = new Mesh(lockGeometry, material);

  // Keyhole
  const keyholeGeometry = new CylinderGeometry(0.005, 0.005, 0.025, 32);
  const keyhole = new Mesh(keyholeGeometry, material);
  keyhole.rotation.x = Math.PI / 2;
  keyhole.position.z = config.dimensions.depth / 2;

  lockGroup.add(lock, keyhole);
  lockGroup.name = 'lock';

  return lockGroup;
};

export const createHinges = async (count: number = 3): Promise<Group> => {
  const hingeGroup = new Group();
  const material = await loadMaterial('metal', 'brushedSteel');

  const hingeHeight = 0.1;
  const spacing = 0.5;

  for (let i = 0; i < count; i++) {
    const hinge = new Group();

    // Hinge plates
    const plateGeometry = new BoxGeometry(0.05, hingeHeight, 0.002);
    const plate1 = new Mesh(plateGeometry, material);
    const plate2 = new Mesh(plateGeometry, material);
    plate2.position.z = 0.02;

    // Hinge pin
    const pinGeometry = new CylinderGeometry(0.005, 0.005, hingeHeight, 32);
    const pin = new Mesh(pinGeometry, material);
    pin.position.z = 0.01;

    hinge.add(plate1, plate2, pin);
    hinge.position.y = (i - (count - 1) / 2) * spacing;
    hingeGroup.add(hinge);
  }

  hingeGroup.name = 'hinges';
  return hingeGroup;
};