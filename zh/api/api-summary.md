# API使用汇总

## 接口地址

```
GET /api/v1/frontend/userapi/summary
```

## 返回参数

- 正常返回示例
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

- APIKEY不对时返回403

- 字段解释

| 参数名称 | 类型 | 说明 | 示例 |
| -------- | -------- | -------- | -------- |
| name | string | API名称 |  |
| create_time | string | 创建时间 |  |
| total_count | int | 总计下单数 |  |
| total_sum_energy | int | 总计下单能量|  |
| total_sum_trx | int | 总计消耗TRX(单位sun)|  |
| today_count | int | 今日下单数 |  |
| today_sum_energy | int | 今日单能量|  |
| today_sum_trx | int | 今日消耗TRX(单位sun)|  |
| yesterday_count | int | 昨日下单数 |  |
| yesterday_sum_energy | int | 昨日下单能量|  |
| yesterday_sum_trx | int | 昨日消耗TRX(单位sun)|  |


## 代码示例

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