import React from "react";
import ResultDisplay from "./pages/displayPages";
import OperationsPanel from "./pages/operationPages";
import styled from "styled-components";
import { CategoryProvider } from "./components/shareContext";

const App: React.FC = () => {
  return (
    <div>
      <Container>
        <CategoryProvider>
        <OperationsPanel/>
          <ResultDisplay/>
        </CategoryProvider>  
      </Container>
    </div>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1600; // Set max-width for the container

  @media (min-width: 1200px) {
    flex-direction: row; // Change flex-direction to row when the width is over 1200px
    gap: 20px; // Increase space between items
  }
`

export default App;