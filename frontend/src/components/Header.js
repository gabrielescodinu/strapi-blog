import React from 'react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';

function Header() {
    // menu and hamburger animation
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleHamburgerClick = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleCloseMenu = () => {
        if (isMenuOpen) {
            setIsMenuOpen(false);
        }
    };

    // search panel animation
    const [search, setSearch] = useState("");
    const [isSearchOpen, setSearchOpen] = useState(false);

    const handleSearchClick = () => {
        setSearchOpen(!isSearchOpen);
    };

    const handleCloseClick = () => {
        setSearchOpen(false);
    };

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    // articles
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await axios.get(`http://localhost:1337/api/articolos?populate=*&filters[Title][$containsi]=${search}`);
                setArticles(response.data.data);
            } catch (err) {
                console.error(err);
            }
        };

        if (search) {
            fetchArticles();
        } else {
            setArticles([]);
        }
    }, [search]);

    return (
        <header>
            {/* search panel */}
            <div className={`-m-8 search-panel origin-bottom transform transition-transform duration-300 w-screen h-screen fixed bg-gray-400/[.95] z-40 flex flex-col justify-center lg:px-60 ${isSearchOpen ? 'translate-y-0' : 'translate-y-full'}`} >
                <div className="w-full h-full absolute text-center" onClick={handleCloseClick} ></div>
                <form className="max-w-screen-xl px-4 sm:px-6 z-50 mx-auto w-full">
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input type="text" value={search} onChange={handleSearchChange} id="default-search" className="block w-full p-4 pl-10 text-sm text-gray-700 border-none shadow-2xl bg-gray-200/[.85] focus:outline-none focus:!ring-transparent focus:!border-transparent" placeholder="" required />
                        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
                            {articles.slice(0, 3).map((article) => (
                                <div key={article.id} className='mt-4' onClick={handleCloseClick}>
                                    <figure className="group" onClick={handleCloseMenu}>
                                        <Link to={`/article/${article.id}`}>
                                            <div className="group relative flex h-20 lg:h-40 items-end overflow-hidden shadow-lg">
                                                <img
                                                    src={`http://localhost:1337${article.attributes.Cover?.data?.attributes?.url}`}
                                                    loading="lazy"
                                                    alt="Article Cover"
                                                    className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-110"
                                                />
                                            </div>
                                            <p className="inline-block text-[10px] font-semibold tracking-wider text-[#FA2200] uppercase rounded-full bg-teal-accent-400"> {article.attributes.category?.data?.attributes?.Title || ''} </p>
                                            <p className="mt-2 text-lg font-medium leading-6 text-gray-700"> {article.attributes.Title} </p>
                                            <div className="flex gap-3 mt-4 justify-left">
                                                <div className="inline-flex items-center justify-center text-sm font-semibold text-gray-800 duration-200 group-hover:text-[#FA2200] focus:outline-none focus-visible:outline-gray-600">
                                                    <span> Read more </span>
                                                    <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                                                        <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path>
                                                    </svg>
                                                </div>
                                            </div>
                                        </Link>
                                    </figure>
                                </div>
                            ))}
                        </div>
                    </div>
                </form>
            </div>
            
            {/* mobile menu */}
            <div
                id="menu-mobile"
                className={`menu-mobile-class -m-8 p-8 fixed w-screen h-screen bg-gray-800/[.85] z-20 transform transition-transform duration-300 flex flex-col justify-center 
                ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <ul className="space-y-8 text-base">
                    <li><Link to="/"><div aria-label="Our product" title="Our product" className="font-medium tracking-wide text-[#FA2200] transition-colors duration-200 hover:text-[#FA2200]">Home</div></Link></li>
                    <li><Link to="/page/about-us"><div aria-label="Our product" title="Our product" className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-[#FA2200]">Product</div></Link></li>
                    <li><Link to="/categories"><div aria-label="Our product" title="Our product" className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-[#FA2200]">Features</div></Link></li>
                    <li><Link to="/privacy"><div aria-label="Product pricing" title="Product pricing" className="font-medium tracking-wide text-gray-100 transition-colors duration-200 hover:text-[#FA2200]">Pricing</div></Link></li>
                </ul>
                <ul className="space-y-8 mt-8">
                    <li>
                        <button onClick={handleSearchClick} className="search-button inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 shadow-md bg-[#FA2200] hover:bg-gray-500" aria-label="Search" title="Search"> Search </button>
                    </li>
                </ul>
            </div>

            {/* desktop menu */}
            <nav>
                <nav className="z-30 relative max-w-screen-xl  mx-auto text-gray-500 md:px-8">
                    <div className="flex justify-between items-center absolute w-full left-0 lg:px-8">
                        <Link to="/">
                            <div className="z-30"><svg id="logo-87" width="202" height="40" viewBox="0 0 202 40" fill="#FA2200" xmlns="http://www.w3.org/2000/svg">
                                <path className="" fillRule="evenodd" clipRule="evenodd" d="M25.5557 11.6853C23.9112 10.5865 21.9778 10 20 10V0C23.9556 0 27.8224 1.17298 31.1114 3.37061C34.4004 5.56823 36.9638 8.69181 38.4776 12.3463C39.9913 16.0008 40.3874 20.0222 39.6157 23.9018C38.844 27.7814 36.9392 31.3451 34.1421 34.1421C31.3451 36.9392 27.7814 38.844 23.9018 39.6157C20.0222 40.3874 16.0008 39.9913 12.3463 38.4776C8.6918 36.9638 5.56823 34.4004 3.37061 31.1114C1.17298 27.8224 0 23.9556 0 20H10C10 21.9778 10.5865 23.9112 11.6853 25.5557C12.7841 27.2002 14.3459 28.4819 16.1732 29.2388C18.0004 29.9957 20.0111 30.1937 21.9509 29.8078C23.8907 29.422 25.6725 28.4696 27.0711 27.0711C28.4696 25.6725 29.422 23.8907 29.8078 21.9509C30.1937 20.0111 29.9957 18.0004 29.2388 16.1732C28.4819 14.3459 27.2002 12.7841 25.5557 11.6853Z" fill="#71717a"></path>
                                <path className="ccustom" fillRule="evenodd" clipRule="evenodd" d="M10 1.47023e-06C10 1.31322 9.74135 2.61358 9.2388 3.82684C8.73625 5.04009 7.99966 6.14248 7.07107 7.07107C6.14249 7.99966 5.0401 8.73625 3.82684 9.2388C2.61358 9.74134 1.31322 10 6.15916e-06 10L5.72205e-06 20C2.62644 20 5.22716 19.4827 7.65368 18.4776C10.0802 17.4725 12.285 15.9993 14.1421 14.1421C15.9993 12.285 17.4725 10.0802 18.4776 7.65367C19.4827 5.22715 20 2.62643 20 -3.8147e-06L10 1.47023e-06Z" fill="#FA2200"></path>
                                <path className="ccustom" d="M125.619 14.4525H120.767V29.8648H125.619V14.4525Z" fill="#71717a"></path>
                                <path className="ccustom" d="M121.307 11.5666C121.814 12.074 122.448 12.3277 123.209 12.3277C123.97 12.3277 124.594 12.074 125.08 11.5666C125.567 11.0381 125.81 10.4038 125.81 9.66385C125.81 8.90277 125.567 8.26849 125.08 7.76111C124.594 7.25369 123.97 7 123.209 7C122.448 7 121.814 7.25369 121.307 7.76111C120.82 8.26849 120.577 8.90277 120.577 9.66385C120.577 10.4038 120.82 11.0381 121.307 11.5666Z" fill="#71717a"></path>
                                <path className="ccustom" d="M51.1562 29.8648V7.47568H56.1351V25.4885H66.0612V29.8648H51.1562Z" fill="#71717a"></path>
                                <path className="ccustom" fillRule="evenodd" clipRule="evenodd" d="M75.0274 30.2136C73.4418 30.2136 72.0042 29.8648 70.7145 29.1671C69.446 28.4483 68.4418 27.4758 67.7018 26.2495C66.9619 25.0233 66.5919 23.6491 66.5919 22.1269C66.5919 20.6047 66.9619 19.2411 67.7018 18.036C68.4418 16.8309 69.446 15.8795 70.7145 15.1819C71.983 14.463 73.4207 14.1036 75.0274 14.1036C76.6342 14.1036 78.0718 14.4525 79.3403 15.1501C80.6088 15.8478 81.6131 16.8098 82.353 18.036C83.093 19.2411 83.463 20.6047 83.463 22.1269C83.463 23.6491 83.093 25.0233 82.353 26.2495C81.6131 27.4758 80.6088 28.4483 79.3403 29.1671C78.0718 29.8648 76.6342 30.2136 75.0274 30.2136ZM75.0274 25.8056C75.7251 25.8056 76.3382 25.6576 76.8668 25.3616C77.3953 25.0445 77.797 24.6111 78.0718 24.0614C78.3678 23.4906 78.5158 22.8457 78.5158 22.1269C78.5158 21.4081 78.3678 20.7844 78.0718 20.2559C77.7758 19.7062 77.3636 19.2834 76.835 18.9874C76.3276 18.6702 75.7251 18.5117 75.0274 18.5117C74.3509 18.5117 73.7484 18.6702 73.2198 18.9874C72.6913 19.2834 72.279 19.7062 71.983 20.2559C71.687 20.8056 71.5391 21.4398 71.5391 22.1586C71.5391 22.8563 71.687 23.4906 71.983 24.0614C72.279 24.6111 72.6913 25.0445 73.2198 25.3616C73.7484 25.6576 74.3509 25.8056 75.0274 25.8056Z" fill="#71717a"></path>
                                <path className="ccustom" fillRule="evenodd" clipRule="evenodd" d="M87.3057 35.8902C88.5953 36.4821 90.0858 36.7781 91.7772 36.7781C93.4262 36.7781 94.8956 36.4504 96.1852 35.795C97.4749 35.1396 98.4896 34.2306 99.2296 33.0678C99.9695 31.905 100.34 30.5308 100.34 28.9451V14.4525H95.5826V15.488C95.2288 15.1902 94.827 14.9402 94.3776 14.7379C93.553 14.3362 92.6122 14.1353 91.5552 14.1353C90.1387 14.1353 88.8807 14.4736 87.7814 15.1501C86.6819 15.8055 85.8152 16.7146 85.1809 17.8774C84.5466 19.0191 84.2296 20.3087 84.2296 21.7464C84.2296 23.1629 84.5466 24.4525 85.1809 25.6153C85.8152 26.7781 86.6819 27.6978 87.7814 28.3743C88.8807 29.0508 90.1387 29.3891 91.5552 29.3891C92.5911 29.3891 93.5319 29.1883 94.3776 28.7866C94.7872 28.592 95.1572 28.3627 95.4875 28.0986V29.072C95.4875 30.1502 95.1387 30.9853 94.441 31.5773C93.7645 32.1693 92.8237 32.4652 91.6186 32.4652C90.6461 32.4652 89.811 32.2961 89.1133 31.9578C88.4368 31.6196 87.8236 31.1227 87.2739 30.4673L84.293 33.4483C85.0329 34.5054 86.0372 35.3194 87.3057 35.8902ZM94.219 24.6322C93.7327 24.9282 93.1514 25.0762 92.4748 25.0762C91.7983 25.0762 91.2063 24.9282 90.6989 24.6322C90.2126 24.3362 89.8321 23.9345 89.5573 23.4271C89.2824 22.8986 89.145 22.3383 89.145 21.7464C89.145 21.1121 89.2824 20.5413 89.5573 20.0339C89.8321 19.5265 90.2232 19.1248 90.7306 18.8288C91.238 18.5328 91.8194 18.3848 92.4748 18.3848C93.1514 18.3848 93.7327 18.5328 94.219 18.8288C94.7264 19.1248 95.1069 19.5265 95.3607 20.0339C95.6355 20.5413 95.7729 21.1121 95.7729 21.7464C95.7729 22.3806 95.6355 22.9514 95.3607 23.4588C95.1069 23.9451 94.7264 24.3362 94.219 24.6322Z" fill="#71717a"></path>
                                <path className="ccustom" fillRule="evenodd" clipRule="evenodd" d="M110.551 30.2136C108.965 30.2136 107.527 29.8648 106.238 29.1671C104.969 28.4483 103.965 27.4758 103.225 26.2495C102.485 25.0233 102.115 23.6491 102.115 22.1269C102.115 20.6047 102.485 19.2411 103.225 18.036C103.965 16.8309 104.969 15.8795 106.238 15.1819C107.506 14.463 108.944 14.1036 110.551 14.1036C112.157 14.1036 113.595 14.4525 114.863 15.1501C116.132 15.8478 117.136 16.8098 117.876 18.036C118.616 19.2411 118.986 20.6047 118.986 22.1269C118.986 23.6491 118.616 25.0233 117.876 26.2495C117.136 27.4758 116.132 28.4483 114.863 29.1671C113.595 29.8648 112.157 30.2136 110.551 30.2136ZM110.551 25.8056C111.248 25.8056 111.861 25.6576 112.39 25.3616C112.918 25.0445 113.32 24.6111 113.595 24.0614C113.891 23.4906 114.039 22.8457 114.039 22.1269C114.039 21.4081 113.891 20.7844 113.595 20.2559C113.299 19.7062 112.887 19.2834 112.358 18.9874C111.851 18.6702 111.248 18.5117 110.551 18.5117C109.874 18.5117 109.271 18.6702 108.743 18.9874C108.214 19.2834 107.802 19.7062 107.506 20.2559C107.21 20.8056 107.062 21.4398 107.062 22.1586C107.062 22.8563 107.21 23.4906 107.506 24.0614C107.802 24.6111 108.214 25.0445 108.743 25.3616C109.271 25.6576 109.874 25.8056 110.551 25.8056Z" fill="#71717a"></path>
                                <path className="ccustom" fillRule="evenodd" clipRule="evenodd" d="M137.281 30.1819C136.246 30.1819 135.294 29.9811 134.427 29.5794C133.971 29.368 133.559 29.1156 133.191 28.8222V36.3659H128.402V14.4525H133.254V15.5162C133.606 15.2283 133.997 14.9794 134.427 14.7696C135.294 14.3467 136.246 14.1353 137.281 14.1353C138.74 14.1353 140.03 14.4842 141.15 15.1819C142.292 15.8795 143.18 16.8309 143.814 18.036C144.47 19.2411 144.797 20.6153 144.797 22.1586C144.797 23.702 144.47 25.0762 143.814 26.2813C143.18 27.4864 142.292 28.4377 141.15 29.1354C140.03 29.8331 138.74 30.1819 137.281 30.1819ZM136.394 25.8056C137.091 25.8056 137.694 25.647 138.201 25.3299C138.73 25.0128 139.142 24.5793 139.438 24.0297C139.734 23.48 139.882 22.8563 139.882 22.1586C139.882 21.4398 139.734 20.8056 139.438 20.2559C139.142 19.7062 138.73 19.2834 138.201 18.9874C137.694 18.6702 137.102 18.5117 136.425 18.5117C135.749 18.5117 135.146 18.6702 134.618 18.9874C134.11 19.2834 133.709 19.7062 133.413 20.2559C133.117 20.8056 132.969 21.4398 132.969 22.1586C132.969 22.8563 133.106 23.48 133.381 24.0297C133.677 24.5793 134.089 25.0128 134.618 25.3299C135.146 25.647 135.738 25.8056 136.394 25.8056Z" fill="#71717a"></path>
                                <path className="ccustom" d="M149.546 29.8965C150.434 30.1291 151.332 30.2453 152.241 30.2453C154.165 30.2453 155.687 29.8014 156.808 28.9134C157.949 28.0255 158.52 26.831 158.52 25.3299C158.52 24.3574 158.341 23.5751 157.981 22.9832C157.622 22.3701 157.157 21.8838 156.586 21.5244C156.015 21.165 155.412 20.8795 154.778 20.6681C154.144 20.4567 153.541 20.277 152.971 20.129C152.4 19.981 151.935 19.8119 151.575 19.6216C151.216 19.4313 151.036 19.1776 151.036 18.8605C151.036 18.5645 151.174 18.3425 151.448 18.1945C151.723 18.0254 152.135 17.9409 152.685 17.9409C153.256 17.9409 153.837 18.0571 154.429 18.2897C155.042 18.5222 155.592 18.924 156.078 19.4948L158.837 16.7041C158.14 15.8161 157.231 15.1501 156.11 14.7062C155.011 14.2411 153.806 14.0085 152.495 14.0085C151.248 14.0085 150.159 14.2199 149.229 14.6427C148.298 15.0656 147.579 15.647 147.072 16.3869C146.565 17.1057 146.311 17.962 146.311 18.9557C146.311 19.8859 146.491 20.6576 146.85 21.2707C147.209 21.8626 147.675 22.3278 148.245 22.666C148.816 23.0043 149.419 23.2686 150.053 23.4588C150.687 23.6491 151.29 23.8288 151.861 23.998C152.431 24.146 152.897 24.3257 153.256 24.5371C153.637 24.7274 153.827 25.0128 153.827 25.3933C153.827 25.6893 153.668 25.9218 153.351 26.091C153.055 26.2601 152.622 26.3447 152.051 26.3447C151.226 26.3447 150.465 26.1967 149.768 25.9007C149.07 25.5836 148.467 25.1502 147.96 24.6005L145.201 27.3912C145.73 27.962 146.364 28.4695 147.104 28.9134C147.865 29.3362 148.679 29.6639 149.546 29.8965Z" fill="#71717a"></path>
                                <path className="ccustom" d="M167.368 30.2136C165.952 30.2136 164.694 29.9282 163.595 29.3574C162.516 28.7654 161.671 27.962 161.058 26.9472C160.444 25.9113 160.138 24.7274 160.138 23.3954V14.4525H164.99V23.332C164.99 23.8605 165.074 24.3151 165.244 24.6956C165.434 25.0762 165.709 25.3722 166.068 25.5836C166.428 25.795 166.861 25.9007 167.368 25.9007C168.087 25.9007 168.658 25.6787 169.081 25.2347C169.504 24.7696 169.715 24.1354 169.715 23.332V14.4525H174.567V23.3637C174.567 24.7168 174.261 25.9113 173.647 26.9472C173.034 27.962 172.189 28.7654 171.11 29.3574C170.032 29.9282 168.785 30.2136 167.368 30.2136Z" fill="#71717a"></path>
                                <path className="ccustom" d="M181.831 14.4525H176.979V29.8648H181.831V20.8584C181.831 20.3299 181.937 19.8859 182.148 19.5265C182.381 19.1671 182.688 18.8922 183.068 18.702C183.449 18.4905 183.882 18.3848 184.368 18.3848C185.066 18.3848 185.647 18.6068 186.112 19.0508C186.599 19.4736 186.842 20.0762 186.842 20.8584V29.8648H191.694V20.8584C191.694 20.3299 191.8 19.8859 192.011 19.5265C192.244 19.1671 192.55 18.8922 192.931 18.702C193.311 18.4905 193.745 18.3848 194.231 18.3848C194.929 18.3848 195.51 18.6068 195.975 19.0508C196.461 19.4736 196.704 20.0762 196.704 20.8584V29.8648H201.557V20.3193C201.557 19.0297 201.282 17.9303 200.732 17.0212C200.203 16.0909 199.474 15.3827 198.544 14.8965C197.635 14.389 196.588 14.1353 195.404 14.1353C194.199 14.1353 193.11 14.3996 192.138 14.9282C191.506 15.2649 190.954 15.6995 190.481 16.2319C190.04 15.675 189.504 15.2193 188.871 14.8647C188.026 14.3785 187.064 14.1353 185.986 14.1353C184.844 14.1353 183.819 14.3785 182.91 14.8647C182.514 15.067 182.155 15.3093 181.831 15.5916V14.4525Z" fill="#71717a"></path>
                            </svg></div>
                        </Link>
                        <ul className="items-center hidden space-x-8 lg:flex text-base">
                            <li><div aria-label="Our product" title="Our product" className="font-medium tracking-wide text-[#FA2200] transition-colors duration-200 hover:text-[#FA2200]"><Link to="/">Home</Link></div></li>
                            <li><div aria-label="Our product" title="Our product" className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-[#FA2200]"><Link to="/page/about-us">About</Link></div></li>
                            <li><div aria-label="Our product" title="Our product" className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-[#FA2200]"><Link to="/categories">Archive</Link></div></li>
                            <li><div aria-label="Our product" title="Our product" className="font-medium tracking-wide text-gray-700 transition-colors duration-200 hover:text-[#FA2200]"><Link to="/privacy">Privacy</Link></div></li>
                        </ul>
                        <ul className="items-center hidden space-x-8 lg:flex">
                            <li>
                                <button onClick={handleSearchClick} className="search-button inline-flex items-center justify-center h-12 px-6 font-medium tracking-wide text-white transition duration-200 shadow-md bg-[#FA2200] hover:bg-gray-500" aria-label="Search" title="Search"> Search </button>
                            </li>
                        </ul>
                        <div id="hamburger" className='lg:hidden' onClick={handleHamburgerClick}>
                            <svg
                                id="hamburger-icon"
                                className={`text-gray-700 ${isMenuOpen ? 'hidden' : ''}`}
                                xmlns="http://www.w3.org/2000/svg"
                                height="40"
                                viewBox="0 -960 960 960"
                                width="40"
                            >
                                <path fill="currentColor" d="M120-240v-60h720v60H120Zm0-210v-60h720v60H120Zm0-210v-60h720v60H120Z" />
                            </svg>
                            <svg
                                id="close-icon"
                                className={`close-icon-class ${isMenuOpen ? 'text-gray-300' : 'hidden'}`}
                                onClick={handleHamburgerClick}
                                xmlns="http://www.w3.org/2000/svg"
                                height="40"
                                viewBox="0 -960 960 960"
                                width="48"
                            >
                                <path fill="currentColor" d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
                            </svg>
                        </div>

                    </div>
                </nav>
            </nav>
        </header>
    );
}

export default Header;