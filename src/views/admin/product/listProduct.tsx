import { useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import '../../../styles/style.css';
import { useNavigate } from 'react-router-dom';
import { ProductEditObject } from '../../../components/common/Models';
import api from '../../../services/Api';
import * as ROUTES from '../../../constants/routes';
import './styles.css'
import ProductCard from './ProductCard';

const Products = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState<ProductEditObject[]>([]);
  
    const createProduct = () => {
      navigate(ROUTES.ADMIN_PRODUCT_ADD);
    };
  
    const fetchProducts = async () => {
      try {
        const response = await api.get('product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
  
    useEffect(() => {
      fetchProducts();
    }, []);
  
    const handleRemoveProduct = (productId: string) => {
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    };

  return (
    <main className="primary-container p-5">
      <div className="secondary-container p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <div className="tertiary-container">
          <h3 className="text-center m-4">Produtos</h3>
          <div className="p-4">
            <div className="d-flex justify-content-end">
              <Button
                className="btn bg-black text-white rounded p-2 mb-4"
                onClick={createProduct}
              >
                Criar novo produto
              </Button>
            </div>
            <div className="category-list-container">
              {products.map((product) => (
                <ProductCard
                key={product.id}
                product={product} 
                onRemove={handleRemoveProduct}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Products;