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
`;

const TabList = styled.div`
  display: flex;
  cursor: pointer;
`;

const Tab = styled.div<{ active: boolean }>`
  padding: 10px 20px;
  border-bottom: 2px solid ${props => (props.active ? '#000' : '#ccc')};
  border-bottom-color: ${props => (props.active ? '#000' : '#ccc')};

  background-color: ${props => (props.active ? 'lightblue' : '#eff')};
  // background-color: lightblue;
`;

const TabContent = styled.div`
  padding-top: 5px;
  padding-bottom: 5px;
  padding-left: 30px;
  padding-right: 30px;
  border: 1px solid #ccc;
  margin-top: -1px;
  z-index: -1;
`;

export default Tabs;