@app
begin-app

@static
folder build

@http
get /api
post /form
post /signup
delete /order

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
