import React from "react";
import ResultDisplay from "./pages/displayPages";
import OperationsPanel from "./pages/operationPages";

const App: React.FC = () => {
  
  return (
    <div>
      <h1>Book Management System</h1>
      <OperationsPanel/>
      <ResultDisplay/>
    </div>
  );
};

export default App;