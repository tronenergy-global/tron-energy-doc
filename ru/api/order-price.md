# Оценка стоимости заказа

## Адрес API

```
GET /api/v1/frontend/order/price?period={period}&energy_amount={energy_amount}
```

## Параметры запроса

| Название параметра | Тип | Обязательно | Описание | Пример |
| -------- | -------- | -------- | -------- | -------- |
| period  | string   |  Да   | Период аренды, 1H/1D/3D/30D<br/>H означает 1 час, D означает день | 1H  |
| energy_amount   | int   |  Да  | Оценочное количество энергии, минимум 10000 |    |


## Параметры ответа

- Пример нормального ответа
```json
{
  "period": "3D", 
  "energy_amount": 32000, 
  "price": 100, 
  "total_price": 10192000, 
  "addition": 600000
}

```
- Пример ошибки можно найти в разделе [API возвращает значения](/ru/general/error-code.md)

- Пояснение полей

| Название параметра | Тип | Описание | Пример |
| -------- | -------- | -------- | -------- |
| energy_amount | int | Количество энергии в заказе |  |
| period | int | Срок аренды, в настоящее время поддерживаются<br/>0 (1 час), 1 (1 день),<br/>3 (3 дня), 30 (30 дней) |  |
| price | int | Цена за единицу, единица измерения sun |  |
| total_price | int | Общая сумма в TRX, единица измерения sun |  |
| addition | int | Малая комиссия (необходима для менее 50000 энергии), единица измерения sun |  |


## Пример кода

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