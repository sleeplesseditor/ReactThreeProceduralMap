import * as React from 'react';
import { Canvas } from '@react-three/fiber';
import { MapContainer, MapFloor } from './MapCore';

const MAX_HEIGHT = 10;

const Map = () => {
   
    return (
        <Canvas camera={{ position: [-17,31,33], far: 15000 }}>
            {/* <Controls ref={controlsRef} /> */}
                <ambientLight color="#FFEECC" intensity={0.1} />
                <MapFloor MAX_HEIGHT={MAX_HEIGHT} />
                <MapContainer MAX_HEIGHT={MAX_HEIGHT} />
        </Canvas>
    )
}

export default Map;