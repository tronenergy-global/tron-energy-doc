---
title: 转账笔数购买
---

# 购买笔数


## 接口地址

```
POST /api/v1/frontend/count-delegate-policy
```

## 请求参数

| 参数名称 | 类型 | 必填 | 说明 | 示例 |
| -------- | -------- | -------- | -------- | -------- |
| times   | int   |  是  |  购买次数, 5-1000次 | 10   |
| receive_address | Tron地址 | 是 | 地址需要是已激活的，否则下单失败 |  |

::: tip

- 如果地址的带宽/trx不足，平台将自动转转移0.345trx，保证转账顺利进行
  :::

## 返回参数

- 正常返回示例
```json
{
    "errno": 0,
    "balance": 813900029257
}
```
- 异常返回请参考[API返回值](/zh/general/error-code.md)

- 字段解释

| 参数名称 | 类型 | 说明 | 示例 |
| -------- | -------- | -------- | -------- |
| errno | int | 错误码，为0时正常 |  |
| message | string | 错误原因，errno > 0 时有 |  |
| balance | int | 余额，单位sun，转成TRX需要除以1000000 |  |


## 代码示例
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
URL = "https://{domain}/api/v1/frontend/count-delegate-policy"
data = {
   'receive_address': 'TEX5nLeFJ1dyazhJC3P9eYJs7hxgk7knJY',     # 购买次数的地址
   'times': 5,      # 购买次数
   'bandwidth': 0,  # 是否同时保证带宽
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
    'bandwidth' => 1,
    'times' => 5,
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
$result = file_get_contents("https://{domain}/api/v1/frontend/count-delegate-policy", false, $context);
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
        data.put("bandwidth", 1);
        data.put("times", 5);
        data.put("receive_address", "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw");
        
        // Sorting the keys
        TreeMap<String, Object> sortedData = new TreeMap<>(data);
        Gson gson = new GsonBuilder().disableHtmlEscaping().create();
        String json_data = gson.toJson(sortedData);

        String message = timestamp + "&" + json_data;
        String signature = encodeHmacSHA256(message, API_SECRET);

        RequestBody body = RequestBody.create(json_data, mediaType);
        Request request = new Request.Builder()
                .url("https://{domain}/api/v1/frontend/count-delegate-policy")
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
	URL       = "https://{domain}/api/v1/frontend/count-delegate-policy"
)

type Data struct {
	Bandwidth   int    `json:"bandwidth"`
	Times         int `json:"times"`
	ReceiveAddress string `json:"receive_address"`
}

func main() {
	timestamp := strconv.FormatInt(time.Now().Unix(), 10)

	data := Data{
		Bandwidth:   1,
		Times:         5,
		ReceiveAddress: "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw",
	}

  ordered_data := map[string]interface{}{
		"bandwidth":       data.Bandwidth,
		"receive_address": data.ReceiveAddress,
		"times":           data.Times,
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
URL="https://{domain}/api/v1/frontend/count-delegate-policy"

timestamp=$(date +%s)

data=$(echo '{
   "bandwidth": 1,
   "times": 5,
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


# 查询

## 接口地址
```
GET /api/v1/frontend/count-delegate-policy?receive_address=
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
            "id": 2,
            "receive_address": "TEX5nLeFJ1dyazhJC3P9eYJs7hxgk7knJF",
            "status": 1,
            "last_step": 0,
            "main_delegated": false,
            "expired_time": null,
            "create_time": "2023-08-23T11:09:27.986610+08:00",
            "update_time": "2023-08-23T11:09:27.986660+08:00",
            "last_step_display": "委托中",
            "status_display": "启用",
            "auto_type": 1,                     // 1-仅能量，2-能量+带宽
            "auto_type_display": "仅能量",
            "max_energy": 65000,
            "period": 7,
            "count_limit": 8                    // 剩余次数
        },
        ...
    ]
}
```