import { Button, Col } from 'react-bootstrap';
import { useState, useEffect } from 'react';
import Papa from 'papaparse';
import jsPDF from 'jspdf';
import api from '../../../services/Api';

const ReportAdmin = () => {
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await api.get('product');
      setProducts(response.data);
    };

    const fetchOrders = async () => {
      const response = await api.get('order');
      setOrders(response.data);
    };

    const fetchSubscriptions = async () => {
      const response = await api.get('subscription');
      setSubscriptions(response.data);
    };

    fetchProducts();
    fetchOrders();
    fetchSubscriptions();
  }, []);

  const downloadCSV = (data: unknown[] | Papa.UnparseObject<unknown>, filename: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${filename}.csv`;
    link.click();
  };

  const downloadPDF = (data: any[], filename: string) => {
    const doc = new jsPDF();
    let y = 10;

    data.forEach((row: { [s: string]: unknown; } | ArrayLike<unknown>) => {
      const text = Object.values(row).join(' ');
      doc.text(text, 10, y);
      y += 10;
    });

    doc.save(`${filename}.pdf`);
  };

  return (
    <main className="primary-container p-5">
      <div className="secondary-container p-5" style={{ maxWidth: '50.75rem', width: '100%', boxSizing: 'border-box' }}>
        <div className="tertiary-container">
          <h3 className="text-center m-4">Controle de Relatórios</h3>
          <div className="p-4">
            <div>
              <Col className="mb-3">
                <div className="card p-3 shadow">
                  <h5>Produtos Cadastrados</h5>
                  <h6 className="mb-4">Relatório com dados dos produtos cadastrados</h6>
                  <div className="d-flex justify-content-end">
                    <Button variant="success" onClick={() => downloadCSV(products, 'produtos-cadastrados')}>
                      Download CSV
                    </Button>
                    <Button variant="danger" onClick={() => downloadPDF(products, 'produtos-cadastrados')}>
                      Download PDF
                    </Button>
                  </div>
                </div>
              </Col>
              <Col className="mb-3">
                <div className="card p-3 shadow">
                  <h5>Venda de Produtos</h5>
                  <h6 className="mb-4">Relatório com dados dos pedidos realizados</h6>
                  <div className="d-flex justify-content-end">
                    <Button variant="success" onClick={() => downloadCSV(orders, 'venda-produtos')}>
                      Download CSV
                    </Button>
                    <Button variant="danger" onClick={() => downloadPDF(orders, 'venda-produtos')}>
                      Download PDF
                    </Button>
                  </div>
                </div>
              </Col>
              <Col className="mb-3">
                <div className="card p-3 shadow">
                  <h5>Planos de Assinatura</h5>
                  <h6 className="mb-4">Relatório com dados dos planos de assinatura</h6>
                  <div className="d-flex justify-content-end">
                    <Button variant="success" onClick={() => downloadCSV(subscriptions, 'planos-cadastrados')}>
                      Download CSV
                    </Button>
                    <Button variant="danger" onClick={() => downloadPDF(subscriptions, 'planos-cadastrados')}>
                      Download PDF
                    </Button>
                  </div>
                </div>
              </Col>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ReportAdmin;
