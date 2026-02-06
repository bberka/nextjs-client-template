import { toast } from "sonner";
import type { Result } from "@/types/api";
import { SeverityLevel } from "@/types/api";

export function showResult(result: Result) {
  switch (result.severity) {
    case SeverityLevel.Success:
      toast.success(result.message);
      break;
    case SeverityLevel.Info:
      toast.info(result.message);
      break;
    case SeverityLevel.Warning:
      toast.warning(result.message);
      break;
    case SeverityLevel.Error:
      toast.error(result.message);
      break;
  }
}

export function showSuccess(message: string) {
  toast.success(message);
}

export function showError(message: string) {
  toast.error(message);
}

export function showInfo(message: string) {
  toast.info(message);
}
