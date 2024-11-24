import React, { useEffect, useState } from 'react';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import CardsItems from '../components/CardItems/CardItems';
import { RiRefreshLine } from "react-icons/ri";
import { IoAdd } from "react-icons/io5";
import { AiOutlineLogout } from "react-icons/ai"
import { useAuth } from '../context/AuthContext';

const AdminPage = () => {
  const [users, setUsers] = useState([]); 
  const [filteredUsers, setFilteredUsers] = useState([]); 
  const [search, setSearch] = useState(''); 
  const [loading, setLoading] = useState(true); 
  const { logout } = useAuth();
  const db = getFirestore();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersCollection = collection(db, 'users');
        const usersSnapshot = await getDocs(usersCollection);
        const usersData = usersSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsers(usersData);
        setFilteredUsers(usersData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [db]);

 
  const handleSearchChange = (event) => {
    const query = event.target.value.toLowerCase();
    setSearch(query);

    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(query) ||
      user.role.toLowerCase().includes(query)   
    );

    setFilteredUsers(filtered);
  };

  const refreshUsers = async () => {
    setLoading(true);
    const usersCollection = collection(db, 'users');
    const usersSnapshot = await getDocs(usersCollection);
    const usersData = usersSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    }));
    setUsers(usersData);
    setFilteredUsers(usersData);
    setLoading(false);
  };

  if (loading) {
    return <div className="text-white text-center">Loading users...</div>;
  }

  return (
    <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 m-5 text-white bg-gray-800">
      <div className="flex items-center justify-between mb-4">
     
        <div className="flex justify-center space-x-2 items-center">
       
          <button
             
              onClick={() => logout()}
              className="w-md text-white rotate-[-90deg]  bg-red-400 shadow-red-400/40 dark:shadow-lg dark:shadow-red-400/40 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 rounded-full text-sm px-1 py-1 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              <AiOutlineLogout
        
        
                className="text-lg text-center font-bold text-white"
              />
            </button>
        </div>
        <div className="flex  ml-2">
          <h6 className="text-sm text-center font-thin-bold leading-none text-white dark:text-white">
            Hi! Admin WelCome to Dashboard👋
          </h6>
        </div>
      </div>

      <div className="relative mb-4">
        <div className="absolute inset-y-0 left-4 lg:start-4 flex items-center pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-400 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          type="text"
          id="search"
          value={search}
          onChange={handleSearchChange}
          className="block w-full lg:w-full p-2 pl-12 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search users..."
        />
      </div>

    
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-700 dark:divide-gray-700"
        >
          {filteredUsers.length > 0 ? (
            filteredUsers.map((user) => (
              <CardsItems
                key={user.id}
                user={user}
              />
            ))
          ) : (
            <div className="text-center text-white">No users found.</div>
          )}
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
