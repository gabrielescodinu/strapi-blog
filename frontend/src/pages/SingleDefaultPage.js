import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ArticleCard from '../components/ArticleCard';

function SingleDefaultPage({ match }) {
    const { permalink } = match.params;
    AOS.init();
    AOS.refresh();

    const [page, setPage] = useState(null);
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        Promise.all([
            axios.get(`http://localhost:1337/api/pages?populate=*&filters[permalink]=${permalink}`),
            axios.get('http://localhost:1337/api/articolos/?populate=*&sort=publishedAt:DESC')
        ])
            .then(([articleResponse, articlesResponse]) => {
                setPage(articleResponse.data.data[0]);
                setArticles(articlesResponse.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [permalink]);

    return (
        <div data-aos="fade-up">
            {page && (
                <>
                    {/* content */}
                    <div className='pt-32'>
                        <div className="mx-auto max-w-screen-lg px-4 md:px-8 mt-4 article-content">
                            <p className="font-bold text-3xl lg:text-4xl text-gray-800 text-center"> {page.attributes.Title} </p>

                            <ReactMarkdown>{page.attributes.Content}</ReactMarkdown>
                        </div>
                    </div>

                    {/* Latest Articles */}
                    <section className="flex items-center w-full">
                        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
                            <div>
                                <p className="font-bold text-3xl text-gray-800 text-center"> Latest Articles </p>
                            </div>
                            <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-3">
                                {articles.slice(0, 3).map((item) => (
                                    <ArticleCard article={item} />
                                ))}
                            </div>
                            <div className="text-center mt-8 w-fit mx-auto">
                                <Link to={`/categories`}>
                                    <div className="inline-flex items-center justify-center w-full h-12 px-6 font-medium tracking-wide text-white transition duration-200 shadow-md md:w-auto bg-[#FA2200] hover:bg-gray-700"> Discover more </div>
                                </Link>
                            </div>
                        </div>
                    </section>
                </>
            )}
        </div>
    );
}

export default SingleDefaultPage;
