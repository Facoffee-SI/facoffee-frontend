import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';
import * as ROUTES from '../../../constants/routes';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/Api';

const createCategorySchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
});

const CreateCategory = () => {
  const navigate = useNavigate();

  const onSubmitForm = async (values: { name: string }, { setSubmitting }: FormikHelpers<{ name: string }>) => {
    try {
      await api.post('category', { name: values.name });

      navigate(ROUTES.ADMIN_CATEGORIES);
    } catch (error) {
      console.error('Erro ao cadastrar a categoria');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="primary-container p-5 d-flex">
      <div className="card bg-white p-5" style={{ maxWidth: '30.75rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 className="text-center mb-4">Cadastro de Categoria</h3>
          <Formik
            initialValues={{
              name: '',
            }}
            validateOnMount
            validationSchema={createCategorySchema}
            onSubmit={onSubmitForm}
          >
            {() => (
              <Form className="users-edit-form">
                <div className="d-flex flex-column gap-3">
                  <Field
                    name="name"
                    type="string"
                    label="Nome"
                    autoComplete="true"
                    placeholder="Nome"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />
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

export default CreateCategory;
