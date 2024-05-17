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

const EditProduct = () => {
  return (
    <main className="primary-container p-5 d-flex">
      <div className="bg-white p-5" style={{ maxWidth: '112.5rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 className="text-center mb-4">Edição de produto</h3>
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
                    style={{ width: '100%' }} 
                  />
                  <Field
                    name="marca"
                    type="string"
                    label="Marca"
                    placeholder="Marca"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />
                  <Field
                    name="price"
                    type="string"
                    label="Preço"
                    placeholder="Preço"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />
                  <div className="d-flex gap-3">
                    <Field
                      name="discount"
                      type="string"
                      label="Desconto"
                      placeholder="Desconto"
                      component={CustomInput}
                    />
                    <Field
                      name="discountprice"
                      type="string"
                      label="Desconto para assinantes"
                      placeholder="Desconto para assinantes"
                      component={CustomInput}
                    />
                  </div>
                  <Field
                    name="codebar"
                    type="string"
                    label="Código de barras"
                    placeholder="Código de barras"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />

                  <Field
                    name="category"
                    type="string"
                    label="Categorias"
                    placeholder="Categorias"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />

                  <Field
                    name="quantity"
                    type="string"
                    label="Quantidade"
                    placeholder="Quantidade"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />

                  <div className="d-flex justify-content-center gap-4">
                    <button
                      className="btn bg-black text-white rounded p-1"
                      type="submit"
                      style={{ width: 'auto'}}
                    >
                      Selecionar Imagem
                    </button>
                  </div>

                  <div className="d-flex justify-content-center gap-4">
                    <button
                      className="btn bg-danger text-white rounded p-1"
                      type="submit"
                      style={{ width: '50%' }} // Ajuste do width do botão
                    >
                      Remover usuário
                    </button>
                    <button
                      className="btn bg-black text-white rounded p-1"
                      type="submit"
                      style={{ width: '50%' }} // Ajuste do width do botão
                    >
                      Editar produto
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

export default EditProduct;
