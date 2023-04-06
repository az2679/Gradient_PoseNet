let leftColr, rightColr;
let video;
    // let video = document.getElementById('video');
let poseNet;

let hu, dark, light;
let v0, v1, v2, vL, vR;
let angleBetween, angleDeg, negDeg, angleDeg2;
let dis, fullSatMark, markEdge, fullSatPara;

let colr1, colr2;
let leftX, leftY, rightX, rightY;

let angleRadL, angleDegL, negDegL, angleDeg2L;
let disL, huL, satL, brightL, colrL, minDim;

let innerRad, outerRad, radPara;

function setup() {
  video = createCapture(VIDEO, videoReady);
  video.hide();
  createCanvas(640, 480);
  colorMode(HSB)
}

function draw() {
  // image(video, 0, 0, 640, 480);

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

      background(hu, dark, light);
      // leftColr = map(results[0].pose.leftWrist.y, 0, 640, 0, 255)
      // rightColr = map(results[0].pose.rightWrist.y, 0, 640, 0, 255)

      // colr1 = color(hu, dark, light)
      // colrL = color(huL, satL, brightL)

      // fill(colrL)
      // rect(100, 100, 100)
      // fill(colr1)
      // rect (300, 100, 100)

      // leftX = results[0].pose.leftWrist.x
      // leftY = results[0].pose.leftWrist.y

      v0 = createVector(width/2, height/2);
      v1 = createVector(width/2, 0);
      v2 = createVector(mouseX - width/2, mouseY - height/2);
      // vL = createVector(leftX - width/2, leftY - height/2);

      angleBetween = v1.angleBetween(v2);
      angleDeg = degrees(angleBetween)
      // angleRadL = v1.angleBetween(vL);
      // angleDegL = degrees(angleRadL)
      
    //converting neg degrees to 180-360
      if(angleDeg < 0){
        negDeg = abs(angleDeg)
      }
      angleDeg2 = map(negDeg, 0, 180, 180, 0) + 180
      
      // if(angleDegL < 0){
      //   negDegL = abs(angleDegL)
      // }
      // angleDeg2L = map(negDegL, 0, 180, 180, 0) + 180

        
      //degrees > hue value
      if (angleDeg > 0){
        hu = angleDeg
      } else if (angleDeg < 0){
        hu = angleDeg2
      }

      // if (angleDegL > 0){
      //   huL = angleDegL
      // } else if (angleDegL < 0){
      //   huL = angleDeg2L
      // }
        
      //full saturation parameter of 10 (between 95 and 105 dist)
      dis = dist(width/2, height/2, mouseX, mouseY)
      // disL = dist(width/2, height/2, leftX, leftY)

      minDim=min(width, height)
      // fullSatMark = width/4
      // fullSatMark = (minDim/2)/2
        //half of diameter for radius of circle. but half again because circle in center of canvas so 2 sides
      // markEdge = minDim/2
      // markEdge = width/2
      // fullSatPara = 5 

      innerRad = (minDim/2)/2
      outerRad = (minDim/2)
      radPara = 5

      noFill()
      stroke(0)
      ellipse(width/2, height/2, outerRad*2)
      ellipse(width/2, height/2, innerRad*2)
      rect(0,0,width,height)
        
      //lightness scale > saturation, brightness
      // if (dis < fullSatMark){
      //   dark = map(dis, 0, fullSatMark-fullSatPara, 0, 100)
      //   if (dis>= (fullSatMark-fullSatPara)){
      //       dark = 100
      //   }
      //   light = 100
      // } else if (dis > fullSatMark){
      //   light = map(dis, fullSatMark+fullSatPara, markEdge, 100, 0)
      //   if (dis <= fullSatMark+fullSatPara){
      //     light = 100
      //   }
      //   dark = 100
      // }

      if (dis < innerRad){
        dark = map(dis, 0, innerRad-radPara, 0, 100)
        if (dis>= (innerRad-radPara)){
            dark = 100
        }
        light = 100
      } else if (dis > innerRad){
        light = map(dis, innerRad+radPara, outerRad, 100, 0)
        if (dis <= innerRad+radPara){
          light = 100
        }
        dark = 100
      }

      if (light >= 100){
        light=100
      }
      if (light <= 0){
        light=0
      }
      if (dark >= 100){
        dark=100
      }
      if(dark <= 0){
        dark = 0
      }

      console.log(dis, hu, dark, light)

      // if (disL < fullSatMark){
      //   satL = map(disL, 0, fullSatMark-fullSatPara, 0, 100)
      //   if (disL>= (fullSatMark-fullSatPara)){
      //     satL = 100
      //   }
      //   brightL = 100
      // } else if (disL > fullSatMark){
      //   brightL = map(disL, fullSatMark+fullSatPara, markEdge, 100, 0)
      //   if (disL <= fullSatMark+fullSatPara){
      //     brightL = 100
      //   }
      //   satL = 100
      // }
        
        
        
      // console.log(leftX, leftY, disL, huL, satL, brightL)
        
        
        
    }
      


  }
}


  