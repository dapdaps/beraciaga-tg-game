import { CLOTHES_MAPPING } from './clothes';
import { FACES_MAPPING } from './face';
import { VEHICLE_MAPPING } from './vehicle';
import { BACKGROUNDS_MAPPING } from './backgrounds';
import { SKINS_MAPPING } from './skins';
import { HAT_MAPPING } from './hats';
import { NECKLACES_MAPPING } from './necklaces';

export {
    CLOTHES_MAPPING,
    FACES_MAPPING,
    VEHICLE_MAPPING,
    BACKGROUNDS_MAPPING,
    SKINS_MAPPING,
    HAT_MAPPING,
    NECKLACES_MAPPING,
}

export type Category = 'face' | 'skin' | 'clothes' | 'hat' | 'necklace' | 'vehicle' | 'decoration' | 'glasses' | 'background';

/* 
*  Clothes level = y 有个隐藏条件 当且仅当 x < 8 时，衣服渲染为站立衣服，否则渲染为坐着衣服。
* 
*  Car w = x
*  0 <= x < 4 赤脚
*  4 <= x < 6 滑板
*  6 <= x < 8 自行车
*  8 <= x < 10 电动车
*  10 <= x < 12 摩托车
*  12 <= x 汽车
*/

export const LimitMinCarLevel = 8