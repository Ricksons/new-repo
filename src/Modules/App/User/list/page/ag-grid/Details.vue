<template>
    <div class="mt-5">
        <label-value
            label-class="text-secondary font-weight-bold"
            style="font-size: 16px"
            label="title"
            separator=""
            :value="params.data.title"></label-value>

        <label-value
            label-class="text-secondary font-weight-bold"
            style="font-size: 16px"
            label="location"
            separator=""
            :value="params.data.location"></label-value>

        <label-value
            label-class="text-secondary font-weight-bold"
            style="font-size: 16px"
            label="date"
            separator=""
            :value="params.data.date"></label-value>

        <label-value
            label-class="text-secondary font-weight-bold"
            style="font-size: 16px"
            label="type"
            separator=""
            :value="$ml.get(params.data.type)"></label-value>

        <label-value
            label-class="text-secondary font-weight-bold"
            style="font-size: 16px"
            label="description"
            separator=""
            :value="params.data.description"></label-value>

    </div>
</template>
