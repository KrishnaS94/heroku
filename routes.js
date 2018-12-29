

'use strict';

//CREATE TABLE login_test1 (ID INT,user_id VARCHAR(100) NOT NULL,password VARCHAR(100) NOT NULL);

const express = require('express');
const mysql = require('mysql');
const Cryptr = require('cryptr');
const SendOtp = require('sendotp');
const app = express();
//const emailExistence = require('email-existence')
var con = require('./config/DBConfig.js');
var dbFunc = require('./config/Connection.js');

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
const cryptr = new Cryptr('myTotalySecretKey');
const sendOtp = new SendOtp('244272APSziUwF95bd0480c');
//const log4js = require('log4js');
const cors = require('cors')
//const logger = log4js.getLogger('Amon_project');
const nodemailer = require('nodemailer')
const jwt = require('jsonwebtoken');
//let date = require('date-and-time');
const secret = 'mysecretsshhh';
const router = express.Router();
var translate = require('node-google-translate-skidz');
let date = require('date-and-time');
var log4js = require('log4js');
const logger = log4js.getLogger('Aman_project');
let now = new Date();
const moment =require("moment")





module.exports = router =>  {

  router.post('/register', async (req, res) => {
    var email_id = req.body.email;
   
   
    var name_en = req.body.name;
     var title_en = req.body.title;
  
    var company_en = req.body.company;
    var nationality_en = req.body.nationality;
    var phone_nmuber = req.body.phone;
    var mobile_number = req.body.mobile;
    var address_en = req.body.address;
    var po_box = req.body.po_box;
    var language = req.body.language;
    var interests_en = req.body.interest;
    
    var newsletter = req.body.newsletter;
    //var type_name = req.body.typename;
    var type_name = "user";
    var type_description = req.body.typedescription;
    var name_ar,company_ar,nationality_ar,address_ar,interests_ar,title_ar;
    
    //var email_verify_link = "";
    var verify_email ="N";
    var verify_mobile ="N";
    console.log("hai")
    console.log(!email_id)
    if(!email_id){
      console.log("hai22")
      res.send({
        "status":false,
        "Message":"Please provide Mandatory fields",
        "رسالة": "يرجى تقديم حقول إلزامية"
      })
    }
    else{
      let password = cryptr.encrypt(req.body.password);
    var sql = "SELECT  * FROM Residents where email_id ='" + email_id + "'";
    dbFunc.connectionRelease;
    if(name_en){
    await translate({text:name_en,source: 'en',target: 'ar'}, function(result) {
      
        console.log(result);
        name_ar= result.sentences[0].trans;

       
      
    });
  }
      else{
        name_ar = name_en
      }
      //console.log(result1);
      
    
      
      console.log(name_ar)
    
      if(company_en){
        await translate({text:company_en,source: 'en',target: 'ar'}, function(result) {
          
            console.log(result);
            company_ar= result.sentences[0].trans;
    
           
          
        });
      }
          else{
            company_ar = company_en
          }
          if(title_en){
            await translate({text:title_en,source: 'en',target: 'ar'}, function(result) {
              
                console.log(result);
                title_ar= result.sentences[0].trans;
        
               
              
            });
          }
              else{
                title_ar = title_en
              }
              if(nationality_en){
                await translate({text:nationality_en,source: 'en',target: 'ar'}, function(result) {
                  
                    console.log(result);
                    nationality_ar= result.sentences[0].trans;
            
                   
                  
                });
              }
                  else{
                    nationality_ar = nationality_en
                  }
                  if(address_en){
                    await translate({text:address_en,source: 'en',target: 'ar'}, function(result) {
                      
                        console.log(result);
                        address_ar= result.sentences[0].trans;
                
                       
                      
                    });
                  }
                      else{
                        address_ar = address_en
                      }
                      if(interests_en){
                        await translate({text:interests_en,source: 'en',target: 'ar'}, function(result) {
                          
                            console.log(result);
                            interests_ar= result.sentences[0].trans;
                    
                           
                          
                        });
                      }
                          else{
                            interests_ar = interests_en
                          }
    
    
    
    con.query(sql, function (err, result) {
    console.log("result",result);
    console.log(result.length != 0);
    //if (err) throw err;
    dbFunc.connectionRelease;
    if(result.length != 0){
    res.send({
      "status":false,
      "Message":"User Already Registered",
              الرسالة: "مستخدم مسجل بالفعل",
             
    })
    dbFunc.connectionRelease;
    }
    //});
    else{	
      // sendOtp.setOtpExpiry('10'); //in minutes
    
      var otp = "";
      var possible = "0123456789";
      for (var i = 0; i < 4; i++)
        otp += possible.charAt(Math.floor(Math.random() * possible.length));
      // var remoteHost = "192.168.0.29:3000";
      // console.log(remoteHost);
    
      var encodedMail = new Buffer(req.body.email).toString('base64');
      //var link = "http://" + remoteHost + "/marine/user/verify?mail=" + email;
      
    //var 	emailtosend = email;
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: "logeshwaran.thulasidass@rapidqube.com",
          pass: "chennai@123"
        }
      });
    
       var link = "http://localhost:8083/email/verify?mail=" + encodedMail;
     
    var mailOptions = {
      transport: transporter,
      from: "Saned Services" + "<logeshwaran.thulasidass@rapidqube.com>",
      to: req.body.email,
      subject: 'Saned Service-OTP Verification',
    
      html: "Email confirmation from Saned services,<br> Your one time password is.<br> " + otp + "<br>" +
        "تأكيد بالبريد الإلكتروني من خدمات أمان ، <br> Your One time password is. <br>" + otp
    
    };
    transporter.sendMail(mailOptions, (error, info) => {
      
      if (error) {
        console.log("Mail send error: ", error);
      }
  
    var phonetosend = req.body.phone;
      console.log(phonetosend)
    
    
    var sql = "SELECT id FROM types WHERE type_name = '" + type_name + "'";
    con.query(sql, function (err, result) {
      if (err) throw err;
      dbFunc.connectionRelease;
      logger.fatal("DataBase ERR:",err)
      console.log("user_id",result[0].id)
      var user_type = result[0].id;
    var sql = "INSERT INTO Residents (name_en, name_ar,title_en,title_ar,company_en,company_ar,nationality_en,nationality_ar,phone_nmuber,address_en,address_ar,po_box,mobile_number,email_id,password,verify_mobile,verify_email,language,interests_en,interests_ar,newsletter,user_type,reg_date,otp,email_verify_link) VALUES ('" + name_en + "','" + name_ar + "','" + title_en + "','" + title_ar + "','" +company_en + "','" + company_ar + "','" + nationality_en + "','" + nationality_ar + "','" + phone_nmuber + "','" + address_en + "','" + address_ar + "', '" + po_box + "', '" + mobile_number + "', '" + email_id + "', '" + password + "','" + verify_mobile + "','" + verify_email + "', '" + language + "','" + interests_en+ "', '" + interests_ar + "', '" + newsletter + "','" + user_type + "','" + date.format(now, 'YYYY/MM/DD HH:mm:ss') +"','" + otp + "','" + link + "')";
    con.query(sql, function (err, result) {
    if (err) throw err;
    dbFunc.connectionRelease;
    logger.fatal("DataBase ERR:",err)
    console.log(result,"inserted.......")
    res.send({
        Message: "please check your email for one time password",
        الرسالة: "يرجى التحقق من بريدك الإلكتروني لمرة واحدة كلمة المرور"
      })
    dbFunc.connectionRelease;
                 })
     
       
    })
    
    
    
      
      
    
    });
    }
    
    })
  }
    
    });
    //==================================supplierregistration============================//
    router.post('/supplier-registration', async (req, res) => {
      console.log(req.body);
      var uae_trade_license_no= req.body.uae_trade_license_no;
       var trade_license_validity=req.body.trade_license_validity;
      // var product_services_type= req.body.product_services_type;
      var company_name= req.body.company_name;
      var reg_office_add=req.body.reg_office_add;
      var contact_no=req.body.contact_no;
      var fax_no=req.body.fax_no;


      var company_email_id=req.body.company_email_id;
      var website_add=req.body.website_add;
      var contact_name=req.body.contact_name;
      var contact_position=req.body.contact_position;
      var contact_no_mobile=req.body.contact_no_mobile;
      var contact_email_id=req.body.contact_email_id;
      var type_name= "supplier";
      var verify_email ="N";
      var verify_mobile ="N";
      console.log("datetest",trade_license_validity);
      var dateTime = new Date(trade_license_validity);
var datetime = moment(dateTime).format("YYYY/MM/DD HH:mm:ss");
console.log(datetime,"datecheck")
     console.log(!contact_email_id)
if(!contact_email_id==true){
  res.send({
    "status":false,
    "message":"Please provide an Emailid"})
}

else{
      var sql = "SELECT  * FROM supplier where contact_email_id ='" + contact_email_id + "'";
      dbFunc.connectionRelease;    
      con.query(sql, function (err, result) {
      console.log("result",result);
      console.log(result.length != 0);
      //if (err) throw err;
      dbFunc.connectionRelease;
      if(result.length != 0){
      res.send({
        "status":false,
        "Message":"User Already Registered",
                الرسالة: "مستخدم مسجل بالفعل",
               
      })
      dbFunc.connectionRelease;
      }
      //});
      else{	
        // sendOtp.setOtpExpiry('10'); //in minutes
      console.log("new");
        var otp = "";
        var possible = "0123456789";
        for (var i = 0; i < 4; i++)
          otp += possible.charAt(Math.floor(Math.random() * possible.length));
        // var remoteHost = "192.168.0.29:3000";
        // console.log(remoteHost);
      
       // var encodedMail = new Buffer(req.body.contact_email_id).toString('base64');
        //var link = "http://" + remoteHost + "/marine/user/verify?mail=" + email;
        
      //var 	emailtosend = email;
        var transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: "logeshwaran.thulasidass@rapidqube.com",
            pass: "chennai@123"
          }
        });
      console.log("before link")
         var link = "mail";
       
      var mailOptions = {
        transport: transporter,
        from: "Saned Services" + "<logeshwaran.thulasidass@rapidqube.com>",
        to: contact_email_id,
        subject: 'Saned Service-OTP Verification',
      
        html: "Email confirmation from Saned services,<br> Your one time password is.<br> " + otp + "<br>" +
          "تأكيد بالبريد الإلكتروني من خدمات أمان ، <br> Your One time password is. <br>" + otp
      
      };
      transporter.sendMail(mailOptions, (error, info) => {
        
        if (error) {
          console.log("Mail send error: ", error);
        }
    
      // var phonetosend = req.body.phone;
      //   console.log(phonetosend)
        var email_verify_link=link;
      console.log("hai");
      
      
      var sql = "SELECT * FROM types WHERE type_name = '" + type_name + "'";
      con.query(sql, function (err, result) {
        if (err) throw err;
        dbFunc.connectionRelease;
        logger.fatal("DataBase ERR:",err)
        console.log("user_id",result[0].id)
        var product_services_type = result[0].id;
        var sql = "INSERT INTO supplier (uae_trade_license_no,trade_license_validity,product_services_type,company_name,reg_office_add,contact_no,fax_no,company_email_id,website_add,contact_name,contact_position,contact_no_mobile,contact_email_id,otp,email_verify_link,verify_mobile,verify_email)  VALUES ('" + uae_trade_license_no+ "','" + datetime +"','" + product_services_type + "','" + company_name + "','" +reg_office_add + "','" + contact_no + "','" + fax_no + "','" + company_email_id + "','" + website_add + "','" + contact_name + "','" + contact_position + "', '" + contact_no_mobile + "', '" + contact_email_id + "','" + otp + "','" + email_verify_link + "','" + verify_mobile + "','" + verify_email + "');"
        con.query(sql, function (err, result) {
      if (err) throw err;
      dbFunc.connectionRelease;
      logger.fatal("DataBase ERR:",err)
      console.log(result,"inserted.......")
      res.send({
          Message: "please check your email for one time password",
          الرسالة: "الرجاء التحقق من بريدك الإلكتروني لـ otp"
        })
      dbFunc.connectionRelease;
                   })
       
         
      })
      
      
      
        
        
      
      });
      }
      
      })
    }
      
      });
      //========================supplieremailverification===========================//
      
