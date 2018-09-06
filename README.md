# WISPY 🌱
Lightweight API pattern inspired by GraphQL/SOAP

## Idea
An easy pattern to communicate your client with your server, i.e. execute functions or piece of code living in your API end without any hassles of creating multiple endpoints (REST) or managing complex schemas (GraphQL). Server essentially exposes functions or methods which can be called by client with standard JSON payload along with passing any parameters to it. 

## Comparisons
- Uses JSON unlike string based GQL in GraphQL or URL in REST
- Only one endpoint or route on server unlike in REST (similar to GraphQL)
- No strict schema unlike GraphQL
- Simple customizable payload in JSON format unlike in SOAP which uses XML and strict structure
- Does not provide auto documentation (available in GraphQL)
- Security is not inbuild and depends on HTTPS
- At the moment, it is not possible to select the fields you want the server to return (available in GraphQL)

## Examples

#### Create

cURL
```
curl http://localhost:8000 \
  -H 'Content-type: application/json' \
  -d '{"operation": "productCreate", "params": {"name": "Product 1", "description": "Good product."}}'
```

fetch
```
async function productCreate() {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"operation": "productCreate", "params": {"name": "Product 1", "description": "Good product."}})
    }
    const response = await fetch('http://localhost:8000', config)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

Result
```
{
  "success": true,
  "message": "Product created successfully.",
  "data": {
    "_id": "5b914211aaabdc51bf1839a9",
    "name": "Product 1",
    "description": "Good product.",
    "createdAt": "2018-09-06T15:04:49.111Z",
    "updatedAt": "2018-09-06T15:04:49.111Z",
    "__v": 0
  }
}
```

#### Read
cURL
```
curl http://localhost:8000 \
  -H 'Content-type: application/json' \
  -d '{"operation": "productList"}'
```

fetch
```
async function productList() {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"operation": "productList"})
    }
    const response = await fetch('http://localhost:8000', config)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

Result
```
{
  "success": true,
  "message": "",
  "data": [
    {
      "_id": "5b91146bcc58ba33ee349e28",
      "name": "Hercle, habena dexter!, clabulare!",
      "description": "Tremble oddly like a unrelated pathway.",
      "createdAt": "2018-09-06T11:50:03.910Z",
      "updatedAt": "2018-09-06T11:50:03.910Z",
      "__v": 0
    },
    {
      "_id": "5b9113b3cc58ba33ee349e26",
      "name": "Passion is a small captain.",
      "description": "This turbulence has only been evacuated by a reliable proton.",
      "createdAt": "2018-09-06T11:46:59.167Z",
      "updatedAt": "2018-09-06T11:49:52.799Z",
      "__v": 0
    }
  ]
}
```

#### Update

cURL
```
curl http://localhost:8000 \
  -H 'Content-type: application/json' \
  -d '{"operation": "productUpdate", "params": {"_id": "5b914211aaabdc51bf1839a9", "name": "Product 1", "description": "Good product it is."}}'
```

fetch
```
async function productUpdate() {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"operation": "productUpdate", "params": {"_id": "5b914211aaabdc51bf1839a9", "name": "Product 1", "description": "Good product it is."}})
    }
    const response = await fetch('http://localhost:8000', config)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

Result
```
{
  "success": true,
  "message": "Product updated successfully.",
  "data": {
    "n": 1,
    "nModified": 1,
    "ok": 1
  }
}
```

#### Delete

cURL
```
curl http://localhost:8000 \
  -H 'Content-type: application/json' \
  -d '{"operation": "productRemove", "params": {"productId": "5b914211aaabdc51bf1839a9"}}'
```

fetch
```
async function productRemove() {
  try {
    const config = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({"operation": "productRemove", "params": {"productId": "5b914211aaabdc51bf1839a9"}})
    }
    const response = await fetch('http://localhost:8000', config)
    const data = await response.json()
    console.log(data)
  } catch (error) {
    console.error(error)
  }
}
```

Result
```
{
  "success": true,
  "message": "Product removed successfully.",
  "data": {
    "n": 1,
    "ok": 1
  }
}
```
