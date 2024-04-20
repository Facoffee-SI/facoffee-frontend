import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import { FORGOT_PASSWORD, SIGNUP } from '../../../constants/routes';
import api from '../../../services/Api';
import './signin.css';
import CustomInput from '../../../components/formik/CustomInput';

const SignInSchema = Yup.object({
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório preencher o Email.'),
  password: Yup.string()
    .required('Obrigatório preencher a Senha.')
    .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
});

const SignIn = () => {
  const navigate = useNavigate();

  const onSignUp = () => navigate(SIGNUP);

  const onSubmitForm = (user: { email: string; password: string }) => {
    fetchLogin(user);
  };

  const fetchLogin = async (user: { email: string; password: string }) => {
    try {
      const response = await api.post('/auth/user', {
        email: user.email,
        password: user.password,
      });

      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="container-fluid d-flex flex-fill p-5 g-0">
      <div
        className="card flex-fill justify-content-center align-items-center rounded p-5 g-0"
        style={{ backgroundColor: 'var(--clr-tertiary)' }}
      >
        <div className="card justify-content-center align-items-center shadow-lg rounded bg-white w-50 h-50">
          <h3>Login</h3>
          <Formik
            initialValues={{ email: '', password: '' }}
            validateOnMount
            validationSchema={SignInSchema}
            onSubmit={onSubmitForm}
          >
            {() => (
              <Form className="d-flex flex-fill flex-column justify-content-center align-items-center gap-5">
                <div className="d-flex flex-column">
                  <Field
                    name="email"
                    type="email"
                    label="Email"
                    autoComplete="true"
                    placeholder="Email"
                    component={CustomInput}
                  />
                  <Field
                    name="password"
                    type="password"
                    label="Senha"
                    autoComplete="current-password"
                    placeholder="Senha"
                    component={CustomInput}
                  />
                </div>
                <div className="d-flex flex-column">
                  <Link
                    onClick={onSignUp}
                    style={{ textDecoration: 'underline', color: 'black' }}
                    to={FORGOT_PASSWORD}
                  >
                    <span>Esqueceu sua senha?</span>
                  </Link>
                  <button
                    className="btn bg-black text-white rounded p-1"
                    type="submit"
                  >
                    Entrar
                  </button>
                  <span>
                    Não tem uma conta?
                    <Link
                      onClick={onSignUp}
                      style={{ textDecoration: 'underline', color: 'black' }}
                      to={SIGNUP}
                    >
                      Faça seu cadastro
                    </Link>
                  </span>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default SignIn;
