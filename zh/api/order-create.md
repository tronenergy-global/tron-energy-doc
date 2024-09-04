---
title: 下单
---

# 下单


## 接口地址

```
POST /api/v1/frontend/order
```

## 请求参数

| 参数名称 | 类型 | 必填 | 说明 | 示例 |
| -------- | -------- | -------- | -------- | -------- |
| energy_amount   | int   |  是  |  所需能量 | 32000   |
| period  | string   |  是   | 租赁周期,1H/1D/3D/30D<br/>H表示1小时，D表示天 | 1H  |
| receive_address | Tron地址 | 是 | 地址需要是已激活的，否则下单失败 |  |
| callback_url | string | 否 | 委托成功将向此地址发送通知 | https://mydomain.com/callback |
| out_trade_no | string | 否 | 回调时将带上此信息，方便接收方关联订单 | S202302320004 |

## 返回参数

- 正常返回示例
```json
{
    "errno": 0,
    "serial": "7297a8a2a9e39b86fc5bad0d2e9edda2",
    "amount": 3120000,
    "balance": 813900029257
}
```
- 异常返回请参考[API返回值](/zh/general/error-code.md)

- 字段解释

| 参数名称 | 类型 | 说明 | 示例 |
| -------- | -------- | -------- | -------- |
| errno | int | 错误码，为0时正常 |  |
| message | string | 错误原因，errno > 0 时有 |  |
| serial | string | 内部订单号 |  |
| amount | int | 订单消耗，单位sun |  |
| balance | int | 余额，单位sun，转成TRX需要除以1000000 |  |

::: tip

- 下单后为了查询订单的完成状态，您可以使用[主动查询](/zh/api/order-query.md)或者[被动回调](/zh/general/callback.md)
  :::

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
URL = "https://{domain}/api/v1/frontend/order"
data = {
   'energy_amount': 32000,
   'period': '1D',
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
    'energy_amount' => 32000,
    'period' => '1D',
    'receive_address' => 'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw',
    'callback_url' => 'http://{mydomain}/callback',
    'out_trade_no' => '123456',
];

ksort($data);

$json_data = json_encode($data, JSON_UNESCAPED_SLASHES);

$message = $timestamp . '&' . $json_data;

$signature = hash_hmac('sha256', $message, $API_SECRET);

$ch = curl_init("https://{domain}/api/v1/frontend/order");
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, "POST");
curl_setopt($ch, CURLOPT_POSTFIELDS, $json_data);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "API-KEY: $API_KEY",
    "TIMESTAMP: $timestamp",
    "SIGNATURE: $signature"
]);

$result = curl_exec($ch);
curl_close($ch);
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
        data.put("energy_amount", 32000);
        data.put("period", "1D");
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
                .url("https://{domain}/api/v1/frontend/order")
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
	URL       = "https://{domain}/api/v1/frontend/order"
)

type Data struct {
	EnergyAmount   int    `json:"energy_amount"`
	Period         string `json:"period"`
	ReceiveAddress string `json:"receive_address"`
	CallbackURL    string `json:"callback_url"`
	OutTradeNo     string `json:"out_trade_no"`
}

func main() {
	timestamp := strconv.FormatInt(time.Now().Unix(), 10)

	data := Data{
		EnergyAmount:   32000,
		Period:         "1D",
		ReceiveAddress: "TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw",
		CallbackURL:    "http://{mydomain}/callback",
		OutTradeNo:     "123456",
	}

	jordered_data := map[string]interface{}{
		"energy_amount":        data.EnergyAmount,
		"period":               data.Period,
		"receive_address":      data.ReceiveAddress,
    "callback_url":         data.CallbackURL,
    "out_trade_no":         data.OutTradeNo,
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
URL="https://{domain}/api/v1/frontend/order"

timestamp=$(date +%s)

data=$(echo '{
   "energy_amount": 32000,
   "period": "1D",
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
const URL = "https://{domain}/api/v1/frontend/order";
const data = {
    energy_amount: 32000,
    period: '1D',
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