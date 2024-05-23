import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { CategoryObject, ProductEditObject, ProductObject } from '../../../components/common/Models';
import * as ROUTES from '../../../constants/routes';
import api from '../../../services/Api';
import CurrencyInput from 'react-currency-input-field';
import CustomSelect from '../../../components/formik/CustomSelect';
import { ConfirmationModal } from '../../../components/common/ConfirmationModal';

const editProductSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  description: Yup.string().required('Obrigatório preencher a descrição'),
  brand: Yup.string().required('Obrigatório preencher a marca'),
  price: Yup.string().required('Obrigatório preencher o preço'),
  barCode: Yup.number().required('Preencha corretamente o código de barras'),
  categoryId: Yup.string().required('Obrigatório preencher a categoria'),
  quantity: Yup.number().required('Preencha corretamente a quantidade'),
});

const removeProductSchema = Yup.object();

const EditProduct = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const product = location.state?.product as ProductEditObject | undefined;
  const [images, setImages] = useState<File[]>([]);
  const [categories, setCategories] = useState<CategoryObject[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    if(!product) {
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
    console.log(product)
    fetchCategories();
  }, [product]);

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
    setImages(selectedImages);
  };

  const onSubmitForm = async (values: ProductObject,
    { setSubmitting }: FormikHelpers<ProductObject>) => {
    try {
      values.price = parseFloat(
        values.price.toString().replace(/\./g, '').replace(',', '.')
      );
      await api.patch(`product/${product?.id}`, values);
      navigate(ROUTES.ADMIN_PRODUCT_EDIT);
    } catch (error) {
      console.error('Erro ao cadastrar o produto');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="primary-container p-5 d-flex">
      <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <ConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleRemove}
          text="Deseja realmente excluir o produto?"
        />
        <h3 className="text-center mb-2">Edição de Produto</h3>
        <Formik
          initialValues={{
            name: product?.name || '',
            description: product?.description || '', 
            brand: product?.brand || '',
            price: product?.price || 0,
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
                  name="description"
                  type="string"
                  label="Descrição"
                  autoComplete="true"
                  placeholder="Descrição"
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
                <CurrencyInput
                  name="price"
                  placeholder="Preço"
                  decimalsLimit={2}
                  prefix="R$ "
                  intlConfig={{ locale: 'pt-BR', currency: 'BRL' }}
                  onValueChange={(value) => setFieldValue('price', value)}
                  style={{ width: '100%' }}
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
                  placeholder="Categorias"
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
                  {images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Imagem ${index + 1}`}
                      className="image-preview"
                    />
                  ))}
                </div>
                  <div className="d-flex justify-content-center gap-4">
                    <button
                      className="btn bg-danger text-white rounded p-1"
                      type="submit"
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
  );
};

export default EditProduct;
