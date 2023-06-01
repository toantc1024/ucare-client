import React, { useEffect, useState } from "react";
import { db } from "../../utils/firebase/firebase.utils";

import FitModal from "../../components/fitness/modal";
import { doc, onSnapshot } from "firebase/firestore";
import "draft-js/dist/Draft.css";
import { Editor, EditorState, convertFromHTML, ContentState } from "draft-js";

const Fitness = ({ user }) => {
  const [showModal, setShowModal] = useState(false);

  const [loading, setLoading] = useState(true);

  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const editor = React.useRef(null);
  function focusEditor() {
    editor.current.focus();
  }

  useEffect(() => {
    if (!user) {
      return;
    }

    const unsub = onSnapshot(
      doc(db, "users", user.uid),
      { includeMetadataChanges: true },
      async (doc) => {
        setLoading(true);
        const workList = (await doc.data().workout) || "";
        const blocksFromHTML = convertFromHTML(workList);
        const state = ContentState.createFromBlockArray(
          blocksFromHTML.contentBlocks,
          blocksFromHTML.entityMap
        );
        setLoading(false);
        setEditorState(EditorState.createWithContent(state));
      }
    );
  }, [user]);

  return (
    <div className="w-full h-full flex flex-col text-white bg-gradient-to-b from-emerald-400 to-emerald-400">
      <div className="flex w-full font-extrabold text-5xl justify-center mt-8 py-4 font-extrabold text-transparent text-4xl  text-white   bg-gradient-to-b from-emerald-400 to-emerald-400 relative">
        WhaleFit
        <div className="absolute bottom-0 right-20 text-4xl bg-white shadow-lg rounded-full border w-20 h-20 flex items-center justify-center hover:scale-[1.2] transition-all ease-in-out duration-200 cursor-pointer">
          💪
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 m-4">
        <div
          className="col-span-full mt-4 flex w-full   p-4 bg-white border border-gray-200 
      rounded-lg shadow flex items-center justify-center gap-4 "
        >
          <div
            class="group bg-emerald-500  min-w-[94px] cursor-pointer rounded-lg h-28 drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-emerald-600 duration-150 transition-background ease-in-out rounded-full"
            tabindex="0"
            onClick={() => setShowModal(true)}
          >
            <div class="w-10 h-10 rounded-full shadow-lg bg-emerald-300 group-hover:bg-white flex items-center justify-center font-bold ">
              <span className="text-white group-hover:text-emerald-900 duration-150  transition-text ease-in-out">
                🐱‍🏍
              </span>
            </div>
            <p class="text-sm text-white group-hover:text-white text-white font-bold">
              Workout
            </p>
          </div>
          <div
            class="group bg-emerald-500  min-w-[94px] cursor-pointer rounded-lg h-28 drop-shadow-xl flex flex-col gap-3 items-center justify-center hover:bg-emerald-600 duration-150 transition-background ease-in-out rounded-full"
            tabindex="0"
          >
            <div class="w-10 h-10 rounded-full shadow-lg bg-emerald-400 group-hover:bg-white flex items-center justify-center font-bold ">
              <span className="text-white group-hover:text-emerald-900 duration-150  transition-text ease-in-out">
                💪
              </span>
            </div>
            <p class="text-sm text-white group-hover:text-white text-white font-bold">
              Filter
            </p>
          </div>
        </div>
      </div>

      <div className="h-full w-auto max-h-[calc(100%-20rem)] m-4 mt-0 rounded-lg bg-emerald-500 text-white ">
        {loading ? (
          <div className="flex items-center justify-center h-full">
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
          </div>
        ) : (
          <div
            className=" overflow-y-auto ml-2 text-green-900"
            style={{
              maxHeight: "100%",
              minHeight: "6em",
              cursor: "text",
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
      </div>

      <FitModal
        showModal={showModal}
        user={user}
        setShowModal={(value) => setShowModal(value)}
      />
    </div>
  );
};

export default Fitness;
