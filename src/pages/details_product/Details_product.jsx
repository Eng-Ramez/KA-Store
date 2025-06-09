import { Button, Card, CardContent, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export default function Details_product() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(true);
    const [cartMessage, setCartMessage] = useState('');

    const getProduct = async () => {
        try {
            const response = await axios.get(`http://mytshop.runasp.net/api/products/${id}`);
            setProduct(response.data);
        } catch (err) {
            setError('❌ Failed to load product.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const addToCart = async (id) => {
        const userToken = localStorage.getItem("UserToken");
        try {
            const response = await axios.post(
                `http://mytshop.runasp.net/api/Carts/${id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${userToken}`
                    }
                }
            );
            setCartMessage('✅ Product added to cart!');
            console.log(response);
        } catch (err) {
            console.error(err);
            setCartMessage('❌ Failed to add product to cart.');
        }
    };

    if (loading) return <div>🔄 Loading product...</div>;
    if (error) return <div>{error}</div>;
    if (!product) return <div>❗ No product found.</div>;

    return (
        <Card>
            <CardContent>
                <Typography component="h3" variant="h5">
                    {product.name}
                </Typography>
                <Typography>
                    {product.description}
                </Typography>
                <Button onClick={() => addToCart(product.id)}>Add To Cart</Button>
                {cartMessage && <Typography color="secondary" sx={{ mt: 2 }}>{cartMessage}</Typography>}
            </CardContent>
        </Card>
    );
}
