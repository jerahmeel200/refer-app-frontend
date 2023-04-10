import DasboardWrapper from "@/components/DasboardWrapper";
import Head from "next/head";

import { useSelector } from "react-redux";
import axios from "axios";
import React, { useState, useEffect } from "react";

const SettingsPage = () => {
  const [userData, setUserData] = useState(null);
  const authSlice = useSelector((state) => state.auth);
  const username = authSlice.user.username;
  console.log(authSlice);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/user/${username}`
        );
        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [username]);

  return (
    <DasboardWrapper>
      <div>
        <Head>
          <title>Register</title>
        </Head>
        <section className="bg-white-50 bg-white-900">
          <div className="flex flex-col items-center h-fit   px-6 py-8 mx-auto   lg:py-0">
            <div className="w-full my-10 h-auto mb-10  rounded-lg shadow    xl:p-0   ">
              <div className="p-6 mt-10 space-y-4   sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-black-900 md:text-2xl ">
                  Settings Page
                </h1>
                <form className="space-y-4 md:space-y-6" action="#">
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      Username
                    </label>
                    <input
                      type="text"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      // placeholder="name@company.com"
                      required=""
                      disabled
                      value={userData?.username}
                      // onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      Email
                    </label>

                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      required=""
                      disabled
                      value={userData?.email}
                      // value={username}
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      Phone Number
                    </label>

                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      required=""
                      // value={username}
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      Date of birth
                    </label>

                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      required=""
                      // value={username}
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      Personal Address
                    </label>

                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      required=""
                      // value={username}
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      details
                    </label>

                    <input
                      type="text"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      required=""
                      // value={username}
                    />
                  </div>

                  <button
                    // type="submit"
                    // onClick={handleRegister}
                    className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    Sava Changes
                  </button>
                  {/* <a
                    href="/user/login"
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  >
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an ac
                    </p>
                  </a> */}
                </form>
              </div>
            </div>
          </div>
        </section>
      </div>
    </DasboardWrapper>
  );
};

// export default ProfilePage;

export default SettingsPage;
