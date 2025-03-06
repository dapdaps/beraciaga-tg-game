import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css/autoplay';
import EquipmentsModal from '@/sections/home2/components/equipments-modal';
import { useContext, useState } from 'react';
import { HomeContext } from '@/sections/home2';
import { useRouter } from 'next/navigation';

const Equipments = [
  { key: 1, icon: '/images/beraciaga/equipments.svg' },
  { key: 2, icon: '/images/beraciaga/equipments-2.svg' },
  { key: 3, icon: '/images/beraciaga/equipments-3.svg' },
];

const ImportEquipments = () => {
  const { userInfo } = useContext(HomeContext);
  const router = useRouter();

  const [visible, setVisible] = useState(false);

  if (!userInfo?.address) {
    return null;
  }

  return (
    <>
      <button
        type="button"
        className="w-[150px] h-[40px] rounded-[10px] border border-[#709D27] bg-[#7DB425] backdrop-blur-[5px]"
        onClick={() => {
          if (userInfo?.address) {
            router.push('/imported-equipments?from=home');
            return;
          }
          // setVisible(true);
        }}
      >
        <div className="flex items-center justify-center gap-[8px] relative -top-[5px] w-full h-full rounded-[10px] border border-[#709D27] bg-[#C7FF6E] backdrop-blur-[5px]">
          <div className="w-[34px]">
            <Swiper
              spaceBetween={0}
              slidesPerView={1}
              onSlideChange={() => {
              }}
              onSwiper={(swiper) => {
              }}
              modules={[Autoplay]}
              autoplay
              loop
            >
              {
                Equipments.map((e) => (
                  <SwiperSlide key={e.key} className="!flex justify-center items-center !h-[30px]">
                    <img src={e.icon} alt="" />
                  </SwiperSlide>
                ))
              }
            </Swiper>
          </div>
          <div className="text-[#F7F9EA] font-cherryBomb text-stroke-1 text-[14px] leading-[100%] text-left">
            {!userInfo?.address ? <>Import<br /></> : ''} Boost Items
          </div>
        </div>
      </button>
      <EquipmentsModal
        visible={visible}
        onClose={() => {
          setVisible(false);
        }}
      />
    </>
  );
};

export default ImportEquipments;
