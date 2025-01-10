import React from "react";

const Fotter = () => {
  return (
    <>
      <footer class="bg-primary text-lg-start position-fixed bottom-0 start-0 container-fluid">
        <div
          class="text-center text-white"
          style={{ backgroundColor: "rgba(0,0,0,0.2" }}
        >
          © 2021 Copyright:
          <a class="text-white mx-2" href="https://rajharsh.netlify.app/">
            CodeWithHarsh's
          </a>
        </div>
      </footer>
    </>
  );
};

export default Fotter;
