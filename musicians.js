import fs from "fs";
import Musician from "./musician.js";

export default class Musicians {
  musiciansList = []; // Lista som håller alla musiker-objekt.

  constructor () {
    this.fetchMusicianData();
  }

  get musiciansList () {
    return this.musiciansList;
  }

  // Läser in alla musiker från "musicians.json". 
  fetchMusicianData () {
    const jsonString = fs.readFileSync( "musicians.json" );
    const data = JSON.parse( jsonString );

    // Populerar #musiciansList med musiker-objekt, då kommer vi få tillgång till alla metoder i Musician-klassen.
    for ( let i = 0; i < data.length; i++ ) {
      this.musiciansList.push( new Musician( data[ i ].name, data[ i ].infoMusician, data[ i ].yearOfBirth, data[ i ].currentBands, data[ i ].previuosBands, data[ i ].instruments ) );
    }
  }

  //Skriver ut index och musician-objektens namn 
  printMusicians () {
    for ( let i = 0; i < this.musiciansList.length; i++ ) {
      console.log( `${ i + 1 }. ${ this.musiciansList[ i ].name }` );
    }
  }

  getAge ( yearOfBirth ) {
    age = new Date().getFullYear() - yearOfBirth
  }

  printInfoMusician ( i ) {
    console.log( `${ i + 1 }.
    name: ${ this.musiciansList[ i ].name },
    info: ${ this.musiciansList[ i ].infoMusician }, 
    year of birth:  ${ this.musiciansList[ i ].yearOfBirth },
    current bands: ${ this.musiciansList[ i ].currentBands },
    previous bands: ${ this.musiciansList[ i ].previuosBands },
    instruments: ${ this.musiciansList[ i ].instruments }` );
  }

  addMusicianToList ( name, infoMusician, yearOfBirth, currentBands, previousBands, instruments ) {
    this.musiciansList.push( new Musician( name, infoMusician, yearOfBirth, currentBands, previousBands, instruments ) ); // Lägger till en ny musiker i #musiciansList.
    this.updateJsonFile(); // Uppdaterar "musicians.json".
  }

  removeMusicianFromList ( index ) {
    this.musiciansList.splice( index, 1 ); // Tar bort en musiker ifrån #musiciansList.
    this.updateJsonFile(); // Uppdaterar "musicians.json".
  }

  updateJsonFile () {
    let tempList = []; // Skapar en temporär lista som ska sparas i "musicians.json".

    for ( let i = 0; i < this.musiciansList.length; i++ ) {
      // Använder dataInfo som ger mig ett nytt objekt med alla musiker-objektet egenskaps information.
      // Om vi sparar musiker-objektet direkt, kommer inte informationen från privata egenskaper med.
      tempList.push( this.musiciansList[ i ].dataInfo() );
    }

    fs.writeFileSync( './musicians.json', JSON.stringify( tempList, null, 2 ), ( err ) => {
      if ( err ) throw err;
      console.log( 'Data written to file' );
    } );
  }

  getLength () {
    return this.musiciansList.length;
  }
} 
