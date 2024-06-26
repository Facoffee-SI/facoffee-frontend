import './progressTrackerPlan.css';

const ProgressTrackerPlan = ({ currentStep }: any) => {
  return (
    <div className="progress-tracker">
      <div className={`step ${currentStep >= 1 ? 'active' : ''}`}>
        <div className="circle">1</div>
        <p>Confirmação</p>
      </div>
      <div className="line"></div>
      <div className={`step ${currentStep >= 2 ? 'active' : ''}`}>
        <div className="circle">2</div>
        <p>Finalizar</p>
      </div>
    </div>
  );
};

export default ProgressTrackerPlan;
