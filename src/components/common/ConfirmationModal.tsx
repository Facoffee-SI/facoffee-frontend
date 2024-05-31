import Modal from 'react-modal';

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    text: string;
  }

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, onClose, onConfirm, text }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Confirmação de exclusão"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
        content: {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '350px',
          height: '150px',
          padding: '15px',
          borderRadius: '10px',
          backgroundColor: '#FFFFFF',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
        },
      }}
    >
      <h5 className="mb-3">{text}</h5>
      <div className="d-flex gap-2">
        <button className="btn btn-danger" onClick={onConfirm}>
          Sim
        </button>
        <button className="btn btn-dark" onClick={onClose}>
          Cancelar
        </button>
      </div>
    </Modal>
  );
};