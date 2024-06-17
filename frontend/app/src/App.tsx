import React from "react";
import ResultDisplay from "./pages/displayPages";
import OperationsPanel from "./pages/operationPages";
import styled from "styled-components";

const App: React.FC = () => {
  return (
    <div>
      {/*<h1>Book Management System</h1>*/}
      <Container>  
        <OperationsPanel/>
        <ResultDisplay/>
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1500px; // Set max-width for the container

  @media (min-width: 1200px) {
    flex-direction: row; // Change flex-direction to row when the width is over 1200px
    gap: 20px; // Increase space between items
  }
`

export default App;