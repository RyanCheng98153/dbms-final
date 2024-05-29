import React from "react";
import Tabs from '../../components/tabs';
import TabPanel from '../../components/tabpanel';
 
const OperationsPanel = () => {
    return (
        <div>
            <Tabs>
                <TabPanel label="新增書籍">
                    <div>new book</div>
                </TabPanel>
                <TabPanel label="新增閱讀歷史">
                    <div>new history</div>  
                </TabPanel>
                <TabPanel label="新增閱讀計畫&更新">
                    <div>new plan</div>
                </TabPanel>
                <TabPanel label="刪除資料">
                    <div>delete info</div>
                </TabPanel>
                <TabPanel label="按分類搜尋">
                    <div>search</div>
                </TabPanel>
            </Tabs>
        </div>
    );
};
 
export default OperationsPanel;