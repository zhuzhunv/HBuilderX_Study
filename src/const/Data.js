const FlowData =
// {
//     "code": 100, "message": "操作成功", "data": [
//         { "promoteMsg": "", "productID": "159", "activity": 1, "fee": 10.05, "remark": "全国可用,月底失效", "orignFee": 10, "useArea": "全国流量", "subProduct": null, "face": 10, "flowValue": 1, "payFee": 10.05, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 10, "businessType": 5, "flowType": 1 },
//         { "promoteMsg": "", "productID": "357", "activity": 1, "fee": 20.11, "remark": "全国可用,月底失效", "orignFee": 20, "useArea": "全国流量", "subProduct": null, "face": 20, "flowValue": 1, "payFee": 20.11, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 20, "businessType": 5, "flowType": 1 },
//         { "promoteMsg": "", "productID": "486", "activity": 1, "fee": 30.17, "remark": "全国可用,月底失效", "orignFee": 30, "useArea": "全国流量", "subProduct": null, "face": 30, "flowValue": 1, "payFee": 30.17, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 30, "businessType": 5, "flowType": 1 }
//     ]
// }

//st_down_product t,st_carrier_business t1,st_carrier_products t2,zd_product_extend t3,zd_product_info t4

{
    "code": 100, "message": "操作成功", "data": [
        {
            "promoteMsg": "",//推荐消息 18 zd_product_info 的 promote_msg
            "productID": "scydll100",//产品编号  18 st_down_product 的 channel_product_no
            "activity": 1,//推荐类型 1无推荐 2推荐  nvl(t4.promote_type, 1)
            "fee": 9.50, //金额  nvl(t4.zd_sale_price,st_f_get_sprice_by_bprice(t2.product_value * t.sales_discount,t.channel_no,t1.business_type,t1.carrier_no,
                                    //   case
                                    //     when t.money_face is null then
                                    //      t2.real_face
                                    //     when t.money_face <= 0 then
                                    //      t2.real_face
                                    //     else
                                    //      t.money_face
                                    //   end)
            "remark": "全国可用,月底失效,不可解速",// nvl(t4.product_info, t3.remark) 
            "orignFee": 10,//      case
                            //     when t.money_face is null then
                            //     t2.real_face
                            //     when t.money_face <= 0 then
                            //     t2.real_face
                            //     else
                            //     t.money_face
                            //      end,
            "productName": null,
            "useArea": "流量月包", //使用范围 18 zd_product_extend 的 useArea
            "subProduct": null,
            "face": 100,//面值 18 st_carrier_products 的product_value
            "flowValue": 1, //       (case
                            //          when t1.business_type in (28, 31, 32) then
                            //          0
                            //          else
                            //          1
                            //          end) flowval

            "payFee": 9.50, //支付金额 t4.real_get_fee ? t4.real_get_fee : ("fee": 9.50)
            "rechargeMode": 0,//充值模式 0 快充 1慢充 *无限制 18 st_carrier_business 的 recharge_mode
            "carrierNo": null,
            "showPromote": 0, //    (case
                              //    when t4.activity_id is null then
                              //    0
                              //    else
                              //    1
                              //    end) show_tag  是否存在活动编号 0代表没有关联活动 1代表关联活动
            "maxFlow": 100, // 最大限速 也是面值 nvl(t4.max_flow, t2.product_value) max_flow 
            "businessType": 5, //业务类型  18 st_carrier_business 的business_type
            "productNo": null, //
            "flowType": 1 //流量类型 2个性包 1直充包 18 zd_product_extend 的flow_type
        },
        { "promoteMsg": "", "productID": "scydll300", "activity": 1, "fee": 19.0, "remark": "全国可用,月底失效,不可解速", "orignFee": 20, "productName": null, "useArea": "流量月包", "subProduct": null, "face": 300, "flowValue": 1, "payFee": 19.0, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 300, "businessType": 5, "productNo": null, "flowType": 1 },
        { "promoteMsg": "", "productID": "scydll500", "activity": 1, "fee": 28.50, "remark": "全国可用,月底失效,不可解速", "orignFee": 30, "productName": null, "useArea": "流量月包", "subProduct": null, "face": 500, "flowValue": 1, "payFee": 28.50, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 500, "businessType": 5, "productNo": null, "flowType": 1 },
        { "promoteMsg": "", "productID": "scyddrb1024", "activity": 1, "fee": 5.0, "remark": "全国可用,当日有效,不可解速", "orignFee": 10, "productName": null, "useArea": "全国日包", "subProduct": null, "face": 1024, "flowValue": 1, "payFee": 5.0, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 1024, "businessType": 10, "productNo": null, "flowType": 2 },
        { "promoteMsg": "", "productID": "scydll1024", "activity": 2, "fee": 27.0, "remark": "全国可用,月底失效,不可解速", "orignFee": 30, "productName": null, "useArea": "流量月包", "subProduct": null, "face": 1024, "flowValue": 1, "payFee": 27.0, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 1024, "businessType": 5, "productNo": null, "flowType": 1 },
        { "promoteMsg": "含30天优酷会员", "productID": "scydyksp1024", "activity": 2, "fee": 45.0, "remark": "全国可用,月底失效,不可解速", "orignFee": 50, "productName": null, "useArea": "流量月包", "subProduct": null, "face": 1024, "flowValue": 1, "payFee": 45.0, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 1024, "businessType": 5, "productNo": null, "flowType": 1 },
        { "promoteMsg": "含30天爱奇艺会员", "productID": "scydaqysp1024", "activity": 2, "fee": 46.0, "remark": "全国可用,月底失效,不可解速", "orignFee": 50, "productName": null, "useArea": "流量月包", "subProduct": null, "face": 1024, "flowValue": 1, "payFee": 46.0, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 1024, "businessType": 5, "productNo": null, "flowType": 1 },
        { "promoteMsg": "", "productID": "scydll2048", "activity": 1, "fee": 40.0, "remark": "全国可用,月底失效,不可解速", "orignFee": 50, "productName": null, "useArea": "流量月包", "subProduct": null, "face": 2048, "flowValue": 1, "payFee": 40.0, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 2048, "businessType": 5, "productNo": null, "flowType": 1 },
        { "promoteMsg": "含30天优酷会员", "productID": "scydyksp2048", "activity": 1, "fee": 54.0, "remark": "全国可用,月底失效,不可解速", "orignFee": 50, "productName": null, "useArea": "流量月包", "subProduct": null, "face": 2048, "flowValue": 1, "payFee": 54.0, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 2048, "businessType": 5, "productNo": null, "flowType": 1 },
        { "promoteMsg": "含30天爱奇艺会员", "productID": "scydaqysp2048", "activity": 1, "fee": 55.0, "remark": "全国可用,月底失效,不可解速", "orignFee": 50, "productName": null, "useArea": "流量月包", "subProduct": null, "face": 2048, "flowValue": 1, "payFee": 55.0, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 2048, "businessType": 5, "productNo": null, "flowType": 1 },
        { "promoteMsg": "", "productID": "scydll3072", "activity": 1, "fee": 59.50, "remark": "全国可用,月底失效,不可解速", "orignFee": 70, "productName": null, "useArea": "流量月包", "subProduct": null, "face": 3072, "flowValue": 1, "payFee": 59.50, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 3072, "businessType": 5, "productNo": null, "flowType": 1 },
        { "promoteMsg": "", "productID": "scydll5120", "activity": 1, "fee": 80.0, "remark": "全国可用,月底失效,不可解速", "orignFee": 100, "productName": null, "useArea": "流量月包", "subProduct": null, "face": 5120, "flowValue": 1, "payFee": 80.0, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 5120, "businessType": 5, "productNo": null, "flowType": 1 }
    ]
}

