import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import { userImageDefault } from '../../../components/common/userImageDefault';
import { Role, RolesResponse } from '../../../components/common/Models';
import api from '../../../services/Api';
import CustomSelect from '../../../components/formik/CustomSelect';
import { useNavigate } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const userEditSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório preencher o email'),
  roles: Yup.array().min(1, 'Obrigatório preencher cargos'),
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
});

interface FormValues {
  name: string;
  email: string;
  roles: { value: string; label: string }[];
  password: string;
  confirmPassword: string;
  profileImage: string | File;
}

const CreateUser = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | File>(userImageDefault);
  const [rolesList, setRolesList] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('role');
        const rolesList = response.data.map((item: RolesResponse) => ({
          value: item.role.id,
          label: item.role.name,
        }));
        setRolesList(rolesList);
      } catch (error) {
        console.error('Erro ao buscar os cargos');
      }
    };
    fetchRoles();
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
      setFieldValue('profileImage', file);
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmitForm = async (values: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
    try {
      const userPostPayload = {
        name: values.name,
        email: values.email,
        password: values.password,
        roleIds: values.roles,
      };
      const userResponse = await api.post('user', userPostPayload);

      if (values.profileImage instanceof File) {
        const formData = new FormData();
        formData.append('profilePicture', values.profileImage);
        await api.post(`/user/image/${userResponse.data.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      }

      navigate(ROUTES.ADMIN_USERS);
    } catch (error: any) {
      console.error('Erro ao cadastrar o usuário');
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

  return (
    <>
      <ToastContainer />
      <main className="primary-container p-3 d-flex justify-content-center align-items-center">
        <div className="card p-5" style={{ maxWidth: '50.75rem' }}>
          <h3 className="text-center mb-2">Cadastro de Usuário</h3>
          <Formik
            initialValues={{
              name: '',
              email: '',
              roles: [{ value: '', label: '' }],
              password: '',
              confirmPassword: '',
              profileImage: profileImage,
            }}
            validateOnMount
            validationSchema={userEditSchema}
            onSubmit={onSubmitForm}
          >
            {({ setFieldValue }) => (
              <Form className="users-edit-form">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={typeof profileImage === 'string' ? profileImage : URL.createObjectURL(profileImage)}
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
                  <Field
                    name="roles"
                    label="Cargos"
                    options={rolesList}
                    isMulti
                    placeholder="Selecione os cargos"
                    component={CustomSelect}
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
                  <div className="d-flex justify-content-center gap-4">
                    <button className="btn bg-black text-white rounded p-1 w-100" type="submit">
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

export default CreateUser;
