<script lang="ts">

    export let rendered_value = null;
    export let no_value_text = "-- no value --"


</script>

<section>
  {#if (rendered_value != null)}
    <div class="rendered">
      {@html rendered_value}
    </div>
  {:else }
    <div class="not-rendered">
      {no_value_text}
    </div>
  {/if}
</section>
<style>

    /*section {*/
    /*    position: relative;*/
    /*    height: calc(100% - 35px);*/
    /*    width: calc(100% - 35px);*/
    /*}*/

    /*.rendered {*/
    /*    overflow-y: auto;*/
    /*    overflow-x: auto;*/
    /*    font-size: small;*/
    /*    position: absolute;*/
    /*    top: 0;*/
    /*    left: 0;*/
    /*    height: 100%;*/
    /*    width: 100%;*/
    /*    background-color: white;*/
    /*}*/

    /*.not-rendered {*/
    /*    position: absolute;*/
    /*    top: 0;*/
    /*    left: 0;*/
    /*    height: 100%;*/
    /*    width: 100%;*/
    /*    display: grid;*/
    /*    place-items: center;*/
    /*    background-color: white;*/
    /*}*/

</style>


