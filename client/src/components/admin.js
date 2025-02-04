import axios from 'axios';
import {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function Admin() {
    const [users, setUsers] = useState([]);

    function getUsers() {
        axios.post(`http://localhost:3333/api/admin`).then((res) => {
            const response = res.data;
            setUsers(response);
        });
    }

    function deleteUser(id_customerNwl) {
        axios.delete(`http://localhost:3333/api/admin/delete/` + id_customerNwl).then((res) => {
            const response = res.data.response;
            if (response === 200) {
                getUsers();
            }
        });
    }

    useEffect(() => {
        getUsers()
    }, []);

    function logout() {
        localStorage.removeItem("auth");
        window.location.replace("/login");
    }

    return (
        <>
            <ToastContainer />
            <div className="relative overflow-x-auto">
                <nav className="bg-white border-gray-200 px-2 sm:px-4 py-0 rounded dark:bg-zinc-300">
                    <div className="container flex flex-wrap items-center">
                        <a className="flex items-center">
                        </a>
                        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
                            <ul className="flex flex-col p-3 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:text-sm md:font-bold md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-zinc-300  dark:border-gray-700">
                                <li>
                                    <div>
                                        <button onClick={() => logout()}
                                                type="submit"
                                                className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 focus:ring-2 dark:bg-gray-700 dark:text-white dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-emerald-600 dark:focus:text-white">
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                                 strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path strokeLinecap="round" strokeLinejoin="round"
                                                      d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75"/>
                                            </svg>
                                            Logout
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <div><br/><br/>
                    <img
                        className="mx-auto w-auto"
                        src="https://cdn.loeffelhardt.de/images/general/loeffelhardt-logo-small.png"
                        alt="Loeffelhardt"
                    />
                    <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
                        Welcome in the Loeffelhardt Admin
                    </h2>
                </div>
                <table
                    className="w-full text-sm text-center border-separate items-center justify-center py-8 px-4 sm:px-6 lg:px-20 ">
                    <thead className="text-xs  uppercase bg-el-100 ">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Name
                        </th>
                        <th scope="col" className="px-6 py-3">
                            E-mail
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Created
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Ip_Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Actions
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {users.map((user) =>
                        <tr key={user.id_customerNwl} className="bg-white border-b dark:bg-zinc-300 ">
                            <td className="px-6 py-4">
                                {user.name_customerNwl}
                            </td>
                            <td className="px-6 py-4">
                                {user.email_customerNwl}
                            </td>
                            <td className="px-6 py-4">
                                {user.created}
                            </td>
                            <td className="px-6 py-4">
                                {user.ip_address}
                            </td>
                            <td>
                                <div className="inline-flex rounded-md shadow-sm" role="group">
                                    <Link to={`/newsletter/edit/${user.id_customerNwl}`} className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 focus:ring-2 dark:bg-el-100  dark:text-white dark:hover:text-white dark:hover:bg-emerald-500 dark:focus:ring-emerald-600 dark:focus:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"/>
                                        </svg>
                                        Edit</Link>

                                </div>
                                <div className="inline-flex rounded-md shadow-sm ml-1" role="group">
                                    <button onClick={() => {
                                        if (window.confirm(`Are you sure you wish to delete this item?`)) {
                                            deleteUser(user.id_customerNwl)
                                            toast.success('Deleted successfully')
                                        }
                                        ;
                                    }} type="button"
                                            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-900 bg-white border-gray-200 hover:bg-gray-100 focus:ring-2 dark:bg-red-500 dark:text-white dark:hover:text-white dark:hover:bg-red-400 dark:focus:ring-red-600 dark:focus:text-white">
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                             strokeWidth="1.5"
                                             stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round"
                                                  d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"/>
                                        </svg>
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                    </tbody>
                </table>
                <br/>
            </div>

        </>
    );
}

export default Admin;
