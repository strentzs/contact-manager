// Définition du type de contact
interface Contact {
    id: number;
    surname: string;
    name: string;
    email: string;
    number: string;
  }
  
  // Récupérer les éléments du DOM
  const contactForm = document.getElementById("contact-form") as HTMLFormElement;
  const surnameInput = document.getElementById("surname-input") as HTMLInputElement;
  const nameInput = document.getElementById("name-input") as HTMLInputElement;
  const emailInput = document.getElementById("email-input") as HTMLInputElement;
  const numberInput = document.getElementById("number-input") as HTMLInputElement;
  const contactList = document.getElementById("contact-list") as HTMLUListElement;
  const deleteAllButton = document.getElementById("delete-all-button") as HTMLButtonElement;
  
  // Tableau pour stocker les contacts
  let contacts: Contact[] = [];
  
  // Fonction pour afficher la liste des contacts
  function displayContacts(): void {
    contactList.innerHTML = ""; // Efface la liste précédente
  
    contacts.forEach(contact => {
      const li = document.createElement("li");
      li.textContent = `${contact.surname} - ${contact.name} - ${contact.email} - ${contact.number} - `;
  
      const deleteButton = document.createElement("button");
      deleteButton.classList.add('delete-button');
      deleteButton.textContent = "Supprimer";
      deleteButton.addEventListener("click", () => {
        deleteContact(contact.id);
      });
  
      li.appendChild(deleteButton); // Ajoute le bouton de suppression au contact
      contactList.appendChild(li);
    });
  }
  
  // Fonction pour ajouter un nouveau contact
  function addContact(event: Event): void {
    event.preventDefault(); // Empêche le rechargement de la page
  
    const surname = surnameInput.value;
    const name = nameInput.value;
    const email = emailInput.value;
    const number = numberInput.value;
  
    if (surname !== "" && name !== "" && email !== "" && number !== "") {
      const newContact: Contact = {
        id: contacts.length + 1,
        surname,
        name,
        email,
        number
      };
  
      contacts.push(newContact);
      surnameInput.value = ""; // Réinitialise la valeur de l'input
      nameInput.value = ""; // Réinitialise la valeur de l'input
      emailInput.value = ""; // Réinitialise la valeur de l'input
      numberInput.value = ""; // Réinitialise la valeur de l'input
      displayContacts();
      saveContacts();
    }
  }
  
  // Fonction pour sauvegarder les contacts dans le stockage local
  function saveContacts(): void {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
  
  // Fonction pour charger les contacts depuis le stockage local
  function loadContacts(): void {
    const savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
      contacts = JSON.parse(savedContacts);
      displayContacts();
    }
  }

  function deleteContact(contactId: number): void {
    contacts = contacts.filter(contact => contact.id !== contactId);
    displayContacts();
    saveContacts();
  }

  function deleteAllContacts(): void {
    contacts = []; // Réinitialise le tableau de contacts
    displayContacts(); // Affiche la liste vide
    saveContacts(); // Sauvegarde les contacts vides dans le stockage local
  }
  
  // Gestionnaire d'événement pour la soumission du formulaire
  contactForm.addEventListener("submit", addContact);
  deleteAllButton.addEventListener("click", deleteAllContacts);
  
  // Appel initial pour charger les contacts depuis le stockage local
  loadContacts();
  