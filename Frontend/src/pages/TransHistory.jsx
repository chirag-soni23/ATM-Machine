import React, { useEffect, useState } from 'react';
import { AtmData } from '../context/AtmContext';
import { Trash2 } from 'lucide-react';

const TransHistory = () => {
  const { transactions, fetchTransactionHistory, loading, deleteTransactionHistory } = AtmData();
  const [searchQuery, setSearchQuery] = useState(""); // State to store the search query
  const [filteredTransactions, setFilteredTransactions] = useState([]); // State for filtered transactions

  useEffect(() => {
    fetchTransactionHistory();
  }, []);

  useEffect(() => {
    if (searchQuery === "") {
      setFilteredTransactions(transactions);
    } else {
      setFilteredTransactions(
        transactions.filter(
          (transaction) =>
            transaction.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (transaction.targetUserName && transaction.targetUserName.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      );
    }
  }, [searchQuery, transactions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  // Handle delete all transactions
  const handleDeleteAll = () => {
    if (window.confirm("Are you sure you want to delete all transactions?")) {
      deleteTransactionHistory(null, true);
    }
  };

  return (
    <div className="overflow-x-auto mt-[4rem]">
      {/* Search Input */}
      <div className='w-full flex justify-between items-center p-4 gap-4'>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Search by Name"
          className="input input-bordered w-full max-w-xs"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} 
        />
      </div>

      <div className="mb-4">
        <button 
          onClick={handleDeleteAll} 
          className="btn btn-danger"
        >
          Delete All Transactions
        </button>
      </div>
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
          {filteredTransactions && filteredTransactions.length > 0 ? (
            filteredTransactions.map((transaction, index) => (
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
                    onClick={() => {
                      if (window.confirm("Are you sure you want to delete this transaction?")) {
                        deleteTransactionHistory(transaction._id, false);
                      }
                    }} 
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
