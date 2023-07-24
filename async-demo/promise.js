const p = new Promise((resolve, reject) => {
    // states of a promise are: pending, fulfilled and rejected
    setTimeout(() => {
        // resolve(1);                  // pending => resolved, fulfilled
        reject(new Error('message'));   // pending => rejected
    }, 2000);
});

p
    .then(result => console.log('Result ', result))
    .catch(error => console.log('Error ', error));