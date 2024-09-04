# Обратный вызов

После завершения текущей делегированной энергии будет предпринята попытка отправить уведомление инициатору. В настоящее время есть два места, где можно настроить URL обратного вызова
- 1. В настройках [Мой профиль](https://{domain}/buyer/me), чтобы установить URL обратного вызова по умолчанию
- 2. Указав параметр callback_url при создании заказа, чтобы переопределить URL обратного вызова по умолчанию
``` json
data = {
   'energy_amount': '32000',
   'period': '1H',
   'receive_address': 'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw',
   'callback_url': 'http://{mydomain}/callback',
   'out_trade_no': '123456',
}
```

## Ответ и повторные попытки
Ответное тело выглядит следующим образом
```json
{
    'active_hash': '',  // Если есть активация, txid активации
    'bandwidth_hash': '5e342a821de72542d7b341039c34af631d0551cfcd4b67c272', // Если есть полоса пропускания, txid полосы пропускания
    'energy_amount': 32000, // Заказанная энергия
    'out_trade_no': '123456',  // Внешний номер заказа
    'pay_amount': 32170.005048646104,  // Фактически делегированная энергия
    'serial': '886294f5204ac2fc1430f5a7d9215a80', // Внутренний номер заказа
    'txid': '2610c200efc8a90601758715405fa6be4597469e854591975d113b720a762ec2', // Txid энергии
    'status': 40,  // Статус: 40 - успех, 41 - неудача
    'type': 'energy', // Тип
    'receive_address': 'Txxxxxx', // Адрес
    'source': 'manual/api/auto_delegate/count_delegate', // Ручной заказ/API заказ/умная делегация/подсчет делегаций
}
```
Если вы получили сообщение обратного вызова, просто верните `HTTP 200`, что означает, что сообщение обработано, и этот обратный вызов не будет отправлен снова. В противном случае будут предприняты попытки повторной отправки до получения ожидаемого ответа.
Текущая частота повторных попыток: `15с, 15с, 30с, 180с, 600с, 1200с, 1800с`. Если ответа не будет, повторные отправки прекратятся.

## Проверка
Сервер будет использовать API для подписи обратного вызова при отправке сообщения. Получатель должен проверить подпись перед обработкой логики, иначе могут возникнуть ненужные потери, серверный процесс подписи аналогичен процессу подписи при создании заказа [подпись](/ru/general/sign.md). Получатель должен использовать timestamp из запроса обратного вызова для шифрования и проверки一致ия `SIGNATURE` в обратном вызове

## Пример кода
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