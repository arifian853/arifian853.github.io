import { useEffect, useState } from "react";

const words = [
    `console.log('Hello World!');`,
    `print('Hello World!')`,
    `printf('Hello World!');`,
    'cout << "Hello World!";',
  ]
  
  const getProgramGreetings = () => {
    const randomIndex = Math.floor(Math.random() * words.length);
    return words[randomIndex];
  }

export const Divider = () => {
    const [programGreetings, setprogramGreetings] = useState(getProgramGreetings());

    useEffect(() => {
      const intervalId = setInterval(() => {
        setprogramGreetings(getProgramGreetings());
      }, 700); 
  
      return () => clearInterval(intervalId);
    }, []);

    
    return (
        <div className="my-4 p-2 bg-black w-full font-mono text-center rounded-md">
            <span data-aos="zoom-out" className='text-[#E0E0E0]'> {programGreetings} </span>
        </div>
    )
}
