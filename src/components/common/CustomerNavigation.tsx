import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import '../../styles/navigation.css';
import { useEffect, useState } from 'react';

const CustomerNavigation = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const tokenCustomer = localStorage.getItem('tokenCustomer');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  useEffect(() => {}, [tokenCustomer, token]);

  const handleLogout = () => {
    localStorage.removeItem('tokenCustomer');
    navigate(ROUTES.CUSTOMER_LOGIN);
  };

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`${ROUTES.CUSTOMER_PRODUCTS}?search=${searchQuery}`);
      setSearchQuery('');
      setCollapseOpen(false);
    }
  };

  return (
    <nav className="navbar-container navbar p-2">
      <button
        className="navbar-toggler"
        style={{ marginRight: '10px' }}
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        onClick={toggleCollapse}
        aria-expanded={collapseOpen ? 'true' : 'false'}
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className={`collapse navbar-collapse ${collapseOpen ? 'show' : ''}`} id="navbarNavAltMarkup">
        <ul className={`navbar-nav ${collapseOpen ? 'nav-expanded' : ''}`}>
          <li className="nav-item">
            <form className="d-flex ml-auto search-input" onSubmit={handleSearch}>
              <input
                className="form-control me-2"
                type="search"
                placeholder="Buscar produto"
                aria-label="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <button className="btn btn-success" type="submit">
                Buscar
              </button>
            </form>
          </li>
          {tokenCustomer ? (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={ROUTES.CUSTOMER_CART} onClick={toggleCollapse}>
                  Carrinho
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={ROUTES.CUSTOMER_EDIT} onClick={toggleCollapse}>
                  Editar cadastro
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={ROUTES.CUSTOMER_LOGIN} onClick={toggleCollapse}>
                  Pedidos
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" to={ROUTES.CUSTOMER_LOGIN} onClick={toggleCollapse}>
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={ROUTES.CUSTOMER_REGISTER} onClick={toggleCollapse}>
                  Criar conta
                </Link>
              </li>
            </>
          )}
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.CUSTOMER_PRODUCTS} onClick={toggleCollapse}>
              Catálogo de Produtos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.CUSTOMER_PLANS} onClick={toggleCollapse}>
              Catálogo de Planos
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.CUSTOMER_ABOUT} onClick={toggleCollapse}>
              Sobre Nós
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.CUSTOMER_CONTACT} onClick={toggleCollapse}>
              Contato
            </Link>
          </li>
          {tokenCustomer && (
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.CUSTOMER_LOGIN} onClick={handleLogout}>
                Sair
              </Link>
            </li>
          )}
        </ul>
      </div>
      <a className="navbar-brand rounded">
        <img
          className="img-fluid"
          src="/images/facoffee-logo.png"
          alt="Facoffee logo"
          width="56"
          height="56"
        />
      </a>
      {tokenCustomer ? (
        <Link
          className="btn bg-black text-white rounded p-2"
          onClick={handleLogout}
          to={ROUTES.CUSTOMER_LOGIN}
        >
          Sair
        </Link>
      ) : (
        <Link
          className="btn bg-black text-white rounded p-2"
          to={ROUTES.CUSTOMER_LOGIN}
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default CustomerNavigation;
