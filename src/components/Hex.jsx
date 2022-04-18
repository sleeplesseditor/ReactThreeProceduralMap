import * as React from 'react';
import { TextureLoader } from 'three';
import { useLoader } from '@react-three/fiber';
import { EnvMap } from './MapHelpers';

const Hex = (geo) => {
    return (
        <mesh
            geometry={geo.geo}
            castShadow={true}
            receiveShadow={true}
        >
            <meshPhysicalMaterial
                attach="material"
                envMap={EnvMap}
                envMapIntensity={0.135}
                flatShading={true}
                map={useLoader(TextureLoader, geo.texture)}
            />
        </mesh>
    )
}

export {
    Hex
}