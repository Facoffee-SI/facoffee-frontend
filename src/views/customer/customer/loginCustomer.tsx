import { Field, Form, Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import * as ROUTES from '../../../constants/routes';
import api from '../../../services/Api';
import CustomInput from '../../../components/formik/CustomInput';
import '../../../styles/style.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const loginSchema = Yup.object({
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório preencher o email'),
  password: Yup.string()
    .required('Obrigatório preencher a senha')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
});

const CustomerLogin = () => {
  const navigate = useNavigate();

  const onSubmitForm = (user: { email: string; password: string }) => {
    fetchLogin(user);
  };

  const fetchLogin = async (user: { email: string; password: string }) => {
    try {
      const response = await api.post('auth/customer', {
        email: user.email,
        password: user.password,
      });
  
      localStorage.removeItem('token');
      localStorage.setItem('tokenCustomer', JSON.stringify(response.data.token));
      navigate(ROUTES.CUSTOMER_PRODUCTS);
    } catch (error: any) {
      console.error('Erro ao logar.')
      let errorMessage = 'Ocorreu um erro. Por favor, tente novamente.';
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Credenciais inválidas. Verifique seu email e senha.';
        } else {
          errorMessage = 'Erro no servidor. Por favor, tente novamente mais tarde.';
        }
      } else if (error.request) {
        errorMessage = 'Sem resposta do servidor. Por favor, tente novamente mais tarde.';
      } else {
        errorMessage = 'Erro ao enviar a requisição. Por favor, tente novamente mais tarde.';
      }

      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <>
      <ToastContainer />
      <main className="primary-container">
        <div className="card-container">
          <div className="card shadow-lg">
            <Formik
              initialValues={{ email: '', password: '' }}
              validateOnMount
              validationSchema={loginSchema}
              onSubmit={onSubmitForm}
            >
              {() => (
                <Form className="login-form">
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
                    <button
                      className="btn bg-black text-white rounded p-1"
                      type="submit"
                    >
                      Entrar
                    </button>
                    <span>
                      Não tem uma conta?
                      <Link
                        style={{ marginLeft:'3px', textDecoration: 'underline', color: 'black' }}
                        to={ROUTES.CUSTOMER_REGISTER}
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
    </>
  );
};

export default CustomerLogin;
