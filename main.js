import fs from "fs";
import PromptSync from "prompt-sync";
import Band from "./band.js";
import Musicians from "./musicians.js";

const prompt = PromptSync( { sigint: true } );
const bandsList = JSON.parse( fs.readFileSync( "bands.json" ) );

let run = true;
while ( run ) {
  console.log( `Meny

. Skapa en ny band
. Skriv ut alla band
. Redigera en band
Q. Avsluta programmet
`);
  const choice = prompt( "-> " ).trim().toUpperCase();

  switch ( choice ) {
    case "1":
      createOrEditBand();
      break;

    case "2":
      console.clear();
      if ( bandsList.length > 0 ) {
        printAllBands();
      } else {
        console.log( "Finns inga band i listan" );
      }
      break;

    case "3":
      if ( bandsList.length > 0 ) {
        editMenu();
      } else {
        console.log( "Finns inga band i listan" );
      }
      break;

    case "Q":
      run = false;
      break;
    default:
      console.log( "Du måste välja mellan 1 - 3 eller Q.\n" );
      break;
  }
}

function printAllBands () {
  for ( let i = 0; i < bandsList.length; i++ ) {
    console.log( `
     ${ i + 1 }.
  name: ${ bandsList[ i ].nameBand }
       info about the band: ${ bandsList[ i ].infoBand }
       date of creation: ${ bandsList[ i ].yearOfCreation }
       date of breakup: ${ bandsList[ i ].yearOfBreakup }
       list of current members: ${ bandsList[ i ].currentMembersList }
       list of previous members:  ${ bandsList[ i ].previousMembersList }` );
  }
}

function createOrEditBand ( index = -1 ) {
  let nameBand = "";
  let infoBand = "";
  let yearOfCreation = "";
  let yearOfBreakup = "";
  let currentMembers = [];
  let previousMembers = [];
  let menuText = "Meny - Create a band";

  if ( index >= 0 ) {
    menuText = "Meny - Edit band";
    nameBand = bandsList[ index ].nameBand;
    infoBand = bandsList[ index ].infoBand;
    yearOfCreation = bandsList[ index ].yearOfCreation;
    yearOfBreakup = bandsList[ index ].yearOfBreakup;
    currentMembers = bandsList[ index ].currentMembers;
    previousMembers = bandsList[ index ].previousMembers;
  }

  let run = true;
  while ( run ) {
    console.log( `${ menuText }

1. Name   -> ${ nameBand }
2. Information -> ${ infoBand }
3. Year of creation    -> ${ yearOfCreation }
4. Year of breakup   -> ${ yearOfBreakup }
5. Current members   -> ${ currentMembers }
6. Previous members  -> ${ previousMembers }

S. Save
B. Go back to the meny
  `);

    const choice = prompt().trim().toUpperCase()

    switch ( choice ) {
      case "1":
        nameBand = prompt( "Name -> " );
        break;

      case "2":
        infoBand = prompt( "Information -> " );
        break;

      case "3":
        yearOfCreation = prompt( "Year of creation -> " );
        break;

      case "4":
        yearOfBreakup = prompt( "Year of breakup -> " );
        break;

      case "5":
        currentMembers = pickMusicians();
        break;

      case "6":
        previousMembers = pickMusicians();
        break;

      case "S":
        if ( index >= 0 ) {
          bandsList[ index ].nameBand = nameBand;
          bandsList[ index ].infoBand = infoBand;
          bandsLis[ index ].yearOfCreation = yearOfCreation;
          bandsLis[ index ].yearOfBreakup = yearOfBreakup;
          bandsLis[ index ].currentMembers = currentMembers;
          bandsLis[ index ].previousMembers = previousMembers;
        } else {
          bandsList.push( new Band( nameBand, infoBand, yearOfCreation, yearOfBreakup, currentMembers, previousMembers ) );
        }
        updateFile();
        run = false;
        break;

      case "B":
        run = false;
        break;
      default:
        console.clear();
        console.log( "You must choose between 1 - 6, S or B" );
        break;
    }
  }
}
function pickMusicians ( bandsMembers = [] ) {
  let musicians;

  if ( bandsMembers.length > 0 ) {
    musicians = new Musicians( bandsMembers );
  } else {
    musicians = new Musicians();
  }

  console.log( "Before - ", musicians.list );
  let run = true;
  while ( run ) {
    if ( bandsMembers.length > 0 ) {
      console.log( "Meny - Edit band/Musician" );
    } else {
      console.log( "Meny - Create band/musician" );
    }
    musicians.printList();
    console.log( `
L. Add a new musician
B. Go back
`);
    const choice = prompt( "-> " ).trim().toUpperCase()

    if ( choice === "L" ) {
      console.log( "Write the name for the new musician." );
      musicians.addMusicianToList( prompt( "Name -> " ) )

    } else if ( choice === "B" ) {
      run = false;
    } else if ( Number( choice ) !== NaN ) {
      if ( Number( choice ) > musicians.listLength() ) {
        console.log( `There is no musician with index ${ Number( choice ) }` )
      } else {
        musicians.pickMusician( Number( choice ) - 1 );
      }
    } else {
      if ( musicians.listLength() === 0 ) {
        console.log( "You must choose between L or B" );
      } else if ( musicians.listLength() === 1 ) {
        console.log( "You must choose between 1, L or B" );
      } else {
        console.log( `You must choose between 1 - ${ musicians.listLength() }, L or B.` );
      }
    }
  }
  console.log( "After - ", musicians.list );
  return musicians.listOfPickedMusicians();
}

function editMenu () {
  let run = true;
  while ( run ) {
    console.log( "Meny - Edit the band" );
    printAllBands()
    console.log( `
B. Go back
`);
    const choice = prompt( "-> " ).trim().toUpperCase();

    if ( choice === "B" ) {
      run = false;
    } else if ( Number( choice ) !== NaN ) {
      if ( Number( choice ) > bandsList.length ) {
        console.log( `There is no bands with index ${ Number( choice ) }` )
      } else {
        createOrEditBand( Number( choice ) - 1 );
      }
    } else {
      if ( bandsList.length === 1 ) {
        console.log( "You must choose between 1 or B" );
      } else {
        console.log( `"You must choose between 1 - ${ bandsList.length } or B.` );
      }
    }
  }
}

function updateFile () {
  fs.writeFileSync( "bands.json", JSON.stringify( bandsList, null, 2 ) )
}
