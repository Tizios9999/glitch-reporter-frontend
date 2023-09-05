/**

Function that receives a String returns it capitalized.

*/

function capitalizeString(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default capitalizeString;
