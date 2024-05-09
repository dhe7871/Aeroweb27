var clicks=0;
let search=document.getElementById('search');
let inputbox=document.getElementById('inputbox');
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



// // let searchArea=document.getElementsByClassName('search');
// // var where=0;
// for(let value of search){
//     // if(where==0){
//     //     searchArea[0].style.display="none";
//     // }
//     // value.addEventListener("mouseover",searchbar);
    
// }

// for(let value of searchArea){
    
//     value.addEventListener("mouseout",nosearch);
//     if(where==0){
//         searchArea[0].style.display="none";
//     }
// }

// function searchbar(){
//     // let inputbox=document.createElement('div');
//     // inputbox.setAttribute('id','inputbox');
//     // inputbox.setAttribute('class','search ps-2 pe-2');
//     // inputbox.innerHTML='<input type="text" placeholder="What are you looking for..."></input>';
//     // inputbox.firstChild.style.width="25vw"
//     // inputbox.firstChild.style.borderRadius="10px"
//     // inputbox.style.position="relative";
//     // inputbox.style.zIndex="10";
//     // inputbox.style.backGroundColor="white"
//     // search.insertAdjacentElement("beforebegin",inputbox);
//     searchArea[0].style.display="inline-block"
//     where=1;
//     console.log(where);
    
// }
// function nosearch(){
//     // let inputbox=document.getElementById('inputbox');
    
//     // inputbox.remove();
    
//     where=0;
//     console.log(where)
// }