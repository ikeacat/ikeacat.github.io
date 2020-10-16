function toProjects() {
    window.location = "#projects";
}

function toHomepage() {
    window.location = "../index.html";
}

function toSocials() {
    window.location = '#socials';
}

function RGBColorGen() {
    // Mins & Maxes so colors aren't too bright or dark.
    // Red min: 20 max: 195
    var rMin = Math.ceil(20);
    var rMax = Math.floor(195);
    // Green min: 50 max: 170
    var gMin = Math.floor(50);
    var gMax = Math.floor(170);
    // Blue min: 25 max: 100
    var bMin = Math.floor(25);
    var bMax = Math.floor(100);

    var red = Math.floor(Math.random() * (rMax - rMin + 1)) + rMin;
    var green = Math.floor(Math.random() * (gMax - gMin + 1)) + gMin;
    var blue = Math.floor(Math.random() * (bMax - bMin + 1)) + bMin;

    return {red:red, green:green, blue:blue};

}

window.onload = function() {
    try { // Project type things.
        var projectType = document.head.querySelector("meta[name=igi-pagetype]").getAttribute("content");
    } catch (TypeError) {
        projectType = "tagDoesNotExist";
    } finally {
        if(projectType == "project") {
            var colorsdict = RGBColorGen()
            //console.log(colorsdict.blue)
            var rgbInserter = "background-color: rgb(" + colorsdict.red.toString() + "," + colorsdict.green.toString() + "," + colorsdict.blue.toString() + ");";
            //console.log(rgbInserter);
            //console.log(colorsdict);
            document.getElementById("projbgcolor").setAttribute("style", rgbInserter)
            headlineGetter()
        } else if(projectType == "tagDoesNotExist") {
            console.warn("Consider making an 'igi-pagetype' meta tag :)")
            headlineGetter()
        } else if(projectType == "homepage") {
            headlineGetter(0)
        }
    }
}