# canvas 图片处理

## 添加图片

`ctx.drawImage`用来将图片绘制到 canvas 上。  
此处[demo](https://github.com/shaoxi2093/blogTests/blob/master/canvas/canvas12.js)

```js
var canvas = document.getElementById("my-canvas");
var ctx = canvas.getContext("2d");

var img = new Image();
img.src = "../assets/meinv.jpeg";
img.onload = function() {
  ctx.drawImage(img, 0, 0);

  ctx.drawImage(img, 220, 230, 200, 200);

  ctx.translate(240, 260);
  ctx.drawImage(img, 20, 30, 160, 160);
};
```

语法：

```js
ctx.drawImage(image, dx, dy);
ctx.drawImage(image, dx, dy, dWidth, dHeight);
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
```

| 参数    | 描述                                         |
| ------- | -------------------------------------------- |
| img     | 规定要使用的图像、画布或视频。               |
| sx      | 可选。开始剪切的 x 坐标位置。                |
| sy      | 可选。开始剪切的 y 坐标位置。                |
| swidth  | 可选。被剪切图像的宽度。                     |
| sheight | 可选。被剪切图像的高度。                     |
| x       | 在画布上放置图像的 x 坐标位置。              |
| y       | 在画布上放置图像的 y 坐标位置。              |
| width   | 可选。要使用的图像的宽度。（伸展或缩小图像） |
| height  | 可选。要使用的图像的高度。（伸展或缩小图像） |

## 图片处理

图片处理，需要先获取图片的数据详情，canvas 提供了获取图片像素数据，`ctx.getImageData()`方法复制画布上指定矩形的像素数据，处理好像素数据后，然后通过 `putImageData()` 将图像数据放回画布。

`getImageData`获取图片像素数据，方法返回 ImageData 对象，是拷贝了画布指定矩形的像素数据。

对于 ImageData 对象中的每个像素，都存在着四方面的信息，即 RGBA 值：

- R - 红色 (0-255)
- G - 绿色 (0-255)
- B - 蓝色 (0-255)
- A - alpha 通道 (0-255; 0 是透明的，255 是完全可见的)

### 反色（负片）

反转图片中所有颜色，使用`b = 255 - a`来计算：

```js
var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");
ctx.drawImage(img, 0, 0);
var imgData = ctx.getImageData(0, 0, c.width, c.height);
// 反转颜色
for (var i = 0; i < imgData.data.length; i += 4) {
  imgData.data[i] = 255 - imgData.data[i];
  imgData.data[i + 1] = 255 - imgData.data[i + 1];
  imgData.data[i + 2] = 255 - imgData.data[i + 2];
  imgData.data[i + 3] = 255;
}
ctx.putImageData(imgData, 0, 0);
```

### 黑白照片

根据公式处理所有颜色数据： `Gray = (Red * 0.3 + Green * 0.59 + Blue * 0.11)`：

```js
ctx.drawImage(img, 0, 0);
var imgData = ctx.getImageData(0, 0, c.width, c.height);
// 反转颜色
for (var i = 0; i < imgData.data.length; i += 4) {
  var red = imgData.data[i],
    green = imgData.data[i + 1],
    blue = imgData.data[i + 2];
  var gray = 0.3 * red + 0.59 * green + 0.11 * blue;
  imgData.data[i] = gray;
  imgData.data[i + 1] = gray;
  imgData.data[i + 2] = gray;
}
ctx.putImageData(imgData, 0, 0);
```

### 高斯模糊

咱也不懂，咱就直接按照高斯公式来吧：

```math
G(x,y) = \frac{1}{2\pi\sigma^2}e^(-\frac{x^2+y^2}{2\sigma^2})
```

摘一段网上的高斯模糊处理图片的数据方法：

```js
function gaussBlur(imgData) {
  console.log(imgData);
  var pixes = imgData.data;
  var width = imgData.width;
  var height = imgData.height;
  var gaussMatrix = [],
    gaussSum = 0,
    x,
    y,
    r,
    g,
    b,
    a,
    i,
    j,
    k,
    len;

  var radius = 30;
  var sigma = 5;

  a = 1 / (Math.sqrt(2 * Math.PI) * sigma);
  b = -1 / (2 * sigma * sigma);
  //生成高斯矩阵
  for (i = 0, x = -radius; x <= radius; x++, i++) {
    g = a * Math.exp(b * x * x);
    gaussMatrix[i] = g;
    gaussSum += g;
  }
  //归一化, 保证高斯矩阵的值在[0,1]之间
  for (i = 0, len = gaussMatrix.length; i < len; i++) {
    gaussMatrix[i] /= gaussSum;
  }
  //x 方向一维高斯运算
  for (y = 0; y < height; y++) {
    for (x = 0; x < width; x++) {
      r = g = b = a = 0;
      gaussSum = 0;
      for (j = -radius; j <= radius; j++) {
        k = x + j;
        if (k >= 0 && k < width) {
          //确保 k 没超出 x 的范围
          //r,g,b,a 四个一组
          i = (y * width + k) * 4;
          r += pixes[i] * gaussMatrix[j + radius];
          g += pixes[i + 1] * gaussMatrix[j + radius];
          b += pixes[i + 2] * gaussMatrix[j + radius];
          // a += pixes[i + 3] * gaussMatrix[j];
          gaussSum += gaussMatrix[j + radius];
        }
      }
      i = (y * width + x) * 4;
      // 除以 gaussSum 是为了消除处于边缘的像素, 高斯运算不足的问题
      // console.log(gaussSum)
      pixes[i] = r / gaussSum;
      pixes[i + 1] = g / gaussSum;
      pixes[i + 2] = b / gaussSum;
      // pixes[i + 3] = a ;
    }
  }
  //y 方向一维高斯运算
  for (x = 0; x < width; x++) {
    for (y = 0; y < height; y++) {
      r = g = b = a = 0;
      gaussSum = 0;
      for (j = -radius; j <= radius; j++) {
        k = y + j;
        if (k >= 0 && k < height) {
          //确保 k 没超出 y 的范围
          i = (k * width + x) * 4;
          r += pixes[i] * gaussMatrix[j + radius];
          g += pixes[i + 1] * gaussMatrix[j + radius];
          b += pixes[i + 2] * gaussMatrix[j + radius];
          // a += pixes[i + 3] * gaussMatrix[j];
          gaussSum += gaussMatrix[j + radius];
        }
      }
      i = (y * width + x) * 4;
      pixes[i] = r / gaussSum;
      pixes[i + 1] = g / gaussSum;
      pixes[i + 2] = b / gaussSum;
    }
  }
  console.log(imgData);
  return imgData;
}
```
