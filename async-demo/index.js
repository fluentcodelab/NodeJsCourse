console.log('Before');

// getUser(1, (user) => {
//     console.log('User', user);
//     getRepositories(user.username, (repos) => {
//         console.log('Repos', repos);
//     })
// });

getUser(1)
    .then(user => getRepositories(user.username))
    .then(repos => console.log('Repos', repos))
    .catch(error => console.log('Error', error.message));

console.log('After');

function getUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Reading a user from a database...');
            resolve({id: id, username: 'Axelle'});
        }, 2000);
    });
}

function getRepositories(username) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log('Calling GitHub API...');
            resolve(['repo1', 'repo2', 'repo3'])
        }, 2000);
    });
}