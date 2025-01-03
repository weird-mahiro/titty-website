<script lang="ts">
  import { history } from "../stores/history";
  import { theme } from "../stores/theme";
  import Ps1 from "./Ps1.svelte";
  import { config } from "../../config";
  const banner = `
████████╗██╗████████╗████████╗██╗   ██╗
╚══██╔══╝██║╚══██╔══╝╚══██╔══╝╚██╗ ██╔╝
   ██║   ██║   ██║      ██║    ╚████╔╝ 
   ██║   ██║   ██║      ██║     ╚██╔╝  
   ██║   ██║   ██║      ██║      ██║   
   ╚═╝   ╚═╝   ╚═╝      ╚═╝      ╚═╝   

ca: ${config.ca}
Type 'help' to see list of available commands.
${config.bannerRoadmap}`;
</script>

{#each $history as { command, outputs }}
  <div style={`color: ${$theme.foreground}`}>
    <div class="flex flex-col md:flex-row">
      <Ps1 />

      <div class="flex">
        <p class="visible md:hidden">❯</p>

        <p class="px-2">{command}</p>
      </div>
    </div>

    {#each outputs as output}
      <p class="whitespace-pre text-wrap">
        {output}
      </p>
    {/each}
  </div>
{/each}
