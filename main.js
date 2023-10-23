import PromptSync from "prompt-sync";
import Musicians from "./musicians.js";
import Bands from "./bands.js";

const prompt = PromptSync( { sigint: true } );
const musiciansList = new Musicians();
const bandsList = new Bands();


let run = true;
while ( run ) {
  console.log( `
Meny

1. Create a new musician.
2. Remove a musician.
3. Add a new band to a musician.
4. Remove a band from a musician.
5. Display information about a musician.
6. Create a new band.
7. Remove a band from the list of bands.
8. Add a musician to a band.
9. Remove a musician from a band.
10. Display information about a band.

A. End the programm.

Val ->`);

  const val = prompt();

  switch ( val.trim().toUpperCase() ) {
    case "1":
      createMusician();
      break;
    case "2":
      removeMusician();
      break;
    case "3":
      musiciansList.addBandToList( prompt( "What is the name of the band do you want to add? -> " ) );
      break;
    case "4":
      musiciansList.removeBandFromList( prompt( "What is the name of the band do you want to remove? -> " ) )
      break;
    case "5":
      displayInfoMusician();
      break;
    case "6":
      createBand();
      break;
    case "7":
      removeBand();
      break;
    case "8":
      bandsList.addMusicianToList( prompt( "What is the name of the musician do you want to add? -> " ) );
      break;
    case "9":
      bandsList.removeMusicianFromList( prompt( "What is the name of the musician do you want to remove? -> " ) )
      break;
    case "10":
      displayInfoBand();
      break;
    case "A":
      console.log( "The program ends!" );
      run = false;
      break;

    default:
      console.log( "You must enter between 1 - 10 or A!" );
  }
}

function createMusician () {
  musiciansList.addMusicianToList(
    prompt( "What is the name of the new musician? -> " ),
    prompt( "Enter info abot the musician: " ),
    prompt( "What year was the musician born? -> " ),
    prompt( "The musician's current band -> " ),
    prompt( "The musician's previous bands -> " ),
    prompt( "What instruments does the musician play? -> " ) );
}

function createBand () {
  bandsList.addBandToList(
    prompt( "What the new band called? -> " ),
    prompt( "Enter info abot the band: " ),
    prompt( "What year was the band created? -> " ),
    prompt( "Year the band dissolved for bands that no longer exist -> " ),
    addMusicianToCurrentMembersList(),
    prompt( "Enter previous band's members -> " ) )
}

function addMusicianToCurrentMembersList () {
  let run = true;
  while ( run ) {
    console.log( `The list of all musicians: ` );
    musiciansList.printMusicians();
    console.log( `
    R. Choose the musician from the list of musicians
    S. Create a new musician if he/she is not in the list
    Q. Finish the adding of musicians
    Val:  `);

    const val = prompt();

    switch ( val.trim().toUpperCase() ) {
      case "R":
        prompt( "Enter the index for the musician do you want to add ->" );
        break;
      case "S":
        prompt( createMusician() );
        break;

      case "Q":
        console.log( "The list of current members is ready" );
        run = false;
        break;

      default:
        console.log( "You must enter between 1, 2 or Q!" );
    }
  }
}


function removeMusician () {
  musiciansList.printMusicians(); // Skriver ut listan på alla musiker med index i början.
  const val = prompt( "Enter the index for the musician do you want to remove ->" );

  if ( Number( val ).toString() === "NaN" ) { // Kollar så att val går att parsa till ett nummer.
    console.log( "You must enter a number!" );
  }
  if ( val <= musiciansList.getLength() && val >= 1 ) {
    musiciansList.removeMusicianFromList( Number( val ) - 1 ); // Tar det inskrivna valet och minskar med 1. (för arrays index börjar på 0)
  } else {
    console.log( `The number must be between 1 and ${ musiciansList.getLength() }` );
  }
}

function removeBand () {
  bandsList.printBands(); // Skriver ut listan på alla band med index i början.
  const val = prompt( "Enter the index for the band do you want to remove ->" );

  if ( Number( val ).toString() === "NaN" ) { // Kollar så att val går att parsa till ett nummer.
    console.log( "You must enter a number!" );
  }
  if ( val <= bandsList.getLength() && val >= 1 ) {
    bandsList.removeBandFromList( Number( val ) - 1 ); // Tar det inskrivna valet och minskar med 1. (för arrays index börjar på 0)
  } else {
    console.log( `The number must be between 1 and ${ musiciansList.getLength() }` );
  }
}

function displayInfoMusician () {
  musiciansList.printMusicians(); // Skriver ut listan på alla musiker med index i början.
  const val = prompt( "Enter the index for the musician do you want to get information ->" );

  if ( Number( val ).toString() === "NaN" ) { // Kollar så att val går att parsa till ett nummer.
    console.log( "You must enter a number!" );
  }
  if ( val <= musiciansList.getLength() && val >= 1 ) {
    musiciansList.printInfoMusician( Number( val ) - 1 ); // Tar det inskrivna valet och minskar med 1. (för arrays index börjar på 0)
  } else {
    console.log( `The number must be between 1 and ${ musiciansList.getLength() }` );
  }
}

function displayInfoBand () {
  bandsList.printBands(); // Skriver ut listan på alla musiker med index i början.
  const val = prompt( "Enter the index for the band you want to get information ->" );

  if ( Number( val ).toString() === "NaN" ) { // Kollar så att val går att parsa till ett nummer.
    console.log( "You must enter a number!" );
  }
  if ( val <= bandsList.getLength() && val >= 1 ) {
    bandsList.printInfoBand( Number( val ) - 1 ); // Tar det inskrivna valet och minskar med 1. (för arrays index börjar på 0)
  } else {
    console.log( `The number must be between 1 and ${ musiciansList.getLength() }` );
  }
}

