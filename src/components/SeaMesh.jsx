// let seaTexture = textures.water;
// seaTexture.repeat = new Vector2(1, 1);
// seaTexture.wrapS = RepeatWrapping;
// seaTexture.wrapT = RepeatWrapping;

// let seaMesh = new Mesh(
//   new CylinderGeometry(17, 17, MAX_HEIGHT * 0.2, 50),
//   new MeshPhysicalMaterial({
//     envMap: envmap,
//     color: new Color("#55aaff").convertSRGBToLinear().multiplyScalar(3),
//     ior: 1.4,
//     transmission: 1,
//     transparent: true,
//     thickness: 1.5,
//     envMapIntensity: 0.2, 
//     roughness: 1,
//     metalness: 0.025,
//     roughnessMap: seaTexture,
//     metalnessMap: seaTexture,
//   })
// );
// seaMesh.receiveShadow = true;
// seaMesh.rotation.y = -Math.PI * 0.333 * 0.5;
// seaMesh.position.set(0, MAX_HEIGHT * 0.1, 0);
// scene.add(seaMesh);

import * as React from 'react';
import Water from "../assets/water.jpg";
import { useLoader } from '@react-three/fiber';
import { Color, TextureLoader, Vector2, RepeatWrapping } from 'three';
import { EnvMap } from './MapHelpers';

const SeaMesh = () => {
    let seaTexture = useLoader(TextureLoader, Water);
    seaTexture.repeat = new Vector2(1, 1);
    seaTexture.wrapS = RepeatWrapping;
    seaTexture.wrapT = RepeatWrapping;

    return (
        <mesh
            position={[0, 10 * 0.1, 0]}
            receiveShadow={true}
        >
            <cylinderBufferGeometry 
                attach="geometry"
                args={[17, 17, 10 * 0.2, 50]}
            />
            <meshPhysicalMaterial
                color={new Color("#55aaff").convertSRGBToLinear().multiplyScalar(3)}
                envMap={EnvMap}
                ior={1.4}
                transmission={1}
                transparent={true}
                thickness={1.5}
                envMapIntensity={0.2} 
                roughness={1}
                metalness={0.025}
                roughnessMap={seaTexture}
                metalnessMap={seaTexture}
            />
        </mesh>
    )
}

export {
    SeaMesh
}