React training
==============

Random
------

- Webpack is what watches the directory and republisheds updated files
- Instead of MVC, he tends to think of State, Markup and Behaviour
- `this.setState(...)` will always force a re-render loop even if the state is the same. React doesn't diff your state.
- Some suggest not calling `this.setState(...)` in `componentDidUpdate()` - he fees that's a bit over-the-top but it's probably still something to avoid 


Rendering
---------

- React describes DOM nodes, not HTML... hence `className` (which you can query in the browser dev tools) instead of `class` (which you use when writing HTML).
- Items in a list need to have a unique `key` property so React can track changes over time
- `const element = React.createElement(elementType, props, elementContent)` like `const element = React.createElement('div', { className: 'hot' }, "Hello, world!")`
- `ReactDOM.render(element, whereToPutIt)` like `ReactDOM.render(element, document.getElementById('root'))`
- JSX lets you dispense with the `React.createElement` stuff. So my earlier example becomes `<div className='hot'>Hello, World!</div>`


Components
----------

- `this.props.children` - `children` prop is a special prop and it's whatever you send inside your component.
- `this.props`, `this.state` and `this.props.children`
- `propTypes` - like names/types that have to be declared in a dynamic language
    ```
    import PropTypes from 'prop-types';
    
    class MyComponent extends React.Component {
        static propTypes = {
            summary: PropTypes.strig.isRequired,
            onToggle: PropTypes.func,
            children: PropTypes.node,
        }
    [...]
    ```
- `defaultProps` - default values if props aren't given
    ```
    static defaultProps = {
        summary: 'Summary',
    }
    ```


Props vs. State
---------------

- Key insight: `props` are just `state` that come from a parent
- `static getDerivedStateFromProps(nextProps, prevState)`
    - New in 16.3 
    - It's `static`!
    - He couldn't get it working... and it seems really, really rare
    - If we have problems with that, he tried `UNSAFE_componentWillReceiveProps(nextProps)`
- Render a component with all props from the parent: `<Component {...this.props}/>`
- When passing a function reference to an event handler, he declares the function at the class level with an arrow function:
    ```
    selectTab = (index) => {
            this.setState({ activeIndex: index });
        };
    ```


Controlled vs. Uncontrolled
---------------------------

- `onChange` events bubble up so you can put an `onChange` on a single form element or on the `form` tag itself. Though, usually, you use an `onSubmit` event on a `form`
- React docs suggest using a controlled input most of the time
- What really makes a controlled input controlled is a `value` and `onChange` prop - so the state is living in the parent 
- If the _only_ thing that changes the value of a field is the user, then the field should be uncontrolled. The instant the app can do something to value of the field, then it should be a controlled field.


Imperative to Declarative
-------------------------

- `render()` should always be side-effect free. `componentDidMount()` and `componentDidUpdate()` is the place for side effect code.
- `render()`'s job is to return a String based on the state. It's totally functional. `componentDidMount/Update()` are not.


Higher-Order Components
-----------------------

- Higher order components are usually named `withXxx` where `xxxx` is the name of the prop it adds
- Higher order components must be sure to pass through all the props to their wrapped components
- `<Fragment>` is a way to return two elements from `render()` but it doesn't actually render anything to the page
- Usually, you pass `{...this.props}` first, then the named properties


Render Props
------------

- For a long while, higher-order components were _the_ way to share code in React. But there's a reasonable amount of boilerplate to them.
- Problems with higher-order components:
    - Property clashing: Two higher-order components that populate the same prop - there is no error/warning (unlike with mixins)
    - Indirection: a component that is counting on being wrapped gets properties from some magic place
    - Unusual composition: Normally, in React, we compose components in the `render()` function. But not with higher-order components 
- Render props is a component where one of the props is a `render` function that takes some args. And the component calls that prop with some state args:
    ```
        render() {
            return.this.props.render(this.state.xxxx);
        }
    ```
- Sometimes the render prop is called `children` and then the function could be a child of the component tag
- Render props compose within the `render` function. Higher-order components compose staticly outside `render`, which isn't very React-y.
- He suggests using a higher-order component (over render props) if you need access to the prop that the render prop would gives you outside of the `render` method.


Render Optimizations
====================

- `shouldComponentUpdate` is a hook to tell react if it should bother performing an update
- If your rendering shows it's spending a lot of time doing react tree reconciliation on a component, you can also try using `React.PureComponent`. Usually, this is only something you want to do for leaf nodes: items in a list, etc Things rendered hundreds of times that don't actually change when they're on the page (maybe you'll add more items to a list, but items in the list won't actually change)


Animation
=========

- Common approach is to move animation (side effect) into the `componentDidUpdate` method. But then you can't really see that there's something going on in the component.
- Check out `react-motion` and it's `<Motion>` component
    - Give it a `style` prop with the value you want it to get to. And then you get handed interpolated value in the render prop.
    ```
    <Motion style={{x: spring(x)}}>
        {x => ...}
    ```















--------------------------------------


## Welcome to React Training!

This repo contains the course material for [React Training](https://reacttraining.com/). Before attending the training, please make sure you can run this repository.

First, install [git](http://git-scm.com/downloads) and the latest stable version of [node](https://nodejs.org/). Then:

```sh
$ git clone https://github.com/ReactTraining/react-workshop.git
$ cd react-workshop
$ npm install
$ npm start
```

Your web browser should open to [http://localhost:8080](http://localhost:8080)where you'll see a list of subjects.

**IMPORTANT:** Please read the [JavaScript Primer](https://github.com/ReactTraining/react-workshop/blob/master/JavaScriptPrimer.md) before attending the workshop. It's a refresher on some of the newer bits of JavaScript you'll want to be familiar with in order to get the most out of the experience.

### Troubleshooting

A few common problems:

* **You're having problems cloning the repository.** Some corporate networks block port 22, which git uses to communicate with GitHub over SSH. Instead of using SSH, clone the repo over HTTPS. Use the following command to tell git to always use `https` instead of `git`:

```sh
$ git config --global url."https://".insteadOf git://

# This adds the following to your `~/.gitconfig`:
[url "https://"]
  insteadOf = git://
```

* **You're having trouble installing node.** We recommend using [nvm](https://github.com/creationix/nvm). nvm makes it really easy to use multiple versions of node on the same machine painlessly. After you install nvm, install the latest stable version of node with the following command:

```sh
$ nvm use default stable
```

* **You don't have permissions to install stuff.** You might see an error like `EACCES` during the `npm install` step. If that's the case, it probably means that at some point you did an `sudo npm install` and installed some stuff with root permissions. To fix this, you need to forcefully remove all files that npm caches on your machine and re-install without sudo.

```sh
$ sudo rm -rf node_modules

# If you installed node with nvm (suggested):
$ sudo rm -rf ~/.npm

# If you installed node with Homebrew:
$ sudo rm -rf /usr/local/lib/node_modules

# Then (look ma, no sudo!):
$ npm install
```

### License

This material is available for private, non-commercial use under the [GPL version 3](http://www.gnu.org/licenses/gpl-3.0-standalone.html). If you would like to use this material to conduct your own workshop, please contact us at [hello@reacttraining.com](mailto:hello@reacttraining.com).
