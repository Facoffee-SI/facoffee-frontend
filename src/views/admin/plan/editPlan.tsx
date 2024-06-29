import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import CurrencyInput from 'react-currency-input-field';
import * as Yup from 'yup';
import { useEffect, useLayoutEffect, useState } from 'react';
import { ImageObject, PlanEditObject, ProductEditObject } from '../../../components/common/Models';
import api from '../../../services/Api';
import CustomSelect from '../../../components/formik/CustomSelect';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { ConfirmationModal } from '../../../components/common/ConfirmationModal';
import Loading from '../../../components/common/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FroalaEditor from 'froala-editor';

const editPlanSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  priceMonth: Yup.string().required('Obrigatório preencher o preço mensal'),
  priceYear: Yup.string().required('Obrigatório preencher o preço anual'),
  active: Yup.string().required('Obrigatório preencher o status'),
});

const removePlanSchema = Yup.object();

const EditPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<ImageObject[]>([]);
  const [products, setProducts] = useState<ProductEditObject[]>([]);
  const plan = location.state?.plan as PlanEditObject | undefined;
  const [showModal, setShowModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const fetchPlan = async () => {
      try {
        const response = await api.get(`/plan/${plan?.id}`);
        const productData = response.data;

        if (editorInstance && plan?.description) {
          editorInstance.html.set(plan?.description);
        }

        setExistingImages(productData.images);
        setImagePreviews(productData.images.map((img: ImageObject) => img.imageUrl));
      } catch (error) {
        setLoading(false);
        console.error('Erro ao buscar produto', error);
      }
    };

    fetchPlan();
    setLoading(false);
  }, [plan, editorInstance]);
  
  useEffect(() => {
    if (!plan) {
      navigate(ROUTES.ADMIN_PLANS);
    }
  }, [plan, navigate]);

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

  const onSubmitForm = async (values: PlanEditObject,
    { setSubmitting }: FormikHelpers<PlanEditObject>) => {
    try {
      const { id, ...patchPayload} = values;

      const editorContent = editorInstance?.html.get();
      patchPayload.description = editorContent ? editorContent : '';

      await api.patch(`plan/${id}`, patchPayload);

      const formData = new FormData();
      images.map((image) => {
        formData.append('images', image);
      });

      if (images.length > 0) {
        await api.post(`/plan/images/${id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      navigate(ROUTES.ADMIN_PLANS);
    } catch (error: any) {
      console.error('Erro ao editar o plano');
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

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await api.delete(`/plan/${plan?.id}`);
      navigate(ROUTES.ADMIN_PLANS);
    } catch (error) {
      console.error('Erro ao remover plano.');
    } finally {
      setIsRemoving(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(event.target.files || []);
    const selectedPreviews = selectedImages.map((image) => URL.createObjectURL(image));
  
    setImages((prevImages) => [...prevImages, ...selectedImages]);
    setImagePreviews((prevPreviews) => [...prevPreviews, ...selectedPreviews]);
  };

  const handleImageRemove = async (index: number, isExisting: boolean, imageId?: string) => {
    if (isExisting && imageId) {
      try {
        await api.delete(`/plan/images/${imageId}`);
        setExistingImages((prevImages) => prevImages.filter((_, i) => i !== index));
      } catch (error) {
        console.error('Erro ao remover imagem', error);
        toast.error('Erro ao remover imagem. Por favor, tente novamente mais tarde.', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } else {
      setImages((prevImages) => prevImages.filter((_, i) => i !== index - existingImages.length));
    }
    setImagePreviews((prevPreviews) => prevPreviews.filter((_, i) => i !== index));
  };

  return (
    <>
      <ToastContainer />
      {loading && <Loading />}
      <main className="primary-container p-5 d-flex">
        <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
          <ConfirmationModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setIsRemoving(false);
            }}
            onConfirm={handleRemove}
            text="Deseja realmente excluir o plano?"
          />
          <h3 className="text-center mb-2">Edição de Plano</h3>
            <Formik
              initialValues={{
                id: plan?.id || '',
                name: plan?.name || '',
                description: plan?.description || '',
                productIds: plan?.productIds || [],
                priceMonth: plan?.priceMonth || 0,
                priceYear: plan?.priceYear || 0,
                active: plan?.active || false,
              }}
              validateOnMount
              validationSchema={isRemoving ? removePlanSchema : editPlanSchema}
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
                    <div id="froala-editor"></div>
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
                        placeholder={plan ? `R$ ${plan.priceMonth}` : "Preço mensal"}
                        decimalsLimit={2}
                        prefix="R$ "
                        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                        style={{ width: '100%' }}
                        onValueChange={(value) => {
                          value
                            ? setFieldValue('priceMonth', parseFloat(value.toString().replace(/\./g, '').replace(',', '.')))
                            : setFieldValue('priceMonth', value);
                        }}
                      />
                      <CurrencyInput
                        name="priceYear"
                        placeholder={plan ? `R$ ${plan.priceYear}` : "Preço anual"}
                        decimalsLimit={2}
                        prefix="R$ "
                        intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                        style={{ width: '100%' }}
                        onValueChange={(value) => {
                          value
                            ? setFieldValue('priceYear', parseFloat(value.toString().replace(/\./g, '').replace(',', '.')))
                            : setFieldValue('priceYear', value);
                        }}
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
                            onClick={() => handleImageRemove(index, index < existingImages.length, existingImages[index]?.id)}
                          >
                            X
                          </button>
                        </div>
                      ))}
                    </div>
                    <div className="d-flex justify-content-center gap-4">
                      <button
                        className="btn bg-danger text-white rounded p-1"
                        type="button"
                        style={{ width: '50%' }}
                        onClick={() => setShowModal(true)}
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
    </>
  );
};

export default EditPlan;
