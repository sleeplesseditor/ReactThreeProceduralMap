import * as React from 'react';
import Controls from './Controls';
import { Canvas } from '@react-three/fiber';
import { MapContainer, MapFloor } from './MapCore';
import { SeaMesh } from './SeaMesh';

const Map = ({}, ref) => {
    const controlsRef = React.useRef();
    React.useImperativeHandle(ref, () => ({
      resetCamera: () => {
        return controlsRef.current.resetCamera();
      },
    }));

    return (
        <Canvas camera={{ position: [-17,31,33], far: 15000 }}>
            <Controls ref={controlsRef} />
                <color attach="background" args={["#FFEECC"]} />
                <ambientLight color="#FFEECC" intensity={0.1} />
                <directionalLight color="#FFEECC" position={[10, 20, 10]} />
                <SeaMesh />
                <MapFloor />
                <MapContainer />
        </Canvas>
    )
}

export default React.forwardRef(Map);