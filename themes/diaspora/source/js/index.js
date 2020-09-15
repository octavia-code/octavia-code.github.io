var imgArr = ['img/welcome-sea.jpg','img/welcome-tram.jpg','img/wall-red.jpg','img/wall-white.jpg','img/wall-queen.png',
'img/wall-yaoyao.jpg','img/wall-blackwhite.jpg','img/wall-celian.jpg','img/wall-huihui.png','img/wall-three.png',
'img/wall-anime1.png','img/wall-anime2.png','img/wall-anime3.png','img/wall-anime4.png','img/wall-black.jpg',
'img/wall-bone.jpg','img/wall-warm.jpg','img/wall-sex.jpg']
var img = document.getElementById("cover")
var srcString = img.src.toString()
for (var i=0;i<imgArr.length;i++){
    if (srcString.includes(imgArr[i])){
        srcString = srcString.replace(imgArr[i],imgArr[Math.floor(Math.random() *imgArr.length)])
        break
    }
}
img.src = srcString

