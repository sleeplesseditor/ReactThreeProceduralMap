import * as React from 'react';
import { DoubleSide } from 'three';
import { EnvMap } from './MapHelpers';

import { useLoader } from '@react-three/fiber';
import { TextureLoader } from 'three';
import Dirt from "../assets/dirt.png";
import Dirt2 from "../assets/dirt2.jpg";

const MapContainer = () => {
    const container = React.useRef();

    return (
        <mesh
            position={[0, 10 * 0.125, 0]}
            receiveShadow={true}
            ref={container}
            rotateY={[-Math.PI * 0.333 * 0.5]}
        >
            <cylinderBufferGeometry 
                attach="geometry"
                args={[17.1, 17.1, 10 * 0.25, 50, 1, true]}
            />
            <meshPhysicalMaterial 
                attach="material" 
                map={useLoader(TextureLoader, Dirt)}
                envMap={EnvMap}
                envMapIntensity={0.2} 
                side={DoubleSide} 
            />
        </mesh>
    )
}

const MapFloor = () => {
    const myref = React.useRef();

    return (
        <mesh 
            position={[0, -10 * 0.05, 0]}
            receiveShadow={true}
            ref={myref}
        >
            <cylinderBufferGeometry 
                args={[18.5, 18.5, 10 * 0.1, 50]} 
                attach="geometry" 
            />
            <meshPhysicalMaterial
                attach="material"
                envMap={EnvMap}
                envMapIntensity={0.1}
                map={useLoader(TextureLoader, Dirt2)}
                side={DoubleSide}
            />
        </mesh>
    )
}
  
export {
    MapContainer,
    MapFloor
}