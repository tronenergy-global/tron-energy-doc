<template><div><h1 id="сводка-по-использованию-api" tabindex="-1"><a class="header-anchor" href="#сводка-по-использованию-api" aria-hidden="true">#</a> Сводка по использованию API</h1>
<h2 id="адрес-api" tabindex="-1"><a class="header-anchor" href="#адрес-api" aria-hidden="true">#</a> Адрес API</h2>
<div class="language-text line-numbers-mode" data-ext="text"><pre v-pre class="language-text"><code>GET /api/v1/frontend/userapi/summary
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h2 id="параметры-ответа" tabindex="-1"><a class="header-anchor" href="#параметры-ответа" aria-hidden="true">#</a> Параметры ответа</h2>
<ul>
<li>Пример нормального ответа</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"name"</span><span class="token operator">:</span> <span class="token string">"MY API"</span><span class="token punctuation">,</span>
    <span class="token property">"create_time"</span><span class="token operator">:</span> <span class="token string">"2023-04-28 12:31:04"</span><span class="token punctuation">,</span>
    <span class="token property">"total_count"</span><span class="token operator">:</span> <span class="token number">46</span><span class="token punctuation">,</span>  
    <span class="token property">"total_sum_energy"</span><span class="token operator">:</span> <span class="token number">3696000</span><span class="token punctuation">,</span>
    <span class="token property">"total_sum_trx"</span><span class="token operator">:</span> <span class="token number">598165000</span><span class="token punctuation">,</span> 
    <span class="token property">"today_count"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"today_sum_energy"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"today_sum_trx"</span><span class="token operator">:</span> <span class="token number">0</span><span class="token punctuation">,</span>
    <span class="token property">"yesterday_count"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"yesterday_sum_energy"</span><span class="token operator">:</span> <span class="token number">1300000</span><span class="token punctuation">,</span>
    <span class="token property">"yesterday_sum_trx"</span><span class="token operator">:</span> <span class="token number">197600000</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>
<p>При неверном APIKEY возвращает 403</p>
</li>
<li>
<p>Пояснение полей</p>
</li>
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
<td>name</td>
<td>string</td>
<td>Название API</td>
<td></td>
</tr>
<tr>
<td>create_time</td>
<td>string</td>
<td>Время создания</td>
<td></td>
</tr>
<tr>
<td>total_count</td>
<td>int</td>
<td>Общее количество заказов</td>
<td></td>
</tr>
<tr>
<td>total_sum_energy</td>
<td>int</td>
<td>Общее количество заказанной энергии</td>
<td></td>
</tr>
<tr>
<td>total_sum_trx</td>
<td>int</td>
<td>Общее количество израсходованных TRX (в sun)</td>
<td></td>
</tr>
<tr>
<td>today_count</td>
<td>int</td>
<td>Количество заказов сегодня</td>
<td></td>
</tr>
<tr>
<td>today_sum_energy</td>
<td>int</td>
<td>Количество энергии, заказанной сегодня</td>
<td></td>
</tr>
<tr>
<td>today_sum_trx</td>
<td>int</td>
<td>Количество израсходованных TRX сегодня (в sun)</td>
<td></td>
</tr>
<tr>
<td>yesterday_count</td>
<td>int</td>
<td>Количество заказов вчера</td>
<td></td>
</tr>
<tr>
<td>yesterday_sum_energy</td>
<td>int</td>
<td>Количество энергии, заказанной вчера</td>
<td></td>
</tr>
<tr>
<td>yesterday_sum_trx</td>
<td>int</td>
<td>Количество израсходованных TRX вчера (в sun)</td>
<td></td>
</tr>
</tbody>
</table>
<h2 id="пример-кода" tabindex="-1"><a class="header-anchor" href="#пример-кода" aria-hidden="true">#</a> Пример кода</h2>
<CodeGroup>
  <CodeGroupItem title="Python" active>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> requests

API_KEY <span class="token operator">=</span> <span class="token string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span>
URL <span class="token operator">=</span> <span class="token string">"https://{domain}/api/v1/frontend/userapi/summary"</span>
headers <span class="token operator">=</span> <span class="token punctuation">{</span>
    <span class="token string">"API-KEY"</span><span class="token punctuation">:</span> API_KEY
<span class="token punctuation">}</span>
response <span class="token operator">=</span> requests<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>URL<span class="token punctuation">}</span></span><span class="token string">"</span></span><span class="token punctuation">,</span> headers<span class="token operator">=</span>headers<span class="token punctuation">)</span>
<span class="token keyword">print</span><span class="token punctuation">(</span>response<span class="token punctuation">.</span>json<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Php">
<div class="language-php line-numbers-mode" data-ext="php"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$API_KEY</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"B433BFF1CDE7450AA38A56BEAC690DD4"</span><span class="token punctuation">;</span>
<span class="token variable">$URL</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"https://{domain}/api/v1/frontend/userapi/summary"</span><span class="token punctuation">;</span>
<span class="token variable">$headers</span> <span class="token operator">=</span> <span class="token keyword">array</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'API-KEY'</span> <span class="token operator">=></span> <span class="token variable">$API_KEY</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$context</span> <span class="token operator">=</span> <span class="token function">stream_context_create</span><span class="token punctuation">(</span><span class="token keyword">array</span><span class="token punctuation">(</span>
    <span class="token string single-quoted-string">'http'</span> <span class="token operator">=></span> <span class="token keyword">array</span><span class="token punctuation">(</span>
        <span class="token string single-quoted-string">'method'</span> <span class="token operator">=></span> <span class="token string single-quoted-string">'GET'</span><span class="token punctuation">,</span>
        <span class="token string single-quoted-string">'header'</span> <span class="token operator">=></span> <span class="token string double-quoted-string">"API-KEY: "</span> <span class="token operator">.</span> <span class="token variable">$API_KEY</span><span class="token punctuation">,</span>
    <span class="token punctuation">)</span>
<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$response</span> <span class="token operator">=</span> <span class="token function">file_get_contents</span><span class="token punctuation">(</span><span class="token variable">$URL</span><span class="token punctuation">,</span> <span class="token constant boolean">false</span><span class="token punctuation">,</span> <span class="token variable">$context</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token function">var_dump</span><span class="token punctuation">(</span><span class="token function">json_decode</span><span class="token punctuation">(</span><span class="token variable">$response</span><span class="token punctuation">,</span> <span class="token constant boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token delimiter important">?></span></span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Java">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">okhttp3<span class="token punctuation">.</span></span><span class="token class-name">OkHttpClient</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">okhttp3<span class="token punctuation">.</span></span><span class="token class-name">Request</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">okhttp3<span class="token punctuation">.</span></span><span class="token class-name">Response</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">OkHttpClient</span> client <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">OkHttpClient</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> url <span class="token operator">=</span> <span class="token string">"https://{domain}/api/v1/frontend/userapi/summary"</span><span class="token punctuation">;</span>
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
	URL <span class="token operator">:=</span> <span class="token string">"https://{domain}/api/v1/frontend/userapi/summary"</span>

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
<span class="token assign-left variable">URL</span><span class="token operator">=</span><span class="token string">"https://{domain}/api/v1/frontend/userapi/summary"</span>

<span class="token function">curl</span> <span class="token parameter variable">-X</span> GET <span class="token parameter variable">-H</span> <span class="token string">"API-KEY:<span class="token variable">$API_KEY</span>"</span> <span class="token string">"<span class="token variable">$URL</span>"</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup></div></template>


