# new-tag

**`new-tag`** is a web component that creates web components. You can use it as
an easy way to define new custom elements.

Example:

```html
<new-tag tag-name="foo-bar">
  <template>
    <div>foo <slot></slot> bar</div>
  </template>
</new-tag>
<foo-bar><i>baz</i></foo-bar>
```

This should render in your browser as equivalent to:

```html
<div>foo <i>baz</i> bar<div>
```

You can also set attributes that are reflected as properties on the DOM element.
Attributes that aren't identified this way aren't reflected as properties.

```html
<new-tag tag-name="foo-bar" attrs="thing,another"><!-- ... --></new-tag>
<foo-bar id="one" thing="yes" somethingelse="no"></foo-bar>
<script>
const one = document.getElementById('one');
console.log(one.thing === 'yes'); // true
console.log(one.somethingelse === 'no'); // false
</script>
```

## Development

To run the tests, you can do either

```
$ npm test
```

which will run the tests in a headless browser, or

```
$ npm run test-browser
```

which will open a new browser tab on your desktop with tests results.

## License

MIT License. See LICENSE.txt
