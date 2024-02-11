import Header from "./Header";
import {useEffect, useState} from "react";
import {ToastContainer} from "react-toastify";

const Layout = ({ children }) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const [transitionStage, setTransitionStage] = useState("fadeOut");
  const [isDesktop, setIsDesktop] = useState(true);

  const updateIsDesktop = () => {
    setIsDesktop(window.innerWidth > 768);
  };

  useEffect(() => {
    setTransitionStage("fadeIn");
  }, []);

  useEffect(() => {
    if (children !== displayChildren) setTransitionStage("fadeOut");
  }, [children, setDisplayChildren, displayChildren]);

  useEffect(() => {
    // Update isDesktop state when the component mounts
    updateIsDesktop();
    // Add an event listener to update isDesktop state on window resize
    window.addEventListener("resize", updateIsDesktop);

    return () => {
      // Remove the event listener when the component unmounts
      window.removeEventListener("resize", updateIsDesktop);
    };
  }, []);

  return (
    <>
      <ToastContainer/>
      <Header isDesktop={isDesktop}/>
      {isDesktop ? (
      <main
        onTransitionEnd={() => {
          if (transitionStage === "fadeOut") {
            console.log("fading out");
            setDisplayChildren(children);
            setTransitionStage("fadeIn");
          }
        }}
        className={`content ${transitionStage}`}
      >
        {displayChildren}
      </main>
      ) : (
        <div className="flex items-center justify-center my-20 mx-4 overflow-hidden">
          <p className="text-2xl text-center">Please view this page on a desktop or laptop for the best experience.</p>
        </div>
      )}
    </>
  );
};

export default Layout;
