import { Field, Form, Formik } from 'formik';
import { CustomInput } from '../../../components/formik';
import * as Yup from 'yup';
import { useState } from 'react';

const editProductSchema = Yup.object({
  name: Yup.string().required('Obrigatório preencher o nome'),
  description: Yup.string().required('Obrigatório preencher a descrição'),
  brand: Yup.string().required('Obrigatório preencher a marca'),
  price: Yup.string().required('Obrigatório preencher o preço'),
  codebar: Yup.string().required('Obrigatório preencher o código de barras'),
  category: Yup.string().required('Obrigatório selecionar as categorias'),
  quantity: Yup.string().required('Obrigatório preencher a quantidade'),
});

const onSubmitForm = () => {};

const EditProduct = () => {
  const [images, setImages] = useState<File[]>([]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedImages = Array.from(event.target.files || []);
    setImages(selectedImages);
  };

  return (
    <main className="primary-container p-5 d-flex">
      <div className="card bg-white p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <h3 className="text-center mb-2">Edição de Produto</h3>
        <Formik
          initialValues={{
            name: '',
            description: '',
            brand: '',
            price: '',
            codebar: '',
            category: '',
            quantity: '',
            discount: '',
            discountSubscription: '',
          }}
          validateOnMount
          validationSchema={editProductSchema}
          onSubmit={onSubmitForm}
        >
          {() => (
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
                  <Field
                    name="price"
                    type="string"
                    label="Preço"
                    placeholder="Preço"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />
                  <div className="d-flex gap-3">
                    <Field
                      name="discount"
                      type="string"
                      label="Desconto"
                      placeholder="Desconto"
                      component={CustomInput}
                    />
                    <Field
                      name="discountprice"
                      type="string"
                      label="Desconto para assinantes"
                      placeholder="Desconto para assinantes"
                      component={CustomInput}
                    />
                  </div>
                  <Field
                    name="codebar"
                    type="string"
                    label="Código de barras"
                    placeholder="Código de barras"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />
                  <Field
                    name="category"
                    type="string"
                    label="Categorias"
                    placeholder="Categorias"
                    component={CustomInput}
                    style={{ width: '100%' }} 
                  />
                  <Field
                    name="quantity"
                    type="string"
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
