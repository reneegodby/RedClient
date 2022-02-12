let APIURL = '';

switch (window.location.hostname) {
    case 'localhost' || '127.0.0.1':
        APIURL = 'http://localhost:5001';
        break;
    case 'rmg-bakerhelper.herokuapp.com':
        APIURL = 'https://rg-bakerhelper.herokuapp.com'
}

export default APIURL;