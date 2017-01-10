PS Datepicker - v1.0.2
=================

PS Datepicker provides a datepicker popup that allows the user to select a date value and is easily implementable across browsers (well, it might not have been tested in IE, but does anyone really use IE?).  Generating a datepicker with PS Datepicker involves calling one function--it's that simple!

### Example

Click the input below to open an example datepicker and select a date:

<div class="test-input"><input type="text" class="ps-datepicker" /></div>

### Version Updates

- Initial version of PS Datepicker


Installation
------------


### Prerequisites

- No prerequisites are currently needed for any PS Toolkit plugins. As of version 1.0.1, jQuery is no longer required.

### Instructions

1. Download [ps-datepicker.zip](http://paulstaff.com/random/ps-toolkit/src/v1.0.2/ps-datepicker/ps-datepicker.zip).
2. Unzip the contents and include the `ps-datepicker.js` and `ps-datepicker.css` files in the plugins folder for your project.
3. Ensure that you have [FontAwesome](http://fontawesome.io) included in your project or the icons will not display properly.
4. Include the following two lines in the `<head>` section of your HTML file (be sure to change file path):

	```HTML
	<script src="path/to/plugins/folder/ps-datepicker.js"></script>
	<link rel="stylesheet" href="path/to/plugins/folder/ps-datepicker.css">
	```

5. Add the `ps-datepicker` class to any input that you would like to convert to a datepicker.


Using PS Datepicker
-------------------

### Options

There are currently no editable options for PS Datepicker, as this tool is still an initial release. Additional optionality will be added in the future, but for now, feel free to make any changes necessary to the source code.


### Editing Your Datepicker

The `ps-datepicker.css` file controls the look and feel of the datepicker. In this CSS file, sections that are required are clearly marked with a **Required Styles** comment while sections that are editable are marked with an **Add Custom Styles Here** comment.  (Technically, all style sections are editable, just make sure you know what you're doing first).  An example of the `ps-datepicker-display` element CSS is below:

```CSS
#ps-datepicker-display {

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