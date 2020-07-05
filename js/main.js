const $siteList = $(".siteList");
const $lastLi = $("li.lastLi");
const x = localStorage.getItem("x");
const xObject = JSON.parse(x);
const array = xObject || [
  {
    index: 0,
    herf: "https://bilibili.com",
    img: "image/bilibili.jpg",
    logo: "B",
    type: "img",
    link: "bilibili.com",
  },
  {
    index: 1,
    herf: "https://bilibili.com",
    logo: "A",
    link: "bilibili.com",
  },
];
// console.log(array);
//进入页面 遍历 渲染
array.forEach((node) => {
  if (node.type === "img") {
    $(`<li class='site index${node.index}'>
      <a href="${node.herf}">
      <div class='logo'>
          <div class="icon">
          <img src="${node.img}">
          </div>
      </div>
      <div class="link">${node.herf
        .replace("https://", "")
        .replace("http://", "")
        .replace(".com", "")}
      <div class = 'close'>
      <svg class="icon " aria-hidden="true">
        <use xlink:href="#icon-close"></use>
      </svg>
      </div>
  </a>
  </li>`).insertBefore($lastLi);
  } else {
    $(`<li class='site index${node.index}'>
      <a href="${node.herf}">
      <div class='logo'>
          <div class="icon">
          ${node.logo[0]}
          </div>
      </div>
      <div class="link">${node.herf
        .replace("https://", "")
        .replace("http://", "")
        .replace(".com", "")}</div>
      <div class = 'close'>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-close"></use>
      </svg>
      </div>
  </a>
  </li>`).insertBefore($lastLi);
  }
});

//事件委托 删除事件
$siteList.on("click", (e) => {
  if (e.target.tagName === "svg" || e.target.tagName === "use") {
    let index = array.findIndex((item) => {
      return (
        String(item.index) ===
        $(event.target).parents(".site").attr("class").replace("site index", "")
      );
    });
    array.splice(index, 1);

    $(event.target).parents(".site").remove();
    return false;
  }
});

//添加新增事件
$(".addButton").on("click", () => {
  let url = window.prompt("请输入网站网址");
  if (url === undefined || url === null || url === "") {
    return;
  }
  if (url.indexOf("https") !== 0) {
    url = "https://" + url;
  }
  const $li = $(`
    <li class='site index${array.length}'>
    <a href="${url}">
        <div class='logo'>
            <div class="icon">${url[8].toUpperCase()}</div>
        </div>
        <div class="link">${url
          .replace("https://", "")
          .replace("http://", "")
          .replace(".com", "")}</div>
        
      <div class = 'close'>
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-close"></use>
      </svg>
      </div>
    </a>
  </li>
    `).insertBefore($lastLi);
  array.push({
    index: array.length,
    herf: url,
    logo: url[8],
    link: url.substring(8),
  });
});
// 数据存储localStorage;
window.onbeforeunload = () => {
  const str = JSON.stringify(array);
  localStorage.setItem("x", str);
};

$(document).on("keypress", (e) => {
  for (let item of array) {
    if (item.logo.toLowerCase() === e.key) {
      window.open(item.herf);
    }
  }
});
