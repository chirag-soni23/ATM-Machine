import React, { useState, useEffect } from 'react';
import { UserData } from '../context/UserContext';
import { AtmData } from '../context/AtmContext';
import avatar from '../assets/avatar.png';
import Withdraw from '../components/Withdraw';
import { Coins } from 'lucide-react';

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
      <div className="w-full h-24 flex items-center justify-center text-center">
  <label htmlFor="transfer_modal" className="btn">Transfer Money</label>
  <input type="checkbox" id="transfer_modal" className="modal-toggle" />
  <div className="modal" role="dialog">
    <div className="modal-box border border-gray-700">
      <h3 className="text-lg flex items-center justify-center gap-2 font-bold">
        Transfer Money <Coins />
      </h3>
      <form className="flex flex-col gap-4 mt-4">
        <div>
          <label className="block font-medium mb-2">Your Number</label>
          <p className="text-gray-500">{user?.mobileNumber || 'N/A'}</p>
        </div>
        <div>
          <label htmlFor="recipientNumber" className="block font-medium mb-2">
            Recipient Number
          </label>
          <input
            type="text"
            id="recipientNumber"
            
            placeholder="Enter recipient's number"
            className="input input-bordered w-full"
            required
          />
        </div>
        <div>
          <label htmlFor="transferAmount" className="block font-medium mb-2">
            Transfer Amount
          </label>
          <input
            type="number"
            id="transferAmount"
            placeholder="Enter amount to transfer"
            className="input input-bordered w-full"
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Transfer
        </button>
      </form>
      <div className="modal-action">
        <label htmlFor="transfer_modal" className="btn">Close</label>
      </div>
    </div>
  </div>
</div>

    </div>
  );
};

export default Home;
