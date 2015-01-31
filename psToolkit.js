/*
 *
 *  Programmer: Paul Staff
 *  Created: 2015.01.31
 *
 *  Copyright (c) 2014 - 2015, nplexity, LLC.  All Rights Reserved.
 *  www.nplexity.com
 *
 *  psToolkit.js
 *
 *  v 0.9.3
 *
 *  This script is a combined version of all PS Toolkit components.
 *
 *
 *  psToolkit.js requires jQuery.
 *
 */

$(document).ready(function() {
    window.psDropdown = new psDropdown;
    psDropdown.convert();

    window.psModal = new psModal();
    window.psToast = new psToast();
});

function psDropdown() {

    this.options = {
        icon: "arrow"  // Defaults to "arrow".  Change this to "chevron" to display a chevron or "none" to not display an icon.  Edit icon styles in PSDropdown.css
    }

    // This function replaces all selects with a dropdown div containing
    // a readonly text input and an unordered list of all options
    this.convert = function() {

        // Loop through each select with the class 'dropdown'
        $("select.psDropdown").each(function() {

            // Create a new dropdown DOM element
            var dropdown = $('<div>', {
                class: 'psDropdown'
            });

            // Append the text input and unordered list
            dropdown.append('<input type="text" class="' + $(this).attr('class') + '" id="' + $(this).attr('id') + '" value="' + $(this).children("option").first().html() + '" readonly /><ul></ul>');

            // Append the icon
            if (psDropdown.options['icon'] == "arrow") {
                dropdown.append('<div class="arrow"></div>');
            } else if (psDropdown.options['icon'] == "chevron") {
                dropdown.append('<div class="chevron"></div>');
            }

            // Create the options variable
            var options = '';

            // Populate the options variable by looping through select options
            $(this).children("option").each(function() { options += '<li data-val="' + $(this).val() + '">' + $(this).html() + '</li>'; });

            // Append the options to the unordered list
            dropdown.children("ul").append(options);

            // Replace the select element with the created dropdown element
            $(this).replaceWith(dropdown);
        });

        // Execute the initialize function
        initializeDropdowns();
    }

    // This function initializes all dropdowns
    function initializeDropdowns() {

        $(".psDropdown .arrow").click(function() {
            $(this).siblings("input[type='text']").trigger("click");
        });

        // Set the click event for each dropdown
        $(".psDropdown input[type='text']").click(function() {

            if($(this).siblings("ul").is( ":hidden" )) {
                // Set the list position below the text input and width equal to input width
                $(this).siblings("ul").css({'top': $(this).outerHeight(true), 'left': 0, 'width': $(this).outerWidth()}).fadeIn(200);

                // Set the click event for each list element
                $(".psDropdown ul li").click(function() {
                    $(this).parent().siblings("input[type='text']").val($(this).attr("data-val"));

                    // Remove click event to prevent duplicates
                    $(".psDropdown ul li").off("click");
                });

                // Set document mouseup function to close the list
                $(document).mouseup(function (e)
                {
                    $(".psDropdown ul").fadeOut(200);

                    // Remove click event to prevent duplicates
                    $(document).off('mouseup');
                });
            }
        });
    }
}

function psModal() {

    this.open = function(title, content, options) {

        var modalHtml = '<div id="psModalBack">'
            + '    <div id="psModalWindow">'
            + '        <div id="psModalHeader">'
            + '            <div id="psModalHeaderTitle">' + title + '</div>'
            + '            <div id="psModalHeaderClose">&#xd7;</div>'
            + '        </div>'
            + '        <div id="psModalBody">' + content + '</div>'
            + '    </div>'
            + '</div>';

        $('body').append(modalHtml);

        $('#psModalHeaderClose, #psModalBack').click(function() {
            modalClose();
        });

        $('#psModalWindow').click(function(event) {
            event.stopPropagation();
        })

        var width = 600;

        if(options != undefined) {
            width = options['width'] != undefined ? options['width'] : width;
        }

        var topOffset = ($(window).height() - $('#psModalWindow').height()) * 0.33;
        var leftOffset = ($(window).width() - width) * 0.5;

        $('#psModalWindow').css({
            top: topOffset,
            left: leftOffset,
            width: width + "px"
        });

        $('#psModalBack').fadeIn(150);
    }

    this.update = function(title, content, options) {
        $('#psModalHeaderTitle').html(title);
        $('#psModalBody').html(content);
    }

    this.close = function() {
        modalClose();
    }

    function modalClose() {
        $('#psModalBack').remove();
    }
}

function psToast() {

    this.toast = function(message) {
        var toastID = generateToastID();
        console.log("tid: " + toastID);
        var toastHtml = '<div class="psToast" id="'+ toastID + '">' + message + '</div>';
        console.log(toastHtml);

        if($('#psToastContainer').length > 0) {
            $('#psToastContainer').append(toastHtml);
            setTimeout(function() {
                $('#' + toastID).fadeOut(200);
            }, 3000);
        } else {
            console.log("here");
            $('body').append('<div id="psToastContainer"></div>');
            $('#psToastContainer').append(toastHtml);
            setTimeout(function() {
                $('#' + toastID).fadeOut(200);
            }, 3000);
        }
    }

    function generateToastID() {
        var text = "";
        var charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for( var i=0; i < 10; i++ )
            text += charset.charAt(Math.floor(Math.random() * charset.length));

        return text;
    }

}