react-typescript-definitions
============================

React.d.ts, file with ambient type declarations for working with Facebook React.
It is also namespaced:

``` coffeescript
var component: React.Component = React.CreateClass({
  render: () => {
    return React.DOM.h2(null, "Hello world...");
  }
});
```

With typings for React 0.10.0 and TS 1.0, but it’s kinda incomplete, so **pull requests are welcome**.

Based on TodoMVC sample by @fdecampredon, improved by @wizzard0, MIT licensed, and tweaked by @akonwi.
