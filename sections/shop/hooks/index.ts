import { useRequest } from 'ahooks';
import { get, post } from '@/utils/http';
import { useMemo, useState } from 'react';
import { CouponItem, ProductType, ProductTypes } from '@/sections/shop/config';
import useToast from '@/hooks/use-toast';
import { useRequestByToken } from '@/hooks/use-request-by-token';
import { useTelegram } from '@/hooks/useTelegram';
import { useUser } from '@/hooks/useUser';

export function useShop() {
  const toast = useToast();
  const { WebApp } = useTelegram();
  const { getUserInfo } = useUser();

  const [buyModalVisible, setBuyModalVisible] = useState(false);
  const [buyProduct, setBuyProduct] = useState<ShopItem>();

  const { data: list, loading, run: getList } = useRequest<ShopItem[], any>(async () => {
    const res = await get("/api/product/list");
    if (res.code !== 200) return [];
    const _list: ShopItem[] = res.data || [];
    _list.forEach((item) => {
      const currCategory = ProductTypes[item.category];
      item.color = currCategory?.color;
      item.shadowColor = currCategory?.shadowColor;
      item.isSoldOut = item.total_sold > 0 && item.sold_count < item.total_sold;
    });
    return _list;
  }, {});

  const listByCategory = useMemo<Record<ProductType, ShopItem[]>>(() => {
    const _list: any = {};
    if (!list) return _list;
    list.forEach((item) => {
      if (!_list[item.category]) {
        _list[item.category] = [item];
        return;
      }
      _list[item.category].push(item);
    });
    return _list;
  }, [list]);

  const handleProduct = (item?: ShopItem) => {
    setBuyProduct(item);
    setBuyModalVisible(!!item);
  };

  const { run: handleProductPay, loading: buying } = useRequestByToken<{complete: boolean; link?: string;}, [item?: ShopItem, coupon?: CouponItem]>(async (item, coupon) => {
    const product = item || buyProduct;
    const res = await post("/api/product/purchase", {
      product_id: product?.id,
      coupon_id: coupon?.id,
    });
    if (res.code !== 200) {
      toast.fail({ title: res.message || "Failed to purchase" });
      return { complete: false };
    }
    if (WebApp && res.data.link) {
      WebApp.openInvoice(
        res.data.link,
        (status: string) => {
          if (status === 'paid') {
            toast.success({ title: 'Invoice paid successfully' });
            getList();
            getUserInfo();
          } else {
            toast.fail({ title: 'Invoice was not paid' });
          }
        }
      );
    }
    return res.data;
  }, {
    manual: true,
  });

  return {
    list,
    listByCategory,
    loading,
    buyModalVisible,
    handleProduct,
    buyProduct,
    buying,
    handleProductPay,
  };
}

export interface ShopItem {
  category: ProductType;
  discount_price: number;
  id: number;
  invoice_link: string;
  item_id: string;
  items_received: number;
  logo: string;
  name: string;
  original_price: number;
  recommend: number;
  sold_count: number;
  star: number;
  status: number;
  total_sold: number;

  color: string;
  shadowColor: string;
  isSoldOut: boolean;
}
