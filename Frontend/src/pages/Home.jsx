import React, { useState, useEffect } from 'react';
import { UserData } from '../context/UserContext';
import { AtmData } from '../context/AtmContext';
import avatar from '../assets/avatar.png';
import Withdraw from '../components/Withdraw';
import Transfer from '../components/Transfer';

const Home = () => {
  const { user } = UserData();
  const { balance, checkBalance, depositMoney, loading } = AtmData();
  const [depositAmount, setDepositAmount] = useState('');

  useEffect(() => {
    checkBalance();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }

    await depositMoney(amount);
    setDepositAmount('');
  };

  return (
    <div className="mt-[4rem] flex flex-col gap-10">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="flex flex-col gap-2 items-center p-4">
          <img
            className="w-24 h-24 rounded-full"
            src={user?.image?.url || avatar}
            alt="User Avatar"
          />
          <h1 className="text-lg font-bold">{user?.name || 'User Name'}</h1>
          <p className="text-base text-gray-500">{user?.email || 'user@example.com'}</p>
        </div>
        <div className="card-body">
          <h2 className="card-title">Current Balance</h2>
          <p className="text-base font-semibold">
            ₹ {loading ? balance.toFixed(2) : balance.toFixed(2)}
          </p>
          <div className="card-actions justify-end">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)}
                type="number"
                placeholder="Enter amount"
                className="input input-bordered w-full max-w-xs"
                disabled={loading}
              />
              <button
                type="submit"
                className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
                disabled={loading}
              >
                {loading ? 'Processing...' : 'Deposit'}
              </button>
            </form>
          </div>
        </div>
      </div>
      <Withdraw />
      <Transfer/>
    </div>
  );
};

export default Home;
