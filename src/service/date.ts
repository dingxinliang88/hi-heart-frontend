/**
 * 转换日期显示
 * @param date 日期
 */
export const parseDate = (date: Date) => {
  const dateObj = new Date(date);
  // 获取年份、月份和日期
  const year = dateObj.getFullYear();
  const month = ("0" + (dateObj.getMonth() + 1)).slice(-2); // 月份从0开始计数，所以要加1并将结果转为两位数
  const day = ("0" + dateObj.getDate()).slice(-2);

  // 将它们组合成 yyyy-mm-dd 的格式
  return `${year}-${month}-${day}`;
};
