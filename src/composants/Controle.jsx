import './Controle.scss';
//import ToggleButton from '@material-ui/lab/ToggleButton';
//import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
/***import */




export default function Controle({etatTaches, utilisateur,supprimerTaches,taches,trierTachesComplete,trierTachesNonComplete}) {
  
  return (
    <footer className="Controle">
   
      <a href="value">Toutes</a>
      <a href="value" onClick={() => trierTachesComplete(taches)}>Completée</a>
      <a href="value"onClick={() => trierTachesNonComplete(taches)} >Non-Completée</a>

      <span className="compte">
    {/* essai point C ********}
    {/* { afficherNbTachesNonCompletee={afficherNbTachesNonCompletee}} */}
        tâches restantes
      </span>
      <IconButton 
        aria-label="delete" 
        size="small" 
        variant="contained" 
        color="secondary" 
        onClick={() => supprimerTaches(taches)} 
        title="Supprimer les tâches complétées"
      >
        <DeleteIcon fontSize="small" />
      </IconButton>
    </footer>
  );
}