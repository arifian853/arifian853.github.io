import { useState, useEffect } from 'react';
import { MdArrowDropUp } from 'react-icons/md';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    // Fungsi untuk memantau posisi scroll
    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Fungsi untuk menggulir ke atas
    const ScrollBtn = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        isVisible && (
            <button
                onClick={ScrollBtn}
                className=" bg-[#BABFBF] dark:bg-[#30323D] fixed bottom-8 right-5 p-3 rounded-full transition duration-300 w-12 h-12 flex justify-center items-center text-5xl z-[99] hover:border dark:border-zinc-300 border-black"
            >
                <MdArrowDropUp />
            </button>
        )
    );
};

export default ScrollToTopButton;
