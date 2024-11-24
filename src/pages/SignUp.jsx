import React, { useState } from "react";
import { MdVisibilityOff, MdVisibility } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { db } from "../firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import logo from "./../assets/—Pngtree—creative hand-painted network security logo_5008553.png";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "User",
    permissions: {
      read: true,
      write: false,
      delete: false,
    },
    status: "Active",
    password: "",
  });

  const { name, email, password, role, permissions, status } = formData;
  const navigate = useNavigate();

  function onChange(e) {
    const { id, value } = e.target;
    if (id.includes("permissions")) {
      const [_, key] = id.split(".");
      setFormData((prevState) => ({
        ...prevState,
        permissions: {
          ...prevState.permissions,
          [key]: value === "true",
        },
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        [id]: value,
      }));
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      await updateProfile(auth.currentUser, { displayName: name });

      const user = userCredential.user;

      const formDataCopy = {
        name,
        email,
        role,
        permissions,
        status,
        timestamp: serverTimestamp(),
        uid: user.uid,
      };

      await setDoc(doc(db, "users", user.uid), formDataCopy);

      navigate("/");
    } catch (error) {
      console.error("Error during signup:", error);
    }
  }

  return (
    <section>
      <div className="flex flex-col items-center justify-center px-3 py-2 mx-auto min-h-screen lg:py-1">
        <img className="w-40 h-15 mb-2 mx-auto " src={logo} alt="logo" />

        <div className="w-full rounded-lg shadow-2xl border dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 dark:bg-gray-800 border-gray-700 dark:border-gray-700">
          <div className="p-2 space-y-2 md:space-y-4 sm:p-8">
            <h1 className="text-xl text-center font-thin leading-tight tracking-tight text-white md:text-2xl dark:text-white">
              Sign Up
            </h1>
            <form
              onSubmit={onSubmit}
              className="space-y-4 md:space-y-1"
              action="#"
            >
              <div>
                <label
                  htmlFor="name"
                  className="text-start font-thin block mb-2 text-sm text-white dark:text-white"
                >
                  Your Name
                </label>
                <input
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  type="text"
                  id="name"
                  value={name}
                  onChange={onChange}
                  placeholder="Full Name"
                />
                <label
                  htmlFor="email"
                  className="text-start font-thin block mb-2 text-sm text-white dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={onChange}
                  className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Write Your Email"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="text-start font-thin block mb-2 text-sm text-white dark:text-white"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    className="border sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Password"
                    required
                  />
                  {showPassword ? (
                    <MdVisibilityOff
                      className="absolute right-3 top-3 text-white cursor-pointer text-xl"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  ) : (
                    <MdVisibility
                      className="absolute right-3 top-3 text-gray-300 cursor-pointer text-xl"
                      onClick={() => setShowPassword((prevState) => !prevState)}
                    />
                  )}
                </div>
              </div>

              <div className="flex lg:flex-row flex-col space-x-4 justify-between whitespace-nowrap text-sm sm:text-lg">
                <p className="lg:mb-6 mb-2 text-white">
                  Already have an account?
                  <Link
                    to="/login"
                    className="text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1"
                  >
                    Login
                  </Link>
                </p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full text-white bg-[#ec1d23] shadow-red-800/80 dark:shadow-lg dark:shadow-red-800/80 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
