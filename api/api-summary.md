# API usage summary

## interface address

```
GET /api/v1/frontend/userapi/summary
```

## Return parameters

- Normal return example
```json
{
     "name": "MY API",
     "create_time": "2023-04-28 12:31:04",
     "total_count": 46,
     "total_sum_energy": 3696000,
     "total_sum_trx": 598165000,
     "today_count": 0,
     "today_sum_energy": 0,
     "today_sum_trx": 0,
     "yesterday_count": 1,
     "yesterday_sum_energy": 1300000,
     "yesterday_sum_trx": 197600000
}
```

- Return 403 if APIKEY is incorrect

- Field explanation

| Parameter name | Type | Description | Example |
| -------- | -------- | -------- | -------- |
| name | string | API name | |
| create_time | string | Creation time | |
| total_count | int | Total number of orders | |
| total_sum_energy | int | Total order energy | |
| total_sum_trx | int | Total consumption TRX (unit sun) | |
| today_count | int | Number of orders placed today | |
| today_sum_energy | int | Today's single energy | |
| today_sum_trx | int | TRX consumed today (unit: sun) | |
| yesterday_count | int | Number of orders placed yesterday | |
| yesterday_sum_energy | int | Yesterday’s order energy | |
| yesterday_sum_trx | int | Yesterday's consumption of TRX (unit: sun) | |


## Code Example

<CodeGroup>
  <CodeGroupItem title="Python" active>

```python
import requests

API_KEY = "B433BFF1CDE7450AA38A56BEAC690DD4"
URL = "https://{domain}/api/v1/frontend/userapi/summary"
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
$URL = "https://{domain}/api/v1/frontend/userapi/summary";
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
        String url = "https://{domain}/api/v1/frontend/userapi/summary";
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
	URL := "https://{domain}/api/v1/frontend/userapi/summary"

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
URL="https://{domain}/api/v1/frontend/userapi/summary"

curl -X GET -H "API-KEY:$API_KEY" "$URL"

```
  </CodeGroupItem>
</CodeGroup>