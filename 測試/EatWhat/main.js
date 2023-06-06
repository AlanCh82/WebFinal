var temp =-1;
$(function(){
    $("input").on("click",function(){
        var numberOfListItem=$("li").length;
        var randomChildNumber=Math.floor(Math.random()*numberOfListItem);
        while(temp==randomChildNumber){
            randomChildNumber=Math.floor(Math.random()*numberOfListItem);
        }
        temp =randomChildNumber;
        $("h1").text($("li").eq(randomChildNumber).text());
        $("img").attr("src",imgArr[randomChildNumber]);
        $("h2").text(t[randomChildNumber]);
    });
});
let imgArr =[
    "https://cw-image-resizer.cwg.tw/resize/uri/https%3A%2F%2Fstorage.googleapis.com%2Fwww-cw-com-tw%2Farticle%2F202101%2Farticle-5ff76e12dff12.jpg/?w=1260&format=webp",
    "https://lordcat.tw/wp-content/uploads/2021/09/1631538408-378fce845ce05de4c29be3e870b50e13.jpg",
    "https://cdn.cybassets.com/media/W1siZiIsIjE2MzE3L3Byb2R1Y3RzLzMyMzU4MDY0LzE2MDYzNzI1NzRfZmJmYmUzYmNhZTgzMjNmOGQzNTguanBlZyJdLFsicCIsInRodW1iIiwiNjAweDYwMCJdXQ.jpeg?sha=f0b7888eaa5e55cc",
    "https://www.japaholic.com/storage/article/images/2020/09/9c6d8f94e68d110ae2fcf88be6d7f8b5.jpg"
];

let t =[
    "拉麵作為日本料理獨立發展。其魅力之一，就在於豐富的種類。湯頭、配料、麵都有不同的種類，組合起來也是無窮無盡！",
    "滷肉飯在臺灣被視為極具台灣特色的民眾小吃，在全臺各地都有店家販售。",
    "餃子深受許多華人喜愛，也是逢年過節必吃的佳餚之一",
    "脆皮金黃色的外衣，酥脆的口感，鎖住其中甜美的肉汁，再加上清爽的甘藍菜解膩，配上白米飯和味噌，可以說是人間美味。"
];