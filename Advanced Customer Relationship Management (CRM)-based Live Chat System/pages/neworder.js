import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { v4 as uuidv4 } from 'uuid';
import axiosClient from '../config/axios';
import Swal from 'sweetalert2';
import { getCurrentSeller, getClients, statusOptions } from '../helpers';
import Select from 'react-select';

const NewClient = () => {
    const router = useRouter();

    const [clients, setClients] = useState([]);
    const [products, setProducts] = useState([]);
    const [data, setData] = useState({});

    const clientOptions = clients.map((client) => ({
        label: client.name,
        value: client.name,
    }));

    const productOptions = products.map((product) => ({
        label: product.name,
        value: product.id,
    }));

    useEffect(() => {
        const seller = getCurrentSeller();
        getClients(seller.id).then((res) => setClients(res.data));
        axiosClient.get('products').then((res) => {
            setProducts(res.data);
        });
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            let productsSubmit = [];
            data.productsId?.forEach((id) => {
                const matched = products.find((product) => product.id === id.value);
                if (matched) productsSubmit.push(matched);
            });

            const order = {
                id: uuidv4(),
                products: productsSubmit,
                total: data.total,
                clientName: data.client.value,
                status: data.status,
            };

            await axiosClient.post('orders', order);

            Swal.fire('Added!', 'Your order has been added.', 'success').then((res) => {
                if (res.value) router.push('/orders');
            });
        } catch (error) {
            console.log(error);
            Swal.fire('Oops...', 'Something went wrong!', 'error');
        }
    };

    return (
        <Layout>
            <h1 className="text-2xl text-gray-800 font-light">New Order</h1>

            <div className="flex justify-center mt-5">
                <div className="w-full max-w-lg">
                    <form
                        className="bg-white shadow-md px-8 pt-6 pb-8 mb-4"
                        onSubmit={handleSubmit}
                    >
                        <div className="block text-gray-700 text-sm font-bold my-2">Client:</div>
                        <Select
                            options={clientOptions}
                            onChange={(e) => setData((prev) => ({ ...prev, client: e }))}
                        />

                        <div className="block text-gray-700 text-sm font-bold my-2">Products:</div>
                        <Select
                            isMulti
                            options={productOptions}
                            className="basic-multi-select"
                            classNamePrefix="select"
                            onChange={(e) => setData((prev) => ({ ...prev, productsId: e }))}
                        />

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold my-2"
                                htmlFor="total"
                            >
                                Total
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="total"
                                type="text"
                                placeholder="Total"
                                onChange={(e) =>
                                    setData((prev) => ({ ...prev, total: e.target.value }))
                                }
                            />
                        </div>

                        <div className="block text-gray-700 text-sm font-bold my-2">Status:</div>
                        <Select
                            options={statusOptions}
                            onChange={(e) => setData((prev) => ({ ...prev, status: e }))}
                        />

                        <input
                            type="submit"
                            className="bg-gray-800 w-full mt-5 p-2 text-white uppercase font-bold hover:bg-gray-900"
                            value="Create Order"
                        />
                    </form>
                </div>
            </div>
        </Layout>
    );
};

export default NewClient;
