PS Toast - v0.9.1
=================

PS Toast creates a simple toast popup message that displays cleanly across all browsers.

### Example

Click the button below to create an example toast message:

<div class="btn" onclick="psToast.toast('This is a test toast!')">Toast</div>


Installation
------------


### Prerequisites

- jQuery 2.0+ is required to run all PS Toolkit plugins

### Instructions

1. Download [psToast.zip](http://paulstaff.com/random/PSToolkit/src/psToast/psToast.zip).
2. Unzip the contents and include the `ps-toast.js` and `psToast.css` files in the plugins folder for your project.
3. Include the following two lines in the `<head>` section of your HTML file (be sure to change file path):

	```HTML
	<script src="path/to/plugins/folder/ps-toast.js"></script>
	<link rel="stylesheet" href="path/to/plugins/folder/psToast.css">
	```

4. Call `psToast.toast()` with your toast message as the only parameter:

	```Javascript
	psToast.toast('This is the toast message!');
	```


Using psToast
-------------

### Styling Your psToast Messages

By default, psToast messages are fixed to the bottom of the window and display with a blue transparent background. You can adjust the formatting for your psToast messages by editing the `psToast.css` file or by creating your own CSS stylesheet.


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