const FeeData =
{
    "code": 100, "message": "操作成功",
    "data": [
        { "promoteMsg": "", "productID": "scydcc30", "activity": 1, "fee": 29.99, "remark": "", "orignFee": 30, "productName": null, "useArea": "", "subProduct": null, "face": 30, "flowValue": 1, "payFee": 29.99, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 30, "businessType": 2, "productNo": null, "flowType": null },
        { "promoteMsg": "", "productID": "scydcc50", "activity": 1, "fee": 49.99, "remark": "", "orignFee": 50, "productName": null, "useArea": "", "subProduct": null, "face": 50, "flowValue": 1, "payFee": 49.99, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 50, "businessType": 2, "productNo": null, "flowType": null },
        { "promoteMsg": "", "productID": "scydcc100", "activity": 1, "fee": 99.98, "remark": "", "orignFee": 100, "productName": null, "useArea": "", "subProduct": null, "face": 100, "flowValue": 1, "payFee": 99.98, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 100, "businessType": 2, "productNo": null, "flowType": null },
        { "promoteMsg": "", "productID": "scydcc200", "activity": 1, "fee": 199.96, "remark": "", "orignFee": 200, "productName": null, "useArea": "", "subProduct": null, "face": 200, "flowValue": 1, "payFee": 199.96, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 200, "businessType": 2, "productNo": null, "flowType": null },
        { "promoteMsg": "", "productID": "scydcc300", "activity": 1, "fee": 299.94, "remark": "", "orignFee": 300, "productName": null, "useArea": "", "subProduct": null, "face": 300, "flowValue": 1, "payFee": 299.94, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 300, "businessType": 2, "productNo": null, "flowType": null },
        { "promoteMsg": "", "productID": "scydcc500", "activity": 1, "fee": 499.90, "remark": "", "orignFee": 500, "productName": null, "useArea": "", "subProduct": null, "face": 500, "flowValue": 1, "payFee": 499.90, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 500, "businessType": 2, "productNo": null, "flowType": null }]
}
// {
//     "code": 100, "message": "操作成功", "data": [
//         { "promoteMsg": "", "productID": "147", "activity": 1, "fee": 0.01, "remark": "", "orignFee": 1, "useArea": "", "subProduct": null, "face": 1, "flowValue": 1, "payFee": 0.01, "rechargeMode": 0, "carrierNo": null, "showPromote": 0, "maxFlow": 1, "businessType": 2, "flowType": null },
//         { "promoteMsg": "测试消息", "productID": "105981", "activity": 1, "fee": 0.02, "remark": "全国通话,月底失效", "orignFee": 2, "useArea": "", "subProduct": null, "face": 2, "flowValue": 1, "payFee": 0.02, "rechargeMode": 0, "carrierNo": null, "showPromote": 1, "maxFlow": 2, "businessType": 2, "flowType": null },
//         { "promoteMsg": "", "productID": "105980", "activity": 1, "fee": 0.03, "remark": "全国通话,月底失效", "orignFee": 3, "useArea": "", "subProduct": null, "face": 3, "flowValue": 1, "payFee": 0.03, "rechargeMode": 0, "carrierNo": null, "showPromote": 1, "maxFlow": 3, "businessType": 2, "flowType": null }
//     ]
// }
export {
    FlowData,
    FeeData
}