import { Component, OnInit } from '@angular/core';

interface FaqItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

interface FaqTab {
  title: string;
  icon: string;
  description: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  selectedTab: number = 0;
  searchQuery: string = '';

  tabs: FaqTab[] = [
    {
      title: 'Produits',
      icon: 'bx-dumbbell',
      description: 'Questions concernant nos articles et équipements sportifs.',
      items: [
        { question: 'Quels articles de sport proposez-vous ?', answer: 'Nous proposons des accessoires et équipements pour le fitness, la musculation, le yoga et bien d’autres disciplines.', isOpen: true },
        { question: 'Vendez-vous des chaussures de sport ?', answer: 'Non', isOpen: false },
        { question: 'Avez-vous des vêtements pour le fitness ?', answer: 'Non', isOpen: false },
        { question: 'Quels articles recommandez-vous pour débuter la musculation ?', answer: 'Pour commencer, nous conseillons des haltères légers, un tapis de sol, des élastiques de résistance et un banc de musculation simple.', isOpen: false },
        { question: 'Est-ce que vous proposez des vélos d’appartement ?', answer: 'Oui, plusieurs modèles sont disponibles : pliables, classiques et connectés.', isOpen: false },
        { question: 'Quels sont vos articles les plus vendus ?', answer: 'Les articles les plus demandés sont les tapis de yoga et les haltères.', isOpen: false },
        { question: 'Est-ce que vous avez des tapis de yoga ?', answer: 'Oui, nous proposons différents tapis antidérapants, en plusieurs épaisseurs et couleurs.', isOpen: false },
        { question: 'Est-ce que vous proposez des équipements pour le crossfit ?', answer: 'Oui, nous avons des kettlebells, cordes à sauter, barres de traction, box jump et bandes élastiques.', isOpen: false }
      ]
    },
    {
      title: 'Livraison',
      icon: 'bx-truck',
      description: 'Informations sur la livraison de vos commandes.',
      items: [
        { question: 'Quels sont vos délais de livraison ?', answer: 'En moyenne, la livraison prend 2 à 5 jours ouvrables selon la destination.', isOpen: true },
        { question: 'Combien coûte la livraison ?', answer: 'Les frais varient selon l’adresse, mais sont affichés avant validation de la commande.', isOpen: false },
        { question: 'Est-ce que vous livrez partout en Tunisie ?', answer: 'Oui, nous livrons dans toutes les régions.', isOpen: false },
        { question: 'Livrez-vous à l’international ?', answer: 'Oui, mais les délais et frais dépendent du pays de destination.', isOpen: false },
        { question: 'La livraison est-elle gratuite à partir d’un certain montant ?', answer: 'Non', isOpen: false },
        { question: 'Puis-je choisir une livraison express ?', answer: 'Oui, l’option express est disponible pour certaines zones.', isOpen: false },
        { question: 'Comment suivre ma commande ?', answer: 'Une fois la commande livrée, vous recevez un email de confirmation. Sinon, contactez l’entreprise de livraison.', isOpen: false },
        { question: 'Que faire si mon colis est en retard ?', answer: 'Vous pouvez contacter notre service client pour vérifier le statut de la livraison.', isOpen: false },
        { question: 'Est-ce que vous proposez un point relais ?', answer: 'Non, la livraison en point relais est indisponible.', isOpen: false },
        { question: 'Puis-je modifier mon adresse après avoir passé commande ?', answer: 'Non', isOpen: false }
      ]
    },
    {
      title: 'Paiement',
      icon: 'bx-credit-card',
      description: 'Toutes les questions relatives aux paiements.',
      items: [
        { question: 'Quels moyens de paiement acceptez-vous ?', answer: 'Paiement en ligne uniquement, puisque c’est un site e-commerce.', isOpen: true },
        { question: 'Puis-je payer en espèces à la livraison ?', answer: 'Non, le paiement en espèces est indisponible.', isOpen: false },
        { question: 'Est-ce que vous acceptez les cartes internationales ?', answer: 'Oui, nous acceptons la plupart des cartes Visa et MasterCard.', isOpen: false },
        { question: 'Est-ce que le paiement en ligne est sécurisé ?', answer: 'Oui, nous utilisons des systèmes de sécurité conformes aux standards internationaux.', isOpen: false },
        { question: 'Puis-je payer en plusieurs fois ?', answer: 'Non', isOpen: false },
        { question: 'Que faire si mon paiement échoue ?', answer: 'Vérifiez vos coordonnées bancaires ou contactez notre service client.', isOpen: false },
        { question: 'Est-ce que je reçois une facture après achat ?', answer: 'Oui, une facture est envoyée automatiquement par email.', isOpen: false }
      ]
    },
    {
      title: 'Retours et remboursements',
      icon: 'bx-undo',
      description: 'Politique de retour et remboursement.',
      items: [
        { question: 'Quelle est votre politique de retour ?', answer: 'Vous disposez de 14 jours pour retourner un article non utilisé et dans son emballage d’origine. Veuillez contacter le service de livraison.', isOpen: true },
        { question: 'Les frais de retour sont-ils gratuits ?', answer: 'Dans certains cas (produit défectueux ou erreur d’envoi), les frais de retour sont à notre charge.', isOpen: false },
        { question: 'Comment demander un échange ?', answer: 'Il suffit de contacter notre service client et de préciser le produit concerné.', isOpen: false }
      ]
    },
    {
      title: 'Compte client',
      icon: 'bx-user',
      description: 'Gestion de votre compte et informations personnelles.',
      items: [
        { question: 'Comment créer un compte ?', answer: 'Cliquez sur “Créer un compte” et remplissez vos informations personnelles.', isOpen: true },
        { question: 'Est-ce obligatoire de créer un compte pour acheter ?', answer: 'Oui, l’utilisateur doit être connecté.', isOpen: false },
        { question: 'Comment réinitialiser mon mot de passe ?', answer: 'Cliquez sur “Mot de passe oublié” et suivez les instructions reçues par email.', isOpen: false },
        { question: 'Puis-je consulter mon historique de commandes ?', answer: 'Oui, depuis votre espace client.', isOpen: false },
        { question: 'Est-ce que mes données personnelles sont protégées ?', answer: 'Oui, nous respectons la législation sur la protection des données.', isOpen: false }
      ]
    },
    {
      title: 'Conseils et utilisation',
      icon: 'bx-info-circle',
      description: 'Astuces pour bien utiliser nos équipements.',
      items: [
        { question: 'Comment entretenir un tapis de course ?', answer: 'Nettoyez-le régulièrement et lubrifiez la bande selon les recommandations du fabricant.', isOpen: true },
        { question: 'Quel poids d’haltères choisir pour débuter ?', answer: 'Commencez par des haltères de 2 à 5 kg selon votre condition physique.', isOpen: false }
      ]
    },
    {
      title: 'Support et contact',
      icon: 'bx-phone',
      description: 'Comment nous contacter ou visiter notre magasin.',
      items: [
        { question: 'Comment vous contacter ?', answer: 'Par email ou téléphone.', isOpen: true },
        { question: 'Avez-vous un magasin physique ?', answer: 'Non', isOpen: false }
      ]
    }
  ];

