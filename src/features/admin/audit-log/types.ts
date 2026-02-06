export interface AuditEntry {
  id: string;
  userId: string;
  action: string;
  target: string;
  timestamp: string;
  details: string;
}
