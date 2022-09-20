const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o'];

const letterGroups = new Array(letters.length).fill(null).map((_, index) => letters.slice(0, index + 1));

const template = (lettersGroup) => {
  const generics = lettersGroup.map((l) => `O${l.toUpperCase()} extends DIAnyComposite`).join(',');
  const abcParams = lettersGroup.map((l) => `${l}: O${l.toUpperCase()}`).join(',');
  const projectParams = lettersGroup.map((l) => `p${l}: DICompositeValue<O${l.toUpperCase()}>`).join(',');
  const combined = lettersGroup.map((l) => `DICompositeDependency<O${l.toUpperCase()}>`).join('&');
  const record = `DIRecord<R, EmptyToVoid<${combined}>>`;

  return `<R, ${generics}>(${abcParams}, project: (${projectParams}) => R): ${record};`;
};

const typings = letterGroups.map(template).join('');

copy(typings);
