import React from "react";
import axios from "axios";
import { useState, useEffect} from "react";
const API_KEY = import.meta.env.VITE_API_KEY;
function Moderate() {
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  const [inputValue, setInputValue] = useState("");
  const [categories, setCategories] = useState([]);

  //moderation results via polling

  const [requestId, setRequestId] = useState(null);
  const [result, setResult] = useState(null);


  useEffect(() => {
  if (!requestId) return;

  const interval = setInterval(async () => {
    const done = await checkStatus(requestId);

    if (done) clearInterval(interval);
  }, 2000);

  return () => clearInterval(interval);
}, [requestId]);



  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const addCategory = () => {
    if (!inputValue.trim()) return;
    setCategories([...categories, inputValue.trim()]);
    setInputValue("");
  };

  const removeCategory = (index) => {
    setCategories(categories.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      window.alert("please select image first");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("image", image);
      formData.append("categories", JSON.stringify(categories));

      const response = await axios.post(
        "https://cortex-eight-rho.vercel.app/cortex/api/moderate",
        formData,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      );

      setRequestId(response.data.requestId);
      setResult(null);
    } catch (error) {
      console.error(error);
      alert("upload failed");
    } finally {
      setLoading(false);
    }
  };

  const checkStatus = async (id) => {
    try {
      const res = await axios.get(
        `https://cortex-eight-rho.vercel.app/cortex/api/moderation-status/${id}`,
        {
          headers: {
            Authorization: `Bearer ${API_KEY}`,
          },
        },
      );

      if (res.data.status !== "processing") {
        setResult(res.data);
        return true;
      }

      return false;
    } catch (err) {
      console.error(err);
      return false;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="relative w-full max-w-md bg-white shadow-lg rounded-2xl p-6 space-y-5"
      >
        {/* Category Input */}
        <div>
          <div className="flex gap-2">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="flex-1 border rounded-lg p-2"
              placeholder="Enter category"
            />
            <button
              type="button"
              onClick={addCategory}
              className="px-3 bg-black text-white rounded-lg"
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2 mt-2">
            {categories.map((c, i) => (
              <div
                key={i}
                className="bg-gray-200 px-3 py-1 rounded-full flex items-center gap-2"
              >
                {c}
                <button type="button" onClick={() => removeCategory(i)}>
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-800">Upload Image</h2>

        {/* Image Preview */}

        <div>
          {preview ? (
            <img src={preview} alt="" />
          ) : (
            <div>no image selected</div>
          )}
        </div>

        {/* Upload Button */}
        <label className="block">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <div className="cursor-pointer text-center py-2 px-4 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition">
            Select Image
          </div>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-2 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 disabled:bg-gray-400 transition"
        >
          Upload
        </button>

        <div>
          <h1>
            <div>
              {result && (
                <div
                  className={`mt-4 rounded-xl p-4 border ${
                    result.status === "image is accepted"
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        result.status === "image is accepted"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    ></div>

                    <h2
                      className={`font-semibold ${
                        result.status === "image is accepted"
                          ? "text-green-700"
                          : "text-red-700"
                      }`}
                    >
                      {result.status}
                    </h2>
                  </div>

                  {result.status !== "image is accepted" && (
                    <div className="mt-2 text-sm text-gray-700">
                      <span className="font-medium">Reason:</span>{" "}
                      {result.reason}
                    </div>
                  )}
                </div>
              )}
            </div>
          </h1>
        </div>

        {requestId && !result && (
  <div className="mt-4 text-yellow-600">
    Image is being analyzed...
  </div>
)}

        {/* Spinner Overlay */}
        {loading && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center rounded-2xl">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Moderate;
