

interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
  }
  
  function List<T>({ items, renderItem }: ListProps<T>): JSX.Element {
    return (
      <div>
        {items.map((item) => (
          <div key={(item as any).id}>{renderItem(item)}</div>
        ))}
      </div>
    );
  }

export default List