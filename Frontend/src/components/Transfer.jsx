import React, { useState } from 'react';
import { Coins } from 'lucide-react';
import { UserData } from '../context/UserContext';
import { AtmData } from '../context/AtmContext';

const Transfer = () => {
  const { user } = UserData();
  const { transferMoney, loading } = AtmData();

  const [recipientNumber, setRecipientNumber] = useState('');
  const [transferAmount, setTransferAmount] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipientNumber || !transferAmount || parseFloat(transferAmount) <= 0) {
      alert('Please provide a valid recipient number and amount greater than zero.');
      return;
    }

    if (recipientNumber === user?.mobileNumber) {
      alert('You cannot transfer money to yourself.');
      return;
    }

    await transferMoney(recipientNumber, parseFloat(transferAmount));

    // Reset fields after successful transfer
    setRecipientNumber('');
    setTransferAmount('');
  };

  return (
    <div className="w-full h-24 flex items-center justify-center text-center">
      <label htmlFor="transfer_modal" className="btn">Transfer Money</label>
      <input type="checkbox" id="transfer_modal" className="modal-toggle" />
      <div className="modal" role="dialog">
        <div className="modal-box border border-gray-700">
          <h3 className="text-lg flex items-center justify-center gap-2 font-bold">
            Transfer Money <Coins />
          </h3>
          {/* form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            <div>
              <label className="block font-medium mb-2">Your Number</label>
              <p className="text-gray-500">{user?.mobileNumber || 'N/A'}</p>
            </div>
            <div>
              <label htmlFor="recipientNumber" className="block font-medium mb-2">
                Recipient Number
              </label>
              <input
                type="number"
                id="recipientNumber"
                value={recipientNumber}
                onChange={(e) => setRecipientNumber(e.target.value)}
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
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
                placeholder="Enter amount to transfer"
                className="input input-bordered w-full"
                required
              />
            </div>
            <button
              type="submit"
              className={`btn btn-primary ${loading ? 'btn-disabled' : ''}`}
              disabled={loading}
            >
              {loading ? 'Processing...' : 'Transfer'}
            </button>
          </form>
          <div className="modal-action">
            <label htmlFor="transfer_modal" className="btn">Close</label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transfer;
