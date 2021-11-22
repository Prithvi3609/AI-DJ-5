leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
score_leftWrist = 0;
score_rightWrist = 0;
song1_played = "";
song2_played = "";
song = "";
song2 = "";
function preload()
{
    song = loadSound("music.mp3");
    song2 = loadSound("music2.mp3");
}
function setup()
{
    canvas = createCanvas(600,500);
    canvas.position(350,150);
    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video,modelLoaded);
    poseNet.on('pose',gotPoses);
}
function modelLoaded()
{
    console.log("PoseNet is initialized");
}
function gotPoses(results)
{
    if(results.length>0)
    {
      console.log(results);
      score_leftWrist = results[0].pose.keypoints[9].score;
      console.log(score_leftWrist);
      score_rightWrist = results[0].pose.keypoints[10].score;
      console.log(score_rightWrist);
      leftWristx = results[0].pose.leftWrist.x;
      leftWristy = results[0].pose.leftWrist.y;
      console.log("leftWristx = " + leftWristx + "leftWristy = " + leftWristy);
      rightWristx = results[0].pose.rightWrist.x;
      rightWristy = results[0].pose.rightWrist.y;
      console.log("rightWristx = " + rightWristx + "rightWristy = " + rightWristy);
    }
}
function draw()
{
    image(video,0,0,600,500);
    song1_played = song.isPlaying();
    fill("#FF0000");
    stroke("#FF0000");
    if(score_leftWrist>0.2)
    {
      circle(leftWristx,leftWristy,20);
      song2.stop();
        if(song1_played==false)
    {
      song.play();
      document.getElementById("song").innerHTML = "Song 1 is being played";
    }
  }
    song2_played = song2.isPlaying();
    if(score_rightWrist>0.2)
    {
      circle(rightWristx,rightWristy,20);
      song.stop();
      if(song2_played==false)
    {
      song2.play();
      document.getElementById("song").innerHTML = "Song 2 is being played";
    }
}
}