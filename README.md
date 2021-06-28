## Commonly Occuring Errors

### 1. React router index route("/") stays active

    Use exact attribute in the navlink for the index route
    ```js
    <NavLink exact to="/" className="sideNav" activeClassName="sideNav-active">
      Home
    </NavLink>
    ```
