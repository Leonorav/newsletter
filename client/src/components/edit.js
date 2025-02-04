import {useForm} from "react-hook-form";
import { useEffect, useState} from "react";
import { BrowserRouter as Router, Routes, Route, Link, useParams} from "react-router-dom";
import axios from 'axios';
import { useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Edit() {
    let navigate = useNavigate();
    const {id_customerNwl} = useParams();
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [user, setUser] = useState(null);

    const onSubmit = data =>editUser(data);

    function getUser()
    {
        axios.get(`http://localhost:3333/api/newsletter/`+ id_customerNwl)
            .then(res => {
                const response = res.data;
                setUser(response);
            })
    }
    function editUser(data) {
        console.table(data);
        axios.post(`http://localhost:3333/api/newsletter/edit`,{data})
            .then(res => {
                const response = res.data.response;
                if(response === 200) {
                    toast.success("Success");
                    //window.location.replace("/admin");
                } else {
                    toast.error("Email already used!");
                }
            })

    }
    useEffect(() => {
        getUser();
    },[]);

    useEffect(() => {

        reset(user);

    },[user]);


    return (
        <>
            <ToastContainer />
            <nav className="bg-white border-gray-200 px-2 sm:px-4 py-0 rounded dark:bg-zinc-300">
                <div className="container flex flex-wrap items-center">
                    <a className="flex items-center">
                    </a>
                    <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                        <ul className="flex flex-col p-3 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-bold md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-zinc-300  dark:border-gray-700">
                            <li>
                                <div>
                                    <button onClick={() => navigate(-1)} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 focus:ring-2 dark:bg-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-emerald-600 dark:focus:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3"/>
                                        </svg>
                                        Back</button>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div className="flex min-h-full justify-center py-7 px-4 my-32  sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-7">
                    <div>
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Edit Page
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="id_customerNwl"/>
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="name_customerNwl" className="sr-only">
                                    Name
                                </label>
                                <input {...register("name_customerNwl", {required: true})}
                                       name="name_customerNwl"
                                       type="text"
                                       className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                       placeholder="Name"
                                />
                                {errors.name_customerNwl && <span><div
                                    className="bg-red-100 border border-red-400 text-red-700 px-4  rounded relative"
                                    role="alert">This field is required</div></span>}
                            </div>
                            <div>
                                <label htmlFor="email_customerNwl" className="sr-only">
                                    Email address
                                </label>
                                <input {...register("email_customerNwl", {required: true})}
                                       name="email_customerNwl"
                                       type="email"
                                       className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                                       placeholder="Email address"
                                />
                                {errors.email_customerNwl && <span><div
                                    className="bg-red-100 border border-red-400 text-red-700 px-4  rounded relative"
                                    role="alert">This field is required</div></span>}
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-el-100 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-500	 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Edit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Edit;
