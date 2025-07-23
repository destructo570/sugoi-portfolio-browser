"use client";
import { useState, useEffect, useRef } from "react";
import { HashLoader } from "react-spinners";


export default function Loader() {
  const [joke, setJoke] = useState("Fetching a dad joke...");
  const intervalRef = useRef(null);

  // Fetch a random dad joke
  const fetchJoke = async () => {
    try {
      const res = await fetch("https://icanhazdadjoke.com/", {
        headers: { Accept: "application/json" },
      });
      const data = await res.json();
      if(data?.joke){
          setJoke(data.joke);
      }else{
        setJoke("Couldn't fetch a joke... your dad is disappointed");
      }
    } catch {
      setJoke("Couldn't fetch a joke... your dad is disappointed");
    }
  };

useEffect(() => {
    // Clear any previous interval to avoid stacking
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    fetchJoke(); // First joke immediately

    // Start interval and store reference
    intervalRef.current = setInterval(fetchJoke, 4000);

    // Cleanup when component unmounts
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []); // Runs once when loader mounts

  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-white/30 dark:bg-zinc-900/30 p-6">
      <HashLoader color="#fff" 
        loading={true}
        aria-label="Loading Spinner"
        data-testid="loader"/>
      <p className="text-center text-gray-700 dark:text-zinc-300 max-w-md italic mt-8">“{joke}”</p>
    </div>
  );
}
