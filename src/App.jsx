import { useState } from "react";
import "./App.css";

function App() {
  let [contacts, setContacts] = useState([
    "sahil",
    "sudhanshu",
    "om",
    "abhinav",
  ]);
  let [search, setSearch] = useState("");
  let [newContact, setNewContact] = useState("");

  const filteredContacts = contacts.filter((contact) =>
    contact.includes(search)
  );

  const addContact = async (e) => {
    e.preventDefault();
    setContacts([...contacts, newContact]);
    let response = await fetch(
      "https://reactcontact-be7d8-default-rtdb.firebaseio.com/contactreact.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contacts),
      }
    );
  };

  return (
    <>
      <form method="POST">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <div className="container">
          {filteredContacts.length > 0 ? (
            <ul>
              {filteredContacts.map((contact) => (
                <li key={contact}>
                  {contact}
                  <button
                    onClick={() => {
                      setContacts(
                        contacts.filter((deleteItem) => deleteItem !== contact)
                      );
                    }}
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          ) : (
            <div>This contact is not available</div>
          )}
        </div>

        <input
          type="text"
          placeholder="Add to contacts"
          value={newContact}
          onChange={(e) => setNewContact(e.target.value)}
        />
        <button onClick={addContact}>Add to contacts</button>
      </form>
    </>
  );
}

export default App;
