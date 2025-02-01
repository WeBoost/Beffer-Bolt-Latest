import { Vector2, Vector3, Box3, Object3D } from 'three';

// Helper functions for door visualization
export const calculateDoorDimensions = (
  width: number,
  height: number,
  thickness: number
): { size: Vector3; center: Vector3 } => {
  // Convert inches to meters for Three.js
  const metersWidth = width * 0.0254;
  const metersHeight = height * 0.0254;
  const metersThickness = thickness * 0.0254;

  return {
    size: new Vector3(metersWidth, metersHeight, metersThickness),
    center: new Vector3(0, metersHeight / 2, 0)
  };
};

export const calculateHardwarePositions = (
  doorSize: Vector3
): { handle: Vector3; lock: Vector3; hinges: Vector3[] } => {
  const handleHeight = doorSize.y * 0.4;
  const handleOffset = doorSize.x * 0.9;

  return {
    handle: new Vector3(handleOffset, handleHeight, 0),
    lock: new Vector3(handleOffset - 0.05, handleHeight, 0),
    hinges: [
      new Vector3(-doorSize.x / 2, doorSize.y * 0.2, 0),
      new Vector3(-doorSize.x / 2, doorSize.y * 0.5, 0),
      new Vector3(-doorSize.x / 2, doorSize.y * 0.8, 0)
    ]
  };
};

export const calculateGlassDimensions = (
  doorSize: Vector3,
  glassConfig: { width: number; height: number }
): { size: Vector2; position: Vector3 } => {
  const glassWidth = doorSize.x * (glassConfig.width / 100);
  const glassHeight = doorSize.y * (glassConfig.height / 100);
  const position = new Vector3(
    0,
    doorSize.y * 0.6,
    doorSize.z / 2 + 0.001
  );

  return {
    size: new Vector2(glassWidth, glassHeight),
    position
  };
};

export const fitCameraToObject = (
  camera: THREE.Camera,
  object: Object3D,
  offset: number = 1.5,
  controls?: any
): void => {
  const boundingBox = new Box3();
  boundingBox.setFromObject(object);

  const center = boundingBox.getCenter(new Vector3());
  const size = boundingBox.getSize(new Vector3());

  const maxDim = Math.max(size.x, size.y, size.z);
  const fov = camera.fov * (Math.PI / 180);
  let cameraZ = Math.abs(maxDim / 2 / Math.tan(fov / 2)) * offset;

  camera.position.set(center.x, center.y, cameraZ);
  camera.lookAt(center);

  if (controls) {
    controls.target.copy(center);
    controls.update();
  }
};

export const createScreenshot = (
  renderer: THREE.WebGLRenderer,
  scene: THREE.Scene,
  camera: THREE.Camera
): string => {
  renderer.render(scene, camera);
  return renderer.domElement.toDataURL('image/png');
};