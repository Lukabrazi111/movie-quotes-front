import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import LanguageContext from '../../context/language-context';

const DashboardLayout = (props) => {
    const languageCtx = useContext(LanguageContext);

    return (
        <React.Fragment>
            <div className="bg-gray-200 px-5 py-4 flex justify-between items-center">
                <div className="bg-gray-400 rounded py-2 px-3">
                    <NavLink
                        to={'/admin/movies'}
                        className={({ isActive }) =>
                            `mr-2 ${isActive ? 'underline' : ''}`
                        }
                    >
                        Movies
                    </NavLink>
                    <NavLink
                        to={'/admin/quotes'}
                        className={({ isActive }) =>
                            isActive ? 'underline' : ''
                        }
                    >
                        Quotes
                    </NavLink>
                </div>
                <div className="flex">
                    <div className="space-x-4">
                        <button className="bg-blue-400 py-2 px-9 hover:bg-blue-500">
                            Add Movie
                        </button>
                        <button className="bg-blue-400 py-2 px-9 hover:bg-blue-500">
                            Add Quote
                        </button>
                    </div>
                    <button
                        onClick={languageCtx.en}
                        className={`ml-5 mr-2 ${
                            languageCtx.lang === 'en'
                                ? 'underline'
                                : 'hover:underline'
                        }`}
                    >
                        EN
                    </button>
                    <button
                        onClick={languageCtx.ka}
                        className={`ml-5 mr-2 ${
                            languageCtx.lang === 'ka'
                                ? 'underline'
                                : 'hover:underline'
                        }`}
                    >
                        KA
                    </button>
                </div>
            </div>
            {props.children}
        </React.Fragment>
    );
};

export default DashboardLayout;
