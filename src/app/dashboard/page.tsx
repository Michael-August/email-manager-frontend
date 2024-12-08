import React from 'react'

const Dashboard = () => {
    const stats = [
        { title: 'Total Employees', value: 128 },
        { title: 'Active Properties', value: 54 },
        { title: 'Pending Requests', value: 12 },
        { title: 'Departments', value: 8 },
    ];
    return (
        <div className='flex-1 p-6 overflow-y-auto'>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div
                        key={stat.title}
                        className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center"
                    >
                        <h2 className="text-gray-500 text-sm">{stat.title}</h2>
                        <p className="text-2xl font-bold">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div className="mt-8 bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-lg font-bold mb-4">Recent Activity</h2>
                <table className="table-auto w-full border-collapse border border-gray-300">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">ID</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Action</th>
                            <th className="border border-gray-300 px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className="border border-gray-300 px-4 py-2">1</td>
                            <td className="border border-gray-300 px-4 py-2">John Doe</td>
                            <td className="border border-gray-300 px-4 py-2">Added Property</td>
                            <td className="border border-gray-300 px-4 py-2">2024-12-07</td>
                        </tr>
                        <tr className="hover:bg-gray-100">
                            <td className="border border-gray-300 px-4 py-2">2</td>
                            <td className="border border-gray-300 px-4 py-2">Jane Smith</td>
                            <td className="border border-gray-300 px-4 py-2">Requested Leave</td>
                            <td className="border border-gray-300 px-4 py-2">2024-12-06</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Dashboard