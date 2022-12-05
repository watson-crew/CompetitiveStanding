export const insertBetween = (
  elements: React.ReactNode[],
  componentFactory: (key: string) => React.ReactNode,
  keyGenerator: (i: number) => string,
): React.ReactNode[] => {
  const newElements = [];

  for (let i = 0; i < elements.length; i++) {
    newElements.push(elements[i]);

    if (i !== elements.length - 1) {
      newElements.push(componentFactory(keyGenerator(i)));
    }
  }

  return newElements;
};
