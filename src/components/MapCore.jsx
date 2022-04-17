import * as React from 'react';
import { useFrame } from '@react-three/fiber';
import { DoubleSide } from 'three';
import { useMapTexture } from './useMapTexture';
import { EnvMap } from './MapHelpers';

const MapContainer = (MAX_HEIGHT) => {
    const container = React.useRef();

    const { dirtTexture } = useMapTexture(); 

    useFrame(() => {
        if (!container || !container.current) {
          return;
        }
        // container.current.rotation.x += x; 
        // container.current.rotation.y += y;
        // container.current.rotation.z += z;
      });

    return (
        <mesh
            position={[0, 10 * 0.125, 0]}
            receiveShadow={true}
            ref={container}
            rotation={[-Math.PI * 0.333 * 0.5]}
        >
            <cylinderBufferGeometry 
                attach="geometry"
                position={[17.1, 17.1, MAX_HEIGHT * 0.25, 50, 1, true]}
            />
            <meshPhysicalMaterial 
                attach="material" 
                map={dirtTexture}
                envMap={EnvMap}
                envMapIntensity={0.2} 
                side={DoubleSide} 
            />
        </mesh>
    )
}

const MapFloor = (MAX_HEIGHT) => {
    const { dirt2Texture } = useMapTexture(); 
    const myref = React.useRef();

    useFrame(() => (myref.current.rotation.x = myref.current.rotation.y += 0.01));

    return (
        <mesh 
            position={[0, -MAX_HEIGHT * 0.05, 0]}
            receiveShadow={true}
            ref={myref}
        >
            <cylinderBufferGeometry 
                position={[18.5, 18.5, MAX_HEIGHT * 0.1, 50]} 
                attach="geometry" 
            />
            <meshPhysicalMaterial
                attach="material"
                envMap={EnvMap}
                envMapIntensity={0.1}
                map={dirt2Texture}
                side={DoubleSide}
            />
        </mesh>
    )
}
  
export {
    MapContainer,
    MapFloor
}