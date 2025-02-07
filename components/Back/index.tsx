'use client';

import { useRouter } from 'next/navigation';

interface Props {
  className?: string;
  onBack?(): void;
}

const Back = (props: Props) => {
  const { onBack, className } = props;

  const router = useRouter();

  const handleBack = () => {
    if (typeof onBack === 'function') {
      onBack();
      return;
    }
    router.back();
  };

  return (
    <button
      type="button"
      className={`fixed left-[0.9375rem] top-[0.9375rem] z-50 ${className}`}
      onClick={handleBack}
    >
      <svg width="47" height="42" viewBox="0 0 47 42" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M45.8798 27.1546C45.8798 22.5791 44.6528 16.5031 41.2336 11.5397C37.7801 6.52651 32.1192 2.70117 23.4399 2.70117C14.7606 2.70117 9.09974 6.52651 5.64625 11.5397C2.22707 16.5031 1 22.5791 1 27.1546C1 32.0284 3.67729 35.5392 7.80376 37.7771C11.886 39.9911 17.4318 40.9999 23.4399 40.9999C29.4481 40.9999 34.9938 39.9911 39.0761 37.7771C43.2026 35.5392 45.8798 32.0284 45.8798 27.1546Z"
          fill="#8B5D35"
          stroke="#4B371F"
          stroke-width="2"
        />
        <g filter="url(#filter0_i_662_4955)">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M23.4399 0C40.1071 0 44.8798 14.5978 44.8798 23.4534C44.8798 32.309 35.2785 36.2987 23.4399 36.2987C11.6014 36.2987 2 32.309 2 23.4534C2 14.5978 6.77272 0 23.4399 0Z"
            fill="#FFC574"
          />
        </g>
        <path
          d="M23.4399 1C31.4278 1 36.4869 4.47356 39.5866 8.97315C42.7206 13.5225 43.8798 19.1733 43.8798 23.4534C43.8798 27.4353 41.7565 30.3471 38.1226 32.3179C34.4445 34.3127 29.2704 35.2987 23.4399 35.2987C17.6095 35.2987 12.4353 34.3127 8.75724 32.3179C5.12339 30.3471 3 27.4353 3 23.4534C3 19.1733 4.15929 13.5225 7.29327 8.97315C10.3929 4.47356 15.452 1 23.4399 1Z"
          stroke="#BA8642"
          stroke-width="2"
        />
        <g filter="url(#filter1_di_662_4955)">
          <path
            d="M16.7677 21.0829C13.4834 19.4032 13.0866 14.8669 16.0294 12.6425L22.0815 8.06789C25.2169 5.69793 29.735 7.70556 30.0775 11.6209L30.7798 19.65C31.1223 23.5654 27.0214 26.3269 23.5221 24.5373L16.7677 21.0829Z"
            fill="#FFE894"
          />
          <path
            d="M15.4264 11.8448C11.895 14.514 12.3712 19.9575 16.3123 21.9732L23.0668 25.4276C27.2659 27.5752 32.187 24.2613 31.776 19.5629L31.0737 11.5338C30.6627 6.83534 25.241 4.42619 21.4786 7.27014L15.4264 11.8448Z"
            stroke="#4B371F"
            stroke-width="2"
          />
        </g>
        <path
          opacity="0.5"
          d="M38.9242 15.4844C39.7183 18.6607 40.5123 21.4399 38.1301 25.4103"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
        />
        <path
          d="M17.5665 15.3596C19.6195 12.8091 23.4398 10.0008 25.9592 10.0008"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
        />
        <defs>
          <filter
            id="filter0_i_662_4955"
            x="2"
            y="0"
            width="42.8799"
            height="36.2988"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-6" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="shape" result="effect1_innerShadow_662_4955" />
          </filter>
          <filter
            id="filter1_di_662_4955"
            x="12.0439"
            y="5.04736"
            width="20.7563"
            height="25.0503"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="3" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.4 0" />
            <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_662_4955" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_662_4955" result="shape" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dy="-5" />
            <feComposite in2="hardAlpha" operator="arithmetic" k2="-1" k3="1" />
            <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0" />
            <feBlend mode="normal" in2="shape" result="effect2_innerShadow_662_4955" />
          </filter>
        </defs>
      </svg>
    </button>
  );
};

export default Back;
