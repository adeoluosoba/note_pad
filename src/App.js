import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
  { id: 2, description: "Charger", quantity: 2, packed: true },
];

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(item) {
    setItems((items) => [...items, item]);
  }

  function handleDeleteItems(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }
  function handleClear() {
    setItems([]);
  }

  function handleToggleItems(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }
  return (
    <div className="app">
      <h1>Ade Shopping List</h1>
      <Form onAddItems={handleAddItems} />
      <List
        items={items}
        onDeleteItem={handleDeleteItems}
        onToggleItems={handleToggleItems}
      />
      <Footer onClear={handleClear} onAddItems={handleAddItems} items={items} />
    </div>
  );
}

function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();

    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };
    onAddItems(newItem);
    setDescription("");
    setQuantity("");
  }

  return (
    <form className="form" onSubmit={handleSubmit}>
      <span>
        <span className="num">
          🔢
          <input
            type="number"
            placeholder="quantity"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </span>
        <span className="items">
          👜
          <input
            type="text"
            placeholder="...items"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </span>
        <button>ADD</button>
      </span>
    </form>
  );
}

function List({ items, onDeleteItem, onToggleItems }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItems}
          />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onDeleteItem, onToggleItem }) {
  return (
    <div className="list-item">
      <li>
        <input
          type="checkbox"
          value={item.packed}
          onChange={() => onToggleItem(item.id)}
        />
        <span
          style={
            item.packed ? { backgroundColor: "red" } : { backgroundColor: "" }
          }
        >
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDeleteItem(item.id)}>❌</button>
      </li>
    </div>
  );
}

function Footer({ onClear, items }) {
  const numItems = items.length;
  const packedNum = items.filter((item) => item.packed).length;
  return (
    <div className="footer">
      <button onClick={() => onClear()}>CLEAR</button>
      <div className="numPacked">
        {packedNum} packed of {numItems}
      </div>
    </div>
  );
}
