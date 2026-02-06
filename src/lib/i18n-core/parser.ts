export function interpolate(template: string, args?: Record<string, string | number | boolean>): string {
  if (!args) return template;
  return template.replace(/\{\{(\w+)\}\}/g, (_, key: string) => {
    return key in args ? String(args[key]) : `{{${key}}}`;
  });
}
