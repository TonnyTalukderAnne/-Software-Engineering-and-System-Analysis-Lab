import React, { useState } from 'react';
import axiosClient from '../../config/axios';
import Select from 'react-select';
import { statusOptions } from '../../helpers';

const Order = ({ data }) => {
    const { products, clientName, status, total, id } = data;

    const [orderStatus, setOrderStatus] = useState(status);

    const handleChange = async (selectedOption) => {
        setOrderStatus(selectedOption);
        try {
            await axiosClient.put(`orders/${id}`, {
                ...data,
                status: selectedOption,
            });
        } catch (error) {
            console.error(error);
        }
    };

    // Determine border color based on order status value
    const borderColor =
        orderStatus.value === 'completed'
            ? 'border-green-400'
            : orderStatus.value === 'pending'
            ? 'border-orange-400'
            : 'border-red-600';

    return (
        <div
            className={`shadow-lg border-t-4 bg-white mb-8 rounded-b-lg rounded-t ${borderColor} w-3/4 md:w-2/5 lg:w-1/4 lg:mx-1`}
        >
            <div className="px-6 py-4 mt-4">
                <div className="capitalize tracking-wide text-gray-600 mb-2 font-semibold">
                    Products
                </div>
                {products.map((product, index) => {
                    // Only add bottom border except for last item
                    const border = index === products.length - 1 ? '' : 'border-b';
                    return (
                        <div
                            key={index}
                            className={`flex border px-4 py-2 text-lg text-gray-800 ${border}`}
                        >
                            <div className="pl-2">{product.name}</div>
                        </div>
                    );
                })}
                <div className="mt-4 capitalize tracking-wide text-gray-600 mb-2 font-semibold">
                    Client:
                    <span className="capitalize text-gray-800"> {clientName}</span>
                </div>
                <div className="my-2 capitalize tracking-wide text-gray-600 font-semibold">
                    Status:
                </div>

                <Select
                    defaultValue={orderStatus}
                    options={statusOptions}
                    onChange={handleChange}
                />
                <div className="mt-2 uppercase tracking-wide text-gray-600 font-semibold">
                    Total: {total}
                </div>
            </div>
        </div>
    );
};

export default Order;
