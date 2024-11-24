import React, { useState, useEffect } from "react";
import { HiInformationCircle } from "react-icons/hi2";
import { FaEdit } from "react-icons/fa";
import { getFirestore, doc, updateDoc } from "firebase/firestore";
import { getAuth } from "firebase/auth";

function CardsItems({ user = {} }) {
  const [currentRole, setCurrentRole] = useState(user.role);
  const [currentStatus, setCurrentStatus] = useState(user.status);
  const [currentName, setCurrentName] = useState(user.name);
  const [isEditingName, setIsEditingName] = useState(false);

  const [permissions, setPermissions] = useState(
    user.permissions || {
      read: false,
      write: false,
      delete: false,
    }
  );

  const db = getFirestore();


  const userRef = doc(db, "users", user.id);

  const handleRoleChange = (e) => {
    const newRole = e.target.checked ? "Admin" : "User";
    setCurrentRole(newRole);
    updateUserInFirestore({ role: newRole });
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.checked ? "Active" : "Inactive";
    setCurrentStatus(newStatus);
    updateUserInFirestore({ status: newStatus });
  };

  const handleNameChange = (e) => {
    const newName = e.target.value;
    setCurrentName(newName);
    updateUserInFirestore({ name: newName });
  };

  const toggleEditMode = () => {
    setIsEditingName(!isEditingName);
  };

  const handlePermissionChange = (permission) => {
    setPermissions((prev) => {
      const newPermissions = { ...prev, [permission]: !prev[permission] };
      updateUserInFirestore({ permissions: newPermissions });
      return newPermissions;
    });
  };

  const updateUserInFirestore = async (updatedFields) => {
    try {
      await updateDoc(userRef, {
        ...updatedFields,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center justify-between">
        <div className="flex-2  min-w-0 ms-4">
          <div className="flex items-center space-x-2">
            {isEditingName ? (
              <input
                type="text"
                value={currentName}
                onChange={handleNameChange}
                onBlur={toggleEditMode}
                className="text-sm font-medium text-white bg-gray-700 border border-gray-500 rounded p-1 focus:outline-none focus:ring focus:ring-blue-500 dark:text-white"
                autoFocus
              />
            ) : (
              <p
                className="text-sm font-medium text-white truncate dark:text-white"
                onClick={toggleEditMode}
              >
                {currentName}
              </p>
            )}
            <FaEdit
              type="button"
              onClick={toggleEditMode}
              className="text-xl text-center"
            />
          </div>

          <p className="text-sm font-medium text-white truncate dark:text-white">
            Current Role: {currentRole}
          </p>

          <div className="flex items-center mb-2">
            <input
              id="role-checkbox"
              type="checkbox"
              checked={currentRole === "Admin"}
              onChange={handleRoleChange}
              className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="role-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {currentRole === "Admin" ? "Switch to User" : "Switch to Admin"}
            </label>
          </div>

          <div className="flex justify-between pr-3 min-w-0 mt-2">
            <div className="flex justify-center items-center text-sm font-medium text-white dark:text-white">
              Status Indicator:
              {currentStatus === "Active" ? (
                <div className="w-2 h-2 ml-2 rounded-full bg-green-600 shadow-2xl ring ring-green-600 ring-opacity-50"></div>
              ) : currentStatus === "Inactive" ? (
                <div className="w-2 h-2 ml-2 rounded-full bg-red-600 shadow-2xl ring ring-red-600 ring-opacity-50"></div>
              ) : (
                ""
              )}
            </div>
          </div>
          <div className="flex items-center">
            <input
              id="status-checkbox"
              type="checkbox"
              checked={currentStatus === "Active"}
              onChange={handleStatusChange}
              className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 rounded focus:ring-green-500 dark:focus:ring-green-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label
              htmlFor="status-checkbox"
              className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
            >
              {currentStatus === "Active" ? "Set as Inactive" : "Set as Active"}
            </label>
          </div>
        </div>
        <div className="flex flex-col ">
          <p className="text-sm font-medium text-white">Permissions:</p>
          <div className="flex flex-col mt-2">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="read-permission"
                checked={permissions.read}
                onChange={() => handlePermissionChange("read")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="read-permission"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Read
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="write-permission"
                checked={permissions.write}
                onChange={() => handlePermissionChange("write")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="write-permission"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Write
              </label>
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="delete-permission"
                checked={permissions.delete}
                onChange={() => handlePermissionChange("delete")}
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
              />
              <label
                htmlFor="delete-permission"
                className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
              >
                Delete
              </label>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

export default CardsItems;
