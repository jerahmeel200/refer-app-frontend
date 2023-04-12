import DasboardWrapper from "@/components/DasboardWrapper";
import Head from "next/head";

import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { showSuccessToast, showErrorToast } from "@/utils/toaster";

// import AuthService from "@/services/AuthService";

const SettingsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    mobile: "",
    address: "",
    accountName: "",
    bankName: "",
    accountNumber: "",
  });

  const authSlice = useSelector((state) => state.auth);
  const username = authSlice?.user?.username;
  const token = authSlice?.token;
  console.log(authSlice);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/user/${username}`
      );
      setUserData(response.data);
      // setFirstName(response.data.firstName);
      console.log("response", response.data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [username]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    // alert("working");
    const url = "http://localhost:8080/api/updateuser";
    const reqBody = {
      firstName: userData?.firstName,
      lastName: userData?.lastName,
      mobile: userData?.mobile,
      address: userData.address,
      bankDetails: {
        accountName: userData?.accountName,
        bankName: userData?.bankName,
        accountNumber: userData?.accountNumber,
      },

      // email:,
    };
    console.log("body", reqBody);
    // setIsButtonDisabled(false);
    try {
      const response = await axios.put(`${url}`, reqBody, {
        headers: {
          Authorization: "Bearer " + token,
        },
      });
      showSuccessToast("Updated Successfull" || response?.data?.msg);
      // console.log(token);
      // console.log(response.data, "data");
    } catch (error) {
      showErrorToast(
        error?.response?.data?.error || "error unable to update !"
      );

      console.log(error, " error not working");
    } finally {
      // setIsLoading(false);
      fetchData();
      setIsLoading(false);
      // setIsButtonDisabled(false);
    }
  };

  return (
    <DasboardWrapper>
      <div>
        <Head>
          <title>Register</title>
        </Head>

        <section className="bg-white-50 bg-white-900">
          <div className="flex flex-col items-center h-fit   px-6 py-8 mx-auto   lg:py-0">
            <div className="w-full my-10 h-auto mb-10  rounded-lg shadow    xl:p-0   ">
              <div className="p-6 mt-10 space-y-4  sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-black-900 md:text-2xl ">
                  Settings Page
                </h1>
                <form
                  onSubmit={handleUpdate}
                  className="space-y-4 md:space-y-6"
                  action="#"
                >
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
                      First Name
                    </label>

                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      value={userData?.firstName}
                      onChange={(e) =>
                        setUserData({ ...userData, firstName: e.target.value })
                      }
                      required=""
                      // value={username}
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      Last Name
                    </label>

                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      value={userData?.lastName}
                      onChange={(e) =>
                        setUserData({ ...userData, lastName: e.target.value })
                      }
                      required=""
                      // value={username}
                    />
                  </div>
                  <div>
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      Address
                    </label>

                    <input
                      type="text"
                      name="phoneNumber"
                      id="phoneNumber"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      value={userData?.address}
                      onChange={(e) =>
                        setUserData({ ...userData, address: e.target.value })
                      }
                      required=""
                      // value={username}
                    />
                  </div>
                  <div>
                    <label
                      for="mobile"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      Mobile
                    </label>

                    <input
                      type="text"
                      name="mobile"
                      id="mobile"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      value={userData?.mobile}
                      onChange={(e) =>
                        setUserData({ ...userData, mobile: e.target.value })
                      }
                      required=""
                      // value={username}
                    />
                  </div>
                  <div>
                    <label
                      for="mobile"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      Account number
                    </label>

                    <input
                      type="text"
                      name="accountNumber"
                      id="accountNumber"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      value={userData?.accountNumber}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          accountNumber: e.target.value,
                        })
                      }
                      required=""
                      // value={username}
                    />
                  </div>
                  <div>
                    <label
                      for="mobile"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      Account Name
                    </label>

                    <input
                      type="text"
                      name="accountName"
                      id="accountName"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      value={userData?.accountName}
                      onChange={(e) =>
                        setUserData({
                          ...userData,
                          accountName: e.target.value,
                        })
                      }
                      required=""
                      // value={username}
                    />
                  </div>
                  <div>
                    <label
                      for="mobile"
                      className="block mb-2 text-sm font-medium text-black-900  "
                    >
                      Bank Name
                    </label>

                    <input
                      type="text"
                      name="bankName"
                      id="bankName"
                      className="bg-gray-50 border border-gray-500 text-black-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder=""
                      value={userData?.bankName}
                      onChange={(e) =>
                        setUserData({ ...userData, bankName: e.target.value })
                      }
                      required=""
                      // value={username}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full text-white bg-green-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                  >
                    {isLoading ? (
                      <svg
                        className="animate-spin h-5 w-5 mr-3"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 016 12H2c0 3.042 1.135 5.824 3 7.938l1-1.647zm10-5.291a7.962 7.962 0 01-2 5.291l1 1.647A7.962 7.962 0 0118 12h-4zm-2-5.291v-3.28A8.015 8.015 0 0112 4v3.291a4.001 4.001 0 104 0z"
                        />
                      </svg>
                    ) : (
                      "Update"
                    )}
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
