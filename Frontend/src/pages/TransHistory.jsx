import React, { useEffect } from 'react';
import { AtmData } from '../context/AtmContext';

const TransHistory = () => {
  const { transactions, fetchTransactionHistory, loading } = AtmData();

  useEffect(() => {
    fetchTransactionHistory(); // Fetch the transaction history on component mount
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Optional: Add loading indicator while data is being fetched
  }

  return (
    <div className="overflow-x-auto mt-20">
      <table className="table">
        {/* Table Head */}
        <thead>
          <tr>
            <th></th>
            <th>Source Name</th>
            <th>Source Mobile</th>
            <th>Target Name</th>
            <th>Target Mobile</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Status</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {/* Map through transactions and display them */}
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
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" className="text-center">No transactions found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default TransHistory;
