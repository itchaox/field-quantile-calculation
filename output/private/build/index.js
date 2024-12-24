"use strict";
// FIXME 分位数计算
Object.defineProperty(exports, "__esModule", { value: true });
const block_basekit_server_api_1 = require("@lark-opdev/block-basekit-server-api");
const { t } = block_basekit_server_api_1.field;
// 通过addDomainList添加请求接口的域名
block_basekit_server_api_1.basekit.addDomainList(['api.exchangerate-api.com']);
block_basekit_server_api_1.basekit.addField({
    // 定义捷径的i18n语言资源
    i18n: {
        messages: {
            'zh-CN': {
                source: '待转换字段',
                p1: '请选择文本类型字段',
                p3: '数字之间用英文逗号分隔',
                p2: '排序列表',
                p4: '中位数',
            },
            'en-US': {
                source: 'Field to be converted',
                p1: 'Please select a text-type field',
                p3: 'Separate numbers with commas',
                p2: 'Sorted list',
                p4: 'Median',
            },
            'ja-JP': {
                source: '変換対象フィールド',
                p1: 'テキストタイプのフィールドを選択してください',
                p3: '数字はカンマで区切ってください',
                p2: 'ソートされたリスト',
                p4: '中央値',
            },
        },
    },
    // 定义捷径的入参
    formItems: [
        {
            key: 'source',
            label: t('source'),
            component: block_basekit_server_api_1.FieldComponent.FieldSelect,
            props: {
                supportType: [block_basekit_server_api_1.FieldType.Text, block_basekit_server_api_1.FieldType.Number],
                placeholder: t('p1'),
            },
            tooltips: [
                {
                    type: 'text',
                    content: t('p3'),
                },
            ],
            validator: {
                required: true,
            },
        },
    ],
    // 定义捷径的返回结果类型
    resultType: {
        type: block_basekit_server_api_1.FieldType.Object,
        extra: {
            icon: {
                light: 'https://lf3-static.bytednsdoc.com/obj/eden-cn/abjayvoz/ljhwZthlaukjlkulzlp/2024q3/fenweishu.png?x-resource-account=public',
            },
            properties: [
                {
                    key: 'sort',
                    isGroupByKey: true,
                    type: block_basekit_server_api_1.FieldType.Text,
                    title: t('p2'),
                    primary: true,
                },
                {
                    key: 'median',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: t('p4'),
                    extra: {
                        formatter: block_basekit_server_api_1.NumberFormatter.DIGITAL_ROUNDED_2,
                    },
                },
                {
                    key: 'percent0',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: '0%',
                    extra: {
                        formatter: block_basekit_server_api_1.NumberFormatter.DIGITAL_ROUNDED_2,
                    },
                },
                {
                    key: 'percent25',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: '25%',
                    extra: {
                        formatter: block_basekit_server_api_1.NumberFormatter.DIGITAL_ROUNDED_2,
                    },
                },
                {
                    key: 'percent50',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: '50%',
                    extra: {
                        formatter: block_basekit_server_api_1.NumberFormatter.DIGITAL_ROUNDED_2,
                    },
                },
                {
                    key: 'percent75',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: '75%',
                    extra: {
                        formatter: block_basekit_server_api_1.NumberFormatter.DIGITAL_ROUNDED_2,
                    },
                },
                {
                    key: 'percent100',
                    type: block_basekit_server_api_1.FieldType.Number,
                    title: '100%',
                    extra: {
                        formatter: block_basekit_server_api_1.NumberFormatter.DIGITAL_ROUNDED_2,
                    },
                },
            ],
        },
    },
    // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
    execute: async (formItemParams) => {
        const { source, changeType } = formItemParams;
        // 数字类型 source 直接为值
        //  文本类型 source 为 [{ type: 'text , text '8'}]
        const sourceValue = Array.isArray(source) && source.length > 0 ? source[0].text : source;
        // function calculateQuantiles(input) {
        //   // 将输入字符串按英文逗号分割，并将每个部分转换为数字
        //   let numbers = input.split(',').map(Number);
        //   // 对数组进行排序
        //   numbers.sort((a, b) => a - b);
        //   // 计算中位数函数
        //   function median(arr) {
        //     const mid = Math.floor(arr.length / 2);
        //     if (arr.length % 2 === 0) {
        //       // 如果数组长度是偶数，返回中间两个数的平均值
        //       return (arr[mid - 1] + arr[mid]) / 2;
        //     } else {
        //       // 如果数组长度是奇数，返回中间的数
        //       return arr[mid];
        //     }
        //   }
        //   function quantile(arr, q) {
        //     arr.sort((a, b) => a - b);
        //     // 特殊处理 0% 和 100% 的情况
        //     if (q === 0) return arr[0]; // 0% 应该是第一个元素
        //     if (q === 1) return arr[arr.length - 1]; // 100% 应该是最后一个元素
        //     const pos = (arr.length + 1) * q;
        //     const index = Math.floor(pos) - 1;
        //     return arr[index];
        //   }
        //   return {
        //     sortedList: numbers,
        //     median: Number(median(numbers)),
        //     percent0: Number(quantile(numbers, 0)),
        //     percent25: Number(quantile(numbers, 0.25)),
        //     percent50: Number(quantile(numbers, 0.5)),
        //     percent75: Number(quantile(numbers, 0.75)),
        //     percent100: Number(quantile(numbers, 1)),
        //   };
        // }
        function calculateQuantiles(input) {
            // 将输入字符串按英文逗号分割，并将每个部分转换为数字
            let numbers = input.split(',').map(Number);
            // 对数组进行排序
            numbers.sort((a, b) => a - b);
            function quantile(arr, q) {
                const n = arr.length;
                const pos = (n - 1) * q;
                const index = Math.floor(pos);
                const fraction = pos - index;
                if (q === 0.25 || q === 0.75) {
                    // 特殊处理 25% 和 75% 分位数
                    if (n % 2 === 0) {
                        // 偶数个元素
                        if (q === 0.25)
                            return Number.isInteger(n / 4 - 1) && Number.isInteger(n / 4)
                                ? (arr[n / 4 - 1] + arr[n / 4]) / 2
                                : arr[(n / 4 - 1 + n / 4) / 2];
                        if (q === 0.75)
                            return Number.isInteger((3 * n) / 4 - 1) && Number.isInteger((3 * n) / 4)
                                ? (arr[(3 * n) / 4 - 1] + arr[(3 * n) / 4]) / 2
                                : arr[((3 * n) / 4 - 1 + (3 * n) / 4) / 2];
                        // if (q === 0.25) return arr[(n / 4 - 1 + n / 4) / 2];
                        // if (q === 0.75) return arr[((3 * n) / 4 - 1 + (3 * n) / 4) / 2];
                    }
                    else {
                        // 奇数个元素
                        if (q === 0.25)
                            return arr[Math.floor(n / 4)];
                        if (q === 0.75)
                            return arr[Math.floor((3 * n) / 4)];
                    }
                }
                // 其他分位数的常规计算
                if (index + 1 < n) {
                    return arr[index] * (1 - fraction) + arr[index + 1] * fraction;
                }
                else {
                    return arr[index];
                }
            }
            return {
                sortedList: numbers,
                percent0: numbers[0],
                percent25: quantile(numbers, 0.25),
                percent50: quantile(numbers, 0.5),
                percent75: quantile(numbers, 0.75),
                percent100: numbers[numbers.length - 1],
            };
        }
        try {
            return {
                code: block_basekit_server_api_1.FieldCode.Success,
                data: {
                    sort: calculateQuantiles(sourceValue).sortedList.join(','),
                    median: calculateQuantiles(sourceValue).percent50,
                    percent0: calculateQuantiles(sourceValue).percent0,
                    percent25: calculateQuantiles(sourceValue).percent25,
                    percent50: calculateQuantiles(sourceValue).percent50,
                    percent75: calculateQuantiles(sourceValue).percent75,
                    percent100: calculateQuantiles(sourceValue).percent100,
                },
            };
        }
        catch (e) {
            return {
                code: block_basekit_server_api_1.FieldCode.Error,
            };
        }
    },
});
exports.default = block_basekit_server_api_1.basekit;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7O0FBRWQsbUZBTzhDO0FBRTlDLE1BQU0sRUFBRSxDQUFDLEVBQUUsR0FBRyxnQ0FBSyxDQUFDO0FBRXBCLDJCQUEyQjtBQUMzQixrQ0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQztBQUVwRCxrQ0FBTyxDQUFDLFFBQVEsQ0FBQztJQUNmLGdCQUFnQjtJQUNoQixJQUFJLEVBQUU7UUFDSixRQUFRLEVBQUU7WUFDUixPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLE9BQU87Z0JBQ2YsRUFBRSxFQUFFLFdBQVc7Z0JBQ2YsRUFBRSxFQUFFLGFBQWE7Z0JBQ2pCLEVBQUUsRUFBRSxNQUFNO2dCQUNWLEVBQUUsRUFBRSxLQUFLO2FBQ1Y7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLHVCQUF1QjtnQkFDL0IsRUFBRSxFQUFFLGlDQUFpQztnQkFDckMsRUFBRSxFQUFFLDhCQUE4QjtnQkFDbEMsRUFBRSxFQUFFLGFBQWE7Z0JBQ2pCLEVBQUUsRUFBRSxRQUFRO2FBQ2I7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsTUFBTSxFQUFFLFdBQVc7Z0JBQ25CLEVBQUUsRUFBRSx3QkFBd0I7Z0JBQzVCLEVBQUUsRUFBRSxpQkFBaUI7Z0JBQ3JCLEVBQUUsRUFBRSxXQUFXO2dCQUNmLEVBQUUsRUFBRSxLQUFLO2FBQ1Y7U0FDRjtLQUNGO0lBQ0QsVUFBVTtJQUNWLFNBQVMsRUFBRTtRQUNUO1lBQ0UsR0FBRyxFQUFFLFFBQVE7WUFDYixLQUFLLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQztZQUNsQixTQUFTLEVBQUUseUNBQWMsQ0FBQyxXQUFXO1lBQ3JDLEtBQUssRUFBRTtnQkFDTCxXQUFXLEVBQUUsQ0FBQyxvQ0FBUyxDQUFDLElBQUksRUFBRSxvQ0FBUyxDQUFDLE1B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