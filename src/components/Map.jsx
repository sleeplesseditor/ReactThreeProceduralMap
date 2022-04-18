import * as React from 'react';
import { Controls } from './Controls';
import { Canvas } from '@react-three/fiber';
import { MapContainer, MapFloor } from './MapCore';
import { Clouds } from './Clouds';
import { SeaMesh } from './SeaMesh';

const Map = ({}, ref) => {
    return (
        <Canvas camera={{ position: [-17,31,33], far: 15000 }}>
            <Controls />
                <color attach="background" args={["#FFEECC"]} />
                <ambientLight color="#FFEECC" intensity={0.1} />
                <directionalLight color="#FFEECC" position={[10, 20, 10]} />
                <Clouds />
                <SeaMesh />
                <MapFloor />
                <MapContainer />
        </Canvas>
    )
}

export default React.forwardRef(Map);