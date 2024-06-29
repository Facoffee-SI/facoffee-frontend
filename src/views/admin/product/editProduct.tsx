import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';
import { useEffect, useLayoutEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryObject, ImageObject, ProductEditObject, ProductObject } from '../../../components/common/Models';
import * as ROUTES from '../../../constants/routes';
import api from '../../../services/Api';
import CurrencyInput from 'react-currency-input-field';
import CustomSelect from '../../../components/formik/CustomSelect';
import { ConfirmationModal } from '../../../components/common/ConfirmationModal';
import Loading from '../../../components/common/Loading';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FroalaEditor from 'froala-editor';

const editProductSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  description: Yup.string().required('Obrigatório preencher a descrição'),
  brand: Yup.string().required('Obrigatório preencher a marca'),
  price: Yup.number().required('Obrigatório preencher o preço'),
  barCode: Yup.number().required('Preencha corretamente o código de barras'),
  quantity: Yup.number().required('Preencha corretamente a quantidade'),
});

const removeProductSchema = Yup.object();

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product as ProductEditObject | undefined;
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<ImageObject[]>([]);
  const [categories, setCategories] = useState<CategoryObject[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [editorInstance, setEditorInstance] = useState<FroalaEditor | null>(null);

  const initFroalaEditor = () => {
    const froala = new FroalaEditor('#froala-editor', {
      placeholderText: 'Descrição do produto',
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
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/product/${product?.id}`);
        const productData = response.data;

        if (editorInstance && product?.description) {
          editorInstance.html.set(product?.description);
        }

        setExistingImages(productData.images);
        setImagePreviews(productData.images.map((img: ImageObject) => img.imageUrl));
      } catch (error) {
        setLoading(false);
        console.error('Erro ao buscar produto', error);
      }
    };
    fetchProduct();
    setLoading(false);
  }, [product, editorInstance]);

  useEffect(() => {
    if (!product) {
      navigate(ROUTES.ADMIN_PRODUCTS);
    }
  }, [product, navigate]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/category');
        setCategories(response.data);
      } catch (error) {
        console.error('Erro ao buscar categorias');
      }
    };
    fetchCategories();
  }, []);

  const categoriesOptions = categories.map((category) => ({
    value: category.id,
    label: category.name,
  }));

  const handleRemove = async () => {
    setIsRemoving(true);
    try {
      await api.delete(`/product/${product?.id}`);
      navigate(ROUTES.ADMIN_PRODUCTS);
    } catch (error) {
      console.error('Erro ao remover produto');
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
        await api.delete(`/product/images/${imageId}`);
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

  const onSubmitForm = async (values: ProductObject,
    { setSubmitting }: FormikHelpers<ProductObject>) => {
    try {
      if (!values.categoryId) {
        values.categoryId = product?.category?.id || '';
      }

      if (!values.discountValue) {
        delete values.discountValue;
      }

      const editorContent = editorInstance?.html.get();
      values.description = editorContent ? editorContent : '';
      await api.patch(`product/${product?.id}`, values);

      const formData = new FormData();
      images.map((image) => {
        formData.append('images', image);
      });

      if (images.length > 0) {
        await api.post(`/product/images/${product?.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      navigate(ROUTES.ADMIN_PRODUCTS);
    } catch (error: any) {
      console.error('Erro ao editar o produto');
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

  const priceAsNumber = parseFloat(product?.price.toString() || '');
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
            text="Deseja realmente excluir o produto?"
          />
          <h3 className="text-center mb-2">Edição de Produto</h3>
          <Formik
            initialValues={{
              name: product?.name || '',
              description: product?.description || '',
              brand: product?.brand || '',
              price: priceAsNumber,
              barCode: product?.barCode || '',
              categoryId: product?.categoryId || '',
              quantity: product?.quantity || 0,
              discountValue: product?.discountValue || 0,
              isDiscountPercentage: product?.isDiscountPercentage || false,
            }}
            validateOnMount
            validationSchema={isRemoving ? removeProductSchema : editProductSchema}
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
                    name="brand"
                    type="string"
                    label="Marca"
                    placeholder="Marca"
                    component={CustomInput}
                    style={{ width: '100%' }}
                  />
                  <div id="froala-editor"/>
                  <CurrencyInput
                    name="price"
                    placeholder={product ? `R$ ${product.price}` : "Preço"}
                    decimalsLimit={2}
                    prefix="R$ "
                    intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                    onValueChange={(value) => {
                      value 
                        ? setFieldValue('price', parseFloat(value.toString().replace(/\./g, '').replace(',', '.')))
                        : setFieldValue('price', value);
                    }}
                  />
                  <div className="row">
                    <div className="col-md-2 align-self-center">
                        <div className="form-group p-2">
                          <Field
                            type="checkbox"
                            name="isDiscountPercentage"
                            id="isDiscountPercentage"
                            className="form-check-input"
                          />
                          <div> 
                            <label className="form-check-label" htmlFor="isDiscountPercentage">
                              Porcentagem?
                            </label>
                          </div>
                        </div>
                      </div>
                      <div className="col-md-10">
                        <Field
                          name="discountValue"
                          type="number"
                          label="Desconto"
                          placeholder="Desconto"
                          component={CustomInput}
                        />
                      </div>
                  </div>
                  <Field
                    name="barCode"
                    type="number"
                    label="Código de barras"
                    placeholder="Código de barras"
                    component={CustomInput}
                    style={{ width: '100%' }}
                  />
                  <Field
                    name="categoryId"
                    label="Categorias"
                    options={categoriesOptions}
                    isMulti={false}
                    placeholder={product?.category ? `${product.category?.name}` : "Categorias"}
                    component={CustomSelect}
                  />
                  <Field
                    name="quantity"
                    type="number"
                    label="Quantidade"
                    placeholder="Quantidade"
                    component={CustomInput}
                    style={{ width: '100%' }}
                  />
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

export default EditProduct;
