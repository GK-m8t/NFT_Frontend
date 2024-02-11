export function findKeyByValue(jsonObj, targetValue) {
    for (const key in jsonObj) {
      if (jsonObj[key] === targetValue) {
        return key; // Return the key if the value matches
      }
    }
    return null; // Return null if the value is not found
  }
  