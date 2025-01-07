"use client";

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Anim } from "@/types/anim.i";
import { useInView } from "react-intersection-observer";

export const RevealLRLR = ({ children }: Anim) => {
  const { ref: inViewRef, inView } = useInView({
    threshold: 0.1,
  });

  const mainControls = useAnimation();
  const slideControls = useAnimation();

  useEffect(() => {
    if (inView) {
      mainControls.start("visible");
    } else {
      mainControls.start("hidden");
    }
  }, [inView, mainControls, slideControls]);

  return (
    <motion.div
      ref={inViewRef}
      animate={mainControls}
      initial="hidden"
      variants={{
        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
        hidden: { opacity: 0, x: -75, transition: { duration: 0.5 } },
      }}
      style={{ overflow: "hidden" }}
    >
      {children}
    </motion.div>
    // <div
    //   ref={inViewRef}
    //   style={{ position: "relative", width, overflow: "hidden" }}
    // >
    //   <motion.div
    //     variants={{
    //       visible: { opacity: 1, x: 0, transition: { duration: 0.25 } },
    //       hidden: { opacity: 0, x: -75, transition: { duration: 0.25 } },
    //     }}
    //     initial="hidden"
    //     animate={mainControls}
    //     exit="exit"
    //     transition={{
    //       x: { type: "spring", stiffness: 300, damping: 30 },
    //       opacity: { duration: 0.5 },
    //     }}
    //   >
    //     {children}
    //   </motion.div>
    /* <motion.div
        variants={{
          hidden: { left: 0 },
          visible: { left: "100%" },
        }}
        initial="hidden"
        animate={slideControls}
        transition={{ duration: 0.5, ease: "easeInOut" }}
        className="absolute top-4 bottom-4 left-0 right-0 z-20 bg-transparent"
      /> */
    // </div>
  );
};

export const RevealLRUp = ({ children }: Anim) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        hidden: { opacity: 0, y: 75, transition: { duration: 0.5 } },
      }}
    >
      {children}
    </motion.div>
  );
};

export const RevealLRDown = ({ children }: Anim) => {};
