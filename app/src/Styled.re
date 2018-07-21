let concat = (maybeClassName, className) =>
  switch (maybeClassName) {
  | Some(value) => {j|$className $maybeClassName|j}
  | None => className
  };