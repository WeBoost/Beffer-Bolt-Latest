import { Color, TextureLoader, RepeatWrapping, MeshStandardMaterial } from 'three';

const textureLoader = new TextureLoader();

// Material definitions with textures and properties
export const doorMaterials = {
  steel: {
    standard: {
      name: 'Standard Steel',
      color: new Color(0x7A7A7A),
      textures: {
        map: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/metal/steel_diffuse.jpg',
        normalMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/metal/steel_normal.jpg',
        roughnessMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/metal/steel_roughness.jpg'
      },
      properties: {
        roughness: 0.4,
        metalness: 0.8
      }
    },
    marineGrade: {
      name: 'Marine Grade Steel',
      color: new Color(0x8A8A8A),
      textures: {
        map: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/metal/marine_steel_diffuse.jpg',
        normalMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/metal/marine_steel_normal.jpg',
        roughnessMap: 'https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/metal/marine_steel_roughness.jpg'
      },
      properties: {
        roughness: 0.3,
        metalness: 0.9
      }
    }
  },
  // Other materials marked as coming soon
  wood: {
    comingSoon: true,
    name: 'Wood Doors',
    description: 'Premium wooden doors coming soon'
  },
  aluminum: {
    comingSoon: true,
    name: 'Aluminum Doors',
    description: 'Lightweight aluminum doors coming soon'
  },
  composite: {
    comingSoon: true,
    name: 'Composite Doors',
    description: 'Advanced composite doors coming soon'
  }
};

// Helper function to load material with textures
export const loadMaterial = async (materialType: string, variant: string): Promise<MeshStandardMaterial> => {
  const materialDef = doorMaterials[materialType]?.[variant];
  if (!materialDef || materialDef.comingSoon) {
    throw new Error(`Material not available: ${materialType}/${variant}`);
  }

  const material = new MeshStandardMaterial({
    color: materialDef.color,
    ...materialDef.properties
  });

  if (materialDef.textures) {
    const loadTexture = (url: string) => {
      return new Promise((resolve) => {
        textureLoader.load(url, (texture) => {
          texture.wrapS = RepeatWrapping;
          texture.wrapT = RepeatWrapping;
          texture.repeat.set(2, 2);
          resolve(texture);
        });
      });
    };

    if (materialDef.textures.map) {
      material.map = await loadTexture(materialDef.textures.map) as THREE.Texture;
    }
    if (materialDef.textures.normalMap) {
      material.normalMap = await loadTexture(materialDef.textures.normalMap) as THREE.Texture;
    }
    if (materialDef.textures.roughnessMap) {
      material.roughnessMap = await loadTexture(materialDef.textures.roughnessMap) as THREE.Texture;
    }
  }

  return material;
};