import { AnimationClip, NumberKeyframeTrack, VectorKeyframeTrack } from 'three';

// Animation definitions for door movements
export const createDoorAnimations = (doorMesh: THREE.Mesh): AnimationClip[] => {
  // Open/close animation
  const openClose = new AnimationClip('openClose', 2, [
    new NumberKeyframeTrack(
      '.rotation[y]',
      [0, 1, 2],
      [0, Math.PI * 0.8, 0]
    )
  ]);

  // Slight wobble animation for when door is interacted with
  const wobble = new AnimationClip('wobble', 0.5, [
    new NumberKeyframeTrack(
      '.rotation[y]',
      [0, 0.125, 0.25, 0.375, 0.5],
      [0, 0.05, 0, -0.05, 0]
    )
  ]);

  // Handle turn animation
  if (doorMesh.getObjectByName('handle')) {
    const handleTurn = new AnimationClip('handleTurn', 0.5, [
      new NumberKeyframeTrack(
        'handle.rotation[z]',
        [0, 0.25, 0.5],
        [0, Math.PI * 0.25, 0]
      )
    ]);
    return [openClose, wobble, handleTurn];
  }

  return [openClose, wobble];
};

// Camera animation presets
export const cameraAnimations = {
  // Orbit around the door
  orbit: (camera: THREE.Camera, target: THREE.Vector3, duration: number = 5): AnimationClip => {
    const posTrack = new VectorKeyframeTrack(
      '.position',
      [0, duration / 4, duration / 2, (duration * 3) / 4, duration],
      [
        camera.position.x, camera.position.y, camera.position.z,
        -camera.position.z, camera.position.y, camera.position.x,
        -camera.position.x, camera.position.y, -camera.position.z,
        camera.position.z, camera.position.y, -camera.position.x,
        camera.position.x, camera.position.y, camera.position.z
      ]
    );

    return new AnimationClip('orbit', duration, [posTrack]);
  },

  // Zoom to focus on a specific feature
  zoomToFeature: (
    camera: THREE.Camera,
    startPosition: THREE.Vector3,
    endPosition: THREE.Vector3,
    duration: number = 1
  ): AnimationClip => {
    const posTrack = new VectorKeyframeTrack(
      '.position',
      [0, duration],
      [
        startPosition.x, startPosition.y, startPosition.z,
        endPosition.x, endPosition.y, endPosition.z
      ]
    );

    return new AnimationClip('zoomToFeature', duration, [posTrack]);
  }
};

// Helper function to create smooth transitions
export const createTransition = (
  object: THREE.Object3D,
  property: string,
  startValue: number | THREE.Vector3,
  endValue: number | THREE.Vector3,
  duration: number = 0.5
): AnimationClip => {
  const times = [0, duration];
  let values: number[];

  if (typeof startValue === 'number' && typeof endValue === 'number') {
    values = [startValue, endValue];
    return new AnimationClip('transition', duration, [
      new NumberKeyframeTrack(property, times, values)
    ]);
  } else {
    const start = startValue as THREE.Vector3;
    const end = endValue as THREE.Vector3;
    values = [start.x, start.y, start.z, end.x, end.y, end.z];
    return new AnimationClip('transition', duration, [
      new VectorKeyframeTrack(property, times, values)
    ]);
  }
};