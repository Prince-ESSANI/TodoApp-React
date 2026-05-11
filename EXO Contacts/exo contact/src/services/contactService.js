// Simulation d'un backend avec localStorage
const STORAGE_KEY = 'contacts_data';

export const contactService = {
  // Récupérer tous les contacts
  getAll: async () => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  // Ajouter un contact
  create: async (contact) => {
    const contacts = await contactService.getAll();
    const newContact = { ...contact, id: Date.now() };
    contacts.push(newContact);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
    return newContact;
  },

  // Modifier un contact
  update: async (id, updatedContact) => {
    const contacts = await contactService.getAll();
    const index = contacts.findIndex(c => c.id === id);
    if (index !== -1) {
      contacts[index] = { ...updatedContact, id };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts));
      return contacts[index];
    }
    throw new Error('Contact non trouvé');
  },

  // Supprimer un contact
  delete: async (id) => {
    const contacts = await contactService.getAll();
    const filtered = contacts.filter(c => c.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  }
};
