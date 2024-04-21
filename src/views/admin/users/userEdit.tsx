import { Field, Form, Formik } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';

const UserEditSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório preencher o Email.'),
  roles: Yup.array().required('Obrigatório preencher cargos'),
  password: Yup.string()
    .required('Obrigatório preencher a Senha.')
    .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  confirmPassword: Yup.string()
    .required('Obrigatório confirmar a senha.')
    .equals([Yup.ref('password')], 'As senhas devem ser iguais'),
});

const onSubmitForm = () => {};

const UsersEdit = () => {
  return (
    <main className="primary-container p-5">
      <div className="secondary-container p-5">
        <div className="tertiary-container">
          <h3 className="text-center m-2">Edição de usuário</h3>
          <Formik
            initialValues={{ name: '', email: '', password: '' }}
            validateOnMount
            validationSchema={UserEditSchema}
            onSubmit={onSubmitForm}
          >
            {() => (
              <Form className="users-edit-form">
                <div className="d-flex flex-column gap-3">
                  <Field
                    name="name"
                    type="string"
                    label="Nome Completo"
                    autoComplete="true"
                    placeholder="Nome Completo"
                    component={CustomInput}
                  />
                  <Field
                    name="email"
                    type="email"
                    label="Email"
                    autoComplete="true"
                    placeholder="Email"
                    component={CustomInput}
                  />
                  <Field
                    name="roles"
                    type="dropdown"
                    label="Cargos"
                    placeholder="Cargos"
                    component={CustomInput}
                  />
                  <div className="d-flex gap-3">
                    <Field
                      name="password"
                      type="password"
                      label="Senha"
                      autoComplete="current-password"
                      placeholder="Senha"
                      component={CustomInput}
                    />
                    <Field
                      name="password-confirmation"
                      type="password"
                      label="Confirmação de senha"
                      autoComplete="current-password"
                      placeholder="Confirme sua senha"
                      component={CustomInput}
                    />
                  </div>
                  <div className="d-flex justify-content-center gap-4">
                    <button
                      className="btn bg-danger text-white rounded p-1 w-100"
                      type="submit"
                    >
                      Remover usuários
                    </button>
                    <button
                      className="btn bg-black text-white rounded p-1 w-100"
                      type="submit"
                    >
                      Editar usuário
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};

export default UsersEdit;