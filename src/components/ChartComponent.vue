<template>
    <div id="canvas-container">
        <canvas ref="chartCanvas"></canvas>
    </div>
</template>
<script>
    import { ref, watch, onMounted } from 'vue';
    import Chart from 'chart.js/auto';
    export default {
        name: 'Chart',
        props: {
            chartData: {
                type: Object,
                required: true
            },
            options: {
                type: Object,
                default: () => ({})
            },
            chartTitle: {
                type: String,
                required: true
            }
        },
        setup(props) {
            const chartCanvas = ref(null);
            let chartInstance;

        onMounted(() => {
            chartInstance = new Chart(chartCanvas.value, {
                type: props.chartData.type,
                data: props.chartData.data,
                options: props.options
            });
        });

        watch(() => props.chartData, () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
            chartInstance = new Chart(chartCanvas.value, {
                type: props.chartData.type,
                data: props.chartData.data,
                options: props.options
            });
            }, { deep: true });

            return {
            chartCanvas
        };
    }
    };

</script>
<style scoped>
    canvas {
        max-width: 500px;
        max-height: 500px;
        margin: 20px auto;
    }
</style>