import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import ConfirmationModal from '../../Shared/ConfirmationModal/ConfirmationModal';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const ManageDoctors = () => {
    //states
    const [deletingDoctor, setDeletingDoctor] = useState(null)

    //loading doctors
    const { data: doctors, isLoading, refetch } = useQuery({
        queryKey: ['doctors'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-lyart-eight.vercel.app/doctors`, {
                headers: {
                    authorization: `bearer ${localStorage.getItem('patient-token')}`
                }
            })
            const data = await res.json()
            return data
        }
    })
    //handlers 
    const closeModal = () => {
        setDeletingDoctor(null)
    }
    const handleDeleteDoctor = (doctor) => {
        fetch(`https://doctors-portal-server-lyart-eight.vercel.app/doctors/${doctor._id}`, {
            method: 'DELETE',
            headers: {
                authorization: `bearer ${localStorage.getItem('patient-token')}`
            }
        })
            .then(res => res.json())
            .then(data => {
                if (data.deletedCount) {
                    toast.success(`Mr/Mrs ${doctor.name} has been removed from the list`)
                    refetch()
                }
            })
    }

    if (isLoading) {
        <LoadingSpinner></LoadingSpinner>
    }
    return (
        <section className='px-10'>
            <div className='my-4'>
                <h1 className='text-xl lg:text-4xl'>This page is for manage doctors</h1>
            </div>
            <div className="overflow-x-auto mt-5">
                <table className="table w-full">
                    <thead>
                        <tr>
                            <th>SL No.</th>
                            <th>avatar</th>
                            <th>Name</th>
                            <th>email</th>
                            <th>action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            doctors?.map((doctor, idx) =>
                                <tr key={idx}>
                                    <th>{idx + 1}</th>
                                    <th>
                                        <div className="avatar">
                                            <div className="w-12 rounded-full">
                                                <img src={doctor.image} alt='doctorPic' />
                                            </div>
                                        </div>
                                    </th>
                                    <td>{doctor.name}</td>
                                    <td>{doctor.email}</td>
                                    <td>
                                        <label
                                            htmlFor="Confirmation-modal"
                                            onClick={() => setDeletingDoctor(doctor)}
                                            className="btn btn-xs btn-error">
                                            delete
                                        </label>
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
            {
                deletingDoctor &&
                <ConfirmationModal
                    title={`Are you sure about removing this Doctor?`}
                    message={`Once you confirm the delete , you cant recovet the data.`}
                    modalAction={handleDeleteDoctor}
                    actionName={`Confirm`}
                    modalData={deletingDoctor}
                    closeModal={closeModal}
                ></ConfirmationModal>
            }
        </section>
    );
};

export default ManageDoctors;