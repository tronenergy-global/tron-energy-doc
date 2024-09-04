# Поиск заказа (один)

## Адрес API

```
GET /api/v1/frontend/order/query?serial={serial_no}
```

## Параметры запроса

| Название параметра | Тип | Обязательно | Описание | Пример |
| -------- | -------- | -------- | -------- | -------- |
| serial   | string   |  Да  | Номер заказа, возвращаемый при размещении заказа |    |


## Параметры ответа

- Пример нормального ответа
```json
{
    "errno": 0,
    "receive_address": "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw", 
    "order_no": "58b451473d290f92443eabf0322b9907", 
    "energy_amount": 32000, 
    "pay_amount": 0.0, 
    "amount": 3800000, 
    "details": [ // Заказы большого объема могут быть разбиты на несколько делегаций
        {
            "delegate_hash": "e2e71df638a9e01492a50bebba072a39eb75f673e91d5374ccf517f44e113f3",
            "delegate_time": "2023-10-09T10:21:07.840478Z",
            "reclaim_hash": "f4672a9563947cf78e5534b4025451dfd75efa5481a67b20ee55b9be368c900",
            "reclaim_time": "2023-10-12T10:21:07.840478Z",
            "reclaim_time_real": "2023-10-09T10:26:12.617456Z",
            "status": 30 // 20-В процессе делегации, 30-Восстановлено
        }
    ],
    "create_time": "2023-06-15T21:42:13.200565+08:00", 
    "api_name": "MY API", 
    "period": 0, 
    "status": 30, // 30 означает, что делегация полностью успешна
    "refund_amount": 0
}

```
- Пример ошибки
```json
{
    "errno": 404,
    "message": "Заказ не найден"
}
```

- Пояснение полей

| Название параметра | Тип | Описание | Пример |
| -------- | -------- | -------- | -------- |
| receive_address | string | Адрес получения энергии |  |
| order_no | string | Номер заказа, тот же, что и serial |  |
| energy_amount | int | Количество энергии в заказе |  |
| pay_amount | float | Делегированная энергия |  |
| amount | int | Оплаченная сумма в TRX, единица измерения sun |  |
| create_time | string | Время размещения заказа |  |
| api_name | string | API, через который размещен заказ |  |
| period | int | Срок аренды, в настоящее время поддерживаются<br/>0 (1 час), 1 (1 день),<br/>3 (3 дня), 30 (30 дней) |  |
| status | int |  Статус заказа <br/>(0, 'Закрыто по таймауту'),<br/>(10, 'Ожидание оплаты'),<br/>(20, 'Оплачено'),<br/>(30, 'Подготовка делегации'),<br/>(31, 'Частичная делегация'),<br/>(32, 'Повторная попытка из-за ошибки'),<br/>(40, 'Успешное завершение'),<br/>(41, 'Возврат завершен'),<br/>(43, 'Ошибка завершения'),|  |
| refund_amount | int | Сумма возврата, единица измерения sun |  |


## Пример кода

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