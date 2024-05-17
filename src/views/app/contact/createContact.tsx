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
    .required('Obrigatório preencher a Senha.')
    .min(6, 'A senha deve ter no mínimo 6 caracteres.'),
  confirmPassword: Yup.string().required('Obrigatório confirmar a senha.'),
});

const UserExample = [
  {
    id: 1,
    name: '',
    role: 'Vendedor | Gerente',
    email: '',
 },
];

const onSubmitForm = () => {};

const CreateContact = () => {
  return (
    <main className="primary-container p-5 d-flex">
      <div className="bg-white p-5" style={{ maxWidth: '112.5rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 className="text-center mb-4">Cadastro de informações de contato</h3>
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
                  <Field
                    name="name"
                    type="string"
                    label="Nome Completo"
                    autoComplete="true"
                    placeholder="Nome Completo"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />


                  <div className="d-flex gap-3">
                    <Field
                      name="email"
                      type="string"
                      label="Email"
                      placeholder="Email"
                      component={CustomInput}
                    />
                    <Field
                      name="telefone"
                      type="string"
                      label="telefone"
                      placeholder="telefone"
                      component={CustomInput}
                    />
                  </div>

                  <Field
                    name="description"
                    type="string"
                    label="Descrição"
                    autoComplete="true"
                    placeholder="Descrição"
                    component={CustomInput}
                    style={{ width: '100%', height: '9.375rem' }} 
                  />

                <Field
                    name="maps"
                    type="string"
                    label="GoogleMaps"
                    placeholder="GoogleMaps (Link)"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />
    

                  <div className="d-flex justify-content-center gap-4">
                    <button
                      className="btn bg-black text-white rounded p-1"
                      type="submit"
                      style={{ width: '100%' }} // Ajuste do width do botão
                    >
                      Cadastrar informações de usuário
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        ))}
      </div>
    </main>
  );
};

export default CreateContact;
