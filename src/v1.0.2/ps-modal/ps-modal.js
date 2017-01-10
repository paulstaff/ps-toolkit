/*
 *
 *  Developer: Paul Staff
 *  Date: 2014.05.16
 *  Edited: 2016.04.03
 *
 *  Copyright (c) 2014 - 2016, nplexity, LLC.  All Rights Reserved.
 *  www.nplexity.com
 *
 *  ps-modal.js
 *
 *
 *  This script instantiates a new ps-modal object that can be used to
 *  display a modal window for displaying custom popup content. Simply
 *  call psModal.open(), provide a title and content, and ps-modal
 *  will display a beautifully formatted modal window.  Customize the
 *  look and feel of the modal window with the ps-modal.css file.
 *
 *  ps-modal requires ps-modal.css to function correctly.
 *
 */

// Initiate ps-modal upon document fully loaded
document.addEventListener("DOMContentLoaded", function(e) {
    window.psModal = new PsModal();
});

function PsModal() {

    // Set the standard options
    var standardOptions = {
        'location': 'body',
        'header': true,
        'closeModalBack': true,
        'displayMethod': 'fade',
        'width': '50vw',
        'title': '',
        'content': ''
    };

    // Function to return the standard options
    this.getStandardOptions = function() {
        return standardOptions;
    };

    // Options variable
    var options = {};

    // Function to create and open a modal window
    this.open = function(newOptions, callback) {

        options = newOptions;

        console.log('here');
        console.log(newOptions);
        console.log(callback);

        // Reset all options
        options.header = options.header !== undefined ? options.header : standardOptions.header;
        options.closeModalBack = options.closeModalBack !== undefined ? options.closeModalBack : standardOptions.closeModalBack;
        options.width = options.width !== undefined ? options.width : standardOptions.width;
        options.title = options.title !== undefined ? options.title : standardOptions.title;
        options.content = options.content !== undefined ? options.content : standardOptions.content;

        // Instantiate modalHtml
        var modalHtml = '';

        // Add modal-back and modal-window
        modalHtml += '<div id="ps-modal-back" class="ps-modal-fade-in testClass">';
        modalHtml += '    <div id="ps-modal-window" class="ps-modal-' + options.displayMethod + '-in">';

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
        document.querySelector(options.location).insertAdjacentHTML('beforeend', modalHtml);

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

        document.querySelector('#ps-modal-window').classList.remove('ps-modal-' + options.displayMethod + '-in');
        document.querySelector('#ps-modal-window').classList.add('ps-modal-' + options.displayMethod + '-out');

        // Remove the modal-back element after fade out is complete
        setTimeout(function() {
            document.querySelector('body').removeChild(document.querySelector('#ps-modal-back'));
        }, 250);
    };
}