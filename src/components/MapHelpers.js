import { useLoader, useThree } from '@react-three/fiber';
import { BoxGeometry, CylinderBufferGeometry, Vector2 } from 'three';
import { PMREMGenerator } from 'three/src/extras/PMREMGenerator';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import { mergeBufferGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import HDR from '../assets/envmap.hdr';
import { tree } from './Tree';
import { stone } from './Stone';

const STONE_HEIGHT = 10 * 0.8;
const DIRT_HEIGHT = 10 * 0.7;
const GRASS_HEIGHT = 10 * 0.5;
const SAND_HEIGHT = 10 * 0.3;
const DIRT2_HEIGHT = 10 * 0;

const EnvMap = () => {
    const { gl } = useThree();

    let pmrem = new PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();

    let map;

    const envTexture = useLoader(RGBELoader, HDR);

    let rt = pmrem.fromEquirectangular(envTexture);
    map = rt.texture;

    return map;
}

function hexGeometry(height, position) {
    let geo = new CylinderBufferGeometry(1, 1, height, 6, 1, false)
    geo.translate(position.x, height * 0.5, position.y);
    return geo;
}

function tileToPosition(tileX, tileY) {
    return new Vector2((tileX + (tileY % 2) * 0.5) * 1.77, tileY * 1.535);
}

let stoneGeo = new BoxGeometry(0,0,0);
let dirtGeo = new BoxGeometry(0,0,0);
let dirt2Geo = new BoxGeometry(0,0,0);
let sandGeo = new BoxGeometry(0,0,0);
let grassGeo = new BoxGeometry(0,0,0);

function hex(height, position) {
    let geo = hexGeometry(height, position);

    if(height > STONE_HEIGHT) {
        stoneGeo = mergeBufferGeometries([geo, stoneGeo]);
        Math.random() > 0.8 && (stoneGeo = mergeBufferGeometries([stoneGeo, stone(height, position)]))
    } else if(height > DIRT_HEIGHT) {
        dirtGeo = mergeBufferGeometries([geo, dirtGeo]);
        Math.random() > 0.8 && (grassGeo = mergeBufferGeometries([grassGeo, tree(height, position)]))
    } else if(height > GRASS_HEIGHT) {
        grassGeo = mergeBufferGeometries([geo, grassGeo]);
    } else if(height > SAND_HEIGHT) { 
        sandGeo = mergeBufferGeometries([geo, sandGeo]);
        Math.random() > 0.8 && (stoneGeo = mergeBufferGeometries([stoneGeo, stone(height, position)]))
    } else if(height > DIRT2_HEIGHT) {
        dirt2Geo = mergeBufferGeometries([geo, dirt2Geo]);
    }
}

export {
    dirtGeo,
    dirt2Geo,
    EnvMap,
    grassGeo,
    hex,
    hexGeometry,
    sandGeo,
    stoneGeo,
    tileToPosition
}