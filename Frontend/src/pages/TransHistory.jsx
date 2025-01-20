import React, { useEffect } from 'react';
import { AtmData } from '../context/AtmContext';
import { Trash2 } from 'lucide-react'

const TransHistory = () => {
  const { transactions, fetchTransactionHistory, loading, deleteTransactionHistory } = AtmData();

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle delete all transactions
  const handleDeleteAll = () => {
    deleteTransactionHistory(null, true); 
  };

  return (
    <div className="overflow-x-auto mt-20">
      <div className="mb-4">
        <button 
          onClick={handleDeleteAll} 
          className="btn btn-danger"
        >
          Delete All Transactions
        </button>
      </div>
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th></th>
            <th>Your Name</th>
            <th>Your Mobile</th>
            <th>Target Name</th>
            <th>Target Mobile</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Timestamp</th>
            <th>Actions</th> {/* Added Actions column */}
          </tr>
        </thead>
        <tbody>
          {transactions && transactions.length > 0 ? (
            transactions.map((transaction, index) => (
              <tr key={transaction._id}>
                <th>{index + 1}</th>
                <td>{transaction.userName}</td>
                <td>{transaction.userMobile}</td>
                <td>{transaction.targetUserName || 'N/A'}</td>
                <td>{transaction.targetUserMobile || 'N/A'}</td>
                <td>{transaction.amount}</td>
                <td>{transaction.type}</td>
                <td>{transaction.status}</td>
                <td>{new Date(transaction.timestamp).toLocaleString()}</td>
                <td>
                  <button 
                    onClick={() => deleteTransactionHistory(transaction._id, false)} 
                    className="btn btn-warning"
                  >
                    <Trash2 className='w-4 h-4' />
                  </button>
                </td> {/* Added Delete button */}
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10" className="text-center">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransHistory;
