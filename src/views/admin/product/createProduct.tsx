import { Field, Form, Formik } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';

const createProductSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  description: Yup.string().required('Obrigatório preencher a descrição'),
  brand: Yup.string().required('Obrigatório preencher a marca'),
  price: Yup.string().required('Obrigatório preencher o preço'),
  codebar: Yup.string().required('Obrigatório preencher o código de barras'),
  category: Yup.string().required('Obrigatório selecionar as categorias'),
  quantity: Yup.string().required('Obrigatório preencher a quantidade'),
});

const onSubmitForm = () => {};

const CreateProduct = () => {
  return (
    <main className="primary-container p-5 d-flex">
      <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 className="text-center mb-2">Cadastro de Produto</h3>
        <Formik
          initialValues={{
            name: '',
            description: '',
            brand: '',
            price: '',
            codebar: '',
            category: '',
            quantity: '',
            discount: '',
            discountSubscription: '',
          }}
          validateOnMount
          validationSchema={createProductSchema}
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
                  name="brand"
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
                    name="discountSubscription"
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
                    type="button"
                    style={{ width: '100%'}}
                  >
                    Selecionar imagens
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
      </div>
    </main>
  );
};

export default CreateProduct;
