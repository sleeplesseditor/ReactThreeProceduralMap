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
            rotateY={-Math.PI * 0.333 * 0.5}
        >
            <cylinderBufferGeometry 
                attach="geometry"
                args={[17, 17, 10 * 0.2, 50]}
            />
            <meshPhysicalMaterial
                color={new Color("#55aaff").convertSRGBToLinear().multiplyScalar(10)}
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