router.get("/email/verify", cors(), (req, res, next) => {

	var querymail = req.query.mail;
	console.log("URL: " + querymail);
	var verify_email = "Y"
	var sql ="UPDATE supplier SET verify_email = '" + verify_email + "' WHERE email_id = '" + querymail + "'";
            con.query(sql, function (err) {
              if (err) throw err;
              var otp = "";
        var possible = "0123456789";
        for (var i = 0; i < 4; i++)
          otp += possible.charAt(Math.floor(Math.random() * possible.length));
        
        var transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: "logeshwaran.thulasidass@rapidqube.com",
            pass: "chennai@123"
          }
        });
              var mailOptions = {
                transport: transporter,
                from: "Saned Services" + "<logeshwaran.thulasidass@rapidqube.com>",
                to: req.body.email_id,
                subject: 'Saned Services newsletter',
              
                html: "Dear "+ result[0].name_en +"<br>You are successfully subscribe to SANED newsletter.<br>Should you wish to unsubscribe the newsletter, here is the link to do so.<br>" +link+ "<br>Best Regards,<br>"+"SANED Team."
          
              };
              transporter.sendMail(mailOptions, (error, info) => {
                
                if (error) {
                  console.log("Mail send error: ", error);
                }
              })
              res.send({Message:"You Are Successfully Registred",
              الرسالة: "أنت مسجل بنجاح"
              });
              dbFunc.connectionRelease;
            });
   });
   //=================================supplierotpverification========================//
   router.post("/supplieremailotpverification", cors(), (req, res) => {
    var otp = req.body.otp;
 var contact_email_id = req.body.email_id;
  console.log(otp);
  
  con.query("SELECT * FROM supplier where otp='" + otp+ "'",  function(error, results, fields) {
      if (error) {
          throw error;
      } else {
          // var results = JSON.parse(JSON.stringify(results));
          console.log(results,"supplierotpverify");
          if (results.length > 0) {
            console.log(otp);
              if (results[0].otp == req.body.otp) {
                  console.log(otp);
                  results[0].verify_email = "Y"
                  console.log(results[0].uid);
                  con.query("UPDATE supplier SET verify_email = '" + results[0].verify_email + "' WHERE email_id = '" + results[0].contact_email_id + "'",  function(error, results, fields) {});
                  var otp = "";
        var possible = "0123456789";
        for (var i = 0; i < 4; i++)
          otp += possible.charAt(Math.floor(Math.random() * possible.length));
        
        var transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: "logeshwaran.thulasidass@rapidqube.com",
            pass: "chennai@123"
          }
        });
              var mailOptions = {
                transport: transporter,
                from: "Saned Services" + "<logeshwaran.thulasidass@rapidqube.com>",
                to: results[0].contact_email_id,
                subject: 'Saned Services newsletter',
              
                html: "Dear "+ results[0].contact_name +"<br>Thank you for registering your company," + results[0].company_name + "with SANED as a Supplier.  SANED will be rolling out new services for Sharjah residents."+"<br><br>" + "We will contact you for further information.<br><br><br>"+"Best Regards,<br>"+"SANED Team."
          
              };
              transporter.sendMail(mailOptions, (error, info) => {
                
                if (error) {
                  console.log("Mail send error: ", error);
                }
              })
                  res.send({
                      status: "true",
                      "message": "You are successfully registered",
                      الرسالة: "أنت مسجل بنجاح"
                  });
              }} else {
                  res.send({
                      status: "false",
                      "message": "Invalid one time password",
                      رسالة: "كلمة مرور غير صالحة مرة واحدة"
                  });
              }
          // }
      }
  });
  });
    
