<template><div><h1 id="обратныи-вызов" tabindex="-1"><a class="header-anchor" href="#обратныи-вызов" aria-hidden="true">#</a> Обратный вызов</h1>
<p>После завершения текущей делегированной энергии будет предпринята попытка отправить уведомление инициатору. В настоящее время есть два места, где можно настроить URL обратного вызова</p>
<ul>
<li>
<ol>
<li>В настройках <a href="https://%7Bdomain%7D/buyer/me" target="_blank" rel="noopener noreferrer">Мой профиль<ExternalLinkIcon/></a>, чтобы установить URL обратного вызова по умолчанию</li>
</ol>
</li>
<li>
<ol start="2">
<li>Указав параметр callback_url при создании заказа, чтобы переопределить URL обратного вызова по умолчанию</li>
</ol>
</li>
</ul>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code>data = <span class="token punctuation">{</span>
   'energy_amount'<span class="token operator">:</span> '<span class="token number">32000</span>'<span class="token punctuation">,</span>
   'period'<span class="token operator">:</span> '1H'<span class="token punctuation">,</span>
   'receive_address'<span class="token operator">:</span> 'TExWKszFWYTKZH8LYiovAPKzS3L9MLZ4kw'<span class="token punctuation">,</span>
   'callback_url'<span class="token operator">:</span> 'http<span class="token operator">:</span><span class="token comment">//{mydomain}/callback',</span>
   'out_trade_no'<span class="token operator">:</span> '<span class="token number">123456</span>'<span class="token punctuation">,</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="ответ-и-повторные-попытки" tabindex="-1"><a class="header-anchor" href="#ответ-и-повторные-попытки" aria-hidden="true">#</a> Ответ и повторные попытки</h2>
<p>Ответное тело выглядит следующим образом</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    'active_hash'<span class="token operator">:</span> ''<span class="token punctuation">,</span>  <span class="token comment">// Если есть активация, txid активации</span>
    'bandwidth_hash'<span class="token operator">:</span> '5e342a821de72542d7b341039c34af631d0551cfcd4b67c272'<span class="token punctuation">,</span> <span class="token comment">// Если есть полоса пропускания, txid полосы пропускания</span>
    'energy_amount'<span class="token operator">:</span> <span class="token number">32000</span><span class="token punctuation">,</span> <span class="token comment">// Заказанная энергия</span>
    'out_trade_no'<span class="token operator">:</span> '<span class="token number">123456</span>'<span class="token punctuation">,</span>  <span class="token comment">// Внешний номер заказа</span>
    'pay_amount'<span class="token operator">:</span> <span class="token number">32170.005048646104</span><span class="token punctuation">,</span>  <span class="token comment">// Фактически делегированная энергия</span>
    'serial'<span class="token operator">:</span> '886294f5204ac2fc1430f5a7d9215a80'<span class="token punctuation">,</span> <span class="token comment">// Внутренний номер заказа</span>
    'txid'<span class="token operator">:</span> '2610c200efc8a90601758715405fa6be4597469e854591975d113b720a762ec2'<span class="token punctuation">,</span> <span class="token comment">// Txid энергии</span>
    'status'<span class="token operator">:</span> <span class="token number">40</span><span class="token punctuation">,</span>  <span class="token comment">// Статус: 40 - успех, 41 - неудача</span>
    'type'<span class="token operator">:</span> 'energy'<span class="token punctuation">,</span> <span class="token comment">// Тип</span>
    'receive_address'<span class="token operator">:</span> 'Txxxxxx'<span class="token punctuation">,</span> <span class="token comment">// Адрес</span>
    'source'<span class="token operator">:</span> 'manual/api/auto_delegate/count_delegate'<span class="token punctuation">,</span> <span class="token comment">// Ручной заказ/API заказ/умная делегация/подсчет делегаций</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>Если вы получили сообщение обратного вызова, просто верните <code v-pre>HTTP 200</code>, что означает, что сообщение обработано, и этот обратный вызов не будет отправлен снова. В противном случае будут предприняты попытки повторной отправки до получения ожидаемого ответа.
Текущая частота повторных попыток: <code v-pre>15с, 15с, 30с, 180с, 600с, 1200с, 1800с</code>. Если ответа не будет, повторные отправки прекратятся.</p>
<h2 id="проверка" tabindex="-1"><a class="header-anchor" href="#проверка" aria-hidden="true">#</a> Проверка</h2>
<p>Сервер будет использовать API для подписи обратного вызова при отправке сообщения. Получатель должен проверить подпись перед обработкой логики, иначе могут возникнуть ненужные потери, серверный процесс подписи аналогичен процессу подписи при создании заказа <RouterLink to="/ru/general/sign.html">подпись</RouterLink>. Получатель должен использовать timestamp из запроса обратного вызова для шифрования и проверки一致ия <code v-pre>SIGNATURE</code> в обратном вызове</p>
<h2 id="пример-кода" tabindex="-1"><a class="header-anchor" href="#пример-кода" aria-hidden="true">#</a> Пример кода</h2>
<CodeGroup>
  <CodeGroupItem title="Python" active>
<div class="language-python line-numbers-mode" data-ext="py"><pre v-pre class="language-python"><code><span class="token keyword">import</span> hmac
<span class="token keyword">import</span> hashlib
<span class="token keyword">import</span> time
<span class="token keyword">import</span> json

<span class="token keyword">def</span> <span class="token function">callback</span><span class="token punctuation">(</span>self<span class="token punctuation">,</span> request<span class="token punctuation">)</span><span class="token punctuation">:</span>
   <span class="token keyword">def</span> <span class="token function">_verify_signature</span><span class="token punctuation">(</span>signature<span class="token punctuation">,</span> timestamp<span class="token punctuation">)</span><span class="token punctuation">:</span>
       api_secret <span class="token operator">=</span> <span class="token string">'0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8'</span>
       json_data <span class="token operator">=</span> json<span class="token punctuation">.</span>dumps<span class="token punctuation">(</span>request<span class="token punctuation">.</span>data<span class="token punctuation">,</span> sort_keys<span class="token operator">=</span><span class="token boolean">True</span><span class="token punctuation">)</span>


       message <span class="token operator">=</span> <span class="token string-interpolation"><span class="token string">f"</span><span class="token interpolation"><span class="token punctuation">{</span>timestamp<span class="token punctuation">}</span></span><span class="token string">&amp;</span><span class="token interpolation"><span class="token punctuation">{</span>json_data<span class="token punctuation">}</span></span><span class="token string">"</span></span>
       expected_signature <span class="token operator">=</span> hmac<span class="token punctuation">.</span>new<span class="token punctuation">(</span>api_secret<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> message<span class="token punctuation">.</span>encode<span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> hashlib<span class="token punctuation">.</span>sha256<span class="token punctuation">)</span><span class="token punctuation">.</span>hexdigest<span class="token punctuation">(</span><span class="token punctuation">)</span>


       <span class="token keyword">return</span> hmac<span class="token punctuation">.</span>compare_digest<span class="token punctuation">(</span>signature<span class="token punctuation">,</span> expected_signature<span class="token punctuation">)</span>


   signature <span class="token operator">=</span> request<span class="token punctuation">.</span>META<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">'HTTP_SIGNATURE'</span><span class="token punctuation">)</span>
   timestamp <span class="token operator">=</span> request<span class="token punctuation">.</span>META<span class="token punctuation">.</span>get<span class="token punctuation">(</span><span class="token string">'HTTP_TIMESTAMP'</span><span class="token punctuation">)</span>


   <span class="token keyword">if</span> <span class="token keyword">not</span> <span class="token builtin">all</span><span class="token punctuation">(</span><span class="token punctuation">[</span>signature<span class="token punctuation">,</span> timestamp<span class="token punctuation">]</span><span class="token punctuation">)</span><span class="token punctuation">:</span>
       <span class="token keyword">return</span> <span class="token boolean">None</span>


   <span class="token keyword">if</span> time<span class="token punctuation">.</span>time<span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token operator">-</span> <span class="token builtin">float</span><span class="token punctuation">(</span>timestamp<span class="token punctuation">)</span> <span class="token operator">></span> <span class="token number">100</span><span class="token punctuation">:</span>
       <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'timestamp expired'</span><span class="token punctuation">)</span>


   <span class="token keyword">if</span> _verify_signature<span class="token punctuation">(</span>signature<span class="token punctuation">,</span> timestamp<span class="token punctuation">)</span><span class="token punctuation">:</span>
       <span class="token keyword">print</span><span class="token punctuation">(</span>request<span class="token punctuation">.</span>data<span class="token punctuation">)</span>
   <span class="token keyword">else</span><span class="token punctuation">:</span>
       <span class="token keyword">print</span><span class="token punctuation">(</span><span class="token string">'verify signature failed'</span><span class="token punctuation">)</span>


   <span class="token keyword">return</span> Response<span class="token punctuation">(</span><span class="token punctuation">{</span><span class="token punctuation">}</span><span class="token punctuation">)</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Php">
