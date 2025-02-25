const dataColAPIUrl = 'https://aerowebapi-g8e0crb4ekhsgddg.centralindia-01.azurewebsites.net'
// const dataColAPIUrl = 'http://127.0.0.1:8000'
const counterAPIUrl = 'https://counterapi-d6d4drfdawacbxa4.centralindia-01.azurewebsites.net';
var clicks = 0;
var feedclick = false;
const search = document.getElementById('search');
const inputbox = document.getElementById('inputbox');
const counter = document.getElementById('visiters');
const semesters = document.getElementById('semesters');
const form = document.getElementById('feedform');
const feedbtn = document.getElementById('feedbtn')
const submitbtn = document.getElementById('submitbtn');

semester_links = [
    "https://iitkgpacin-my.sharepoint.com/:f:/g/personal/prajapatidheeraj_kgpian_iitkgp_ac_in/Eia039srhUdOtmT9ZUe2_-4BTHwumb9GPpd0Uphy4wjNvA",
    "https://iitkgpacin-my.sharepoint.com/:f:/g/personal/prajapatidheeraj_kgpian_iitkgp_ac_in/EqT5KXvHFp5DpkY7U04PPJsBvGcmoM7LjBYxE-xMFwXPtw?e=RMa96B",
    "https://iitkgpacin-my.sharepoint.com/:f:/g/personal/prajapatidheeraj_kgpian_iitkgp_ac_in/EkgXGaG7GBpBtr0S05xksakBPP12dRUxo2xP5AQNU5GFZQ?e=LngMDV",
    "https://iitkgpacin-my.sharepoint.com/:f:/g/personal/prajapatidheeraj_kgpian_iitkgp_ac_in/EvKHrcTfVK9GulzIlMQhTAgB6au_wDanMAcE4Dkq4b3Syg?e=z3dI9h",
    "https://iitkgpacin-my.sharepoint.com/:f:/g/personal/prajapatidheeraj_kgpian_iitkgp_ac_in/Epr_ubrUKIJOkk8_ICPxqO8BDcxrNfG1NFbZPsRev9iDTQ",
    "not_found.html",
    "not_found.html",
    "not_found.html",
    "not_found.html",
    "not_found.html"
];

let i = 1;
for (value of semester_links) {
    let div = document.createElement('div');
    div.setAttribute('class', `col ${(i % 2 == 0) ? 'evenSem' : 'oddSem'}`);
    div.innerHTML = `<a href=${value} target="_blank" class='mlink'>
                        <div class="semCard genCard">
                            <img src="sem_${i}.jpg" alt="Semester ${i}" style="height: 100%; width: 100%;">
                        </div>
                    </a>`;
    semesters.appendChild(div);
    i++;
}


search.addEventListener('click', searchbar);
function searchbar() {
    if (!clicks) {
        inputbox.style.display = "inline-block";
        inputbox.value = '';
        inputbox.focus();
    } else if (clicks == 1) {
        if (inputbox.value == '') {
            clicks++;
        } else {
            console.log(inputbox.value);
        }
    }
    if (clicks == 2) {
        inputbox.style.display = "none";
    }

    clicks = ((clicks + 1) % 3);
}
inputbox.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        console.log(inputbox.value);
        clicks = 2;
    }
});
document.addEventListener('keydown', (event) => {
    if (event.key === '/' && clicks != 1) {
        inputbox.style.display = "inline-block";
        inputbox.focus();
        event.preventDefault();
        inputbox.value = '';
        clicks = 1;
    }
})


//code for getting feedback
feedbtn.addEventListener('click', ()=>{
    if(!feedclick){
        form.style.display = 'flex';
        document.getElementsByClassName('formname')[0].style.justifyContent = 'center';
        document.getElementById('name').focus()
        feedbtn.style.borderBottomLeftRadius = '0';
        feedbtn.style.borderBottomRightRadius = '0';
        feedbtn.style.backgroundColor = 'whitesmoke';
        feedbtn.style.color = 'black';
        // feedbtn.style.fontWeight = '600';
        feedclick = true;
    }else{

        form.style.display = 'none';
        document.getElementsByClassName('formname')[0].style.justifyContent = 'start';
        feedbtn.style.borderBottomLeftRadius = '20px';
        feedbtn.style.borderBottomRightRadius = '20px';
        feedbtn.style.backgroundColor = 'black'
        feedbtn.style.color = 'whitesmoke'
        // feedbtn.style.fontWeight = 'normal';
        feedclick = false;
    }
})
feedbtn.addEventListener('mouseover', ()=>{
    if(!feedclick){
        feedbtn.style.backgroundColor = 'whitesmoke';
        feedbtn.style.color = 'black';
        feedbtn.style.fontWeight = '600';
    }
})
feedbtn.addEventListener('mouseout', ()=>{
    if(!feedclick){
        feedbtn.style.fontWeight = 'normal';
        feedbtn.style.backgroundColor = 'black';
        feedbtn.style.color = 'whitesmoke';
    }
})

