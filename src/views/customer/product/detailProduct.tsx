import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/common/Loading';
import { ProductCustomer } from '../../../components/common/Models';
import api from '../../../services/Api';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import noImage from '../../../assets/noImage.png';
import * as ROUTES from '../../../constants/routes';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const productCustomer = {
  id: '',
  name: '',
  brand: '',
  price: 0,
  barCode: '',
  description: '',
  quantity: 0,
  discountValue: 0,
  isDiscountPercentage: false,
  categoryId: '',
  images: [],
}

const ProductPage = () => {
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState<ProductCustomer>(productCustomer);
  const location = useLocation();
  const navigate = useNavigate();
  const productId: string | null = location.state?.productId;
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await api.get(`product/customer/${productId}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        toast.error('Erro ao buscar produto. Por favor, tente novamente mais tarde.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log('Erro ao buscar produto', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  if (!productId) {
    navigate(ROUTES.CUSTOMER_PRODUCTS);
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  const calculateDiscount = () => {
    let discount;
    if(product?.price) {
      if (product?.isDiscountPercentage) {
        discount = (product?.price - (product?.price * (product?.discountValue / 100)));
      } else {
        discount = (product?.price - product?.discountValue);
      }
    }

    return discount ? discount : 0;
  }

  const hasDiscount = product?.discountValue > 0;
  const originalPrice = formatPrice(product?.price);
  const discountedPrice = formatPrice(calculateDiscount());

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <main className="primary-container p-5" style={{ maxWidth: '70.75rem' }}>
          <div className="secondary-container p-5">
            <div className="tertiary-container p-5">
              <div className="product-container">
                <div className="product-image">
                <Carousel>
                  {product.images.length > 0 ? (
                    product.images.map((img, index) => (
                      <div key={index}>
                        <img src={img.imageUrl} alt={product.name} />
                      </div>
                    ))
                  ) : (
                    [
                      <div>
                        <img src={noImage} alt="No image available" />
                      </div>
                    ]
                  )}
                </Carousel>
                </div>
                <div className="product-details">
                  <h3 className="product-name">{product?.name}</h3>
                  <h5>{product?.brand}</h5>
                  <div>
                    {hasDiscount ? (
                      <div className="product-price-container">
                        <span className="original-price">{originalPrice}</span>
                        <span className="discounted-price">{discountedPrice}</span>
                      </div>
                    ) : (
                      <span className="product-price">{originalPrice}</span>
                    )}
                  </div>
                  <p className="product-description">
                    {product?.description}
                  </p>
                  <div className="product-buttons">
                    <button className="product-buttons">Comprar</button>
                    <button className="product-buttons">Adicionar ao carrinho</button>
                  </div>
              </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default ProductPage;
