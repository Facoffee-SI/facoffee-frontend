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
    email: 'rafaelpereira@mail.com',
 },
];

const onSubmitForm = () => {};

const CreatePlan = () => {
  return (
    <main className="primary-container p-5 d-flex">
      <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 className="text-center mb-2">Cadastro de Plano</h3>
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
                    name="product"
                    type="string"
                    label="Produto"
                    placeholder="Produto"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />

                  <div className="d-flex gap-3">
                    <Field
                      name="princemonth"
                      type="string"
                      label="Preço mensal"
                      placeholder="Preço mensal"
                      component={CustomInput}
                    />
                    <Field
                      name="priceyear"
                      type="string"
                      label="Preço anual"
                      placeholder="Preço anual"
                      component={CustomInput}
                    />
                  </div>

                  <Field
                    name="status"
                    type="string"
                    label="Ativo"
                    placeholder="Ativo"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />
    
                  <div className="d-flex justify-content-center gap-4">
                    <button
                      className="btn bg-black text-white rounded p-1"
                      type="submit"
                      style={{ width: '100%'}}
                    >
                      Selecionar imagem
                    </button>
                  </div>

                  <div className="d-flex justify-content-center gap-4">
                    <button
                      className="btn bg-black text-white rounded p-1"
                      type="submit"
                      style={{ width: '100%' }}
                    >
                      Cadastrar
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

export default CreatePlan;
