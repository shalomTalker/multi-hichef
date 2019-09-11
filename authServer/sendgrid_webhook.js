// A simple CLI tool for ensuring that a given script runs continuously (i.e. forever).

var localtunnel = require('localtunnel');
localtunnel(5000, {
    subdomain: 'shtal'
}, function (err, tunnel) {
    console.log('LT running')
});