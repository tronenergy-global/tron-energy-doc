# 下单预估金额

## 接口地址

```
GET /api/v1/frontend/order/price?period={period}&energy_amount={energy_amount}
```

## 请求参数

| 参数名称 | 类型 | 必填 | 说明 | 示例 |
| -------- | -------- | -------- | -------- | -------- |
| period  | string   |  是   | 租赁周期,1H/1D/3D/30D<br/>H表示1小时，D表示天 | 1H  |
| energy_amount   | int   |  是  | 预估能量，最少10000 |    |


## 返回参数

- 正常返回示例
```json
{
  "period": "3D", 
  "energy_amount": 32000, 
  "price": 100, 
  "total_price": 10192000, 
  "addition": 600000
}

```
- 异常返回请参考[API返回值](/zh/general/error-code.md)

- 字段解释

| 参数名称 | 类型 | 说明 | 示例 |
| -------- | -------- | -------- | -------- |
| energy_amount | int | 下单的能量 |  |
| period | int | 租用时长，目前支持<br/>0（1小时），1（1天），<br/>3（3天），30（30天） |  |
| price | int | 单价，单位sun|  |
| total_price | int | 需要支付的TRX，单位sun|  |
| addition | int | 小额手续费（小于50000能量需要），单位sun|  |


## 代码示例

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