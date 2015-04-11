# react-helix-examples

Examples for [react-helix](https://github.com/mysticatea/react-helix) library.

## Installation

```
git clone https://github.com/mysticatea/react-helix-examples.git
cd react-helix-examples
```

## Usage

```
npm start
```

And please open:

* http://localhost:3000/todos/


## Todos

![Todos](./todos.png)

### Overview

Minimal TODO management application.

A keypoint is the way to use `AgentComponent::request` method.

1. First, we import actions to use.

  ```js
  import {updateTodoTitle} from "../action/TodoApp";
  ```

2. Next, we write a class that inherits from `AgentComponent`.

  ```js
  export default class TodoItem extends AgentComponent {
  ```

3. Lastly, we use `this.request` method with toghether the action and parameters.

  ```js
  this.request(updateTodoTitle, id, value);
  ```

That's all, basically.

See Also: [react-helix](https://github.com/mysticatea/react-helix)


### Class Diagram

![Class Diagram](http://www.plantuml.com/plantuml/svg/bPJ1RgCm48RlFCM84-csqNRtXb8ab6QrqQRTbHhbKlNWW9LQQp02anmgthtOsDYGcBOtxFduP_xns0LA_gC3XWUMOWfl7a12KLN1bgKiBWfOB62TPJL7UueXYYG1y0tYvNQzMy4TtC9RnH4dIQCYoxyF_pQhxUg-3VuO1-FDfjt-ETwkNjaf_qFoD8IyplQuLFi9gtE-vZYhWZDaDc9FXBzsg2YNipA4W8XrACs8qFFB3EuYUnbgevR8ayuK716jiPNFiA9mtQAhcvl8bvdW-tn-vVVw5YCGwM1zYHjqNUmusqvQ-nKlINvG6vnmYaTx2SiAYZbksJrZ5AFSShSLFsXdtM-pq2vPWqkjec6bDQGRh_6yGWrHd732SckAVENV1zIFb0M9L2XDjLoGYI7istmzD6VwFvwU4cViY9qgfcSVISIKzgwrN3NISslKHOguBAFhiRkEQxZK_qb9SngVa1sUb5EtjJij_JKvSsySEkDxTFOAe2F-TBSfGsbmETnuvkQfQPlFevuCszjLLpYAd9IyWWQp9dn7yEc3-PR8Oj6MS-XoAFGtHYak9TbzAh35Scw3lnZZ2km-7Q38jo4LxpSUyKbMdnSrloIihVNLYiL8tFH41kJR9gtin1d2hMyzWcTW6pNM782nv00iMrQVTDJsg0G4tCM7pwhCCLInna0TkJqCLhUdmK6Zfz51cwVGndi7)

