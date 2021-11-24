'use strict';

async function generatePage() {
    document.body.classList.add("hb")
    // Get JSON
    var jsonfile = await getFile('https://raw.githubusercontent.com/ikeacat/ikeacat.github.io/master/json/projectInfo.json');
    var jsonp = JSON.parse(jsonfile);

    // Get Project Name.
    var spl = window.location.href.split("?");
    var projectName;
    spl.forEach(element => {
        if (!element.startsWith("project=")) {
            return;
        } else {
            var ne = element.split("=");
            projectName = ne[1].toLowerCase();
        }
    });
    if (typeof projectName === 'undefined') {
        lsFatal("Defined project could not be found.")
        throw new Error("Project name undefined.")
    }
    var didFindProjectName = false;
    // Compare Project Name to each JSON block.
    jsonp.forEach(element => {
        var pnJSON = element["name"].toLowerCase();
        while (true) {
            if (pnJSON.split(" ").length != 1) {
                pnJSON = pnJSON.replace(" ", "+");
                continue;
            } else {
                pnJSON = pnJSON.trim();
                break;
            }
        }
        if (element["name"].toLowerCase().replace(" ", "+") == projectName) {
            if (!element["enabled"]) {
                lsFatal("Could not generate page for some reason. Try again later.")
                return;
            }
            didFindProjectName = true;

            // Do DOM stuff.
            // Place title
            document.getElementsByClassName("bigtitle")[0].innerHTML = element["name"];
            document.title = element["name"] + " - ikeacat.";
            if (element["headerImage"]["enabled"]) {
                document.getElementsByClassName("imgNameComposite")[0].innerHTML = "<img src='https://raw.githubusercontent.com/ikeacat/ikeacat.github.io/master/" + element["headerImage"]["link"] + "' id='headimg' />" + document.getElementsByClassName("imgNameComposite")[0].innerHTML;
                if (element["headerImage"]["extraCSS"] != "" && typeof element["headerImage"]["extraCSS"] == 'string') {
                    var spl = element["headerImage"]["extraCSS"].split(" ")
                    var ll;
                    for (ll = 0; ll < spl.length; ll++) {
                        document.getElementById('headimg').classList.add(spl[ll]);
                    }
                }
            }

            // Create about.
            document.getElementById("pjstatus").innerHTML = "<span>Status: "
            if (element["status"] == "paused") {
                document.getElementById("pjstatus").innerHTML += '<span class="indicator paused">Paused</span></span>';
            } else if (element["status"] == "inprogress") {
                document.getElementById("pjstatus").innerHTML += '<span class="indicator inprogress">In Progress</span></span>';
            } else if (element["status"] == "final") {
                document.getElementById("pjstatus").innerHTML += '<span class="indicator final">Final (Discontinued)</span></span>';
            } else {
                document.getElementById("pjstatus").innerHTML += '<span class="indicator unknown">Unknown</span></span>';
            }
            document.getElementById("pjdesc").innerHTML = `<span>Description: ${element["desc"]}</span>`;

            // Place all images.
            if (element["images"].length == 0) {
                document.getElementsByClassName("imagesRow")[0].innerHTML += "No images avaliable";
            } else {
                for (var i = 0; i < element["images"].length; i++) {
                    document.getElementsByClassName("imagesRow")[0].innerHTML += "<img src='https://raw.githubusercontent.com/ikeacat/ikeacat.github.io/master/" + element["imagesRoot"] + element["images"][i] + "' class='projectImages' />";
                }
            }

            // Create & Place languages.
            if (element["languages"].length == 0) {
                document.getElementsByClassName("langrow")[0].innerHTML += "Could not get project languages.";
                console.error('External links array empty!')
            } else {
                for (var i = 0; i < element["languages"].length; i++) {
                    var x = "<span class='lang " + element["languages"][i] + "'>"
                    if (element["languages"][i] == "javascript") {
                        x += "JavaScript</span>";
                    } else if (element["languages"][i] == "css") {
                        x += "CSS</span>";
                    } else if (element["languages"][i] == "html") {
                        x += "HTML</span>";
                    } else if (element["languages"][i] == "python") {
                        x += "Python3</span>";
                    } else if (element["languages"][i] == "swift") {
                        x += "Swift 5</span>";
                    } else {
                        continue;
                    }
                    document.getElementsByClassName("langrow")[0].innerHTML += x;
                    document.getElementsByClassName("langrow")[0].innerHTML += "<br>";
                }
            }
            // Make external links & place them lol.
            if (element["externalLinks"].length == 0 || typeof element["externalLinks"] == 'undefined') {
                console.warn('External links array empty.');
            } else {
                document.getElementById("externalColumn").innerHTML += "<h1 class='projectSubheads'>External Links</h1>"
                for (var i = 0; i < element["externalLinks"].length; i++) {
                    if (element["externalLinks"][i]["image"] == "" || element["externalLinks"][i]["href"] == "") {
                        continue;
                    }
                    var imgpath = element["externalLinks"][i]["image"];
                    var bld;
                    if (typeof element["externalLinks"][i]["cssClass"] == 'undefined' || element["externalLinks"][i]["cssClass"] == "") {
                        bld = "<a href='" + element["externalLinks"][i]["href"] + "'><img src='https://raw.githubusercontent.com/ikeacat/ikeacat.github.io/master/" + imgpath + "' /></a>";
                    } else {
                        bld = "<a href='" + element["externalLinks"][i]["href"] + "'><img src='https://raw.githubusercontent.com/ikeacat/ikeacat.github.io/master/" + imgpath + "' class='" + element["externalLinks"][i]["cssClass"] + "'/></a>";
                    }
                    document.getElementById('externalColumn').innerHTML += bld;
                }
                document.getElementById("externalColumn").innerHTML += "<br><br><hr class='topnavdiv'>";
            }
        }
    });

    if (!didFindProjectName) {
        lsFatal("Could not generate page for some reason. Try again later.");
        return;
    }

    document.getElementsByClassName("loadingsheet")[0].animate([
        { opacity: '100%' },
        { opacity: '0%' }
    ], { duration: 200, iterations: 1 }).onfinish = function () {
        document.body.removeChild(document.getElementsByClassName("loadingsheet")[0]);
        document.body.classList.remove("hb");
    };

}

function lsFatal(indMessage) {
    document.getElementsByClassName("loadingsheet")[0].classList.add("fatal");
    document.getElementById("indTxt").innerHTML = indMessage;
    document.getElementsByClassName("loadingsheet")[0].innerHTML += "<a href='../index.html' class='fatalHomeLink'>Home</a>";
}

async function getFile(url) {
    var lol = fetch(url)
        .then(function (response) {
            if (!response.ok) {
                throw new Error(`Could not get file ${url}`);
            }
            return response.text();
        })
    return lol;
}

window.onload = generatePage();