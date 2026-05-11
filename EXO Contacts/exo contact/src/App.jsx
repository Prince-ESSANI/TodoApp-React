import { useState, useEffect } from 'react';
import { contactService } from './services/contactService';
import ContactForm from './components/ContactForm';
import ContactItem from './components/ContactItem';
import './App.css';

function App() {
  const [contacts, setContacts] = useState([]);
  const [editingContact, setEditingContact] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('nom');

  useEffect(() => {
    loadContacts();
  }, []);

  const loadContacts = async () => {
    const data = await contactService.getAll();
    setContacts(data);
  };

  const handleSave = async (formData) => {
    if (editingContact) {
      await contactService.update(editingContact.id, formData);
      setEditingContact(null);
    } else {
      await contactService.create(formData);
    }
    loadContacts();
  };

  const handleDelete = async (id) => {
    if (window.confirm('Supprimer ce contact ?')) {
      await contactService.delete(id);
      loadContacts();
    }
  };

  const filteredContacts = contacts
    .filter(c => 
      c.nom.toLowerCase().includes(searchTerm.toLowerCase()) || 
      c.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.email.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => a[sortBy].localeCompare(b[sortBy]));

  return (
    <div className="container">
      <h1>Gestionnaire de Contacts</h1>
      
      <div className="top-bar">
        <input 
          type="text" 
          placeholder="Rechercher un contact..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="sort-select">
          <option value="nom">Trier par Nom</option>
          <option value="prenom">Trier par Prénom</option>
        </select>
      </div>

      <ContactForm 
        onSave={handleSave} 
        editingContact={editingContact} 
        onCancel={() => setEditingContact(null)} 
      />

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Prénom</th>
              <th>Nom</th>
              <th>Email</th>
              <th>Téléphone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredContacts.map(contact => (
              <ContactItem 
                key={contact.id} 
                contact={contact} 
                onDelete={handleDelete} 
                onEdit={setEditingContact} 
              />
            ))}
          </tbody>
        </table>
        {filteredContacts.length === 0 && <p className="empty">Aucun contact trouvé.</p>}
      </div>
    </div>
  );
}

export default App;
