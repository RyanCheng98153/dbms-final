import React, { useState, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';

interface TabsProps {
  children: ReactElement<{ label: string }>[];
}

const Tabs: React.FC<TabsProps> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabClick = (index: number) => {
    setActiveTab(index);
  };

  return (
    <TabContainer>
      <TabList>
        {children.map((child, index) => (
          <Tab
            key={index}
            active={index === activeTab}
            onClick={() => handleTabClick(index)}
          >
            {child.props.label}
          </Tab>
        ))}
      </TabList>
      <TabContent>{children[activeTab]}</TabContent>
    </TabContainer>
  );
};

const TabContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  background: #f7f9fc;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;

const TabList = styled.div`
  display: flex;
  background: #0077b6; /* 深藍色背景 */
  border-bottom: 1px solid #ccc;
`;

const Tab = styled.div<{ active: boolean }>`
  flex: 1;
  padding: 15px 20px;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s ease;
  color: ${props => (props.active ? '#0077b6' : '#fff')}; /* 激活時深藍色字體，未激活時白色字體 */
  background: ${props => (props.active ? '#fff' : 'transparent')}; /* 激活時白色背景，未激活時透明背景 */
  border-bottom: ${props => (props.active ? '2px solid #0077b6' : '2px solid transparent')}; /* 激活時深藍色底線 */

  &:hover {
    background: ${props => (props.active ? '#fff' : 'rgba(255, 255, 255, 0.1)')}; /* 激活時白色背景，懸停時透明白色背景 */
  }
`;

const TabContent = styled.div`
  padding: 20px;
  padding-top: 5px;
  background: #fff;
  color: #333;
  border-top: 1px solid #ccc;
`;
export default Tabs;