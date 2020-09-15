var imgArr = ['img/welcome-purple.jpg','img/welcome-green.jpg','img/welcome-darkcyan.jpg','img/welcome-red.jpg',
'img/welcome-double.jpg','img/welcome-sky.jpg','img/welcome-sea.jpg','img/welcome-tram.jpg','img/welcome-blue.jpg',
    'img/mhsj.jpg']
var img = document.getElementById("cover")
var srcString = img.src.toString()
for (var i=0;i<imgArr.length;i++){
    if (srcString.includes(imgArr[i])){
        srcString = srcString.replace(imgArr[i],imgArr[Math.floor(Math.random() *imgArr.length)])
        break
    }
}
img.src = srcString

