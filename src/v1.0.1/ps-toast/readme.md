PS Toast - v1.0.1
=================

PS Toast creates a simple toast popup message that displays cleanly across all browsers.

### Example

Click the button below to create an example toast message:

<div class="btn" onclick="psToast.toast('This is a test toast!', 3000)">Toast</div>

### Version Updates

- Renamed classes and functions for consistency with other PS Toolkit components
- Created a standalone test page
- Refactored to function solely with standard Javascript, removing the requirement for jQuery


Installation
------------


### Prerequisites

- No prerequisites are currently needed for PS Toast. As of version 1.0.1, jQuery is no longer required.

### Instructions

1. Download [ps-toast.zip](http://paulstaff.com/random/ps-toolkit/src/ps-toast/ps-toast.zip).
2. Unzip the contents and include the `ps-toast.js` and `ps-toast.css` files in the plugins folder for your project.
3. Include the following two lines in the `<head>` section of your HTML file (be sure to change file path):

	```HTML
	<script src="path/to/plugins/folder/ps-toast.js"></script>
	<link rel="stylesheet" href="path/to/plugins/folder/ps-toast.css">
	```

4. Call `psToast.toast()` with your toast message and a duration in milliseconds:

	```Javascript
	psToast.toast('This is the toast message!', 3000);
	```


Using psToast
-------------

### Styling Your PS Toast Messages

By default, PS Toast messages are fixed to the bottom of the window and display with a blue transparent background. You can adjust the formatting for your PS Toast messages by editing the `ps-toast.css` file or by creating your own CSS stylesheet.


Developed By
------------

[Paul Staff](http://paulstaff.com)



License
-------

Copyright (c) 2015 Paul Staff

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.