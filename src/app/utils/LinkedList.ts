interface LLNode<T> {
  value: T;
  next: LLNode<T> | null;
}

function get<T>(list: LLNode<T>, key: T): LLNode<T> | null {
  if (list.value === key) {
    return list;
  }

  if (list.next) {
    return get(list.next, key);
  }

  return null;
}

export default { get };
