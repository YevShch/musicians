import fs from "fs";
import Musician from "./musician.js";

export default class Musicians {
  #musiciansList = []; // Lista som håller alla musiker-objekt.

  constructor () {
    this.#fetchMusicianData();
  }

  get musiciansList () {
    return this.#musiciansList;
  }

  // Läser in alla musiker från "musicians.json". 
  #fetchMusicianData () {
    const jsonString = fs.readFileSync( "musicians.json" );
    const data = JSON.parse( jsonString );

    // Populerar #musiciansList med musiker-objekt, då kommer vi få tillgång till alla metoder i Musician-klassen.
    for ( let i = 0; i < data.length; i++ ) {
      this.#musiciansList.push( new Musician( data[ i ].name, data[ i ].checkedIn, data[ i ].infoMusician, data[ i ].yearOfBirth, data[ i ].currentBands, data[ i ].previuosBands, data[ i ].instruments ) );
    }
  }

  //Skriver ut index och musician-objektens namn 
  printMusicians () {
    for ( let i = 0; i < this.#musiciansList.length; i++ ) {
      console.log( `${ i + 1 }. ${ this.#musiciansList[ i ].name }` );
    }
  }

  //Skriver ut index, musiker-objektens namn och ifall dem är incheckade eller inte  , yearOfBirth, currentBands, previousBands, instruments
  skrivUtMusiciansWithCheckIn () {
    for ( let i = 0; i < this.#musiciansList.length; i++ ) {
      console.log( `${ i + 1 }. ${ this.#musiciansList[ i ].name } -> ${ this.#musiciansList[ i ].checkedIn } -> ${ this.#musiciansList[ i ].infoMusician } -> ${ this.#musiciansList[ i ].yearOfBirth } -> ${ this.#musiciansList[ i ].currentBands } -> ${ this.#musiciansList[ i ].previuosBands } -> ${ this.#musiciansList[ i ].instruments }` );
    }
  }


  addMusicianToList ( name ) {
    this.#musiciansList.push( new Musician( name ) ); // Lägger till en ny musiker i #musiciansList.
    this.#updateJsonFile(); // Uppdaterar "musicians.json".
  }

  removeMusicianFromList ( index ) {
    this.#musiciansList.splice( index, 1 ); // Tar bort en musiker ifrån #musiciansList.
    this.#updateJsonFile(); // Uppdaterar "musicians.json".
  }

  #updateJsonFile () {
    let tempList = []; // Skapar en temporär lista som ska sparas i "musicians.json".

    for ( let i = 0; i < this.#musiciansList.length; i++ ) {
      // Använder dataInfo som ger mig ett nytt objekt med alla musiker-objektet egenskaps information.
      // Om vi sparar musiker-objektet direkt, kommer inte informationen från privata egenskaper med.
      tempList.push( this.#musiciansList[ i ].dataInfo() );
    }

    fs.writeFileSync( './musicians.json', JSON.stringify( tempList, null, 2 ), ( err ) => {
      if ( err ) throw err;
      console.log( 'Data written to file' );
    } );
  }

  checkInMusician ( index ) {
    this.#musiciansList[ index ].checkInAndOut(); // Ändrar så en musiker blir incheckad eller checkar ut.  
    this.#updateJsonFile();
  }

  getLength () {
    return this.#musiciansList.length;
  }
} 
