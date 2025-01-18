import { useTelegram } from "@/hooks/useTelegram";
import IconFlash from "@/public/svg/flash.svg";
import useBindStore from '@/stores/useBindStore';
import { formatLongText } from "@/utils/utils";
import { useState, useEffect } from "react";
import { groupBy, map, filter, maxBy } from 'lodash-es';
import { get } from "@/utils/http";
import { useRouter, useSearchParams } from 'next/navigation';
import { useLayoutStore } from "@/stores/useLayoutStore";
import { useBind } from "@/hooks/useBind";
import Popover, { PopoverPlacement, PopoverTrigger } from '@components/popover';
import { useUser } from '@/hooks/useUser';
import Loading from '@components/Loading';

const ImportedEquipmentsView = () => {

  const router = useRouter();
  const search = useSearchParams();
  const { userInfo, getUserInfo, userInfoLoading } = useUser();

  const [items, setItems] = useState<any[]>([]);

  const { WebApp } = useTelegram();

  const { setCongratsModalVisible }= useLayoutStore()

  const { loading, fetchBindStatus } = useBind();

  const [bindAddress, setBindAddress] = useState<string>('');

  const tgUser = WebApp?.initDataUnsafe?.user as any;

  const fetchGameData = async () => {
    try {
      const response = await get(`/api/game/items?tg_user_id=${tgUser?.id || ''}`);
      const groupedItems = groupBy(response?.data || [], 'category');

      const categories = ['cars', 'hats', 'jackets', 'necklaces'];
      const processedItems = categories.map(category => {
        const categoryItems = groupedItems[category] || [];
        const equippedItems = filter(categoryItems, item => item.pc_item === true);

        if (equippedItems.length > 0) {
          return maxBy(equippedItems, 'level');
        } else {
          return maxBy(categoryItems, 'level');
        }
      });

      setItems(processedItems);
    } catch (error) {
      console.error('Failed to fetch game data:', error);
    }
  };

  const fetchAddress = async () => {
    const address = await fetchBindStatus();
    setBindAddress(address);
  }

  useEffect(() => {
    fetchGameData();
    fetchAddress();
    getUserInfo();
  }, []);

  const calculateTotalBonus = (items: any[]) => {
    let totalPercent = items.reduce((acc, item) => {
      if (item?.pc_item) {
        return acc + (item?.bonus_percentage || 0);
      }
      return acc;
    }, 0);

    if (totalPercent === 0) {
      return 0;
    }

    if (items.length === 4 && items.every(item => item.pc_item)) {
      totalPercent += 10;
    }

    return (totalPercent / 100).toFixed(2);
  };

  const totalBonus = calculateTotalBonus(items);

  console.log(items);

  return (
    <div className="bg-black min-h-screen w-full flex flex-col items-center">
      <div className="absolute top-0 w-full h-[376px]">
        <div className="bg-[url(/images/imported-bg.png)] bg-cover bg-no-repeat w-full h-full" />
      </div>
      <div className="absolute top-0 w-full h-96 bg-gradient-to-b from-black/0 to-black" />
      <div className="relative w-full h-[376px] flex flex-col items-center">
        <div className="flex-shrink-0 w-48 h-12 flex items-center justify-center gap-2.5 mt-6 rounded-full p-2 backdrop-blur
                                bg-gradient-to-b from-white/20 to-transparent border border-white/20">
          <img src={tgUser?.photo_url ? tgUser?.photo_url : '/images/beraciaga/avator.svg'} className="w-8 h-8 rounded-full" alt="" />
          <div className="font-montserrat text-[20px] font-bold text-white">{formatLongText(bindAddress, 4, 4)}</div>
        </div>
        <div className="flex-shrink-0 mt-4 font-montserrat italic text-[#6376FF] text-[25px] font-[800] bg-[url(/images/bg-im.png)] bg-contain bg-no-repeat w-[82px] h-[82px] rounded-full flex items-center justify-center">
          {Number(totalBonus) > 0 ? Number(totalBonus) + 1 : '?'}X
        </div>

        <div className="flex-shrink-0 mt-6 mb-5 font-montserrat w-full text-center leading-5 px-5 font-[500] text-white">
          {
            Number(totalBonus) > 0 ? 'You’ve imported boost items.' : 'This account  has no boost items.'
          }
          (The highest level in the each category)
          from BeraCave.
        </div>
        <div className="flex-shrink-0 grid grid-cols-2 gap-4 w-full px-5 text-white">
          {
            items.map((item, index) => (
              <div className={`relative rounded-2xl p-[1px] backdrop-blur-[10px]`} key={index}>
                <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent rounded-2xl" />
                <div className="relative h-[170px] bg-gradient-to-b from-white/20 to-transparent rounded-2xl flex flex-col items-center">
                  <div className="font-cherryBomb leading-[20px] mt-[12px] text-stroke-1">{item.name || '-'}</div>
                  <div className="flex-1 w-full flex items-center justify-center p-2 h-[90px]">
                    <div className="relative w-full h-full flex items-center justify-center">
                      <img
                        src={item.pc_item
                          ? `/images/cave/${item.category}/${item.category}-${item.level}-active.png`
                          : `/images/cave/empty/${item.category}.png`}
                        className="max-w-full max-h-full w-auto h-auto object-contain"
                      />
                    </div>
                  </div>
                  <div className={`px-[6px] py-[5px] border-[3px] border-[#709D27] bg-[#C7FF6E] rounded-3xl flex items-center gap-[2px] ${!item.pc_item ? 'opacity-50' : ''}`}>
                    <IconFlash />
                    <span className="font-montserrat font-[700] text-[12px] text-center leading-[12px] text-black">
                                        {!item.pc_item ? `up to +${item.bonus_percentage}%` : `+${item.bonus_percentage}%`}
                                    </span>
                  </div>
                  <div className="absolute right-[10px] top-[10px]">
                    {
                      item.is_transfer && (
                        <Popover
                          content={(
                            <div className="w-[192px] text-center text-black text-[14px] font-[400] p-[10px_15px] border border-black font-[14px] font-Montserrat font-[400] leading-[120%] rounded-[20px] bg-[#FFFDEB] shadow-[10px_10px_0px_0px_rgba(0,_0,_0,_0.25)]">
                              This item has been transferred from <strong>Beracave</strong>.
                            </div>
                          )}
                          placement={PopoverPlacement.Center}
                          trigger={PopoverTrigger.Click}
                        >
                          <div className="w-[24px] h-[24px] rounded-[24px] border border-[#FFF5A9] cursor-pointer backdrop-blur-[10px] bg-[url('/images/cave/icon-beraciaga.svg')] bg-no-repeat bg-center bg-cover" />
                        </Popover>
                      )
                    }
                  </div>
                </div>
              </div>
            ))
          }
        </div>
        <div className="w-full px-5 pt-6 bg-black pb-6">
          <button
            disabled={userInfoLoading}
            className="w-full flex-shrink-0 bg-[#FFD335] rounded-2xl h-[52px] leading-[52px] text-black text-center font-montserrat font-[700] disabled:opacity-30 disabled:!cursor-not-allowed"
            onClick={() => {
              if (search.get('from') !== 'home' && userInfo?.bind_source === 'okx_invite') {
                setCongratsModalVisible(true);
              }
              router.push('/home');
            }}
          >
            {userInfoLoading ? <Loading /> : 'Beraciaga Now'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ImportedEquipmentsView
