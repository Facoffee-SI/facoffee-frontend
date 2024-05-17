import { Field, Form, Formik } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';

const editPlanSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  description: Yup.string().required('Obrigatório preencher a descrição'),
  product: Yup.string().required('Obrigatório selecionar os produtos'),
  priceMonth: Yup.string().required('Obrigatório preencher o preço mensal'),
  priceYear: Yup.string().required('Obrigatório preencher o preço anual'),
  status: Yup.string().required('Obrigatório preencher o status'),
});

const onSubmitForm = () => {};

const EditPlan = () => {
  return (
    <main className="primary-container p-5 d-flex">
      <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 className="text-center mb-2">Edição de Plano</h3>
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
            validationSchema={editPlanSchema}
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
                      name="priceMonth"
                      type="string"
                      label="Preço mensal"
                      placeholder="Preço mensal"
                      component={CustomInput}
                    />
                    <Field
                      name="priceYear"
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
                      className="btn bg-danger text-white rounded p-1"
                      type="submit"
                      style={{ width: '50%' }}
                    >
                      Remover
                    </button>
                    <button
                      className="btn bg-black text-white rounded p-1"
                      type="submit"
                      style={{ width: '50%' }}
                    >
                      Editar
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

export default EditPlan;
