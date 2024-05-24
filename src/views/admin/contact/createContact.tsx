import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import api from '../../../services/Api';
import { ContactObject } from '../../../components/common/Models';
import { useEffect, useState } from 'react';
import Loading from '../../../components/common/Loading';

const createContactSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório preencher o email'),
  phone: Yup.string().required('Obrigatório preencher o telefone'),
  description: Yup.string().required('Obrigatório preencher a descrição'),
  address: Yup.string().required('Obrigatório preencher o endereço'),
  linkGoogleMaps: Yup.string().required('Obrigatório preencher o link do Google Maps'),
});

const CreateContact = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await api.get('contact');
        if(response.data.length) {
          navigate(ROUTES.ADMIN_CONTACT_EDIT);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar contato', error);
        setLoading(true);
      }
    };
    fetchContact();
  }, [navigate]);


  const onSubmitForm = async (values: ContactObject, { setSubmitting }: FormikHelpers<ContactObject>) => {
    try {
      await api.post('contact', values);
      navigate(ROUTES.ADMIN_CONTACT_EDIT);
    } catch (error) {
      console.error('Erro ao cadastrar ou editar o contato');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
    {loading && <Loading />}
    <main className="primary-container p-5 d-flex">
      <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 className="text-center mb-4">Cadastrar de Informações de Contato</h3>
          <Formik
            initialValues={{
              name: '',
              email: '',
              phone: '',
              description: '',
              address: '',
              linkGoogleMaps: '',
            }}
            validateOnMount
            validationSchema={createContactSchema}
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
                <div className="d-flex gap-3">
                  <Field
                    name="email"
                    type="string"
                    label="Email"
                    placeholder="Email"
                    component={CustomInput}
                  />
                  <Field
                    name="phone"
                    type="number"
                    label="Telefone"
                    placeholder="Telefone"
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
                  style={{ width: '100%', height: '5.375rem' }}
                />
                <Field
                  name="address"
                  type="string"
                  label="Endereço"
                  placeholder="Endereço"
                  component={CustomInput}
                  style={{ width: '100%' }}
                />
                <Field
                  name="linkGoogleMaps"
                  type="string"
                  label="Google Maps"
                  placeholder="Google Maps (Link)"
                  component={CustomInput}
                  style={{ width: '100%' }}
                />
                <div className="d-flex justify-content-center gap-4">
                  <button
                    className="btn bg-black text-white rounded p-1"
                    type="submit"
                    style={{ width: '100%' }}
                  >
                    Cadastrar informações de Contato
                  </button>
                </div>
              </div>
            </Form>
          )}
          </Formik>
      </div>
    </main>
    </>
  );
};

export default CreateContact;
