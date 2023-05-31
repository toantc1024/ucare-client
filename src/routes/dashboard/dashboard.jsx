import React, { Fragment, useEffect, useState } from "react";
import { db, getUserProfile } from "../../utils/firebase/firebase.utils";
import { doc, onSnapshot } from "firebase/firestore";
import { GiWaterFlask, GiWaterDrop } from "react-icons/gi";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/dashboard/modal";
const Dashboard = ({ user }) => {
  // useEffect(() => {
  //   const getData = async () => {
  //     if (!user) return;
  //     const profile = await getUserProfile(user, user.displayName);
  //     setProfile(profile);
  //   };
  //   getData();
  // }, []);
  const [showModal, setShowModal] = useState(false);
  const [drinked, setDrinked] = useState([]);

  const [totalWater, setTotalWater] = useState(0);

  const [groupDrinked, setGroupDrinked] = useState({});

  useEffect(() => {
    // Group by timestamp

    const group = drinked.reduce((acc, curr) => {
      const date = new Date(curr.timestamp);
      const key = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;
      if (!acc[key]) {
        acc[key] = [];
      }
      acc[key].push(curr);
      return acc;
    }, {});
    setGroupDrinked(group);
  }, [drinked]);

  // useEffect(() => {
  //   let newSum = 0;
  //   if (!groupDrinked || Object.entries(groupDrinked)[0][1]) return;

  //   Object.entries(groupDrinked)[0][1].forEach((item) => {
  //     newSum += item.amount;
  //   });
  //   setTotalWater(newSum);
  // }, [groupDrinked]);

  useEffect(() => {
    console.log(user);
    if (!user) {
      return;
    }
    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      { includeMetadataChanges: true },
      async (doc) => {
        const drinkedList = (await doc.data().drinks) || [];
        console.log("Drinked", drinkedList);
        setDrinked(drinkedList);
      }
    );
  }, [user]);

  return (
    <Fragment>
      <Modal
        showModal={showModal}
        setShowModal={(value) => setShowModal(value)}
      />
      {
        // <div className="flex w-full font-extrabold text-5xl justify-center mt-8 font-extrabold text-transparent text-8xl bg-clip-text bg-gradient-to-r from-sky-400 to-sky-600">{`Water Drinked: ${totalWater} ml`}</div>
      }
      <div
        className="m-4 flex w-full hover:bg-sky-200 cursor-pointer  max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex items-center justify-center flex-col font-extrabold text-white bg-gradient-to-r from-sky-500 to-sky-600"
        onClick={() => setShowModal(true)}
      >
        <div className="w-10  h-10 relative">
          <p className="absolute top-50 right-50 font-bold text-2xl flex gap-1">
            <GiWaterFlask className="text-white w-10 h-10" />
            <span>+</span>
          </p>
        </div>
        <p>Add water</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-4">
        {drinked &&
          Object.entries(groupDrinked)
            .sort((a, b) => b[0] - a[0])
            .map(([key, value]) => {
              return (
                <Fragment>
                  <h1 className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex gap-2 flex-col items-center justify-center  col-span-full font-4xl font-extrabold bg-gradient-to-r from-sky-400 to-emerald-500 text-white">
                    {key}
                  </h1>
                  <Fragment>
                    {value.map(({ amount, type, unit, timestamp }) => {
                      return (
                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 flex gap-2 flex-col items-center justify-center ">
                          <div className="w-10 h-10 drop-shadow-lg rounded-full">
                            <GiWaterDrop
                              className={`text-sky-400 ${
                                type === "glass"
                                  ? "w-10 h-10"
                                  : type === "cup"
                                  ? "w-8 h-8 "
                                  : "w-6 h-6"
                              }`}
                            />
                          </div>
                          <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                            {amount} {unit}
                          </p>
                          {timestamp && (
                            <p className="mb-3 font-normal text-gray-500 dark:text-gray-400">
                              {new Date(timestamp).toLocaleDateString("en-US", {
                                weekday: "long",
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "numeric",
                                minute: "numeric",
                              })}
                            </p>
                          )}
                          <a
                            href="#"
                            className="inline-flex items-center text-blue-600 hover:underline"
                          >
                            Remove
                            <svg
                              className="w-5 h-5 ml-2"
                              fill="currentColor"
                              viewBox="0 0 20 20"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                              <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                            </svg>
                          </a>
                        </div>
                      );
                    })}
                  </Fragment>
                </Fragment>
              );
            })}
      </div>
    </Fragment>
  );
};

export default Dashboard;
