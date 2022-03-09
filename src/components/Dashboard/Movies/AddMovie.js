import React from 'react';

import Modal from '../../UI/Modal';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import api from '../../utilities/axios-hook';

const AddMovie = (props) => {
    const { t } = useTranslation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            enName: '',
            kaName: '',
        },
    });

    const submitFormHandler = async (data) => {
        try {
            const response = await api.post('/add-movie', data);
            const responseData = await response.data;

            if (responseData) {
                window.location.href = '/admin/movies';
            }
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <Modal onClose={props.onClose}>
            <div>
                <form
                    onSubmit={handleSubmit(submitFormHandler)}
                    className={'flex flex-col space-y-3'}
                >
                    <label htmlFor="enName" className="text-white">
                        English name
                    </label>
                    <input
                        {...register('enName', {
                            required: 'Please fill all fields',
                        })}
                        type="text"
                        id="enName"
                        placeholder="English name"
                        className="px-2 py-3 border-none outline-none rounded-md"
                    />
                    <label htmlFor="kaName" className="text-white">
                        Georgian name
                    </label>
                    <input
                        {...register('kaName', {
                            required: 'Please fill all fields',
                        })}
                        type="text"
                        id="kaName"
                        placeholder="Georgian name"
                        className="px-2 py-3 border-none outline-none rounded-md"
                    />
                    <button
                        type="submit"
                        className="bg-blue-100 py-3 rounded-md hover:bg-blue-400 hover:text-white transition-colors"
                    >
                        Add Movie
                    </button>
                    <div className="text-red-400 text-center">
                        {errors.enName?.message || errors.kaName?.message}
                    </div>
                </form>
            </div>
        </Modal>
    );
};

export default AddMovie;