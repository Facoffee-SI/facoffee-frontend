import { Field, Form, Formik } from 'formik';
import { CustomInput } from '../../../components/formik';
import CurrencyInput from 'react-currency-input-field';
import * as Yup from 'yup';

const createPlanSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  description: Yup.string().required('Obrigatório preencher a descrição'),
  product: Yup.string().required('Obrigatório selecionar os produtos'),
  priceMonth: Yup.string().required('Obrigatório preencher o preço mensal'),
  priceYear: Yup.string().required('Obrigatório preencher o preço anual'),
  status: Yup.string().required('Obrigatório preencher o status'),
});

const onSubmitForm = () => {};

const CreatePlan = () => {
  return (
    <main className="primary-container p-5 d-flex">
      <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 className="text-center mb-2">Cadastro de Plano</h3>
          <Formik
            initialValues={{
              name: '',
              description: '',
              product: '',
              priceMonth: '',
              priceYear: '',
              status: '',
            }}
            validateOnMount
            validationSchema={createPlanSchema}
            onSubmit={onSubmitForm}
          >
            {({ setFieldValue }) => (
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
                    style={{ width: '100%', height: '5.375rem' }} 
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
                    <CurrencyInput
                      name="priceMonth"
                      placeholder="Preço mensal"
                      decimalsLimit={2}
                      prefix="R$ "
                      intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                      onValueChange={(value) => setFieldValue('priceMonth', value)}
                      style={{ width: '100%' }}
                    />
                    <CurrencyInput
                      name="priceYear"
                      placeholder="Preço anual"
                      decimalsLimit={2}
                      prefix="R$ "
                      intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                      onValueChange={(value) => setFieldValue('priceYear', value)}
                      style={{ width: '100%' }}
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
      </div>
    </main>
  );
};

export default CreatePlan;
