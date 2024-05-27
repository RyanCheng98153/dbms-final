import React, { ReactNode } from 'react';

interface TabPanelProps {
  children: ReactNode;
  label: string;
}

const TabPanel: React.FC<TabPanelProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default TabPanel;