import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";
import { GoogleLogin } from "@react-oauth/google";
import { FaLinkedinIn, FaGithub, FaMailBulk, FaApple } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();

  const [user, setuser] = useState({
    email: "",
    password: "",
    cpassword: "",
  });

  let name, value;

  const datainput = (event) => {
    name = event.target.name;
    value = event.target.value;

    setuser({ ...user, [name]: value });
  };

  const clicked = async (e) => {
    e.preventDefault();
    const { email, password, cpassword } = user;

    const res = await fetch("http://localhost:5000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
        cpassword,
      }),
    });
    // const data = await res.json();

    if (res.status === 422) {
      window.alert("invelid cradintial ");
      console.log("invelid cradintial ");
      console.log(res);
    } else {
      window.alert("registration successfull");
      console.log("registration successfull");
      navigate("/");
    }
  };

  // google login port
  const loginwithgoogle = async (credentialResponse) => {
    try {
      const decodecred = jwt_decode(credentialResponse.credential);
      const res = await fetch("http://localhost:5000/googlelogin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          email: decodecred.email,
          clientid: credentialResponse.clientId,
        }),
      });
      const data = await res.json();
      if (res.status === 400 || !data) {
        window.alert("invelid cradintial");
        console.log("invelid cradintial");
      } else {
        window.alert("loged in");
        console.log("loged in");
        navigate("/Dashboard");
      }
    } catch (error) {
      console.log("error");
    }
  };

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="col-span-1 font-bold bg-[#4285F4] text-white h-screen flex flex-col justify-center">
          <div className="p-10 text-3xl">Logo</div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <div className="text-center text-5xl">Board.</div>
          </div>
          <div className="flex justify-center text-4xl gap-4 mb-6">
            <a
              href="https://www.linkedin.com/in/nirbhay-verma-441695217/"
              className="text-white mx-2 hover:text-gray-300"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="https://github.com/i-nirbhay10"
              className="text-white mx-2 hover:text-gray-300"
            >
              <FaGithub />
            </a>
            <a
              href="mailto:nirbhayverma10@gmail.com"
              className="text-white mx-2 hover:text-gray-300"
            >
              <FaMailBulk />
            </a>
          </div>
        </div>

        {/* signup code */}

        <div className="col-span-1 h-screen bg-[#F8FAFF]">
          <div className="flex flex-col justify-center p-4 min-h-full mx-auto w-full sm:max-w-md">
            <div>
              <h2 className="mt-10 text-5xl font-semibold text-gray-900">
                Sign up
              </h2>
              <h2 className="mt-3 text-xl text-gray-900">
                Sign up to your account
              </h2>
              <div className="flex items-center justify-center justify-between gap-2 mt-5">
                <div className="flex items-center w-full py-2.5 text-sm rounded-xl">
                  <GoogleLogin
                    className="appearance-none"
                    onSuccess={(credentialResponse) => {
                      loginwithgoogle(credentialResponse);
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
                <div className="flex items-center w-full bg-white text-[#858585] p-1.5 text-md rounded border border-gray-250">
                  <FaApple className="mr-2" /> Sign in with Apple
                </div>
              </div>
            </div>
            <div className="bg-white-900 p-4">
              <form className="space-y-6" method="POST">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-lg font-medium text-gray-900"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      value={user.email}
                      onChange={datainput}
                      type="email"
                      autoComplete="off"
                      required
                      className="block w-full bg-[#EAEAEA] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="password"
                      name="password"
                      value={user.password}
                      onChange={datainput}
                      type="password"
                      autoComplete="off"
                      required
                      className="block w-full bg-[#EAEAEA] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="password"
                      className="block text-lg font-medium leading-6 text-gray-900"
                    >
                      Conform Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id="cpassword"
                      name="cpassword"
                      value={user.cpassword}
                      onChange={datainput}
                      type="password"
                      autoComplete="off"
                      required
                      className="block w-full bg-[#EAEAEA] rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
                <div className="text-xl">
                  <a
                    href="/"
                    className="font-semibold text-indigo-600 hover:text-indigo-500"
                  >
                    Forgot password?
                  </a>
                </div>

                <div>
                  <button
                    type="submit"
                    onClick={clicked}
                    className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#000000] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Sign in
                  </button>
                </div>
              </form>
            </div>
            <p className="mt-2 text-center text-xl text-gray-500">
              Already have an account?
              <Link
                to="/"
                className="font-semibold ml-2 text-indigo-600 hover:text-indigo-500"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>

        {/* signin code end */}
      </div>
    </>
  );
};
export default SignUp;
