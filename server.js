const express=require('express');
const app=express();

app.use(express.urlencoded({exteded:false}));

function funcparameter(req,res,next){
    // res.send("We can also put a function like this , It acts like a middle ware");
    req.visitor=false;
    next();   //next just tells that the function is done , go on to the next part
}
  

// Or instead of putting it in get and post request you can use app.use(funcparameter);
app.get('/',funcparameter,(req,res)=>{
    // res.send("<h1>Hello! How are you?</h1>");
    res.send (`<form action="/result" method="POST"> 
            <input type="text" name="Feeling">
            <button >Submit</button>
    </form>
    <p>${req.visitor ? "Hello":"Bye"}</p>
    `);
})

app.post('/result',funcparameter,(req,res)=>{
    // if(req.body.Feeling=="Good"){
    //     res.send("Congrats for your well being");
    // }
    if(req.body.Feeling.toUpperCase()=="GOOD"){
        res.send("Congrats for your well being");
    }
    else{
        res.send("Be happy!");
    }
    res.send('<h1>Thank you for your response</h1>');
})

app.get('/result',(req,res)=>{
    res.send('You can not visit this site directly');
})
app.listen(3000);