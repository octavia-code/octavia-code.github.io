var imgArr = ['img/welcome-purple.jpg','img/welcome-green.jpg','img/welcome-darkcyan.jpg','img/welcome-red.jpg',
'img/welcome-double.jpg','img/welcome-sky.jpg','img/welcome-sea.jpg','img/welcome-tram.jpg','img/welcome-blue.jpg']
var img = document.getElementById("cover")
img.src = imgArr[Math.floor((Math.random()*imgArr.length))]
img.crossOrigin = 'anonymous'
