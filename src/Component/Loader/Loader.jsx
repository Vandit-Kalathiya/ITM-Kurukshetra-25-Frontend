import React from "react";
import { FaLeaf } from "react-icons/fa";

const Loader = () => {
  return (
    <div className="flex flex-col items-center space-y-4 p-6 rounded-2xl">
      <div className="relative w-10 h-10">
        <FaLeaf
          className="absolute top-0 left-0 w-full h-full text-green-600 animate-spin"
          style={{ animationDuration: "1.5s" }}
        />
        <FaLeaf
          className="absolute top-0 left-0 w-full h-full text-green-500 animate-[spin_1.5s_linear_infinite_reverse]"
        />
      </div>
    </div>
  );
};

export default Loader;