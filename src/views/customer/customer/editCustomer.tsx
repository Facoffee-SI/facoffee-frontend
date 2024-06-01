import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import { userImageDefault } from '../../../components/common/userImageDefault';
import api from '../../../services/Api';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { validate as validateCPF } from 'cpf-check';
import axios from 'axios';
import { CustomerObject } from '../../../components/common/Models';
import Loading from '../../../components/common/Loading';
import { ConfirmationModal } from '../../../components/common/ConfirmationModal';

const customerEditSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório preencher o email'),
  password: Yup.string()
    .required('Obrigatório preencher a senha')
    .min(6, 'A senha deve ter no mínimo 6 caracteres')
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
      "A senha deve conter pelo menos uma letra maiúscula, uma letra minúscula, um número e um caractere especial."
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
    .required('Obrigatório confirmar a senha'),
  cpf: Yup.string()
    .required('Obrigatório preencher o CPF')
    .test({ message: 'CPF inserido é inválido', test: ((value) => validateCPF(value)) }),
  phone: Yup.string().required('Obrigatório preencher o telefone'),
  cep: Yup.string(),
  address: Yup.string().required('Insira o CEP para buscar o endereço'),
});

const customerRemoveSchema = Yup.object();

interface FormValues {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  cep: string;
  address: string;
  password: string;
  confirmPassword: string;
  profilePicture: string | File;
}

const EditCustomer = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [customer, setCustomer] = useState<CustomerObject>();
  const [loading, setLoading] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [profilePicture, setprofilePicture] = useState<string | File>(userImageDefault);

  useEffect(() => {
    const fetchCustomer = async () => {
      try {
        setLoading(true);
        const response = await api.get('customer');
        if(response.data.profilePicture) {
          setprofilePicture(response.data.profilePicture);
        }
        setCustomer(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar o Cliente');
        setLoading(false);
      }
    };

    fetchCustomer();
  }, []);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: unknown) => void) => {
    const file = event.target.files?.[0];
    if (file) {
      setFieldValue('profilePicture', file);
      const reader = new FileReader();
      reader.onload = () => {
        setprofilePicture(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearchCep = async (cep: string,
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
    try {
      const customerPatchPayload = {
        name: values.name,
        email: values.email,
        password: values.password,
        cpf: values.cpf,
        phone: values.phone,
        address: values.address,
      };
      await api.patch('customer', customerPatchPayload);
      console.log(values.profilePicture)

      if (values.profilePicture instanceof File) {
        const formData = new FormData();
        formData.append('profilePicture', values.profilePicture);
        await api.post(`/customer/image`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      navigate(ROUTES.CUSTOMER_LOGIN);
    } catch (error: any) {
      console.error('Erro ao cadastrar o cliente');
      let errorMessage = 'Ocorreu um erro. Por favor, tente novamente.';

      if (error.response) {
        if (error.response.status === 400 || error.response.status === 404) {
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

  const handleDeleteCustomer = async () => {
    try {
      await api.delete(`/customer`);
      localStorage.removeItem('tokenCustomer');
      navigate(ROUTES.CUSTOMER_LOGIN);
      setIsRemoving(false);
      setShowModal(false);
    } catch (error) {
      console.error('Erro ao remover o cliente');
      setShowModal(false);
    }
  };

  return (
    <>
      <ToastContainer />
      {loading ? <Loading /> : (
        <>
          <ConfirmationModal
            isOpen={showModal}
            onClose={() => {
              setShowModal(false);
              setIsRemoving(false);
            }}
            onConfirm={handleDeleteCustomer}
            text="Deseja realmente excluir a conta?"
          />
          <main className="primary-container p-3 d-flex justify-content-center align-items-center">
            <div className="card p-5" style={{ maxWidth: '50.75rem' }}>
              <h3 className="text-center mb-2">Edição de Cadastro</h3>
              <Formik
                initialValues={{
                  name: customer?.name || '',
                  email: customer?.email || '',
                  cpf: customer?.cpf || '',
                  phone: customer?.phone || '',
                  cep: '',
                  address: customer?.address || '',
                  password: '',
                  confirmPassword: '',
                  profilePicture: profilePicture,
                }}
                validateOnMount
                validationSchema={isRemoving ? customerRemoveSchema : customerEditSchema}
                onSubmit={onSubmitForm}
              >
                {({ setFieldValue, setFieldError, values }) => (
                  <Form className="users-edit-form">
                    <div className="d-flex flex-column gap-3">
                      <div className="d-flex flex-column align-items-center">
                        <img
                          src={typeof profilePicture === 'string' ? profilePicture : URL.createObjectURL(profilePicture)}
                          alt="Imagem de perfil"
                          height="100px"
                          width="100px"
                          style={{ objectFit: 'contain', cursor: 'pointer', borderRadius: '50%' }}
                          onClick={handleImageClick}
                        />
                        <input
                          type="file"
                          ref={fileInputRef}
                          style={{ display: 'none' }}
                          onChange={(event) => handleFileChange(event, setFieldValue)}
                        />
                      </div>
                      <Field
                        name="name"
                        type="string"
                        label="Nome Completo"
                        autoComplete="true"
                        placeholder="Nome Completo"
                        component={CustomInput}
                      />
                      <Field
                        name="email"
                        type="email"
                        label="Email"
                        autoComplete="true"
                        placeholder="Email"
                        component={CustomInput}
                      />
                      <div className="d-flex flex-column flex-md-row gap-3">
                        <Field
                          name="password"
                          type="password"
                          label="Senha"
                          autoComplete="current-password"
                          placeholder="Senha"
                          component={CustomInput}
                        />
                        <Field
                          name="confirmPassword"
                          type="password"
                          label="Confirmação de senha"
                          autoComplete="current-password"
                          placeholder="Confirme sua senha"
                          component={CustomInput}
                        />
                      </div>
                      <div className="d-flex flex-column flex-md-row gap-3">
                        <Field
                          name="cpf"
                          type="string"
                          label="CPF"
                          autoComplete="true"
                          placeholder="CPF"
                          component={CustomInput}
                        />
                        <Field
                          name="phone"
                          type="number"
                          label="Telefone"
                          autoComplete="true"
                          placeholder="Telefone"
                          component={CustomInput}
                        />
                      </div>
                      <Field
                        name="address"
                        type="string"
                        label="Endereço"
                        autoComplete="true"
                        placeholder="Endereço"
                        component={CustomInput}
                        disabled
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
                      <div className="d-flex justify-content-center gap-4">
                        <button
                          className="btn bg-danger text-white rounded p-1 w-100"
                          type="button"
                          onClick={() => setShowModal(true)} 
                        >
                          Remover conta
                        </button>
                        <button
                          className="btn bg-black text-white rounded p-1 w-100"
                          type="submit"
                        >
                          Salvar alterações
                        </button>
                    </div>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default EditCustomer;
