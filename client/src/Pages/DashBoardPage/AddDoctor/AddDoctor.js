import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const AddDoctor = () => {

    //navigation 
    const navigate = useNavigate()

    //react form hook
    const { register, handleSubmit, formState: { errors } } = useForm()

    //imagebb key
    const imageHostKey = process.env.REACT_APP_imageBB_key
    //console.log(imageHostKey);

    // load data for specilty option
    const { data: specialtyOptions, isLoading } = useQuery({
        queryKey: ['appointmentSpecialty'],
        queryFn: async () => {
            const res = await fetch(`https://doctors-portal-server-lyart-eight.vercel.app/appointmentSpecialty`)
            const data = await res.json()
            return data
        }
    })

    //loader
    if (isLoading) {
        <LoadingSpinner></LoadingSpinner>
    }


    //handlers 
    const handleAddDoctor = data => {
        // console.log(data.image[0]);
        const image = data.image[0]
        const formData = new FormData();
        formData.append('image', image)

        const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`

        fetch(url, {
            method: 'POST',
            body: formData
        })
            .then(res => res.json())
            .then(imgdata => {
                // console.log(imgdata)
                if (imgdata.success) {
                    //console.log(imgdata.data.url);
                    const doctor = {
                        name: data.name,
                        email: data.email,
                        speciality: data.speciality,
                        image: imgdata.data.url,

                    }
                    //console.log(doctor);
                    //save doctor info to database
                    fetch(`https://doctors-portal-server-lyart-eight.vercel.app/doctors`, {
                        method: 'POST',
                        headers: {
                            'content-type': 'application/json',
                            authorization: `bearer ${localStorage.getItem('patient-token')}`
                        },
                        body: JSON.stringify(doctor)
                    })
                        .then(res => res.json())
                        .then(data => {
                            console.log(data);
                            if (data.insertedId) {
                                toast.success('Doctors data added successfully')
                                navigate('/dashboard/manage-doctors')
                            }
                        })
                }
            })
    }
    return (
        <section>
            <div className='p-5'>
                <h1 className='text-2xl lg:text-5xl text-center'>This is add doctor page.</h1>
            </div>
            <div className='w-64 mx-auto lg:w-3/5 lg:mx-auto'>
                <form onSubmit={handleSubmit(handleAddDoctor)}>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text"
                            placeholder="Jhankar Mahabub"
                            className="input input-bordered w-full"
                            {...register("name", {
                                required: 'Name is required'
                            })}
                        />
                        {errors.name && <p className='text-red-400' role="alert">{errors.name?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">E-mail</span>
                        </label>
                        <input type="email"
                            placeholder="example@gmail.com"
                            className="input input-bordered w-full"
                            {...register("email", {
                                required: 'Email is required'
                            })}
                        />
                        {errors.email && <p className='text-red-400' role="alert">{errors.email?.message}</p>}
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Speciality</span>
                        </label>
                        <select className="select select-primary w-full"
                            {...register("speciality", {
                                required: 'speciality option is required'
                            })}
                        >
                            <option disabled selected>Please Select a Specialty</option>
                            {
                                specialtyOptions?.map(option => <option
                                    key={option._id}
                                    value={option.name}
                                >{option.name}</option>)
                            }
                        </select>
                    </div>
                    <div className="form-control w-full">
                        <label className="label">
                            <span className="label-text">Image</span>
                        </label>
                        <input type="file"
                            className="file-input file-input-bordered w-full max-w-xs"
                            {...register("image", {
                                required: 'image is required'
                            })} />
                        {errors.img && <p className='text-red-400' role="alert">{errors.img?.message}</p>}
                    </div>
                    <input className='btn btn-accent w-full mt-4' value='Add To List' type="submit" />
                </form>
            </div>
        </section>
    );
};

export default AddDoctor;