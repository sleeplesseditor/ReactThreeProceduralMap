import { useLoader, useThree } from '@react-three/fiber';
import { PMREMGenerator } from 'three/src/extras/PMREMGenerator';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader';
import HDR from '../assets/envmap.hdr';

export const EnvMap = () => {
    const { gl } = useThree();

    let pmrem = new PMREMGenerator(gl);
    pmrem.compileEquirectangularShader();

    let map;

    const envTexture = useLoader(RGBELoader, HDR);

    let rt = pmrem.fromEquirectangular(envTexture);
    map = rt.texture;

    return map;
}