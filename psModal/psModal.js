/*
 *
 *  Developer: Paul Staff
 *  Date: 2014.05.16
 *  Edited: 2015.01.31
 *
 *  Copyright (c) 2014 - 2015, nplexity, LLC.  All Rights Reserved.
 *  www.nplexity.com
 *
 *  psModal.js
 *
 *
 *  This script instantiates a new psModal object that can be used to
 *  display a modal window for displaying custom popup content. Simply
 *  call psModal.modalOpen(), provide a title and content, and psModal
 *  will display a beautifully formatted modal window.  Customize the
 *  look and feel of the modal window with the psModal.css file.
 *
 *  psModal requires jQuery and psModal.css to function correctly.
 *
 */

$(document).ready(function() {
    window.psModal = new psModal();
});

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