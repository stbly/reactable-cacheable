# Reactable Cacheable

A React table building class based on Glittershark's awesome [Reactable](https://github.com/glittershark/reactable), with one key difference: caching of data and rows when sorting. 

I found that, as I started building custom table cells that contained other React components, sorting tables became a slow process, as the rows and their cells were being rebuilt on each sort. Reactable Cacheable saves and indexes the rows after it creates them so that, when no data in the table has changed, React can just use the existing row component instead of creating a whole new one.

This fills a pretty niche need, as plain text cells render extremely fast with the parent Reactable class, but it does help with sorting speeds. 

## Installation

```sh
npm install [--save] reactable-cacheable
```

Raw JS [here][https://github.com/stbly1/reactable-cacheable/raw/master/build/].

You'll also need a version of [React (0.14) or later](http://facebook.github.io/react/downloads.html).

## Usage

For detailed usage of Reactable, you'll want to check out the documentation [here](https://github.com/glittershark/reactable#usage). Reactable Cacheable uses the exact same syntax; you're just importing a different class. See below:

```jsx
import CacheableTable from 'reactable-cacheable'
ReactDOM.render(
    <CacheableTable className="table" data={[
        { foo: bar },
        { foo: baz },
        { foo: etc },
    ]} />,
    document.getElementById('table')
);
```

Be sure to check out the aforementioned documentation; Reactable allows you some pretty nice customization for sorting and filtering. 

## Anything else?

I built this to solve a need on a project I was working on, so bugs and other problems may very well be in here. Please let me know if you encounter any issues. Happy sorting!