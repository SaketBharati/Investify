function parsePositiveAmount(value) {
  if (typeof value !== "number" && typeof value !== "string") return null;
  if (typeof value === "string" && !/^(?:\d+\.?\d*|\.\d+)(?:[eE][+-]?\d+)?$/.test(value.trim())) return null;
  const amount = typeof value === "number" ? value : Number(value.trim());
  if (!Number.isFinite(amount) || amount <= 0) return null;
  return amount;
}

function validIdempotencyKey(value) {
  return typeof value === "string" && value.length >= 8 && value.length <= 128 && /^[A-Za-z0-9._:-]+$/.test(value);
}

function isTransactionUnsupported(error) {
  const message = String(error?.message || "").toLowerCase();
  return error?.code === 20 || error?.code === 303 || message.includes("transaction numbers are only allowed") || message.includes("does not support retryable writes");
}

let transactionsSupported = null;
function setTransactionsSupported(value) { transactionsSupported = value; }
function areTransactionsSupported() { return transactionsSupported; }

module.exports = {
  parsePositiveAmount,
  validIdempotencyKey,
  isTransactionUnsupported,
  setTransactionsSupported,
  areTransactionsSupported,
};
