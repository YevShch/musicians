import fs from "fs";
import PromptSync from "prompt-sync";
import Band from "./band.js";
import Musicians from "./bands.js";
import Musician from "./bands.js";

const prompt = PromptSync( { sigint: true } );
const bandsList = JSON.parse( fs.readFileSync( "bands1.json" ) );
const musiciansList = JSON.parse( fs.readFileSync( "musicians1.json" ) );

let run = true;
while ( run ) {
  console.log( `Meny

1. Create a new band
2. Print list of bands
3. Edit a band
4. Create a new musician
5. Print all musicians
6. Print all infoo about bands.
7. Remove a musician
8. Remove a band.
Q. Avsluta programmet
`);
  const choice = prompt( "-> " ).trim().toUpperCase();

  switch ( choice ) {
    case "1":
      createOrEditBand();
      break;

    case "2":
      if ( bandsList.length > 0 ) {
        printAllBands();
      } else {
        console.log( "There is no bands in the list" );
      }
      break;

    case "3":
      if ( bandsList.length > 0 ) {
        editBandMenu();
      } else {
        console.log( "There is no bands in the list" );
      }
      break;

    case "4":
      createOrEditMusician();
      break;

    case "5":
      if ( musiciansList.length > 0 ) {
        printAllMusicians();
      } else {
        console.log( "There is no musicians in the list" );
      }
      break;

    case "6":
      console.log( bandsList );
      break;

    case "7":
      removeMusician();
      break;

    case "8":
      removeBand();
      break;

    case "Q":
      run = false;
      break;
    default:
      console.log( "Du måste välja mellan 1 - 3 eller Q." );
      break;
  }
}

function removeMusician ( index ) {
  if ( musiciansList.length > 0 ) {
    printAllMusicians();
    index = prompt( "Enter index of the musician you want to remove: " )
    musiciansList.splice( index, 1 );
    updateMusFile();
  } else {
    console.log( "There is no musicians in the list" );
  }
}

function removeBand ( index ) {
  if ( bandsList.length > 0 ) {
    // console.log( bandsList );
    printAllBands();
    index = prompt( "Enter index of the band you want to remove: " )
    bandsList.splice( index, 1 );
    updateFile();
  } else {
    console.log( "There are no bands in the list." );
  }
}
// function printAllBands () {
//   for ( let i = 0; i < bandsList.length; i++ ) {
//     console.log( `
//      ${ i + 1 }. name: ${ bandsList[ i ].nameBand }
//        info about the band: ${ bandsList[ i ].infoBand }
//        date of creation: ${ bandsList[ i ].yearOfCreation }
//        date of breakup: ${ bandsList[ i ].yearOfBreakup }
//        list of current members:${ [bandsList[ i ].currentMembersList] }
//        list of previous members:  ${ bandsList[ i ].previousMembersList } *
//       ` );
//   }
// }

function printAllBands () {
  for ( let i = 0; i < bandsList.length; i++ ) {
    console.log( `
       ${ i + 1 }. name: ${ bandsList[ i ].nameBand } ` );
  }
}

