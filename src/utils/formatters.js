/** Number with thousands separators (replaces Vue 2 filter NumFormat). */
export function numFormat(value) {
  if (value !== 0 && !value) return 0;
  if (Number(value).toString() === "NaN") return value;
  const intPart = Number(value).toFixed(0);
  return intPart.toString().replace(/(\d)(?=(?:\d{3})+$)/g, "$1,");
}

/** Order export status label (replaces Vue 2 filter exportStatus). */
export function exportStatusLabel(value) {
  if (value == null || value === "") return "";
  if (value === "1") return "注文確定";
  if (value === "2") return "受注済み";
  if (value === "3") return "注文キャンセル";
  if (value === "4") return "製造後キャンセル";
  return "";
}
