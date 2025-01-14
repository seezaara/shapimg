



# what is shapimg?
a html plugin ,that give user the option to crop select and edit image and video that selected by file input

# why shapimg ?

-   it's can compress and limit image size
-   it's can crop and rotate the image
-   it's can adjust (Brightness, Contrast, Saturation and etc..)
-   it's very fast and optimized
-   it's very compact and lite (~50kb)
-   it's easy to setup with just a json
-   it's give you so many option and can run with default options
-   it's compatible with plain text html without any famework or plugin 

# how to use

 - add script to the HTML document
	```html
	<script src="https://raw.githubusercontent.com/seezaara/sharpimg/main/sharpimg.min.js"></script>
	```
- call sharpimg function 
	```js
	 Sharpimg(files, options)
	```
- for close the sharpimg use this function 
	```js
	 SharpimgClose()
	```
	
- `files`: an array of blobs 
- options
	- `color`: the accent color of bottom and text. (default is `#2196F3`)
	- `title`: the title in top screen
	- `factor`: the factor to open as cropper. -1 not set cropper as first page, 0 set cropper as image width and height size, 1, 1.2,2,.... set width depend on height. (default is -1)
	- `maxWidth`: maximum of width image output. (default is 2560)
	- `maxHeight`: maximum of height image output. (default is 1440)
	- `quality`: factor of quality output image like: `(0.92, 0.80, ...)`  if set to `false` it's not compress and ignoring this property (maxWidth,maxHeight,quality,type). (default deppends on size of input image)
	- `type`: type of image output (`image/jpeg` , `image/png` , `image/webp`) .(default is `'image/jpeg'` )
	- `onclose`: event fires after closing
	- `ondata`: event fires after blob is ready with `(index, blob, videoThumbnail)` arguments

# example
callback of blob files:
```js
Sharpimg(files, {
	ondata: function (index, blob, videoThumbnail) {
		// ...
	},
});
```
simple usage : 
```html
<!DOCTYPE html>
<html>

<head>
    <script src="https://raw.githubusercontent.com/seezaara/sharpimg/main/sharpimg.min.js"></script>
</head>

<body>
    <input id="input" type="file" multiple>
</body>
<script>
    document.querySelector("input").onchange = function () {
        const files = this.files
        Sharpimg(files, {
            color: "red",
            title: "my image cropper",
            ondata: function (index, blob, videoThumbnail) {
                console.log("index", index, "input size", Math.round(files[index].size / 1024), "KB compressed size", Math.round(blob.size / 1024), "KB compressed by", 100 - Math.round(blob.size * 100 / files[index].size), "%")

                const img = document.createElement("img")
                img.width = 200
                img.src = URL.createObjectURL(blob)
                document.body.appendChild(img)
            }
        });
    }   
</script>

</html>
```
