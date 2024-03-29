import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import ArticleCard from '../components/ArticleCard';

function ArticlePage() {
    AOS.init();
    AOS.refresh();

    const [article, setArticle] = useState(null);
    const [articles, setArticles] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        Promise.all([
            axios.get(`http://localhost:1337/api/articolos/${id}/?populate=*`),
            axios.get('http://localhost:1337/api/articolos/?populate=*&sort=publishedAt:DESC')
        ])
            .then(([articleResponse, articlesResponse]) => {
                setArticle(articleResponse.data.data);
                setArticles(articlesResponse.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);

    return (
        <div data-aos="fade-up">
            {article && (
                <>
                    {/* hero */}
                    <section>
                        <div className="flex flex-col justify-center pt-32 relative">
                            <section>
                                <div className="flex flex-col justify-center flex-1 py-8 md:px-12 lg:flex-none lg:px-24">
                                    <div>
                                        <div className="relative overflow-hidden">
                                            <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                                                <div className="relative overflow-hidden shadow-xl">
                                                    <div className="absolute inset-0">
                                                        <img
                                                            src={`http://localhost:1337${article.attributes.Cover?.data?.attributes?.url}`}
                                                            loading="lazy"
                                                            alt="Article Cover"
                                                            className="absolute inset-0 h-full w-full object-cover object-center transition duration-500 group-hover:scale-110"
                                                        />
                                                        <div className="absolute inset-0 bg-gray-500 mix-blend-multiply"></div>
                                                    </div>
                                                    <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
                                                        <div className="max-w-2xl p-10 mx-auto text-center">
                                                            <div>
                                                                <p className="inline-block mb-4 text-xs font-semibold tracking-wider text-[#FA2200] uppercase"> {article.attributes.category?.data?.attributes?.Title || ''} </p>
                                                                <p className="font-bold text-3xl lg:text-4xl text-gray-100"> {article.attributes.Title} </p>
                                                                <p className="max-w-xl mt-4 text-lg tracking-tight text-gray-300"> {article.attributes.Description} </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div className="absolute inset-0 max-w-md mr-auto my-auto h-72 blur-[118px]" style={{
                                background: 'linear-gradient(#FA220042, #FA22001a)',
                            }}></div>
                        </div>
                    </section>

                    {/* content */}
                    <div>
                        <div className="mx-auto max-w-screen-lg px-4 md:px-8 mt-4 article-content">
                            <ReactMarkdown>{article.attributes.Content}</ReactMarkdown>
                        </div>
                    </div>
                    
                    {/* Latest Articles */}
                    <section className="flex items-center w-full">
                        <div className="relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
                            <div>
                                <p className="font-bold text-3xl text-gray-800 text-center"> Latest Articles </p>
                            </div>
                            <div className="grid grid-cols-1 gap-6 py-12 md:grid-cols-3">
                                {articles.filter((item) => item.id !== article.id).slice(0, 3).map((item) => (
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

export default ArticlePage;
