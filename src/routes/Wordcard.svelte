<script>
  import { onMount } from "svelte";
  import { fly } from "svelte/transition";
  import MarkdownIt from "markdown-it";

  export let query = "";

  let result = "";

  const md = new MarkdownIt({ typographer: 1 });

  onMount(() => {
    const socket = new WebSocket("ws://localhost:8686/chat/ws");

    socket.onopen = function () {
      console.log("opened");
      const data = {
        messages: [
          { role: "system", content: "用markdown格式生成回答,标题用h4和h5,不要使用h1或者h2或者h3,多用列表,多给出参考链接,可以多使用引文,可以多使用表格" },
          { role: "user", content: "以markdown格式介绍这个概念:" + query },
        ],
      };
      socket.send(JSON.stringify(data));
    };

    socket.onmessage = function (event) {
      let data = JSON.parse(event.data);
      result += data.choices[0]?.delta.content ?? "";
    };
  });
</script>

<div class="bg-white w-xl md:w-3xl lg:w-5xl max-w-60% self-center rounded-xl ring-1.5 shadow-gray-200 shadow-lg ring-gray-500/10 min-h-15 py-4 px-5 text-black/70 flex flex-row transition-all">
  <div class="opacity-50 transition-all duration-500 ease-out absolute self-center" class:translate-x--5={result} class:!opacity-0={result}>
    <div class="i-svg-spinners-bars-scale-fade text-2xl" />
  </div>
  {#if result}
    <span class="self-center prose" transition:fly={{ x: 25, duration: 500 }}> {@html md.render(result)} </span>
  {/if}
</div>
