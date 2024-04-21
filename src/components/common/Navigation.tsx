import { Link } from 'react-router-dom';
import {
  ADMIN_USERS,
  ADMIN_USERS_EDIT,
  SIGNIN,
  SIGNUP,
} from '../../constants/routes';
import '../../styles/navigation.css';

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
            <Link className="nav-link" to={SIGNIN}>
              Login
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ADMIN_USERS}>
              Usuários
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={ADMIN_USERS_EDIT}>
              Editar Usuário
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
      <Link className="btn bg-black text-white rounded p-1" to={SIGNUP}>
        Cadastro
      </Link>
    </nav>
  );
};

export default Navigation;
