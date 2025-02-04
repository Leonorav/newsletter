import { useForm } from "react-hook-form";
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Form() {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => Newsletter(data);
    function Newsletter(data){
        axios.post(`http://localhost:3333/api/newsletter/add`,{data})
            .then(res => {
                const response = res.data.response;
                if(response === 200){
                    toast.success("Success");
                    reset();
                }
                if(response === "email_customerNwl"){
                    toast.error("Email already used!");
                }
            })
    }
    return (
        <>
            <ToastContainer />
            <div className="flex min-h-full justify-center py-7 px-4 my-32  sm:px-6 lg:px-8">
                <div className="w-full max-w-md space-y-7">
                    <div>
                        <img
                            className="mx-auto w-auto"
                            src="https://cdn.loeffelhardt.de/images/general/loeffelhardt-logo-small.png"
                            alt="Loeffelhardt"
                        />
                        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                            Welcome in the Loeffelhardt Newsletter
                        </h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="-space-y-px rounded-md shadow-sm">
                            <div>
                                <label htmlFor="name_customerNwl" className="sr-only">
                                    Name
                                </label>
                                <input {...register("name_customerNwl", { required: true })}
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
                                <input {...register("email_customerNwl", { required: true })}
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

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input {...register("agree", { required: true })}
                                       name="agree"
                                       type="checkbox"
                                       className="h-4 w-4 rounded border-gray-300 text-indigo-700 accent-green-700"
                                />
                                <label htmlFor="agree" className="ml-2 block text-sm text-gray-900">
                                    Agree to Terms and Conditions
                                </label>
                            </div>
                        </div>
                        {errors.agree && <span><div
                            className="bg-red-100 border border-red-400 text-red-700 px-4  rounded relative"
                            role="alert">This field is required</div></span>}
                        <div>
                            <button
                                type="submit"
                                className="group relative flex w-full justify-center rounded-md border border-transparent bg-el-100 py-2 px-4 text-sm font-medium text-white hover:bg-emerald-500	 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                            >
                                Register
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Form;
