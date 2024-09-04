# Order query (single)

## interface address

```
GET /api/v1/frontend/order/query?serial={serial_no}
```

## Request parameters

| Parameter name | Type | Required | Description | Example |
| -------- | -------- | -------- | -------- | -------- |
| serial | string | Yes | The order number returned when placing an order | |


## Return parameters

- Normal return example
```json
{
     "errno": 0,
     "receive_address": "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw",
     "order_no": "58b451473d290f92443eabf0322b9907",
     "energy_amount": 32000,
     "pay_amount": 0.0,
     "amount": 3800000,
     "details": [ // Large orders may be split into multiple orders
         {
             "delegate_hash": "e2e71df638a9e01492a50bebba072a39eb75f673e91d5374ccf517f44e113f3",
             "delegate_time": "2023-10-09T10:21:07.840478Z",
             "reclaim_hash": "f4672a9563947cf78e5534b4025451dfd75efa5481a67b20ee55b9be368c900",
             "reclaim_time": "2023-10-12T10:21:07.840478Z",
             "reclaim_time_real": "2023-10-09T10:26:12.617456Z",
             "status": 30 // 20-in commission, 30-recycled
         }
     ],
     "create_time": "2023-06-15T21:42:13.200565+08:00",
     "api_name": "MY API",
     "period": 0,
     "status": 30, // 30 indicates that the commission was completely successful
     "refund_amount": 0
}

```
-Exception return
```json
{
     "errno": 404,
     "message": "Order not found"
}
```

- Field explanation

| Parameter name | Type | Description | Example |
| -------- | -------- | -------- | -------- |
| receive_address | string | The address to place an order to receive energy | |
| order_no | string | order number, same as serial | |
| energy_amount | int | The energy of placing the order | |
| pay_amount | float | Delegated energy | |
| amount | int | TRX paid, unit sun | |
| create_time | string | order time | |
| api_name | string | Distinguish which API placed the order | |
| period | int | Rental duration, currently supports <br/>0 (1 hour), 1 (1 day), <br/>3 (3 days), 30 (30 days) | |
| status | int | Order status<br/>(0, 'Timeout closed'),<br/>(10, 'Waiting for payment'),<br/>(20, 'Paid'),<br/> (30, 'Delegation in preparation'),<br/>(31, 'Partial commission'),<br/>(32, 'Exception retrying'),<br/>(40, 'Normal completion') ,<br/>(41, 'Refund termination'),<br/>(43, 'Abnormal termination'),| |
| refund_amount | int | Refund amount, unit sun| |


## Code Example

<CodeGroup>
  <CodeGroupItem title="Python" active>

```python
import requests

API_KEY = "B433BFF1CDE7450AA38A56BEAC690DD4"
URL = "https://{domain}/api/v1/frontend/order/query"
params = {'serial': '58b451473d290f92443eabf0322b9907'}
headers = {
    "API-KEY": API_KEY
}
response = requests.get(f"{URL}", params=params, headers=headers)
print(response.json())
```

  </CodeGroupItem>

  <CodeGroupItem title="Php">

```php
<?php
$API_KEY = "B433BFF1CDE7450AA38A56BEAC690DD4";
$URL = "https://{domain}/api/v1/frontend/order/query";
$params = array('serial' => '58b451473d290f92443eabf0322b9907');
$headers = array('API-KEY' => $API_KEY);

$context = stream_context_create(array(
    'http' => array(
        'method' => 'GET',
        'header' => "API-KEY: " . $API_KEY,
    )
));
$response = file_get_contents($URL . "?" . http_build_query($params), false, $context);

var_dump(json_decode($response, true));
?>

```

  </CodeGroupItem>

  <CodeGroupItem title="Java">
  
```java
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class Main {
    public static void main(String[] args) {
        OkHttpClient client = new OkHttpClient();
        String url = "https://{domain}/api/v1/frontend/order/query?serial=58b451473d290f92443eabf0322b9907";
        Request request = new Request.Builder()
                .url(url)
                .addHeader("API-KEY", "B433BFF1CDE7450AA38A56BEAC690DD4")
                .build();
        try {
            Response response = client.newCall(request).execute();
            System.out.println(response.body().string());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}

```

  </CodeGroupItem>

  <CodeGroupItem title="Go">
  
```go
package main

import (
	"io/ioutil"
	"net/http"
	"fmt"
)

func main() {
	API_KEY := "B433BFF1CDE7450AA38A56BEAC690DD4"
	URL := "https://{domain}/api/v1/frontend/order/query?serial=58b451473d290f92443eabf0322b9907"

	client := &http.Client{}
	req, _ := http.NewRequest("GET", URL, nil)
	req.Header.Set("API-KEY", API_KEY)

	resp, err := client.Do(req)
	if err != nil {
		fmt.Printf("The HTTP request failed with error %s\n", err)
	} else {
		data, _ := ioutil.ReadAll(resp.Body)
		fmt.Println(string(data))
	}
}

```
  </CodeGroupItem>

  <CodeGroupItem title="Shell">
  
```shell
API_KEY="B433BFF1CDE7450AA38A56BEAC690DD4"
URL="https://{domain}/api/v1/frontend/order/query"
params="serial=58b451473d290f92443eabf0322b9907"

curl -X GET -H "API-KEY:$API_KEY" "$URL?$params"

```
  </CodeGroupItem>
</CodeGroup>