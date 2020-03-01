function fetchWithAuth(input, init) {
    if (!init) {
        init = {}
    }
    if (!init.headers) {
        init.headers = {}
    }
    init.headers['Authorization'] = 'Token ' + localStorage.getItem('token');
    return fetch(input, init);
}

export default fetchWithAuth;
