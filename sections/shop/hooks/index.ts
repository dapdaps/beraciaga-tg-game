import { useRequest } from 'ahooks';
import { get } from '@/utils/http';
import { useMemo, useState } from 'react';
import { ProductType, ProductTypes } from '@/sections/shop/config';

export function useShop() {
  const [buyModalVisible, setBuyModalVisible] = useState(false);
  const [buying, setBuying] = useState(false);
  const [buyProduct, setBuyProduct] = useState<ShopItem>();

  const { data: list, loading } = useRequest<ShopItem[], any>(async () => {
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

  const handleProductPay = async (item?: ShopItem) => {
    const product = item || buyProduct;
    if (!product || !buying) return;
    setBuying(true);
  };

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
