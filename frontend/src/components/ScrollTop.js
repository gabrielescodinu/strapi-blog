import React, { useState, useEffect } from 'react';

function ScrollTop() {
    const [isScrolled, setIsScrolled] = useState(false);

    const checkScroll = () => {
        setIsScrolled(window.scrollY > 200);
    };

    useEffect(() => {
        window.addEventListener('scroll', checkScroll);
        return () => {
            window.removeEventListener('scroll', checkScroll);
        };
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div
            id="scroll-top"
            className={`fixed bottom-4 right-8 z-20 transition-opacity duration-300 flex flex-col items-center justify-center w-12 h-12 mb-4 rounded-full bg-gray-200 hover:bg-gray-400 cursor-pointer shadow-lg ${isScrolled ? 'opacity-100' : 'opacity-0'}`}
            onClick={scrollToTop}
        >
            <svg
                className="w-8 h-8 text-[#FA2200]"
                stroke="currentColor"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                width="48"
            >
                <path fill="currentColor" d="m283-345-43-43 240-240 240 239-43 43-197-197-197 198Z" />
            </svg>
        </div>
    );
}

export default ScrollTop;
