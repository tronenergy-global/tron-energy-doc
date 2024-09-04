# Сводка по использованию API

## Адрес API

```
GET /api/v1/frontend/userapi/summary
```

## Параметры ответа

- Пример нормального ответа
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

- При неверном APIKEY возвращает 403

- Пояснение полей

| Название параметра | Тип | Описание | Пример |
| -------- | -------- | -------- | -------- |
| name | string | Название API |  |
| create_time | string | Время создания |  |
| total_count | int | Общее количество заказов |  |
| total_sum_energy | int | Общее количество заказанной энергии |  |
| total_sum_trx | int | Общее количество израсходованных TRX (в sun) |  |
| today_count | int | Количество заказов сегодня |  |
| today_sum_energy | int | Количество энергии, заказанной сегодня |  |
| today_sum_trx | int | Количество израсходованных TRX сегодня (в sun) |  |
| yesterday_count | int | Количество заказов вчера |  |
| yesterday_sum_energy | int | Количество энергии, заказанной вчера |  |
| yesterday_sum_trx | int | Количество израсходованных TRX вчера (в sun) |  |


## Пример кода

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