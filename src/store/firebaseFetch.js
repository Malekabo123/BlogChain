import { collection, query, where, getDocs, doc } from "firebase/firestore";
import db from "./firebase";

export const firebaseFetch = async (
  collectionName,
  field,
  matchOperator,
  condition,
  isWholeCollection,
  dataIsArray,
  returnData,
  returnRef
) => {
  let refToReturn;
  let dataToReturn = dataIsArray ? [] : {};

  try {
    if (isWholeCollection) {
      //get the whole collection from firebase
      const collectionRef = collection(db, collectionName);
      const querySnapshot = await getDocs(collectionRef);

      querySnapshot.forEach((mydoc) => {
        dataToReturn.push(mydoc.data());
      });

      return { dataToReturn };
    } else {
      //get specific docs from a collection based on a condition,and get the ref if needed
      const q = query(
        collection(db, collectionName),
        where(field, matchOperator, condition)
      );
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((mydoc) => {
        returnData &&
          (dataIsArray
            ? dataToReturn.push(mydoc.data())
            : (dataToReturn = mydoc.data()));
        returnRef && (refToReturn = doc(db, collectionName, mydoc.id));
      });

      return { dataToReturn, refToReturn };
    }
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};
