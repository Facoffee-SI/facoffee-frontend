import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import './styles.css'
import { CategoryObject, ProductObject } from '../../../components/common/Models';
import api from '../../../services/Api';
import CustomSelect from '../../../components/formik/CustomSelect';
import CurrencyInput from 'react-currency-input-field';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const createProductSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  description: Yup.string().required('Obrigatório preencher a descrição'),
  brand: Yup.string().required('Obrigatório preencher a marca'),
  price: Yup.string().required('Obrigatório preencher o preço'),
  barCode: Yup.number().required('Preencha corretamente o código de barras'),
  categoryId: Yup.string().required('Obrigatório preencher a categoria'),
  quantity: Yup.number().required('Preencha corretamente a quantidade'),
});

const CreateProduct = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const [categories, setCategories] = useState<CategoryObject[]>([]);

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

  const onSubmitForm = async (values: ProductObject,
    { setSubmitting }: FormikHelpers<ProductObject>) => {
    try {
      values.price = parseFloat(
        values.price.toString().replace(/\./g, '').replace(',', '.')
      );

      if (!values.discountValue) {
        delete values.discountValue;
      }

      const response = await api.post('product', values);
      if (images.length > 0) {
        const formData = new FormData();
        images.map((image) => {
          formData.append('images', image);
        });
        await api.post(`/product/images/${response.data.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }
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
        <h3 className="text-center mb-2">Cadastro de Produto</h3>
        <Formik
          initialValues={{
            name: '',
            description: '',
            brand: '',
            price: '' as unknown as number,
            barCode: '',
            categoryId: '',
            quantity: '' as unknown as number,
            discountValue: '' as unknown as number,
            isDiscountPercentage: false,
          }}
          validateOnMount
          validationSchema={createProductSchema}
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
                  label="Categoria"
                  options={categoriesOptions}
                  isMulti={false}
                  placeholder="Categoria"
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
  );
};

export default CreateProduct;
