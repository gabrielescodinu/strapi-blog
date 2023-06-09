// ArticleCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function ArticleCard({ article }) {
    return (
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
                    <p className="inline-block text-[10px] font-semibold tracking-wider text-[#FA2200] uppercase rounded-full bg-teal-accent-400">
                        {article.attributes.category?.data?.attributes?.Title || ''}
                    </p>
                    <p className="mt-2 text-lg font-medium leading-6 text-gray-700">{article.attributes.Title}</p>
                    <p className="mt-3 text-base text-gray-500">{article.attributes.Description}</p>
                    <div className="flex gap-3 mt-10 justify-left">
                        <div className="inline-flex items-center justify-center text-sm font-semibold text-gray-800 duration-200 group-hover:text-[#FA2200] focus:outline-none focus-visible:outline-gray-600">
                            <span>Read more</span>
                            <svg className="inline-block w-3 ml-2" fill="currentColor" viewBox="0 0 12 12">
                                <path d="M9.707,5.293l-5-5A1,1,0,0,0,3.293,1.707L7.586,6,3.293,10.293a1,1,0,1,0,1.414,1.414l5-5A1,1,0,0,0,9.707,5.293Z"></path>
                            </svg>
                        </div>
                    </div>
                </Link>
            </figure>
        </div>
    );
}

export default ArticleCard;
