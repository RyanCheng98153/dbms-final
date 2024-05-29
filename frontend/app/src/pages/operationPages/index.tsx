import React from "react";
import Tabs from '../../components/tabs';
import TabPanel from '../../components/tabpanel';
import NewBook from "./newbook";
import NewBookmark from "./newBookmark";
import NewPlan from "./newPlan";
import DeleteData from "./deleteData";
import SearchCategory from "./searchByCategory";
 
const OperationsPanel = () => {
    return (
        <div>
            <Tabs>
                <TabPanel label="新增書籍">
                    <NewBook/>
                </TabPanel>
                <TabPanel label="新增閱讀歷史">
                    <NewBookmark/>  
                </TabPanel>
                <TabPanel label="新增閱讀計畫&更新">
                    <NewPlan/>
                </TabPanel>
                <TabPanel label="刪除資料">
                    <DeleteData/>
                </TabPanel>
                <TabPanel label="按分類搜尋">
                    <SearchCategory/>
                </TabPanel>
            </Tabs>
        </div>
    );
};
 
export default OperationsPanel;