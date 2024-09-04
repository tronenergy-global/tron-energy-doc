# 回调

当前委托能量完成后，会尝试发送消息通知发起方，当前有两个地方可以设置回调地址
- 1，在[我的](https://{domain}/buyer/me)设置中，设置默认的回调地址
- 2，在下单的时候指定callback_url参数覆盖默认回调地址
``` json
data = {
   'energy_amount': '32000',
   'period': '1H',
   'receive_address': 'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw',
   'callback_url': 'http://{mydomain}/callback',
   'out_trade_no': '123456',
}
```

## 响应&重试
响应body如下
```json
{
    'active_hash': '',  // 如果有激活，激活的txid
    'bandwidth_hash': '5e342a821de72542d7b341039c34af631d0551cfcd4b67c272', // 如果有带宽，带宽的txid
    'energy_amount': 32000, // 下单能量
    'out_trade_no': '123456',  // 外部订单号
    'pay_amount': 32170.005048646104,  // 实际委托能量
    'serial': '886294f5204ac2fc1430f5a7d9215a80', // 内部订单号
    'txid': '2610c200efc8a90601758715405fa6be4597469e854591975d113b720a762ec2', // 能量的txid
    'status': 40,  // 状态 40成功，41失败
    'type': 'energy', // 类型
    'receive_address': 'Txxxxxx', // 地址
    'source': 'manual/api/auto_delegate/count_delegate', // 手动下单/API下单/智能委托/笔数委托
}
```
如果您接受到了回调信息，只需要返回`HTTP 200`，即表示消息已处理，本条回调不再会发送，否则会尝试重复发送直到获得期望的响应，
目前的重试频率为`15s, 15s, 30s, 180s, 600s, 1200s, 1800s`，都无响应后，不再重复发送。

## 校验
服务器在发送回调消息时，会使用下单的API进行签名，接收方需验证签名后进行逻辑处理，否则可能会造成不必要的损失，服务器的签名过程和下单发起[签名](/zh/general/sign.md)的过程一致，接收方需要使用回调请求中的timestamp进行加密，并校验回调的`SIGNATURE`是否一致

## 代码示例
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