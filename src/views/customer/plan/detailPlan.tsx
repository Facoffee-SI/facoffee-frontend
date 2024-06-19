import { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/common/Loading';
import { PlanCustomer, ProductCustomer } from '../../../components/common/Models';
import api from '../../../services/Api';
import './style.css';
import { useLocation, useNavigate } from 'react-router-dom';
import noImage from '../../../assets/noImage.png';
import * as ROUTES from '../../../constants/routes';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

const planCustomer = {
  id: '',
  name: '',
  priceMonth: 0,
  priceYear: 0,
  description: '',
  active: true,
  images: [],
  productIds: []
}

const PlanPage = () => {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<PlanCustomer>(planCustomer);
  const [products, setProducts] = useState<ProductCustomer[]>([]);
  const location = useLocation();
  const navigate = useNavigate();
  const planId: string | null = location.state?.planId;

  useEffect(() => {
    setLoading(true);
    const fetchPlan = async () => {
      try {
        const response = await api.get(`plan/customer/${planId}`);
        setPlan(response.data);
      } catch (error) {
        toast.error('Erro ao buscar plano. Por favor, tente novamente mais tarde.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log('Erro ao buscar plano', error);
      }
    };

    fetchPlan();
    setLoading(false);
  }, [planId]);

  useEffect(() => {
    setLoading(true);
    const fetchProducts = async () => {
      try {
        if(plan.products) {
          const productPromises = plan.products.map(product => api.get(`product/customer/${product.product.id}`));
          const productResponses = await Promise.all(productPromises);
          setProducts(productResponses.map(response => response.data));
        }
      } catch (error) {
        toast.error('Erro ao buscar planos. Por favor, tente novamente mais tarde.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log('Erro ao buscar planos', error);
      }
    };

    fetchProducts();
    setLoading(false);
  },  [plan]);

  if (!planId) {
    navigate(ROUTES.CUSTOMER_PRODUCTS);
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  const originalPriceMonth = formatPrice(plan?.priceMonth);
  const originalPriceYear = formatPrice(plan?.priceYear);

  return (
    <>
      <ToastContainer />
      {loading ? (
        <Loading />
      ) : (
        <main className="primary-container p-5" style={{ maxWidth: '70.75rem' }}>
          <div className="secondary-container p-5">
            <div className="tertiary-container p-5">
              <div className="plan-container">
                <div className="plan-image">
                  <Carousel showThumbs={false} showArrows={true} infiniteLoop={true} showStatus={false}>
                    {plan.images.length > 0 ? (
                      plan.images.map((img, index) => (
                        <div key={index}>
                          <img src={img.imageUrl} alt={plan.name} style={{ maxHeight: "450px" }}/>
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
                <div className="plan-details">
                  <h3 className="plan-name">{plan?.name}</h3>
                  <div className="mb-1">
                    <span className="discounted-price">{originalPriceMonth} </span>
                    <span className="discounted-price">Mensal</span>
                  </div>
                  <div className="mb-2">
                    <span className="discounted-price">{originalPriceYear} </span>
                    <span className="discounted-price">Anual</span>
                  </div>
                  {plan?.description ? (
                    <div className="plan-description" dangerouslySetInnerHTML={{ __html: plan.description }} />
                    ) : (
                      <div>
                        <p>Plano sem descrição.</p>
                      </div>
                    )}
                  <div className="plan-buttons">
                    <button className="plan-buttons">Assinar</button>
                    <button className="plan-buttons">Cancelar assinatura</button>
                  </div>
                  {products.length > 0 ? (
                    <div>
                      <h4>Produtos inclusos:</h4>
                      <ul>
                        {products.map((product) => (
                          <li key={product.id}>
                            {product.name}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    <div>
                      <p>Este plano não possui produtos.</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </main>
      )}
    </>
  );
};

export default PlanPage;