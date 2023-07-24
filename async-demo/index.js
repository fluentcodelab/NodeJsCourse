console.log('Before');
const user = getUser(1);
console.log('After');

// Callbacks
// Promises
// Async/Await

function getUser(id) {
    setTimeout(() => {
        console.log('Reading a user from a database...');
        return {id: id, username: 'Axelle'};
    }, 2000);

    return 1;
}