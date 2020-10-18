const complexSelectorRegex = /^([a-zA-Z]+)?(([.#]([^.#~*+]+))+)/;

function computeSpecificity(selector) {
  let p = [0, 0, 0, 0];
  let selectorParts = selector.split(" ");
  for (let part of selectorParts) {
      if (part.match(complexSelectorRegex)) {
          const tagName = RegExp.$1;
          const actualSelector = RegExp.$2;
          if (tagName) {
              p[3] += 1;
          }

          actualSelector.split('.').slice(0).forEach(( cur) => {
              let className = (cur.split('#') || [])[0];
              if (className) {
                  p[2] += 1;
              }

          });
          actualSelector.split('#').slice(0).forEach(cur => {
              let id = (cur.split('.') || [])[0];
              if (id) {
                  p[1] += 1;
              }
          });
      } else if (part.charAt(0) === '#') {
          p[1] += 1;
      } else if (part.charAt(0) === '.') {
          p[2] += 1;
      } else {
          p[3] += 1;
      }
  }

  return p;
}

​