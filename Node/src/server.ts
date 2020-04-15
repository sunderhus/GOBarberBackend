import express  from 'express';

const app = express();

app.get('/', (request,response)=>{
    return response.json({message:'helloWorld'});
})

app.listen(3333, ()=>{
    console.log('🕋 server online.');
});