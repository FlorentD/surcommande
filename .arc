@app
begin-app

@static
folder build

@http
get /api
get /orders
post /form
delete /order

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
