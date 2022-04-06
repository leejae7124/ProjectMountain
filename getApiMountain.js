process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
var request = require('request');

const express = require('express')
const app = express()
const port = 5000

var url = 'http://apis.data.go.kr/1400000/service/cultureInfoService/mntInfoOpenAPI';
var queryParams = '?' + encodeURIComponent('serviceKey') + '=ApRVNc07DTbnR3THN3mKXiQ7bUdMoEWopO1aAqQYS%2BdL7i%2FslCo0aT2gu29DHZ%2FIGPMR9%2FZqQ5ty2KmNRPe1zA%3D%3D';
queryParams += '&' + encodeURIComponent('searchWrd') + '=' + encodeURIComponent('설악산'); //산 이름으로 검색

var requestUrl = url + queryParams;
const convert = require('xml-js');

request.get(requestUrl, (err,res,body) =>{
    if(err){
        console.log(`err => ${err}`)
    }
    else {
        if(res.statusCode == 200){
            var result = body
            //console.log(`body data => ${result}`)
            var xmlToJson = convert.xml2json(result, {compact: true, spaces: 4});
            console.log(`xml to json => ${xmlToJson}`)

        }

    }
})
