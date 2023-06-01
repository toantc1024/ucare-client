import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { passwordCheckPattern } from "../../utils/regex/regex";
import {
  createNewUser,
  saveUser,
  setUpNewProfile,
} from "../../utils/firebase/firebase.utils";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateProfile,
} from "firebase/auth";

const SignUp = ({ setCurrentUser }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();
  const [password, setPassword] = useState("");

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

      // Update name to user

      await updateProfile(auth.currentUser, {
        displayName: name,
        photoURL: `https://ui-avatars.com/api/?background=random&name=${name}`,
      });
      await setUpNewProfile(userCredential.user, name);
      saveUser(userCredential.user);
      setCurrentUser(userCredential.user);
      localStorage.setItem("user", JSON.stringify(userCredential.user));
      navigate("/");
    } catch (error) {
      setErrorMessage(error.message);
      console.log(errorMessage);
    }
  };

  return (
    <section class="">
      <div class="flex flex-col items-center justify-center px-6 py-8 mx-auto h-[90vh] lg:py-0 bg-gradient-to-r from-emerald-500 to-sky-400">
        <div class="w-full bg-white bg-opacity-20 backdrop-blur-lg rounded drop-shadow-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div class="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 class="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
              Sign up your account
            </h1>
            <form
              class="space-y-4 md:space-y-6"
              onSubmit={(e) => signUpHandler(e)}
            >
              <div>
                <label
                  for="name"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Your name
                </label>
                <input
                  type="text"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  id="name"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  placeholder="Nguyen Van A"
                  required
                />
              </div>
              <div>
                <label
                  for="email"
                  class="block mb-2 text-sm font-medium text-white"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
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
                  class="block mb-2 text-sm font-medium text-white"
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
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
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
                  class="block mb-2 text-sm font-medium text-white"
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
                  class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 "
                  required=""
                />
              </div>
              {<p className="text-red-500 text-xs italic">{errorMessage}</p>}

              {isPasswordMatch ? null : (
                <p className="text-red-500 text-xs italic">{errorMessage}</p>
              )}
              <button
                type="submit"
                class="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Sign up
              </button>
              <div class="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                <p class="mx-4 mb-0 text-center font-semibold">OR</p>
              </div>

              <p class="text-sm font-light text-white">
                Already have account?{" "}
                <Link
                  to={"/login"}
                  class="font-medium hover:underline text-primary-600 hover:text-red-600"
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
