import React, { useEffect, useState } from "react";
import { getUserProfile } from "../../utils/firebase/firebase.utils";

const Profile = ({ user }) => {
  return (
    <div className="flex w-full h-[75vh] items-center justify-center gap-2">
      <div className="flex items-start flex-col justify-center border-[1px] gap-2 border-black py-8 px-4 rounded-lg font-bold">
        <h1 className="text-center w-full text-sky-900 text-xl mb-4">
          User Profile
        </h1>
        <div className="flex flex-row items-center w-full justify-center gap-2">
          <img src={user?.photoURL} className="rounded-full" alt="" />
        </div>

        <div
          className="
        bg-slate-100  p-2 rounded-full
        flex flex-row gap-2 w-full"
        >
          <h1 className="bg-yellow-200 text-yellow-900 p-2 rounded-full">
            Email
          </h1>
          <h1 className=" text-yellow-900 p-2 rounded-full">{user?.email}</h1>
        </div>

        <div
          className="w-full bg-slate-100  p-2 rounded-full
        flex flex-row gap-2"
        >
          <h1 className="bg-emerald-200 text-emerald-900 p-2 rounded-full">
            Full name
          </h1>
          <h1 className=" text-emerald-900 p-2 rounded-full">
            {user?.displayName}
          </h1>
        </div>

        <div
          className=" w-full
        bg-slate-100  p-2 rounded-full
        flex flex-row gap-2 "
        >
          <h1 className="bg-blue-200 text-sky-900 p-2 rounded-full">
            Health Insurance ID
          </h1>
          <h1 className=" text-sky-900 p-2 rounded-full">WEBDEVADVANTURE23</h1>
        </div>
      </div>
    </div>
  );
};

export default Profile;
