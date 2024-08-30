// FIXME 手机号码获取所属地

import { basekit, FieldType, field, FieldComponent, FieldCode } from '@lark-opdev/block-basekit-server-api';

import opencc from 'node-opencc';

const { t } = field;

// 通过addDomainList添加请求接口的域名
basekit.addDomainList(['api.exchangerate-api.com']);

const fnMap = {
  1: 'BinaryToDecimal',
  2: 'BinaryToHexadecimal',
  3: 'DecimalToBinary',
  4: 'DecimalToHexadecimal',
  5: 'HexadecimalToBinary',
  6: 'HexadecimalToDecimal',
  7: 'RGBToHEX',
  8: 'HEXToRGB',
};

basekit.addField({
  // 定义捷径的i18n语言资源
  i18n: {
    messages: {
      'zh-CN': {
        source: '待转换字段',
        changeType: '目标格式',
        p1: '请选择文本类型字段',
        0: '简体',
        1: '正体繁体',
        2: '台湾繁体',
        3: '台湾模式-台湾繁体',
        4: '香港繁体',
      },
      'en-US': {
        source: 'Field to convert',
        changeType: 'Target format',
        p1: 'Please select a text-type field',
        0: 'Simplified Chinese',
        1: 'Traditional Chinese',
        2: 'Taiwan Traditional',
        3: 'Taiwan Mode - Traditional',
        4: 'Hong Kong Traditional',
      },
      'ja-JP': {
        source: '変換するフィールド',
        changeType: 'ターゲット形式',
        p1: 'テキストタイプのフィールドを選択してください',
        0: '簡体字',
        1: '正字体',
        2: '台湾正字体',
        3: '台湾モード-台湾正字体',
        4: '香港正字体',
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
        supportType: [FieldType.Text],
        placeholder: t('p1'),
      },
      validator: {
        required: true,
      },
    },
    {
      key: 'changeType',
      label: t('changeType'),
      component: FieldComponent.SingleSelect,
      props: {
        options: [
          { label: t('0'), value: 0 },
          { label: t('1'), value: 1 },
          { label: t('2'), value: 2 },
          { label: t('3'), value: 3 },
          { label: t('4'), value: 4 },
        ],
      },
      validator: {
        required: true,
      },
    },
  ],
  // 定义捷径的返回结果类型
  resultType: {
    type: FieldType.Text,
  },
  // formItemParams 为运行时传入的字段参数，对应字段配置里的 formItems （如引用的依赖字段）
  execute: async (formItemParams: { changeType: any; source: { type: string; text: string }[] | number }) => {
    const { source, changeType } = formItemParams;

    // 数字类型 source 直接为值
    //  文本类型 source 为 [{ type: 'text , text '8'}]
    const sourceValue = Array.isArray(source) && source.length > 0 ? source[0].text : source;

    // 转换函数
    function converter(value) {
      let result;

      // 简体
      if (changeType.value === 0) {
        result = opencc.taiwanToSimplifiedWithPhrases(value);
      }

      // 正体繁体
      if (changeType.value === 1) {
        result = opencc.simplifiedToTraditional(value);
      }

      // 台湾繁体
      if (changeType.value === 2) {
        result = opencc.simplifiedToTaiwan(value);
      }

      // 台湾模式-台湾繁体
      if (changeType.value === 3) {
        result = opencc.simplifiedToTaiwanWithPhrases(value);
      }

      // 香港繁体
      if (changeType.value === 4) {
        result = opencc.simplifiedToHongKong(value);
      }

      return result;
    }

    // 选了预置转换类型，则以预置转换类型为准
    let targetValue = converter(sourceValue);

    try {
      return {
        code: FieldCode.Success,
        data: targetValue,
      };
    } catch (e) {
      return {
        code: FieldCode.Error,
      };
    }
  },
});
export default basekit;
