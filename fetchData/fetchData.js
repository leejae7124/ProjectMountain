const axios = require('axios')
const key = require('../config/servicekey')
const url = require('../config/url')

async function fetchData(hght, araCd, ssnCd, thmCd) {
            try{
                    return axios.get(url.mountainURI, {
                        params: {
                            ServiceKey: key.ServiceKey,
                            //mntnNm: 
                            mntnHght: hght,
                            mntnInfoAraCd: araCd,
                            mntnInfoSsnCd: ssnCd,
                            mntnInfoThmCd: thmCd
                        }
                    })
            }catch(error){
                console.log(error)
            }
} 

module.exports = fetchData
