---
title: API для коллекции средств
---

## Основная информация
Если ваша задача заключается в сборе средств с адресов для зачисления на горячий/холодный кошелек, стандартные энергетические интерфейсы могут оказаться недостаточными. Поэтому мы разработали специальный интерфейс для коллекции средств, который упрощает данный процесс.

## Адрес API

```
POST /api/v1/frontend/order/collect-manual
```

## Параметры запроса

| Название параметра | Тип | Обязательно | Описание | Пример |
| -------- | -------- | -------- | -------- | -------- |
| scene   | int   |  Да  |  Сценарий коллекции | 0-автоматическое определение   |
| receive_address | Tron адрес | Да |  |  |
| to_address | Tron адрес | Нет | Адрес для перевода<br/>В некоторых сценариях адрес получателя может быть не фиксирован, и если у получателя нет средств, потребуется дополнительная энергия<br/>Этот параметр будет автоматически определен, если у получателя нет средств, будет делегирована дополнительная энергия, что приведет к дополнительным расходам |  |
| callback_url | string | Нет | Уведомление о успешной/неуспешной делегации будет отправлено на этот адрес | https://mydomain.com/callback |
| out_trade_no | string | Нет | Этот параметр будет передан в обратном вызове для облегчения ассоциации заказа | S202302320004 |

## Параметры ответа

- Пример нормального ответа
```json
{
    "errno": 0,
    "serial": "7297a8a2a9e39b86fc5bad0d2e9edda2",
    "scene": 0,
    "amount": 4000000,
    "balance": 813900029257
}
```
- Пример ошибки можно найти в разделе [API возвращает значения](/ru/general/error-code.md)

- Пояснение полей

| Название параметра | Тип | Описание | Пример |
| -------- | -------- | -------- | -------- |
| errno | int | Код ошибки, 0 означает успешное выполнение |  |
| message | string | Причина ошибки, присутствует, если errno > 0 |  |
| serial | string | Внутренний номер заказа |  |
| scene | int | 0 означает автоматическое определение, будет возвращен фактически выполненный сценарий |  |
| amount | int | Сумма заказа, единица измерения sun, для перевода в TRX нужно разделить на 1000000 |  |
| balance | int | Баланс, единица измерения sun, для перевода в TRX нужно разделить на 1000000 |  |

::: tip

- После размещения заказа, чтобы узнать состояние выполнения заказа, вы можете использовать [активный запрос](/ru/api/order-query.md) или [пассивный обратный вызов](/ru/general/callback.md)
  :::

## Пример кода
<CodeGroup>
  <CodeGroupItem title="Python" active>

```python
import hmac
import json
import requests
import hashlib
import time


API_KEY = "B433BFF1CDE7450AA38A56BEAC690DD4"
API_SECRET = "0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"

timestamp = str(int(time.time()))
URL = "https://{domain}/api/v1/frontend/order/collect-manual"
data = {
   'scene': 2,
   'receive_address': 'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw',
   'callback_url': 'http://{mydomain}/callback',
   'out_trade_no': '123456',
}
json_data = json.dumps(data, sort_keys=True, separators=(',', ':'))
message = f'{timestamp}&{json_data}'
signature = hmac.new(API_SECRET.encode(), message.encode(), hashlib.sha256).hexdigest()


headers = {
    "API-KEY": API_KEY,
    "TIMESTAMP": timestamp,
    "SIGNATURE": signature,
    'Content-Type': 'application/json',
}

response = requests.post(f"{URL}", data=json_data, headers=headers)
print(response.json())




```

  </CodeGroupItem>

  <CodeGroupItem title="Php">

```php
<?php

$API_KEY = "B433BFF1CDE7450AA38A56BEAC690DD4";
$API_SECRET = "0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8";

$timestamp = time();

$data = [
    'scene' => 2,
    'receive_address' => 'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw',
    'callback_url' => 'http://{mydomain}/callback',
    'out_trade_no' => '123456',
];

ksort($data);

$json_data = json_encode($data, JSON_UNESCAPED_SLASHES);

$message = $timestamp . '&' . $json_data;

$signature = hash_hmac('sha256', $message, $API_SECRET);

$options = [
    'http' => [
        'header'  => "Content-Type: application/json\r\n" .
                     "API-KEY: $API_KEY\r\n" .
                     "TIMESTAMP: $timestamp\r\n" .
                     "SIGNATURE: $signature\r\n",
        'method'  => 'POST',
        'content' => $json_data,
    ],
];
$context  = stream_context_create($options);
$result = file_get_contents("https://{domain}/api/v1/frontend/order/collect-manual", false, $context);
var_dump($result);
?>

```

  </CodeGroupItem>

  <CodeGroupItem title="Java">
  
