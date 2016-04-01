/*
 *
 *  Programmer: Paul Staff
 *  Created: 2015.01.31
 *  Edited: 2016.03.21
 *
 *  Copyright (c) 2014 - 2016, nplexity, LLC.  All Rights Reserved.
 *  www.nplexity.com
 *
 *  ps-toolkit.js
 *
 *  v 1.0.1
 *
 *  This script is a combined version of all PS Toolkit components.
 *
 */

$(document).ready(function() {
    window.psDropdown = new PsDropdown;
    window.psModal = new PsModal();
    window.psToast = new PsToast();
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

function PsModal() {

    // Set the standard options
    var standardOptions = {
        'header': true,
        'closeModalBack': true,
        'width': '50vw',
        'title': '',
        'content': ''
    };

    // Function to return the standard options
    this.getStandardOptions = function() {
        return standardOptions;
    };

    // Function to create and open a modal window
    this.open = function(options, callback) {

        // Reset all options
        options.header = options.header !== undefined ? options.header : standardOptions.header;
        options.closeModalBack = options.closeModalBack !== undefined ? options.closeModalBack : standardOptions.closeModalBack;
        options.width = options.width !== undefined ? options.width : standardOptions.width;
        options.title = options.title !== undefined ? options.title : standardOptions.title;
        options.content = options.content !== undefined ? options.content : standardOptions.content;

        // Instantiate modalHtml
        var modalHtml = '';

        // Add modal-back and modal-window
        modalHtml += '<div id="ps-modal-back" class="ps-modal-fade-in">';
        modalHtml += '    <div id="ps-modal-window">';

        // Add header if applicable
        if (options.header == true) {
            modalHtml += '        <div id="ps-modal-header">';
            modalHtml += '            <div id="ps-modal-header-title">' + options.title + '</div>';
            modalHtml += '            <div id="ps-modal-header-close">&#xd7;</div>';
            modalHtml += '        </div>';
        }

        // Add content and close out modal-window and modal-back
        modalHtml += '        <div id="ps-modal-body">' + options.content + '</div>';
        modalHtml += '    </div>';
        modalHtml += '</div>';

        // Insert modalHtml into the DOM
        document.querySelector('body').insertAdjacentHTML('beforeend', modalHtml);

        // Add click event to header close button if applicable
        if (options.header == true) { document.querySelector('#ps-modal-header-close').addEventListener('click', psModal.close); }

        // Add click event to modal-back and stop propagation if applicable
        if (options.closeModalBack != false) {
            document.querySelector('#ps-modal-back').addEventListener('click', psModal.close);
            document.querySelector('#ps-modal-window').addEventListener('click', function(e) { e.stopPropagation() });
        }

        // Set width of modal-window
        document.querySelector('#ps-modal-window').style.width = options.width;

        // Initiate callback if applicable
        if (callback !== null && callback !== undefined) {
            callback();
        }
    };

    // Function to update existing modal window
    this.update = function(options, callback) {

        // Reset all options
        options.header = options.header !== undefined ? options.header : standardOptions.header;
        options.closeModalBack = options.closeModalBack !== undefined ? options.closeModalBack : standardOptions.closeModalBack;
        options.width = options.width !== undefined ? options.width : standardOptions.width;
        options.title = options.title !== undefined ? options.title : standardOptions.title;
        options.content = options.content !== undefined ? options.content : standardOptions.content;

        // Set the header if applicable
        if (options.header == true) {

            // If header does not currently exist, add it
            if (document.querySelector('#ps-modal-header') === null) {
                var headerHtml = '';

                headerHtml += '        <div id="ps-modal-header">';
                headerHtml += '            <div id="ps-modal-header-title">' + options.title + '</div>';
                headerHtml += '            <div id="ps-modal-header-close">&#xd7;</div>';
                headerHtml += '        </div>';

                document.querySelector('#ps-modal-window').insertAdjacentHTML('afterbegin', headerHtml);

                // If header does exist, update title
            } else {
                document.querySelector('#ps-modal-header-title').innerHTML = options.title;
            }

            // If header option has been changed to false, remove header
        } else if (document.querySelector('#ps-modal-header') !== null) {
            document.querySelector('#ps-modal-window').removeChild(document.querySelector('#ps-modal-header'));
        }

        // Add click event to modal-back and stop propagation if applicable, else remove
        if (options.closeModalBack != false) {
            document.querySelector('#ps-modal-back').addEventListener('click', psModal.close);
            document.querySelector('#ps-modal-window').addEventListener('click', function(e) { e.stopPropagation() });
        } else {
            document.querySelector('#ps-modal-back').removeEventListener('click', psModal.close);
        }

        // Update content
        document.querySelector('#ps-modal-body').innerHTML = options.content;

        // Set width of modal-window
        document.querySelector('#ps-modal-window').style.width = options.width;

        // Initiate callback if applicable
        if (callback !== null && callback !== undefined) {
            callback();
        }
    };

    // Function to close the modal window
    this.close = function() {

        // Change CSS to fade out
        document.querySelector('#ps-modal-back').classList.remove('ps-modal-fade-in');
        document.querySelector('#ps-modal-back').classList.add('ps-modal-fade-out');

        // Remove the modal-back element after fade out is complete
        setTimeout(function() {
            document.querySelector('body').removeChild(document.querySelector('#ps-modal-back'));
        }, 250);
    };
}

function PsToast() {

    this.toast = function(message, duration) {

        // Generate an ID for the toast
        var toastId = generateId(20);

        // Create toast element
        var toast = document.createElement('div');
        toast.id = toastId;
        toast.className = 'ps-toast ps-fade-in';
        toast.innerHTML = message;

        // If toast-container does not exist, create it and add to document body
        if (!document.getElementById('ps-toast-container')) {
            var container = document.createElement('div');
            container.id = 'ps-toast-container';
            document.body.appendChild(container);
        }

        // Append toast to toast-container
        document.getElementById('ps-toast-container').appendChild(toast);

        // Set toast duration timeout
        setTimeout(function() {

            // Remove fade-in class and add fade-out class
            toast.classList.remove('ps-fade-in');
            toast.classList.add('ps-fade-out');

            // Set timeout to remove toast
            setTimeout(function() {
                document.getElementById('ps-toast-container').removeChild(toast);
            }, 250);

        }, duration);
    };

    // Helper function to generate a random ID
    function generateId(length) {
        var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';

        for (length; length > 0; --length) result += chars[Math.floor(Math.random() * chars.length)];
        return result;
    }

}