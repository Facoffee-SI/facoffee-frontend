import { useEffect, useState } from 'react';
import api from '../../../services/Api';
import Loading from '../../../components/common/Loading';

interface AboutObject {
  description: string;
}

const AboutInfo = () => {
  const [about, setAbout] = useState<AboutObject>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchAbout = async () => {
      try {
        setLoading(true);
        const response = await api.get('about/customer');
        setAbout(response.data[0]);
        setLoading(false);
      } catch (error) {
        console.error('Erro ao buscar o Cliente');
        setLoading(false);
      }
    };

    fetchAbout();
  }, []);

  return (
    <>
      {loading ? <Loading /> : (
        <>
          <main className="primary-container p-3 d-flex justify-content-center align-items-center">
            <div className="card p-5" style={{ maxWidth: '70.75rem' }}>
              <h1 className="text-center mb-2">Sobre Nós</h1>
              <div style={{ marginTop: '15px' }}>
                {about?.description ? (
                <div dangerouslySetInnerHTML={{ __html: about.description }} />
                ) : (
                  <p>Nenhum conteúdo sobre a empresa disponível.</p>
                )}
              </div>
            </div>
          </main>
        </>
      )}
    </>
  );
};

export default AboutInfo;
