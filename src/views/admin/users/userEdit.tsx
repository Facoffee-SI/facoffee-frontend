import { Field, Form, Formik } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';

const UserEditSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório preencher o Email.'),
  roles: Yup.string().required('Obrigatório preencher cargos'),
  password: Yup.string()
    .required('Obrigatório preencher a senha')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: Yup.string().required('Obrigatório confirmar a senha'),
});

const UserExample = [
  {
    id: 1,
    name: 'Rafael Pereira',
    role: 'Vendedor | Gerente',
    email: 'rafaelpereira@mail.com',
    img: 'data:image/png;base64, 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',
  },
];

const onSubmitForm = () => {};

const UsersEdit = () => {
  return (
    <main className="primary-container p-5">
      <div className="secondary-container p-5">
        <div className="tertiary-container">
          <h3 className="text-center m-2">Edição de usuário</h3>
          {UserExample.map((item) => (
            <Formik
              key={item.id}
              initialValues={{
                name: item.name,
                email: item.email,
                roles: '',
                password: '',
                confirmPassword: '',
              }}
              validateOnMount
              validationSchema={UserEditSchema}
              onSubmit={onSubmitForm}
            >
              {() => (
                <Form className="users-edit-form">
                  <div className="d-flex flex-column gap-3">
                    <img
                      src={item.img}
                      alt={item.name}
                      height="100px"
                      style={{ objectFit: 'none' }}
                    ></img>
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
                      type="string"
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
                        name="confirmPassword"
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
                        Remover usuário
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
          ))}
        </div>
      </div>
    </main>
  );
};

export default UsersEdit;
