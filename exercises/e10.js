export const getFirstResolvedPromise = (promises) => {
  //*  write code to pass test ⬇ ️
  const wrapped = promises.map(p => 
    p.then(res => res).catch(() => new Promise(() => {}))
  );
  return Promise.race(wrapped);
};

export const getFirstPromiseOrFail = (promises) => {
  return new Promise((resolve, reject) => {
    let settled = false;
    let rejectedCount = 0;

    promises.forEach(p => {
      Promise.resolve(p)
        .then(val => {
          if (!settled) {
            settled = true;
            resolve(val);
          }
        })
        .catch((error) => {
          if(!settled) {
            settled = true
            reject(error)
            
          }
          
          else { 
           if (rejectedCount === promises.length && !settled) {
            rejectedCount ++
            reject("All promises were rejected");
           }
            
          }
        });
    });
  });
};



export const getQuantityOfRejectedPromises = (promises) => {
  //*  write code to pass test ⬇ ️
  return Promise.allSettled(promises).then((results) => {
    const rejectedCount = results.filter (
      (result) => result.status === "rejected"
    ).length
    return rejectedCount
  })
};

export const getQuantityOfFulfilledPromises = (promises) => {
  //*  write code to pass test ⬇ ️
  return Promise.allSettled(promises).then((results) => {
    const resolvedCount = results.filter (
      (result) => result.status === "fulfilled"
    ).length
    return resolvedCount
  })
};

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Array ⬇ ⬇ ⬇ ⬇
export const allCharacters = [
  { id: 1, name: "billy" },
  { id: 2, name: "mandy" },
  { id: 3, name: "grim" },
];
//! ⬆  ⬆  ⬆  ⬆ do not edit this array   ⬆  ⬆  ⬆  ⬆ ️

//!  ⬇ ⬇ ⬇ ⬇ Don't Edit This Function ⬇ ⬇ ⬇ ⬇
export const fetchCharacterById = (id) => {
  // This function simulates an API, although most api's will return
  // simple data like this quickly, we want you to practice concurrent programming
  // so we're forcing each call to take one second

  const validIds = allCharacters.map((character) => character.id);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (!validIds.includes(id))
        reject(`we do not have a character with the id of ${id}`);

      return resolve(allCharacters.find((character) => character.id === id));
    }, 1000);
  });
};
//! ⬆  ⬆  ⬆  ⬆ do not edit this function   ⬆  ⬆  ⬆  ⬆ ️

export const fetchAllCharactersByIds = async (ids) => {
  // To solve this you must fetch all characters passed in the array at the same time
  // use the `fetchCharacterById` function above to make this work
  //*  write code to pass test ⬇ ️
  const promises = ids.map((id) => fetchCharacterById(id));
  return Promise.allSettled(promises).then((results) => {
    const anyRejected = results.some((res) => res.status === "rejected");
    if (anyRejected) {
      return [];
    }
    return results.map((res) => res.value);
  });
};
