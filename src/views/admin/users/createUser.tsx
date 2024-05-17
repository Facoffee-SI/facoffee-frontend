import * as Yup from 'yup';
import { useRef, useState } from 'react';
import { Field, Form, Formik } from 'formik';
import { CustomInput } from '../../../components/formik';
import { userImageDefault } from './userImageDefault';

const userEditSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  email: Yup.string()
    .email('Email inválido')
    .required('Obrigatório preencher o email'),
  roles: Yup.string().required('Obrigatório preencher cargos'),
  password: Yup.string()
    .required('Obrigatório preencher a senha')
    .min(6, 'A senha deve ter no mínimo 6 caracteres'),
  confirmPassword: Yup.string().required('Obrigatório confirmar a senha'),
});

const onSubmitForm = () => {};

const CreateUser = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [profileImage, setProfileImage] = useState(userImageDefault);

  const handleImageClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <main className="primary-container p-3 d-flex justify-content-center align-items-center">
      <div className="card p-5" style={{ maxWidth: '50.75rem' }}>
        <h3 className="text-center mb-2">Cadastro de Usuário</h3>
          <Formik
            initialValues={{
              name: '',
              email: '',
              roles: '',
              password: '',
              confirmPassword: '',
            }}
            validateOnMount
            validationSchema={userEditSchema}
            onSubmit={onSubmitForm}
          >
            {() => (
              <Form className="users-edit-form">
                <div className="d-flex flex-column gap-3">
                  <div className="d-flex flex-column align-items-center">
                    <img
                      src={profileImage ?? userImageDefault}
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
                      onChange={handleFileChange}
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
                    type="string"
                    label="Cargos"
                    placeholder="Cargos"
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
                  <div className="d-flex justify-content-center gap-4">
                    <button
                      className="btn bg-black text-white rounded p-1 w-100"
                      type="submit"
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

export default CreateUser;
