PS Modal - v1.0.1
=================

PS Modal provides an easy-to-use modal window that displays beautifully cross-browser (well, it might not have been tested in IE, but does anyone really use IE?).  Generating a modal with PS Modal involves calling one function--it's that simple!

### Example

Click the button below to open an example modal window:

<div class="btn" id="exampleBtn">Open Modal</div>

### Version Updates

- Renamed classes and functions for consistency with other PS Toolkit components
- Created a standalone test page
- Updated center screen positioning
- Ensured that content will not cause the modal window to move off screen
- Added the option of a callback function
- Refactored to function solely with standard Javascript
- Added several new options
- Updated the CSS styling to more modern standards (still customizable)


Installation
------------


### Prerequisites

- No prerequisites are currently needed for PS Modal. As of version 1.0.1, jQuery is no longer required.

### Instructions

1. Download [ps-modal.zip](http://paulstaff.com/random/ps-toolkit/src/v1.0.1/ps-modal/ps-modal.zip).
2. Unzip the contents and include the `ps-modal.js` and `ps-modal.css` files in the plugins folder for your project.
3. Include the following two lines in the `<head>` section of your HTML file (be sure to change file path):

	```HTML
	<script src="path/to/plugins/folder/ps-modal.js"></script>
	<link rel="stylesheet" href="path/to/plugins/folder/ps-modal.css">
	```

4. Create `options`, and `callback` (optional) variables to populate the modal window. It is recommended that you first populate the `options` object via `psModal.getStandardOptions()` before adjusting any properties.  HTML can be passed in as the `content` property of `options` to create a custom modal window:

	```Javascript

 	var options = psModal.getStandardOptions();

    options.title = 'This is a Title';
    options.header = true;
    options.closeModalBack = true;

    options.content = '';
    options.content += '<div class="ps-modal-item">This is content for the modal window. The button below is styled according to the CSS of the page in which it is found.</div>';
    options.content += '<div id="ps-modal-footer">';
    options.content += '    <div class="test-btn" id="modal-close-btn">Close</div>';
    options.content += '</div>';

    var callback = function() {
        document.querySelector('#modal-close-btn').addEventListener('click', function() {
            psModal.close();
        });
    };

	```

5. Call `psModal.open()` with the variables created above to generate the modal window:

	```Javascript
	psModal.open(options, callback);
	```


Using PS Modal
--------------


### Variables to Create a Modal Window

#### `options` Variable

The `options` variable is an object that allows information to be passed into the modal window.

- `header` - determines whether a header is displayed on the modal window (boolean)
- `closeModalBack` - determines whether clicking on the background behind the modal closes the modal window (boolean)
- `width` - sets the width of the modal window (must be in CSS units)
- `title` - sets the text of the header title; will not display if `header` is set to `false` (string, should be text)
- `content` - sets the HTML content of the modal window (string, should be HTML)

There are number of preset elements designed and styled specifically to be used in the `content` option.  `content` can include any of these elements as well as any custom elements you wish to include.  Preset elements are as follows:

* `ps-modal-item` - a standard `div` with appropriately styled margins and padding for PSModal.
* `ps-modal-footer` - a `div` to be used at the bottom of the modal window; includes a dividing line at the top along with appropriate margins and padding.

The standard default options properties are set as follows:

```Javascript
var standardOptions = {
    'header': true,
    'closeModalBack': true,
    'width': '50vw',
    'title': '',
    'content': ''
};
```


#### `callback` Variable

The `callback` variable allows a callback function to be passed into either the `psModal.open()` or `psModal.update()` functions to be executed once the modal window has been created or updated.


### Modal Functions

- `psModal.getStandardOptions()` - returns an `options` object with the default standard values
- `psModal.open(options, callback)` - function to open a new modal window
- `psModal.update(options, callback)` - function to update an existing modal window
- `psModal.close()` - function to close the modal window


### Editing Your Modal Window

As explained above, the modal body will render custom HTML elements from the `content` property of the `options` object, which allows you to control what the modal displays.  If you would like more control, you are able to edit the `ps-modal.css` file to change the style of the modal itself.

In `ps-modal.css`, sections that are required are clearly marked with a **Required Styles** comment while sections that are editable are marked with an **Add Custom Styles Here** comment.  (Technically, all style sections are editable, just make sure you know what you're doing first).  An example of the `ps-modal-window` element CSS is below:

```CSS
#ps-modal-window {

   	/* Required Styles */
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2000;

    /* Add Custom Styles Here */
    background: none repeat scroll 0 0 #FFFFFF;
    border-radius: 2px;
    box-shadow: 10px 10px 35px -5px rgba(0,0,0,0.50);

}
```


Developed By
------------

[Paul Staff](http://paulstaff.com)


License
-------

Copyright (c) 2014-2016 Paul Staff

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.