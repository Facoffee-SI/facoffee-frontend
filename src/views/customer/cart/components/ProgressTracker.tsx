import './progressTracker.css';

const ProgressTracker = ({ currentStep }: any) => {
  return (
    <div className="progress-tracker">
      <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
        <div className="circle">1</div>
        <p>Carrinho</p>
      </div>
      <div className="line"></div>
      <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
        <div className="circle">2</div>
        <p>Endereço de entrega</p>
      </div>
      <div className="line"></div>
      <div className={`step ${currentStep >= 3 ? 'active' : ''}`}>
        <div className="circle">3</div>
        <p>Finalizar</p>
      </div>
    </div>
  );
};

export default ProgressTracker;
