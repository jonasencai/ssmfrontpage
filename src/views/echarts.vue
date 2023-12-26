<template>
    <div>
        <div id="main" style="width: 500px;height:400px;background-color: aliceblue;"></div>
        <div>
            <el-button @click="showData()">显示数据</el-button>
        </div>
    </div>
</template>

<script>
import * as echarts from "echarts";
export default {
    name: "HelloWord",
    return: {
        xAxisData: [],
        seriesData: [],
    },
    methods: {
        showData() {
            this.xAxisData = ['Mon', 'Tue'];
            this.seriesData = [10, 11, 13, 11, 12, 12, 3];
            this.drawChart();
        },
        drawChart() {
            //2. 基于准备好的dom，初始化echarts实例
            var myChart = this.$echarts.init(document.getElementById('main'));
            //3. 指定图表的配置项和数据
            var option = {
                title: {
                    text: 'healthStatus Line'
                },
                tooltip: {
                    trigger: 'axis'
                },
                legend: {},
                toolbox: {
                    show: true,
                    feature: {
                        dataZoom: {
                            yAxisIndex: 'none'
                        },
                        dataView: { readOnly: false },
                        magicType: { type: ['line', 'bar'] },
                        restore: {},
                        saveAsImage: {}
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    data: this.xAxisData
                },
                yAxis: {
                    type: 'value',
                },
                series: [
                    {
                        name: 'Search Engine',
                        type: 'line',
                        data: this.seriesData,
                        markPoint: {
                            data: [
                                { type: 'max', name: 'Max' },
                                { type: 'min', name: 'Min' }
                            ]
                        },
                        markLine: {
                            data: [{
                                name: '阈值',
                                yAxis: 8
                            }],
                            lineStyle: {
                                color: '#'
                            }
                        }
                    }
                ]
            };
            //4.使用刚指定的配置项和数据显示图表。
            myChart.setOption(option);

        }
    },
}
</script>

<style scoped></style>
