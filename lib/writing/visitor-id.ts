const VISITOR_ID_KEY = "nyj_visitor_id";

export function getVisitorId(): string {
  const existing = localStorage.getItem(VISITOR_ID_KEY);
  if (existing) return existing;

  const id = crypto.randomUUID();
  localStorage.setItem(VISITOR_ID_KEY, id);
  return id;
}
