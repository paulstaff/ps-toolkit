PS Timepicker - v1.0.2
=================

PS Timepicker provides a timepicker popup that allows the user to easily cycle through and select a time.

### Example

Click the input below to open an example timepicker and select a date:

<div class="exampleInput"><input type="text" class="ps-timepicker" /></div>

### Version Updates

- Initial version of PS Timepicker


Installation
------------


### Prerequisites

- No prerequisites other than the included files are currently needed for any PS Toolkit plugins. As of version 1.0.1, jQuery is no longer required.
- FontAwesome, a free icon font, is required to properly display icons, but is included with the packaged version of PS Timepicker.

### Instructions

1. Download [ps-timepicker.zip](http://paulstaff.com/random/ps-toolkit/src/v1.0.2/ps-timepicker/ps-timepicker.zip).
2. Unzip the contents and include the `ps-timepicker.js` and `ps-timepicker.css` files in the plugins folder for your project.
3. Ensure that you have [FontAwesome](http://fontawesome.io) included in your project or the icons will not display properly.
4. Include the following two lines in the `<head>` section of your HTML file (be sure to change file path):

	```HTML
	<script src="path/to/plugins/folder/ps-timepicker.js"></script>
	<link rel="stylesheet" href="path/to/plugins/folder/ps-timepicker.css">
	```

5. Add the `ps-timepicker` class to any input that you would like to convert to a datepicker.
6. All inputs with the `ps-timepicker` class should be converted to timepickers on page load, but if you need to add new timepickers, simply call `psTimepicker.convert()`.


Using PS Timepicker
-------------------

### Options

There are currently no editable options for PS Timepicker, as this tool is still an initial release. Additional optionality will be added in the future, but for now, feel free to make any changes necessary to the source code.


### Editing Your Timepicker

The `ps-timepicker.css` file controls the look and feel of the timepicker. In this CSS file, sections that are required are clearly marked with a **Required Styles** comment while sections that are editable are marked with an **Add Custom Styles Here** comment.  (Technically, all style sections are editable, just make sure you know what you're doing first).  An example of the `ps-timepicker-display` element CSS is below:

```CSS
.ps-timepicker-display {

    /* Required Styles */
    display: none;
    position: absolute;
    top: 100%;
    left: 0;
    z-index: 10000;

    /* Add Custom Styles Here */
    text-align: center;
    padding: 1em;
    background: #ffffff;
    box-shadow: 0px 0px 12px 2px rgba(100,100,100,0.35);
}
```


Developed By
------------

[Paul Staff](http://paulstaff.com)


License
-------

Copyright (c) 2014-2017 Paul Staff

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.