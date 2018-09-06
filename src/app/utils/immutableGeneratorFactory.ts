function immutableGeneratorFactory(generatorFunction) {
  const nextFor = history => input => {
    const newHistory = history.concat([input]);
    const generator = generatorFunction(newHistory[0]);
    const { value, done } = newHistory.map(x => generator.next(x))[
      history.length
    ];

    return {
      value,
      mutable: generator,
      next: done ? undefined : nextFor(newHistory),
    };
  };

  return nextFor([]);
}

export default immutableGeneratorFactory;
