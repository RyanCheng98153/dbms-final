import React from "react";
import Tabs from '../../components/tabs';
import TabPanel from '../../components/tabpanel';
import Books from "./books";
import BookList from "./bookmark";
import ReadingPlan from "./readingPlan";
import SearchResult from "./searchResult";
import FavoriteList from "./favorite";
import styled from "styled-components";
 
const ResultDisplay = () => {
    return (
        <PanelContainer>
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
                <TabPanel label="我的最愛">
                    <FavoriteList/>
                </TabPanel>
                <TabPanel label="搜尋結果">
                    <SearchResult/>
                </TabPanel>

            </Tabs>
        </PanelContainer>
    );
};
 

const PanelContainer = styled.div`
    //display: flex;
    padding: 10px;
`

export default ResultDisplay;