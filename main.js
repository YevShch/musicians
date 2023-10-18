import PromptSync from "prompt-sync";
import Musicians from "./musicians.js";
import Bands from "./bands.js"

const prompt = PromptSync( { sigint: true } );
// När vi skapar ett nytt Musicians-objekt kommer constructor att
// läsa in musiker från JSON-filen. 
const musiciansList = new Musicians();
const bandsList = new Bands();

// Start Meny
let run = true;
while ( run ) {
  console.log( `
Meny

1. Create a new musician.
2. Remove a musician.
3. Add a new band to a musician.
4. Remove a band from a musician.
5. Display info about a musician.
6. Incheckning of musicians.
7. Create a new band.
8. Remove a band from the list of bands.
9. Add a musician to a band.
10. Remove a musician from a band.
11. Display info about a band.
12. Incheckning of bands.
A. End the programm.

Val ->`);

  const val = prompt();

  switch ( val.trim().toUpperCase() ) {
    case "1":
      musiciansList.addMusicianToList( prompt( "What is the name of the new musician? -> " ) );
      break;
    case "2":
      removeMusician();
      break;
    case "3":
      musiciansList.addBandToList( prompt( "What is the name of the band you want to add? -> " ) );
      break;
    case "4":
      musiciansList.removeBandFromList( prompt( "What is the name of the band you want to remove? -> " ) )
      break;
    case "5":
      musiciansList.printMusicianInfo( prompt( "...? -> " ) );
      break;
    case "6":
      checkMusicians();
      break;
    case "7":
      bandsList.addBandToList( prompt( "What the new band called? -> " ) );
      break;
    case "8":
      removeBand();
      break;
    case "9":
      bandsList.addMusicianToList( prompt( "What is the name of the musician you want to add? -> " ) );
      break;
    case "10":
      bandsList.removeMusicianFromList( prompt( "What is the name of the musician you want to remove? -> " ) )
      break;
    case "11":
      bandsList.printBandInfo( prompt( "...? -> " ) );
      break;
    case "12":
      checkBands();
      break;
    case "A":
      console.log( "The program ends!" );
      run = false;
      break;

    default:
      console.log( "Du måste välja mellan 1 - 4 eller A!" );
  }
}

function removeMusician () {
  musiciansList.printMusicians(); // Skriver ut listan på alla hundar med index i början.
  const val = prompt( "Enter the index for the musician you want to remove ->" );

  if ( Number( val ).toString() === "NaN" ) { // Kollar så att val går att parsa till ett nummer.
    console.log( "You must enter a number!" );
  }
  if ( val <= hundLista.getLength() && val >= 1 ) {
    musiciansList.removeMusicianFromList( Number( val ) - 1 ); // Tar det inskrivna valet och minskar med 1. (för arrays index börjar på 0)
  } else {
    console.log( `The number must be between 1 and ${ musiciansList.getLength() }` );
  }
}

function checkMusicians () {
  let run = true;
  while ( run ) {
    musiciansList.printMusiciansWithCheckIn(); // Skriver ut listan på alla musiker med index i början.
    console.log( "Enter B. to go back" );
    const val = prompt( "Enter the index for the musician you want to check in/out ->" );

    if ( val.trim().toUpperCase() === "B" ) { // Om användaren skrivit in B ska vi avsluta loopen och gå tillbaka till huvudmenyn. 
      run = false;
    } else if ( Number( val ).toString() === "NaN" ) { // Kollar så att val går att parsa till ett nummer.
      console.log( "You must enter a number!" );
    }
    if ( val <= musiciansList.getLength() && val >= 1 ) {
      musiciansList.checkInMusician( Number( val ) - 1 ); // Tar det inskrivna valet och minskar med 1. (för arrays index börjar på 0)
    } else {
      console.log( `The number should be between 1 to ${ musiciansList.getLength() }` );
    }
  }
}
