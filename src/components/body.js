import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";

const Body = ({ children }) => {
  const [displayChildren, setDisplayChildren] = useState(children);
  const controls = useAnimation();

  useEffect(() => {
    if (children !== displayChildren) {
      controls.start("fadeOut");
    }
  }, [children, displayChildren, controls]);

  useEffect(() => {
    controls.start("fadeIn");
  }, [controls]);

  return (
    <motion.main
      initial="fadeIn"
      animate={controls}
      exit="fadeOut"
      variants={{
        fadeIn: { opacity: 1 },
        fadeOut: { opacity: 0 },
      }}
      transition={{ duration: 0.1 }}
      onTransitionEnd={() => {
        if (controls.current === "fadeOut") {
          setDisplayChildren(children);
          controls.start("fadeIn");
        }
      }}
    >
      {displayChildren}
    </motion.main>
  );
};

export default Body;

