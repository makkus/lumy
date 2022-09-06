<script lang="ts">

    export let rendered_value = null;
    export let no_value_text = "-- no value --"


</script>

<div class="rendered-value">
  {#if (rendered_value != null)}
    <div class="rendered">
      {@html rendered_value}
    </div>
  {:else }
    <div class="not-rendered">
      {no_value_text}
    </div>
  {/if}
</div>
<style>

    /*section {*/
    /*    position: relative;*/
    /*    height: calc(100% - 35px);*/
    /*    width: calc(100% - 35px);*/
    /*}*/

    .rendered-value {
        overflow: auto;
        height: 100%;
    }

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


