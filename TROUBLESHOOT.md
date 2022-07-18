## Commonly Occuring Errors

### 1. React router index route("/") stays active

    Use exact attribute in the navlink for the index route
    ```js
    <NavLink exact to="/" className="sideNav" activeClassName="sideNav-active">
      Home
    </NavLink>
    ```

### 2. Github Actions Heroku Deployment error

Regenerate Heroku API key (Dashboard-Home > Account Settings > API Key) and update it in the github project secrets.
