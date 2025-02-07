import RankView from '@/sections/rank';
import { TabBarWrapper } from '@components/Layout/TabBarWrapper';

const Rank = () => {
  return (
    <TabBarWrapper tabbar={false}>
      <RankView />
    </TabBarWrapper>
  );
};

export default Rank;
