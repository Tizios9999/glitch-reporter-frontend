/**

This function extracts a single object from a property collection from the 
metadata property inside the application state.

This is used to fetch all the remaining data (used for rendering etc) 
about a specific metadata item knowing only its id.

Parameters:
- propertyName: the name of the metadata property collection
- id: the id of the item
- the metadata property from the application state.

*/

export default function getMetadataObject(propertyName, id, metadata) {
  if (
    !metadata ||
    !metadata[propertyName] ||
    !Array.isArray(metadata[propertyName])
  ) {
    return null;
  }

  return metadata[propertyName].find((obj) => obj.id == id) || null;
}
