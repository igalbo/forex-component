export function formatDate(date) {
  return date.toISOString().split("T")[0];
}

export function getDefaultEndDate() {
  const today = new Date();
  return formatDate(today);
}

export function getDefaultStartDate() {
  const today = new Date();
  const twoWeeksAgo = new Date(today.getTime() - 13 * 24 * 60 * 60 * 1000);
  return formatDate(twoWeeksAgo);
}

export function isValidDateRange(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  const diff = (e - s) / (1000 * 60 * 60 * 24);
  return diff >= 0 && diff < 15; // 14 days max
}

export function getDateRange(start, end) {
  const s = new Date(start);
  const e = new Date(end);
  const range = [];
  for (let d = s; d <= e; d.setDate(d.getDate() + 1)) {
    range.push(formatDate(new Date(d)));
  }
  return range;
}

export function getDailyPercentageChanges(data) {
  // Data is sorted by date
  // Percentage change = ((currentDayRate - previousDayRate) / previousDayRate)*100
  const changes = [];
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      changes.push(0); // No previous day for the first data point
    } else {
      const prev = data[i - 1].rate;
      const curr = data[i].rate;
      const pct = ((curr - prev) / prev) * 100;
      changes.push(pct.toFixed(2));
    }
  }
  return changes;
}
