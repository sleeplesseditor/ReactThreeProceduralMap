import { useLoader } from '@react-three/fiber';
import { TextureLoader, sRGBEncoding } from 'three';

import Dirt from "../assets/dirt.png";
import Dirt2 from "../assets/dirt2.jpg";
import Grass from "../assets/grass.jpg";
import Sand from "../assets/sand.jpg";
import Water from "../assets/water.jpg";
import Stone from "../assets/stone.png";

export const useMapTexture = () => {
    const textures = {
        dirtTexture: useLoader(TextureLoader, Dirt),
        dirt2Texture: useLoader(TextureLoader, Dirt2),
        grassTexture: useLoader(TextureLoader, Grass),
        sandTexture: useLoader(TextureLoader, Sand),
        waterTexture: useLoader(TextureLoader, Water),
        stoneTexture: useLoader(TextureLoader, Stone),
    };
    Object.values(textures).forEach(texture => {
        texture.encoding = sRGBEncoding;
        texture.anisotropy = 16;
    });
    return textures;
};