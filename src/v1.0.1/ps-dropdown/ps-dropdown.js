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


// Initiate ps-dropdown upon document fully loaded
document.addEventListener("DOMContentLoaded", function(e) {
    window.psDropdown = new PsDropdown();
});

function PsDropdown() {

    // Defines the standard options for PS Dropdown
    var standardOptions = {
        'icon': 'chevron-down' // other options include any font-awesome icon, including 'arrow-down', 'chevron-circle-down', 'plus', etc.
    };

    // Initialize the options variable with standard options
    var options = standardOptions;

    // Function to allow custom options to be set
    this.setOptions = function(newOptions) {
        for (var o in newOptions) {
            if (options.hasOwnProperty(o)) {
                options[o] = newOptions[o];
            }
        }
    };

    // Function to reset the options to default
    this.resetOptions = function() {
        options = standardOptions;
    };

    // Function to convert all select elements with the class of 'ps-dropdown' to ps-dropdown elements
    this.convert = function() {

        // Retrieve all select elements with the class of 'ps-dropdown'
        var selectArray = document.querySelectorAll('select.ps-dropdown');

        // Initialize variables for creating ps-dropdown elements
        var dropdownId;

        var dropdown;
        var display;
        var icon;
        //var hidden;
        var optionsWrapper;
        var optionNode;

        var i = 0;
        var j = 0;
        var k = 0;

        // Loop through all select elements and convert to ps-dropdown elements
        for (i = 0; i < selectArray.length; ++i) {

            // Set the dropdownId if available; otherwise generate randomly
            dropdownId = selectArray[i].id != '' ? selectArray[i].id : generateId(10);

            // Retrieve selected option from select element
            k = selectArray[i].options.selectedIndex;

            // Create the dropdown-wrapper node
            dropdown = document.createElement('div');
            setAttributes(dropdown, {
                'id': dropdownId,
                'class': selectArray[i].className,
                'data-dropdown-id': dropdownId,
                'name': selectArray[i].name
            });
            dropdown.value = selectArray[i].options[k].value;
            dropdown.addEventListener('click', showOptions);

            // Create the dropdown-display node
            display = document.createElement('div');
            setAttributes(display, {
                'id': dropdownId + '-display',
                'class': 'ps-dropdown-display'
            });
            display.innerHTML = selectArray[i].options[k].text;

            // Create the dropdown-icon node
            icon = document.createElement('div');
            setAttributes(icon, {
                'class': 'ps-dropdown-icon'
            });
            icon.innerHTML = '<i class="fa fa-' + options.icon + '"></i>';

            // Create the dropdown-hidden node
            /*hidden = document.createElement('input');
            setAttributes(hidden, {
                'type': 'hidden',
                'id': dropdownId,
                'class': 'ps-dropdown-value',
                'name': selectArray[i].name,
                'value': selectArray[i].options[k].value
            });*/

            // Create the dropdown-options-wrapper node
            optionsWrapper = document.createElement('div');
            setAttributes(optionsWrapper, {
                'class': 'ps-dropdown-options-wrapper'
            });

            // Loop through options and add to dropdown-options-wrapper
            for (j = 0; j < selectArray[i].options.length; ++j) {
                optionNode = document.createElement('div');
                setAttributes(optionNode, {
                    'class': 'ps-dropdown-option',
                    'data-value': selectArray[i].options[j].value,
                    'data-dropdown-id': dropdownId
                });
                optionNode.innerHTML = selectArray[i].options[j].text;
                optionNode.addEventListener('click', clickOption);
                optionsWrapper.appendChild(optionNode);
            }

            // Append all child nodes to the dropdown-wrapper node
            dropdown.appendChild(display);
            dropdown.appendChild(icon);
            //dropdown.appendChild(hidden);
            dropdown.appendChild(optionsWrapper);

            // Replace select with dropdown
            selectArray[i].parentElement.replaceChild(dropdown, selectArray[i]);
        }
    };

    // Function that executes when an option is clicked
    function clickOption() {

        // Retrieve dropdownId
        var dropdownId = this.getAttribute('data-dropdown-id');

        // Set hidden field to value and display field to text
        document.querySelector('#' + dropdownId).value = this.getAttribute('data-value');
        document.querySelector('#' + dropdownId + '-display').innerHTML = this.innerHTML;
    }

    // Function that displays the options-wrapper
    function showOptions(e) {

        // Stop click propagation to prevent immediate closure
        e.stopPropagation();

        // Retrieve options-wrapper
        var optionsWrapper = document.querySelector('#' + e.currentTarget.id + ' > .ps-dropdown-options-wrapper');

        // Display options-wrapper and add classes for fade in
        optionsWrapper.style.display = 'block';
        optionsWrapper.classList.remove('ps-dropdown-fade-out');
        optionsWrapper.classList.add('ps-dropdown-fade-in');

        // Remove the showOptions click event listener from the dropdown-wrapper element
        e.currentTarget.removeEventListener('click', showOptions);

        // Add a hideOptions click event listener to the window
        window.addEventListener('click', hideOptions);
    }

    // Function that hides all open options-wrappers
    function hideOptions(e) {

        // Stop click propagation to preven reopening
        e.stopPropagation();

        // Retrieve array of all open options-wrappers
        var optWrappers = document.querySelectorAll('.ps-dropdown-fade-in');

        // Loop through options-wrappers and remove
        for (var i = 0; i < optWrappers.length; ++i) {

            // Retrieve option-wrapper
            var opt = optWrappers[i];

            // Adjust classes to fade out options-wrapper
            opt.classList.remove('ps-dropdown-fade-in');
            opt.classList.add('ps-dropdown-fade-out');

            // Set timeout to remove option-wrapper after fade out is complete
            setTimeout(function() {
                opt.style.display = 'none';
            }, 250);

            // Add click event listner to dropdown-wrapper and remove from window
            optWrappers[i].parentElement.addEventListener('click', showOptions);
            window.removeEventListener('click', hideOptions);
        }

    }

    // Helper function to generate a random ID
    function generateId(length) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';

        for (length; length > 0; --length) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

    // Helper function to set the provided attributes for an element
    function setAttributes(elem, attr) {
        for (var prop in attr) {
            if (prop == 'style' && typeof attr[prop] === 'object') {
                for (var style in attr[prop]) {
                    elem.style[style] = attr[prop][style];
                }
            } else {
                elem.setAttribute(prop, attr[prop]);
            }
        }
    }
}