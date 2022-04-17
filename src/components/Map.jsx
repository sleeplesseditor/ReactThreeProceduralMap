import * as React from 'react';
import { Canvas } from '@react-three/fiber';

const Map = ({mapRef}) => {
    const controlsRef = React.useRef();
    React.useImperativeHandle(mapRef, () => ({
      resetCamera: () => {
        return controlsRef?.current.resetCamera();
      },
    }));

    return (
        <Canvas camera={{ position: [0, 0, 80], far: 15000 }}>

        </Canvas>
    )
}

export default React.forwardRef(Map);