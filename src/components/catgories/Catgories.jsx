import { Button, Card, CardActions, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import styles from'./Catgories.module.css'
import { Link } from 'react-router';

export default function Catgories() {
    const [categories, setCategories] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setLoading] = useState(true);

    const getCategories = async () => {
        try {
            const response = await axios.get('http://mytshop.runasp.net/api/categories');
            setCategories(response.data);
        } catch (e) {
            if (e.response && e.response.status === 404) {
                setError('Data Not Found');
            } else {
                setError('An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCategories();
    }, []);

    if (isLoading) {
        return <div>🔄 Loading users, please wait...</div>;
    }

    if (error) {
        return <div>❌ {error}</div>;
    }

    return (
        <Grid container spacing={2} className={`${styles.grig_category}`}>
            {categories.map((category) => (
                <Grid item xs={12} sm={6} md={4} lg={4} xl={3} key={category.id}>
                    <Card>
                       
                        <CardContent>
                            <Typography gutterBottom variant="h6" component="div">
                                {category.name}
                            </Typography>
                            <p> {category.description}</p>
                        </CardContent>
                        <CardActions>
                             <Button size="small" component={Link} to={`/product_details/${category.id}`} > Details</Button>
                        </CardActions>
                    </Card>
                </Grid>
            ))}
        </Grid>
    );
}

