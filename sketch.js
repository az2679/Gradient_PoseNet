let leftColr, rightColr
let video;
    // let video = document.getElementById('video');
let poseNet;


function setup() {
  video = createCapture(VIDEO, videoReady);
  video.hide();
  createCanvas(640, 480);
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
    console.log(results[0].pose.leftWrist.y, leftColr, results[0].pose.rightWrist.y, rightColr)
    if (results[0] && results[0].pose) {
      
      leftColr = map(results[0].pose.leftWrist.y, 0, 640, 0, 255)
      rightColr = map(results[0].pose.rightWrist.y, 0, 640, 0, 255)

      fill(leftColr)
      rect(100, 100, 100)
      fill(rightColr)
      rect (300, 100, 100)


      let v0, v1, v2;
      let angleDeg, negDeg, angleDeg2;
      let dark, light;
      
      function setup() {
        createCanvas(400, 400);
        colorMode(HSB)
      }
      
      function draw() {
        background(hue, dark, light);
        let v0 = createVector(width/2, height/2);
        let v1 = createVector(width/2, 0);
        let v2 = createVector(mouseX - width/2, mouseY - height/2);
      
        let angleBetween = v1.angleBetween(v2);
        let angleDeg = degrees(angleBetween)
      
        //converting neg degrees to 180-360
        if(angleDeg < 0){
          negDeg = abs(angleDeg)
        }
        angleDeg2 = map(negDeg, 0, 180, 180, 0) + 180
        
        //degrees > hue value
        if (angleDeg > 0){
          hue= angleDeg
        } else if (angleDeg < 0){
          hue = angleDeg2
        }
        
        //full saturation parameter of 10 (between 95 and 105 dist)
        let dis = dist(width/2, height/2, mouseX, height/2)
        let fullSatMark = width/4
        let markEdge = width/2
        let fullSatPara = 5 
        
        //lightness scale > saturation, brightness
        if (dis < fullSatMark){
          dark = map(dis, 0, fullSatMark-fullSatPara, 0, 100)
          if (dis>= (fullSatMark-fullSatPara)){
            dark = 100
          }
          light = 100
        } else if (dis > fullSatMark){
          light = map(dis, fullSatMark+fullSatPara, markEdge, 100, 0)
          if (dis <= fullSatMark+fullSatPara){
            light = 100
          }
          dark = 100
        }
        
        
        
        // console.log(dis, fullSatMark, dark, light)
        
        
        
      }
      


    }
  }
}


  