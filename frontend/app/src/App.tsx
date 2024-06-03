import React from "react";
import ResultDisplay from "./pages/displayPages";
import OperationsPanel from "./pages/operationPages";

const App: React.FC = () => {
  
  return (
    <div>
      <h1>Book Management System</h1>
      <OperationsPanel/>
      <ResultDisplay/>
      
      <button onClick={()=>{alert('pressed')}}>
          button
      </button>
    </div>
  );
};

export default App;