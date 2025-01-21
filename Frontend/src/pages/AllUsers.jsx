import React, { useEffect } from 'react';
import { UserData } from '../context/UserContext';
import avatar from '../assets/avatar.png'

const AllUsers = () => {
  const { fetchallUsers, allUsers } = UserData();

  useEffect(() => {
    fetchallUsers(); 
  }, [fetchallUsers]);

  return (
    <div className="overflow-x-auto mt-[4rem]">
      <table className="table">
        {/* Table Header */}
        <thead>
          <tr>
            <th>
              <label>
                <input type="checkbox" className="checkbox" />
              </label>
            </th>
            <th>Name</th>
            <th>Mobile Number</th>
            <th>Balance</th>
            <th>Actions</th>
          </tr>
        </thead>
        {/* Table Body */}
        <tbody>
          { allUsers.length > 0 ? (
            allUsers.map((u, index) => (
              <tr key={u._id || index}>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={u.image?.url || avatar}
                          alt={`${u.name}'s avatar`}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{u.name}</div>
                      <div className="text-sm opacity-50">{u.email}</div>
                    </div>
                  </div>
                </td>
                <td>{u.mobileNumber || "N/A"}</td>
                <td>{u.balance || "0"}</td>
                <td>
                  <button className="btn btn-ghost btn-xs">Details</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No users found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
