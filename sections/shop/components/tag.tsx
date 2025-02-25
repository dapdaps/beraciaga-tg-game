import React from 'react';
import clsx from 'clsx';

const Tag: React.FC<any> = (props) => {
  const { className, type = 'hot' } = props;

  const currType = TAG_TYPES[type as TagType] || TAG_TYPES.hot;

  return (
    <div
      className={clsx('relative flex justify-center items-center w-[66px] h-[35px] text-center text-stroke-2 stroke-[#4B371F] font-cherryBomb text-[14px] font-normal leading-none tracking-[1.4px] uppercase', className)}
      style={{ color: currType?.color }}
    >
      <div className="relative z-[1] rotate-[-13.488deg]">
        {currType?.label}
      </div>
      <svg
        width="66"
        height="35"
        viewBox="0 0 66 35"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute left-0 top-0"
      >
        <path fill={currType?.bg} stroke={currType?.border} d="M1.97554 16.2669C0.736429 16.5978 0.457173 18.2304 1.51584 18.9543L8.17519 23.5082C8.37443 23.6444 8.44789 23.9036 8.34981 24.1241L5.03688 31.5732C4.52444 32.7254 5.57612 33.9573 6.79446 33.632L63.9937 18.357C65.2328 18.0261 65.512 16.3935 64.4534 15.6696L57.794 11.1157C57.5948 10.9795 57.5213 10.7204 57.6194 10.4998L60.9323 3.05069C61.4448 1.89847 60.3931 0.666573 59.1747 0.991929L1.97554 16.2669Z" />
      </svg>
    </div>
  );
};

export default Tag;

export enum TagType {
  hot = 'hot',
}

export const TAG_TYPES: Record<TagType, { label: string; color: string; bg: string; border: string; }> = {
  hot: {
    label: 'HOT',
    color: '#F7F9EA',
    bg: '#FF2600',
    border: '#4B371F',
  },
};
