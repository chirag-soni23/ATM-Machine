import React, { useState } from 'react'
import { AtmData } from '../context/AtmContext';
import { HandCoins } from 'lucide-react';

const Withdraw = () => {
  const { balance,withdrawMoney,isWithdrawLoading} = AtmData();
  const [iswithdrawMoney, setWithdrawMoney] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const amount = parseFloat(iswithdrawMoney);
    if (isNaN(amount) || amount <= 0) {
      alert('Please enter a valid amount greater than 0.');
      return;
    }
    await withdrawMoney(amount);
    setWithdrawMoney("");
    
  }
  return (
    <div className="mt-[4rem]">
      <div className="card lg:card-side bg-base-100 shadow-xl">
        <div className="flex flex-col gap-2 items-center p-4">
          <HandCoins className='w-10 h-10' />
          <h2 className="card-title">WithDraw</h2>
          <p className="text-base font-semibold">
            ₹ {isWithdrawLoading ? balance.toFixed(2) : balance.toFixed(2)}
          </p>
        </div>
        <div className="card-body">
          <div className="card-actions justify-end">
            <form onSubmit={handleSubmit} className="flex gap-4">
              <input
                value={iswithdrawMoney}
                onChange={(e) => { setWithdrawMoney(e.target.value) }}
                type="number"
                placeholder="Enter amount"
                className="input input-bordered w-full max-w-xs"
                disabled={isWithdrawLoading}
              />
              <button
                type="submit"
                className={`btn btn-primary ${isWithdrawLoading ? 'btn-disabled' : ''}`}
                disabled={isWithdrawLoading}
              >
                {isWithdrawLoading ? 'Processing...' : 'Withdraw'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Withdraw