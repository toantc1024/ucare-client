import React from "react";

const Login = () => {
  return (
    <div className="min-h-100 p-10 bg-orange-400">
      <form className="h-100 flex items-center  flex-col gap-2 bg-red-200 p-4">
        <div className="h-100 flex flex-col gap-2 bg-sky-400 p-4 rounded-xl">
          <label htmlFor="loginEmail">Email</label>
          <input
            name="loginEmail"
            className="p-2 rounded-lg"
            placeholder="Email"
            type="text"
          />
        </div>
        <div className="flex flex-col gap-2 bg-sky-400 p-4 rounded-xl">
          <label htmlFor="loginPassword">Password</label>
          <input
            name="loginPassword"
            className="p-2 rounded-lg"
            placeholder="Password"
            type="password"
          />
        </div>
      </form>
    </div>
  );
};

export default Login;
