const myPromise = new Promise((resolve,reject) =>{

    resolve('success');
});

myPromise.then(response =>{
   console.log(response);
},error=>{
    console.log(error);
});

