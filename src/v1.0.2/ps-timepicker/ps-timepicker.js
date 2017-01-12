/*
 *
 * Programmer: Paul Staff
 * Created: 2017.01.09
 *
 * Copyright (c) 2014 - 2017, nplexity, LLC.  All Rights Reserved.
 * www.nplexity.com
 *
 * ps-timepicker.js
 *
 * v 1.0.2
 *
 *
 * This script converts all input elements with the class 'ps-timepicker'
 * to custom timepicker elements that can be fully styled with CSS.
 *
 *
 */

// Initiate ps-timepicker upon document fully loaded
document.addEventListener("DOMContentLoaded", function(e) {
    console.log('initiated');

    window.psTimepicker = new PsTimepicker();

    psTimepicker.convert();
});

function PsTimepicker () {

    // Function to convert all input elements with the class of 'ps-timepicker' to ps-timepicker elements
    this.convert = function() {

        // Retrieve all input elements with the class of 'ps-timepicker'
        var inputArray = document.querySelectorAll('input.ps-timepicker');

        // Initialize variables for creating ps-timepicker elements
        var timepickerId;
        var timepicker;
        var input;
        var display;

        // Loop through all input elements and convert to ps-timepicker elements
        for (var i = 0; i < inputArray.length; ++i) {

            // Set the timepickerId if available; otherwise generate randomly
            timepickerId = inputArray[i].id != '' ? inputArray[i].id : generateId(10);

            // Create the timepicker-wrapper node
            timepicker = document.createElement('div');
            setAttributes(timepicker, {
                'id': timepickerId,
                'class': inputArray[i].className,
                'data-timepicker-id': timepickerId,
                'name': inputArray[i].name
            });
            timepicker.value = inputArray[i].value;
            timepicker.addEventListener('click', timepickerClick);

            // Create the text input node
            input = document.createElement('input');
            setAttributes(input, {
                'type': 'text',
                'value': inputArray[i].value,
                'placeholder': '12:00 AM',
                'maxlength': 8
            });
            // TODO: add this back in
            input.addEventListener('input', timeMask);

            // Create the timepicker-display node
            display = document.createElement('div');
            setAttributes(display, {
                'id': timepicker + '-display',
                'class': 'ps-timepicker-display'
            });
            display.innerHTML = '';

            // Append all child nodes to the dropdown-wrapper node
            timepicker.appendChild(input);
            timepicker.appendChild(display);

            // Replace select with dropdown
            inputArray[i].parentElement.replaceChild(timepicker, inputArray[i]);
        }
    };

    // Function triggered when timepicker is clicked
    function timepickerClick(e) {
        // Stop click propagation to prevent immediate closure
        e.stopPropagation();

        // Close all open timepickers
        timepickerClose();

        // Open timepicker based on the element clicked
        timepickerOpen(e.currentTarget.id);
    }

    // Function that displays the timepicker
    function timepickerOpen(id) {

        // Retrieve timepicker
        var timepicker = document.getElementById(id);

        // Display datepicker and add classes for fade in
        var display = timepicker.querySelector('.ps-timepicker-display');

        var html = '';

        html += '<div class="t-row">';
        html += '   <div class="t-btn t-h-up">&#xf106;</div>';
        html += '   <div class="t-colon"></div>';
        html += '   <div class="t-btn t-m-up">&#xf106;</div>';
        html += '   <div class="t-space"></div>';
        html += '</div>';
        html += '<div class="t-row">';
        html += '   <div class="t-out t-hour">12</div>';
        html += '   <div class="t-colon">:</div>';
        html += '   <div class="t-out t-min">00</div>';
        html += '   <div class="t-btn t-ampm">PM</div>';
        html += '</div>';
        html += '<div class="t-row">';
        html += '   <div class="t-btn t-h-down">&#xf107;</div>';
        html += '   <div class="t-colon"></div>';
        html += '   <div class="t-btn t-m-down">&#xf107;</div>';
        html += '   <div class="t-space"></div>';
        html += '</div>';

        display.innerHTML = html;

        getTime(id);

        display.querySelector('.t-h-up').addEventListener('click', function() { hourIncrement(id, 1); });
        display.querySelector('.t-h-down').addEventListener('click', function() { hourIncrement(id, -1); });
        display.querySelector('.t-m-up').addEventListener('click', function() { minIncrement(id, 5); });
        display.querySelector('.t-m-down').addEventListener('click', function() { minIncrement(id, -5); });
        display.querySelector('.t-ampm').addEventListener('click', function() { toggleAMPM(id); });

        display.style.display = 'inline-block';
        display.classList.remove('ps-timepicker-fade-out');
        display.classList.add('ps-timepicker-fade-in');

        // Remove the timepickerClick click event listener from the timepicker
        timepicker.removeEventListener('click', timepickerClick);

        timepicker.addEventListener('click', function(e) { e.stopPropagation(); });

        // Add a hideOptions click event listener to the window
        window.addEventListener('click', timepickerCancel);
    }

    // Function to increment the minute
    function minIncrement(id, i) {

        var displayMin = document.querySelector('#' + id + ' .t-min');
        var m = parseInt(displayMin.innerHTML);

        m = m + i;

        if (m > 59) {
            m = m - 60;
            hourIncrement(id, 1);
        } else if (m < 0) {
            m = m + 60;
            hourIncrement(id, -1);
        }

        displayMin.innerHTML = m < 10 ? '0' + m : m;
        setTime(id);
    }

    // Function to increment the hour
    function hourIncrement(id, i) {

        var displayHour = document.querySelector('#' + id + ' .t-hour');
        var h = parseInt(displayHour.innerHTML);

        h = h + i;
        h = h > 12 ? h - 12 : h;
        h = h < 1 ? h + 12 : h;

        if ((h == 11 && h - i == 12) || (h == 12 && h - i == 11)) {
            toggleAMPM(id);
        }

        displayHour.innerHTML = h;
        setTime(id);
    }

    // Function to toggle AM/PM
    function toggleAMPM (id) {

        var displayAMPM = document.querySelector('#' + id + ' .t-ampm');
        displayAMPM.innerHTML = displayAMPM.innerHTML == 'AM' ? 'PM' : 'AM';
        setTime(id);
    }

    // Function to convert the time string in the input to
    function getTime(id) {

        var t = document.querySelector('#' + id);
        var timeString = t.querySelector('input').value == '' ? '12:00 PM' : t.querySelector('input').value;

        t.querySelector('.t-hour').innerHTML = timeString.match(/^\d\d/);
        t.querySelector('.t-min').innerHTML = timeString.substr(3,2);
        t.querySelector('.t-ampm').innerHTML = timeString.match(/\D\D$/);
    }

    // Function to set the time in the timepicker input
    function setTime(id) {

        var t = document.querySelector('#' + id);
        var input = t.querySelector('input');
        var m = t.querySelector('.t-min').innerHTML;
        var h = t.querySelector('.t-hour').innerHTML;
        var a = t.querySelector('.t-ampm').innerHTML;

        input.value = h + ':' + m + ' ' + a;

        var timestamp = a == 'PM' ? (parseInt(h) + 11) * 3600000 : (parseInt(h) - 1) * 3600000;
        timestamp = timestamp + parseInt(m) * 60000;

        t.setAttribute('data-timestamp', timestamp);
    }

    // Function to cancel the timepicker
    function timepickerCancel(e) {

        // Stop click propagation to prevent immediate closure
        e.stopPropagation();

        // Close timepicker
        timepickerClose();
    }

    // Function that hides all open timepickers
    function timepickerClose() {
        
        // Retrieve array of all open timepickers
        var timepickers = document.querySelectorAll('.ps-timepicker-fade-in');

        // Loop through timepickers and remove
        for (var i = 0; i < timepickers.length; ++i) {

            // Retrieve timepicker
            var t = timepickers[i];

            // Adjust classes to fade out options-wrapper
            t.classList.remove('ps-timepicker-fade-in');
            t.classList.add('ps-timepicker-fade-out');

            // Set timeout to remove option-wrapper after fade out is complete
            setTimeout((function() {
                t.style.display = 'none';
            })(), 250);

            // Add click event listner to wrapper and remove from window
            t.parentElement.addEventListener('click', timepickerClick);
            window.removeEventListener('click', timepickerCancel);
        }
    }


    // Helper function to force a time input mask
    function timeMask(e) {
        e.target.value = timeFormat(e.target.value);
    }

    // Helper function to format a string input as a time
    function timeFormat(t) {

        // Capitalize all 'a', 'p', and 'm' characters
        t = t.replace(/a/, "A");
        t = t.replace(/p/, "P");
        t = t.replace(/m/, "M");

        // Remove any non digit, ':', or 'APM' characters
        t = t.replace(/[^\d:APM]/g,"");

        // Ensure that there is only one instance of ':'
        t = t.replace(':', 'XXX')
            .replace(/\:/g, '')
            .replace('XXX', ':');

        // If the first character is not a 1 or 0, insert 0 at the beginning
        t = t.replace(/^([^0-1])/, "0$&");
        t = t.replace(/^(.):/, "0$&");

        // Add a colon if not typed
        t = t.replace(/^(\d\d)(\d)/, "$1:$2");

        // Add space after time
        t = t.replace(/^(\d\d:\d\d)([PA])/, "$1 $2");

        t = t.replace(/^(\d\d)([PA])/, "$1:00 $2M");

        // Remove any additional 'A' or 'P' characters
        t = t.replace('A', 'XXX')
            .replace(/\A/g, '')
            .replace('XXX', 'A');

        t = t.replace('P', 'XXX')
            .replace(/\P/g, '')
            .replace('XXX', 'P');

        return t;
    }

    // Helper function to format a string input as a date
    function dateFormat(d) {
        // Replace non-numeric characters
        d = d.replace(/[^0-9\/]/g, '');

        // Pad month with preceding '0'
        d = /^\d\//.test(d) ? '0' + d : d;

        // Add / following month
        d = d.length > 2 && d.charAt(2) != '/' ? d.substring(0,2) + '/' + d.substring(2) : d;

        // Pad date with preceding '0'
        d = /^\d{1,2}\/\d\//.test(d) ? d.match(/^\d{1,2}\//) + '0' + d.replace(/^\d{1,2}\//,'') : d;

        // Add / following date
        d = d.length > 5 && d.charAt(5) != '/' ? d.substring(0,5) + '/' + d.substring(5) : d;

        // Limit at 10 characters and return
        return d.substr(0,10);
    }

    // Helper function to return a date string
    function getDateString(date) {
        return dateFormat((date.getMonth() + 1) + '/' + date.getDate() + '/' + date.getFullYear());
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




