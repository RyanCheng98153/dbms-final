import React from "react";
import Tabs from './components/tabs';
import TabPanel from './components/tabpanel';
import About from "./pages/about";
import BookList from "./pages/bookList";
import ReadingPlan from "./pages/readingPlan";

const App: React.FC = () => {
  return (
    <div>
      <h1>Book Management System</h1>
      <Tabs>
        <TabPanel label="書籍">
          <About/>
        </TabPanel>
        <TabPanel label="閱讀歷史">
          <BookList/>  
        </TabPanel>
        <TabPanel label="閱讀計畫">
          <ReadingPlan/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default App;