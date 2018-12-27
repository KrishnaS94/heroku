moment =require("moment")
var dateTime = new Date("2015-06-17");
dateTime = moment(dateTime).format("YYYY/MM/DD HH:mm:ss");
console.log(dateTime,"test")
