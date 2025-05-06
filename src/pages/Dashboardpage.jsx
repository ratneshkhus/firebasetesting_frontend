import React, { useEffect, useState } from 'react';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true); // 🔁 loading state

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // const res = await fetch('http://localhost:5000/api/users');

        const res = await fetch('https://firebasetestingbackend.vercel.app/api/users');
        const data = await res.json();
        setUsers(data);
        console.log(data);
        
      } catch (err) {
        console.error("Error fetching users:", err);
      } finally {
        setLoading(false); // ✅ Done loading
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="user-table">
      <h2>All Users</h2>

      {loading ? (
        <p>Loading users...</p> // 🌀 Show while loading
      ) : (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map(user => (
                <tr key={user.id} className="user-card">
                  <td><h4>{user.name}</h4></td>
                  <td><p>{user.email}</p></td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2">No users found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserList;
