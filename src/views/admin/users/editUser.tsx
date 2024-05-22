import * as Yup from 'yup';
import { useEffect, useRef, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import { userImageDefault } from './userImageDefault';
import { useLocation, useNavigate } from 'react-router-dom';
import { Role, RolesResponse, UserObject } from '../../../components/common/Models';
import api from '../../../services/Api';
import CustomSelect from '../../../components/formik/CustomSelect';
import * as ROUTES from '../../../constants/routes';

const userEditSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório preencher o email'),
  roles: Yup.array().min(1, 'Obrigatório preencher cargos'),
  password: Yup.string()
    .required('Obrigatório preencher a senha')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: Yup.string().required('Obrigatório confirmar a senha')
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
});

interface FormValues {
  name: string;
  email: string;
  roles: { value: string; label: string }[];
  password: string;
  confirmPassword: string;
  profileImage: string | File;
}

const UsersEdit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const userObject: UserObject | null = location.state?.userObject;
  
  const userRoles = userObject?.userRoles.map((item) => ({
    value: item.roleId,
    label: item.roleName
  })) || [];
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState<string | File>(userObject?.user.profilePicture ?? userImageDefault);
  const [rolesList, setRolesList] = useState<Role[]>([]);

  useEffect(() => {
    const fetchRoles = async () => {
      try {
        const response = await api.get('role');
        const rolesList = response.data.map((item: RolesResponse) => ({
          value: item.role.id,
          label: item.role.name
        }));

        setRolesList(rolesList);
      } catch (error) {
        console.error('Erro ao buscar os cargos');
      }
    };

    fetchRoles();
  }, [userObject]);

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
      const userUpdatePayload = {
        name: values.name,
        email: values.email,
        password: values.password,
        roleIds: values.roles,
      };
      await api.patch(`/user/${userObject?.user.id}`, userUpdatePayload);

      if (values.profileImage instanceof File) {
        const formData = new FormData();
        formData.append('profilePicture', values.profileImage);
        await api.post(`/user/image/${userObject?.user.id}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
        });
      }

      navigate(ROUTES.ADMIN_USERS);
    } catch (error) {
      console.error('Erro ao atualizar o usuário');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="primary-container p-3 d-flex justify-content-center align-items-center">
      <div className="card p-5" style={{ maxWidth: '50.75rem' }}>
        <h3 className="text-center mb-2">Edição de Usuário</h3>
          <Formik
            initialValues={{
              name: userObject?.user.name ?? '',
              email: userObject?.user.email ?? '',
              roles: userRoles,
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
                    <button
                      className="btn bg-danger text-white rounded p-1 w-100"
                      type="submit"
                    >
                      Remover usuário
                    </button>
                    <button
                      className="btn bg-black text-white rounded p-1 w-100"
                      type="submit"
                    >
                      Editar usuário
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

export default UsersEdit;
