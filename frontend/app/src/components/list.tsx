import styled from "styled-components";

interface ListProps<T> {
    items: T[];
    renderItem: (item: T, index: number) => React.ReactNode;
  }
  
  function List<T>({ items, renderItem }: ListProps<T>): JSX.Element {
    if(items.length == 0){
        return (
            <NodataContainer>
                <NodataItem>
                    No data available in table
                </NodataItem>
            </NodataContainer>
        )
    }
    return (
      <div>
        {items.map((item, index) => (
          <div key={(item as any).id}>{renderItem(item, index)}</div>
        ))}
      </div>
    );
  }


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
`

const NodataItem = styled.div`
    margin-left: 1px;
    margin-right: 1px;
    //background-color: yellow;
    padding-inline: 1px;
`

export default List