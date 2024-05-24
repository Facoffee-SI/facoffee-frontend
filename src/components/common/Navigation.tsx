import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import '../../styles/navigation.css';
import { useState } from 'react';

const token = localStorage.getItem('token');

const Navigation = () => {
  const [collapseOpen, setCollapseOpen] = useState(false);

  const toggleCollapse = () => {
    setCollapseOpen(!collapseOpen);
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
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.SIGNIN} onClick={toggleCollapse}>
              Login
            </Link>
          </li>
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
            <Link className="nav-link" to={ROUTES.ADMIN_PLAN_ADD} onClick={toggleCollapse}>
              Cadastrar Plano
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ADMIN_PLAN_EDIT} onClick={toggleCollapse}>
              Editar Plano
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ADMIN_CONTACT_ADD} onClick={toggleCollapse}>
              Cadastrar informações de Contato
            </Link>
          </li>
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
          to={ROUTES.SIGNIN}
        >
          Login
        </Link>
      ) : (
        <Link
          className="btn bg-black text-white rounded p-1"
          to={ROUTES.SIGNIN}
        >
          Login
        </Link>
      )}
    </nav>
  );
};

export default Navigation;
