import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { passwordCheckPattern } from "../../utils/regex/regex";
import {
  createNewUser,
  saveUser,
  setUpNewProfile,
} from "../../utils/firebase/firebase.utils";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";

const SignUp = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("ToanTran2010@!");

  const navigate = useNavigate();
  const [password, setPassword] = useState("ToanTran2010@!");

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isConfirmPasswordValid, setIsConfirmPasswordValid] = useState(true);
  const [isPasswordMatch, setIsPasswordMatch] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const signUpHandler = async (event) => {
    event.preventDefault();
    if (!isConfirmPasswordValid || !isPasswordValid) {
      return;
    }
    if (password !== confirmPassword) {
      setIsPasswordMatch(false);
      setErrorMessage("Password does not match");
      return;
    } else {
      setIsPasswordMatch(true);
    }
    try {
      const auth = getAuth();

      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      await setUpNewProfile(userCredential.user, name);
      saveUser(userCredential.user);
      navigate("/");
    } catch (error) {
      const errorMessage = error.message;
      console.log(errorMessage);
    }
  };

  return (
    <section class="">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-auto mt-[100px] lg:py-0">
        <div class="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Sign up your account
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              onSubmit={(e) => signUpHandler(e)}
            >
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Nguyen Van A"
                  required
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  required
                />
              </div>
              <div>
                {!isPasswordValid ? (
                  <p className="text-red-500 text-xs italic">
                    Password must be at least 8 characters, one uppercase, one
                    lowercase and one number
                  </p>
                ) : null}
                <label
                  for="password"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => {
                    const { value } = e.target;
                    setPassword(value);
                    setIsPasswordValid(passwordCheckPattern(value));
                  }}
                  id="password"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              <div>
                {!isConfirmPasswordValid ? (
                  <p className="text-red-500 text-xs italic">
                    Password must be at least 8 characters, one uppercase, one
                    lowercase and one number
                  </p>
                ) : null}

                <label
                  for="confirmPassword"
                  class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  onChange={(e) => {
                    const { value } = e.target;
                    setConfirmPassword(value);
                    const result = passwordCheckPattern(value);
                    setIsConfirmPasswordValid(result);
                  }}
                  value={confirmPassword}
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="••••••••"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required=""
                />
              </div>
              {isPasswordMatch ? null : (
                <p className="text-red-500 text-xs italic">{errorMessage}</p>
              )}
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Sign up
              </button>
              <div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p class="mx-4 mb-0 text-center font-semibold dark:text-neutral-200">
                  OR
                </p>
              </div>

              <p class="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have account?{" "}
                <Link
                  to={"/login"}
                  class="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
