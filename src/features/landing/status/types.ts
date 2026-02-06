export type ServiceStatus = "operational" | "degraded" | "outage" | "maintenance";

export interface ServiceStatusItem {
  id: string;
  nameKey: string;
  status: ServiceStatus;
  statusKey: string;
}

export interface Incident {
  id: string;
  titleKey: string;
  descriptionKey: string;
  dateKey: string;
  badgeKey: string;
}
