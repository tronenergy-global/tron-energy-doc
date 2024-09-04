# Estimated order amount

## interface address

```
GET /api/v1/frontend/order/price?period={period}&energy_amount={energy_amount}
```

## Request parameters

| Parameter name | Type | Required | Description | Example |
| -------- | -------- | -------- | -------- | -------- |
| period | string | Yes | Rental period, 1H/1D/3D/30D<br/>H means 1 hour, D means day | 1H |
| energy_amount | int | Yes | Estimated energy, at least 10000 | |


## Return parameters

- Normal return example
```json
{
   "period": "3D",
   "energy_amount": 32000,
   "price": 100,
   "total_price": 10192000,
   "addition": 600000
}

```
- For exception returns, please refer to [API return value](/en/general/error-code.md)

- Field explanation

| Parameter name | Type | Description | Example |
| -------- | -------- | -------- | -------- |
| energy_amount | int | The energy of placing the order | |
| period | int | Rental duration, currently supports <br/>0 (1 hour), 1 (1 day), <br/>3 (3 days), 30 (30 days) | |
| price | int | unit price, unit sun| |
| total_price | int | TRX to be paid, unit sun| |
| addition | int | small handling fee (less than 50,000 energy requirements), unit sun | |


## Code Example

<CodeGroup>
  <CodeGroupItem title="Python" active>

```python
import requests

API_KEY = "B433BFF1CDE7450AA38A56BEAC690DD4"
URL = "https://{domain}/api/v1/frontend/order/price"
params = {'period': '3D', 'energy_amount': 32000}
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
$URL = "https://{domain}/api/v1/frontend/order/price";
$params = array('period' => '3D', 'energy_amount': 32000);
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
        String url = "https://{domain}/api/v1/frontend/order/price?period=3D&energy_amount=32000";
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
	URL := "https://{domain}/api/v1/frontend/order/price?period=3D&energy_amount=32000"

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
URL="https://{domain}/api/v1/frontend/order/price"
params="period=3D&energy_amount=32000"

curl -X GET -H "API-KEY:$API_KEY" "$URL?$params"

```
  </CodeGroupItem>
</CodeGroup>