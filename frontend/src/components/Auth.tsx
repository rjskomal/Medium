import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";
import type { SignupInput } from "@rjskomal/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Auth = ({ type }: { type: "signup" | "signin" }) => {
    const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name: "",
    email: "",
    password: ""
  });


  async function sendRequest() {
    await axios.post(`${BACKEND_URL}/api/v1/user/${type === 'signup' ? "signup" : "signin"}` , 
        postInputs).then((res) => {
      const jwt = res.data;
      console.log(jwt.jwt);
      localStorage.setItem("token", jwt.jwt);
      navigate("/blogs")
    }
    ).catch((err) => {
      alert("Error while signing up");
    }
    );
  }


  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6">
      <div className="w-full max-w-md text-left mb-6">
        <div className="text-3xl font-mono font-bold text-gray-900 mb-2">
          Bro...just do it. ✔
        </div>
        <div className="text-md font-mono text-gray-700">
          {type === "signin" ? "Not with us?" : "Already in the cult?"}
          <Link
            to={type === "signin" ? "/signup" : "/signin"}
            className="pl-2 text-blue-700 font-bold hover:text-blue-500 hover:underline"
          >
            {type === "signin" ? "Sign Up" : "Sign In"}
          </Link>
        </div>
      </div>

      <div className="w-full max-w-md">
        {type === "signup" ? <LabelledInput
          label="name"
          placeholder="Enter your name"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              name: e.target.value
            }));
          }}
        /> : null}
        <LabelledInput
          label="email"
          placeholder="eminem_sang_it@gmail.com"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              email: e.target.value
            }));
          }}
        />
        <LabelledInput
          label="Password"
          type="password"
          placeholder="Enter your password"
          onChange={(e) => {
            setPostInputs((c) => ({
              ...c,
              password: e.target.value
            }));
          }}
        />
      <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"> {type === "signup" ? "Sign Up" : "Sign In"}</button>
      </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  return (
    <div className="mb-5 w-full">
      <label className="block mb-2 text-sm font-medium text-gray-800">{label}</label>
      <input
        onChange={onChange}
        type={type || "text"}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-400
                   bg-gray-100 border border-gray-300 rounded-md shadow-sm
                   focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
  );
}