//=============================email verification======================================================//
router.get("/email/verifyResi", cors(), (req, res, next) => {

	var querymail = req.query.mail;
	console.log("URL: " + querymail);
	var verify_email = "Y"
	var sql ="UPDATE Residents SET verify_email = '" + verify_email + "' WHERE email_id = '" + querymail + "'";
            con.query(sql, function (err) {
              if (err) throw err;
            
            else{
              res.render('index');
            }
          });
            
            

	
		   
				//res.send({"status": true, "message": "Registration Successful"})
		   // }
		  });
//==========================================Login====================================================//
router.post('/login',cors(),function(req,res) {
  logger.fatal("Entering into Login Service")
  var loginrequest = req.body;
  console.log("request",loginrequest)
  var email_id = req.body.email;
  
 var password = req.body.password;

 console.log(email_id)
 console.log(password,"pass_word")

  var sql = "SELECT  * FROM Residents where email_id ='" + email_id + "'";
 
con.query(sql, function (err, result) {
  if (err) throw err;
  dbFunc.connectionRelease;
  logger.fatal("DataBase ERR:",err)
  if(result.length ==0){
    res.send({
      status:"false",
      Message:"Invalid User name"})
  }
  else{
if(result[0].verify_email=="N"){
res.send({Message:"One Time Password is not verified.Please register Again",
status:"false",
الرسالة: "لم يتم التحقق من كلمة المرور مرة واحدة.الرجاء تسجيل مرة أخرى"
})
dbFunc.connectionRelease;
}
else{
let  registered_password =  cryptr.decrypt(result[0].password);
console.log(registered_password,"db password")
let registered_user = result[0].email_id;
console.log(registered_user,"user nameeeeeeeee")

  if(registered_user == email_id &&  registered_password == password){
    
   
      // Issue token
      const payload = { email_id};
      const token = jwt.sign(payload, secret, {
        expiresIn: '1h'
      });
      console.log("token ==>",token);
      res.cookie('token', token, { httpOnly: true })
        .send({
          Message:"Login Successful",
          status:"true",
          النتيجة: "تسجيل الدخول ناجح",
          Token:token
        
        });
        dbFunc.connectionRelease;
  }
else{
  console.log("pass ")
res.send({
  "status": false,
  Message:"Password is Incorrect",
  
  النتيجة: "اسم المستخدم أو كلمة المرور غير صحيح"


})
}
}
dbFunc.connectionRelease; 
  }
});

});