  filteredTabs: FaqTab[] = [...this.tabs];

  ngOnInit(): void {
    this.filterQuestions();
  }

  selectTab(index: number): void {
    this.selectedTab = index;
    this.filteredTabs.forEach((tab, i) => {
      tab.items.forEach(item => {
        item.isOpen = i === index ? item.isOpen : false;
      });
    });
  }

  toggleAccordion(item: FaqItem): void {
    item.isOpen = !item.isOpen;
    this.filteredTabs[this.selectedTab].items.forEach((i: FaqItem) => {
      if (i !== item) i.isOpen = false;
    });
  }

  filterQuestions(): void {
    if (!this.searchQuery.trim()) {
      this.filteredTabs = this.tabs.map(tab => ({ ...tab, items: tab.items.map(item => ({ ...item })) }));
      this.selectTab(this.selectedTab);
      return;
    }
    const query = this.searchQuery.toLowerCase().trim();
    this.filteredTabs = this.tabs
      .map(tab => ({ ...tab, items: tab.items.filter(item => item.question.toLowerCase().includes(query) || item.answer.toLowerCase().includes(query)) }))
      .filter(tab => tab.items.length > 0);

    if (this.filteredTabs.length === 0 || this.selectedTab >= this.filteredTabs.length) {
      this.selectedTab = 0;
    }
    this.selectTab(this.selectedTab);
  }

  getSafeId(question: string): string {
  return 'collapse' + question.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-_]/g, '');
}

}
