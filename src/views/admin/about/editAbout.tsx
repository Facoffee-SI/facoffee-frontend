import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import FroalaEditor from 'froala-editor';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import api from '../../../services/Api';
import Loading from '../../../components/common/Loading';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import 'froala-editor/css/froala_style.min.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const createAbout = Yup.object();

const EditAbout = () => {
  const navigate = useNavigate();
  const [editorInstance, setEditorInstance] = useState<FroalaEditor | null>(null);
  const [loading, setLoading] = useState(false);
  const [aboutContent, setAboutContent] = useState('');

  const initFroalaEditor = () => {
    const froala = new FroalaEditor('#froala-editor', {
      placeholderText: 'Escreva algo...',
      toolbarSticky: false,
    });
    setEditorInstance(froala);
  };

  useLayoutEffect(() => {
    initFroalaEditor();
    return () => {
      if (editorInstance) {
        editorInstance.destroy();
      }
    };
  }, [editorInstance]);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const response = await api.get('about');
        if (!response.data.length) {
          navigate(ROUTES.ADMIN_ABOUT_ADD);
          return;
        }
        setAboutContent(response.data[0].description);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar "Sobre Nós"');
        setLoading(false);
      }
    };
    fetchAbout();
  }, [navigate]);

  useEffect(() => {
    if (editorInstance && aboutContent) {
      editorInstance.html.set(aboutContent);
    }
  }, [editorInstance, aboutContent]);

  const onSubmitForm = async () => {
    try {
      const editorContent = editorInstance?.html.get();
      await api.post('about', {
        description: editorContent,
      });
      navigate(ROUTES.ADMIN_ABOUT_EDIT);
    } catch (error: any) {
      console.error('Erro ao enviar informações do "Sobre Nós".');
      let errorMessage = 'Ocorreu um erro. Por favor, tente novamente.';
      if (error.response) {
        if (error.response.status === 401) {
          errorMessage = 'Cargo não autorizado a realizar essa ação.';
        } if (error.response.status === 400 || error.response.status === 404) {
          errorMessage = 'Preencha algo no campo de informações.';
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
    }
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <main className="primary-container p-5 d-flex">
        <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
          <h3 className="text-center mb-4">Edição de Informações da tela "Sobre nós"</h3>
          <Formik
            initialValues={{}}
            validateOnMount
            validationSchema={createAbout}
            onSubmit={onSubmitForm}
          >
            {() => (
              <Form className="users-edit-form">
                <div className="d-flex flex-column gap-3">
                  <div id='froala-editor'></div>
                  <div className="d-flex justify-content-center gap-4">
                    <button
                      className="btn bg-black text-white rounded p-1"
                      type="submit"
                      style={{ width: '100%' }}
                    >
                      Editar informações
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

export default EditAbout;