//===================================================================================//

router.post("/emailotpverification", cors(), (req, res) => {
  var otp = req.body.otp;
  console.log(req.body);
  var email_id = req.body.email_id;
console.log(otp);

con.query("SELECT * FROM Residents where otp='" + otp+ "'",  function(error, results, fields) {
    if (error) {
        throw error;
    } else {
        // var results = JSON.parse(JSON.stringify(results));
        console.log(results,"logesh");
        if (results.length != 0) {
          console.log("hi");
         
          console.log("hi2",results[0].otp)
            if (results[0].otp == req.body.otp) {
                
               var verify_email = "Y"
                
                con.query("UPDATE Residents SET verify_email = '" + verify_email + "' WHERE otp = '" + results[0].otp + "'",  function(error, results, fields) {});
                var otp = "";
                var possible = "0123456789";
                for (var i = 0; i < 4; i++)
                  otp += possible.charAt(Math.floor(Math.random() * possible.length));
                
                var transporter = nodemailer.createTransport({
                  host: 'smtp.office365.com',
                  port: 587,
                  secure: false,
                  auth: {
                    user: "logeshwaran.thulasidass@rapidqube.com",
                    pass: "chennai@123"
                  }
                });
                      var mailOptions = {
                        transport: transporter,
                        from: "Saned Services" + "<logeshwaran.thulasidass@rapidqube.com>",
                        to: results[0].email_id,
                        subject: 'Saned Services newsletter',
                      
                        html: "Dear "+ results[0].name_en +"<br>You are successfully registred to SANED services."
                  
                      };
                      transporter.sendMail(mailOptions, (error, info) => {
                        
                        if (error) {
                          console.log("Mail send error: ", error);
                        }
                      })
                res.send({
                    status: "true",
                    "message": "You are successfully registered",
                    الرسالة: "أنت مسجل بنجاح"
                });
            }} else {
                res.send({
                    status: "false",
                    "message": "Invalid one time password",
                    رسالة: "كلمة مرور غير صالحة مرة واحدة"
                });
            }
        // }
    }
});
});