submitbtn.addEventListener('click', ()=>{
    const formdata = new FormData(form);
    message = '';
    for(let [key, value] of formdata.entries()){
        console.log(key, value)
        if(!value){
            if(key == 'name' || key == 'email'){
                message = `*Please enter your '${key}'.`;
            }else if(key == 'rollnum'){
                message = `*Please enter your 'Roll Number'`
            }else{
                message = '*Please give your feedback/suggestions.';
            }
            break;
        }
        if(key == 'email'){
            let i;
            for(i=0; i<value.length;i++){
                if(value[i] == '@'){
                    break;
                }
            }
            if(i == value.length){
                message = '*Please enter a valid email.'
                break;
            }
        }
    }

    if(!message){
        message = 'Feedback/Suggestion submitted successfully.';

        feedData = {
            'name': formdata.get('name'),
            'rollnum': formdata.get('rollnum'),
            'email': formdata.get('email'),
            'feedback': formdata.get('feedback')
        }
        console.log("feeddata: ",feedData)
        //code to send data to the cloud is to be written here
        fetch(`${dataColAPIUrl}/postfeedback`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(feedData)
        })
        .then(response =>{
            if(!response.ok){
                throw new Error('Network response was not OK.')
            }
            return response.json()
        })
        .then(data => {
            console.log('Successfully posted to api.', data);
        })
        .catch(error =>{
            message = `Error: ${error}`;
            console.error('Error: ', error);
        })


        document.getElementById('name').value = '';
        document.getElementById('rollnum').value = '';
        document.getElementById('email').value = '';
        document.getElementById('feedback').value = '';
        document.getElementById('submsnmsg').innerText = message;
        document.getElementById('submsnmsg').style.color = 'black';
        document.getElementById('submsnmsg').style.visibility = 'visible';
    }else{
        document.getElementById('submsnmsg').innerText = message;
        document.getElementById('submsnmsg').style.color = 'red';
        document.getElementById('submsnmsg').style.visibility = 'visible';
    }
     
})

//new code
document.addEventListener('DOMContentLoaded', ()=>{
    fetch(`${counterAPIUrl}/countUp/Aeroweb27Counter`).then(response =>{
        if(!response.ok){
            throw new Error('Network response was not OK.')
        }
        return response.json()
    }).then(data =>{
        document.getElementById('visiters').innerHTML = `Visiters: ${data['count']}`
        localStorage.setItem('AerowebCounterValue', data['count'])
    }).catch(error =>{
            message = `Error: ${error}`;
            console.error(message);
    })

    function getUid(){
        return new Promise((resolve, reject)=>{
            let uid = localStorage.getItem('uid');
            if(uid){
                resolve(uid);
            }else{
                FingerprintJS.load().then(fp=>{
                    fp.get().then(result=>{
                        uid = result.visitorId;
                        localStorage.setItem('uid', uid);
                        resolve(uid);
                    }).catch(reject);
                }).catch(reject);
            }
        });
    }

    function sendUserData(uid){
        fetch(`${dataColAPIUrl}/userData`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'uid': uid, 'entry': true})
        }).then(response => {
            if(!response.ok){
                throw new Error('Network Response was not OK!');
            }
            return response.json();
        }).catch(error =>{
            message = `Error: ${error}`;
            console.error(message);
        })
    }

    getUid().then(uid =>{
        sendUserData(uid);
    }).catch(error =>{
        console.error(`Error getting UID: ${error}`);
    })
})

window.addEventListener('beforeunload', function (event){
    payload = JSON.stringify({'uid': localStorage.getItem('uid'), 'entry': false});

    fetch(`${dataColAPIUrl}/userData`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: payload,
        keepalive: true
    }).then(response => {
        if(!response.ok){
            throw new Error('Network Response was not OK!')
        }
        return response.json()
    }).catch(error =>{
        message = `Error: ${error}`
        console.error(message)
    })
})

semlinks = document.getElementsByClassName('mlink')
for(let i = 0;i < semlinks.length; i++){
    semlinks[i].onclick = function (){
        fetch(`${dataColAPIUrl}/semClick`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({'uid': localStorage.getItem('uid'), 'sem': i})
        }).then(response => {
            if(!response.ok){
                throw new Error('Network response was not ok!')
            }
            return response.json()
        }).then(data => {
            console.log(data)
        }).catch(error => {
            console.error({'message': `Error: ${error}`})
        })
    }
}