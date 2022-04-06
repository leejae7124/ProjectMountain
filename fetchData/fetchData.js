const axios = require('axios')
const key = require('../ProjectMountain/config/ServiceKey')
const url = require('../ProjectMountain/config/url')
var parser = require('xml2json');
var xml2js = require('xml2js');
var parser = new xml2js.Parser();

const fetchData = async() => {
    try{
        return axios.get(url.mountainURI, {
            params: {
                ServiceKey: key.ServiceKey,
                searchWrd: ('북한산'),
            }
        })
    }catch(error){
        console.log(error)
    }
}
module.exports = fetchData