```java
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import okhttp3.*;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class Main {
    private static final String API_KEY = "B433BFF1CDE7450AA38A56BEAC690DD4";
    private static final String API_SECRET = "0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8";

    public static void main(String[] args) throws Exception {
        OkHttpClient client = new OkHttpClient().newBuilder().build();
        MediaType mediaType = MediaType.parse("application/json");
        String timestamp = String.valueOf(Instant.now().getEpochSecond());

        Map<String, Object> data = new HashMap<>();
        data.put("scene", 2);
        data.put("receive_address", "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw");
        data.put("callback_url", "http://{mydomain}/callback");
        data.put("out_trade_no", "123456");
        
        // Sorting the keys
        TreeMap<String, Object> sortedData = new TreeMap<>(data);
        Gson gson = new GsonBuilder().disableHtmlEscaping().create();
        String json_data = gson.toJson(sortedData);

        String message = timestamp + "&" + json_data;
        String signature = encodeHmacSHA256(message, API_SECRET);

        RequestBody body = RequestBody.create(json_data, mediaType);
        Request request = new Request.Builder()
                .url("https://{domain}/api/v1/frontend/order/collect-manual")
                .method("POST", body)
                .addHeader("API-KEY", API_KEY)
                .addHeader("TIMESTAMP", timestamp)
                .addHeader("SIGNATURE", signature)
                .addHeader("Content-Type", "application/json")
                .build();
        Response response = client.newCall(request).execute();
        System.out.println(response.body().string());
    }

    private static String encodeHmacSHA256(String data, String key) throws Exception {
        Mac sha256_HMAC = Mac.getInstance("HmacSHA256");
        SecretKeySpec secret_key = new SecretKeySpec(key.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
        sha256_HMAC.init(secret_key);
        byte[] bytes = sha256_HMAC.doFinal(data.getBytes(StandardCharsets.UTF_8));
        StringBuilder hash = new StringBuilder();
        for (byte b : bytes) {
            String hex = Integer.toHexString(0xff & b);
            if(hex.length() == 1) hash.append('0');
            hash.append(hex);
        }
        return hash.toString();
    }
}

```

  </CodeGroupItem>

  <CodeGroupItem title="Go">
  
```go
package main

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"strconv"
	"time"

	jsoniter "github.com/json-iterator/go"
)

const (
	APIKey    = "B433BFF1CDE7450AA38A56BEAC690DD4"
	APISecret = "0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"
	URL       = "https://{domain}/api/v1/frontend/order/collect-manual"
)

type Data struct {
	Scene         string `json:"scene"`
	ReceiveAddress string `json:"receive_address"`
	CallbackURL    string `json:"callback_url"`
	OutTradeNo     string `json:"out_trade_no"`
}

func main() {
	timestamp := strconv.FormatInt(time.Now().Unix(), 10)

	data := Data{
		Scene:   2,
		ReceiveAddress: "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw",
		CallbackURL:    "http://{mydomain}/callback",
		OutTradeNo:     "123456",
	}

	json := jsoniter.ConfigCompatibleWithStandardLibrary
	b, err := json.Marshal(data)
	if err != nil {
		panic(err)
	}
	json_data := string(b)

	message := timestamp + "&" + json_data
	signature := createHmac(message, APISecret)

	client := &http.Client{}
	req, err := http.NewRequest("POST", URL, bytes.NewBuffer([]byte(json_data)))
	if err != nil {
		panic(err)
	}

	req.Header.Set("API-KEY", APIKey)
	req.Header.Set("TIMESTAMP", timestamp)
	req.Header.Set("SIGNATURE", signature)
	req.Header.Set("Content-Type", "application/json")

	resp, err := client.Do(req)
	if err != nil {
		panic(err)
	}
	defer resp.Body.Close()

	respBody, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		panic(err)
	}
	fmt.Println(string(respBody))
}

func createHmac(message string, secret string) string {
	h := hmac.New(sha256.New, []byte(secret))
	h.Write([]byte(message))
	return hex.EncodeToString(h.Sum(nil))
}

```
  </CodeGroupItem>

  <CodeGroupItem title="Shell">
  
```shell
#!/bin/bash

API_KEY="B433BFF1CDE7450AA38A56BEAC690DD4"
API_SECRET="0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"
URL="https://{domain}/api/v1/frontend/order/collect-manual"

timestamp=$(date +%s)

data=$(echo '{
   "scene": 2,
   "receive_address": "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw",
   "callback_url": "http://{mydomain}/callback",
   "out_trade_no": "123456"
}' | jq -c -S '.')

message="${timestamp}&${data}"
signature=$(echo -n "${message}" | openssl dgst -sha256 -hmac ${API_SECRET} -binary | xxd -p)

curl --location --request POST ${URL} \
--header "API-KEY: ${API_KEY}" \
--header "TIMESTAMP: ${timestamp}" \
--header "SIGNATURE: ${signature}" \
--header "Content-Type: application/json" \
--data-raw "${data}"

```
  </CodeGroupItem>

  <CodeGroupItem title="Node">
  
```js
const crypto = require('crypto');
const axios = require('axios');

const API_KEY = "B433BFF1CDE7450AA38A56BEAC690DD4";
const API_SECRET = "0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8";

const timestamp = Math.floor(Date.now() / 1000).toString();
const URL = "https://{domain}/api/v1/frontend/order/collect-manual";
const data = {
    scene: 2,
    receive_address: 'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw',
    callback_url: 'http://{mydomain}/callback',
    out_trade_no: '123456',
};
const json_data = JSON.stringify(data, Object.keys(data).sort());
const message = `${timestamp}&${json_data}`;
const signature = crypto.createHmac('sha256', API_SECRET).update(message).digest('hex');

const headers = {
    "API-KEY": API_KEY,
    "TIMESTAMP": timestamp,
    "SIGNATURE": signature,
    'Content-Type': 'application/json',
};

axios.post(URL, json_data, { headers: headers })
    .then(response => {
        console.log(response.data);
    })
    .catch(error => {
        console.error("Error:", error);
    });

```
  </CodeGroupItem>
</CodeGroup>