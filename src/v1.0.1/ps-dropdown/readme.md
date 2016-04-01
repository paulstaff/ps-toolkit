PS Dropdown - 1.0.1
====================

PS Dropdown provides an alternative to standard HTML select elements. It converts all select elements with the class `ps-dropdown` to custom `ps-dropdown` elements that consist of a readonly div element and a list of options. To use this javascript plugin, simply include the `ps-dropdown.js` and `ps-dropdown.css` files and add the `ps-dropdown` class to all select elements.

### Example

Here is a standard select input:

<select>
    <option value="1">This is an Option</option>
    <option value="2">Another Option</option>
    <option value="3">Option the Third</option>
</select>

Here is an alternative PS Dropdown select input:

<select class="ps-dropdown">
    <option value="1">This is an Option</option>
    <option value="2">Another Option</option>
    <option value="3">Option the Third</option>
</select>

### Version Updates

- Renamed classes and functions for consistency with other PS Toolkit components
- Removed dependency on jQuery
- Addressed compatibility issues


Installation
------------


### Prerequisites

- The icons used by PS Dropdown elements require the FontAwesome font to be installed. It is included with the download files.

### Instructions

1. Download [ps-dropdown.zip](http://paulstaff.com/random/ps-toolkit/src/v1.0.1/ps-dropdown/ps-dropdown.zip).
2. Unzip the contents and include the `ps-dropdown.js` and `ps-dropdown.css` files as well as the `fontawesome` folder in the plugins folder for your project.
3. Include the following three lines in the `<head>` section of your HTML file (be sure to change file path):

	```HTML
	<script src="path/to/plugins/folder/psDropdown.js"></script>
	<link rel="stylesheet" href="path/to/plugins/folder/psDropdown.css">
	<link rel="stylesheet" type="text/css" href="path/to/plugins/folder/font-awesome-4.5.0/css/font-awesome.min.css">
	```

4. Add the class `ps-dropdown` to all select elements that you would like to convert:

	```HTML
	<select class="ps-dropdown">
		<option value="1">This is an Option</option>
        <option value="2">Another Option</option>
        <option value="3">Option the Third</option>
    </select>           
	```

5. Call the function `psDropdown.setOptions()` if any changes need to be made to the default options.

6. Call the function `psDropdown.convert()` once the page has loaded to convert select elements.

7. Optionally, you can call `psDropdown.convert()` at any point to re-render all select inputs on the page as dropdown inputs (use this after inserting a new select element in the DOM).  This does not affect select inputs already rendered as dropdowns.


Using PS Dropdown
----------------

### Creating `ps-dropdown` Elements

To create a `ps-dropdown` element, simply add the class `ps-dropdown` to a standard HTML `select` element:

```HTML
<select id="mySelectID" name="mySelectName" class="ps-dropdown mySelectClass">
	<option value="1">This is an Option</option>
    <option value="2">Another Option</option>
    <option value="3">Option the Third</option>
</select>
```

When `psDropdown.convert()` is called, the `select` element will be replaced with a `ps-dropdown` element that contains a styled `div` and and a list of all options. Any other classes, name, and ID associated with the `select` element will be retained and associated with the new `ps-dropdown` element. The value of each option will be associated with the `data-value` attribute for each list item while the text of the option will be the text for the list item. A complete `ps-dropdown` element is below:

```HTML
<div id="mySelectID" name="mySelectName" class="ps-dropdown mySelectClass">
	<div id="mySelectID-display" class="ps-dropdown-display">This is an Option</div>
	<div class="ps-dropdown-icon">
	    <i class="fa fa-chevron-down"></i>
	</div>
	<div class="ps-dropdown-options-wrapper">
	    <div class="ps-dropdown-option" data-value="1" data-dropdown-id="mySelectId">This is an Option</div>
	    <div class="ps-dropdown-option" data-value="2" data-dropdown-id="mySelectId">Another Option</div>
	    <div class="ps-dropdown-option" data-value="3" data-dropdown-id="mySelectId">Option the Third</div>
	</div>
</div>
```

If the select element does not have an associated ID, a random ID will be generated for the ps-dropdown element. Please ensure that any ID associated with the select element is actually unique (this is standards compliant, so there should be no issue with this).

### Editing Your `ps-dropdown` Elements

As explained above, each `ps-dropdown` element retains all classes/ids associated with the original `select` element, so you are free to style your `ps-dropdown` elements using custom CSS classes.

Additionally, the `ps-dropdown.css` file contains a number of different style tags that control the display of each `ps-dropdown` element, some of which are required to properly render each `ps-dropdown` element and others that are open for user customization.  Sections that are required are clearly marked with a **Required Styles** comment while sections that are editable are marked with an **Add Custom Styles Here** comment.  (Technically, all style sections are editable, just make sure you know what you're doing first).  An example of the `ps-dropdown` element CSS is below:

```CSS
div .ps-dropdown {

    /* Required Styles */
    display: inline-flex;
    justify-content: space-between;
    position: relative;
    box-sizing: border-box;

    /* Add Custom Styles Here */
    border: 1px solid #CCCCCC;
    border-radius: 2px;
    margin: 10px 0;
    padding: 3px 8px;
    cursor: pointer;
    text-align: left;
    box-shadow: inset 0 0 25px -20px rgba(0,0,0,0.75);

}
```

### Retrieving Dropdown Field Values

Since the ID, name, and classes of each select element are converted

### PS Dropdown Options

In addition to editing the style of elements with the CSS page, there are standard options for dropdown elements that may be adjusted before the dropdown elements are rendered. These options are adjusted by passing in an object of key-value pairs to the `psDropdown.setOptions()` function. The options currently available to edit are as follows:

```Javascript
psDropdown.setOptions({
    'icon': 'chevron-down'
});
```

#### Dropdown Icon

By default, dropdown elements contain a downward facing chevron to indicate to the user that the element is clickable and will open into a dropdown list (similar to traditional select elements).

This chevron is an icon rendered from the FontAwesome font and can be changed to any of the FontAwesome icons by setting the `icon` property of the options object. A full list of the icons available for use can be found on the [FontAwesome website](https://fortawesome.github.io/Font-Awesome/icons/). Simply use the name of the desired icon as the `icon` property:

In place of the the default arrow, you also have the option to display a chevron or no icon at all.  To do so, simply adjust the `icon` property of the `options` object in `psDropdown.js`:

```Javascript
psDropdown.setOptions({
    'icon': 'chevron-down'
});
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