export function mapTo(keys: string[], keyFn: (predicate: any) => string) {
  return (rows: any[]) => {
    const group = new Map();
    rows.forEach(row => group.set(keyFn(row), row));
    return Array.from(group.values());
  };
}

export function mapToMany(keys: string[], keyFn: (predicate: any) => string) {
  return (rows: any[]) => {
    const group = new Map();
    rows.forEach(row => {
      const nextGroup = group.get(keyFn(row)) || [];
      // group.set()
    });
  };
}
