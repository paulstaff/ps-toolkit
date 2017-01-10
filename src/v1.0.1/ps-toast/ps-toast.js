/*
 *
 *  Developer: Paul Staff
 *  Date: 2015.01.31
 *  Edited: 2016.03.20
 *
 *  Copyright (c) 2015 - 2016, nplexity, LLC.  All Rights Reserved.
 *  www.nplexity.com
 *
 *  ps-toast.js
 *
 *
 *  This script instantiates a new psToast object that can be used to
 *  display a toast overlay for displaying custom popup content. Simply
 *  call psToast.toast(), provide content, and psToast will display a
 *  beautifully formatted toast overlay.  Customize the look and feel
 *  of the toast overlay with the ps-toast.css file.
 *
 */

// Initiate ps-toast upon document fully loaded
document.addEventListener("DOMContentLoaded", function(e) {
    window.psToast = new PsToast();
});

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