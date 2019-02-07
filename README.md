# React Shortcuts

React Keyboard shortcuts using React's synthetic events.

## Getting Started

Install `react-shortcut-manager`

```bash
npm i react-shortcut-manager
OR
yarn add react-shortcut-manager
```

## Define shortcuts

### Keymap definition

```json
{
  "Namespace": {
    "Action": "Shortcut",
    "Action_2": ["Shortcut", "Shortcut"],
    "Action_3": {
      "osx": "Shortcut",
      "windows": ["Shortcut", "Shortcut"],
      "linux": "Shortcut",
      "other": "Shortcut"
    }
  }
}
```

- `Namespace` should ideally be the component’s `displayName`.
- `Action` describes what will be happening. For example `MODAL_CLOSE`.
- `Keyboard shortcut` can be a string, array of strings or an object which
  specifies platform differences (Windows, OSX, Linux, other). The
  shortcut may be composed of single keys (`a`, `6`,…) or combinations of a key and modifiers (`command+shift+k`).

#### Example `keymap` definition

```javascript
export default {
  TODO_ITEM: {
    MOVE_LEFT: "left",
    MOVE_RIGHT: "right",
    MOVE_UP: ["up", "w"],
    DELETE: {
      osx: ["command+backspace", "k"],
      windows: "delete",
      linux: "delete"
    }
  }
};
```

## Example

```js
import { ShortcutProvider } from "react-shortcut-manager";

const keymap = {
  TODO_LIST: {
    CLEAR_ALL: "ctrl+del",
    SHOW_ALL: "shift+a"
  }
};

class App extends React.Component {
  render() {
    return (
      <ShortcutProvider shortcuts={keymap}>
        <RootComponent />
      </ShortcutProvider>
    );
  }
}
```

```js
import { Shortcuts } from "react-shortcut-manager";

class TodoList extends React.Component{
  handleShortcuts(action,event){
    switch(action){
      case 'CLEAR_ALL':
        ...
        break;
      case 'SHOW_ALL':
        ...
        break;
      default:
    }
  }
  render(){
    return(
      <Shortcuts
       name="TODO_LIST"
       handler={this.handleShortcuts}>
        <TodoItem todo={...}/>
        ...
      </Shortcuts>
    )
  }
}
```

## Props

### ShortcutsProvider

| Props       | Default Value | Description                                  |
| ----------- | ------------- | -------------------------------------------- |
| shortcuts   | _Required_    | An object containing keymaps for events      |
| withGlobals | false         | Enable global shortcuts                      |
| tabIndex    | 0             | tabIndex of root div when `withGlobals=true` |

- When `withGlobals=true` any other prop will be passed to the root div

### Shortcuts

| Props           | Default Value | Description                                                                                                                                                                                           |
| --------------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| name            | _Required_    | name of the keygroup                                                                                                                                                                                  |
| handler         | _Required_    | The function to handle keyboard events.<br/>Receieves 2 parameters<br/><ul><li>`action:String` : The action being fired</li><li>`event:KeyboardEvent`:The keyboard event invoked the action</li></ul> |
| global          | false         | Whether the current shortcuts are global or not                                                                                                                                                       |
| headless        | false         | Applicable only when `global=true`<br/>Whether to render a container `div` or not.                                                                                                                    |
| tabIndex        | 0             | tabIndex of the element                                                                                                                                                                               |
| stopPropagation | false         | Whether to `stopPropagation` for all of the current actions<br/>\*Can be done in handler function also                                                                                                |
| preventDefault  | false         | Whether to `preventDefault` for all of the current actions<br/>\*Can be done in handler function also                                                                                                 |
| alwaysFire      | false         | Whether to fire these actiona when an input like element is in focus                                                                                                                                  |

---

- Any other prop will be passed to the root div

### Notes

- Take care of tabIndex and focus style of the components
- Beware of `outline`
- Any similarities to [`react-shortcuts`] is not accidental

[`react-shortcuts`]: https://github.com/avocode/react-shortcuts
