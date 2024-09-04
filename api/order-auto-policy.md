---
title: Smart Delegate
---

#Smart delegate


## interface address

```
POST /api/v1/frontend/auto-delegate-policy
```

## Request parameters

| Parameter name | Type | Required | Description | Example |
| -------- | -------- | -------- | -------- | -------- |
| period | int | Yes | Commission period, 1-30 | 10 |
| receive_address | Tron address | Yes | The address needs to be activated, otherwise the order will fail | |
| max_energy | int | no | Amount to keep available | 65000 |


::: tip

- max_energy example, assuming it is set to 65,000. Now a transfer consumes 32,000, and 32,000 will be replenished immediately, making the current available amount 65,000.
   :::

## Return parameters

- Normal return example
```json
{
     "errno": 0,
     "message": "1 smart delegate has been added",
     "balance": 813900029257
}
```
- For exception returns, please refer to [API return value](/en/general/error-code.md)

- Field explanation

| Parameter name | Type | Description | Example |
| -------- | -------- | -------- | -------- |
| errno | int | Error code, normal when it is 0 | |
| message | string | Error reason, if errno > 0 | |
| balance | int | Balance, in sun, needs to be divided by 1000000 to convert to TRX | |


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
URL = "https://{domain}/api/v1/frontend/auto-delegate-policy"
data = {
   'receive_address': 'TEX5nLeFJ1dyazhJC3P9eYJs7hxgk7knJY',   
   'period': 5,      # 1-30
   'max_energy': 0,  # max energy，0 auto
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


## ==Query==

## interface address
```
GET /api/v1/frontend/auto-delegate-policy?receive_address=
```

## Request parameters

| Parameter name | Type | Required | Description | Example |
| -------- | -------- | -------- | -------- | -------- |
| receive_address | Tron address | No | Query a specific address, if not filled in, return all | |


## Return parameters

- Normal return example
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
             "status": 1, // Is it valid?
             "last_step": 1, // See the table below for explanation
             "main_delegated": false, // Delegated status, valid during automatic renewal
             "expired_time": null,
             "create_time": "2023-10-09T11:13:12.288373+08:00",
             "update_time": "2023-10-09T16:35:36.559760+08:00",
             "last_step_display": "delegated",
             "status_display": "on",
             "auto_type": 1, // 1 is smart hosting, 2 is automatic renewal only
             "auto_type_display": "smart hosting",
             "next_delegate_time": null, // Valid during automatic renewal
             "max_energy": 50000, // maintain energy
             "period": 3, // Commission period
         },
         ...
     ]
}
```

| Parameter name | Type |
| -------- | -------- |
| 0 | Commissioning |
| 1 | Commission successful |
| 2 | Release of delegation |
| 10 | Insufficient balance |
| 20 | Insufficient energy |
| 30 | Waiting for commission |


## ==Modify status==
## interface address
```
POST /api/v1/frontend/auto-delegate-policy/{id}/change-status
```

## Request parameters

| Parameter name | Type | Required | Description | Example |
| -------- | -------- | -------- | -------- | -------- |
| status | int | yes | 1-enabled, 0-disabled |

## Return parameters

- Normal return example
```json
{"errno":0}
```