let ctx2,thisImage;
let close2=document.querySelector("#close2");
let thisDate;
close2.addEventListener("click", function(){
    dialogDate.close();
  })
$(function(){
    $("[type='date']").on("change",showDate);
    ctx2=$("#myClock")[0].getContext("2d");
});

function showDate(){
    thisDate=this.value;
    thisDate =thisDate.replace(/-/g,"");
    timeNow=(thisDate[thisDate.length-1]%7+1).toString();
    console.log(thisDate);
    thisImage=new Image();
    thisImage.src="images/flipClockNumbers.png";
    thisImage.onload=function(){
        for(var x=0;x<thisDate.length;x++){
            ctx2.drawImage(thisImage,thisDate[x] *80, 0, 90, 130, 60*x, 0, 60, 100);
        }
    };
    showData.innerHTML="";
}