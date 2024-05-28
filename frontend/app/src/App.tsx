import React from "react";
import Tabs from './components/tabs';
import TabPanel from './components/tabpanel';
import Books from "./pages/books";
import BookList from "./pages/bookmark";
import ReadingPlan from "./pages/readingPlan";
import SearchResult from "./pages/searchResult";

const App: React.FC = () => {
  return (
    <div>
      <h1>Book Management System</h1>
      <Tabs>
        <TabPanel label="書籍">
          <Books/>
        </TabPanel>
        <TabPanel label="閱讀歷史">
          <BookList/>  
        </TabPanel>
        <TabPanel label="閱讀計畫">
          <ReadingPlan/>
        </TabPanel>
        <TabPanel label="搜尋結果">
          <SearchResult/>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default App;