import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const FormModal = ({setIsOpen, employeeData, setEmployeeData, fetchEmployees}: {setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, employeeData: any, setEmployeeData: any, fetchEmployees: any}) => {
    const [formData, setFormData] = useState({
        fullName: '',
        employeeId: '',
        resignationDate: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false)

    const [employees, setEmployees] = useState([])

    const handleClose = () => {
        setEmployeeData(null)
        setFormData({ fullName: "", employeeId: "", resignationDate: "" })
        setIsOpen(false);
    };

    const handleChange = (event: any) => {
        setFormData({
            ...formData,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = async (event: any) => {
        const token = localStorage.getItem("token")
        event.preventDefault();
        setIsSubmitting(true);

        try {
            const apiToCall = employeeData ? `https://email-manager-baackend.onrender.com/api/employees/${employeeData._id}` : 'https://email-manager-baackend.onrender.com/api/employees';
            const methodToUse = employeeData ? 'put' : 'post';

            const response = await axios({
                method: methodToUse,
                url: apiToCall,
                data: formData,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });

            setIsOpen(false)
            toast.success(response.data.message);
            fetchEmployees(token)
            setFormData({ fullName: "", employeeId: "", resignationDate: "" })
            setEmployeeData(null)
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message);
        } finally {
            setIsSubmitting(false);
        }
        console.log(formData);
    };

    useEffect(() => {
        if (employeeData) {
            setFormData(employeeData)
        }
    }, [employeeData])

    useEffect(() => {
        const fetchEmployees = async () => {
            const token = localStorage.getItem("token")
            try {
                const allEmployees = await axios({
                    method: 'get',
                    url: 'https://email-manager-baackend.onrender.com/api/allEmployee',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`
                    }
                })
                setEmployees(allEmployees.data)
            } catch (error) {
                
            }
        }

        fetchEmployees()
    }, [])

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center'>
            <div className="bg-white rounded-lg shadow-lg p-4 w-1/2">
                <h2 className="text-lg font-bold mb-2">
                    Off-boarding Employee Form
                </h2>

                <form className='mt-10 flex flex-col gap-3' onSubmit={handleSubmit}>
                    <div className="flex flex-col gap-2">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="fullName"
                        >
                            Full Name
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="fullName"
                            type="text"
                            placeholder='Full name'
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <select className='border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' value={formData.employeeId} onChange={handleChange} name="employeeId" id="">
                            <option>--select employee email--</option>
                            {employees.map((employee: any) => (
                                <option key={employee._id} value={employee._id}>{ employee?.email }</option>
                            ))}
                        </select>
                        {/* <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            type="email"
                            placeholder='Email'
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        /> */}
                    </div>
                    <div className="flex flex-col gap-2">
                        <label
                            className="block text-gray-700 text-sm font-bold mb-2"
                            htmlFor="resignationDate"
                        >
                            Resignation Date
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="resignationDate"
                            type="date"
                            name="resignationDate"
                            value={formData.resignationDate}
                            onChange={handleChange}
                        />
                    </div>

                    <div className="flex justify-end gap-3 mt-4">
                        <button className="bg-black hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            {isSubmitting ? 'submitting...' : 'Submit'}
                        </button>
                        <button onClick={handleClose} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                            Close
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default FormModal