"use client"

import FormModal from '../../components/FormModal'
import axios from 'axios'
import moment from 'moment'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import { toast } from 'react-toastify'

const OffBoarding = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openViewModal, setOpenViewModal] = useState(false)
    const [openActions, setOpenActions] = useState<number | null>(null)

    const [properties, setProperties] = useState([])

    const [employees, setEmployees] = useState<any[]>([])
    const [employeeData, setEmployeeData] = useState(null)

    const [isDeleting, setIsDeleting] = useState(false)

    const [employeeToDelete, setEmployeetoDelete] = useState('')

    const [token, setToken] = useState<string | null>(null)
    const router = useRouter()

    const toggleActionsCard = (index: number) => {
        setOpenActions(openActions === index ? null : index)
    }

    const handleEditing = async (employeeId: string) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/employees/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const employee = response.data;
            setEmployeeData(employee?.data)
            setIsOpen(true)
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    const handleView = async (employeeId: string) => {
        try {
            const response = await axios.get(`http://localhost:4000/api/allEmployee/${employeeId}/properties`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProperties(response.data)
            setOpenViewModal(true)
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    }

    const handlePropertyStatus = async (propertyId: string, employeeId: string) => {
        try {

            const response = await axios.put('http://localhost:4000/api/allEmployee/return',
                {
                    propertyId,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            toast.success('Item updated')
            // Optionally, update the UI or fetch updated data after success
            const fetchUpdated = await axios.get(`http://localhost:4000/api/allEmployee/${employeeId}/properties`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setProperties(fetchUpdated.data)
        } catch (error) {
            console.error('Error updating property status:', error);
            toast.error('Failed to update property status. Please try again.');
        }
    };

    const handleDelete = async (employeeId: string) => {
        setIsDeleting(true);
        try {
            await axios.delete(`http://localhost:4000/api/employees/${employeeId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            fetchEmployees(token)
            setOpenDeleteModal(false);
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        } finally {
            setIsDeleting(false)
        }
    }

    const fetchEmployees = async (token: any) => {
        try {
            const response = await axios.get('http://localhost:4000/api/employees', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const allEmployees = response.data;
            setEmployees(allEmployees?.data)
        } catch (error: any) {
            console.log(error);
            toast.error(error.response.data.message)
        }
    };

    useEffect(() => {
        const storedToken = localStorage.getItem("token")

        if (!storedToken) {
            router.push('/');
        } else {
            setToken(storedToken)
            fetchEmployees(storedToken)
        }
    }, [])

    return (
        <div className='mt-10 mx-4 border p-8'>
            <div className="top mb-5 flex justify-end">
                <button onClick={() => setIsOpen(true)} className='px-2 py-1 bg-black hover:bg-slate-900 transition-all text-white rounded-md'>Add exiting staff</button>
            </div>  

            <div className="cards flex items-center justify-center gap-5 w-full mb-10">
                <div className="card flex flex-col items-center hover:scale-110 transition-all cursor-pointer bg-zinc-300 rounded-md w-1/6 justify-center gap-3 p-3">
                    <span className='text-sm font-semibold'>{employees.length}</span>
                    <span className='text-base font-semibold'>Employees</span>
                </div>
                <div className="card flex flex-col items-center hover:scale-110 transition-all cursor-pointer bg-zinc-300 rounded-md w-1/6 justify-center gap-3 p-3">
                    <span className='text-sm font-semibold'>{employees.filter(employee => employee.disabled === false).length}</span>
                    <span className='text-base font-semibold'>Active</span>
                </div>
                <div className="card flex flex-col items-center hover:scale-110 transition-all cursor-pointer bg-zinc-300 rounded-md w-1/6 justify-center gap-3 p-3">
                    <span className='text-sm font-semibold'>{employees.filter(employee => employee.disabled === true).length}</span>
                    <span className='text-base font-semibold'>Disabled</span>
                </div>
            </div>

            <table className='w-full mx-auto'>
                <thead>
                    <tr className='text-left'>
                        <th>Full name</th>
                        <th>Email</th>
                        <th>Termination Date</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map((employee, idx) => (
                        <tr key={employee._id}>
                            <td>{employee.fullName}</td>
                            <td>{ employee.email }</td>
                            <td>{moment(employee.resignationDate).format('MMM D, YYYY')}</td>
                            <td>{employee.disabled ? "inactive": 'active'}</td>
                            <td>
                                <div className="relative">
                                    <div className='cursor-pointer' onClick={() => toggleActionsCard(idx)}>
                                        <FaEllipsisV />
                                    </div>
                                    {
                                        openActions === idx && 
                                        <div className="bg-background-light flex flex-col gap-3 absolute top-0 right-1 transition-all py-2 px-4 shadow-lg w-[80%]">
                                            {/* <span className="transition-all cursor-pointer p-2 -mx-4 w-full">View</span> */}
                                            <span className="transition-all cursor-pointer p-2 -mx-4 w-full" onClick={() => { toggleActionsCard(idx);handleEditing(employee?._id)}}>Edit</span>
                                            <span className="transition-all cursor-pointer p-2 -mx-4 w-full" onClick={() => { toggleActionsCard(idx);handleView(employee?.employeeId)}}>View</span>
                                            <span className="transition-all cursor-pointer text-textPrimary-light p-2 w-full -mx-4" onClick={() => { toggleActionsCard(idx);setEmployeetoDelete(employee?._id); setOpenDeleteModal(true)}}>Delete</span>
                                        </div>
                                    }
                                </div>
                            </td>
                        </tr>
                    ))
                    }
                </tbody>
            </table>

            {isOpen && <FormModal setEmployeeData={setEmployeeData} employeeData={employeeData} setIsOpen={setIsOpen} fetchEmployees={fetchEmployees} />}

            {openDeleteModal && 
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center'>
                    <div className="bg-white rounded-lg shadow-lg p-4 w-1/2">
                        <h2 className="text-lg font-bold mb-2">
                            Delete Employee
                        </h2>

                        <p>Are you sure you want to delete this employee from resignation list?</p>

                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => handleDelete(employeeToDelete)} className="bg-red-800 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                {isDeleting ? 'deleting...' : 'Delete'}
                            </button>
                            <button onClick={() => setOpenDeleteModal(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            }

            {openViewModal && 
                <div className='fixed top-0 left-0 w-full h-full bg-black bg-opacity-70 flex justify-center items-center'>
                    <div className="bg-white rounded-lg shadow-lg p-4 w-1/2">
                        <h2 className="text-lg font-bold mb-2">
                            Company Properties
                        </h2>

                        <div className="properties flex flex-col space-y-4">
                            {properties.map((prop: any) => (
                                <div key={prop._id} className='flex items-center justify-between'>
                                    <div className="check-prop flex items-center gap-2">
                                        <input type="checkbox" name='' checked={prop.status === "returned"} onChange={() => handlePropertyStatus(prop._id, prop.employeeId)} />
                                        <span>{ prop.propertyName }</span>
                                    </div>
                                    <div>
                                        <span className='text-sm'>{ prop.status }</span>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="flex justify-end gap-3 mt-4">
                            <button onClick={() => setOpenViewModal(false)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default OffBoarding