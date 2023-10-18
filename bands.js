import fs from "fs";
import Bands from "./band.js";

export default class Bands {
  #bandsList = []; // Lista som håller alla band-objekt.

  constructor () {
    this.#fetchBandData();
  }

  get bandsList () {
    return this.#bandsList;
  }

  // Läser in alla band från "bands.json". 
  #fetchBandData () {
    const jsonString = fs.readFileSync( "bands.json" );
    const data = JSON.parse( jsonString );

    // Populerar #bandsList med band-objekt, då kommer vi få tillgång till alla metoder i Band-klassen.
    for ( let i = 0; i < data.length; i++ ) {
      this.#bandsList.push( new Band( data[ i ].nameBand, data[ i ].checkedInBand ) );
    }
  }

  //Skriver ut index och band-objektens namn 
  printBands () {
    for ( let i = 0; i < this.#bandsList.length; i++ ) {
      console.log( `${ i + 1 }. ${ this.#bandsList[ i ].nameBand }` );
    }
  }

  //Skriver ut index, band-objektens namn och ifall dem är incheckade eller inte
  printBandsWithCheckIn () {
    for ( let i = 0; i < this.#bandsList.length; i++ ) {
      console.log( `${ i + 1 }. ${ this.#bandsList[ i ].nameBand } -> ${ this.#bandsList[ i ].checkedInBand }` );
    }
  }


  addBandToList ( nameBand ) {
    this.#bandsList.push( new Band( nameBand ) ); // Lägger till en ny band i #bandsList.
    this.#updateJsonFile(); // Uppdaterar "bands.json".
  }

  removeBandFromList ( index ) {
    this.#bandsList.splice( index, 1 ); // Tar bort en band ifrån #bandsList.
    this.#updateJsonFile(); // Uppdaterar "bands.json".
  }

  #updateJsonFile () {
    let tempList = []; // Skapar en temporär lista som ska sparas i "musicians.json".

    for ( let i = 0; i < this.#bandsList.length; i++ ) {
      // Använder dataInfo som ger mig ett nytt objekt med alla band-objektet egenskaps information.
      // Om vi sparar band-objektet direkt, kommer inte informationen från privata egenskaper med.
      tempList.push( this.#bandsList[ i ].dataInfo() );
    }

    fs.writeFileSync( './bands.json', JSON.stringify( tempList, null, 2 ), ( err ) => {
      if ( err ) throw err;
      console.log( 'Data written to file' );
    } );
  }

  checkInBand ( index ) {
    this.#bandsList[ index ].checkInAndOutBand(); // Ändrar så ett band blir incheckad eller checkar ut.  
    this.#updateJsonFile();
  }

  getLength () {
    return this.#bandsList.length;
  }
} 
