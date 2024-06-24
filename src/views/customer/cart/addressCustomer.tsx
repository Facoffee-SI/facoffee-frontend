import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { Field, Form, Formik, FormikHelpers, FormikProps } from 'formik';
import { CustomInput } from '../../../components/formik';
import api from '../../../services/Api';
import { Link, useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { CustomerObject } from '../../../components/common/Models';
import ProgressTracker from './components/ProgressTracker';
import Loading from '../../../components/common/Loading';
import { ToastContainer, toast } from 'react-toastify';

const customerEditSchema = Yup.object({
  cep: Yup.string(),
  address: Yup.string().required('Insira o CEP para buscar o endereço'),
});

interface FormValues {
  address: string;
  cep: string;
}

const AddressCartCustomer = () => {
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<CustomerObject>();
  const navigate = useNavigate();
  const formikRef = useRef<FormikProps<FormValues>>(null);

  useEffect(() => {
    const fetchCustomer = async () => {
      setLoading(true);
      try {
        const response = await api.get('customer');
        setCustomer(response.data);
      } catch (error) {
        console.error('Erro ao buscar o Cliente');
      } finally {
        setLoading(false);
        toast.info('Complemente ou modifique seu endereço', {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    };

    fetchCustomer();
  }, []);

  const handleSearchCep = async (
    cep: string,
    setFieldValue: (field: string, value: unknown) => void,
    setFieldError: (field: string, message: string) => void
  ) => {
    const errorMessage = 'Erro ao buscar endereço, digite outro CEP';
    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      if (response.data.erro) {
        setFieldError('cep', errorMessage);
        return;
      }
      setFieldValue(
        'address',
        `${response.data.logradouro}, ${response.data.bairro} - ${response.data.localidade} / ${response.data.uf}`
      );
      setFieldError('cep', '');
    } catch (error) {
      console.error('Erro ao buscar o endereço pelo CEP.', error);
      setFieldError('cep', errorMessage);
    }
  };

  const onSubmitForm = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    localStorage.setItem('deliveryAddress', JSON.stringify(values.address));
    setSubmitting(false);
    navigate(ROUTES.CUSTOMER_FINALIZE_CART);
  };

  const handleContinueClick = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const getAddressFromStorageOrCustomer = (customer?: CustomerObject) => {
    const storedAddress = localStorage.getItem('deliveryAddress');
    if (storedAddress) {
      try {
        return JSON.parse(storedAddress);
      } catch (error) {
        console.error('Erro ao resgatar o endereço de delivery', error);
        return customer?.address || '';
      }
    }
    return customer?.address || '';
  };

  const initialAddress = getAddressFromStorageOrCustomer(customer);

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      <ToastContainer />
      <main className="primary-container p-3 d-flex justify-content-center align-items-center">
        <div className="card p-5" style={{ maxWidth: '50.75rem', backgroundColor: '#F4F4F4' }}>
          <ProgressTracker currentStep={2} />
          <div className="section-cart border p-3">
            <h4 className="text-center mb-2">Endereço de entrega</h4>
            <Formik
              innerRef={formikRef}
              initialValues={{ address: initialAddress, cep: '' }}
              validateOnMount
              validationSchema={customerEditSchema}
              onSubmit={onSubmitForm}
            >
              {({ setFieldValue, setFieldError, values }) => (
                <Form className="users-edit-form">
                  <div className="d-flex flex-column gap-3">
                    <Field
                      name="address"
                      type="string"
                      label="Endereço"
                      autoComplete="true"
                      placeholder="Endereço"
                      component={CustomInput}
                      className="input-address"
                    />
                    <div className="d-flex flex-column flex-md-row gap-3 align-items-start">
                      <Field
                        name="cep"
                        type="number"
                        label="CEP"
                        autoComplete="true"
                        placeholder="CEP"
                        component={CustomInput}
                      />
                      <button
                        className="btn bg-secondary text-white rounded p-2 w-50"
                        type="button"
                        onClick={() => handleSearchCep(values.cep, setFieldValue, setFieldError)}
                      >
                        Procurar CEP
                      </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <div className="d-flex justify-content-between mt-3">
              <Link
                className="btn bg-black text-white rounded p-2 buttons-address"
                to={ROUTES.CUSTOMER_CART}
              >
                <span style={{ marginRight: '6px' }}>⬅️</span>Voltar
              </Link>
              <button
                className="btn bg-black text-white rounded p-2 buttons-address"
                type="button"
                onClick={handleContinueClick}
              >
                Continuar<span style={{ marginLeft: '6px' }}>➡️</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default AddressCartCustomer;
