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

// 根据页面名称加载对应的内容
function loadPage(page) {
  switch (page) {
    case 'index':
      window.location.href = 'index.html';
      break;
    case 'notes':
      window.location.href = 'notes.html';
      break;
    case 'albums':
      window.location.href = 'albums.html';
      break;
    default:
      console.error('Unknown page:', page);
  }
}

// 加载 Markdown 笔记
function loadMarkdownNotes() {
  fetch('notes.md')
    .then(response => response.text())
    .then(text => {
      const markdownContent = document.getElementById('markdown-content');
      markdownContent.innerHTML = marked.parse(text);
    })
    .catch(error => {
      console.error('Error loading Markdown file:', error);
    });
}

// 加载相册集
function loadAlbums() {
  const albumContainer = document.getElementById('album-container');
  const albums = [
    { title: '小埋', images: ['/images/小埋1.png', '/images/小埋2.jpeg', '/images/小埋3.jpeg'] },
    { title: '乐器展', images: ["/images/instrument_expo/IMG_9464.JPG",] } 
  ];

  albums.forEach(album => {
    const albumDiv = document.createElement('div');
    albumDiv.classList.add('album-set');
    albumDiv.innerHTML = `
      <h2>${album.title}</h2>
      <img src="${album.images[0]}" alt="${album.title}封面" class="album-cover">
    `;
    albumDiv.addEventListener('click', () => showAlbum(album));
    albumContainer.appendChild(albumDiv);

  });
}

// 显示相册集
function showAlbum(album) {
  const modal = document.getElementById('modal');
  const modalImages = document.getElementById('modal-images');
  modalImages.innerHTML = '';

  album.images.forEach(imageSrc => {
    const img = document.createElement('img');
    img.src = imageSrc;
    img.classList.add('modal-image');
    modalImages.appendChild(img);
  });

  modal.style.display = 'block';
}

// 关闭模态框
function closeModal() {
  const modal = document.getElementById('modal');
  if (modal) {
    modal.style.display = 'none';
  } else {
    console.error('Modal not found');
  }
}