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
            loadContent("lib/home.html", null);
            break;
        case "about":
            loadMarkdown("lib/about.md", null);
            break;
        case "download":
            loadContent("src/v1.0.1/ps-toolkit/ps-toolkit.zip", null);
            break;
        case "delaunay":
            console.log('loading delaunay...');

            loadContent("lib/delaunay.html", function() {
                $.getScript("src/delaunay-triangulation/trig-script.js", function() {

                    console.log('running function');
                    window.trigObj = trigScript(30);
                });
            });
            break;
        case "ps-dropdown":
            loadMarkdown("src/v1.0.1/ps-dropdown/readme.md", function() {
                loadCSS("src/v1.0.1/ps-dropdown/ps-dropdown.css");
                loadCSS("src/v1.0.1/ps-dropdown/font-awesome-4.5.0/css/font-awesome.min.css");
                $.getScript("src/v1.0.1/ps-dropdown/ps-dropdown.js", function() {
                    psDropdown = new PsDropdown();
                    psDropdown.convert();
                });
                setDownloadBtn("src/v1.0.1/ps-dropdown/ps-dropdown.zip");
            });
            break;
        case "ps-modal":
            loadMarkdown("src/v1.0.1/ps-modal/readme.md", function() {
                loadCSS("src/v1.0.1/ps-modal/ps-modal.css");
                $.getScript("src/v1.0.1/ps-modal/ps-modal.js", function() {
                    $("#exampleBtn").click(function() {
                        psModal = new PsModal();

                        var options = psModal.getStandardOptions();

                        options.title = 'This is a Title';
                        options.header = true;
                        options.closeModalBack = true;

                        options.content = '';
                        options.content += '<div class="ps-modal-item">This is content for the modal window. The button below is styled according to the CSS of the page in which it is found.</div>';
                        options.content += '<div id="ps-modal-footer">';
                        options.content += '    <div class="btn" id="modal-close-btn">Close</div>';
                        options.content += '</div>';

                        var callback = function() {
                            document.querySelector('#modal-close-btn').addEventListener('click', function() {
                                psModal.close();
                            });
                        };

                        psModal.open(options, callback);
                    });
                });
                setDownloadBtn("src/v1.0.1/ps-modal/ps-modal.zip");
            });

            break;
        case "ps-toast":
            loadMarkdown("src/v1.0.1/ps-toast/readme.md", function() {
                loadCSS("src/v1.0.1/ps-toast/ps-toast.css");
                $.getScript("src/v1.0.1/ps-toast/ps-toast.js", function() {
                    psToast = new PsToast();
                });
                setDownloadBtn("src/v1.0.1/ps-toast/ps-toast.zip");
            });
            break;
        case "ps-datepicker":
            loadMarkdown("src/v1.0.2/ps-datepicker/readme.md", function() {
                loadCSS("src/v1.0.2/ps-datepicker/ps-datepicker.css");
                $.getScript("src/v1.0.2/ps-datepicker/ps-datepicker.js", function() {
                    psDatepicker = new PsDatepicker();
                    psDatepicker.convert();
                });
                setDownloadBtn("src/v1.0.2/ps-datepicker/ps-datepicker.zip");
            });
            break;
        case "ps-timepicker":
            loadMarkdown("src/v1.0.2/ps-timepicker/readme.md", function() {
                loadCSS("src/v1.0.2/ps-timepicker/ps-timepicker.css");
                $.getScript("src/v1.0.2/ps-timepicker/ps-timepicker.js", function() {
                    psTimepicker = new PsTimepicker();
                    psTimepicker.convert();
                });
                setDownloadBtn("src/v1.0.2/ps-timepicker/ps-timepicker.zip");
            });
            break;
        default:
            loadContent("lib/home.html", null);
            break;
    }
}


function loadContent(path, callback) {

    $.get(path, function(data) {
        $("#pageContent").fadeOut(250, function() {
            $(this).html(data).scrollTop(0);

            if(callback != null) { callback(); }

            $(this).fadeIn(250);
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


