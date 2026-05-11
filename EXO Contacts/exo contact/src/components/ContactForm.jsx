import { useState, useEffect } from 'react';

function ContactForm({ onSave, editingContact, onCancel }) {
  const [formData, setFormData] = useState({
    prenom: '',
    nom: '',
    email: '',
    telephone: ''
  });

  useEffect(() => {
    if (editingContact) {
      setFormData(editingContact);
    } else {
      setFormData({ prenom: '', nom: '', email: '', telephone: '' });
    }
  }, [editingContact]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.prenom || !formData.nom || !formData.email) {
      alert('Veuillez remplir les champs obligatoires');
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <h3>{editingContact ? 'Modifier le contact' : 'Ajouter un contact'}</h3>
      <div className="form-group">
        <input name="prenom" value={formData.prenom} onChange={handleChange} placeholder="Prénom" required />
        <input name="nom" value={formData.nom} onChange={handleChange} placeholder="Nom" required />
      </div>
      <div className="form-group">
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
        <input name="telephone" value={formData.telephone} onChange={handleChange} placeholder="Téléphone" />
      </div>
      <div className="form-actions">
        <button type="submit" className="save-btn">{editingContact ? 'Mettre à jour' : 'Ajouter'}</button>
        {editingContact && <button type="button" onClick={onCancel} className="cancel-btn">Annuler</button>}
      </div>
    </form>
  );
}

export default ContactForm;
