import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import '../../styles/navigation.css';
import { useEffect, useState } from 'react';

const Navigation = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
  };

  useEffect(() => {}, [token]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate(ROUTES.SIGNIN);
  };

  return (
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
        <ul className="navbar-nav">
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
                <Link className="nav-link" to={ROUTES.SIGNIN} onClick={handleLogout}>
                  Deslogar
                </Link>
              </li>
            </>
          ) : (
            <li className="nav-item">
              <Link className="nav-link" to={ROUTES.SIGNIN} onClick={toggleCollapse}>
                Login
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
      {token ? (
        <Link
          className="btn bg-black text-white rounded p-2"
          onClick={handleLogout}
          to={ROUTES.SIGNIN}
        >
          Deslogar
        </Link>
      ) : (
        <Link
          className="btn bg-black text-white rounded p-2"
          to={ROUTES.SIGNIN}
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
