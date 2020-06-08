var headlines = new Array;
headlines[0] = "idk either.";
headlines[1] = "mhm.";
headlines[2] = "ope.";
headlines[3] = "i dont care.";

function headlineGetter(headoverride) {
    if(headoverride == null) {
        var flooredNum = Math.floor( Math.random() * 4);
        var arrayWFlooredNum = headlines[flooredNum];
        document.getElementById("randomHeadline").innerHTML = arrayWFlooredNum;
    } else {
        if(headoverride <= 2) {
            var x = headlines[headoverride];
            document.getElementById("randomHeadline").innerHTML = x;
        } else {
            console.log("You specified an invalid override. Randomizing.")
            headlineGetter()
        }
    }
}