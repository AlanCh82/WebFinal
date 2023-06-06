let mapArray, ctx, currentImgMain;
let imgMountain, imgMain, imgEnemy;
//mapArray - 決定地圖中每個格子的元素
//ctx - HTML5 Canvas用
//currentImgMainX, currentImgMainY - 決定主角所在座標
//imgMountain, imgMain, imgEnemy - 障礙物, 主角, 敵人的圖片物件
const gridLength = 54.5;
//網頁載入完成後初始化動作

//drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
$(function(){
    mapArray = [ //0-可走,1-障礙,2-終點,3-敵人
        [4,4,4,4,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4],
        [4,4,4,4,4,4,4,4,4,4,0,0,4,4,4,4,4,4,4,4],
        [4,4,4,4,4,4,4,4,4,4,11,0,4,5,4,4,4,4,4,4],
        [4,4,4,4,4,12,7,7,7,6,0,0,0,0,9,9,9,4,4,4],
        [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,10,10],
        [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [4,0,0,0,0,0,4,8,1,0,0,0,0,0,0,0,0,0,0,0],
        [4,0,0,0,0,0,4,8,1,0,0,0,0,0,0,0,0,0,0,0],
        [4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
        [4,0,0,0,0,0,0,0,0,3,3,0,3,3,3,3,3,3,3,3],
        [4,0,0,0,0,0,0,0,0,4,4,2,4,4,4,4,4,4,4,4]
    ];
    ctx = $("#myCanvas")[0].getContext("2d");
    imgMain = new Image();
    imgMain.src = "images/c.png";
    currentImgMain = {
        "x":545,
        "y":218
    };
    imgMain.onload = function(){
        ctx.drawImage(imgMain, 30,100,350,500,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
    };
    imgMountain = new Image();
    imgMountain.src = "images/material.png";
    imgEnemy = new Image();
    imgEnemy.src = "images/Enemy.png";
    imgMountain.onload = function(){
        imgEnemy.onload = function(){
            for(var x in mapArray){
                for(var y in mapArray[x]){
                    if(mapArray[x][y]==11){
                        ctx.drawImage(imgMountain, 224,32,32,32,y*gridLength,x*gridLength,gridLength,gridLength);
                    }else if(mapArray[x][y]==-8){
                        ctx.drawImage(imgEnemy, 7,40,104,135,y*gridLength,x*gridLength,gridLength,gridLength);
                    }
                    
                }
            }
        }
    }


});
//處理使用者按下按鍵
let e1,e2;
$(document).on("keydown",function(event){
    let targetImg, targetBlock, cutImagePositionX, cutImagePositionY, b;
    //cutImagePositionX - 決定主角臉朝向哪個方向
    targetImg = { //主角的目標座標
        "x":-1,
        "y":-1
    };
    targetBlock = { //主角的目標(對應2維陣列)
        "x":-1,
        "y":-1
    }
    let t;
    event.preventDefault();
    //避免鍵盤預設行為發生，如捲動/放大/換頁...
    //判斷使用者按下什麼並推算目標座標
    switch (event.code){
        case "ArrowLeft":
            targetImg.x = currentImgMain.x - gridLength ; 
            targetImg.y = currentImgMain.y ; cutImagePositionX = 30 ; cutImagePositionY = 1300 ;//臉朝左 
            e1 = targetImg.x ;
            e2 = targetImg.y ;
            break;
        case "ArrowUp":
            targetImg.x = currentImgMain.x ; 
            targetImg.y = currentImgMain.y - gridLength ; cutImagePositionX = 30 ; cutImagePositionY = 700 ;//臉朝上 
            e1 = targetImg.x ;
            e2 = targetImg.y ;
            break;
        case "ArrowRight":
            targetImg.x = currentImgMain.x + gridLength ; 
            targetImg.y = currentImgMain.y ; cutImagePositionX = 400 ; cutImagePositionY = 1900 ;//臉朝右 
            e1 = targetImg.x ;
            e2 = targetImg.y ;
            break;
        case "ArrowDown":
            targetImg.x = currentImgMain.x ; 
            targetImg.y = currentImgMain.y + gridLength ; cutImagePositionX = 30 ; cutImagePositionY = 100 ;//臉朝下
            e1 = targetImg.x ;
            e2 = targetImg.y ;
            break;
        case "Enter":
            targetImg.x = e1 ; 
            targetImg.y = e2 ;
            t="Enter";
            break;
        default ://其他按鍵不處理
            return;
    }
    //確認目標位置不會超過地圖
    if(targetImg.x<=1050 && targetImg.x>=0 && targetImg.y<=550 && targetImg.y>=0){
            targetBlock.x = targetImg.y / gridLength;
            targetBlock.y = targetImg.x / gridLength;
    }else{
            targetBlock.x = -1;
            targetBlock.y = -1;
    }
    //清空主角原本所在的位置
    if(event.code!="Enter")
        ctx.clearRect(currentImgMain.x, currentImgMain.y, gridLength, gridLength);


    if(targetBlock.x!=-1 && targetBlock.y!=-1){
        switch(mapArray[targetBlock.x][targetBlock.y]){
            case 0: // 一般道路(可移動)
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                break;
            case 1: // 功能(不可移動)
                if(event.code=="Enter"){
                    $("#talkBox").text("來點音樂");
                    player.playVideo();
                    var element = document.getElementById("player");
                    //element.style.visibility = hidden;
                    element.style.visibility = "visible";
                }break;
            case 2: // 終點(可移動)
                $("#talkBox").text("前往元智");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                if(event.code=="Enter"){
                    window.location.href="https://www.yzu.edu.tw/";
                }
                break;
            case 3: // 牆壁
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                cutImagePositionX = 820;
                break;
            case 4: // 有障礙物(不可移動)
                $("#talkBox").text("");
                break;
            case 5: // 功能(不可移動)
                $("#talkBox").text("日曆");
                if(event.code=="Enter"){
                    dialogDate.showModal();
                }break;
            case 6: // 功能(不可移動)
                $("#talkBox").text("說個笑話來聽聽");
                if(event.code=="Enter"){
                    jokediagram.showModal();
                }break;
            case 7: // 功能(不可移動)
                $("#talkBox").text("吃啥");
                if(event.code=="Enter"){
                    window.open('EatWhat/index.html');
                }break;
            case 8: // 功能(不可移動)
                $("#talkBox").text("心理測驗");
                if(event.code=="Enter"){
                    mind.showModal();
                }break;
            case 9: // 功能(不可移動)
                $("#talkBox").text("天氣預報");
                if(event.code=="Enter"){
                    window.open('0516_GetWeatherData/index.html');
                }break;
            case 10: // 功能(不可移動)
                $("#talkBox").text("新聞");
                if(event.code=="Enter"){
                    window.open('RSS_Reader/index.html');
                }break;
            case 11: // portal
                $("#talkBox").text("");
                currentImgMain.x = targetImg.x;
                currentImgMain.y = targetImg.y;
                window.location.href="RPG.html";
                break;
        }
    }
    else
        $("#talkBox").text("邊界");
    //重新繪製主角
    ctx.drawImage(imgMain, cutImagePositionX,cutImagePositionY,350,500,currentImgMain.x,currentImgMain.y,gridLength,gridLength);
});