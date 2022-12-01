// 云函数入口文件 
const cloud = require('wx-server-sdk') 
//引入mysql操作模块 
const mysql = require('mysql2/promise') 
cloud.init({ 
    env: 'xinhuoyouchuang-4grdpztx44cc44f9' 
}) 
// 云函数入口函数 
exports.main = async (event, context) => { 
    //外部参数传入的数据在event里面，把其中的sql语句存下来 
    var sql = event.sql; 
    process.env.TZ = 'Asia/Shanghai'
    try { 
        const connection = await mysql.createConnection({ 
            host: '121.4.26.155', 
            port: '3306', 
            database: "xinHuo", 
            user: "root", 
            password: "xcy0125",
        }) 
 
        const [rows, fields] = await connection.execute(sql) //sql操作数据库 
 
        return rows; 
    } catch (err) { 
        console.log("链接错误", err) 
        return err 
    } 
}