//===============================Email OTP===================================================//
router.post("/emailotp", (req, res) => {
	userResults = req.body;
	console.log(userResults, "request")
	var otp = "";
	var possible = "0123456789";
	for (var i = 0; i < 4; i++)
		otp += possible.charAt(Math.floor(Math.random() * possible.length));
	var remoteHost = "192.168.0.29:3000";
	console.log(remoteHost);

	var encodedMail = new Buffer(req.body.email).toString('base64');
	var link = "http://" + remoteHost + "/marine/user/verify?mail=" + encodedMail;
	var userResults;
	console.log(userResults);

	console.log("results: " + userResults.email);
	let emailtosend = userResults.email;
	var transporter = nodemailer.createTransport({
		host: 'smtp.office365.com',
		port: 587,
		secure: false,
		auth: {
			user: "logeshwaran.thulasidass@rapidqube.com",
			pass: "chennai@123"
		}
	});
	var remoteHost = "119.81.59.59:8000"
	var link = "http://" + remoteHost + "/email/verify?mail=" + encodedMail;
	console.log(link);

	var mailOptions = {
		transport: transporter,
		from: "Aman Services" + "<logeshwaran.thulasidass@rapidqube.com>",
		to: req.body.email,
		subject: 'Saned Service-OTP Verification',

		html: "Email confirmation from Aman services,<br> Your Otp is.<br> " + otp + "<br>" +
			"تأكيد بالبريد الإلكتروني من خدمات أمان ، <br> Your Otp is. <br>" + otp

	};
	transporter.sendMail(mailOptions, (error, info) => {
		console.log(info, "information")
		res.send({
      Message: "please check your email for otp",
      status:"true",
			الرسالة: "الرجاء التحقق من بريدك الإلكتروني لـ otp"
		})
		if (error) {
			console.log("Mail send error: ", error);
		}
	});
});
//===============================forgetpassword==============================================//
router.post('/forgetpassword',(req,res) =>{
    
    let forgetpassword = req.body;
    console.log("body",forgetpassword);
    let password = req.body.password;
    console.log(password)
    let confirmpassword = req.body.confirmpassword;
    let username = req.body.email;
    if(!username || !password || !confirmpassword)
    {
      res.send({
        "Message":"Please fill all the details"
      })
    }
    else{
    console.log(username)
            let sql = "SELECT * FROM Residents where email_id ='" + username + "'";
          
            con.query(sql, function (err, result) {
             // logger.fatal(result,"select")
              if (err) throw err;
              dbFunc.connectionRelease;
              logger.fatal("DataBase ERR:",err)
              //logger.fatal("Database Error while selecting from register table:",err)
              if(result.length == 0){
                res.send({Message:"Invalid User Name",
                الرسالة: "اسم المستخدم غير صالح"              })
                dbFunc.connectionRelease;
              }
            
     else{
      if(password !=confirmpassword){
      res.send({Message:"password doesn't match",
      الرسالة: "كلمة المرور غير متطابقة"})
      }
      else{
        
   
               if(cryptr.decrypt(result[0].password) == password ){

              res.send({
                Message:"Password should not be a previously used one",
                رسالة:"مرور سبق استخدامهاكلمة المرور لا يجب أن تكون كلمة"
               });
               dbFunc.connectionRelease;
              }
            // });
            else{
              var otp = "";
              var possible = "0123456789";
              var namea;
              var namen;
              for (var i = 0; i < 4; i++)
                otp += possible.charAt(Math.floor(Math.random() * possible.length));
         
            
              var encodedMail = new Buffer(req.body.email).toString('base64');
              let sql = "SELECT * FROM Residents where email_id ='" + username + "'";
              con.query(sql,function (err,result){
                if (err) throw err;
                dbFunc.connectionRelease;
                 namen=result[0].name_en;
                 namea=result[0].name_ar;

            //  })
             console.log("datanames",result[0].name_en);
             console.log(result[0].name_ar);
             console.log("copy",namen);
              var transporter = nodemailer.createTransport({
                host: 'smtp.office365.com',
                port: 587,
                secure: false,
                auth: {
                  user: "logeshwaran.thulasidass@rapidqube.com",
                  pass: "chennai@123"
                }
              });
             var mailOptions = {
              transport: transporter,
              from: "Saned Services" + "<logeshwaran.thulasidass@rapidqube.com>",
              to: req.body.email,
              subject: 'Saned Service-OTP Verification',
            
              html: "Dear  "+ result[0].name_en +"<br>Your one Time Password for forgotPassword recovery for Saned services,<br> Your one time password is.<br> " + otp + "<br>" +
                "كلمة المرور الخاصة بك مرة واحدة نسيت استرداد كلمة المرور لخدمات Saned" + namea + "  العزيز,<br> Your One time password is. <br> " + otp +"<br>"
            
            };
          
            transporter.sendMail(mailOptions, (error, info) => {
             
              if (error) {
                console.log("Mail send error: ", error);
              }
            })
              var sql ="UPDATE Residents SET otp = '" + otp + "' WHERE email_id = '" + username + "'";
          //   console.log(password,"try")
          //   password = cryptr.encrypt(req.body.password);
          //  console.log(password);
           
          //   var sql ="UPDATE Residents SET password = '" + password + "' WHERE email_id = '" + username + "'";
            con.query(sql, function (err) {
              if (err) throw err;
              dbFunc.connectionRelease;
              logger.fatal("DataBase ERR:",err)
              res.send({Message:"Please check your mail for One time Password",
              رسالة:"يرجى التحقق من بريدك مرة واحدة لكلمة المرور"});
            });
           dbFunc.connectionRelease;
          })
          }
        }
      }
          
    } );
  }
});
  //========================forgetpassword-otp===============================//
  router.post("/forgetotpverification", cors(), (req, res) => {
    var otp = req.body.otp;
    var password = cryptr.encrypt(req.body.password)
    
  console.log(otp);
  
  con.query("SELECT * FROM Residents where otp='" + otp+ "'",  function(error, results, fields) {
      if (error) {
          res.send({
              "status": false,
              "message": "error"
          })
      } else {
          // var results = JSON.parse(JSON.stringify(results));
          console.log(results,"logesh");
          if (results.length > 0) {
              if (results[0].otp == otp) {
                  console.log(otp);
                  // results[0].verify_email = "Y"
                  // console.log(results[0].uid);
                  con.query("UPDATE Residents SET password = '" + password + "' WHERE otp = '" + otp + "'",  function(error, results, fields) {});
  
                  res.send({
                      status: "true",
                      "message": "one time password is verified and Password updated successfully",
                      رسالة: "كلمة مرور مرة واحدة تم التحقق من كلمة المرور وتحديثها بنجاح"
                  });
              } 
           }
           else {
            res.send({
                status: "false",
                "message": "Invalid one time password",
                رسالة: "كلمة مرور غير صالحة مرة واحدة"
            });
        }
      }
  });
  });
  
  
  //==========================forgetotpend===================================//

  //=================================================newsletter=======================//
  router.post('/newsletter-Residents', async (req, res) => {
    console.log(req.body);
    var email_id = req.body.email_id;
    var sql = "SELECT  * FROM Residents where email_id ='" + email_id + "'";


    con.query(sql, function (err, result) {
      console.log("result",result);
      console.log(result.length != 0);
      //if (err) throw err;
      dbFunc.connectionRelease;
      if(result.length != 0){
        var otp = "";
        var possible = "0123456789";
        for (var i = 0; i < 4; i++)
          otp += possible.charAt(Math.floor(Math.random() * possible.length));
        // var remoteHost = "192.168.0.29:3000";
        // console.log(remoteHost);
      
        var encodedMail = new Buffer(req.body.email_id).toString('base64');
        //var link = "http://" + remoteHost + "/marine/user/verify?mail=" + email;
        console.log("code",encodedMail);
      //var 	emailtosend = email;
        var transporter = nodemailer.createTransport({
          host: 'smtp.office365.com',
          port: 587,
          secure: false,
          auth: {
            user: "logeshwaran.thulasidass@rapidqube.com",
            pass: "chennai@123"
          }
        });
      
         var link = 'http://localhost:8083/email/verifyResi?mail=' + email_id;
       
      var mailOptions = {
        transport: transporter,
        from: "Saned Services" + "<logeshwaran.thulasidass@rapidqube.com>",
        to: req.body.email_id,
        subject: 'Saned Services newsletter',
      
        html: "Dear "+ result[0].name_en +"<br>You are successfully subscribe to SANED newsletter.<br>Should you wish to unsubscribe the newsletter, here is the link to do so.<br>" +link+ "<br>Best Regards,<br>"+"SANED Team."
      
      };
      transporter.sendMail(mailOptions, (error, info) => {
        
        if (error) {
          console.log("Mail send error: ", error);
        }
      })
      var verify_email ="Y"
      var sql ="UPDATE Residents SET verify_email = '" + verify_email + "' WHERE email_id = '" + email_id + "'";
      con.query(sql, function (err) {
        if (err) throw err;
      })
        

      res.send({
        "status":false,
        "Message":"successfully subscribed for newsletter",
        الرسالة: "اشتركت بنجاح في النشرة الإخبارية"
               
      })
      dbFunc.connectionRelease;
      }
    
  
      else{
        res.send({
          "status":true,
          "Message":"Please Register"
        })


      }
    })
  })
