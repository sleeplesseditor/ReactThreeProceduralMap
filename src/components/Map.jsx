import * as React from 'react';
import { Controls } from './Controls';
import { Canvas } from '@react-three/fiber';
import { MapContainer, MapFloor } from './MapCore';
import { Clouds } from './Clouds';
import { SeaMesh } from './SeaMesh';
import { Hex } from './Hex';
import SimplexNoise from 'simplex-noise';
import { dirtGeo, dirt2Geo, EnvMap, grassGeo, hex, sandGeo, stoneGeo, tileToPosition } from './MapHelpers';
import Dirt from "../assets/dirt.png";
import Dirt2 from "../assets/dirt2.jpg";
import Grass from '../assets/grass.jpg';
import Sand from '../assets/sand.jpg';
import Stone from '../assets/stone.png';

const simplex = new SimplexNoise();

const Map = ({}, ref) => {
    for(let i = -20; i <= 20; i++) {
        for(let j = -20; j <= 20; j++) {
            let position = tileToPosition(i, j);
        
            if(position.length() > 16) continue;
            
            let noise = (simplex.noise2D(i * 0.1, j * 0.1) + 1) * 0.5;
            noise = Math.pow(noise, 1.5);
        
            hex(noise * 10, position, EnvMap);
        }
    }

    let geoOptions = [
        {
            geoType: stoneGeo,
            colour: Stone
        },
            {
            geoType: dirtGeo,
            colour: Dirt
        },
        {
            geoType: dirt2Geo,
            colour: Dirt2
        },
        {
            geoType: sandGeo,
            colour: Sand
        },
        {
            geoType: grassGeo,
            colour: Grass
        }
    ];

    return (
        <Canvas camera={{ fov: 75, near: 10.9, far: 1000, position: [-17, 23, 10] }}>
            <Controls />
            <color attach="background" args={["#FFEECC"]} />
            <directionalLight color="#FFEECC" position={[10, 20, 10]} />
            <Clouds />
            {geoOptions.map(({geoType, colour}) => (
                <Hex geo={geoType} texture={colour} />
            ))}
            <SeaMesh />
            <MapFloor />
            <MapContainer />
        </Canvas>
    )
}

export default React.forwardRef(Map);