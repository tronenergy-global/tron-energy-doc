<template><div><h1 id="поиск-заказа-один" tabindex="-1"><a class="header-anchor" href="#поиск-заказа-один" aria-hidden="true">#</a> Поиск заказа (один)</h1>
<h2 id="адрес-api" tabindex="-1"><a class="header-anchor" href="#адрес-api" aria-hidden="true">#</a> Адрес API</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>GET /api/v1/frontend/order/query?serial={serial_no}
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="параметры-запроса" tabindex="-1"><a class="header-anchor" href="#параметры-запроса" aria-hidden="true">#</a> Параметры запроса</h2>
<table>
<thead>
<tr>
<th>Название параметра</th>
<th>Тип</th>
<th>Обязательно</th>
<th>Описание</th>
<th>Пример</th>
</tr>
</thead>
<tbody>
<tr>
<td>serial</td>
<td>string</td>
<td>Да</td>
<td>Номер заказа, возвращаемый при размещении заказа</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="параметры-ответа" tabindex="-1"><a class="header-anchor" href="#параметры-ответа" aria-hidden="true">#</a> Параметры ответа</h2>
<ul>
<li>Пример нормального ответа</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"errno"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"receive_address"</span><span class="token operator">:</span> <span class="token string">"TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw"</span><span class="token punctuation">,</span> 
    <span class="token property">"order_no"</span><span class="token operator">:</span> <span class="token string">"58b451473d290f92443eabf0322b9907"</span><span class="token punctuation">,</span> 
    <span class="token property">"energy_amount"</span><span class="token operator">:</span> <span class="token number">32000</span><span class="token punctuation">,</span> 
    <span class="token property">"pay_amount"</span><span class="token operator">:</span> <span class="token number">0.0</span><span class="token punctuation">,</span> 
    <span class="token property">"amount"</span><span class="token operator">:</span> <span class="token number">3800000</span><span class="token punctuation">,</span> 
    <span class="token property">"details"</span><span class="token operator">:</span> <span class="token punctuation">[</span> <span class="token comment">// Заказы большого объема могут быть разбиты на несколько делегаций</span>
        <span class="token punctuation">{</span>
            <span class="token property">"delegate_hash"</span><span class="token operator">:</span> <span class="token string">"e2e71df638a9e01492a50bebba072a39eb75f673e91d5374ccf517f44e113f3"</span><span class="token punctuation">,</span>
            <span class="token property">"delegate_time"</span><span class="token operator">:</span> <span class="token string">"2023-10-09T10:21:07.840478Z"</span><span class="token punctuation">,</span>
            <span class="token property">"reclaim_hash"</span><span class="token operator">:</span> <span class="token string">"f4672a9563947cf78e5534b4025451dfd75efa5481a67b20ee55b9be368c900"</span><span class="token punctuation">,</span>
            <span class="token property">"reclaim_time"</span><span class="token operator">:</span> <span class="token string">"2023-10-12T10:21:07.840478Z"</span><span class="token punctuation">,</span>
            <span class="token property">"reclaim_time_real"</span><span class="token operator">:</span> <span class="token string">"2023-10-09T10:26:12.617456Z"</span><span class="token punctuation">,</span>
            <span class="token property">"status"</span><span class="token operator">:</span> <span class="token number">30</span> <span class="token comment">// 20-В процессе делегации, 30-Восстановлено</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">]</span><span class="token punctuation">,</span>
    <span class="token property">"create_time"</span><span class="token operator">:</span> <span class="token string">"2023-06-15T21:42:13.200565+08:00"</span><span class="token punctuation">,</span> 
    <span class="token property">"api_name"</span><span class="token operator">:</span> <span class="token string">"MY API"</span><span class="token punctuation">,</span> 
    <span class="token property">"period"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span> 
    <span class="token property">"status"</span><span class="token operator">:</span> <span class="token number">30</span><span class="token punctuation">,</span> <span class="token comment">// 30 означает, что делегация полностью успешна</span>
    <span class="token property">"refund_amount"</span><span class="token operator">:</span> <span class="token number">0</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Пример ошибки</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"errno"</span><span class="token operator">:</span> <span class="token number">404</span><span class="token punctuation">,</span>
    <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"Заказ не найден"</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>Пояснение полей</li>
</ul>
<table>
<thead>
<tr>
<th>Название параметра</th>
<th>Тип</th>
<th>Описание</th>
<th>Пример</th>
</tr>
</thead>
<tbody>
<tr>
<td>receive_address</td>
<td>string</td>
<td>Адрес получения энергии</td>
<td></td>
</tr>
<tr>
<td>order_no</td>
<td>string</td>
<td>Номер заказа, тот же, что и serial</td>
<td></td>
</tr>
<tr>
<td>energy_amount</td>
<td>int</td>
<td>Количество энергии в заказе</td>
<td></td>
</tr>
<tr>
<td>pay_amount</td>
<td>float</td>
<td>Делегированная энергия</td>
<td></td>
</tr>
<tr>
<td>amount</td>
<td>int</td>
<td>Оплаченная сумма в TRX, единица измерения sun</td>
<td></td>
</tr>
<tr>
<td>create_time</td>
<td>string</td>
<td>Время размещения заказа</td>
<td></td>
</tr>
<tr>
<td>api_name</td>
<td>string</td>
<td>API, через который размещен заказ</td>
<td></td>
</tr>
<tr>
<td>period</td>
<td>int</td>
<td>Срок аренды, в настоящее время поддерживаются<br/>0 (1 час), 1 (1 день),<br/>3 (3 дня), 30 (30 дней)</td>
<td></td>
</tr>
<tr>
<td>status</td>
<td>int</td>
<td>Статус заказа <br/>(0, 'Закрыто по таймауту'),<br/>(10, 'Ожидание оплаты'),<br/>(20, 'Оплачено'),<br/>(30, 'Подготовка делегации'),<br/>(31, 'Частичная делегация'),<br/>(32, 'Повторная попытка из-за ошибки'),<br/>(40, 'Успешное завершение'),<br/>(41, 'Возврат завершен'),<br/>(43, 'Ошибка завершения'),</td>
<td></td>
</tr>
<tr>
<td>refund_amount</td>
<td>int</td>
<td>Сумма возврата, единица измерения sun</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="пример-кода" tabindex="-1"><a class="header-anchor" href="#пример-кода" aria-hidden="true">#</a> Пример кода</h2>
<CodeGroup>
  <CodeGroupItem title="Python" active>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> requests

API_KEY <span class="token operator">=</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
URL <span class="token operator">=</span> <span class="token string">"https://{domain}/api/v1/frontend/order/query"</span>
params <span class="token operator">=</span> <span class="token punctuation">{</span><span class="token string">'serial'</span><span class="token punctuation">:</span> <span class="token string">'58b451473d290f92443eabf0322b9907'</span><span class="token punctuation">}</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">"API-KEY"</span><span class="token punctuation">:</span> API_KEY
<span class="token punctuation">}</span>
response <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>URL<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">,</span> params<span class="token operator">=</span>params<span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Php">
<div class="language-php line-numbers-mode" data-ext="php"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$API_KEY</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span><span class="token punctuation">;</span>
<span class="token variable">$URL</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"https://{domain}/api/v1/frontend/order/query"</span><span class="token punctuation">;</span>
<span class="token variable">$params</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'serial'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'58b451473d290f92443eabf0322b9907'</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$headers</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'API-KEY'</span> <span class="token operator">=></span> <span class="token variable">$API_KEY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$context</span> <span class="token operator">=</span> <span class="token function">stream_context_create</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token string single-quoted-string">'http'</span> <span class="token operator">=></span> <span class="token keyword">array</span><span class="token punctuation">(</span>
        <span class="token string single-quoted-string">'method'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'GET'</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">'header'</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"API-KEY: "</span> <span class="token operator">.</span> <span class="token variable">$API_KEY</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$response</span> <span class="token operator">=</span> <span class="token function">file_get_contents</span><span class="token punctuation">(</span><span class="token variable">$URL</span> <span class="token operator">.</span> <span class="token string double-quoted-string">"?"</span> <span class="token operator">.</span> <span class="token function">http_build_query</span><span class="token punctuation">(</span><span class="token variable">$params</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span> <span class="token variable">$context</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token function">json_decode</span><span class="token punctuation">(</span><span class="token variable">$response</span><span class="token punctuation">,</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Java">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">okhttp3<span class="token punctuation">.</span></span><span class="token class-name">OkHttpClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">okhttp3<span class="token punctuation">.</span></span><span class="token class-name">Request</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">okhttp3<span class="token punctuation">.</span></span><span class="token class-name">Response</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">OkHttpClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OkHttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token string">"https://{domain}/api/v1/frontend/order/query?serial=58b451473d290f92443eabf0322b9907"</span><span class="token punctuation">;</span>
        <span class="token class-name">Request</span> request <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Request<span class="token punctuation">.</span>Builder</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">url</span><span class="token punctuation">(</span>url<span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">addHeader</span><span class="token punctuation">(</span><span class="token string">"API-KEY"</span><span class="token punctuation">,</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span><span class="token punctuation">)</span>
                <span class="token punctuation">.</span><span class="token function">build</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">try</span> <span class="token punctuation">{</span>
            <span class="token class-name">Response</span> response <span class="token operator">=</span> client<span class="token punctuation">.</span><span class="token function">newCall</span><span class="token punctuation">(</span>request<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">execute</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span><span class="token function">body</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">string</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">catch</span> <span class="token punctuation">(</span><span class="token class-name">IOException</span> e<span class="token punctuation">)</span> <span class="token punctuation">{</span>
            e<span class="token punctuation">.</span><span class="token function">printStackTrace</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Go">
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
	<span class="token string">"io/ioutil"</span>
	<span class="token string">"net/http"</span>
	<span class="token string">"fmt"</span>
<span class="token punctuation">)</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
	API_KEY <span class="token operator">:=</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
	URL <span class="token operator">:=</span> <span class="token string">"https://{domain}/api/v1/frontend/order/query?serial=58b451473d290f92443eabf0322b9907"</span>

	client <span class="token operator">:=</span> <span class="token operator">&amp;</span>http<span class="token punctuation">.</span>Client<span class="token punctuation">{</span><span class="token punctuation">}</span>
	req<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> http<span class="token punctuation">.</span><span class="token function">NewRequest</span><span class="token punctuation">(</span><span class="token string">"GET"</span><span class="token punctuation">,</span> URL<span class="token punctuation">,</span> <span class="token boolean">nil</span><span class="token punctuation">)</span>
	req<span class="token punctuation">.</span>Header<span class="token punctuation">.</span><span class="token function">Set</span><span class="token punctuation">(</span><span class="token string">"API-KEY"</span><span class="token punctuation">,</span> API_KEY<span class="token punctuation">)</span>

	resp<span class="token punctuation">,</span> err <span class="token operator">:=</span> client<span class="token punctuation">.</span><span class="token function">Do</span><span class="token punctuation">(</span>req<span class="token punctuation">)</span>
	<span class="token keyword">if</span> err <span class="token operator">!=</span> <span class="token boolean">nil</span> <span class="token punctuation">{</span>
		fmt<span class="token punctuation">.</span><span class="token function">Printf</span><span class="token punctuation">(</span><span class="token string">"The HTTP request failed with error %s\n"</span><span class="token punctuation">,</span> err<span class="token punctuation">)</span>
	<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
		data<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> ioutil<span class="token punctuation">.</span><span class="token function">ReadAll</span><span class="token punctuation">(</span>resp<span class="token punctuation">.</span>Body<span class="token punctuation">)</span>
		fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token function">string</span><span class="token punctuation">(</span>data<span class="token punctuation">)</span><span class="token punctuation">)</span>
	<span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Shell">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">API_KEY</span><span class="token operator">=</span><span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
<span class="token assign-left variable">URL</span><span class="token operator">=</span><span class="token string">"https://{domain}/api/v1/frontend/order/query"</span>
<span class="token assign-left variable">params</span><span class="token operator">=</span><span class="token string">"serial=58b451473d290f92443eabf0322b9907"</span>

<span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token parameter variable">-H</span> <span class="token string">"API-KEY:<span class="token variable">$API_KEY</span>"</span> <span class="token string">"<span class="token variable">$URL</span>?<span class="token variable">$params</span>"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup></div></template>


