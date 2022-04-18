import * as React from 'react';
import { SphereBufferGeometry } from 'three';
import { EnvMap } from './MapHelpers';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { SphereGeometry } from 'three';

export const Clouds = () => {
    let geo = new SphereBufferGeometry(0 , 0, 0); 
    let count = Math.floor(Math.pow(Math.random(), 0.45) * 4);

    for(let i = 0; i < count; i++) {
        const puff1 = new SphereGeometry(1.2, 7, 7);
        puff1.translate(-1.85, Math.random() * 0.3, 0)
        const puff2 = new SphereGeometry(1.6, 7, 7);
        puff2.translate(0, Math.random() * 0.3, 0)
        const puff3 = new SphereGeometry(0.9, 7, 7);
        puff3.translate(1.85, Math.random() * 0.3, 0)

        const cloudGeo = mergeBufferGeometries([puff1, puff2, puff3]);
        cloudGeo.translate( 
            Math.random() * 20 - 10, 
            Math.random() * 7 + 7, 
            Math.random() * 20 - 10
        );
        cloudGeo.rotateY(Math.random() * Math.PI * 2);

        geo = mergeBufferGeometries([geo, cloudGeo])
    }

    const mesh = (
        <mesh
            geometry={geo}
            receiveShadow={true}
        >
            <meshStandardMaterial
                attach="material"
                envMap={EnvMap}
                envMapIntensity={0.75}
                flatShading={true}
            />
        </mesh>
    )
  
    return mesh;
  }