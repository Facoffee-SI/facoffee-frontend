import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import CurrencyInput from 'react-currency-input-field';
import * as Yup from 'yup';
import { PlanObject, ProductEditObject } from '../../../components/common/Models';
import api from '../../../services/Api';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import CustomSelect from '../../../components/formik/CustomSelect';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FroalaEditor from 'froala-editor';

const createPlanSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  priceMonth: Yup.string().required('Obrigatório preencher o preço mensal'),
  priceYear: Yup.string().required('Obrigatório preencher o preço anual'),
  active: Yup.string().required('Obrigatório preencher o status'),
});

const CreatePlan = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [products, setProducts] = useState<ProductEditObject[]>([]);
  const [editorInstance, setEditorInstance] = useState<FroalaEditor | null>(null);

  const initFroalaEditor = () => {
    const froala = new FroalaEditor('#froala-editor', {
      placeholderText: 'Descrição do plano',
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
    const fetchProducts = async () => {
      try {
        const response = await api.get('/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Erro ao buscar produtos');
      }
    };

    fetchProducts();
  }, []);

  const productsOptions = products.map((product) => ({
    value: product.id,
    label: product.name,
  }));

  const onSubmitForm = async (values: PlanObject,
    { setSubmitting }: FormikHelpers<PlanObject>) => {
    try {
      values.priceMonth = parseFloat(
        values.priceMonth.toString().replace(/\./g, '').replace(',', '.')
      );
      values.priceYear = parseFloat(
        values.priceMonth.toString().replace(/\./g, '').replace(',', '.')
      );

      const editorContent = editorInstance?.html.get();
      values.description = editorContent ? editorContent : '';
      const response = await api.post('plan', values);
      if (images.length > 0) {
        const formData = new FormData();
        images.map((image) => {
          formData.append('images', image);
        });
        await api.post(`/plan/images/${response.data.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
      navigate(ROUTES.ADMIN_PLANS);
    } catch (error: any) {
      console.error('Erro ao cadastrar o plano');
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

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(event.target.files || []);
    const selectedPreviews = selectedImages.map((image) => URL.createObjectURL(image));

    setImages((prevImages) => [...prevImages, ...selectedImages]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...selectedPreviews]);
  };

  const handleImageRemove = (index: number) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <>
      <ToastContainer />
      <main className="primary-container p-5 d-flex">
        <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
          <h3 className="text-center mb-2">Cadastro de Plano</h3>
            <Formik
              initialValues={{
                name: '',
                description: '',
                priceMonth: '' as unknown as number,
                priceYear: '' as unknown as number,
                active: false,
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
                    <div id="froala-editor"/>
                    <Field
                      name="productIds"
                      label="Produtos"
                      options={productsOptions}
                      isMulti={true}
                      placeholder="Produtos"
                      component={CustomSelect}
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
                    <div className="d-flex align-items-center">
                      <Field
                        type="checkbox"
                        name="active"
                        id="active"
                        className="form-check-input me-2"
                      />
                      <label className="form-check-label" htmlFor="active">
                        Plano Ativo?
                      </label>
                    </div>
                    <div className="d-flex justify-content-center gap-4">
                      <div
                        style={{ width: '100%'}}>
                        <input
                          id="images"
                          name="images"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleImageChange}
                          style={{ display: 'none' }}
                        />
                          <button
                            className="btn bg-black text-white rounded p-1"
                            type="button"
                            onClick={() => document.getElementById('images')?.click()}
                            style={{ width: '100%'}}
                          >
                            Selecionar imagens
                          </button>
                      </div>
                    </div>
                    <div className="image-container">
                      {imagePreviews.map((preview, index) => (
                        <div key={index} className="image-preview-container">
                          <img src={preview} alt={`Imagem ${index + 1}`} className="image-preview" />
                          <button
                            type="button"
                            className="remove-image-button"
                            onClick={() => handleImageRemove(index)}
                          >
                            X
                          </button>
                        </div>
                      ))}
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
    </>
  );
};

export default CreatePlan;
