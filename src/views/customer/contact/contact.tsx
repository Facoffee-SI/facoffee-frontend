import { useEffect, useState } from 'react';
import api from '../../../services/Api';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/common/Loading';
import { ContactObject } from '../../../components/common/Models';

const ContactInfo = () => {
  const [contact, setContact] = useState<ContactObject>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchContact = async () => {
      try {
        setLoading(true);
        const response = await api.get('contact/customer');
        setContact(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar o Cliente');
        setLoading(false);
      }
    };

    fetchContact();
  }, []);

  return (
    <>
      {loading ? <Loading /> : (
        <>
          <main className="primary-container p-3 d-flex justify-content-center align-items-center">
            <div className="card p-5" style={{ maxWidth: '70.75rem' }}>
              <h1 className="text-center mb-2">Contato</h1>
              {contact ? (
                <div className="row" style={{ marginTop: '20px' }}>
                  <div className="col-md-6">
                    <h3>Informações de Contato</h3>
                    <hr />
                    <p>
                      <strong>Nome:</strong> {contact?.name}
                    </p>
                    <p>
                      <strong>Endereço:</strong> {contact?.address}
                    </p>
                    <p>
                      <strong>Telefone:</strong> {contact?.phone}
                    </p>
                    <p>
                      <strong>Email:</strong>{' '}
                      {contact?.email ? (
                        <a href={`mailto:${contact.email}`}>{contact.email}</a>
                      ) : (
                        'Não disponível'
                      )}
                    </p>
                    <p>
                      <strong>Localização:</strong>{' '}
                      {contact?.linkGoogleMaps ? (
                        <a href={contact.linkGoogleMaps} target="_blank" rel="noopener noreferrer">
                          Ver no Google Maps
                        </a>
                      ) : (
                        'Não disponível'
                      )}
                    </p>
                  </div>
                  <div className="col-md-6">
                    <h3>Quem somos</h3>
                    <hr />
                    <div dangerouslySetInnerHTML={{ __html: contact?.description ?? '' }} />
                  </div>
                </div>
              ): (
                <p>Nenhuma informação de contato disponível.</p>
              )}
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default ContactInfo;