// XMLHttpsRequest

function getUsers(){
    let request = new XMLHttpRequest();
    request.addEventListener("load", function(){
        let textAnswer = this.responseText;
        let jsAnswer = JSON.parse(textAnswer);

        let ul = document.createElement('ul');


        jsAnswer.data.forEach(element => {
            let li = document.createElement('li');
            li.classList.add('list-item');
            li.textContent = `${element.name} ${element.year}`;
            ul.appendChild(li);
        });
        
        document.getElementById('userinfo-1').appendChild(ul);

        request.addEventListener('error', function(){
            let p = document.createElement('p');
            p.textContent = "Error,Page not found"

            document.getElementById('userinfo-1').appendChild(p);
        });

    });
    request.open("GET", "https://reqres.in/api/unknown");
    request.send();
};

getUsers();

// Fetch
let currentPages = 1;
let totalPages ;


function getUsersPages(currentPages) {
    fetch("https://reqres.in/api/users?page=" + currentPages, {
        method:"GET", 
    })
    .then(function(responseText){
        if (responseText.status !== 200) {
            throw responseText.status;
        }

        return responseText.json();
    })

    .then(function(responseJS){
        let ulList = document.createElement("ul");
        ulList.classList.add('ul-list');
        ulList.setAttribute('id','ul-list')
        const fragment =new DocumentFragment();

        responseJS.data.forEach(x => {
            let list = document.createElement('li');
            list.classList.add("list-wrap");
            let image = document.createElement('img');
            image.src = x.avatar;
            ulList.appendChild(image);

            list.textContent = `${x.first_name} ${x.last_name}`;
            fragment.appendChild(list);
        })
        ulList.appendChild(fragment);
        document.getElementById("userinfo-2").innerHTML="";
        document.getElementById("userinfo-2").appendChild(fragment);
        document.getElementById("userinfo-2").appendChild(ulList);
        totalPages = responseJS.total_pages;
    })
    .catch(function(error){
        if(error == 404){
            let paragraph =document.createElement('p') ;
            paragraph.textContent='Page not Found!';

            document.getElementById('userinfo-1').appendChild(paragraph);
        }
        if (error == 505) {
            let paragraph =document.createElement('p') ;
            paragraph.textContent='Page not Found!';

            document.getElementById('userinfo-1').appendChild(paragraph);
        }


    });
}

document.getElementById('next').addEventListener('click', function(){
    
    if (currentPages == totalPages) {
        return;
   }
    currentPages+=1;
    getUsersPages(currentPages);
});

document.getElementById('previous').addEventListener('click' , function(){
    if (currentPages == 1) {
        return;
    }
    currentPages-=1;
    getUsersPages(currentPages);
})

getUsersPages(currentPages);
