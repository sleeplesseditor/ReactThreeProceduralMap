import * as React from 'react';
import { Controls } from './Controls';
import { Canvas } from '@react-three/fiber';
import { BoxGeometry } from 'three';
import { MapContainer, MapFloor } from './MapCore';
import { Clouds } from './Clouds';
import { SeaMesh } from './SeaMesh';
import { Hex } from './Hex';
import SimplexNoise from 'simplex-noise';
import { EnvMap, hexGeometry, tileToPosition } from './MapHelpers';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';

import { tree } from './Tree';
import { stone } from './Stone';
import Dirt from "../assets/dirt.png";
import Dirt2 from "../assets/dirt2.jpg";
import Grass from '../assets/grass.jpg';
import Sand from '../assets/sand.jpg';
import Stone from '../assets/stone.png';

const STONE_HEIGHT = 10 * 0.8;
const DIRT_HEIGHT = 10 * 0.7;
const GRASS_HEIGHT = 10 * 0.5;
const SAND_HEIGHT = 10 * 0.3;
const DIRT2_HEIGHT = 10 * 0;

const simplex = new SimplexNoise()

let stoneGeo = new BoxGeometry(0,0,0);
let dirtGeo = new BoxGeometry(0,0,0);
let dirt2Geo = new BoxGeometry(0,0,0);
let sandGeo = new BoxGeometry(0,0,0);
let grassGeo = new BoxGeometry(0,0,0);

function hex(height, position) {
    let geo = hexGeometry(height, position);
  
    if(height > STONE_HEIGHT) {
      stoneGeo = mergeBufferGeometries([geo, stoneGeo]);
  
      if(Math.random() > 0.8) {
        stoneGeo = mergeBufferGeometries([stoneGeo, stone(height, position)]);
      }
    } else if(height > DIRT_HEIGHT) {
      dirtGeo = mergeBufferGeometries([geo, dirtGeo]);
  
      if(Math.random() > 0.8) {
        grassGeo = mergeBufferGeometries([grassGeo, tree(height, position)]);
      }
    } else if(height > GRASS_HEIGHT) {
      grassGeo = mergeBufferGeometries([geo, grassGeo]);
    } else if(height > SAND_HEIGHT) { 
      sandGeo = mergeBufferGeometries([geo, sandGeo]);
  
      if(Math.random() > 0.8 && stoneGeo) {
        stoneGeo = mergeBufferGeometries([stoneGeo, stone(height, position)]);
      }
    } else if(height > DIRT2_HEIGHT) {
      dirt2Geo = mergeBufferGeometries([geo, dirt2Geo]);
    } 
  }

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

    return (
        <Canvas camera={{ fov: 75, near: 10.9, far: 1000, position: [-17, 23, 10] }}>
            <Controls />
                <color attach="background" args={["#FFEECC"]} />
                <directionalLight color="#FFEECC" position={[10, 20, 10]} />
                <Clouds />
                <Hex geo={stoneGeo} texture={Stone} />
                <Hex geo={grassGeo} texture={Grass} />
                <Hex geo={dirt2Geo} texture={Dirt2} />
                <Hex geo={dirtGeo} texture={Dirt} />
                <Hex geo={sandGeo} texture={Sand} />
                <SeaMesh />
                <MapFloor />
                <MapContainer />
        </Canvas>
    )
}

export default React.forwardRef(Map);