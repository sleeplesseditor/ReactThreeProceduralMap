import { BoxBufferGeometry, CylinderBufferGeometry } from 'three';

function hexGeometry(height, position) {
    let geo = <cylinderBufferGeometry attach="geometry" args={[1, 1, height, 6, 1, false]} />
    geo.translate(position.x, height * 0.5, position.y);

    return geo;
}

const STONE_HEIGHT = MAX_HEIGHT * 0.8;
const DIRT_HEIGHT = MAX_HEIGHT * 0.7;
const GRASS_HEIGHT = MAX_HEIGHT * 0.5;
const SAND_HEIGHT = MAX_HEIGHT * 0.3;
const DIRT2_HEIGHT = MAX_HEIGHT * 0;

let stoneGeo = <boxBufferGeometry attach="geometry" args={[0, 0, 0]} />;
let dirtGeo = <boxBufferGeometry attach="geometry" args={[0, 0, 0]} />;
let dirt2Geo = <boxBufferGeometry attach="geometry" args={[0, 0, 0]} />;
let sandGeo = <boxBufferGeometry attach="geometry" args={[0, 0, 0]} />;
let grassGeo = <boxBufferGeometry attach="geometry" args={[0, 0, 0]} />;
  