<div class="language-php line-numbers-mode" data-ext="php"><pre v-pre class="language-php"><code><span class="token php language-php"><span class="token delimiter important">&lt;?php</span>
<span class="token variable">$api_secret</span> <span class="token operator">=</span> <span class="token string double-quoted-string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span><span class="token punctuation">;</span>
<span class="token variable">$headers</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// your headers here</span>
<span class="token variable">$body</span> <span class="token operator">=</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token comment">// your body data here</span>

<span class="token variable">$timestamp</span> <span class="token operator">=</span> <span class="token variable">$headers</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'TIMESTAMP'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>
<span class="token variable">$signature</span> <span class="token operator">=</span> <span class="token variable">$headers</span><span class="token punctuation">[</span><span class="token string single-quoted-string">'SIGNATURE'</span><span class="token punctuation">]</span><span class="token punctuation">;</span>

<span class="token function">ksort</span><span class="token punctuation">(</span><span class="token variable">$body</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token variable">$json_data</span> <span class="token operator">=</span> <span class="token function">json_encode</span><span class="token punctuation">(</span><span class="token variable">$body</span><span class="token punctuation">,</span> <span class="token constant">JSON_UNESCAPED_SLASHES</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token variable">$message</span> <span class="token operator">=</span> <span class="token variable">$timestamp</span> <span class="token operator">.</span> <span class="token string single-quoted-string">'&amp;'</span> <span class="token operator">.</span> <span class="token variable">$json_data</span><span class="token punctuation">;</span>
<span class="token variable">$expected_signature</span> <span class="token operator">=</span> <span class="token function">hash_hmac</span><span class="token punctuation">(</span><span class="token string single-quoted-string">'sha256'</span><span class="token punctuation">,</span> <span class="token variable">$message</span><span class="token punctuation">,</span> <span class="token variable">$api_secret</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">hash_equals</span><span class="token punctuation">(</span><span class="token variable">$signature</span><span class="token punctuation">,</span> <span class="token variable">$expected_signature</span><span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Signature is valid.\n"</span><span class="token punctuation">;</span>
    <span class="token function">print_r</span><span class="token punctuation">(</span><span class="token variable">$body</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">echo</span> <span class="token string double-quoted-string">"Signature is invalid.\n"</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</span></code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Java">
<div class="language-java line-numbers-mode" data-ext="java"><pre v-pre class="language-java"><code><span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>codec<span class="token punctuation">.</span>digest<span class="token punctuation">.</span></span><span class="token class-name">HmacAlgorithms</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>codec<span class="token punctuation">.</span>digest<span class="token punctuation">.</span></span><span class="token class-name">HmacUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">org<span class="token punctuation">.</span>apache<span class="token punctuation">.</span>commons<span class="token punctuation">.</span>lang3<span class="token punctuation">.</span></span><span class="token class-name">StringUtils</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>gson<span class="token punctuation">.</span></span><span class="token class-name">Gson</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">com<span class="token punctuation">.</span>google<span class="token punctuation">.</span>gson<span class="token punctuation">.</span></span><span class="token class-name">GsonBuilder</span></span><span class="token punctuation">;</span>
<span class="token keyword">import</span> <span class="token import"><span class="token namespace">java<span class="token punctuation">.</span>util<span class="token punctuation">.</span></span><span class="token operator">*</span></span><span class="token punctuation">;</span>

<span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">Main</span> <span class="token punctuation">{</span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token keyword">void</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token class-name">String</span><span class="token punctuation">[</span><span class="token punctuation">]</span> args<span class="token punctuation">)</span> <span class="token punctuation">{</span>
        <span class="token class-name">String</span> apiSecret <span class="token operator">=</span> <span class="token string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span><span class="token punctuation">;</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">String</span><span class="token punctuation">></span></span> headers <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// your headers here</span>
        <span class="token class-name">Map</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> body <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HashMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// your body data here</span>

        <span class="token class-name">String</span> timestamp <span class="token operator">=</span> headers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"TIMESTAMP"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> signature <span class="token operator">=</span> headers<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">"SIGNATURE"</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">Gson</span> gson <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">GsonBuilder</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">disableHtmlEscaping</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">create</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token class-name">String</span><span class="token punctuation">,</span> <span class="token class-name">Object</span><span class="token punctuation">></span></span> sortedBody <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">TreeMap</span><span class="token generics"><span class="token punctuation">&lt;</span><span class="token punctuation">></span></span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token class-name">String</span> jsonData <span class="token operator">=</span> gson<span class="token punctuation">.</span><span class="token function">toJson</span><span class="token punctuation">(</span>sortedBody<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token class-name">String</span> message <span class="token operator">=</span> timestamp <span class="token operator">+</span> <span class="token string">"&amp;"</span> <span class="token operator">+</span> jsonData<span class="token punctuation">;</span>
        <span class="token class-name">String</span> expectedSignature <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">HmacUtils</span><span class="token punctuation">(</span><span class="token class-name">HmacAlgorithms</span><span class="token punctuation">.</span><span class="token constant">HMAC_SHA_256</span><span class="token punctuation">,</span> apiSecret<span class="token punctuation">)</span><span class="token punctuation">.</span><span class="token function">hmacHex</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token class-name">StringUtils</span><span class="token punctuation">.</span><span class="token function">equals</span><span class="token punctuation">(</span>signature<span class="token punctuation">,</span> expectedSignature<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Signature is valid."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
            <span class="token class-name">System</span><span class="token punctuation">.</span>out<span class="token punctuation">.</span><span class="token function">println</span><span class="token punctuation">(</span><span class="token string">"Signature is invalid."</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Go">
<div class="language-go line-numbers-mode" data-ext="go"><pre v-pre class="language-go"><code><span class="token keyword">package</span> main

<span class="token keyword">import</span> <span class="token punctuation">(</span>
    <span class="token string">"crypto/hmac"</span>
    <span class="token string">"crypto/sha256"</span>
    <span class="token string">"encoding/hex"</span>
    <span class="token string">"encoding/json"</span>
    <span class="token string">"fmt"</span>
    <span class="token string">"sort"</span>
<span class="token punctuation">)</span>

<span class="token keyword">type</span> Body <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token keyword">interface</span><span class="token punctuation">{</span><span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token punctuation">(</span>b Body<span class="token punctuation">)</span> <span class="token function">MarshalJSON</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">byte</span><span class="token punctuation">,</span> <span class="token builtin">error</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    keys <span class="token operator">:=</span> <span class="token function">make</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">,</span> <span class="token function">len</span><span class="token punctuation">(</span>b<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token keyword">for</span> k <span class="token operator">:=</span> <span class="token keyword">range</span> b <span class="token punctuation">{</span>
        keys <span class="token operator">=</span> <span class="token function">append</span><span class="token punctuation">(</span>keys<span class="token punctuation">,</span> k<span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    sort<span class="token punctuation">.</span><span class="token function">Strings</span><span class="token punctuation">(</span>keys<span class="token punctuation">)</span>

    result <span class="token operator">:=</span> <span class="token string">"{"</span>
    <span class="token keyword">for</span> <span class="token boolean">_</span><span class="token punctuation">,</span> k <span class="token operator">:=</span> <span class="token keyword">range</span> keys <span class="token punctuation">{</span>
        value<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>b<span class="token punctuation">[</span>k<span class="token punctuation">]</span><span class="token punctuation">)</span>
        result <span class="token operator">+=</span> fmt<span class="token punctuation">.</span><span class="token function">Sprintf</span><span class="token punctuation">(</span>`<span class="token string">"%s"</span><span class="token punctuation">:</span><span class="token operator">%</span>s<span class="token punctuation">,</span>`<span class="token punctuation">,</span> k<span class="token punctuation">,</span> <span class="token function">string</span><span class="token punctuation">(</span>value<span class="token punctuation">)</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
    result <span class="token operator">=</span> result<span class="token punctuation">[</span><span class="token punctuation">:</span><span class="token function">len</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token operator">-</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token string">"}"</span>
    <span class="token keyword">return</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>result<span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token boolean">nil</span>
<span class="token punctuation">}</span>

<span class="token keyword">func</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    apiSecret <span class="token operator">:=</span> <span class="token string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span>
    headers <span class="token operator">:=</span> <span class="token keyword">map</span><span class="token punctuation">[</span><span class="token builtin">string</span><span class="token punctuation">]</span><span class="token builtin">string</span><span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// your headers here</span>
    body <span class="token operator">:=</span> Body<span class="token punctuation">{</span><span class="token punctuation">}</span> <span class="token comment">// your body data here</span>

    timestamp <span class="token operator">:=</span> headers<span class="token punctuation">[</span><span class="token string">"TIMESTAMP"</span><span class="token punctuation">]</span>
    signature <span class="token operator">:=</span> headers<span class="token punctuation">[</span><span class="token string">"SIGNATURE"</span><span class="token punctuation">]</span>

    jsonData<span class="token punctuation">,</span> <span class="token boolean">_</span> <span class="token operator">:=</span> json<span class="token punctuation">.</span><span class="token function">Marshal</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span>
    message <span class="token operator">:=</span> timestamp <span class="token operator">+</span> <span class="token string">"&amp;"</span> <span class="token operator">+</span> <span class="token function">string</span><span class="token punctuation">(</span>jsonData<span class="token punctuation">)</span>

    mac <span class="token operator">:=</span> hmac<span class="token punctuation">.</span><span class="token function">New</span><span class="token punctuation">(</span>sha256<span class="token punctuation">.</span>New<span class="token punctuation">,</span> <span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>apiSecret<span class="token punctuation">)</span><span class="token punctuation">)</span>
    mac<span class="token punctuation">.</span><span class="token function">Write</span><span class="token punctuation">(</span><span class="token punctuation">[</span><span class="token punctuation">]</span><span class="token function">byte</span><span class="token punctuation">(</span>message<span class="token punctuation">)</span><span class="token punctuation">)</span>
    expectedSignature <span class="token operator">:=</span> hex<span class="token punctuation">.</span><span class="token function">EncodeToString</span><span class="token punctuation">(</span>mac<span class="token punctuation">.</span><span class="token function">Sum</span><span class="token punctuation">(</span><span class="token boolean">nil</span><span class="token punctuation">)</span><span class="token punctuation">)</span>

    <span class="token keyword">if</span> signature <span class="token operator">==</span> expectedSignature <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Signature is valid."</span><span class="token punctuation">)</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span>body<span class="token punctuation">)</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
        fmt<span class="token punctuation">.</span><span class="token function">Println</span><span class="token punctuation">(</span><span class="token string">"Signature is invalid."</span><span class="token punctuation">)</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
  <CodeGroupItem title="Shell">
<div class="language-bash line-numbers-mode" data-ext="sh"><pre v-pre class="language-bash"><code><span class="token assign-left variable">api_secret</span><span class="token operator">=</span><span class="token string">"0285A2741D0E76E2E187260EB23E51851D48403A756333E7D0CF845406ABF3E8"</span>
<span class="token assign-left variable">timestamp</span><span class="token operator">=</span><span class="token variable">$HTTP_TIMESTAMP</span>
<span class="token assign-left variable">signature</span><span class="token operator">=</span><span class="token variable">$HTTP_SIGNATURE</span>
<span class="token assign-left variable">body</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> $HTTP_BODY <span class="token operator">|</span> jq <span class="token parameter variable">-S</span> <span class="token builtin class-name">.</span><span class="token variable">)</span></span>  <span class="token comment"># Requires jq to sort keys in json.</span>

<span class="token assign-left variable">message</span><span class="token operator">=</span><span class="token string">"<span class="token variable">${timestamp}</span>&amp;<span class="token variable">${body}</span>"</span>
<span class="token assign-left variable">expected_signature</span><span class="token operator">=</span><span class="token variable"><span class="token variable">$(</span><span class="token builtin class-name">echo</span> <span class="token parameter variable">-n</span> <span class="token string">"<span class="token variable">${message}</span>"</span> <span class="token operator">|</span> openssl dgst <span class="token parameter variable">-sha256</span> <span class="token parameter variable">-hmac</span> <span class="token string">"<span class="token variable">${api_secret}</span>"</span><span class="token variable">)</span></span>

<span class="token keyword">if</span> <span class="token punctuation">[</span> <span class="token string">"<span class="token variable">${signature}</span>"</span> <span class="token operator">=</span> <span class="token string">"<span class="token variable">${expected_signature}</span>"</span> <span class="token punctuation">]</span><span class="token punctuation">;</span> <span class="token keyword">then</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"Signature is valid."</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"<span class="token variable">${body}</span>"</span>
<span class="token keyword">else</span>
    <span class="token builtin class-name">echo</span> <span class="token string">"Signature is invalid."</span>
<span class="token keyword">fi</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>  </CodeGroupItem>
</CodeGroup></div></template>


