import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import api from '../../../services/Api';
import { ContactObject } from '../../../components/common/Models';
import { useEffect, useState } from 'react';
import Loading from '../../../components/common/Loading';
import FroalaEditor from 'froala-editor';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createContactSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório preencher o email'),
  phone: Yup.string().required('Obrigatório preencher o telefone'),
  address: Yup.string().required('Obrigatório preencher o endereço'),
  linkGoogleMaps: Yup.string().required('Obrigatório preencher o link do Google Maps'),
});

const CreateContact = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [editorInstance, setEditorInstance] = useState<FroalaEditor | null>(null);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await api.get('contact');
        if (response.data.length) {
          navigate(ROUTES.ADMIN_CONTACT_EDIT);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar contato');
        setLoading(false);
      }
    };
    fetchContact();
  }, [navigate]);

  const initFroalaEditor = () => {
    const froala = new FroalaEditor('#froala-editor', {
      placeholderText: 'Insira a descrição...',
      toolbarSticky: false,
    });
    setEditorInstance(froala);
  };

  useEffect(() => {
    initFroalaEditor();
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
  }, [editorInstance]);

  const onSubmitForm = async (
    values: ContactObject,
    { setSubmitting }: FormikHelpers<ContactObject>
  ) => {
    try {
      const editorContent = editorInstance?.html.get();
      await api.post('contact', {
        ...values,
        description: editorContent,
      });
      navigate(ROUTES.ADMIN_CONTACT_EDIT);
    } catch (error: any) {
      console.error('Erro ao cadastrar ou editar o contato');
      let errorMessage = 'Ocorreu um erro. Por favor, tente novamente.';
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Cargo não autorizado a realizar essa ação.';
        } if (error.response.status === 400 || error.response.status === 404) {
          errorMessage = 'Verifique as informações inseridas e tente novamente.';
        } else {
          errorMessage = 'Erro no servidor. Por favor, tente novamente mais tarde.';
        }
      } else if (error.request) {
        errorMessage = 'Sem resposta do servidor. Por favor, tente novamente mais tarde.';
      } else {
        errorMessage = 'Erro ao enviar a requisição. Por favor, tente novamente mais tarde.';
      }
      
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <main className="primary-container p-5 d-flex">
        <div
          className="card bg-white p-5"
          style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}
        >
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
                  <div id="froala-editor"></div>
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
