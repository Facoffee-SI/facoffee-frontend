import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import CurrencyInput from 'react-currency-input-field';
import * as Yup from 'yup';
import { PlanObject, ProductEditObject } from '../../../components/common/Models';
import api from '../../../services/Api';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import CustomSelect from '../../../components/formik/CustomSelect';

const createPlanSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  description: Yup.string().required('Obrigatório preencher a descrição'),
  productIds: Yup.string().required('Obrigatório preencher a categoria'),
  priceMonth: Yup.string().required('Obrigatório preencher o preço mensal'),
  priceYear: Yup.string().required('Obrigatório preencher o preço anual'),
  active: Yup.string().required('Obrigatório preencher o status'),
});

const CreatePlan = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [products, setProducts] = useState<ProductEditObject[]>([]);

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

      const response = await api.post('plan', values);
      if (images.length > 0) {
        const imageUploadPromises = images.map((image) => {
          const formData = new FormData();
          formData.append('image', image);
          return api.post(`/plan/image/${response.data.id}`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
        });
        await Promise.all(imageUploadPromises);
      }
      navigate(ROUTES.ADMIN_PLANS);
    } catch (error) {
      console.error('Erro ao cadastrar o plano');
    } finally {
      setSubmitting(false);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(event.target.files || []);
    setImages(selectedImages);
  };

  return (
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

export default CreatePlan;
