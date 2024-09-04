---
title: Интеллектуальная делегация
---

# Интеллектуальная делегация


## Адрес API

```
POST /api/v1/frontend/auto-delegate-policy
```

## Параметры запроса

| Название параметра | Тип | Обязательно | Описание | Пример |
| -------- | -------- | -------- | -------- | -------- |
| period   | int   |  Да  |  Период делегации, 1-30 | 10   |
| receive_address | Tron адрес | Да | Адрес должен быть активирован, иначе заказ будет отклонен |  |
| max_energy | int | Нет | Поддерживаемое количество энергии | 

```markdown
---
title: Интеллектуальная делегация
---

# Интеллектуальная делегация


## Адрес API

```
POST /api/v1/frontend/auto-delegate-policy
```

## Параметры запроса

| Название параметра | Тип | Обязательно | Описание | Пример |
| -------- | -------- | -------- | -------- | -------- |
| period   | int   |  Да  |  Период делегации, 1-30 | 10   |
| receive_address | Tron адрес | Да | Адрес должен быть активирован, иначе заказ будет отклонен |  |
| max_energy | int | Нет | Поддерживаемое количество энергии | 65000 |


::: tip

- Пример max_energy: если установить значение на 65000, и сейчас перевести сумму, которая требует 32000 энергии, то система немедленно пополнит 32000, чтобы доступное количество энергии снова стало 65000.
  :::

## Параметры ответа

- Пример нормального ответа
```json
{
    "errno": 0,
    "message": "Добавлено 1 интеллектуальное делегирование",
    "balance": 813900029257
}
```
- Пример ошибки можно найти в разделе [API возвращает значения](/ru/general/error-code.md)

- Пояснение полей

| Название параметра | Тип | Описание | Пример |
| -------- | -------- | -------- | -------- |
| errno | int | Код ошибки, 0 означает успешное выполнение |  |
| message | string | Причина ошибки, присутствует, если errno > 0 |  |
| balance | int | Баланс, единица измерения sun, для перевода в TRX нужно разделить на 1000000 |  |


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
URL = "https://{domain}/api/v1/frontend/auto-delegate-policy"
data = {
   'receive_address': 'TEX5nLeFJ1dyazhJC3P9eYJs7hxgk7knJY',   
   'period': 5,      # 天数1-30
   'max_energy': 0,  # 保持能量上限，0为自动
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
    'max_energy' => 0,
    'period' => 5,
    'receive_address' => 'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw'
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
$result = file_get_contents("https://{domain}/api/v1/frontend/auto-delegate-policy", false, $context);
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
        data.put("max_energy", 0);
        data.put("period", 5);
        data.put("receive_address", "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw");
        
        // Sorting the keys
        TreeMap<String, Object> sortedData = new TreeMap<>(data);
        Gson gson = new GsonBuilder().disableHtmlEscaping().create();
        String json_data = gson.toJson(sortedData);

        String message = timestamp + "&" + json_data;
        String signature = encodeHmacSHA256(message, API_SECRET);

        RequestBody body = RequestBody.create(json_data, mediaType);
        Request request = new Request.Builder()
                .url("https://{domain}/api/v1/frontend/auto-delegate-policy")
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
	URL       = "https://{domain}/api/v1/frontend/auto-delegate-policy"
)

type Data struct {
	MaxEnergy   int    `json:"max_energy"`
	Period         int `json:"period"`
	ReceiveAddress string `json:"receive_address"`
}

func main() {
	timestamp := strconv.FormatInt(time.Now().Unix(), 10)

	data := Data{
		MaxEnergy:   0,
		Period:         5,
		ReceiveAddress: "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw",
	}

  ordered_data := map[string]interface{}{
		"max_energy":       data.MaxEnergy,
		"period":           data.Period,
		"receive_address":  data.ReceiveAddress,
	}

	json := jsoniter.ConfigCompatibleWithStandardLibrary
	b, err := json.Marshal(ordered_data)
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
URL="https://{domain}/api/v1/frontend/auto-delegate-policy"

timestamp=$(date +%s)

data=$(echo '{
   "max_energy": 0,
   "period": 5,
   "receive_address": "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw","
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
</CodeGroup>


## ==查询==

## 接口地址
```
GET /api/v1/frontend/auto-delegate-policy?receive_address=
```

## 请求参数

| 参数名称 | 类型 | 必填 | 说明 | 示例 |
| -------- | -------- | -------- | -------- | -------- |
| receive_address | Tron地址 | 否 | 查询特定的地址，如果不填则返回所有 |  |


## 返回参数

- 正常返回示例
```json
{
    "count": 2,
    "code": 0,
    "page": 1,
    "next": null,
    "previous": null,
    "results": [
        {
            "id": 21,
            "receive_address": "TNfdtE7p8pEfTTbfRb88gikf2tt5ENc86b",
            "status": 1, // 是否生效
            "last_step": 1,   // 见下表解释
            "main_delegated": false,  // 委托状态，自动续期时有效
            "expired_time": null,
            "create_time": "2023-10-09T11:13:12.288373+08:00",
            "update_time": "2023-10-09T16:35:36.559760+08:00",
            "last_step_display": "\u59d4\u6258\u6210\u529f",
            "status_display": "\u542f\u7528",
            "auto_type": 1,       // 1为智能托管，2为仅自动续期
            "auto_type_display": "\u5168\u81ea\u52a8\u6258\u7ba1",
            "next_delegate_time": null,  // 自动续期时有效
            "max_energy": 50000,  // 保持能量
            "period": 3,    //  委托周期    
        },
        ...
    ]
}
```

| 参数名称 | 类型 |
| -------- | -------- |
| 0 | 委托中  |
| 1 | 委托成功  |
| 2 | 解除委托  |
| 10 | 余额不足  |
| 20 | 能量不足  |
| 30 | 等待委托  |


## ==修改状态==
## 接口地址
```
POST /api/v1/frontend/auto-delegate-policy/{id}/change-status
```

## 请求参数

| 参数名称 | 类型 | 必填 | 说明 | 示例 |
| -------- | -------- | -------- | -------- | -------- |
| status | int | 是 | 1-启用， 0-关闭 |  

## 返回参数

- 正常返回示例
```json
{"errno":0}
```