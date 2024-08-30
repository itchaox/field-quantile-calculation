/*
 * @Version    : v1.00
 * @Author     : Wang Chao
 * @Date       : 2024-08-19 21:34
 * @LastAuthor : Wang Chao
 * @LastTime   : 2024-08-21 13:07
 * @desc       :
 */
const Conversion = {
    // 二进制转十进制
    BinaryToDecimal: (binary) => {
        return parseInt(binary, 2).toString(10);
    },
    // 二进制转十六进制
    BinaryToHexadecimal: (binary) => {
        return parseInt(binary, 2).toString(16).toLowerCase();
    },
    // 十进制转二进制
    DecimalToBinary: (decimal) => {
        return parseInt(decimal, 10).toString(2);
    },
    // 十进制转十六进制
    DecimalToHexadecimal: (decimal) => {
        return parseInt(decimal, 10).toString(16).toLowerCase();
    },
    // 十六进制转二进制
    HexadecimalToBinary: (hexadecimal) => {
        return parseInt(hexadecimal, 16).toString(2);
    },
    // 十六进制转十进制
    HexadecimalToDecimal: (hexadecimal) => {
        return parseInt(hexadecimal, 16).toString(10);
    },
    // 将 RGB 颜色转换为 HEX 颜色格式
    RGBToHEX: (rgbString) => {
        // 从字符串中解析出 R、G、B 值
        const [r, g, b] = rgbString.split(',').map(Number);
        // 将 R、G、B 值转换为 HEX 格式
        const toHex = (x) => x.toString(16).padStart(2, '0').toUpperCase();
        return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
    },
    // 将 HEX 颜色格式转换为 RGB 颜色格式
    HEXToRGB: (hex) => {
        // 移除开头的 #
        hex = hex.replace(/^#/, '');
        // 将 HEX 颜色值转换为 RGB 分量
        const r = parseInt(hex.slice(0, 2), 16);
        const g = parseInt(hex.slice(2, 4), 16);
        const b = parseInt(hex.slice(4, 6), 16);
        // 返回 RGB 字符串
        return `${r},${g},${b}`;
    },
};
module.exports = Conversion;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm5NYXAuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvdXRpbHMvZm5NYXAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7R0FPRztBQUVILE1BQU0sVUFBVSxHQUFHO0lBQ2pCLFVBQVU7SUFDVixlQUFlLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUMxQixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBQzFDLENBQUM7SUFFRCxXQUFXO0lBQ1gsbUJBQW1CLEVBQUUsQ0FBQyxNQUFNLEVBQUUsRUFBRTtRQUM5QixPQUFPLFFBQVEsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3hELENBQUM7SUFFRCxVQUFVO0lBQ1YsZUFBZSxFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDM0IsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQsV0FBVztJQUNYLG9CQUFvQixFQUFFLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDaEMsT0FBTyxRQUFRLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUMxRCxDQUFDO0lBRUQsV0FBVztJQUNYLG1CQUFtQixFQUFFLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDbkMsT0FBTyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsV0FBVztJQUNYLG9CQUFvQixFQUFFLENBQUMsV0FBVyxFQUFFLEVBQUU7UUFDcEMsT0FBTyxRQUFRLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUNoRCxDQUFDO0lBRUQsdUJBQXVCO0lBQ3ZCLFFBQVEsRUFBRSxDQUFDLFNBQVMsRUFBRSxFQUFFO1FBQ3RCLG1CQUFtQjtRQUNuQixNQUFNLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUVuRCxzQkFBc0I7UUFDdEIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUNuRSxPQUFPLElBQUksS0FBSyxDQUFDLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztJQUM5QyxDQUFDO0lBRUQseUJBQXlCO0lBQ3pCLFFBQVEsRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQ2hCLFVBQVU7UUFDVixHQUFHLEdBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFNUIsc0JBQXNCO1FBQ3RCLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztRQUN4QyxNQUFNLENBQUMsR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDeEMsTUFBTSxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRXhDLGFBQWE7UUFDYixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUMxQixDQUFDO0NBQ0YsQ0FBQztBQUVGLE1BQU0sQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDIn0=