  /*
   *
   * Programmer: Paul Staff
   * Created: 2014.05.15
   * Edited: 2015.01.31
   *
   * Copyright (c) 2014 - 2015, nplexity, LLC.  All Rights Reserved.
   * www.nplexity.com
   *
   * psDropdown.js
   *
   * v 0.9.3
   *
   *
   * This script converts all select elements with the class 'dropdown'
   * to custom dropdown elements that can be fully styled with CSS.
   *
   *  psDropdown.js requires jQuery.  If jQuery is not included and/or 
   *  the user's browser does not support Javascript, all elements degrade
   *  gracefully and continue to display as standard select elements.
   *
   */

$(document).ready(function() {
    window.psDropdown = new psDropdown;
    psDropdown.convert();
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