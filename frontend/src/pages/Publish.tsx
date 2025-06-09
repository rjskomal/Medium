import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { BACKEND_URL } from "../config";

interface BlogInput {
  title: string;
  content: string;
}

export const Publish = () => {
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<BlogInput>({
    title: "",
    content: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  async function sendRequest() {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.post(
        `${BACKEND_URL}/api/v1/blog`,
        postInputs,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );

      const blogId = res.data.id;
      navigate(`/blog/${blogId}`);
    } catch (err) {
      alert("❌ Error while publishing blog. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="">
    <div className="border-b flex justify-between px-10 bg-gray-900 text-gray-300 p-5 text-bold text-xl font-mono">
        <Link to={'/blogs'}>
        <div>
            {`Run time terror`} <br  />
            {`⬅`} 
        </div>
        </Link>
    </div>
    <div className="bg-gray-300 min-h-screen flex flex-col items-center justify-center  px-6">
      <div className="w-full max-w-md text-left mb-6">
        <div className="text-3xl font-mono font-bold text-gray-900 mb-2">
          Share your thoughts
        </div>
        <div className="text-md font-mono text-gray-700">
          Pour your heart into words and publish your blog.
        </div>
      </div>

      <div className="w-full max-w-md">
        <LabelledInput
          label="Title"
          placeholder="What's the blog title?"
          onChange={(e) =>
            setPostInputs((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <LabelledInput
          label="Content"
          placeholder="Type your story here..."
          onChange={(e) =>
            setPostInputs((prev) => ({ ...prev, content: e.target.value }))
          }
        />
        <button
          onClick={sendRequest}
          type="button"
          disabled={isLoading}
          className={`w-full text-white font-medium rounded-lg text-sm px-5 py-2.5 mt-4 
                      ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300'}`}
        >
          {isLoading ? "Publishing..." : "Publish Blog"}
        </button>
      </div>
    </div>
    </div>
  );
};

interface LabelledInputType {
  label: string;
  placeholder: string;
  onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  type?: string;
}

function LabelledInput({ label, placeholder, onChange, type }: LabelledInputType) {
  const isTextarea = label.toLowerCase() === "content";

  return (
    <div className="mb-5 w-full">
      <label className="block mb-2 text-sm font-medium text-gray-800">{label}</label>
      {isTextarea ? (
        <textarea
          onChange={onChange}
          placeholder={placeholder}
          rows={6}
          required
          className="w-full px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-400
                     bg-gray-100 border border-gray-300 rounded-md shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition resize-none"
        />
      ) : (
        <input
          onChange={onChange}
          type={type || "text"}
          placeholder={placeholder}
          required
          className="w-full px-4 py-3 text-sm font-mono text-gray-900 placeholder-gray-400
                     bg-gray-100 border border-gray-300 rounded-md shadow-sm
                     focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
        />
      )}
    </div>
  );
}
