import React, { useState } from 'react';

import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import api from '../utilities/axios-hook';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const { t } = useTranslation();
    const redirect = useNavigate();
    const [error, setError] = useState({ type: false, message: '' });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            email: '',
            password: '',
        },
    });

    const submitFormHandler = async (data) => {
        await axios.get('http://localhost:8000/sanctum/csrf-cookie');
        const response = await api.post('login-user', data);

        const errorMessage = response.data.message;

        if (!response.ok) {
            setError({ type: true, message: errorMessage });
        }

        console.log(response);
    };

    return (
        <React.Fragment>
            <div className="bg-white shadow-md rounded px-8 pt-6 w-8/12 m-auto mt-12 pb-8 mb-4 flex flex-col">
                <form
                    onSubmit={handleSubmit(submitFormHandler)}
                    encType="multipart/form-data"
                >
                    <div className="mb-4">
                        <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            {t('Email')}
                        </label>
                        <input
                            {...register('email', {
                                required: 'Email field is required',
                            })}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker"
                            id="email"
                            type="email"
                            placeholder={t('Email')}
                        />
                        <small className="text-red-500">
                            {errors.email?.message}
                        </small>
                    </div>
                    <div className="mb-6">
                        <label
                            className="block text-grey-darker text-sm font-bold mb-2"
                            htmlFor="password"
                        >
                            {t('Password')}
                        </label>
                        <input
                            {...register('password', {
                                required: 'Password field is required',
                            })}
                            className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-grey-darker"
                            id="password"
                            type="password"
                            placeholder="******************"
                        />
                        <small className="text-red-500">
                            {errors.password?.message}
                        </small>
                        <div className="text-red text-xs italic mt-3">
                            {!error.type ? (
                                t('Please choose a password')
                            ) : (
                                <p className="text-red-500">{error.message}</p>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-400 hover:bg-blue-500 font-bold py-2 px-4 rounded"
                            type="submit"
                        >
                            {t('Sign In')}
                        </button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
};

export default Login;