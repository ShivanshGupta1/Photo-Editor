let video, poseNet, poses;
let noseX, noseY;
let leftEyeX, leftEyeY, rightEyeX, rightEyeY;
let leftEarX, leftEarY, rightEarX, rightEarY;
let inputText, submitButton;
let eyesImg, leftEarImg, rightEarImg
function preload(){
    eyesImg = loadImage("Eyes.png")
    leftEarImg = loadImage("Right Ear.png")
    rightEarImg = loadImage("Left Ear.png")
}

function setup() {
  createCanvas(400, 400);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video,gotResult)
  poseNet.on('pose',async (results)=>{
    poses = results
    noseX = await poses[0].pose.keypoints[0].position.x
    noseY = await poses[0].pose.keypoints[0].position.y
    leftEyeX = await poses[0].pose.keypoints[1].position.x
    leftEyeY = await poses[0].pose.keypoints[1].position.y
    rightEyeX = await poses[0].pose.keypoints[2].position.x
    rightEyeY = await poses[0].pose.keypoints[2].position.y
    leftEarX = await poses[0].pose.keypoints[3].position.x
    leftEarY = await poses[0].pose.keypoints[3].position.y
    rightEarX = await poses[0].pose.keypoints[4].position.x
    rightEarY = await poses[0].pose.keypoints[4].position.y
    
  })
  
}

function draw() {
  background(220);
  image(video,0,0)
  submitButton = document.getElementById('submitButton')
  submitButton.addEventListener('click',()=>{
    inputText = document.getElementById('option').value
  })
  console.log(inputText)
  switch (inputText){
    case "clown":
      fill(255,0,0)
      ellipse(noseX,noseY,75)
      break
  
  case "eyes":
    image(eyesImg,leftEyeX-25, leftEyeY-25,50,50)
    image(eyesImg,rightEyeX-25, rightEyeY-25,50,50)
    break

  case "ears":
    image(leftEarImg,leftEarX-50,leftEarY-80,150,150) 
    image(rightEarImg,rightEarX-60,rightEarY-80,150,150) 
    break
}
}

function gotResult(poses){
  console.log("Connected to PoseNet")
}
