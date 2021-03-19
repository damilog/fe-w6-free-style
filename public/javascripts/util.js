const _ = {
  $: (selector, base = document) => base.querySelector(selector),
  $All: (selector, base = document) => base.querySelectorAll(selector),
  $Remove: selector => {
    const el = _.$(`${selector}`);
    el.remove();
  },
};

const delay = ms =>
  new Promise(resolve => {
    setTimeout(() => resolve(ms), ms);
  });

//선택자에 해당하는 첫번째 element를 반환한다. 그럼 선택자로 해당 엘리먼트를 어떻게 조작?
//window -> dom 탐색 -> 계속 내려가면서 그 셀렉터 명을 가지고 있는지 찾음.. 찾으면 바로 반환..

// const dfs = ele => {
//   return ele.childNodes.forEach(x => {
//     if (x.selectorType === selector) return x;
//   });
// };

const qs = selector => {
  const dom = document.documentElement;
  const selectorTypeList = ["class", "id", "localName"];
  let selectorType = selector.includes(".")
    ? "class"
    : selector.includes("#")
    ? "id"
    : "localName";
  const selectorName = selector.replace(/[^a-z]/g, "");

  //window -> dom 탐색 -> 계속 내려가면서 그 셀렉터 명을 가지고 있는지 찾음.. 찾으면 바로 반환..

  let currentElem;

  //dom을 끝까지 찾았는데 일치하는게 안나오면? return null
  currentElem = dom.childNodes.forEach(x => {
    //   x.childNodes.forEach(x => {
    //     x.childNodes.forEach(x => {
    //   x.childNodes.for... 언제까지? x.selectorType  === selector 일때까지
    //     });
    //   });
  });
};

const qa = () => {};

export { _, delay };
