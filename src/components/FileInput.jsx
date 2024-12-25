import React from "react";

function FileInput({ onChange, accept }) {
  return (
    <label className="relative cursor-pointer">
      <input
        type="file"
        accept={accept}
        onChange={onChange}
        className="hidden"
      />
      <span className="flex items-center justify-center inline-block justify-center py-1 px-1 bg-gray-900 text-white text-xs rounded-md shadow hover:bg-blue-600 focus:outline-none focus:bg-blue-600 focus:ring-2 focus:ring-blue-500">
        Upload Photo
      </span>
    </label>
  );
}

export default FileInput;
