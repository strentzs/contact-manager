// Récupérer les éléments du DOM
var contactForm = document.getElementById("contact-form");
var surnameInput = document.getElementById("surname-input");
var nameInput = document.getElementById("name-input");
var emailInput = document.getElementById("email-input");
var numberInput = document.getElementById("number-input");
var contactList = document.getElementById("contact-list");
var deleteAllButton = document.getElementById("delete-all-button");
// Tableau pour stocker les contacts
var contacts = [];
// Fonction pour afficher la liste des contacts
function displayContacts() {
    contactList.innerHTML = ""; // Efface la liste précédente
    contacts.forEach(function (contact) {
        var li = document.createElement("li");
        li.textContent = "".concat(contact.surname, " - ").concat(contact.name, " - ").concat(contact.email, " - ").concat(contact.number, " - ");
        var deleteButton = document.createElement("button");
        deleteButton.classList.add('delete-button');
        deleteButton.textContent = "Supprimer";
        deleteButton.addEventListener("click", function () {
            deleteContact(contact.id);
        });
        li.appendChild(deleteButton); // Ajoute le bouton de suppression au contact
        contactList.appendChild(li);
    });
}
// Fonction pour ajouter un nouveau contact
function addContact(event) {
    event.preventDefault(); // Empêche le rechargement de la page
    var surname = surnameInput.value;
    var name = nameInput.value;
    var email = emailInput.value;
    var number = numberInput.value;
    if (surname !== "" && name !== "" && email !== "" && number !== "") {
        var newContact = {
            id: contacts.length + 1,
            surname: surname,
            name: name,
            email: email,
            number: number
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
function saveContacts() {
    localStorage.setItem("contacts", JSON.stringify(contacts));
}
// Fonction pour charger les contacts depuis le stockage local
function loadContacts() {
    var savedContacts = localStorage.getItem("contacts");
    if (savedContacts) {
        contacts = JSON.parse(savedContacts);
        displayContacts();
    }
}
function deleteContact(contactId) {
    contacts = contacts.filter(function (contact) { return contact.id !== contactId; });
    displayContacts();
    saveContacts();
}
function deleteAllContacts() {
    contacts = []; // Réinitialise le tableau de contacts
    displayContacts(); // Affiche la liste vide
    saveContacts(); // Sauvegarde les contacts vides dans le stockage local
}
// Gestionnaire d'événement pour la soumission du formulaire
contactForm.addEventListener("submit", addContact);
deleteAllButton.addEventListener("click", deleteAllContacts);
// Appel initial pour charger les contacts depuis le stockage local
loadContacts();
