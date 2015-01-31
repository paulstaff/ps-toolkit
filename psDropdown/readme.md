PS Dropdown - v0.9.3
====================

PS Dropdown provides an alternative to standard HTML select elements. It converts all select elements with the class `psDropdown` to custom `psDropdown` elements that consist of a readonly text element and a list of options. To use this javascript plugin, simply include the `psDropdown.js` and `psDropdown.css` files and add the `psDropdown` class to all select elements.

### Example

Here is a standard select input:

<select>
    <option value="1">This is an Option</option>
    <option value="2">Another Option</option>
    <option value="3">Option the Third</option>
</select>

Here is an alternative psDropdown select input:

<select class="psDropdown">
    <option value="1">This is an Option</option>
    <option value="2">Another Option</option>
    <option value="3">Option the Third</option>
</select>

### Version Updates

- Added default arrow dropdown icon to make display look more like traditional select element
- Added options to set dropdown icon as a chevron or no icon
- Fixed bug that closed and then re-opened dropdown list upon clicking input
- Renamed classes and functions for consistency with other PS Toolkit components


Installation
------------


### Prerequisites

- jQuery 2.0+ is required to run all PSToolkit plugins

### Instructions

1. Download [psDropdown.zip](http://paulstaff.com/random/PSToolkit/src/psDropdown/psDropdown.zip).
2. Unzip the contents and include the `psDropdown.js` and `psDropdown.css` files in the plugins folder for your project.
3. Include the following two lines in the `<head>` section of your HTML file (be sure to change file path):

	```HTML
	<script src="path/to/plugins/folder/psDropdown.js"></script>
	<link rel="stylesheet" href="path/to/plugins/folder/psDropdown.css">
	```

4. Add the class `psDropdown` to all select elements that you would like to convert:

	```HTML
	<select class="psDropdown">
		<option value="1">This is an Option</option>
        <option value="2">Another Option</option>
        <option value="3">Option the Third</option>
    </select>           
	```

5. Optionally, you can call `psDropdown.convert()` at any point to re-render all select inputs on the page as dropdown inputs (use this after inserting a new select element in the DOM).  This does not affect select inputs already rendered as dropdowns.


Using PS Dropdown
----------------

### Creating `psDropdown` Elements

To create a `psDropdown` element, simply add the class `psDropdown` to a standard HTML `select` element:

```HTML
<select id="mySelectID" class="psDropdown mySelectClass">
	<option value="1">This is an Option</option>
    <option value="2">Another Option</option>
    <option value="3">Option the Third</option>
</select>
```

When `psDropdown.convert()` is run, the `select` element will be replaced with a `psDropdown` element that contains a styled text `input` and and a list of all options. Any other classes and IDs associated with the `select` element will be retained and associated with the new `psDropdown` element. The value of each option will be associated with the `data-val` attribute for each list item while the text of the option will be the text for the list item:

```HTML
<div class="psDropdown">
	<input type="text" id="mySelectID" class="mySelectClass" readonly />
	<ul>
		<li data-val="1">This is an Option</li>
		<li data-val="2">Another Option</li>
		<li data-val="3">Option the Third</li>
	</ul>
</div>
```

### Editing Your `psDropdown` Elements

As explained above, each `psDropdown` element retain all classes/ids associated with the original `select` element, so you are free to style your `psDropdown` elements using custom CSS classes.

Additionally, the `psDropdown.css` file contains a number of different style tags that control the display of each `psDropdown` element, some of which are required to properly render each `psDropdown` element and others that are open for user customization.  Sections that are required are clearly marked with a **Required Styles** comment while sections that are editable are marked with an **Add Custom Styles Here** comment.  (Technically, all style sections are editable, just make sure you know what you're doing first).  An example of the `psDropdown` list element CSS is below:

```CSS
.psDropdown ul li {

   	/* Required Styles */
   	display: block;
   	width: 100%;
   	box-sizing: border-box;
       	-moz-box-sizing: border-box;

   	/* Add Custom Styles Here */
   	padding: 5px 8px 3px 8px;
   	cursor: pointer;
}
```

### Dropdown Input Icon

By default, dropdown elements contain a downward facing arrow to indicate to the user that the element is clickable and will open into a dropdown list (similar to traditional select elements).

In place of the the default arrow, you also have the option to display a chevron or no icon at all.  To do so, simply adjust the `icon` property of the `options` object in `psDropdown.js`:

```Javascript
this.options = {
        icon: "arrow"  // Defaults to "arrow".  Change this to "chevron" to display a chevron or "none" to not display an icon.  Edit icon styles in psDropdown.css
    }
```

To edit the icon style, make adjustments to the `.psDropdown .arrow` or `.psDropdown .chevron` classes in `psDropdown.css`.


Developed By
------------

[Paul Staff](http://paulstaff.com)


License
-------

Copyright (c) 2014 Paul Staff

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

[http://www.apache.org/licenses/LICENSE-2.0](http://www.apache.org/licenses/LICENSE-2.0)

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.