<template>
    <div class="img-container">
        <div class="image-viewer" :style="'background-image: url(' + V_MEDIA_SERVER + '/' + 'storage/' + params.data.picture + ')'">
        </div>
    </div>
</template>

<style scoped>
    .img-container {
        height: inherit;
        padding: 15px;
    }
    .image-viewer {
        height: inherit;
        width: 100%;
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
        position: relative;
        padding: 0;
    }
</style>
