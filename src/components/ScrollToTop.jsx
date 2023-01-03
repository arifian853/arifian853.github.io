import React, { useEffect, useState } from 'react';
import { RxDoubleArrowUp } from "react-icons/rx";

export const ScrollToTop = () => {

  const [isVisible, setVisibility] = useState(false);

  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        setVisibility(true);
      } else {
        setVisibility(false);
      }
    });
  }, []);


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };


  return (
    <>
      {
        isVisible && (
          <button className="scroll-to-top-btn shadow-md" onClick={scrollToTop}> <RxDoubleArrowUp /> </button>
        )
      }
    </>
  )
}