import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from'./Product.module.css'
import { Link } from 'react-router';

export default function Product() {
    const [products, setproducts] = useState([]);
    const [error, setError] = useState('');
    

    const getproducts = async () => {
        try {
            const response = await axios.get('http://mytshop.runasp.net/api/products');
            
            setproducts(response.data);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                setError('Data Not Found');
            } else {
                setError('An error occurred');
            }
        }
    };

    useEffect(() => {
        getproducts();
    }, []);

    if (error) {
        return <div>❌ {error}</div>;
    }

    return (
        <Grid container spacing={2} className={`${styles.grig_product}`}>
            {products.map((product) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={product.id}>
                    <Card>
                        <CardMedia component={'img'} src={product.mainImg}  alt={product.description}></CardMedia>
                       
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {product.name}
                            </Typography>
                            
                        </CardContent>
                        <CardActions>
                            <Button size="small" component={Link} to={`/product_details/${product.id}`} > Details</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

