import React, { useState } from 'react';
import Header from './components/Header';
import NetworkContainer from './components/NetworkContainer';
import ButtonGroup from './components/ButtonGroup';
import CashFlowModal from './components/CashFlowModal';
import { createRandomData, createDataFromInput, solveCashFlow } from './utils/cashFlowLogic';

function App() {
  const [showModal, setShowModal] = useState(false);
  const [network1Data, setNetwork1Data] = useState(null);
  const [network2Data, setNetwork2Data] = useState(null);

  const handleGenerateRandom = () => {
    const data = createRandomData();
    setNetwork1Data(data);
  };

  const handleNewProblem = (inputData) => {
    const data = createDataFromInput(inputData);
    setNetwork1Data(data);
  };

  const handleSolve = () => {
    if (network1Data) {
      const solvedData = solveCashFlow(network1Data);
      setNetwork2Data(solvedData);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <NetworkContainer 
          network1Data={network1Data}
          network2Data={network2Data}
        />
        <ButtonGroup 
          onGenerateRandom={handleGenerateRandom}
          onSolve={handleSolve}
          onNewProblem={() => setShowModal(true)}
        />
      </div>
      <CashFlowModal 
        show={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleNewProblem}
      />
    </div>
  );
}

export default App;
