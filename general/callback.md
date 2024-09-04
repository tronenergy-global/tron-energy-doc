# callback

After the current commissioned energy is completed, it will try to send a message to notify the initiator. There are currently two places where you can set the callback address.
- 1. In [My](https://{domain}/buyer/me) settings, set the default callback address
- 2. Specify the callback_url parameter to overwrite the default callback address when placing an order.
``` json
data = {
    'energy_amount': '32000',
    'period': '1H',
    'receive_address': 'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw',
    'callback_url': 'http://{mydomain}/callback',
    'out_trade_no': '123456',
}
```

## Respond & Retry
The response body is as follows
```json
{
     'active_hash': '', // If activated, activated txid
     'bandwidth_hash': '5e342a821de72542d7b341039c34af631d0551cfcd4b67c272', // If there is bandwidth, the txid of the bandwidth
     'energy_amount': 32000, // Order energy
     'out_trade_no': '123456', // External order number
     'pay_amount': 32170.005048646104, // Actual commission energy
     'serial': '886294f5204ac2fc1430f5a7d9215a80', // Internal order number
     'txid': '2610c200efc8a90601758715405fa6be4597469e854591975d113b720a762ec2', // txid of energy
     'status': 40, // Status 40 is successful, 41 is failed
     type': 'energy', // type
     'receive_address': 'Txxxxxx', // receive address
     'source': 'manual/api/auto_delegate/count_delegate', // order source
}
```
If you receive the callback information, you only need to return `HTTP 200`, which means that the message has been processed and this callback will no longer be sent. Otherwise, it will try to send repeatedly until the expected response is obtained.
The current retry frequency is `15s, 15s, 30s, 180s, 600s, 1200s, 1800s`. If there is no response, it will not be sent again.

## Verification
When the server sends a callback message, it will use the order API to sign. The receiver needs to verify the signature and then perform logical processing, otherwise unnecessary losses may be caused. The server's signature process and order initiation [signature](/general/ sign.md), the receiver needs to use the timestamp in the callback request for encryption, and verify whether the `SIGNATURE` of the callback is consistent.

## Code Example
<CodeGroup>
  <CodeGroupItem title="Python" active>

```python
import hmac
import hashlib
import time
import json

def callback(self, request):
   def _verify_signature(signature, timestamp):
       api_secret = '0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8'
       json_data = json.dumps(request.data, sort_keys=True)


       message = f"{timestamp}&{json_data}"
       expected_signature = hmac.new(api_secret.encode(), message.encode(), hashlib.sha256).hexdigest()


       return hmac.compare_digest(signature, expected_signature)


   signature = request.META.get('HTTP_SIGNATURE')
   timestamp = request.META.get('HTTP_TIMESTAMP')


   if not all([signature, timestamp]):
       return None


   if time.time() - float(timestamp) > 100:
       # 视情况，是否要继续处理
       print('timestamp expired')


   if _verify_signature(signature, timestamp):
       print(request.data)
   else:
       print('verify signature failed')


   return Response({})
```

  </CodeGroupItem>

  <CodeGroupItem title="Php">

```php
<?php
$api_secret = "0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8";
$headers = []; // your headers here
$body = []; // your body data here

$timestamp = $headers['TIMESTAMP'];
$signature = $headers['SIGNATURE'];

ksort($body);
$json_data = json_encode($body, JSON_UNESCAPED_SLASHES);

$message = $timestamp . '&' . $json_data;
$expected_signature = hash_hmac('sha256', $message, $api_secret);

if (hash_equals($signature, $expected_signature)) {
    echo "Signature is valid.\n";
    print_r($body);
} else {
    echo "Signature is invalid.\n";
}

```

  </CodeGroupItem>

  <CodeGroupItem title="Java">
  
```java
import org.apache.commons.codec.digest.HmacAlgorithms;
import org.apache.commons.codec.digest.HmacUtils;
import org.apache.commons.lang3.StringUtils;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        String apiSecret = "0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8";
        Map<String, String> headers = new HashMap<>(); // your headers here
        Map<String, Object> body = new HashMap<>(); // your body data here

        String timestamp = headers.get("TIMESTAMP");
        String signature = headers.get("SIGNATURE");

        Gson gson = new GsonBuilder().disableHtmlEscaping().create();

        TreeMap<String, Object> sortedBody = new TreeMap<>(body);
        String jsonData = gson.toJson(sortedBody);

        String message = timestamp + "&" + jsonData;
        String expectedSignature = new HmacUtils(HmacAlgorithms.HMAC_SHA_256, apiSecret).hmacHex(message);

        if (StringUtils.equals(signature, expectedSignature)) {
            System.out.println("Signature is valid.");
            System.out.println(body);
        } else {
            System.out.println("Signature is invalid.");
        }
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
    "sort"
)

type Body map[string]interface{}

func (b Body) MarshalJSON() ([]byte, error) {
    keys := make([]string, 0, len(b))
    for k := range b {
        keys = append(keys, k)
    }
    sort.Strings(keys)

    result := "{"
    for _, k := range keys {
        value, _ := json.Marshal(b[k])
        result += fmt.Sprintf(`"%s":%s,`, k, string(value))
    }
    result = result[:len(result)-1] + "}"
    return []byte(result), nil
}

func main() {
    apiSecret := "0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"
    headers := map[string]string{} // your headers here
    body := Body{} // your body data here

    timestamp := headers["TIMESTAMP"]
    signature := headers["SIGNATURE"]

    jsonData, _ := json.Marshal(body)
    message := timestamp + "&" + string(jsonData)

    mac := hmac.New(sha256.New, []byte(apiSecret))
    mac.Write([]byte(message))
    expectedSignature := hex.EncodeToString(mac.Sum(nil))

    if signature == expectedSignature {
        fmt.Println("Signature is valid.")
        fmt.Println(body)
    } else {
        fmt.Println("Signature is invalid.")
    }
}

```
  </CodeGroupItem>

  <CodeGroupItem title="Shell">
  
```shell
api_secret="0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"
timestamp=$HTTP_TIMESTAMP
signature=$HTTP_SIGNATURE
body=$(echo $HTTP_BODY | jq -S .)  # Requires jq to sort keys in json.

message="${timestamp}&${body}"
expected_signature=$(echo -n "${message}" | openssl dgst -sha256 -hmac "${api_secret}")

if [ "${signature}" = "${expected_signature}" ]; then
    echo "Signature is valid."
    echo "${body}"
else
    echo "Signature is invalid."
fi

```
  </CodeGroupItem>
</CodeGroup>