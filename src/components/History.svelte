<script lang="ts">
  import { history } from "../stores/history";
  import { theme } from "../stores/theme";
  import Ps1 from "./Ps1.svelte";
  import { config } from "../../config";
  import TypeWriter from "svelte-typewriter";

  let typedOutputs = new Set();
  let isInitialTypingDone = false;
  let isCommandTypingDone = false;

  function createLinks(output: string) {
    let result = output;
    config.socials.forEach((social) => {
      const pattern = new RegExp(`${social.type}:.*?(?=\\n|$)`, "g");
      const capitalizedType =
        social.type.charAt(0).toUpperCase() + social.type.slice(1);
      result = result.replace(pattern, capitalizedType);
    });
    return result;
  }

  function addHyperlinks(output: string) {
    let result = output;
    config.socials.forEach((social) => {
      const capitalizedType =
        social.type.charAt(0).toUpperCase() + social.type.slice(1);
      result = result.replace(
        capitalizedType,
        `<a href="${social.url}" target="_blank" class="text-blue-400 hover:underline">${capitalizedType}</a>`
      );
    });
    return result;
  }
</script>

{#each $history as { command, outputs }, historyIndex}
  {#if command == "banner"}
    <div style={`color: ${$theme.foreground}`}>
      <div class="flex flex-col md:flex-row">
        <Ps1 />

        <div class="flex">
          <p class="visible md:hidden">❯</p>

          <p class="px-2">{command}</p>
        </div>
      </div>
      {#each outputs as output}
        {#if historyIndex === 0}
          <!-- Initial banner - with animation -->
          {#if !isInitialTypingDone}
            <TypeWriter
              mode="cascade"
              interval={1}
              on:done={() => (isInitialTypingDone = true)}
            >
              <div class="whitespace-pre text-wrap">
                {createLinks(output)}
              </div>
            </TypeWriter>
          {:else}
            <div class="whitespace-pre text-wrap">
              {@html addHyperlinks(createLinks(output))}
            </div>
          {/if}
        {:else if historyIndex === $history.length - 1 && command === "banner"}
          <!-- Command banner - with animation -->
          {#if !isCommandTypingDone}
            <TypeWriter
              mode="cascade"
              interval={1}
              on:done={() => (isCommandTypingDone = true)}
            >
              <div class="whitespace-pre text-wrap">
                {createLinks(output)}
              </div>
            </TypeWriter>
          {:else}
            <div class="whitespace-pre text-wrap">
              {@html addHyperlinks(createLinks(output))}
            </div>
          {/if}
        {:else}
          <div class="whitespace-pre text-wrap">
            {@html addHyperlinks(createLinks(output))}
          </div>
        {/if}
      {/each}
    </div>
  {:else}
    <div style={`color: ${$theme.foreground}`}>
      <div class="flex flex-col md:flex-row">
        <Ps1 />

        <div class="flex">
          <p class="visible md:hidden">❯</p>

          <p class="px-2">{command}</p>
        </div>
      </div>
      {#each outputs as output}
        <div class="whitespace-pre text-wrap">
          {@html addHyperlinks(createLinks(output))}
        </div>
      {/each}
    </div>
  {/if}
{/each}
