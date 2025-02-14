@# Text inputs

Blueprint provides two ways to create a text input:

1. React component: use the `InputGroup` component for an advanced single-line
   input that supports an icon on the left and arbitrary content on the right.
1. CSS only: apply `Classes.INPUT` to an `<input>` or `<textarea>` element to
   style the native HTML tag.

@## Input group

Input groups are a basic building block used to render text inputs across many Blueprint components.
They allow you to add icons and buttons _within_ a text input to expand its appearance and
functionality. For example, you might use an input group to build a visibility toggle for a password
field.

@reactExample InputGroupExample

@### Props

The `InputGroup` React component supports one non-interactive icon on the left
side and one arbitrary element on the right side. Unlike the CSS approach,
`InputGroup` supports _content of any length_ on the right side (not just
icon buttons) because it is able to measure the content and ensure there is
always space for it.

`InputGroup` can be used just like a standard React `input` element, in
a controlled or uncontrolled fashion. In addition to its own props, it supports
all valid props for HTML `<input>` elements and proxies them to that element in
the DOM; the most common ones are detailed below.

If controlled with the `value` prop, `InputGroup` has support for _asynchronous updates_, which may
occur with some form handling libraries like `redux-form`. This is not broadly encouraged (a value
returned from `onChange` should be sent back to the component as a controlled `value` synchronously),
but there is basic support for it using the `asyncControl` prop. Note that the input cursor may jump
to the end of the input if the speed of text entry (time between change events) is faster than the
speed of the async update.

@interface IInputGroupProps

@### CSS

You can place a single `.@ns-icon` or `.@ns-button.@ns-icon-*` on either end of the input. The order is
dictated by the HTML markup: an element specified before the `input` appears on the left edge, and
vice versa. You do not need to apply sizing classes to the children&mdash;they inherit the size of
the parent input.

<div class="@ns-callout @ns-intent-warning @ns-icon-warning-sign">
    <h5 class="@ns-heading">Icons only</h5>

You cannot use buttons with text in the CSS API for input groups. The padding for text inputs
in CSS cannot accommodate buttons whose width varies due to text content. You should use icons on
buttons instead.

Conversely, the [`InputGroup`](#core/components/text-inputs.input-group) React
component _does_ support arbitrary content in its right element.

</div>

@css input-group

@## HTML input

Apply `Classes.INPUT` on an `input[type="text"]`. You should also specify `dir="auto"`
[to better support RTL languages](http://www.w3.org/International/questions/qa-html-dir#dirauto)
(in all browsers except Internet Explorer).

@css input

@## Text area

Use the `<TextArea>` React component, which can be controlled similar to an `<InputGroup>` or `<input>` element.

@reactExample TextAreaExample

Alternatively, you may apply `Classes.INPUT` to a `<textarea>` element.

@css textarea

@interface ITextAreaProps

@## Search field

Changing the `<input>` element's `type` attribute to `"search"` styles it to look like a search
field, giving it a rounded appearance. This style is equivalent to the `.@ns-round` modifier, but it
is applied automatically for `[type="search"]` inputs.

Note that some browsers also implement a handler for the `esc` key to clear the text in a search field.

@css input-search
