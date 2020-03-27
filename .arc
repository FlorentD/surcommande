@app
begin-app

@static
folder build

@http
get /api
post /form

@tables
data
  scopeID *String
  dataID **String
  ttl TTL
