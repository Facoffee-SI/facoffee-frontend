import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import CurrencyInput from 'react-currency-input-field';
import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { PlanEditObject, ProductEditObject } from '../../../components/common/Models';
import api from '../../../services/Api';
import CustomSelect from '../../../components/formik/CustomSelect';
import { useLocation, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { ConfirmationModal } from '../../../components/common/ConfirmationModal';

const editPlanSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  description: Yup.string().required('Obrigatório preencher a descrição'),
  priceMonth: Yup.string().required('Obrigatório preencher o preço mensal'),
  priceYear: Yup.string().required('Obrigatório preencher o preço anual'),
  active: Yup.string().required('Obrigatório preencher o status'),
});

const removePlanSchema = Yup.object();

const EditPlan = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [images, setImages] = useState<File[]>([]);
  const [products, setProducts] = useState<ProductEditObject[]>([]);
  const plan = location.state?.plan as PlanEditObject | undefined;
  const [showModal, setShowModal] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);


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
      const response = await api.patch(`plan/${id}`, patchPayload);
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
    setImages(selectedImages);
  };

  return (
    <main className="primary-container p-5 d-flex">
      <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <ConfirmationModal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
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
  );
};

export default EditPlan;
