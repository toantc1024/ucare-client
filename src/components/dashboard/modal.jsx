import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React from "react";
import { db } from "../../utils/firebase/firebase.utils";

export default function Modal({ showModal, setShowModal }) {
  const drinkOptions = [
    { type: "glass", amount: 500, unit: "ml" },
    { type: "cup", amount: 250, unit: "ml" },
    { type: "smallcup", amount: 200, unit: "ml" },
  ];

  const [selectedOption, setSelectedOption] = React.useState(0);

  return (
    <>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">
                    Take a break and drink some! 🌊
                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => setShowModal(false)}
                  >
                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span>
                  </button>
                </div>
                {/*body*/}
                <div className="relative p-6 flex flex-col gap-2">
                  <section className="my-4 text-slate-500 text-lg leading-relaxed gap-2 flex">
                    {drinkOptions.map(({ type, amount, unit }, key) => (
                      <div
                        onClick={() => setSelectedOption(key)}
                        className={`cursor-pointer active:ring-3 active:ring-sky-500 ${
                          selectedOption === key
                            ? "ring-2 ring-sky-500"
                            : "hover:ring-2 hover:ring-sky-300"
                        } w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                            {type}
                          </span>
                          <span className="text-sm font-light text-gray-600 dark:text-gray-400">
                            {amount} {unit}
                          </span>
                        </div>
                      </div>
                    ))}
                  </section>
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-orange-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Skip 👀
                  </button>
                  <button
                    className="bg-sky-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={async () => {
                      const now = Date.now();
                      const drinkedOption = {
                        ...drinkOptions[selectedOption],
                        timestamp: now,
                      };

                      const { uid } = JSON.parse(localStorage.getItem("user"));
                      const docRef = doc(db, "users", uid);
                      const docSnap = await getDoc(docRef);
                      const data = docSnap.data();
                      const drinks = data.drinks;
                      drinks.push(drinkedOption);
                      const updateDrinks = drinks.filter(
                        (drink) => drink !== null
                      );
                      await updateDoc(doc(db, "users", uid), {
                        drinks: updateDrinks,
                      });
                      setShowModal(false);
                    }}
                  >
                    Drinked 🐳
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>
  );
}
