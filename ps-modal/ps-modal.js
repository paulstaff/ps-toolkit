/*
 *
 *  Developer: Paul Staff
 *  Date: 2014.05.16
 *  Edited: 2016.03.19
 *
 *  Copyright (c) 2014 - 2016, nplexity, LLC.  All Rights Reserved.
 *  www.nplexity.com
 *
 *  ps-modal.js
 *
 *
 *  This script instantiates a new ps-modal object that can be used to
 *  display a modal window for displaying custom popup content. Simply
 *  call ps-modal.modalOpen(), provide a title and content, and ps-modal
 *  will display a beautifully formatted modal window.  Customize the
 *  look and feel of the modal window with the psModal.css file.
 *
 *  ps-modal requires jQuery and ps-modal.css to function correctly.
 *
 */

$(document).ready(function() {
    window.psModal = new PsModal();
});

function PsModal() {

    var standardOptions = {
        'header': true,
        'closeModalBack': true,
        'width': '50vw',
        'title': '',
        'content': ''
    };

    this.getStandardOptions = function() {
        return standardOptions;
    };

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
        modalHtml += '<div id="ps-modal-back">';
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

        // Fade in modal window TODO: replace with non-jQuery
        $('#ps-modal-back').fadeIn(150);

        // Initiate callback if applicable
        if (callback !== null && callback !== undefined) {
            callback();
        }
    };

    this.update = function(options, callback) {

        // Reset all options
        options.header = options.header !== undefined ? options.header : standardOptions.header;
        options.closeModalBack = options.closeModalBack !== undefined ? options.closeModalBack : standardOptions.closeModalBack;
        options.width = options.width !== undefined ? options.width : standardOptions.width;
        options.title = options.title !== undefined ? options.title : standardOptions.title;
        options.content = options.content !== undefined ? options.content : standardOptions.content;

        // Set the header if applicable
        if (options.header == true) {
            if (document.querySelector('#ps-modal-header') === null) {
                console.log('undefined');
                var headerHtml = '';

                headerHtml += '        <div id="ps-modal-header">';
                headerHtml += '            <div id="ps-modal-header-title">' + options.title + '</div>';
                headerHtml += '            <div id="ps-modal-header-close">&#xd7;</div>';
                headerHtml += '        </div>';

                document.querySelector('#ps-modal-window').insertAdjacentHTML('afterbegin', headerHtml);
            } else {
                document.querySelector('#ps-modal-header-title').innerHTML = options.title;
            }
        } else if (document.querySelector('#ps-modal-header') !== null) {
            document.querySelector('#ps-modal-window').removeChild(document.querySelector('#ps-modal-header'));
        }

        // Add click event to modal-back and stop propagation if applicable
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

    this.close = function() {
        modalClose();
    };

    function modalClose() {
        document.querySelector('body').removeChild(document.querySelector('#ps-modal-back'));
    }
}