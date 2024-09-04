# Общий запрос данных

## Адрес API

```
GET /api/v1/frontend/index-data
```

## Параметры ответа

- Пример нормального ответа
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

- Теоретически, этот интерфейс не возвращает ошибок, при неверном APIKEY возвращает пустые данные.

- Пояснение полей

| Название параметра | Тип | Описание | Пример |
| -------- | -------- | -------- | -------- |
| platform_avail_energy | int | Доступная энергия платформы |  |
| platform_max_energy | int | Максимальная сумма заказа за одну делегацию,<br/>если заказ нельзя разбить, максимальное количество энергии |  |
| minimum_order_energy | int | Минимальное количество энергии для заказа|  |
| maximum_order_energy | int | Максимальное количество энергии для заказа|  |
| small_amount | int | Заказы меньше этого количества считаются мелкими|  |
| small_addition | float | Комиссия за мелкий заказ, в TRX|  |
| usdt_energy_need_old | int | Рекомендуемая аренда для адресов с U |  |
| usdt_energy_need_new | int | Рекомендуемая аренда для адресов без U |  |
| tiered_pricing | [] | Мои цены, period поддерживает следующие значения:<br/>0 (1 час), 1 (1 день),<br/>3 (3 дня), 30 (30 дней),<br/>price в sun |  |
| balance | int | Мой баланс, в sun |  |


## Пример кода

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