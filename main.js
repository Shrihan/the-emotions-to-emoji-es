prediction_1=""
prediction_2=""
Webcam.set({
    width:300,
    height:299,
    image_format:"png",
    png_quality:90
})
camera=document.getElementById("camera");
Webcam.attach("#camera");
function takesnapshot(){
Webcam.snap(function(data_uri){
    document.getElementById("selfieimage").src=data_uri
})
}
console.log("ml5 version", ml5.version)
classifier=ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/tllzvhfqj/model.json",modelLoaded)
function modelLoaded(){
    console.log("Model Loaded!")
}
function speak(){
    var synth = window.speechSynthesis.Synhesis;
    speak_data_1 = "The first prediction is" + prediction_1;
    speak_data_2 =  "And the second prediction is" + prediction_2;
    var utterThis=new SpeechSynthesisUtterance(speak_data_1 + speak_data_2);
    synth.speak(utterThis);
}
function check(){
    img=document.getElementById("selfieimage")
    classifier.classify(img, gotresult)
}
function gotresult(error, results){
    if (error) {
        console.log(error)
    } else {
        console.log(results)
        document.getElementById("result1").innerHTML=results[0].label
        document.getElementById("result2").innerHTML=results[1].label
        prediction_1=results[0].label
        prediction_2=results[1].label
        if (prediction_1=="Happy") {
            document.getElementById("emoji1").innerHTML="&#128518;"
        } else if(prediction_1=="Sad") {
            document.getElementById("emoji1").innerHTML="&#129402;"
        }else if(prediction_1=="Angry") {
            document.getElementById("emoji1").innerHTML="&#128520;"
        }else if(prediction_1=="Confused") {
            document.getElementById("emoji1").innerHTML="&#129327;"
        }
        if (prediction_2=="Happy") {
            document.getElementById("emoji2").innerHTML="&#128518;"
        } else if(prediction_2=="Sad") {
            document.getElementById("emoji2").innerHTML="&#129402;"
        }else if(prediction_2=="Angry") {
            document.getElementById("emoji2").innerHTML="&#128520;"
        }else if(prediction_2=="Confused") {
            document.getElementById("emoji2").innerHTML="&#129327;"
        }
    }

}