@app
begin-app

@static
folder build

@http
get /api
get /orders
post /form

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
