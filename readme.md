# OpenPlatform

Works only with OpenPlatform app.

__Server-Side Methods__:

> `OPENPLATFORM.kill()`

Returns `{String}` and contains HTML code for closing iframe.

> `OPENPLATFORM.clientside()`

Returns `{String}` and contains HTML code with client-side implementation of OpenPlatform.

> `OPENPLATFORM.session(cookie_name)`

Returns `{User}` instance when exists in the session (otherwise returns `null`).

> `OPENPLATFORM.authorize(req, res, callback(err, user))`

__Internal.__ It creates a session and it's used in `/openplatform/` route (the module `openplatform` registers this route internaly).

> `OPENPLATFORM.getApplications(openplatform, iduser, callback(err, applications))`

Reads all registered applications in the OpenPlatform. The application must have privileges for this operation in the OpenPlatform.

```javascript
var user = controller.user;
OPENPLATFORM.getApplications(user.openplatform, user.id, function(err, response) {

});
```

> `OPENPLATFORM.getUsers(openplatform, iduser, callback(err, users))`

Reads all registered users in the OpenPlatform. The application must have privileges for this operation in the OpenPlatform.

```javascript
var user = controller.user;
OPENPLATFORM.getZsers(user.openplatform, user.id, function(err, response) {

});
```
