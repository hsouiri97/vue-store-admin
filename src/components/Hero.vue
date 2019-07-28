<template>
  <div class="ct">
    <img src="/img/test5.png" class="img-fluid" />
    <a href="#" class="bt">Get Yours Now</a>
  </div>
</template>

<script>
export default {
  name: "Hero"
};
</script>
<style>
    .ct{
        position: relative;
    }
    .bt{
        position: absolute;
        top: 80%;
        left: 15%;
        width: auto;
        font-size: 40px;
        font-family: 'sans-serif';
        text-decoration: none !important;
        color: #f9f9f9;
        background-color: #232b2b;
        padding: 5px 10px;
        border-radius: 5px;
        /*text-transform: uppercase;*/
    }
    .bt:hover{
        color: white;
        background-color: black;
    }
</style>
