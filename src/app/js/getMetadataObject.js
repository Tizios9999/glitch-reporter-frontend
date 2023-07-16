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
