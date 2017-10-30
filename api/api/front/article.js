var query = require("../../config/db_connect")
var express = require("express")
var router = express.Router()
var generateUUID = require("../common/Unique")
var creatTime = require("../common/creatTime")
const moment = require('moment'); //数据库时间转js时间格式

// 查询列表公用sql
var selectfn = function(req, res, next, sql) {
        return new Promise(function(resolve, reject) {
            query(sql, function(err, rows, fields) {
                if (err) {
                    reject("err")
                } else {
                    resolve(rows)
                }
            })
        })
    }
    // 头部导航数据查询
router.get("/getNav", function(req, res, next) {
    var sqlone = "select * from one_class"
    var sqltwo = "select * from two_class"
    var onedata = null
    selectfn(req, res, next, sqlone).then(function(data) {
        onedata = data
        return selectfn(req, res, next, sqltwo)
    }, function(err) {
        res.send({
            code: "6011",
            data: null,
            msg: "查询失败"
        })
    }).then(function(data) {
        let resdata = []
        onedata.forEach(function(i) {
            let everydata = {
                onedata: i,
                twodata: []
            }
            data.forEach(function(j) {
                if (i.id == j.parent_id) {
                    everydata.twodata.push(j)
                }
            })

            resdata.push(everydata)
        })
        console.log(resdata)
        res.send({
            code: "6010",
            data: resdata,
            msg: "查询成功"
        })
    }, function(err) {
        res.send({
            code: "6011",
            data: null,
            msg: "查询失败"
        })
    }).catch(function(err) {
        console.log(err)
    })


})

//一级二级类名的查询函数//
var select_Class = function(req, res, next, sql) {
        console.log(sql)
        return new Promise(function(resolve, reject) {
            query(sql, function(err, rows, fields) {
                console.log(rows)
                rows.map(function(i) {
                    return i.time = moment(i.time).format('YYYY-MM-DD HH:mm:ss')
                });
                if (err) {
                    reject(err)
                } else {
                    resolve(rows)
                }
            })
        })
    }
    // 获取所有文章查询
router.get("/getArticleAll", function(req, res, next) {
    var sqlone = `select * from one_class`
    var sqltwo = `select * from two_class`
    Promise.all([select_Class(req, res, next, sqlone), select_Class(req, res, next, sqltwo)]).then(function(data) {
        // 多章表sql的拼接
        var selectArtSql = `select * from (`
        data[0].forEach(function(i, index) {
            if (index < (data.length - 1)) {
                selectArtSql += `select * from ${i.enname} UNION ALL`
            } else {
                selectArtSql += ` select * from ${i.enname})as tabel_all where art_show=1 order by time desc`
            }

        }, this);
        console.log(selectArtSql)
            // 所有表数据的查询
        query(selectArtSql, function(err, rows, fields) {
            rows.map(function(i) {

                i.time = moment(i.time).format('YYYY-MM-DD HH:mm:ss')
                data[0].forEach(function(j) {
                    if (j.id == i.oneId) {
                        i.enname_one = j.enname
                        i.cnname_one = j.cnname
                    }
                })
                data[1].forEach(function(j) {
                    console.log(2)
                    if (j.id == i.twoId) {
                        i.enname_two = j.enname
                        i.cnname_two = j.cnname
                    }
                })
                return i
            });

            if (err) {
                res.send({
                    code: "6011",
                    data: null,
                    msg: "查询失败"
                })
            } else {
                res.send({
                    code: "6012",
                    data: rows,
                    msg: "查询成功"
                })
            }
        })
    }, function(err) {
        res.send({
            code: "6013",
            data: null,
            msg: "查询失败"
        })
    })
})

// 根据不同的一级类名获取相应的二级类名
router.post("/getClassTwo", function(req, res, next) {
        var sql = `select * from two_class where parent_id='${req.body.oneId}'`
        query(sql, function(err, rows, fields) {
            if (err) {
                res.send({
                    code: "6021",
                    msg: "数据查询失败"
                })
            } else {
                rows.map(function(i) {
                    return i.time = moment(i.time).format('YYYY-MM-DD HH:mm:ss')
                });
                res.send({
                    code: "6020",
                    msg: "数据查询成功",
                    data: rows
                })
            }

        })
    })
    // 根据id获取文章
router.get("/getArticle", function(req, res, next) {
    var sqlone = `select * from one_class`

    select_Class(req, res, next, sqlone).then(function(data) {
        // 多章表sql的拼接
        var selectArtSql = `select content from (`
        data.forEach(function(i, index) {
            if (index < (data.length - 1)) {
                selectArtSql += `select * from ${i.enname} UNION ALL`
            } else {
                selectArtSql += ` select * from ${i.enname})as tabel_all where id='${req.query.id}' and art_show=1 order by time desc`
            }

        }, this);
        // var updataArtSql = `update (`
        // data.forEach(function(i, index) {
        //     if (index < (data.length - 1)) {
        //         selectArtSql += `select * from ${i.enname} UNION ALL`
        //     } else {
        //         selectArtSql += ` select * from ${i.enname})as tabel_all recommend=  where id='${req.query.id}' and art_show=1 order by time desc`
        //     }

        // }, this);
        // console.log(updataArtSql)
        // 所有表数据的查询
        query(selectArtSql, function(err, rows, fields) {
            rows.map(function(i) {
                return i.time = moment(i.time).format('YYYY-MM-DD HH:mm:ss')
            });
            if (err) {
                res.send({
                    code: "6031",
                    data: null,
                    msg: "查询失败"
                })
            } else {
                res.send({
                    code: "6030",
                    data: rows[0],
                    msg: "查询成功"
                })
            }
        })
    }, function(err) {
        res.send({
            code: "6032",
            data: null,
            msg: "查询失败"
        })
    })
})

module.exports = router;