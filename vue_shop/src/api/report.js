import request from "@/utils/request";

const ReportApi = {
    //获取折线图数据
    getReportData: function () {
        return request({
            url: 'reports/type/1',
            method: 'GET'
        })
    }
}

export default ReportApi;