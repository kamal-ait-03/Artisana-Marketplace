import React, { useState, useEffect } from 'react';

function ProductList() {
    const [products, setProducts] = useState([]);

    // 1. We use the useEffect hook to fetch data when the page loads
    useEffect(() => {
        // 2. THIS IS THE ENDPOINT TEST! Notice the 127.0.0.1 url.
        fetch('http://127.0.0.1:8000/api/products/')
            .then((response) => response.json())
            .then((data) => {
                // 3. We take the products from Django and put them in our React State
                console.log("Success! Data received:", data); 
                setProducts(data);
            })
            .catch((error) => console.error("API test failed:", error));
    }, []);

    // 4. Finally, display them on your website interface
    return (
        <div>
            <h2>My Artisana Products</h2>
            <ul>
                {products.map(product => (
                    <li key={product.id}>
                        {product.name} - {product.price} MAD
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ProductList;