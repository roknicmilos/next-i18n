interface MergeObject {
  [key: string]: any;
}

/**
 * Deep merge two objects, with the primary object taking precedence over the default object.
 */
export function deepMerge(defaultObj: MergeObject, primaryObj: MergeObject): MergeObject {
  if (Array.isArray(primaryObj) || typeof primaryObj !== "object" || primaryObj === null) {
    // If the primary object is not an object, return the primary object
    return primaryObj;
  }

  // Otherwise, merge the objects
  const mergedObj: MergeObject = {};

  for (const key in defaultObj) {
    if (key in primaryObj) {
      mergedObj[key] = deepMerge(defaultObj[key], primaryObj[key]);
    } else {
      mergedObj[key] = defaultObj[key];
    }
  }

  for (const key in primaryObj) {
    if (!(key in mergedObj)) {
      mergedObj[key] = primaryObj[key];
    }
  }

  return mergedObj;
}
