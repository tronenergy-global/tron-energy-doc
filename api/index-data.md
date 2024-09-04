# Public data query

## interface address

```
GET /api/v1/frontend/index-data
```

## Return parameters

- Normal return example
```json
{
     "platform_avail_energy": 603249,
     "platform_max_energy": 329009,
     "minimum_order_energy": 32000,
     "maximum_order_energy": 100000000,
     "small_amount": 50000,
     "small_addition": 0.6,
     "usdt_energy_need_old": 32000,
     "usdt_energy_need_new": 65000,
     "tiered_pricing": [{"period": 0, "price": 100}, {"period": 1, "price": 200}, {"period": 3, "price": 152}, {"period ": 30, "price": 124}],
     "balance": 813892429257
}
```

- This interface theoretically returns no errors, and returns empty data when the APIKEY is incorrect.

- Field explanation

| Parameter name | Type | Description | Example |
| -------- | -------- | -------- | -------- |
| platform_avail_energy | int | Platform available energy | |
| platform_max_energy | int | The maximum order amount for a single order,<br/>If the order is not allowed to be split, the maximum order energy | |
| minimum_order_energy | int | Minimum order energy quantity | |
| maximum_order_energy | int | Maximum order energy quantity | |
| small_amount | int | Less than this amount is a small order | |
| small_addition | float | Small handling fee, unit TRX | |
| usdt_energy_need_old | int | There is currently a U address recommended for renting | |
| usdt_energy_need_new | int | Currently there is no U address recommended to rent | |
| tiered_pricing | [] | My price, period currently supports <br/>0 (1 hour), 1 (1 day), <br/>3 (3 days), 30 (30 days), <br/>price The unit is sun | |
| balance | int | My balance in sun | |


## Code Example

<CodeGroup>
  <CodeGroupItem title="Python" active>

```python
import requests

API_KEY = "B433BFF1CDE7450AA38A56BEAC690DD4"
URL = "https://{domain}/api/v1/frontend/index-data"
headers = {
    "API-KEY": API_KEY
}
response = requests.get(f"{URL}", headers=headers)
print(response.json())
```

  </CodeGroupItem>

  <CodeGroupItem title="Php">

```php
<?php
$API_KEY = "B433BFF1CDE7450AA38A56BEAC690DD4";
$URL = "https://{domain}/api/v1/frontend/index-data";
$headers = array('API-KEY' => $API_KEY);

$context = stream_context_create(array(
    'http' => array(
        'method' => 'GET',
        'header' => "API-KEY: " . $API_KEY,
    )
));
$response = file_get_contents($URL, false, $context);

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
        String url = "https://{domain}/api/v1/frontend/index-data";
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
	URL := "https://{domain}/api/v1/frontend/index-data"

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
URL="https://{domain}/api/v1/frontend/index-data"

curl -X GET -H "API-KEY:$API_KEY" "$URL"

```
  </CodeGroupItem>
</CodeGroup>