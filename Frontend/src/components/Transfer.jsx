import React from 'react'
import { Coins } from 'lucide-react';
import { UserData } from '../context/UserContext';

const Transfer = () => {
    const { user } = UserData();
  return (
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
  )
}

export default Transfer