//==============================newslettersupplierend===================================================//
//=================================================newsletter=======================//
router.post('/newsletter-supplier', async (req, res) => {
  var email_id = req.body.email_id;
  var sql = "SELECT  * FROM Residents where email_id ='" + email_id + "'";


  con.query(sql, function (err, result) {
    console.log("result",result);
    console.log(result.length != 0);
    //if (err) throw err;
    dbFunc.connectionRelease;
    if(result.length != 0){
      var otp = "";
      var possible = "0123456789";
      for (var i = 0; i < 4; i++)
        otp += possible.charAt(Math.floor(Math.random() * possible.length));
      // var remoteHost = "192.168.0.29:3000";
      // console.log(remoteHost);
    
      var encodedMail = new Buffer(req.body.email_id).toString('base64');
      //var link = "http://" + remoteHost + "/marine/user/verify?mail=" + email;
      
    //var 	emailtosend = email;
      var transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: "logeshwaran.thulasidass@rapidqube.com",
          pass: "chennai@123"
        }
      });
    
       var link = "http://localhost:8083/email/verify?mail=" + encodedMail;
     
    var mailOptions = {
      transport: transporter,
      from: "Saned Services" + "<logeshwaran.thulasidass@rapidqube.com>",
      to: req.body.email_id,
      subject: 'Saned Services newsletter',
    
      html: "Dear "+ result[0].name_en +"<br>You are successfully subscribe to SANED newsletter.<br>Should you wish to unsubscribe the newsletter, here is the link to do so.<br>" +link+ "<br>Best Regards,<br>"+"SANED Team."

    };
    transporter.sendMail(mailOptions, (error, info) => {
      
      if (error) {
        console.log("Mail send error: ", error);
      }
    })
    var verify_email ="Y"
    var sql ="UPDATE supplier SET verify_email = '" + verify_email + "' WHERE email_id = '" + email_id + "'";
    con.query(sql, function (err) {
      if (err) throw err;
    })
      

    res.send({
      "status":false,
      "Message":"successfully subscribed for newsletter",
      الرسالة: "اشتركت بنجاح في النشرة الإخبارية"
             
    })
    dbFunc.connectionRelease;
    }
  

    else{
      res.send({
        "status":true,
        "Message":"Please Register",
        "رسالة": "الرجاء التسجيل"
      })


    }
  })
})

//==============================nessupplierend=========================================================//
}
