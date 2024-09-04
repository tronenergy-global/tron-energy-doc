<template><div><h1 id="api-возвращаемые-значения" tabindex="-1"><a class="header-anchor" href="#api-возвращаемые-значения" aria-hidden="true">#</a> API возвращаемые значения</h1>
<p>Текущие коды состояния, возвращаемые API (http_status_code), могут быть <code v-pre>200</code> и <code v-pre>400</code>.</p>
<h2 id="возврат-400" tabindex="-1"><a class="header-anchor" href="#возврат-400" aria-hidden="true">#</a> Возврат 400</h2>
<p>Если API возвращает 400, это означает, что параметры запроса не прошли проверку. В этом случае есть два формата возврата.</p>
<ol>
<li>Конкретные ошибки параметров, в основном ошибки проверки параметров.</li>
</ol>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"energy_amount"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"Пожалуйста, убедитесь, что значение больше или равно 10000."</span><span class="token punctuation">]</span><span class="token punctuation">,</span> 
    <span class="token property">"period"</span><span class="token operator">:</span> <span class="token punctuation">[</span><span class="token string">"'1X' не является допустимым значением."</span><span class="token punctuation">]</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li>Будет перечислена причина ошибки для каждого поля. Список причин является массивом, так что возможно наличие нескольких причин!</li>
</ul>
</div>
<ol start="2">
<li>Нет конкретных ошибок параметров, в основном проверка параметров прошла успешно, но возникли другие ошибки.</li>
</ol>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span><span class="token property">"detail"</span><span class="token operator">:</span> <span class="token string">"API not found"</span><span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><div class="custom-container tip"><p class="custom-container-title">TIP</p>
<ul>
<li>Ключ фиксирован как detail, и результат возврата является строкой. Если при разработке необходимо отобразить конкретную ошибку, сначала нужно определить, является ли это ошибкой типа detail, затем определить, есть ли ошибка параметра.</li>
</ul>
</div>
<h2 id="возврат-200" tabindex="-1"><a class="header-anchor" href="#возврат-200" aria-hidden="true">#</a> Возврат 200</h2>
<p>Когда API возвращает 200, формат возврата фиксирован:</p>
<div class="language-json line-numbers-mode" data-ext="json"><pre v-pre class="language-json"><code><span class="token punctuation">{</span>
    <span class="token property">"errno"</span><span class="token operator">:</span> <span class="token number">1</span><span class="token punctuation">,</span>
    <span class="token property">"message"</span><span class="token operator">:</span> <span class="token string">"XXXX"</span><span class="token punctuation">,</span>
    <span class="token property">"param1"</span><span class="token operator">:</span> <span class="token string">"value1"</span><span class="token punctuation">,</span>
    ...
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ul>
<li>errno может быть 1 или 0. Когда <code v-pre>errno=0</code>, это означает, что запрос выполнен успешно. Когда <code v-pre>errno=1</code>, это означает, что в запросе возникла проблема, и в этом случае параметр <code v-pre>message</code> укажет причину.</li>
<li>В некоторых запросах могут быть другие возвращаемые параметры, подробности см. в описании соответствующего API.</li>
</ul>
</div></template>


