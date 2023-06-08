import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

function HomePage() {
    AOS.init();
    AOS.refresh();

    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]);
    const [filteredArticles, setFilteredArticles] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:1337/api/articolos/?populate=*&sort=publishedAt:DESC')
            .then((response) => {
                console.log(response.data);
                setArticles(response.data.data);

                let filteredArticles;
                if (selectedCategory === null) {
                    filteredArticles = response.data.data;
                } else {
                    filteredArticles = response.data.data.filter(article => article.attributes.category && article.attributes.category.data && article.attributes.category.data.attributes.Title === selectedCategory);
                }
                setFilteredArticles(filteredArticles);
                console.log(filteredArticles);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [selectedCategory]);


    useEffect(() => {
        axios.get('http://localhost:1337/api/categories')
            .then((response) => {
                console.log(response.data);
                setCategories(response.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            {/* hero */}
            <section>
                <div data-aos="fade-up" className="flex flex-col justify-center min-h-screen relative">
                    <section className="relative flex items-center w-full z-10">
                        <div className="relative items-center w-full mx-auto max-w-7xl">
                            <div className="relative flex-col items-start m-auto align-middle">
                                {articles.filter(article => article.attributes.Highlights).slice(0, 1).map((article) => (
                                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-24">
                                        <div className="relative items-center gap-12 m-auto lg:inline-flex md:order-first">
                                            <div className="max-w-xl text-center lg:text-left">
                                                <div key={article.id}>
                                                    <div>
                                                        <p className="inline-block mb-4 text-xs font-semibold tracking-wider text-[#FA2200] uppercase"> {article.attributes.category?.data?.attributes?.Title || ''} </p>
                                                    </div>
                                                    <div>
                                                        <p className="font-bold text-3xl lg:text-4xl text-gray-800"> {article.attributes.Title} </p>
                                                        <p className="max-w-xl mt-4 text-base tracking-tight text-gray-600"> {article.attributes.Description} </p>
                                                    </div>
                                                    <div className="flex justify-center gap-3 mt-10 lg:justify-start">
                                                        <div className="text-center">
                                                            <Link to={`/article/${article.id}`}>
                                                                <div className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 shadow-md md:w-auto bg-[#FA2200] hover:bg-gray-700"> Read more </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="order-first block w-full mt-12 aspect-square lg:mt-0">
                                            <img
                                                src={`http://localhost:1337${article.attributes.Cover?.data?.attributes?.url}`}
                                                loading="lazy"
                                                alt="Hero"
                                                className="object-cover object-center w-full h-full mx-auto bg-gray-300 lg:ml-auto shadow-lg"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </section>
                    <div
                        className="absolute inset-0 max-w-md mr-auto my-auto h-72 blur-[118px]"
                        style={{
                            background: 'linear-gradient(#FA220042, #FA22001a)',
                        }}
                    />
                </div>
            </section>

            {/* categories */}
            <section data-aos="fade-up" className="max-w-screen-xl px-4 sm:px-6 mx-auto relative">
                <div className="w-fit mx-auto text-sm font-medium text-center text-gray-700 ">
                    <ul className="flex flex-wrap justify-around -mb-px">
                        <li>
                            <div
                                className={`cursor-pointer inline-block px-6 py-4 border-b border-gray-400 hover:shadow-lg duration-150 ${selectedCategory === null ? 'text-[#FA2200] shadow-lg border-b !border-[#FA2200]' : ''
                                    }`}
                                onClick={() => setSelectedCategory(null)}
                            >
                                All
                            </div>
                        </li>
                        {categories.map((category) => (
                            <li key={category.id}>
                                <div
                                    className={`cursor-pointer inline-block px-6 py-4 border-b border-gray-400 hover:shadow-lg duration-150 ${selectedCategory === category.attributes.Title ? 'text-[#FA2200] shadow-lg border-b !border-[#FA2200]' : ''
                                        }`}
                                    onClick={() => setSelectedCategory(category.attributes.Title)}
                                >
                                    {category.attributes.Title}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </section>

            {/* articles */}
            <section data-aos="fade-up" data-aos-duration="500" className="flex items-center w-full">
                <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
                    <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-3">
                        {filteredArticles.slice(0, 3).map((article) => (
                            <div key={article.id}>
                                <figure className="group">
                                    <Link to={`/article/${article.id}`}>
                                        <div className="group relative flex h-80 items-end overflow-hidden shadow-lg">
                                            <img
                                                src={`http://localhost:1337${article.attributes.Cover?.data?.attributes?.url}`}
                                                loading="lazy"
                                                alt="Article Cover"
                                                className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-110"
                                            />
                                        </div>
                                        <p className="inline-block text-[10px] font-semibold tracking-wider text-[#FA2200] uppercase rounded-full bg-teal-accent-400"> {article.attributes.category?.data?.attributes?.Title || ''} </p>
                                        <p className="mt-2 text-lg font-medium leading-6 text-gray-700"> {article.attributes.Title} </p>
                                        <p className="mt-3 text-base text-gray-500"> {article.attributes.Description} </p>
                                        <div className="flex gap-3 mt-10 justify-left">
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
                    <div className="text-center mt-8 w-fit mx-auto">
                        <Link to={`/categories`}>
                            <div className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 shadow-md md:w-auto bg-[#FA2200] hover:bg-gray-700"> Discover more </div>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    );

}

export default HomePage;
