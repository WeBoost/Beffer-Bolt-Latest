import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { AnimationMixer, AnimationAction } from 'three';
import { loadMaterial } from '../../lib/materials';
import { createDoorAnimations, cameraAnimations } from '../../lib/animations';
import { createDoorHandle, createLockSet, createHinges } from '../../lib/hardware';
import {
  calculateDoorDimensions,
  calculateHardwarePositions,
  calculateGlassDimensions,
  fitCameraToObject,
  createScreenshot
} from '../../lib/utils';

interface DoorVisualization3DProps {
  config: {
    type: string;
    material: string;
    width: number;
    height: number;
    thickness: number;
    hardware: string;
    finish: string;
    glass?: string;
    extras: string[];
  };
  onScreenshot?: (dataUrl: string) => void;
}

export function DoorVisualization3D({ config, onScreenshot }: DoorVisualization3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const doorGroupRef = useRef<THREE.Group | null>(null);
  const mixerRef = useRef<AnimationMixer | null>(null);
  const animationsRef = useRef<{ [key: string]: AnimationAction }>({});

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current) return;

    // Initialize scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1a1a1a);
    sceneRef.current = scene;

    // Initialize camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 1, 2);
    cameraRef.current = camera;

    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Initialize controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.minDistance = 1;
    controls.maxDistance = 5;
    controlsRef.current = controls;

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xffffff, 0.8);
    mainLight.position.set(5, 5, 5);
    mainLight.castShadow = true;
    scene.add(mainLight);

    const fillLight = new THREE.DirectionalLight(0xffffff, 0.4);
    fillLight.position.set(-5, 0, -5);
    scene.add(fillLight);

    // Animation loop
    let animationFrameId: number;
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      
      if (mixerRef.current) {
        mixerRef.current.update(0.016); // Update animations
      }
      
      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      containerRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  // Update door model when configuration changes
  useEffect(() => {
    const updateDoor = async () => {
      if (!sceneRef.current) return;
      setIsLoading(true);

      try {
        // Remove existing door
        if (doorGroupRef.current) {
          sceneRef.current.remove(doorGroupRef.current);
        }

        // Create new door group
        const doorGroup = new THREE.Group();
        doorGroupRef.current = doorGroup;

        // Calculate dimensions
        const { size, center } = calculateDoorDimensions(
          config.width,
          config.height,
          config.thickness
        );

        // Create door geometry
        const doorGeometry = new THREE.BoxGeometry(size.x, size.y, size.z);
        const doorMaterial = await loadMaterial(config.material, config.finish);
        const door = new THREE.Mesh(doorGeometry, doorMaterial);
        door.castShadow = true;
        door.receiveShadow = true;
        doorGroup.add(door);

        // Add glass if present
        if (config.glass) {
          const { size: glassSize, position: glassPosition } = calculateGlassDimensions(
            size,
            { width: 60, height: 40 } // Default glass panel size
          );
          
          const glassGeometry = new THREE.PlaneGeometry(glassSize.x, glassSize.y);
          const glassMaterial = await loadMaterial('glass', config.glass);
          const glass = new THREE.Mesh(glassGeometry, glassMaterial);
          glass.position.copy(glassPosition);
          doorGroup.add(glass);
        }

        // Add hardware
        const { handle, lock, hinges } = calculateHardwarePositions(size);
        
        const doorHandle = await createDoorHandle(config.hardware);
        doorHandle.position.copy(handle);
        doorGroup.add(doorHandle);

        const lockSet = await createLockSet(config.hardware);
        lockSet.position.copy(lock);
        doorGroup.add(lockSet);

        const hingeSet = await createHinges(3);
        hingeSet.position.setX(-size.x / 2);
        doorGroup.add(hingeSet);

        // Position door
        doorGroup.position.copy(center);

        // Add to scene
        sceneRef.current.add(doorGroup);

        // Set up animations
        if (mixerRef.current) {
          mixerRef.current.stopAllAction();
        }
        mixerRef.current = new THREE.AnimationMixer(doorGroup);
        
        const doorAnimations = createDoorAnimations(door);
        animationsRef.current = {};
        doorAnimations.forEach(clip => {
          const action = mixerRef.current!.clipAction(clip);
          animationsRef.current[clip.name] = action;
        });

        // Fit camera to door
        if (cameraRef.current && controlsRef.current) {
          fitCameraToObject(cameraRef.current, doorGroup, 1.5, controlsRef.current);
        }

        setIsLoading(false);
      } catch (error) {
        console.error('Error updating door model:', error);
        setIsLoading(false);
      }
    };

    updateDoor();
  }, [config]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;

      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      cameraRef.current.aspect = width / height;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Handle screenshot
  const handleScreenshot = () => {
    if (!rendererRef.current || !sceneRef.current || !cameraRef.current) return;
    const dataUrl = createScreenshot(
      rendererRef.current,
      sceneRef.current,
      cameraRef.current
    );
    onScreenshot?.(dataUrl);
  };

  // Handle door animation
  const handleDoorAnimation = () => {
    if (!animationsRef.current.openClose) return;
    animationsRef.current.openClose.setLoop(THREE.LoopOnce, 1);
    animationsRef.current.openClose.clampWhenFinished = true;
    animationsRef.current.openClose.play();
  };

  return (
    <div
      ref={containerRef}
      className="w-full h-full bg-slate-900/50 rounded-lg relative"
      style={{ minHeight: '400px' }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-slate-300">Loading model...</p>
          </div>
        </div>
      )}
    </div>
  );
}