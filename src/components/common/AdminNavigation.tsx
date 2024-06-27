import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import '../../styles/navigation.css';
import { useEffect, useState } from 'react';
import { ConfirmationModal } from './ConfirmationModal';

const AdminNavigation = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isLoginCustomer, setIsLoginCustomer] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  useEffect(() => {}, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('cart')
    localStorage.removeItem('deliveryAddress')
    localStorage.removeItem('tokenCustomer');
    setShowModal(false);
    isLoginCustomer ? navigate(ROUTES.CUSTOMER_LOGIN) : navigate(ROUTES.ADMIN_LOGIN);
  };

  return (
    <>
      <ConfirmationModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleLogout}
        text="Deseja realmente sair da conta?"
      />
      <nav className="navbar-container navbar p-2">
        <button
          className="navbar-toggler"
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
            {token ? (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={ROUTES.ADMIN_USERS} onClick={toggleCollapse}>
                    Usuários
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={ROUTES.ADMIN_CATEGORIES} onClick={toggleCollapse}>
                    Categorias
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={ROUTES.ADMIN_ROLES} onClick={toggleCollapse}>
                    Cargos
                  </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={ROUTES.ADMIN_PRODUCTS} onClick={toggleCollapse}>
                      Produtos
                    </Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to={ROUTES.ADMIN_PLANS} onClick={toggleCollapse}>
                      Planos
                    </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={ROUTES.ADMIN_CONTACT_ADD} onClick={toggleCollapse}>
                    Cadastrar informações de Contato
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={ROUTES.ADMIN_ABOUT_ADD} onClick={toggleCollapse}>
                    Cadastrar informações da tela "Sobre Nós"
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={ROUTES.ADMIN_REPORTS} onClick={toggleCollapse}>
                    Gerar Relatórios
                  </Link>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => {
                    setShowModal(true);
                    setIsLoginCustomer(true);
                  }}>
                    Login para Cliente
                  </button>
                </li>
                <li className="nav-item">
                  <button className="nav-link" onClick={() => setShowModal(true)}>
                    Sair
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link className="nav-link" to={ROUTES.ADMIN_LOGIN} onClick={toggleCollapse}>
                    Login
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to={ROUTES.CUSTOMER_LOGIN} onClick={toggleCollapse}>
                    Login para Cliente
                  </Link>
                </li>
              </>
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
        {token ? (
          <button
            className="btn bg-black text-white rounded p-2"
            onClick={() => setShowModal(true)}
          >
            Sair
          </button>
        ) : (
          <Link
            className="btn bg-black text-white rounded p-2"
            to={ROUTES.ADMIN_LOGIN}
          >
            Login
          </Link>
        )}
      </nav>
    </>
  );
};

export default AdminNavigation;
