/*
 *
 *  Developer: Paul Staff
 *  Date: 2015.01.31
 *
 *  Copyright (c) 2015, nplexity, LLC.  All Rights Reserved.
 *  www.nplexity.com
 *
 *  psToast.js
 *
 *
 *  This script instantiates a new psToast object that can be used to
 *  display a toast overlay for displaying custom popup content. Simply
 *  call psToast.toast(), provide content, and psToast will display a
 *  beautifully formatted toast overlay.  Customize the look and feel
 *  of the toast overalay with the psToast.css file.
 *
 *  psToast requires jQuery and psToast.css to function correctly.
 *
 */

$(document).ready(function() {
    window.psToast = new psToast();
});

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