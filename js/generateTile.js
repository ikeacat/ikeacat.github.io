async function generateTiles() {
    // Get JSON file.
    var jsonFile = await getFile('https://raw.githubusercontent.com/ikeacat/ikeacat.github.io/wip-dynamic/json/projectInfo.json');
    var jsonp = JSON.parse(jsonFile);

    var rp;
    jsonp.forEach((element) => {
        // Don't generate a tile if it's disabled.
        if (element["enabled"] == false) {
            return;
        }

        // Assuming that it passed the last test, let's start generating :)
        // Creates root tile div.
        let tile = document.createElement('div')
        tile.classList.add('projectItem');

        // Creates title & desc.
        let tile_title = document.createElement('h1')
        tile_title.innerHTML = element["name"];

        let tile_desc = document.createElement('p');
        tile_desc.innerHTML = element["desc"];
        tile_desc.classList.add("projectDesc");

        tile.appendChild(tile_title);
        tile.appendChild(tile_desc);

        // Creates indicator lang row
        let tile_ilr = document.createElement('div');
        tile_ilr.classList.add('indicator-lang-row');
        let ilr_indicator = document.createElement('span');
        ilr_indicator.classList.add('indicator');

        if (element["status"] == 'paused') {
            ilr_indicator.classList.add('paused');
            ilr_indicator.innerHTML = "Paused";
        } else if (element["status"] == 'inprogress') {
            ilr_indicator.classList.add('inprogress');
            ilr_indicator.innerHTML = "In Progress";
        } else if (element["status"] == 'final') {
            ilr_indicator.classList.add('final');
            ilr_indicator.innerHTML = "Final (Discontinued)";
        } else {
            ilr_indicator.classList.add('unknown')
            ilr_indicator.innerHTML = "Unknown";
        }
        tile_ilr.appendChild(ilr_indicator);

        let d = false;
        element["languages"].forEach((element) => {
            var block = document.createElement('span');
            block.classList = "lang block hsml"
            if (!d) {
                block.classList.add("first")
                d = true;
            } else {
                block.classList.add("notfirst")
            }
            block.classList.add(element);
            tile_ilr.appendChild(block);
        })

        tile.appendChild(tile_ilr);
        tile.setAttribute("onclick", "toDynam('" + element["name"] + "')")

        document.getElementById("pjContainer").appendChild(tile);
    });
}

function toDynam(page) {
    while (true) {
        if (page.split(" ").length != 1) {
            page = page.replace(" ", "+");
            continue;
        } else {
            break;
        }
    }
    if (window.location.href.endsWith('.html') || window.location.href.endsWith('#socials') || window.location.href.endsWith('#projects')) {
        let wlhr = window.location.href.split('/');
        var wi;
        var stitch = ""
        for (wi = 0; wi < wlhr.length - 1; wi++) {
            stitch += wlhr[wi] + "/"
        }
        stitch += "projects/dynamic.html?project=" + page;
        window.location = stitch
    } else {
        if (window.location.href.endsWith('/')) {
            window.location += "projects/dynamic.html?project=" + page;
        } else {
            window.location += "/projects/dynamic.html?project=" + page;
        }
    }

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

window.onload += generateTiles();