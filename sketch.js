let leftColr, rightColr;
let video;
    // let video = document.getElementById('video');
let poseNet;

let hu, sat, bright;
let v0, v1;

let v2;
let angleRad, angleDeg, negDeg, angleDeg2;
let dis, fullSatMark, markEdge, fullSatPara;

let leftX, leftY;
let vL, angleRadL, angleDegL, negDegL, angleDeg2L;
let disL, colrL, huL, satL, brightL;

let rightX, rightY;
let vR, angleRadR, angleDegR, negDegR, angleDeg2R;
let disR, colrR, huR, satR, brightR;

let minDim, innerRad, outerRad, param;

let sY, eY, spd, sYSpd, eYSpd;

function setup() {
  video = createCapture(VIDEO, videoReady);
  video.size(640, 680)
  video.hide();
  createCanvas(640, 680);
  colorMode(HSB)
  background(255)

  huL = 255
  satL = 255
  brightL = 255
  huR = 255
  satR = 255
  brightR = 255

  sY = width/2
  eY = width/2
  sYSpd = 0.1
  eYSpd = 0.3
}

function draw() {

    // const flippedVideo = ml5.flipImage(video);
    // image(flippedVideo, 0, 0, 640, 480);
    // linearGradient(
    //   0, minDim/2,
    //   width, minDim/2,
    //   color(huL, satL, brightL),
    //   color(huR, satR, brightR)
    // );
    // rect(0,0,width, height)


  // image(flippedVideo, (width/2)-100, (height/2)-100, 200, 200);
    //works to give a preview but error
  
}



function videoReady() {
  poseNet = ml5.poseNet(video, modelLoaded);
}

function modelLoaded() {
  console.log('model loaded');
  poseNet.on('pose', gotResults);
    // poseNet.on('pose', (results) => {
    //   poses = results;
    // });
}

function gotResults(results) {
  if (results) {
    // console.log(results);
    // console.log(results[0].pose.leftWrist.y, leftColr, results[0].pose.rightWrist.y, rightColr)
    if (results[0] && results[0].pose) {

      colrL = color(huL, satL, brightL)
      colrR = color(huR, satR, brightR)

     // LEFT AND RIGHT WRIST POINTS
      leftX = results[0].pose.leftWrist.x
      leftY = results[0].pose.leftWrist.y
      rightX = results[0].pose.rightWrist.x
      rightY = results[0].pose.rightWrist.y

      wristDis = dist(leftX, leftY, rightX, rightY)

      spd = map(wristDis, 0, width, 0,50)
      if (sY >= width/4 && eY <= (width/4)*3){
        sYSpd = bounce(sY, ((width/4)*3), (width/4)+10, sYSpd)
        eYSpd = bounce(eY, ((width/4)*3)-10, (width/4), eYSpd)
         
        sY += (sYSpd * spd); 
        eY += (eYSpd * spd);
      } 

      console.log(spd, sY, width/4, eY, (width/4)*3, sYSpd, eYSpd)

      linearGradient(
        0, sY,
        width, eY,
        color(huL, satL, brightL),
        color(huR, satR, brightR)
      );
      rect(0,0,width,height)

      v0 = createVector(width/2, height/2);
      v1 = createVector(width/2, 0);
      vL = createVector(leftX - width/2, leftY - height/2);
      vR= createVector(rightX - width/2, rightY - height/2);

      angleRadL = v1.angleBetween(vL);
      angleDegL = degrees(angleRadL)
      angleRadR = v1.angleBetween(vR);
      angleDegR = degrees(angleRadR)

      if(angleDegL < 0){
        negDegL = abs(angleDegL)
      }
      angleDeg2L = map(negDegL, 0, 180, 180, 0) + 180
      if(angleDegR < 0){
        negDegR = abs(angleDegR)
      }
      angleDeg2R = map(negDegR, 0, 180, 180, 0) + 180

      if (angleDegL > 0){
        huL = angleDegL
      } else if (angleDegL < 0){
        huL = angleDeg2L
      }
      if (angleDegR > 0){
        huR = angleDegR
      } else if (angleDegR < 0){
        huR = angleDeg2R
      }

      disL = dist(width/2, height/2, leftX, leftY)
      disR = dist(width/2, height/2, rightX, rightY)

      minDim=min(width, height)
      innerRad = (minDim/2)/2
      outerRad = (minDim/2)
      param = 5

      if (disL < innerRad){
        satL = map(disL, 0, innerRad-param, 0, 100)
        if (disL>= (innerRad-param)){
          satL = 100
        }
        brightL = 100
      } else if (disL > innerRad){
        brightL = map(disL, innerRad+param, outerRad, 100, 0+param*2)
        if (disL <= innerRad+param){
          brightL = 100
        }
        satL = 100
      }

      if (disR < innerRad){
        satR = map(disR, 0, innerRad-param, 0, 100)
        if (disR>= (innerRad-param)){
          satR = 100
        }
        brightR = 100
      } else if (disR > innerRad){
        brightR = map(disR, innerRad+param, outerRad, 100, 0+param*2)
        if (disR <= innerRad+param){
          brightR = 100
        }
        satR = 100
      }

      if (brightL >= 100){
        brightL=100
      }
      if (brightL <= param*2){
        brightL=param*2
      }
      if (satL >= 100){
        satL=100
      }
      if(satL <= 0){
        satL = 0
      }

      if (brightR >= 100){
        brightR=100
      }
      if (brightR <= param*2){
        brightR=param*2
      }
      if (satR >= 100){
        satR=100
      }
      if(satR <= 0){
        satR = 0
      }

      //MOUSE
      // v2 = createVector(mouseX - width/2, mouseY - height/2);
      //going from radian to degrees
        // angleRad = v1.angleBetween(v2);
        // angleDeg = degrees(angleRad);
      //converting neg degrees to 180-360
        // if(angleDeg < 0){
        //   negDeg = abs(angleDeg)
        // }
        // angleDeg2 = map(negDeg, 0, 180, 180, 0) + 180
      //degrees > hue value
        // if (angleDeg > 0){
        //   hu = angleDeg
        // } else if (angleDeg < 0){
        //   hu = angleDeg2
        // }
      //full saturation parameter of 10
        // dis = dist(width/2, height/2, mouseX, mouseY)        
      //lightness scale for saturation, brightness
        // if (dis < innerRad){
        //    sat = map(dis, 0, innerRad-param, 0, 100)
        //   if (dis>= (innerRad-param)){
        //       sat = 100
        //   }
        //   bright = 100
        // } else if (dis > innerRad){
        //   bright = map(dis, innerRad+param, outerRad, 100, 0+param*2)
        //   if (dis <= innerRad+param){
        //     bright = 100
        //   }
        //   sat = 100
        // }
      // //fixing console log parameters from mapping
        // if (bright >= 100){
        //   bright=100
        // }
        // if (bright <= param*2){
        //   bright=param*2
        // }
        // if (sat >= 100){
        //   sat=100
        // }
        // if(sat <= 0){
        //   sat = 0
        // }

      // console.log(dis, hu, dark, light)        
      // console.log(leftX, leftY, disL, huL, satL, brightL)
    }
  }
}

function bounce(num, max, min, speed) {  
  if(num > max || num < min) {
    speed *= -1
  }
  return speed;
}

function linearGradient(sX, sY, eX, eY, sColr, eColr) {
  let gradient = drawingContext.createLinearGradient(sX, sY, eX, eY);
  gradient.addColorStop(0, sColr);
  gradient.addColorStop(1, eColr);

  drawingContext.fillStyle = gradient;
}


  