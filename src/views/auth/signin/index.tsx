import { Field, Form, Formik } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { FORGOT_PASSWORD, SIGNUP } from '../../../constants/routes';

const onSubmitForm = () => {};

const onClickLink = () => {
  // if (true) {
  //   e.preventDefault();
  // }
};

function SignIn() {
  return (
    <main className="container-fluid d-flex flex-fill p-5">
      <div
        className="card flex-fill justify-content-center align-items-center rounded p-5"
        style={{ backgroundColor: 'var(--clr-tertiary)' }}
      >
        <div className="card align-items-center shadow-lg rounded bg-white p-5">
          <h3>Login</h3>
          <Formik
            initialValues={{ email: '', password: '' }}
            validateOnMount
            validationSchema={Yup.object({
              email: Yup.string()
                .email('Email inválido')
                .required('Obrigatório preencher o Email.'),
              password: Yup.string()
                .required('Obrigatório preencher a Senha.')
                .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
            })}
            onSubmit={onSubmitForm}
          >
            {() => (
              <Form className="d-flex flex-column align-items-center w-100 p-1">
                <div>
                  <Field
                    name="email"
                    type="email"
                    label="Email"
                    autoComplete="true"
                    placeholder="Email"
                  />
                </div>
                <div>
                  <Field
                    name="password"
                    type="password"
                    label="Password"
                    autoComplete="current-password"
                    placeholder="Senha"
                  />
                </div>
                <br />
                <div className="d-flex flex-column">
                  <Link
                    onClick={onClickLink}
                    style={{ textDecoration: 'underline', color: 'black' }}
                    to={FORGOT_PASSWORD}
                  >
                    <span>Esqueceu sua senha?</span>
                  </Link>
                  <button
                    className="button bg-black text-white rounded"
                    type="submit"
                  >
                    Entrar
                  </button>
                  <br />
                  <span>
                    Não tem uma conta?
                    <Link
                      onClick={onClickLink}
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
}

export default SignIn;
