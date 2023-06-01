import React, { useState } from "react";
import {
  getUserProfile,
  setUpNewProfile,
  signInGoogleWithPopup,
} from "../../utils/firebase/firebase.utils";
import { Link, useNavigate } from "react-router-dom";
import {
  browserLocalPersistence,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
} from "firebase/auth";

const Login = ({ setCurrentUser }) => {
  const navigate = useNavigate();
  const [errorMessages, setErrorMessages] = useState("");
  const [remember, setRemember] = useState(true);
  const handleSubmitForm = async (e) => {
    e.preventDefault();
    console.log(e);

    const email = e.target.email.value;
    const password = e.target.password.value;

    console.log({ email, password });
    try {
      const { user } = await signInWithEmailAndPassword(
        getAuth(),
        email,
        password
      );
      setCurrentUser(user);
      if (remember) localStorage.setItem("user", JSON.stringify(user));
      navigate("/");
      setErrorMessages("");
    } catch (error) {
      setErrorMessages(error.message);
    }
  };

  return (
    <section className="">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[90vh] lg:py-0 bg-gradient-to-r from-emerald-500 to-sky-400">
        <div className="w-full bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
              Sign in to your account
            </h1>
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(e) => handleSubmitForm(e)}
            >
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300  sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="name@company.com"
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-white "
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-black sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required
                />
              </div>
              {
                <p className="text-red-400 font-bold text-xs italic">
                  {errorMessages}
                </p>
              }
              <div className="flex items-center justify-between">
                <div className="flex items-start">
                  <div className="flex items-center h-5">
                    <input
                      onChange={(e) => {
                        setRemember(!remember);
                      }}
                      aria-describedby="remember"
                      type="checkbox"
                      checked={remember}
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 "
                      required=""
                    />
                  </div>
                  <div className="ml-3 text-sm">
                    <label for="remember" className="text-white">
                      Remember me
                    </label>
                  </div>
                </div>
                <a
                  href="#"
                  className="text-sm font-medium text-primary-600 hover:underline hover:text-red-600"
                >
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 "
              >
                Sign in
              </button>
              <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p className="mx-4 mb-0 text-center font-semibold ">OR</p>
              </div>

              <button
                onClick={async () => {
                  try {
                    await signInGoogleWithPopup();
                    const auth = getAuth();
                    setCurrentUser(auth.currentUser);

                    localStorage.setItem(
                      "user",
                      JSON.stringify(auth.currentUser)
                    );

                    const profile = await getUserProfile(auth.currentUser);
                    if (!profile) {
                      await setUpNewProfile(
                        auth.currentUser,
                        auth.currentUser.displayName,
                        auth.currentUser.photoURL
                      );
                    }
                    navigate("/");
                  } catch (error) {}
                }}
                className="mb-3 flex w-full items-center justify-center rounded-lg bg-primary px-7 pb-2.5 pt-3 text-center text-sm font-medium  leading-normal text-gray-700 bg-white drop-shadow-lg hover:bg-[rgba(255,255,255,.75)] transition-bg duration-100 ease-in-out"
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="mr-2 h-3.5 w-3.5"
                  viewBox="0 0 186.69 190.5"
                  xmlnsV="https://vecta.io/nano"
                >
                  <g transform="translate(1184.583 765.171)">
                    <path
                      clip-path="none"
                      mask="none"
                      d="M-1089.333-687.239v36.888h51.262c-2.251 11.863-9.006 21.908-19.137 28.662l30.913 23.986c18.011-16.625 28.402-41.044 28.402-70.052 0-6.754-.606-13.249-1.732-19.483z"
                      fill="#4285f4"
                    />
                    <path
                      clip-path="none"
                      mask="none"
                      d="M-1142.714-651.791l-6.972 5.337-24.679 19.223h0c15.673 31.086 47.796 52.561 85.03 52.561 25.717 0 47.278-8.486 63.038-23.033l-30.913-23.986c-8.486 5.715-19.31 9.179-32.125 9.179-24.765 0-45.806-16.712-53.34-39.226z"
                      fill="#34a853"
                    />
                    <path
                      clip-path="none"
                      mask="none"
                      d="M-1174.365-712.61c-6.494 12.815-10.217 27.276-10.217 42.689s3.723 29.874 10.217 42.689c0 .086 31.693-24.592 31.693-24.592-1.905-5.715-3.031-11.776-3.031-18.098s1.126-12.383 3.031-18.098z"
                      fill="#fbbc05"
                    />
                    <path
                      d="M-1089.333-727.244c14.028 0 26.497 4.849 36.455 14.201l27.276-27.276c-16.539-15.413-38.013-24.852-63.731-24.852-37.234 0-69.359 21.388-85.032 52.561l31.692 24.592c7.533-22.514 28.575-39.226 53.34-39.226z"
                      fill="#ea4335"
                      clip-path="none"
                      mask="none"
                    />
                  </g>
                </svg>
                Continue with Goggle
              </button>
              <p className="text-sm font-light text-white">
                Don’t have an account yet?{" "}
                <Link
                  to={"/signup"}
                  className="font-medium text-primary-600 hover:underline hover:text-red-600"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
