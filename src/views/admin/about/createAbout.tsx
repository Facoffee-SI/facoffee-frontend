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

const createAbout = Yup.object();

const CreateAbout = () => {
  const navigate = useNavigate();
  const [editorInstance, setEditorInstance] = useState<FroalaEditor | null>(null);
  const [loading, setLoading] = useState(false);

  const initFroalaEditor = () => {
    const froala = new FroalaEditor('#froala-editor', {
      placeholderText: 'Escreva algo...',
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
        if(response.data.length) {
          navigate(ROUTES.ADMIN_ABOUT_EDIT);
        }
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar "Sobre Nós"');
        setLoading(false);
      }
    };
    fetchAbout();
  }, [navigate]);

  const onSubmitForm = async () => {
    try {
      const editorContent = editorInstance?.html.get();
      await api.post('about', {
        description: editorContent,
      });
      navigate(ROUTES.ADMIN_ABOUT_EDIT);
    } catch (error) {
      console.error('Erro ao enviar informações do "Sobre Nós".');
    }
  };

  return (
    <>
      {loading && <Loading />}
      <main className="primary-container p-5 d-flex">
        <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
          <h3 className="text-center mb-4">Cadastro de Informações da tela "Sobre nós"</h3>
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
                        Cadastrar informações
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

export default CreateAbout;
