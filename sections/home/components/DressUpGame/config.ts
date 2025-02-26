import IconCarLevel1 from "@public/svg/dressup/cars/1.svg";
import IconCarLevel2 from "@public/svg/dressup/cars/2.svg";
import IconCarLevel3 from "@public/svg/dressup/cars/3.svg";
import IconCarLevel4 from "@public/svg/dressup/cars/4.svg";
import IconCarLevel5 from "@public/svg/dressup/cars/5.svg";


import BearFace1 from '@public/svg/dressup/bears/face/1.svg';
import BearFace2 from '@public/svg/dressup/bears/face/2.svg';
import BearFace3 from '@public/svg/dressup/bears/face/3.svg';
import BearFace4 from '@public/svg/dressup/bears/face/4.svg';
import BearFace5 from '@public/svg/dressup/bears/face/5.svg';
import BearFace6 from '@public/svg/dressup/bears/face/6.svg';
import BearFace7 from '@public/svg/dressup/bears/face/7.svg';
import BearFace8 from '@public/svg/dressup/bears/face/8.svg';
import BearFace9 from '@public/svg/dressup/bears/face/9.svg';
import BearFace10 from '@public/svg/dressup/bears/face/10.svg';
import BearFace11 from '@public/svg/dressup/bears/face/11.svg';
import BearFace12 from '@public/svg/dressup/bears/face/12.svg';
import BearFace13 from '@public/svg/dressup/bears/face/13.svg';
import BearFace14 from '@public/svg/dressup/bears/face/14.svg';
import BearFace15 from '@public/svg/dressup/bears/face/15.svg';
import BearFace16 from '@public/svg/dressup/bears/face/16.svg';

import IconHatLevel1 from "@public/svg/dressup/hats/1.svg";
import IconHatLevel2 from "@public/svg/dressup/hats/2.svg";
import IconHatLevel3 from "@public/svg/dressup/hats/3.svg";
import IconHatLevel4 from "@public/svg/dressup/hats/4.svg";
import IconHatLevel5 from "@public/svg/dressup/hats/5.svg";


import IconJacketLevel1Sit from "@public/svg/dressup/jackets/1-sit.svg";
import IconJacketLevel1Stand from "@public/svg/dressup/jackets/1-stand.svg";
import IconJacketLevel2Sit from "@public/svg/dressup/jackets/2-sit.svg";
import IconJacketLevel2Stand from "@public/svg/dressup/jackets/2-stand.svg";
import IconJacketLevel3Sit from "@public/svg/dressup/jackets/3-sit.svg";
import IconJacketLevel3Stand from "@public/svg/dressup/jackets/3-stand.svg";
import IconJacketLevel4Sit from "@public/svg/dressup/jackets/4-sit.svg";
import IconJacketLevel4Stand from "@public/svg/dressup/jackets/4-stand.svg";
import IconJacketLevel5Sit from "@public/svg/dressup/jackets/5-sit.svg";
import IconJacketLevel5Stand from "@public/svg/dressup/jackets/5-stand.svg";



export const TRANSPORTATION_MAPPING = {
  1: IconCarLevel1, // Skateboard
  2: IconCarLevel2, // Bicycle
  3: IconCarLevel3, // E-Bike
  4: IconCarLevel4, // Motorcycle
  5: IconCarLevel5, // Car
} as const;

export const BEAR_FACES = {
    1: BearFace1,
    2: BearFace2,
    3: BearFace3,
    4: BearFace4,
    5: BearFace5,
    6: BearFace6,
    7: BearFace7,
    8: BearFace8,
    9: BearFace9,
    10: BearFace10,
    11: BearFace11,
    12: BearFace12,
    13: BearFace13,
    14: BearFace14,
    15: BearFace15,
    16: BearFace16
  } as const;

export const HAT_MAPPING = {
    1: IconHatLevel1,
    2: IconHatLevel2,
    3: IconHatLevel3,
    4: IconHatLevel4,
    5: IconHatLevel5
  } as const;

export const JACKETS_MAPPING = {
  sit: {
    1: IconJacketLevel1Sit,
    2: IconJacketLevel2Sit,
    3: IconJacketLevel3Sit,
    4: IconJacketLevel4Sit,
    5: IconJacketLevel5Sit
  },
  stand: {
    1: IconJacketLevel1Stand,
    2: IconJacketLevel2Stand,
    3: IconJacketLevel3Stand,
    4: IconJacketLevel4Stand,
    5: IconJacketLevel5Stand
  }
} as const;


  export interface BearColors {
    primary?: string;  // 身体
    tertiary?: string;  // 耳朵
    secondary?: string;  // 脸部
    eyebrow?: string;  // 眉毛
  }
  
  export interface BearProps {
    colors?: BearColors;
    level?: number;
    face?: number;
	showBody?: boolean;
	className?: string;
  }
  
  export const DEFAULT_COLORS = {
    primary: '#E49F63',
    secondary: '#FED2AB',
    tertiary: '#FABEBE',
    eyebrow: '#FED2AB'
  } as const;



export const bearColors: any = {
	1: {
		primary: '#E49F63', 
		tertiary: '#FABEBE',
		secondary: '#FED2AB',
		eyebrow: '#FED2AB'
	},
	2: {
		primary: '#C263E4', 
		tertiary: '#FABEBE',
		secondary: '#FABEBE',
		eyebrow: '#DFA6F4'
	},
	3: {
		primary: '#FFE683', 
		tertiary: '#FF9461',
		secondary: '#FF9461',
		eyebrow: '#D6B83E'
	},
	4: {
		primary: '#50C878', 
		tertiary: '#FFFF89',
		secondary: '#FFFF89',
		eyebrow: '#B2EEC6'
	},
	5: {
		primary: '#F2A1A8', 
		tertiary: '#CD6870',
		secondary: '#CD6870',
		eyebrow: '#FDC9CE'
	},
	6: {
		primary: '#777777', 
		tertiary: '#F66C19',
		secondary: '#F9732A',
		eyebrow: '#A5A5B0'
	},
	7: {
		primary: '#788AFD', 
		tertiary: '#FFFFFF',
		secondary: '#FFFFFF',
		eyebrow: '#B2BDFF'
	},
	8: {
		primary: '#944546', 
		tertiary: '#FFC97C',
		secondary: '#FFC97C',
		eyebrow: '#D27678'
	},
	9: {
		primary: '#ADD5D2', 
		tertiary: '#F2E7B5',
		secondary: '#F2E7B5',
		eyebrow: '#D9ECEA'
	},
	10: {
		primary: '#F7EBDA', 
		tertiary: '#ED9D57',
		secondary: '#ED9D58',
		eyebrow: '#E3C59A'
	},
	11: {
		primary: '#DBCCBF', 
		tertiary: '#F09192',
		secondary: '#F09193',
		eyebrow: '#F9E4D2'
	},
	12: {
		primary: '#B78662', 
		tertiary: '#F0C791',
		secondary: '#F0C791',
		eyebrow: '#ECC09F'
	}
}