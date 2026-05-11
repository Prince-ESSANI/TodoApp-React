function ContactItem({ contact, onDelete, onEdit }) {
  return (
    <tr className="contact-item">
      <td>{contact.prenom}</td>
      <td>{contact.nom}</td>
      <td>{contact.email}</td>
      <td>{contact.telephone}</td>
      <td>
        <button onClick={() => onEdit(contact)} className="edit-btn">Modifier</button>
        <button onClick={() => onDelete(contact.id)} className="delete-btn">Supprimer</button>
      </td>
    </tr>
  );
}

export default ContactItem;
