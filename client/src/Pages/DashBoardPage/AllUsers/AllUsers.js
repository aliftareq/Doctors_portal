import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const AllUsers = () => {

    //loading data using useQuery
    const { data: users, isLoading, refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-lyart-eight.vercel.app/users`)
            const data = await res.json()
            return data
        }
    })

    //using loading
    if (isLoading) {
        return <LoadingSpinner></LoadingSpinner>
    }

    // handlers 
    const handleMakeAdmin = id => {
        fetch(`https://doctors-portal-server-lyart-eight.vercel.app/users/admin/${id}`, {
            method: 'PUT',
            headers: {
                authorization: `bearer ${localStorage.getItem('patient-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    toast.success('role updated successfully')
                }
                refetch()
            })
    }
    return (
        <section className='px-10'>
            <div>
                <h1 className='text-3xl'>All Users</h1>
            </div>
            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>Role</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, idx) =>
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user?.role !== 'admin'
                                            ? <button onClick={() => handleMakeAdmin(user._id)} className='btn btn-xs btn-primary'>
                                                Make Admin
                                            </button>
                                            : 'admin'}
                                    </td>
                                    <td><button className='btn btn-xs btn-error'>delete</button></td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>

        </section>
    );
};

export default AllUsers;