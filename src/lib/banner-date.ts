const monthNumbers = ['', '壹', '貳', '叁', '肆', '伍', '陸', '柒', '捌', '玖', '拾', '拾壹', '拾貳'];
const dayUnits = ['', '壹', '貳', '叁', '肆', '伍', '陸', '柒', '捌', '玖'];
const calendar = new Intl.DateTimeFormat('en-US', {
  timeZone: 'Asia/Shanghai',
  calendar: 'gregory',
  numberingSystem: 'latn',
  year: 'numeric',
  month: 'numeric',
  day: 'numeric',
});

// 按公历月日使用指定的中文写法，例如 10.24 → 拾月廿四、7.3 → 柒月叁。
// 这里是显示格式转换，不进行农历换算。
export function formatBannerDate(date = new Date()) {
  const parts = calendar.formatToParts(date);
  const year = Number(parts.find(part => part.type === 'year')!.value);
  const month = Number(parts.find(part => part.type === 'month')!.value);
  const day = Number(parts.find(part => part.type === 'day')!.value);
  const dayText = day <= 10 ? monthNumbers[day]
    : day < 20 ? `拾${monthNumbers[day - 10]}`
    : day < 30 ? `廿${dayUnits[day - 20]}`
    : `卅${dayUnits[day - 30]}`;

  return {
    text: `${monthNumbers[month]}月${dayText}`,
    dateTime: `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`,
    label: `${year}年${month}月${day}日`,
  };
}
