import React from "react";
import styled from "styled-components";

interface ListProps<T> {
  items: T[];
  renderItem: (item: T, index: number) => React.ReactNode;
}

function List<T>({ items, renderItem }: ListProps<T>): JSX.Element {
  if (items.length === 0) {
    return (
      <NodataContainer>
        <NodataItem>No data available in table</NodataItem>
      </NodataContainer>
    );
  }
  return (
    <ListContainer>
      {items.map((item, index) => (
        <ListItem key={(item as any).id}>{renderItem(item, index)}</ListItem>
      ))}
    </ListContainer>
  );
}

const ListContainer = styled.div`
  max-width: 800px; /* 固定列表寬度 */
  margin: 0 auto;
`;

const ListItem = styled.div`
  border-bottom: 1px solid gray;
  padding: 10px 15px;
`;

const NodataContainer = styled.div`
  height: 20px;
  display: flex;
  padding: 10px 15px;
  margin-top: 5px;
  margin-bottom: 5px;
  border-bottom: 1px solid gray;
  align-items: center;
  justify-content: center;
  background-color: white;
`;

const NodataItem = styled.div`
  margin-left: 1px;
  margin-right: 1px;
  padding-inline: 1px;
`;

export default List;