function printAllMusicians () {
  for ( let i = 0; i < musiciansList.length; i++ ) {
    console.log( `
     ${ i + 1 }.
       name: ${ musiciansList[ i ].name }
       info: ${ musiciansList[ i ].info }
       date of birth: ${ musiciansList[ i ].dateOfBirth }
       current bands: ${ musiciansList[ i ].currentBands }
       previous bands: ${ musiciansList[ i ].previousBands }
       instruments:  ${ musiciansList[ i ].instruments }` );
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
          bandsList[ index ].yearOfCreation = yearOfCreation;
          bandsList[ index ].yearOfBreakup = yearOfBreakup;
          bandsList[ index ].currentMembers = currentMembers;
          bandsList[ index ].previousMembers = previousMembers;
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
  let members;

  if ( bandsMembers.length > 0 ) {
    members = new Musicians( bandsMembers );
  } else {
    members = new Musicians();
  }

  // console.log( "Before - ", currentMembers.list );
  let run = true;
  while ( run ) {
    if ( bandsMembers.length > 0 ) {
      console.log( "Meny - Edit band/Musician" );
    } else {
      console.log( "Meny - Create musician" );
    }
    members.printList();
    console.log( `
L. Add a new musician
B. Go back
`);
    const choice = prompt( "-> " ).trim().toUpperCase()

    if ( choice === "L" ) {
      createOrEditMusician();
      // console.log( "Write the name for the new musician." );
      // currentMembers.addMusicianToList( prompt( "Name -> " ).trim() )

    } else if ( choice === "B" ) {
      run = false;
    } else if ( Number( choice ) !== NaN ) {
      if ( Number( choice ) > members.listLength() ) {
        console.log( `There is no musician with index ${ Number( choice ) }` )
      } else {
        members.pickMusician( Number( choice ) - 1 );
      }
    } else {
      if ( members.listLength() === 0 ) {
        console.log( "You must choose between L or B" );
      } else if ( members.listLength() === 1 ) {
        console.log( "You must choose between 1, L or B" );
      } else {
        console.log( `You must choose between 1 - ${ members.listLength() }, L or B.` );
      }
    }
  }
  console.log( "After - ", members.list );
  return members.listOfPickedMusicians();
}


function pickBands ( bandsList = [] ) {
  let bands;

  if ( bandsList.length > 0 ) {
    bands = new Band( bandsList );
  } else {
    bands = new Band();
  }

  console.log( "Before - ", bands.list );
  let run = true;
  while ( run ) {
    if ( bandsList.length > 0 ) {
      console.log( "Meny - Edit band/Musician" );
    } else {
      console.log( "Meny - Create band" );
    }
    printAllBands();
    console.log( `
L. Add a new band
B. Go back
`);
    const choice = prompt( "-> " ).trim().toUpperCase()

    if ( choice === "L" ) {
      createOrEditMusician();
      // console.log( "Write the name for the new musician." );
      // currentMembers.addMusicianToList( prompt( "Name -> " ).trim() )

    } else if ( choice === "B" ) {
      run = false;
    } else if ( Number( choice ) !== NaN ) {
      if ( Number( choice ) > bandsList.length ) {
        console.log( `There is no band with index ${ Number( choice ) }` )
      } else {
        bands.pickBands( Number( choice ) - 1 );
      }
    } else {
      if ( bandsList.length === 0 ) {
        console.log( "You must choose between L or B" );
      } else if ( bandsList.length === 1 ) {
        console.log( "You must choose between 1, L or B" );
      } else {
        console.log( `You must choose between 1 - ${ bandsList.length }, L or B.` );
      }
    }
  }
  console.log( "After - ", bandsList );
  // return bands.listOfPickedBands();
  return bandsList;
}

function editBandMenu () {
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

function createOrEditMusician ( index = -1 ) {
  let name = "";
  let picked = false;
  let info = "";
  let dateOfBirth = "";
  let currentBands = [];
  let previousBands = [];
  let instruments = [];
  let pickedInstruments = false;

  let menuText = "Meny - Create a musician";

  if ( index >= 0 ) {
    menuText = "Meny - Edit band";
    name = musiciansList[ index ].name;
    picked = musiciansList[ index ].picked;
    info = musiciansList[ index ].info;
    dateOfBirth = musiciansList[ index ].dateOfBirth;
    currentBands = musiciansList[ index ].currentBands;
    previousBands = musiciansList[ index ].previousBands;
    instruments = musiciansList[ index ].instruments;
    pickedInstruments = musiciansList[ index ].pickedInstruments;
  }

  let run = true;
  while ( run ) {
    console.log( `${ menuText }

1. Name   -> ${ name }
2. Information -> ${ info }
3. Date of birth (yyyy-mm-dd)    -> ${ dateOfBirth }
4. Current bands   -> ${ currentBands }
5. Previous bands   -> ${ previousBands }
6. Instruments  -> ${ instruments }

S. Save
B. Go back to the meny
  `);

    const choice = prompt().trim().toUpperCase()

    switch ( choice ) {
      case "1":
        name = prompt( "Name -> " );
        break;

      case "2":
        info = prompt( "Information -> " );
        break;

      case "3":
        dateOfBirth = prompt( "Date of birth (yyyy-mm-dd) " );
        break;

      case "4":
        currentBands = pickBands();
        break;

      case "5":
        previousBands = pickBands();
        break;

      case "6":
        instruments = prompt( "Instruments -> " );
        break;

      case "S":
        if ( index >= 0 ) {
          musiciansList[ index ].name = name;
          musiciansList[ index ].picked = picked;
          musiciansList[ index ].info = info;
          musiciansList[ index ].dateOfBirth = dateOfBirth;
          musiciansList[ index ].currentBands = currentBands;
          musiciansList[ index ].previousBands = previousBands;
          musiciansList[ index ].instruments = instruments;
          musiciansList[ index ].pickedInstruments = pickedInstruments;
        } else {
          musiciansList.push( new Musician( name, picked, info, dateOfBirth, currentBands, previousBands, instruments, pickedInstruments ) );
        }
        updateMusFile();
        run = false;
        break;

      case "B":
        run = false;
        break;
      default:
        console.log( "You must choose between 1 - 6, S or B" );
        break;
    }
  }
}

function updateMusFile () {
  fs.writeFileSync( "musicians.json", JSON.stringify( musiciansList, null, 2 ) )
}

function updateFile () {
  fs.writeFileSync( "bands.json", JSON.stringify( bandsList, null, 2 ) )
}
