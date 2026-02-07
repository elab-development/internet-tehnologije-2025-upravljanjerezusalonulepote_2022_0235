import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "./Loader";

export default function PageTransitionWrapper({ children }) {
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const triggerTransition = (path) => {
    setLoading(true); 
    setTimeout(() => {
      navigate(path); 
      setLoading(false); 
    }, 800);
  };

  return (
    <>
      {loading && <Loader />}
      {children({
        triggerTransition
      })}
    </>
  );
}
