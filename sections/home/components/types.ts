// seconds
export const SwitchSceneDuration = 3;

export interface SceneItem {
  name: string;
  path: string;
  height?: {
    top?: string | number;
    mid?: string | number;
    botBg?: string | number;
    bot?: string | number;
    backgroundSize?: string | number;
  };
  y?: {
    top?: string | number;
    mid?: string | number;
    botBg?: string | number;
    bot?: string | number;
  };
  fileType?: {
    top?: string;
    topBg?: string;
    mid?: string;
    botBg?: string;
    bot?: string;
  };
}

export type Scenes =
  'Desert' |
  'Outdoors' |
  'Seaside' |
  'Halloween' |
  'City' |
  'Residence' |
  'Night' |
  'Park' |
  'Figure01' |
  'Figure02' |
  'Figure03' |
  'Figure04' |
  'Figure05' |
  'Figure06' |
  'Figure07' |
  'Figure08' |
  'SolidColor01' |
  'SolidColor02' |
  'SolidColor03' |
  'SolidColor04' |
  'SolidColor05' |
  'SolidColor06' |
  'SolidColor07' |
  'SolidColor08';

export const SceneList: Record<Scenes, SceneItem> = {
  Figure01: {
    name: 'figure01',
    path: 'figure01',
    height: {
      top: '90vh',
      mid: 0,
      botBg: 0,
      bot: '40vh',
    },
    fileType: {
      top: 'png',
      bot: 'png',
    },
  },
  Figure02: {
    name: 'figure02',
    path: 'figure02',
    height: {
      top: '60vh',
      mid: 0,
      botBg: 0,
      bot: '40vh',
    },
    fileType: {
      top: 'png',
      bot: 'png',
    },
  },
  Figure03: {
    name: 'figure03',
    path: 'figure03',
    height: {
      top: '60vh',
      mid: 0,
      botBg: 0,
      bot: '40vh',
    },
    fileType: {
      top: 'png',
      bot: 'png',
    },
  },
  Figure04: {
    name: 'figure04',
    path: 'figure04',
    height: {
      top: '60vh',
      mid: 0,
      botBg: 0,
      bot: '40vh',
    },
    fileType: {
      top: 'png',
      bot: 'png',
    },
  },
  Figure05: {
    name: 'figure05',
    path: 'figure05',
    height: {
      top: '60vh',
      mid: 0,
      botBg: 0,
      bot: '40vh',
    },
    fileType: {
      top: 'png',
      bot: 'png',
    },
  },
  Figure06: {
    name: 'figure06',
    path: 'figure06',
    height: {
      top: '60vh',
      mid: 0,
      botBg: 0,
      bot: '40vh',
    },
    fileType: {
      top: 'png',
      bot: 'png',
    },
  },
  Figure07: {
    name: 'figure07',
    path: 'figure07',
    height: {
      top: '60vh',
      mid: 0,
      botBg: 0,
      bot: '40vh',
    },
    fileType: {
      top: 'png',
      bot: 'png',
    },
  },
  Figure08: {
    name: 'figure08',
    path: 'figure08',
    height: {
      top: '60vh',
      mid: 0,
      botBg: 0,
      bot: '40vh',
    },
    fileType: {
      top: 'png',
      bot: 'png',
    },
  },
  SolidColor01: {
    name: 'solidColor01',
    path: 'solid-color01',
    height: {
      top: '100vh',
      mid: 0,
      botBg: 0,
      bot: 0,
    },
  },
  SolidColor02: {
    name: 'solidColor02',
    path: 'solid-color02',
    height: {
      top: '100vh',
      mid: 0,
      botBg: 0,
      bot: 0,
    },
  },
  SolidColor03: {
    name: 'solidColor03',
    path: 'solid-color03',
    height: {
      top: '100vh',
      mid: 0,
      botBg: 0,
      bot: 0,
    },
  },
  SolidColor04: {
    name: 'solidColor04',
    path: 'solid-color04',
    height: {
      top: '100vh',
      mid: 0,
      botBg: 0,
      bot: 0,
    },
  },
  SolidColor05: {
    name: 'solidColor05',
    path: 'solid-color05',
    height: {
      top: '100vh',
      mid: 0,
      botBg: 0,
      bot: 0,
    },
  },
  SolidColor06: {
    name: 'solidColor06',
    path: 'solid-color06',
    height: {
      top: '100vh',
      mid: 0,
      botBg: 0,
      bot: 0,
    },
  },
  SolidColor07: {
    name: 'solidColor07',
    path: 'solid-color07',
    height: {
      top: '100vh',
      mid: 0,
      botBg: 0,
      bot: 0,
    },
  },
  SolidColor08: {
    name: 'solidColor08',
    path: 'solid-color08',
    height: {
      top: '100vh',
      mid: 0,
      botBg: 0,
      bot: 0,
    },
  },
  Desert: {
    name: 'desert',
    path: 'desert',
    height: {
      botBg: 250,
      bot: 120,
    },
  },
  Outdoors: {
    name: 'outdoors',
    path: 'outdoors',
    height: {
      botBg: 234,
      bot: 234,
    },
  },
  Seaside: {
    name: 'seaside',
    path: 'seaside',
    height: {
      top: '55vh',
      botBg: 0,
      bot: 272,
    },
    y: {
      mid: '-500px',
    },
  },
  Halloween: {
    name: 'halloween',
    path: 'halloween',
    height: {
      top: '90vh',
      mid: 600,
      botBg: 0,
      bot: 493,
    },
    y: {
      mid: '-700px',
    },
  },
  City: {
    name: 'city',
    path: 'city',
    height: {
      top: '70vh',
      mid: 400,
      botBg: 0,
      bot: 229,
    },
    y: {
      mid: '-620px',
    },
  },
  Residence: {
    name: 'residence',
    path: 'residence',
    height: {
      top: '80vh',
      mid: 284,
      botBg: 0,
      bot: 217,
    },
    y: {
      mid: '-490px',
    },
  },
  Night: {
    name: 'night',
    path: 'night',
    height: {
      top: '60vh',
      mid: 400,
      botBg: 0,
      bot: 397,
    },
    y: {
      mid: '-652px',
    },
  },
  Park: {
    name: 'park',
    path: 'park',
    height: {
      top: '100vh',
      mid: 500,
      botBg: 267,
      bot: 267,
    },
    y: {
      mid: '-440px',
    },
  },
};
