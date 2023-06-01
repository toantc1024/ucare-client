import React, { Fragment, useEffect, useState } from "react";
import { db, getUserProfile } from "../../utils/firebase/firebase.utils";
import { doc, onSnapshot } from "firebase/firestore";
import { GiWaterFlask, GiWaterDrop } from "react-icons/gi";
import { BsFillFilterCircleFill, BsCupStraw, BsCupFill } from "react-icons/bs";
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
    let newTotal = 0;
    const today = new Date();
    const todayKey = `${today.getDate()}/${
      today.getMonth() + 1
    }/${today.getFullYear()}`;

    const group = drinked.reduce((acc, curr) => {
      const date = new Date(curr.timestamp);
      const key = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()}`;

      if (!acc[key]) {
        acc[key] = [];
      }
      if (key === todayKey) newTotal += curr.amount;
      acc[key].push(curr);
      return acc;
    }, {});
    setTotalWater(newTotal);
    setGroupDrinked(group);
  }, [drinked]);

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
    <div className="w-full flex flex-col text-white bg-gradient-to-r from-sky-400 to-sky-600">
      <Modal
        showModal={showModal}
        setShowModal={(value) => setShowModal(value)}
      />
      <div className="flex w-full font-extrabold text-5xl justify-center mt-8 py-4 font-extrabold text-transparent text-4xl  text-white  bg-gradient-to-r from-sky-400 to-sky-600 relative">
        {`Water Drinked: ${totalWater} ml`}
        <div className="absolute bottom-0 right-20 text-4xl bg-white shadow-lg rounded-full border w-20 h-20 flex items-center justify-center hover:scale-[1.2] transition-all ease-in-out duration-200 cursor-pointer">
          🌊
        </div>
      </div>

      <div className="flex flex-col m-4">
        <div
          className="col-span-full mt-4 flex w-full   p-4 bg-white border border-gray-200 
        rounded-lg shadow flex items-center justify-center gap-4 "
        >
          <div
            class="group bg-sky-500  min-w-[94px] cursor-pointer rounded-lg h-28 drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-sky-600 duration-150 transition-background ease-in-out rounded-full"
            onClick={() => setShowModal(true)}
            tabindex="0"
          >
            <div class="w-10 h-10 rounded-full shadow-lg bg-sky-400 group-hover:bg-white flex items-center justify-center font-bold ">
              <BsCupFill className="text-white group-hover:text-sky-900 duration-150  transition-text ease-in-out" />
            </div>
            <p class="text-sm text-white group-hover:text-white text-white font-bold">
              New water
            </p>
          </div>
          <div
            class="group bg-sky-500  min-w-[94px] cursor-pointer rounded-lg h-28 drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-sky-600 duration-150 transition-background ease-in-out rounded-full"
            onClick={() => setShowModal(true)}
            tabindex="0"
          >
            <div class="w-10 h-10 rounded-full shadow-lg bg-sky-400 group-hover:bg-white flex items-center justify-center font-bold ">
              <BsFillFilterCircleFill className="text-white group-hover:text-sky-900 duration-150  transition-text ease-in-out" />
            </div>
            <p class="text-sm text-white group-hover:text-white text-white font-bold">
              Filter
            </p>
          </div>
        </div>
        {drinked &&
          Object.entries(groupDrinked)
            .sort((a, b) => (a[0] < b[0] ? -1 : 1))
            .map(([key, value]) => {
              return (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-2 bg-sky-500 p-4 rounded-lg">
                  <h1 className="max-w-sm py-4  rounded-lg  dark:border-gray-700 flex gap-2 flex-col items-center justify-center col-span-full text-2xl font-extrabold bg-sky-600 text-white">
                    {key}
                  </h1>
                  <Fragment>
                    {value.map(({ amount, type, unit, timestamp }) => {
                      return (
                        <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-lg flex gap-2 flex-col items-center justify-center hover:scale-[1.05] transition-all ease-in-out duration-200 group cursor-pointer hover:bg-sky-100">
                          <div className="group-hover:rotate-12 group-hover:scale-[1.1] transition-rotate transition-scale ease-in-out duration-150 w-10 h-10 drop-shadow-lg rounded-full">
                            {type === "glass" ? (
                              <GiWaterDrop className="text-sky-400 w-10 h-10" />
                            ) : type === "cup" ? (
                              <BsCupStraw className="text-sky-400 w-10 h-10" />
                            ) : (
                              <BsCupFill className="text-sky-400 w-10 h-10" />
                            )}
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
                          </a>
                        </div>
                      );
                    })}
                  </Fragment>
                </div>
              );
            })}
      </div>
    </div>
  );
};

export default Dashboard;
