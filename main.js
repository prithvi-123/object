Status = "";
objects =[];

function setup(){
    canvas = createCanvas(380,380);
    canvas.center();
    video = createCapture(VIDEO);
    video.size(380,380);
    video.hide();
}

function start()
{
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Detecting objects";
    objectName=document.getElementById("object_name").value;
}

function modelLoaded(){
    console.log("modelLoaded");
    Status = true;
}

function draw(){
    image(video,0,0,380,380);
    if(Status !="")
    {
        objectDetector.detect(video, gotResult);
        for (i = 0; i < objects.length; i++)
        {
            document.getElementById("status").innerHTML = "status : Objects Detected";

            fill("red");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            noFill();
            stroke("red");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if(objects[i].label == objectName)
            {
                objectDetector.detect(gotResult);
                document.getElementById("objectstatus").innerHTML=objectName+" found ";
                synth = window.speechSynthesis;
                utterthis=new SpeechSynthesisUtterance(objectName+" found ");
                synth.speak(utterthis);
            }
            else{
                document.getElementById("objectstatus").innerHTML=objectName+" not found ";
                
            }
        }
    }
}

function gotResult(error, results)
{
    if (error){
        console.log(error);
    }
    console.log(results);
    objects = results;
}
