"use client"

import FormModal from '@/components/FormModal'
import axios from 'axios'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { FaEllipsisV } from 'react-icons/fa'
import { toast } from 'react-toastify'

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [openActions, setOpenActions] = useState<number | null>(null)

    const [employees, setEmployees] = useState<any[]>([])
    const [employeeData, setEmployeeData] = useState(null)

    const [isDeleting, setIsDeleting] = useState(false)

    const [employeeToDelete, setEmployeetoDelete] = useState('')

    const [token, setToken] = useState<string | null>(null)

    const toggleActionsCard = (index: number) => {
        setOpenActions(openActions === index ? null : index)
    }

    const handleEditing = async (employeeId: string) => {
        try {
            const response = await axios.get(`https://email-manager-baackend.onrender.com/api/employees/${employeeId}`, {
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

    const handleDelete = async (employeeId: string) => {
        setIsDeleting(true);
        try {
            await axios.delete(`https://email-manager-baackend.onrender.com/api/employees/${employeeId}`, {
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
            const response = await axios.get('https://email-manager-baackend.onrender.com/api/employees', {
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
        console.log(token)
        setToken(storedToken)
        fetchEmployees(storedToken)
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
                        <th>Resignation Date</th>
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
        </div>
    )
}

export default Dashboard