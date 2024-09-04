# 公共数据查询

## 接口地址

```
GET /api/v1/frontend/index-data
```

## 返回参数

- 正常返回示例
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
    "tiered_pricing": [{"period": 0, "price": 100}, {"period": 1, "price": 200}, {"period": 3, "price": 152}, {"period": 30, "price": 124}], 
    "balance": 813892429257
}
```

- 此接口理论上无错误返回，APIKEY不对时返回空数据

- 字段解释

| 参数名称 | 类型 | 说明 | 示例 |
| -------- | -------- | -------- | -------- |
| platform_avail_energy | int | 平台可用能量 |  |
| platform_max_energy | int | 单次委托最大下单金额，<br/>如果订单不允许拆分，最大可下单能量 |  |
| minimum_order_energy | int | 最小下单能量数量|  |
| maximum_order_energy | int | 最大下单能量数量|  |
| small_amount | int | 小于此数量为小额订单|  |
| small_addition | float | 小额手续费，单位TRX|  |
| usdt_energy_need_old | int | 当前有U地址建议租用 |  |
| usdt_energy_need_new | int | 当前无U地址建议租用 |  |
| tiered_pricing | [] | 我的价格，period 目前支持<br/>0（1小时），1（1天），<br/>3（3天），30（30天），<br/>price单位为sun |  |
| balance | int | 我的余额，单位sun |  |


## 代码示例

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