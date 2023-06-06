let time = new Date();
let time_date=time.getDate();
let timeNow=(time_date%7+1).toString();
let thisButton=document.getElementById("jokebutton");
let showData=document.getElementById("showData");
let close=document.querySelector("#close");
close.addEventListener("click", function(){
  jokediagram.close();
})
thisButton.addEventListener("click", loadServerData);

function loadServerData(){
    
    console.log("Load Server Data!");
    let xmlHttpRequest;
    if(window.XMLHttpRequest){
        xmlHttpRequest=new XMLHttpRequest();
    }
    else{ 
        alert("No XMLHttpRequest!");
        return;
    }
    xmlHttpRequest.open("GET","jokes/"+timeNow+".txt",true);
    xmlHttpRequest.send();
    xmlHttpRequest.onreadystatechange=function(){
        if(xmlHttpRequest.readyState==4&&xmlHttpRequest.status==200){
            showData.innerHTML=xmlHttpRequest.responseText;
        }
    }
}