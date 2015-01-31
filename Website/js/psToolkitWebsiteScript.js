/**
 * Created by Paul on 1/28/15.
 */

function getUrlVars() {
    var map = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        map[key] = value;
    });
    return map;
}

window.onpopstate = function(event) {
    navigate(event.state.page, true);
};

$(document).ready(function(){

    $(".navItemTitle").click(function(){

        $(this).siblings(".navSubContainer").slideToggle(100);

    });

    var page = getUrlVars()['page'];

    if(page == undefined) {
        navigate(page, true);
    } else {
        navigate(page, false);
    }

});

function navigate(page, back) {

    if(!back) {
        history.pushState({page: page}, page, "index.html?page=" + page);
    }

    $("#downloadBtn").hide();

    switch(page) {
        case "home":
            loadContent("lib/home.html");
            break;
        case "about":
            loadMarkdown("lib/about.md", null);
            break;
        case "download":
            loadContent("src/psToolkit.zip");
            break;
        case "psDropdown":
            loadMarkdown("src/psDropdown/readme.md", function() {
                loadCSS("src/psDropdown/psDropdown.css");
                $.getScript("src/psDropdown/psDropdown.js", function() {
                    psDropdown.convert();
                });
                setDownloadBtn("src/psDropdown/psDropdown.zip");
            });
            break;
        case "psModal":
            loadMarkdown("src/psModal/readme.md", function() {
                loadCSS("src/psModal/psModal.css");
                $.getScript("src/psModal/psModal.js", function() {
                    $("#exampleBtn").click(function() {
                        var title = "Test Modal Title";

                        var content =  	'<div class="psModalItem">' +
                                        '   <div>This is an item in the modal window.  As you can see, the modal window retains CSS styles present in your project, such as font and HTML elements like the button below.</div>' +
                                        '</div> ' +
                                        '<div id="psModalFooter">' +
                                        '   <div class="btn" onclick="psModal.close()">Close Modal</div>' +
                                        '</div> ';

                        var options = {
                            width: 800
                        };

                        psModal.open(title, content, options);
                    });
                });
                setDownloadBtn("src/psModal/psModal.zip");
            });

            break;
        case "psToast":
            loadMarkdown("src/psToast/readme.md", function() {
                loadCSS("src/psToast/psToast.css");
                $.getScript("src/psToast/psToast.js");
                setDownloadBtn("src/psToast/psToast.zip");
            });
            break;
        default:
            loadContent("lib/home.html");
            break;
    }
}


function loadContent(path) {

    $.get(path, function(data) {
        $("#pageContent").fadeOut(250, function() {
            $(this).html(data).scrollTop(0).fadeIn(250);
        });
    });
}

function loadMarkdown(path, callback) {

    $.get(path, function(data) {

        $("#pageContent").fadeOut(250, function() {
            $(this).html("<div class='markdown-body'>" + marked(data) + "</div>");

            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });

            if(callback != null) { callback(); }

            $(this).scrollTop(0).fadeIn(250);
        });

    });
}

function loadCSS(href) {
    var cssLink = $("<link rel='stylesheet' type='text/css' href='" + href + "'>");
    $("head").append(cssLink);
}

function setDownloadBtn(href) {

    $("#downloadBtn").off('click').click(function() {
        window.location = href;
    }).show();

}


