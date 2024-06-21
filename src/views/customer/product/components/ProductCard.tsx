import { Card, CardHeader, CardImg, CardBody, CardTitle, CardText, Button } from 'react-bootstrap';
import '../style.css';
import { CartItem, ProductCustomer } from '../../../../components/common/Models';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../../constants/routes';
import noImage from '../../../../assets/noImage.png';

export interface Props {
  productObject: ProductCustomer;
}

function ProductCard({ productObject }: Props) {
  const navigate = useNavigate();

  const productDetail = () => {
    return navigate(ROUTES.CUSTOMER_PRODUCT, { state: { productId: productObject.id } });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  const calculateDiscount = () => {
    let discount;
    if (productObject.isDiscountPercentage) {
      discount = (productObject.price - (productObject.price * (productObject.discountValue / 100)));
    } else {
      discount = (productObject.price - productObject.discountValue);
    }

    return discount;
  }

  const handleAddCart = () => {
    const cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingProductIndex = cart.findIndex(item => item.productId === productObject.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += 1;
    } else {
      cart.push({ productId: productObject.id, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
  };

  const handleBuy = () => {
    handleAddCart();
    navigate(ROUTES.CUSTOMER_CART);
  }

  const hasDiscount = productObject.discountValue > 0;
  const originalPrice = formatPrice(productObject.price);
  const discountedPrice = formatPrice(calculateDiscount());

  return (
    <Card className="product-card">
      <div className="d-flex flex-column h-100">
        <CardHeader className="product-card-header">
          <CardImg
            className="product-image"
            src={productObject.images[0] ? productObject.images[0].imageUrl : noImage}
            alt={productObject.name}
          />
        </CardHeader>
        <CardBody className="d-flex flex-column justify-content-between">
          <div>
            <CardTitle className="fw-bold product-card-title">{productObject.name}</CardTitle>
            <CardText>{productObject.brand}</CardText>
          </div>
          <div>
            {hasDiscount ? (
              <div>
                <CardText className="text-muted product-card-text">{originalPrice}</CardText>
                <CardText className="text-success product-card-discount">
                  {discountedPrice}
                  <span>Assinatura</span>
                </CardText>
              </div>
            ) : (
              <CardText className="text-muted product-card-text">{originalPrice}</CardText>
            )}
          </div>
          <div className="d-flex justify-content-between mt-2">
            <Button onClick={productDetail} variant="secondary">Visualizar</Button>
            <span className="mx-1"></span>
            <Button onClick={handleBuy} variant="success btn-add">Comprar</Button>
          </div>
        </CardBody>
      </div>
    </Card>
  );
}

export default ProductCard;