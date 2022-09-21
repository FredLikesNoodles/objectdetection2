status1 = "";
objects = []
function preload(){
    image1 = loadImage("dog_cat.jpg")
}
function setup(){
    canvas = createCanvas(600, 500)
    canvas.center()
    objectDetection = ml5.objectDetector("cocossd", modelLoaded)
    objectDetection.detect(image1, gotResult)
}
function modelLoaded(){
    console.log("Model has been loaded")
    status1 = true;
    document.getElementById("status").innerHTML = "Status: Detecting Objects"
}
function gotResult(error, results){
    if(error){
        console.error(error)
    }
    else{
        console.log(results)
    }
    objects = results
}
function draw(){
    image(image1, 0, 0, 600, 500)

    for(var i=0;  i < objects.length; i++){
        if(status1 != ""){
            var percentage = floor(objects[i].confidence * 100)
            fill("red")
            text(objects[i].label + " " + percentage + "%",objects[i].x-15, objects[i].y-15)
            noFill() 
            stroke("red")
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height )
            document.getElementById("status").innerHTML = "Detected Objects"
        }
    }


}