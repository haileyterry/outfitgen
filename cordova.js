var list = [];

var ls = window.localStorage,
    photo = document.getElementById('uploadImage'),
    canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d'),
    fileReader = new FileReader(),
    img = new Image(), lastImgData = ls.getItem('image'),
    x, y,
    neww = 0, newh = 0;

if (lastImgData) {
  //loop through the list
  lastImgData=lastImgData.replace(/\\n/g, "\\n")
               .replace(/\\'/g, "\\'")
               .replace(/\\"/g, '\\"')
               .replace(/\\&/g, "\\&")
               .replace(/\\r/g, "\\r")
               .replace(/\\t/g, "\\t")
               .replace(/\\b/g, "\\b")
               .replace(/\\f/g, "\\f");
 lastImgData=lastImgData.replace(/[\u0000-\u0019]+/g,"");
  var array = JSON.parse(lastImgData);
  //add a loop (for loop)
for(i=0; i < array.length; i++){
    img.src = array[i];
  }

}

fileReader.onload = function (e) {
    console.log(typeof e.target.result, e.target.result instanceof Blob);
    img.src = e.target.result;
};

img.onload = function() {
    var rw = img.width / canvas.width; // width and height are maximum thumbnail's bounds
    var rh = img.height / canvas.height;

    if (rw > rh)
    {
        newh = Math.round(img.height / rw);
        neww = canvas.width;
    }
    else
    {
        neww = Math.round(img.width / rh);
        newh = canvas.height;
    }

    x = (canvas.width - neww) / 2,
        y = (canvas.height - newh) / 2;

    drawImage();
};

photo.addEventListener('change', function() {
    var file = this.files[0];
    return file && fileReader.readAsDataURL(file);
});


function drawImage() {
   var dataUrl;

    canvas.width = canvas.width;

   if (img.width) context.drawImage(img, x, y, neww, newh);

   dataUrl = canvas.toDataURL();

   document.getElementById('imageData').href = dataUrl;
   document.getElementById('preview').src = dataUrl;

   list.push( img.src);

   ls.setitem('image',JSON.stringify(list));
}

drawImage();
