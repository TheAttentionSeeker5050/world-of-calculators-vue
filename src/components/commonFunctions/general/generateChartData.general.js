export default function generateChartData(title, labels, chartData, chartType){
    // this.costSplitChartTitle = 'Overall Costs Breakdown';
    // console.log('generateChartData type', chartType);
    const data = {
        labels: labels,
        datasets: [{
            label: title ? title : 'Chart Title',
            data: chartData,
            // backgroundColor: [
            // 'rgb(255, 190, 11)',
            // 'rgb(251, 86, 7)',
            // 'rgb(255, 0, 110)',
            // 'rgb(131, 56, 236)',
            // 'rgb(58, 134, 255)'
            // ],
            hoverOffset: 4
        }]
    };
    chartData = {
        type: chartType ? chartType : 'doughnut',
        data: data,
    };

    console.log('generateChartData', chartData);

    return chartData;
}