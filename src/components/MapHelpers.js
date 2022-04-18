import { useLoader, useThree } from '@react-three/fiber';
import { CylinderBufferGeometry, Vector2 } from 'three';
import { PMREMGenerator } from 'three/src/extras/PMREMGenerator';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import HDR from '../assets/envmap.hdr';

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

export {
    EnvMap,
    hexGeometry,
    tileToPosition
}