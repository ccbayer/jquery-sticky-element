# jQuery Sticky Element Plugin

# Overview

A utility that simply adds / removes a class once the user has scrolled beyond a certain threshold.

The class added is 'is-stuck' - the behavior and design of that element should be determined by css that targets that class, for example:

```
// default values:
.my-element {
	width: 50px;
	position: static
}
// stuck values:
.my-element.is-stuck {
	width: 100%;
	position: absolute;
	top: 0;
}
```

# Usage

Ensure you load `jquery.ui.stickyItem` into your libraries first.

## Options & Default Values

### container
`note: remove this option as it is not used`

Determines where the code should add the '.is-stuck' class.
`beginStick: 0`

### beginStick

Determines where the code should add the '.is-stuck' class.
`beginStick: 0`

### container
`container: $('body')`

### marginAdjust 
If this value is  true, will keep element in a calculated left position relative to parent.
`marginAdjust: 'false'`

### marginLeft:
`note: remove this option as it is not used`
`marginLeft: 0`

### disabled

Simply disables the plugin
`disabled: false`

### bottomStick


`bottomStick: false`


### baseHeight
`baseHeight: 0`

### endStickElement

`endStickElement: false`
