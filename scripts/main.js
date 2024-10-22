document.addEventListener('DOMContentLoaded', function() {
  // 初始化页面
  initPage();

  // 绑定导航链接的点击事件
  bindNavLinks();

  // 加载 Markdown 笔记（如果当前页面是笔记页面）
  if (window.location.pathname.endsWith('notes.html')) {
    loadMarkdownNotes();
  }

  // 如果当前页面是相册页面，加载相册
  if (window.location.pathname.endsWith('albums.html')) {
    loadAlbums();
  }

  // 设置用户名
  if (!localStorage.getItem("name")) {
    setUserName();
  } else {
    let storedName = localStorage.getItem("name");
    setWelcomeMessage(storedName);
  }

  // 确保在 DOM 完全加载后绑定关闭模态框的事件
  const closeButton = document.querySelector('.close');
  if (closeButton) {
    closeButton.addEventListener('click', closeModal);
  } 

  // 点击模态框外部关闭
  window.onclick = function(event) {
    const modal = document.getElementById('modal');
    if (event.target == modal) {
      closeModal();
    }
  };
});

function initPage() {
  // 这里可以添加一些初始化页面的逻辑
  console.log('Page initialized');
}

function bindNavLinks() {
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    link.addEventListener('click', function(event) {
      event.preventDefault(); // 阻止默认的链接跳转行为

      const targetPage = this.getAttribute('href').slice(1); // 获取目标页面名称
      loadPage(targetPage);
    });
  });
}

let myButton = document.querySelector("button");

function setWelcomeMessage(name) {
  const welcomeMessage = `Hello, ${name}`;
  const currentPath = window.location.pathname;

  let headingElement;

  if (currentPath.endsWith('index.html')) {
    headingElement = document.getElementById("home_h1");
  } 
  if (headingElement) {
    headingElement.textContent = welcomeMessage;
  }
}

function setUserName() {
  let myName = prompt("Please enter your name:");

  if (myName && myName.trim()) { // 检查用户是否输入了有效的名字
    localStorage.setItem("name", myName.trim());
    setWelcomeMessage(myName.trim());
  } else {
    alert("Name cannot be empty. Please try again.");
    setUserName(); // 如果名字无效，重新提示用户输入
  }
}

myButton.onclick = function () {
  setUserName();
};

function handleMenuClick(event, sectionId) {
  event.preventDefault(); // 阻止默认的链接跳转行为
  document.querySelectorAll('.menu-bar a').forEach(item => {
      item.classList.remove('active'); // 移除所有激活状态
  });
  event.target.classList.add('active'); // 为当前点击的链接添加激活状态
  // 这里可以添加更多的逻辑，比如根据sectionId显示不同的内容
  console.log('Menu item clicked: ' + sectionId);
}