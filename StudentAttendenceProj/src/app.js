var express=require('express');
var app=express();
var mysql=require('mysql');
var path=require('path');
var ejs=require('ejs');

//var session=require("express-session");
//var cookieParser=require("cookie-parser");

//app.use(cookieParser);
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));

var conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'Swathi@13091996',
    database:'studentattendence'
});
 conn.connect(function(err,result){
   if(err) throw err;
  console.log('Connected Successfully');
  //var sql="insert into adminlogin(username,password)values('admin','admin1234')";
 // conn.query(sql,function(err,result){
 //     if(err) throw err;
 //     console.log('1 record inserted successfully');
 // });
 });

 var staticPath=path.join(__dirname,'../views');
app.use(express.static(staticPath));
app.set('view engine','ejs');
app.get('/',function(req,res){
    res.render('index');
});

//adminlogin starts
app.get('/test',function(req,res){
    res.render('adminlogin');
});
app.post('/adminlogin',function(req,res){
  var uname=req.body.uname;
  var pass=req.body.pass;
  if(uname&&pass){
      conn.query("select * from adminlogin where username=? and password=?",[uname,pass],function(err,result,fields){
        if(result.length>0){
            res.render('admindashboard');
        }
        else{
            res.send('Incorrect username and password');
        }
       res.end();
      });
    }
      else{
          res.end('Enter correct username and password');
      }
});
// app.get('/test2',function(req,res){
//     res.render('logout');
// });
// app.post('/logout',function(req,res){
//     res.render('adminlogin'); 
// });
//adminlogin ends

//admindashboard starts
app.get('/test2',function(req,res){
     res.render('admindashboard');
    });
app.post('/course',function(req,res){
    var cname=req.body.cname;
    var sql="insert into course(course_name)values('"+cname+"')";
    conn.query(sql,function(err,result){
        if(err) throw err;
        console.log('Record Inserted successfully');
        res.send('Course added successfully')
    });
});

app.get('/retrive',function(req,res){
    var sql="select * from course";
    conn.query(sql,function(err,result){
        if(err) throw err;
        res.render('admindashboard',{
          studs:result
        });
    });
});

//Faculty register and login
app.get('/faculty',function(req,res){
    res.render('facultylogin');
});

app.get('/faculty1',function(req,res){
    var sql="select course_name from course";
    conn.query(sql,function(err,result){
        if(err) throw err;
    res.render('facultyregister',{dropdownVals: result});
});
});

app.post('/facultyregister',function(req,res){
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var mobile=req.body.mobile;
    var address=req.body.address;
    var gender=req.body.gender;
    var dob=req.body.dob;
    var quali=req.body.quali;
    var drop=req.body.drop;
    var uname=req.body.uname;
    var pass=req.body.pass;
    var sql="insert into facultyregister(firstname,lastname,email,mobile,address,gender,dob,qualification,course,username,password)values('"+fname+"','"+lname+"','"+email+"','"+mobile+"','"+address+"','"+gender+"','"+dob+"','"+quali+"','"+drop+"','"+uname+"','"+pass+"')";
    conn.query(sql,function(err,result){
        if(err) throw err;
        console.log('Inserted Successfully');
        res.render('facultylogin');
    });
});
/*Facult Login */
app.get('/facultylogin1',function(req,res){
    res.render('facultylogin');
});
app.post('/facultylogin',function(req,res){
  var uname=req.body.uname;
  var pass=req.body.pass;
  if(uname&&pass){
      conn.query("select * from facultyregister where username=? and password=?",[uname,pass],function(err,result,fields){
        if(result.length>0){
            res.render('facultydashboard');
        }
        else{
            res.send('Incorrect username and password');
        }
       res.end();
      });
    }
});

/*Faculty Dashboard */

app.get('/facultydash',function(req,res){
    var sql="select course_name from course";
    conn.query(sql,function(err,result){
        if(err) throw err;
    res.render('facultydashboard',{dropdownVals: result});
});
});
app.get('/stud',function(req,res){
    res.render('studentregister');
});
app.post('/facultydashboard',function(req,res){
    var drop=req.body.drop;
    var batch = req.body.batch;
    postData = drop;
    postData1=batch;
    res.render('studentregister',{postData,postData1});
    
});
app.post('/studentregister',function(req,res){
    var course=req.body.course;
    var batch=req.body.batch;
    var fname=req.body.fname;
    var lname=req.body.lname;
    var email=req.body.email;
    var mobile=req.body.mobile;
    var address=req.body.address;
    var gender=req.body.gender;
    var dob=req.body.dob;
    var quali=req.body.quali;
    var uname=req.body.uname;
    var pass=req.body.pass;
    var sql="insert into studentregister1(course_name,batch,firstname,lastname,email,mobile,address,gender,dob,qualification,username,password)values('"+course+"','"+batch+"','"+fname+"','"+lname+"','"+email+"','"+mobile+"','"+address+"','"+gender+"','"+dob+"','"+quali+"','"+uname+"','"+pass+"')";
    conn.query(sql,function(err,result){
        if(err) throw err;
        console.log('Inserted Successfully');
        res.send('<script>alert`Student Data added successfully`</script>');
    });
});
app.post('/viewdetails',function(req,res){
        var sql="select * from studentregister1";
        conn.query(sql,function(err,result){
            if(err) throw err;
            res.render('studentdetails',{
              studs:result
            });
        });
    });
/*Student Login */
app.get('/studentlogin1',function(req,res){
    res.render('studentlogin');
});



// app.get('/display',function(req,res){
   
//    if( drop=req.body.drop)
//     {
//         conn.query="select id,firstname,lastname,course from studentregister where course=?",[drop],function(err,result,fields){
//             if(err) throw err;
//             res.render('facultydashboard',{
//                 course:result.course
//             });
//         }
//     }
// });

//Student register and login
app.get('/student',function(req,res){
    res.render('studentlogin');
});




app.post('/studentlogin',function(req,res){
  var uname=req.body.uname;
  var pass=req.body.pass;
  if(uname&&pass){
      conn.query("select * from studentregister where username=? and password=?",[uname,pass],function(err,result,fields){
        if(result.length>0){
            res.render('studentdashboard');
        }
        else{
            res.send('Incorrect username and password');
        }
       res.end();
      });
    }
});


app.listen(3000);
console.log('Listening to port number 3000');