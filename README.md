# React Shortcuts

React Keyboard shortcuts using React's synthetic events.

## Usage

```js
import { ShortcutsProvider } from "...";

const keymap = {
  TODO_LIST: {
    CLEAR_ALL: "ctrl+del",
    SHOW_ALL: "shift+a"
  }
};

class App extends React.Component {
  render() {
    return (
      <ShortcutsProvider shortcuts={keymap}>
        <RootComponent />
      </ShortcutsProvider>
    );
  }
}
```

```js
import { Shortcuts } from "...";

class InnerChild extends React.Component{
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
| tabIndex        | 0             | tabIndex of the element                                                                                                                                                                               |
| stopPropagation | false         | Whether to `stopPropagation` for all of the current actions<br/>\*Can be done in handler function also                                                                                                |
| preventDefault  | false         | Whether to `preventDefault` for all of the current actions<br/>\*Can be done in handler function also                                                                                                 |
| alwaysFire      | false         | Whether to fire these actiona when an input like element is in focus                                                                                                                                  |

---

### Notes

- Take care of tabIndex and focus style of the components
- Beware of `outline`
