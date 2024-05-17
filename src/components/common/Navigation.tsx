import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import '../../styles/navigation.css';

const token = localStorage.getItem('token');

const Navigation = () => {
  return (
    <nav className="navbar-container navbar p-2">
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.SIGNIN}>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ADMIN_USERS}>
              Usuários
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ADMIN_USERS_CREATE}>
              Cadastrar Usuário
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ADMIN_USERS_EDIT}>
              Editar Usuário
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ADMIN_PRODUCT_ADD}>
              Cadastrar Produto
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ADMIN_PRODUCT_EDIT}>
              Editar Produto
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ADMIN_PLAN_ADD}>
              Cadastrar Plano
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ADMIN_PLAN_EDIT}>
              Editar Plano
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ADMIN_CONTACT_ADD}>
              Cadastrar Contato
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ROUTES.ADMIN_CONTACT_EDIT}>
              Editar Contato
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
          className="btn bg-black text-white rounded p-1"
          to={ROUTES.SIGNIN}
        >
          Teste
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
