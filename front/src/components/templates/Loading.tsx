import React from "react";

export const Loading = () => {
  return (
    <main className="loading flex justify-center items-center ">
      <div className=" bg-app-primary rounded-full w-8 h-8 mx-2 animate-bounce"></div>
      <div className=" bg-app-primary rounded-full w-8 h-8 mx-2 animate-bounce delay-100"></div>
      <div className=" bg-app-primary rounded-full w-8 h-8 mx-2 animate-bounce delay-200"></div>
    </main>
  );
};
