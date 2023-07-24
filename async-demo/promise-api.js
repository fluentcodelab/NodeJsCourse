
// Resolving a promise can be useful for unit tests

// const p = Promise.resolve({id: 1});
// p.then(result => console.log(result));

const p = Promise.reject(new Error('Reason for rejection'));
p.catch(error => console.log(error));