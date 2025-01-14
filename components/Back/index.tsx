'use client';

import { useRouter } from 'next/navigation';

const Back = (props: any) => {
  const { onBack } = props;

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
      className="fixed left-[15px] top-[15px] z-50"
      onClick={handleBack}
    >
      <svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M7.5 14L1.5 7.5L7.5 1" stroke="white" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
};

export default Back;
