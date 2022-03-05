import React, { useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import api from './utilities/axios-hook';
import Loading from './UI/Loading';
import image from '../assets/image.png';

const Quote = () => {
    const [movie, setMovie] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    let params = useParams();

    setTimeout(() => setIsLoading(false), 500);

    useEffect(() => {
        const fetchDataHandler = async () => {
            try {
                const response = await api.get('posts/' + params.movieId);
                const responseData = await response.data;

                setMovie(responseData);
                setIsLoading(true);
                return responseData;
            } catch (error) {
                alert(error.message);
            }
        };

        fetchDataHandler();
    }, [params.movieId]);

    return (
        <div className="container w-full max-w-lg m-auto">
            <div className="text-center">
                <div className="mt-9">
                    <Link
                        to="/"
                        className="text-white py-2 px-4 bg-gray-500 rounded hover:bg-gray-700 transition delay-75"
                    >
                        Go Back
                    </Link>
                </div>

                {isLoading ? (
                    <Loading />
                ) : (
                    <section className="mt-24 text-center">
                        <div className="mb-12">
                            <p className="text-white text-3xl text-left">
                                {movie[0]?.name.en}
                            </p>
                        </div>

                        {movie[0]?.quotes.map((quote) => (
                            <div key={quote.id} className="mb-6">
                                <img src={image} alt="img" />
                                <div className="mb-10 bg-white rounded p-4 text-left">
                                    <p className="text-2xl text-primary">
                                        {quote.quote.en}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </section>
                )}
            </div>
        </div>
    );
};

export default Quote;