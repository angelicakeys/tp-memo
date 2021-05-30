import firebase from 'firebase/app';
import { collUtil, collTaches } from './config';
import { instanceFirestore } from './firebase-initialisation';

/**
 * Créer une nouvelle tâche pour l'utilisateur connecté
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @param {Object} tache document à ajouter aux tâches de l'utilisateur
 * @returns {Promise<null>} Promesse sans paramètre
 */
export async function creer(uid, tache) {
  // On ajoute la propriété 'date' à l'objet représentant la tâche en prenant la 
  // date du serveur Firestore.
  tache.date = firebase.firestore.FieldValue.serverTimestamp();
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
    .add(tache).then(
      tacheRef => tacheRef.get()
    );
}

/**
 * Obtenir toutes les tâches d'un utilisateur
 * @param {string} uid identifiant d'utilisateur Firebase 
 * @returns {Promise<any[]>} Promesse avec le tableau des tâches
 */
export async function lireTout(uid) {
  const taches = [];
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
               // .where('completee','==',true)
                .orderBy('completee','asc')
                .orderBy('date', 'desc')
               .get().then(
                  reponse => reponse.forEach(
                    doc => {
                      taches.push({id: doc.id, ...doc.data()})
                    }
                  )
                ).then(
                  () => taches
                );
}

/**
 * Modifie l'état d'une tâche dans Firestore pour l'utilisateur connecté
 * @param {String} uid Identifiant de l'utilisateur connecté
 * @param {String} tid Identifiant de la tâche à faire basculer d'état
 * @param {Boolean} etatActuel Valeur actuelle de l'état de la tâche
 * @returns {Promise<void>} Promesse JS sans valeur (vide)
 */
export async function modifier(uid, tid, etatActuel) {
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
    .doc(tid).update({completee:!etatActuel});
}

/**
 * 
 * Supprime une tâche dans Firestore pour l'utilisateur connecté
 * @param {String} uid Identifiant de l'utilisateur connecté
 * @param {String} tid Identifiant de la tâche à faire basculer d'état
 * @returns {Promise<void>} Promesse JS sans valeur (vide)
 */
export async function supprimer(uid, tid) {
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
    .doc(tid).delete();
}
/******* Supprimer tous les tâches POINT B ESSAI *******************************************************************/
export async function supprimerTaches(taches) {
  return instanceFirestore.collection(collUtil).doc(taches).collection(collTaches)
   
  .where('completee','===',true).get().then(function(supprimerLesTaches){
    supprimerLesTaches.forEach(function(doc) {
      doc(taches).delete();
     

    });
  });


}




/******* trier les tâches Completee POINT D *******************************************************************/

export async function trierTachesComplete(uid) {
  const taches = [];
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
              
           
                .where('completee','!=',false).get().then(
                  reponse => reponse.forEach(
                    doc => {
                      taches.push({id: doc.id, ...doc.data()})
                    }
                  )
                ).then(
                  () => taches
                );
              }

/******* trier les tâches Non- POINT D *******************************************************************/

export async function trierTachesNonComplete(uid) {
  const taches = [];
  return instanceFirestore.collection(collUtil).doc(uid).collection(collTaches)
           
                .where('completee','!=',true).get().then(
                  reponse => reponse.forEach(
                    doc => {
                      taches.push({id: doc.id, ...doc.data()})
                    }
                  )
                ).then(
                  () => taches
                );
            }


