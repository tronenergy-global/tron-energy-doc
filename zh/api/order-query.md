# 订单查询（单个）

## 接口地址

```
GET /api/v1/frontend/order/query?serial={serial_no}
```

## 请求参数

| 参数名称 | 类型 | 必填 | 说明 | 示例 |
| -------- | -------- | -------- | -------- | -------- |
| serial   | string   |  是  | 下单时返回的订单号 |    |


## 返回参数

- 正常返回示例
```json
{
    "errno": 0,
    "receive_address": "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw", 
    "order_no": "58b451473d290f92443eabf0322b9907", 
    "energy_amount": 32000, 
    "pay_amount": 0.0, 
    "amount": 3800000, 
    "details": [ // 大额订单可能拆分多次委托
        {
            "delegate_hash": "e2e71df638a9e01492a50bebba072a39eb75f673e91d5374ccf517f44e113f3",
            "delegate_time": "2023-10-09T10:21:07.840478Z",
            "reclaim_hash": "f4672a9563947cf78e5534b4025451dfd75efa5481a67b20ee55b9be368c900",
            "reclaim_time": "2023-10-12T10:21:07.840478Z",
            "reclaim_time_real": "2023-10-09T10:26:12.617456Z",
            "status": 30 // 20-委托中， 30-已回收
        }
    ],
    "create_time": "2023-06-15T21:42:13.200565+08:00", 
    "api_name": "MY API", 
    "period": 0, 
    "status": 30, // 30表明委托完全成功
    "refund_amount": 0
}

```
- 异常返回
```json
{
    "errno": 404,
    "message": "找不到订单"
}
```

- 字段解释

| 参数名称 | 类型 | 说明 | 示例 |
| -------- | -------- | -------- | -------- |
| receive_address | string | 下单接受能量的地址 |  |
| order_no | string | 订单号，同serial |  |
| energy_amount | int | 下单的能量 |  |
| pay_amount | float | 已委托的能量 |  |
| amount | int | 支付的TRX，单位sun |  |
| create_time | string | 下单时间|  |
| api_name | string | 区分哪个API下的单|  |
| period | int | 租用时长，目前支持<br/>0（1小时），1（1天），<br/>3（3天），30（30天） |  |
| status | int |  订单状态 <br/>(0, '超时关闭'),<br/>(10, '等待支付'),<br/>(20, '已支付'),<br/>(30, '委托准备中'),<br/>(31, '部分委托'),<br/>(32, '异常重试中'),<br/>(40, '正常完成'),<br/>(41, '退款终止'),<br/>(43, '异常终止'),|  |
| refund_amount | int | 退款金额，单位sun|  |


## 代码示例

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