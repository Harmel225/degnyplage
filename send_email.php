<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupérer les données du formulaire
    $arrivee = htmlspecialchars($_POST['arrivee']);
    $depart = htmlspecialchars($_POST['depart']);
    $personnes = htmlspecialchars($_POST['personnes']);
    $chambres = htmlspecialchars($_POST['chambres']);
    $type_chambre = htmlspecialchars($_POST['type_chambre']);
    $civilite = htmlspecialchars($_POST['question']);
    $prenom = htmlspecialchars($_POST['prenom']);
    $nom = htmlspecialchars($_POST['nom']);
    $entreprise = htmlspecialchars($_POST['entreprise']);
    $telephone = htmlspecialchars($_POST['telephone']);
    $email = htmlspecialchars($_POST['email']);
    $dejeuner = isset($_POST['dejeuner']) ? "Oui" : "Non";
    $diner = isset($_POST['diner']) ? "Oui" : "Non";

    // Construire le message
    $message = "
        Nouvelle réservation :\n\n
        Arrivée : $arrivee\n
        Départ : $depart\n
        Nombre de personnes : $personnes\n
        Nombre de chambres : $chambres\n
        Type de chambre : $type_chambre\n
        Civilité : $civilite\n
        Prénoms : $prenom\n
        Nom : $nom\n
        Entreprise : $entreprise\n
        Numéro de téléphone : $telephone\n
        E-mail : $email\n
        Déjeuner inclus : $dejeuner\n
        Dîner inclus : $diner\n
    ";

    // Configurer l'email
    $to = "gloh.geekmaster@gmail.com"; // Remplacez par l'email de votre entreprise
    $subject = "Nouvelle réservation depuis le Site Internet";
    $headers = "From: $email\r\n";

    // Envoyer l'email
    if (mail($to, $subject, $message, $headers)) {
        echo "Merci ! Votre réservation a été envoyée avec succès.";
    } else {
        echo "Erreur : Nous n'avons pas pu envoyer votre réservation. Veuillez réessayer.";
    }
} else {
    echo "Méthode non autorisée.";
}
?>
