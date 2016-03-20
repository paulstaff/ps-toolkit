  /*
   *
   * Programmer: Paul Staff
   * Created: 2014.05.15
   * Edited: 2015.03.20
   *
   * Copyright (c) 2014 - 2016, nplexity, LLC.  All Rights Reserved.
   * www.nplexity.com
   *
   * ps-dropdown.js
   *
   * v 1.0.1
   *
   *
   * This script converts all select elements with the class 'ps-dropdown'
   * to custom dropdown elements that can be fully styled with CSS.
   *
   *
   */

$(document).ready(function() {
    window.psDropdown = new PsDropdown;
    //psDropdown.convert();
});

function PsDropdown() {

    this.options = {
        icon: "arrow"  // Defaults to "arrow".  Change this to "chevron" to display a chevron or "none" to not display an icon.  Edit icon styles in PSDropdown.css
    };

    var standardOptions = {
        'icon': 'arrow'
    };

    this.testconvert = function() {



        var selectArray = document.querySelectorAll('.ps-dropdown');

        var dropdown = '';
        var dropdownId = '';
        var classList = '';
        var dropdownOptions;

        var i = 0;
        var j = 0;
        var k = 0;


        for (i = 0; i < selectArray.length; ++i) {

            console.log('looping: ' + selectArray[i]);

            // Create dropdown
            dropdown = '';
            dropdownId = selectArray[i].id != '' ? selectArray[i].id : generateId(10);
            console.log('id: ' + dropdownId);
            classList = selectArray[i].className.replace('ps-dropdown', '');
            k = selectArray[i].options.selectedIndex;

            dropdown += '\n<div id="' + dropdownId + '-wrapper" class="ps-dropdown-wrapper" data-dropdown-id="' + dropdownId + '">';
            dropdown += '\n   <div class="ps-dropdown-display" ';
            dropdown += '\n         id="' + dropdownId + '-display"> ';
            dropdown += '\n         ' + selectArray[i].options[k].text + '</div>';

            dropdown += '\n   <input type="hidden"';
            dropdown += '\n         class="ps-dropdown-hidden ' + classList + '" ';
            dropdown += '\n         id="' + dropdownId + '" ';
            dropdown += '\n         name="' + selectArray[i].name + '" ';
            dropdown += '\n         value="' + selectArray[i].options[k].value + '"/>';
            dropdown += '\n   <div class="ps-dropdown-options-wrapper">';

            // Loop through options and add to dropdown
            for (j = 0; j < selectArray[i].options.length; ++j) {
                dropdown += '\n       <div class="ps-dropdown-option" data-value="' + selectArray[i].options[j].value + '" data-dropdown-id="' + dropdownId + '">' + selectArray[i].options[j].text + '</div>';
            }

            dropdown += '\n   </div>';
            dropdown += '\n</div>';

            console.log('d: ' + dropdown);

            // Replace select with dropdown
            selectArray[i].insertAdjacentHTML('afterend', dropdown);
            selectArray[i].parentElement.removeChild(selectArray[i]);

            dropdownOptions = document.querySelector('#' + dropdownId + '-wrapper').querySelectorAll('.ps-dropdown-option');

            for (j = 0; j < dropdownOptions.length; ++j) {
                dropdownOptions[j].addEventListener('click', clickOption);
            }

            document.querySelector('#' + dropdownId + '-wrapper').addEventListener('click', showOptions);
        }

    };

    function clickOption() {
        var dropdownId = this.getAttribute('data-dropdown-id');

        document.querySelector('#' + dropdownId).value = this.getAttribute('data-value');
        document.querySelector('#' + dropdownId + '-display').innerHTML = this.innerHTML;
    }

    function showOptions(e) {
        e.stopPropagation();

        console.log(e.currentTarget);

        document.querySelector('#' + e.currentTarget.id + ' > .ps-dropdown-options-wrapper').style.display = 'block';
        document.querySelector('#' + e.currentTarget.id + ' > .ps-dropdown-options-wrapper').classList.remove('ps-dropdown-fade-out');
        document.querySelector('#' + e.currentTarget.id + ' > .ps-dropdown-options-wrapper').classList.add('ps-dropdown-fade-in');
        e.currentTarget.removeEventListener('click', showOptions);
        window.addEventListener('click', hideOptions);
    }

    function hideOptions(e) {

        e.stopPropagation();

        var optionsWrappers = document.querySelectorAll('.ps-dropdown-fade-in');

        for (var i = 0; i < optionsWrappers.length; ++i) {
            optionsWrappers[i].classList.remove('ps-dropdown-fade-in');
            optionsWrappers[i].classList.add('ps-dropdown-fade-out');

            var opt = optionsWrappers[i];

            setTimeout(function() {
                console.log(opt);
                opt.style.display = 'none';
            }, 250);

            optionsWrappers[i].parentElement.addEventListener('click', showOptions);
            window.removeEventListener('click', hideOptions);
        }

    }

    function generateId(length) {

        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        var result = '';

        for (length; length > 0; --length) result += chars[Math.floor(Math.random() * chars.length)];
        return result;

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