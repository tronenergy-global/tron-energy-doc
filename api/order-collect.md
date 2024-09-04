---
title: Collection API
---

## background
If your scenario is to collect funds from the payment address to the cold/hot wallet, the ordinary energy interface can no longer meet the needs. For this reason, we have rebuilt the collection interface to make it very simple for you to collect.


## interface address

```
POST /api/v1/frontend/order/collect-manual
```

## Request parameters

| Parameter name | Type | Required | Description | Example |
| -------- | -------- | -------- | -------- | -------- |
| scene | int | Yes | Collection scene | 0-Auto |
| receive_address | Tron address | Yes | | |
| to_address | Tron address | No | The address that needs to be transferred<br/>In some scenarios, you are not transferring to the collection address. It is possible that the recipient does not have U, and additional energy needs to be consumed<br/>This parameter will be automatically judged. If the other party does not have U, it will Agent extra energy, but will incur certain fees |  |
| callback_url | string | No | Delegation success/failure will be notified to this address | https://mydomain.com/callback |
| out_trade_no | string | No | This information will be brought during the callback to facilitate the receiver to associate orders | S202302320004 |

## Return parameters

- Normal return example
```json
{
     "errno": 0,
     "serial": "7297a8a2a9e39b86fc5bad0d2e9edda2",
     "scene": 1,
     "amount": 4000000,
     "balance": 813900029257
}
```
- For exception returns, please refer to [API return value](/en/general/error-code.md)

- Field explanation

| Parameter name | Type | Description | Example |
| -------- | -------- | -------- | -------- |
| errno | int | Error code, normal when it is 0 | |
| message | string | Error reason, if errno > 0 | |
| serial | string | internal order number | |
| scene | int | Automatic judgment at 0 will return the actual execution scenario |  |
| amount | int | The order cost, in sun, needs to be divided by 1000000 to convert to TRX | |
| balance | int | Balance, in sun, needs to be divided by 1000000 to convert to TRX | |

::: tip

- In order to check the completion status of the order after placing the order, you can use [active query](/en/api/order-query.md) or [passive callback](/en/general/callback.md)
   :::

## Code Example
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

  ordered_data := map[string]interface{}{
    "scene":        data.Scene,
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