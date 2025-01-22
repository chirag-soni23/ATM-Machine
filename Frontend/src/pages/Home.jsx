import Withdraw from '../components/Withdraw';
import Transfer from '../components/Transfer';
import Deposit from '../components/Deposit';

const Home = () => {

  return (
    <div className="mt-[4rem] flex flex-col gap-10">
      <Deposit/>
      <Withdraw />
      <Transfer/>
    </div>
  );
};

export default Home;
