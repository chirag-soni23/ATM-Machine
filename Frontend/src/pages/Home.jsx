import React, { useState } from 'react';
import { UserData } from '../context/UserContext';
import { AtmData } from '../context/AtmContext';
import avatar from '../assets/avatar.png';

const Home = () => {
  const { user } = UserData();
  const { depositMoney } = AtmData();
  const [depositAmount, setDepositAmount] = useState('');

  function handlerSubmit(e) {
    e.preventDefault();

    // Validate deposit amount
    const amount = parseFloat(depositAmount);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }

    // Call depositMoney function and reset input
    depositMoney(amount);
    setDepositAmount('');
  }

  return (
    <div className="mt-[4rem]">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="flex flex-col gap-2 items-center p-4">
          <img
            className="w-24 h-24 rounded-full"
            src={user?.image?.url || avatar} // Fallback to avatar if user.image.url is undefined
            alt="User Avatar"
          />
          <h1 className="text-lg font-bold">{user?.name || 'User Name'}</h1>
          <p className="text-base text-gray-500">{user?.email || 'user@example.com'}</p>
        </div>
        <div className="card-body">
          <h2 className="card-title">Current Balance</h2>
          <p>₹ {user?.balance ?? '0.00'}</p> {/* Fallback balance */}
          <div className="card-actions justify-end">
            <form onSubmit={handlerSubmit} className="flex gap-4">
              <input
                value={depositAmount}
                onChange={(e) => setDepositAmount(e.target.value)} // Update state correctly
                type="number"
                placeholder="Enter amount"
                className="input input-bordered w-full max-w-xs"
              />
              <button type="submit" className="btn btn-primary">
                Deposit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
