export enum SeverityLevel {
  Success = "success",
  Info = "info",
  Warning = "warning",
  Error = "error",
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface Result {
  message: string;
  severity: SeverityLevel;
  args?: Record<string, string | number | boolean>;
  validationErrors?: Record<string, ValidationError[]>;
}

export interface ResultT<T> extends Result {
  value: T | null;
}
