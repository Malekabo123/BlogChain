export function calculateObjectSize(obj) {
  let totalSize = 0;

  // Iterate through each key-value pair in the object
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // If the value is a string, add its length to totalSize
      if (typeof value === "string") {
        totalSize += value.length;
      }
      // If the value is an array, recursively calculate size of each element
      else if (Array.isArray(value)) {
        value.forEach((item) => {
          if (typeof item === "string") {
            totalSize += item.length;
          } else if (typeof item === "object" && item !== null) {
            totalSize += calculateObjectSize(item); // Recursively calculate for nested objects
          }
        });
      }
      // If the value is an object (excluding arrays and null)
      else if (typeof value === "object" && value !== null) {
        totalSize += calculateObjectSize(value); // Recursively calculate for nested objects
      }
    }
  }

  return totalSize;
}
