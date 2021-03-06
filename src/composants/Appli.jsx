import { useEffect, useState } from 'react';
import logo from '../images/memo-logo.png';
import './Appli.scss';
import Controle from './Controle';
import Taches from './Taches';
import * as crudUtilisateurs from '../services/crud-utilisateurs';
import Accueil from './Accueil';
import Utilisateur from './Utilisateur';

/***** import taches POINT B ESSAI **************/
  import * as crudTaches from '../services/crud-taches'; 
import * as taches from '../services/crud-taches';
import * as setTaches from '../services/crud-taches';
import * as completee from '../services/crud-taches';


  /***AJOUT SUPRRIMER TOUTES LES TACHES POINT B ESSAI *************//* Appli */
function supprimerTaches(uid,taches){
  crudTaches.supprimer(uid,taches).then(
    () => setTaches(taches.filter(
      taches => taches.id == completee
    ))
  )
}


export default function Appli() {
  // État de l'utilisateur
  const [utilisateur, setUtilisateur] = useState(null);

  // Observer le changement d'état de la connexion utilisateur
  useEffect(() => crudUtilisateurs.observerConnexion(setUtilisateur), []);

  // État des tâches
  const etatTaches = useState([]);
  return (
    utilisateur ?
      <div className="Appli">
        <header className="appliEntete">
          <img src={logo} className="appliLogo" alt="Memo" />
          <Utilisateur utilisateur={utilisateur} />
        </header>
        <Taches etatTaches={etatTaches} utilisateur={utilisateur}/>
        <Controle etatTaches={etatTaches} utilisateur={utilisateur}  />
      </div>
    :
      <Accueil />
  );
}
