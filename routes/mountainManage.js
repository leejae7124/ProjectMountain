const express = require('express');
const mongoose = require('mongoose');
const { array } = require('mongoose/lib/utils');
const manager = express.Router();
const { mountain_list } = require("../model/li");
const { mountainBusan, mountainDaejeon, mountainSeoul, mountainDaegu, mountainIncheon, mountainGwangju, mountainUlsan, mountainGyeonggi, mountainGangwon, mountainChungcheongbuk, mountainChungcheongnam, mountainJeonbuk, mountainJeonnam, mountainGyeongbuk, mountainGyeongnam, mountainJeju } = require("../model/m");

let jsonArray = new Array(); //산 정보 담을 배열

function mInfo(m_info) { //keyword에 사용하는 함수
    //var jsonObj = new Object(); //특정 값만 넘기기 위해 객체 생성
    if(m_info != null) {
        // jsonObj.mntnid = m_info.mntnid; 
        // jsonObj.mntnnm = m_info.mntnnm;
        // jsonObj.mntninfopoflc = m_info.mntninfopoflc;

        jsonArray.push(m_info); //산 정보를 json 배열에 삽입
    }          
    //console.log(jsonArray[i]+i+"번째");

}

function mInfo2(m_info) { //search에 사용하는 함수

    for (let i = 0; i < Object.keys(m_info).length; i++) {
        jsonArray.push(m_info[i]); //현재 컬렉션에서 해당하는 정보들을 하나씩 배열에 담는다.
        console.log(m_info)
    }
    console.log(Object.keys(m_info).length);
}

function schemaUpdate(name, m_info) { // 키워드 배열을 생성한다. 디폴트값: ""
    mountainSeoul.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainBusan.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainDaegu.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainIncheon.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});

    mountainGwangju.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainDaejeon.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainUlsan.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainGyeonggi.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainGangwon.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainChungcheongbuk.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainChungcheongnam.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainJeonbuk.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainJeonnam.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainGyeongbuk.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainGyeongnam.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});
    mountainJeju.updateMany({}, {keyword: ""}, {multi: true}, function(err, numberAffected) {});

    //console.log('update')
}

manager.get('/schemaUpdate', (req, res) => {
    schemaUpdate();
    res.send('OK');
})

manager.post('/saveKeyword', (req, res) => {
        mInfo(m_info);
        m_info.keyword.push(req.body.name);
        m_info.save();
})



manager.post('/keyword', (req, res) => {

    mountain_list.findOne({ name: req.body.name}, (err, m_id) => { //받아온 이름으로 키워드를 찾고 id 리스트를 뽑는다.
        if (err) return res.status(500).send({error: 'failed'});
        //res.json(m_id.list);
        var length = m_id.list.length;
        
        for (let i = 0; i < length; i++) {
        
           // console.log(m_id.list[i])
          // console.log(req.body.name);
            

            mountainSeoul.findOne({ mntnid: m_id.list[i]}, (err, m_info) => { //리스트에서 뽑은 id가 서울에 있는지 확인
                if (err) return res.status(500).send({error: 'failed'});
               // console.log(m_id.list[i]);
                //console.log(m_info);
                //console.log(m_info.keyword);
                //schemaUpdate() //키워드 배열을 생성하기 위해 한번만 호출
                mInfo(m_info);
                //console.log(m_info.keyword[0]); //오류난다... ㅜㅜ
                
                if(m_info.keyword[0] == "")
                    mountainSeoul.updateMany({mntnid:m_info.mntnid}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
              //  console.log(m_info.keyword.length);
               
            //console.log(m_info.keyword.length)

             
               //console.log(jsonArray[i]);
            })

            mountainBusan.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                //console.log(m_id.list[i]);
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainBusan.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainDaegu.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
               if(m_info.keyword[0] == "")
                    mountainDaegu.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainIncheon.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainIncheon.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainGwangju.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainGwangju.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainDaejeon.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                //console.log(m_info.keyword[0])
                if(m_info.keyword[0] == "")
                    mountainDaejeon.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainUlsan.findOne({ mntnid:m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainUlsan.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainGyeonggi.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainGyeonggi.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainGangwon.findOne({ mntnid:m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainGangwon.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainChungcheongnam.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainChungcheongnam.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainChungcheongbuk.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainChungcheongbuk.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainJeonbuk.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainJeonbuk.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })
            
            mountainJeonnam.findOne({ mntnid:m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainJeonnam.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainGyeongbuk.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainGyeongbuk.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainGyeongnam.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainGyeongnam.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }
            })

            mountainJeju.findOne({ mntnid: m_id.list[i]}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                mInfo(m_info);
                if(m_info.keyword[0] == "")
                    mountainJeju.updateMany({mntnid:m_id.list[i]}, {keyword: req.body.name}, {multi: true}, function(err, numberAffected) {});
                else {
                     m_info.keyword.push(req.body.name);
                    m_info.save();

                }

                if(i == length - 1) {
                    res.json(jsonArray);
                    
                }
            })


           
        }
        jsonArray = [];
        console.log(jsonArray);
        
      
    });

    //console.log(m_id);
  })

  manager.post('/search', (req, res) => {

      let m_name = JSON.stringify(req.body.mntnnm);

      m_name = m_name.replace(/\"/gi, ""); //큰따옴표 제거
      console.log(m_name);

            
            mountainSeoul.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => { //검색한 문자열이 포함된 값을 찾는다
                if (err) return res.status(500).send({error: 'failed'});
               // console.log(m_id.list[i]);
                //console.log(m_info);
               // if (m_info != null) mInfo(m_info);
               if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
               

               //console.log(jsonArray[i]);
            })

            mountainBusan.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                //console.log(m_id.list[i]);
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
                
            })

            mountainDaegu.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
            })

            mountainIncheon.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
            })

            mountainGwangju.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
            })

            mountainDaejeon.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
            })

            mountainUlsan.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
            })

            mountainGyeonggi.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
                console.log('경기')
            })

            mountainGangwon.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
            })

            mountainChungcheongnam.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
                console.log('충남')
            })

            mountainChungcheongbuk.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
            })

            mountainJeonbuk.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
            })
            
            mountainJeonnam.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
            })

            mountainGyeongbuk.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
            })

            mountainGyeongnam.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
            })

            mountainJeju.find({ mntnnm: new RegExp('.*' + m_name + '.*')}, (err, m_info) => {
                if (err) return res.status(500).send({error: 'failed'});
                if (Object.keys(m_info).length != 0) mInfo2(m_info) //해당하는 값이 있다면 값을 배열에 저장한다.
                res.json(jsonArray);
            })
            jsonArray = [];
      
    });

    //console.log(m_id);
  


module.exports = manager