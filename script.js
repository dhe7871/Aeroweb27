var clicks=0;
const search=document.getElementById('search');
const inputbox=document.getElementById('inputbox');
const counter = document.getElementById('visiters');

const p = fetch('https://api.counterapi.dev/v1/Aeroweb27/counter/up');
p.then((response) =>{
    if(!response.ok){
        console.log('Error in fetching Visiter count...');
    }
    return response.json();
}).then((response) =>{
    counter.innerText = `Visiters: ${response.count}`;
});

search.addEventListener('click',searchbar);
function searchbar(){
    if(!clicks){
        inputbox.style.display="inline-block";
        console.log("I am here!");
        clicks=1;
    }else{
        inputbox.style.display="none";
        clicks=0;
    }
}
