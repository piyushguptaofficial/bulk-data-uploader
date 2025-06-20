import React, { useState } from "react";
import axios from "axios";
import Papa from "papaparse";
import toast from "react-hot-toast";

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("");
  const [uploadedData, setUploadedData] = useState([]);
  const [fileList, setFileList] = useState([]);

  const handleChange = (e) => {
    if (e.target.files) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);
      setMessage("");
      setUploadedData([]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file first.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:5000/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round((progressEvent.loaded * 100) / (progressEvent.total || 1));
          setProgress(percent);
        },
      });

      setUploadedData(res.data.data || []);
      setMessage(`✅ ${res.data.message}`);
      setFileList((prev) => [...prev, file.name]);
      toast.success("File uploaded successfully!");
    } catch (err) {
      setMessage("❌ File upload failed");
      toast.error("Upload failed!");
      console.error(err);
    }
  };

  const handleDownload = () => {
    if (!uploadedData.length) return;
    const csv = Papa.unparse(uploadedData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "data.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {/* Upload box */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 space-y-4">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">📤 Upload Your CSV/XLSX</h2>
        <input
          type="file"
          accept=".csv, .xlsx"
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
        />

        <button
          onClick={handleUpload}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded transition duration-300"
        >
          ⬆️ Upload File
        </button>

        {progress > 0 && (
          <div className="space-y-1">
            <p className="text-sm text-gray-600 dark:text-gray-300">Progress: {progress}%</p>
            <div className="w-full bg-gray-300 dark:bg-gray-600 rounded-full h-2.5">
              <div
                className="bg-green-500 h-full rounded-full transition-all duration-500"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        )}

        {message && (
          <p
            className={`font-medium ${
              message.startsWith("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </p>
        )}
      </div>

      {/* Uploaded Files List */}
      {fileList.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h4 className="font-semibold text-gray-700 dark:text-gray-100">📁 Uploaded Files</h4>
          <ul className="list-disc ml-5 text-sm text-gray-700 dark:text-gray-300">
            {fileList.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Data Table */}
      {uploadedData.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-2">📄 Uploaded Data</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300 dark:border-gray-600">
              <thead>
                <tr className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                  {Object.keys(uploadedData[0]).map((key) => (
                    <th key={key} className="px-4 py-2 border">{key}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {uploadedData.map((row, idx) => (
                  <tr key={idx} className="border-t border-gray-300 dark:border-gray-600">
                    {Object.values(row).map((val, i) => (
                      <td key={i} className="px-4 py-2 border">{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={handleDownload}
            className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded transition"
          >
            ⬇️ Download CSV
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
