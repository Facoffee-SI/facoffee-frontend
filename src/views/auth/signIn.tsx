import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import * as ROUTES from '../../constants/routes';
import api from '../../services/Api';
import CustomInput from '../../components/formik/CustomInput';
import '../../styles/style.css';

const SignInSchema = Yup.object({
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório preencher o email'),
  password: Yup.string()
    .required('Obrigatório preencher a senha')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

const SignIn = () => {
  const navigate = useNavigate();

  const onSignUp = () => navigate(ROUTES.SIGNUP);

  const onSubmitForm = (user: { email: string; password: string }) => {
    fetchLogin(user);
  };

  const fetchLogin = async (user: { email: string; password: string }) => {
    try {
      const response = await api.post(ROUTES.AUTH_USER, {
        email: user.email,
        password: user.password,
      });

      localStorage.setItem('token', JSON.stringify(response.data.token));
      navigate(ROUTES.ADMIN_USERS);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <main className="primary-container">
      <div className="card-container">
        <div className="card shadow-lg">
          <Formik
            initialValues={{ email: '', password: '' }}
            validateOnMount
            validationSchema={SignInSchema}
            onSubmit={onSubmitForm}
          >
            {() => (
              <Form className="signin-form">
                <h3 className="text-center">Login</h3>
                <div className="form-group">
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
                <div className="form-group">
                  <Link
                    onClick={onSignUp}
                    className="form-link"
                    to={ROUTES.FORGOT_PASSWORD}
                  >
                    <span>Esqueceu sua senha?</span>
                  </Link>
                  <button
                    className="btn bg-black text-white rounded p-1"
                    type="submit"
                  >
                    Entrar
                  </button>
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
