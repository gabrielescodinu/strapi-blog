import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { Link } from 'react-router-dom';


function CategoryPage() {
    AOS.init();
    AOS.refresh();

    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage] = useState(6);
    const [articles, setArticles] = useState([]);
    const [pagination, setPagination] = useState({});
    const [categories, setCategories] = useState([]);
    const [categoryId, setCategoryId] = useState(window.location.pathname.split('/')[2] || null);


    useEffect(() => {
        let apiUrl = `http://localhost:1337/api/articolos?populate=*&pagination[page]=${currentPage}&pagination[pageSize]=${articlesPerPage}`;

        if (categoryId) {
            apiUrl += `&filters[category][id]=${categoryId}`;
        }

        axios.get(apiUrl)
            .then((response) => {
                console.log(response.data);
                setArticles(response.data.data);
                setPagination(response.data.meta.pagination);
            })
            .catch((error) => {
                console.log(error);
            });

    }, [currentPage, articlesPerPage, categoryId]);


    const handleCategoryChange = (newCategoryId) => {
        setCurrentPage(1);
        setCategoryId(newCategoryId);
    };

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

    const changePage = (newPage) => {
        setCurrentPage(newPage);
    }

    const pagesToShow = 5;
    const pagesOffset = Math.floor(pagesToShow / 2);

    const startPage = Math.max(currentPage - pagesOffset, 1);
    const endPage = Math.min(startPage + pagesToShow - 1, pagination.pageCount);

    const canGoBack = currentPage > 1;
    const canGoForward = currentPage < pagination.pageCount;

    return (
        <div>
            {/* posts */}
            <section className="flex items-center w-full">
                <div className="relative items-center w-full px-5 pt-32 mx-auto md:px-12 lg:px-20 max-w-7xl">
                    {/* categories */}
                    <section className="max-w-screen-xl px-4 sm:px-6 mx-auto relative">
                        <div className="w-fit mx-auto text-sm font-medium text-center text-gray-700 ">
                            <ul className="flex flex-wrap justify-around -mb-px">
                                <li>
                                    <div
                                        onClick={() => handleCategoryChange(null)}
                                        className={`cursor-pointer inline-block px-6 py-4 border-b border-gray-400 hover:shadow-lg duration-150 ${categoryId === null ? 'text-[#FA2200] shadow-lg border-b !border-[#FA2200]' : ''
                                            }`}
                                    >
                                        All
                                    </div>
                                </li>
                                {categories.map((category) => (
                                    <li key={category.id}>
                                        <Link to={`/category/${category.id}`}>
                                            <div
                                                onClick={() => handleCategoryChange(category.id)}
                                                className={`cursor-pointer inline-block px-6 py-4 border-b border-gray-400 hover:shadow-lg duration-150 ${categoryId === category.id ? 'text-[#FA2200] shadow-lg border-b !border-[#FA2200]' : ''
                                                    }`}
                                            >
                                                {category.attributes.Title}
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>

                    {/* posts */}
                    <div data-aos="fade-up" data-aos-duration="500" className="grid grid-cols-1 gap-6 py-12 md:grid-cols-3">
                        {articles.slice(0, 6).map((article) => (
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
                </div>
            </section>
            {/* pagination */}
            <section className="mx-auto w-fit">
                <div className="items-center px-8 mx-auto lg:px-16 md:px-12">
                    <div className="justify-center w-full lg:p-10 max-auto">
                        <div className="flex items-center justify-between sm:px-6">
                            <div className="flex items-center justify-between flex-1">
                                <div>
                                    <nav className="relative z-0 inline-flex lg:gap-2 lg:-space-x-px" aria-label="Pagination">
                                        <nav className="relative z-0 inline-flex lg:gap-2 lg:-space-x-px" aria-label="Pagination">
                                            <button
                                                disabled={!canGoBack}
                                                onClick={() => changePage(1)}
                                                className="relative inline-flex items-center px-4 py-2 text-sm font-light text-gray-500 rounded-lg hover:bg-gray-50"
                                            >
                                                First
                                            </button>
                                            <button
                                                disabled={!canGoBack}
                                                onClick={() => changePage(currentPage - 1)}
                                                className="relative inline-flex items-center px-4 py-2 text-sm font-light text-gray-500 rounded-lg hover:bg-gray-50"
                                            >
                                                <svg className="w-5 h-5 md hydrated" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" width="48">
                                                    <path d="M561-240 320-481l241-241 43 43-198 198 198 198-43 43Z" />
                                                </svg>
                                            </button>
                                            {Array.from({ length: endPage - startPage + 1 }, (_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => changePage(startPage + i)}
                                                    className={`relative inline-flex items-center px-4 py-2 text-sm font-light text-gray-500 rounded-lg hover:bg-gray-50 ${currentPage === startPage + i ? 'active-page-class' : ''}`}
                                                >
                                                    {startPage + i}
                                                </button>
                                            ))}
                                            <button
                                                disabled={!canGoForward}
                                                onClick={() => changePage(currentPage + 1)}
                                                className="relative inline-flex items-center px-4 py-2 text-sm font-light text-gray-500 rounded-lg hover:bg-gray-50"
                                            >
                                                <svg className="w-5 h-5 md hydrated" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48">
                                                    <path d="m375-240-43-43 198-198-198-198 43-43 241 241-241 241Z" />
                                                </svg>
                                            </button>
                                            <button
                                                disabled={!canGoForward}
                                                onClick={() => changePage(pagination.pageCount)}
                                                className="relative inline-flex items-center px-4 py-2 text-sm font-light text-gray-500 rounded-lg hover:bg-gray-50"
                                            >
                                                Last
                                            </button>
                                        </nav>

                                    </nav>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );

}

export default CategoryPage;
