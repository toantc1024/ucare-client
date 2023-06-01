import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import React, { Fragment, useEffect, useState } from "react";
import { db } from "../../utils/firebase/firebase.utils";
import "draft-js/dist/Draft.css";
import { Editor, EditorState, convertFromHTML, ContentState } from "draft-js";
export default function FitModal({ showModal, setShowModal, user }) {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  const [fitLevel, setFitLevel] = useState(null);
  const [fitGoal, setFitGoal] = useState(0);
  const [fitWorkout, setFitWorkout] = useState(null);
  const [fitHabit, setFitHabit] = useState(null);
  const [fitWorkdays, setFitWorkdays] = useState(null);

  const [generating, setGenerating] = useState(false);

  const [isDraft, setIsDraft] = useState(false);

  const [tempData, setTempData] = useState(null);

  useEffect(() => {
    if (showModal) {
      setFitLevel(null);
      setFitGoal(0);
      setFitWorkout(null);
      setFitHabit(null);
      setFitWorkdays(null);
      setIsDraft(false);
    }
  }, [showModal]);

  const generateWorkout = async () => {
    if (generating) return;

    const workout = {
      level: fitLevel,
      goal: fitGoal,
      workout: fitWorkout[0],
      habit: fitHabit,
      workdays: fitWorkdays,
    };
    setGenerating(true);
    setIsDraft(true);
    setEditorState(EditorState.createEmpty());

    try {
      const response = await fetch("http://localhost:8888/fitness/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ workout }),
      });
      setGenerating(false);
      const value = await response.json();
      const text = value.response;
      setTempData(text);
      // Save to user uid in firestore

      const blocksFromHTML = convertFromHTML(text);
      const state = ContentState.createFromBlockArray(
        blocksFromHTML.contentBlocks,
        blocksFromHTML.entityMap
      );

      setEditorState(EditorState.createWithContent(state));
    } catch (error) {
      setGenerating(false);
      setIsDraft(false);
    }

    // await setDoc(doc(db, "users", "workout"), workout);
  };

  return (
    <Fragment>
      {showModal ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
            <div className="relative w-50 my-6 mx-auto max-w-4xl">
              {/*content*/}
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-full">
                {/*header*/}
                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-4xl font-extrabold text-gray-900 ">
                    Let's generate new workout! 🎯
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
                  {!isDraft ? (
                    <section className="my-4 leading-relaxed gap-2 flex flex-col">
                      <div className="mb-2 text-gray-900 flex flex-col gap-2">
                        <h1 className="text-gray-900 text-sm font-bold">
                          Tell me about your current fitness level? 💪
                        </h1>
                        <div className="p-1 flex flex-row justify-between gap-1 rounded-lg bg-emerald-400 ">
                          {["Beginner", "Intermediate", "Advanced"].map(
                            (level) => {
                              return (
                                <button
                                  className={`p-2 shadow-sm rounded-lg w-full transition-bg ease-in-out duration-150 ${
                                    fitLevel === level
                                      ? "bg-white"
                                      : "hover:bg-emerald-200"
                                  }`}
                                  onClick={() => setFitLevel(level)}
                                >
                                  {level}
                                </button>
                              );
                            }
                          )}
                        </div>
                      </div>

                      <div className="mb-2 text-gray-900 flex flex-col gap-2">
                        <h1 className="text-gray-900 text-sm font-bold flex flex-col gap-2">
                          Do you have any fitness goals 🎯
                        </h1>

                        <div className="p-1 flex flex-col justify-between gap-1 rounded-lg bg-emerald-400 ">
                          <select
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:outline-none"
                            onChange={(e) => {
                              setFitGoal(e.target.value);
                            }}
                          >
                            <option selected value="Be more fitness">
                              Select a goal
                            </option>
                            <option value="Build muscle">Build muscle</option>
                            <option value="Improve endurance">
                              Improve endurance
                            </option>
                          </select>
                        </div>
                      </div>

                      <div className="mb-2 text-gray-900 flex flex-col gap-2">
                        <h1 className="text-gray-900 text-sm font-bold flex flex-row gap-2">
                          <span>
                            What's kind of workout do you favor?{" "}
                            {fitWorkout === null ? "🤸‍♀️" : fitWorkout[1]}
                          </span>
                          <span>{fitWorkout && fitWorkout[0]}</span>
                        </h1>
                        <div className="flex flex-row gap-2 w-full justify-between">
                          {[
                            ["Cardio", "🏃‍♀️"],
                            ["Strength training", "🏋🏻"],
                            ["Yoga", "🧘‍♂️"],
                            ["Streching", "🤸‍♂️"],
                            ["Cycling", "🚴‍♀️"],
                            ["Other", "😎"],
                          ].map((workout) => {
                            return (
                              <div
                                className="flex flex-col w-auto gap-2 justify-center items-center 
                            "
                                onClick={() => {
                                  setFitWorkout(workout);
                                }}
                              >
                                <button
                                  className={`w-10 h-10 rounded-full bg-emerald-${
                                    fitWorkout && fitWorkout[0] === workout[0]
                                      ? "400"
                                      : "100"
                                  } shadow-lg text-2xl`}
                                >
                                  {workout[1]}
                                </button>
                                <p className="text-gray text-sm font-bold">
                                  {workout[0]}
                                </p>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mb-2 text-gray-900 flex flex-col gap-2">
                        <h1 className="text-gray-900 text-sm font-bold flex flex-col gap-2">
                          How often do you want to work out? 📅
                        </h1>

                        <div className="p-1 flex flex-col justify-between gap-1 rounded-lg bg-emerald-400 ">
                          <select
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:outline-none"
                            onChange={(e) => {
                              setFitHabit(e.target.value);
                            }}
                          >
                            {[
                              "1-2 times per week",
                              "3-4 times per week",
                              "5-6 times per week",
                              "7 times per week",
                            ].map((workout, index) => {
                              return (
                                <option
                                  selected={`${index === 0 ? "true" : "fasle"}`}
                                  value={workout}
                                >
                                  {workout}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                      <div className="mb-2 text-gray-900 flex flex-col gap-2">
                        <h1 className="text-gray-900 text-sm font-bold flex flex-col gap-2">
                          <span>How often do you want to work out? 📅</span>
                          <span className="w-full flex justify-center text-2xl">
                            {`${
                              fitWorkdays === null
                                ? ""
                                : `
                          ${fitWorkdays} ${
                                    fitWorkdays <= 7
                                      ? "🥳"
                                      : fitWorkdays <= 14
                                      ? "🔥"
                                      : fitWorkdays <= 28
                                      ? "✨"
                                      : "😍"
                                  }
                          `
                            } days`}
                          </span>
                        </h1>

                        <div className="p-1 flex flex-col justify-between gap-1 rounded-lg bg-emerald-400 ">
                          <input
                            type="range"
                            min="1"
                            max="30"
                            value={fitWorkdays}
                            onChange={(e) => {
                              setFitWorkdays(e.target.value);
                            }}
                            class="w-full h-2 bg-emerald-400 rounded-lg appearance-none cursor-pointer dark:bg-gray-700"
                          />
                        </div>
                      </div>
                      <button
                        disabled={
                          fitLevel === null ||
                          fitGoal === null ||
                          fitWorkout === null ||
                          fitWorkdays === null
                        }
                        className={`
                
                ${
                  (fitLevel === null ||
                    fitGoal === null ||
                    fitWorkout === null ||
                    fitWorkdays === null) &&
                  "cursor-not-allowed opacity-50"
                }
                hover:bg-emerald-600 transition -bg ease-in-out duration-150  mt-2 bg-emerald-400 p-2 rounded-lg text-white font-bold`}
                        onClick={() => {
                          generateWorkout();
                        }}
                      >
                        Generate 🐳
                      </button>
                    </section>
                  ) : (
                    <Fragment>
                      <section className="w-full flex justify-center">
                        {generating && (
                          <button
                            disabled={
                              fitLevel === null ||
                              fitGoal === null ||
                              fitWorkout === null ||
                              fitWorkdays === null
                            }
                            className={`
                    
                    ${
                      (fitLevel === null ||
                        fitGoal === null ||
                        fitWorkout === null ||
                        fitWorkdays === null) &&
                      "cursor-not-allowed opacity-50"
                    }
                    hover:bg-emerald-600 transition -bg ease-in-out duration-150  mt-2 bg-emerald-400 p-2 rounded-lg text-white font-bold`}
                            onClick={() => {
                              generateWorkout();
                            }}
                          >
                            <div role="status">
                              <svg
                                aria-hidden="true"
                                class="w-8 h-8 text-white animate-spin fill-emerald-500"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                  fill="currentColor"
                                />
                                <path
                                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                  fill="currentFill"
                                />
                              </svg>
                              <span class="sr-only">Loading...</span>
                            </div>
                          </button>
                        )}
                      </section>
                      {generating && (
                        <div className="text-gray-900 w-full flex justify-center font-bold">
                          Generating... It might takes several minutes! 🐳
                        </div>
                      )}

                      {!generating && (
                        <div
                          style={{
                            minHeight: "6em",
                            cursor: "text",
                            color: "black",
                          }}
                          onClick={focusEditor}
                        >
                          <Editor
                            ref={editor}
                            editorState={editorState}
                            onChange={setEditorState}
                            placeholder="Write something!"
                          />
                        </div>
                      )}
                    </Fragment>
                  )}
                </div>
                {/*footer*/}
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className="bg-sky-500 text-white active:bg-sky-700 hover:bg-sky-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Skip 👀
                  </button>
                  <button
                    disabled={!isDraft}
                    className={`
                    bg-emerald-500 text-white hover:shadow-lg ${
                      isDraft
                        ? "active:bg-emerald-600"
                        : "bg-gray-500 cursor-not-allowed opacity-50"
                    } font-bold uppercase  text-sm px-6 py-3 rounded shadow  outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150`}
                    type="button"
                    onClick={async () => {
                      const { uid } = JSON.parse(localStorage.getItem("user"));
                      await updateDoc(doc(db, "users", uid), {
                        workout: tempData,
                      });
                      setShowModal(false);
                    }}
                  >
                    Apply 🔥
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </Fragment>
  );
}
