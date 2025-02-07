import ShopView from '@/sections/shop';
import { TabBarWrapper } from '@components/Layout/TabBarWrapper';

const Shop = () => {
  return (
    <TabBarWrapper tabbar={false}>
      <ShopView />
    </TabBarWrapper>
  );
};

export default Shop;
