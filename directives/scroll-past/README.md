# Scroll Past Directive
---
Adds a class to an element when the window scrolls past it's top edge.

### Requires:
[Lodash](https://lodash.com/) `npm i --save lodash`
### Usage:

```html
<div scrollPast scrollPastClass="stick"></div>
```
The optional `scrollPastClass` attribute adds that class name to the element after it's top edge has left the window. The default class name is `off-screen`.
