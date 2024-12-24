// FIXME 分位数计算

import {
  basekit,
  FieldType,
  field,
  FieldComponent,
  FieldCode,
  NumberFormatter,
} from '@lark-opdev/block-basekit-server-api';

const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['api.exchangerate-api.com']);

basekit.addField({
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
      component: FieldComponent.FieldSelect,
      props: {
        supportType: [FieldType.Text, FieldType.Number],
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
    type: FieldType.Object,
    extra: {
      icon: {
        light:
          'https://lf3-static.bytednsdoc.com/obj/eden-cn/abjayvoz/ljhwZthlaukjlkulzlp/2024q3/fenweishu.png?x-resource-account=public',
      },
      properties: [
        {
          key: 'sort',
          isGroupByKey: true,
          type: FieldType.Text,
          title: t('p2'),
          primary: true,
        },
        {
          key: 'median',
          type: FieldType.Number,
          title: t('p4'),
          extra: {
            formatter: NumberFormatter.DIGITAL_ROUNDED_2,
          },
        },
        {
          key: 'percent0',
          type: FieldType.Number,
          title: '0%',
          extra: {
            formatter: NumberFormatter.DIGITAL_ROUNDED_2,
          },
        },
        {
          key: 'percent25',
          type: FieldType.Number,
          title: '25%',
          extra: {
            formatter: NumberFormatter.DIGITAL_ROUNDED_2,
          },
        },
        {
          key: 'percent50',
          type: FieldType.Number,
          title: '50%',
          extra: {
            formatter: NumberFormatter.DIGITAL_ROUNDED_2,
          },
        },
        {
          key: 'percent75',
          type: FieldType.Number,
          title: '75%',
          extra: {
            formatter: NumberFormatter.DIGITAL_ROUNDED_2,
          },
        },
        {
          key: 'percent100',
          type: FieldType.Number,
          title: '100%',
          extra: {
            formatter: NumberFormatter.DIGITAL_ROUNDED_2,
          },
        },
      ],
    },
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: { changeType: any; source: { type: string; text: string }[] | number }) => {
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
          } else {
            // 奇数个元素
            if (q === 0.25) return arr[Math.floor(n / 4)];
            if (q === 0.75) return arr[Math.floor((3 * n) / 4)];
          }
        }

        // 其他分位数的常规计算
        if (index + 1 < n) {
          return arr[index] * (1 - fraction) + arr[index + 1] * fraction;
        } else {
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
        code: FieldCode.Success,
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
    } catch (e) {
      return {
        code: FieldCode.Error,
      };
    }
  },
});
export default basekit;
