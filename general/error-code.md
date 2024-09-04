# API return value

There are two status codes (http_status_code) returned by the current API: `200` and `400`

## Return 400
If the API returns 400, it indicates that the request parameters have not passed verification. There are two return formats at this time:

1. There are specific parameter errors, mostly due to parameter verification failure.
```json
{
     "energy_amount": ["Please make sure the value is greater than or equal to 10000."],
     "period": ["'1X' is not a legal option."]
}
```
::: tip

- The error reasons for each field will be listed. The reason list is an array. There may be multiple reasons!
   :::

2. There are no specific parameter errors. Most of them are that the parameter verification is successful, but other errors are caused.
```json
{"detail": "API not found"}
```
::: tip

- The key is fixed to detail, and the return result is a string. If you want to display a specific error during development, you need to first determine whether it is a detil type error, and then determine whether the parameter is wrong.
   :::

## Return 200
When the API returns 200, the return format is fixed to
```json
{
     "errno": 1,
     "message": 'XXXX',
     "param1": "value1",
     ...
}
```

- errno is 1 or 0. When `errno=0`, it means that the request is normal. When `errno=1`, it means that the request encountered a problem. At this time, there will be a `message` parameter to indicate the reason.
- In some requests, there will be other return parameters, please refer to the description in the API chapter for details.