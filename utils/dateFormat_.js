/* 传入时间戳/2022-11-17等 */
const dateFormat = function (times) {
    var date = new Date(times)
    var year = date.getFullYear()
    var month = date.getMonth() + 1 /* 注意这里月份是0~11，所以要加1 */
    var day = date.getDate();
    return year + '-' + month + '-' + day
}

const dateTimeFormat = function(times) {
    var date = new Date(times)
    var year = date.getFullYear()
    var month = date.getMonth() + 1 /* 注意这里月份是0~11，所以要加1 */
    var day = date.getDate();
    var hour = function(){
        return date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
    }
    var minute = function(){
        return date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
    }
    var second = function(){
        return date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
    }
    return year + '-' + month + '-' + day + ' ' + hour() + ":" + minute() + ":" + second()
}

module.exports = {
    dateFormat: dateFormat,
    dateTimeFormat: dateTimeFormat
}