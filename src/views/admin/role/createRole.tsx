import { Field, Form, Formik, FormikHelpers } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';
import * as ROUTES from '../../../constants/routes';
import { useNavigate } from 'react-router-dom';
import api from '../../../services/Api';
import { useEffect, useState } from 'react';
import { PermissionObject, RolePayload } from '../../../components/common/Models';
import CustomSelect from '../../../components/formik/CustomSelect';

const createCategorySchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  permissions: Yup.array().of(Yup.number().required()).min(1, 'Selecione pelo menos uma permissão')
});

const CreateRole = () => {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState<PermissionObject[]>([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await api.get('/permission');
        setPermissions(response.data);
      } catch (error) {
        console.error('Erro ao buscar permissões');
      }
    };

    fetchPermissions();
  }, []);

  const onSubmitForm = async (values: RolePayload, { setSubmitting }: FormikHelpers<RolePayload>) => {
    try {
      await api.post('role', { name: values.name, permissionIds: values.permissions });
      navigate(ROUTES.ADMIN_ROLES);
    } catch (error) {
      console.error('Erro ao cadastrar a categoria');
    } finally {
      setSubmitting(false);
    }
  };

  const permissionOptions = permissions.map((permission) => ({
    value: permission.id,
    label: `${permission.action} - ${permission.tableName}`, 
  }));

  return (
    <main className="primary-container p-5 d-flex">
      <div className="card bg-white p-5" style={{ maxWidth: '30.75rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 className="text-center mb-4">Cadastro de Cargo</h3>
          <Formik
            initialValues={{
              name: '',
              permissions: [] as number[],
            }}
            validateOnMount
            validationSchema={createCategorySchema}
            onSubmit={onSubmitForm}
          >
            {() => (
              <Form className="users-edit-form">
                <div className="d-flex flex-column gap-3">
                  <Field
                    name="name"
                    type="string"
                    label="Nome"
                    autoComplete="true"
                    placeholder="Nome"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />
                  <Field
                    name="permissions"
                    label="Permissões"
                    options={permissionOptions}
                    isMulti
                    placeholder="Permissões"
                    component={CustomSelect}
                  />
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

export default CreateRole;