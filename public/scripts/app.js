window.addEventListener('DOMContentLoaded', async () => {
  const userInfo = document.querySelector('user-info');
  const navBar = document.querySelector('global-nav-bar');
  const menuTree = document.querySelector('global-menu-tree');
  const page = document.querySelector('page-container');

  const modules = await ajax.get(await ajax.getApiUrl('cm/modules.json'));
  navBar.setMenus(modules || []);

  // 현재 로드된 모듈&메뉴 확인
  let { module } = menus.getCurrentModuleAndMenu();
  if (module) {
    navBar.selectMenu(module.toUpperCase());
  }

  // nav bar 이벤트 핸들러
  navBar.addEventListener('menu-select', async (e) => {
    // 모듈 메뉴 선택
    console.log('menu selected:', e.detail);
    // 메뉴 트리 설정
    const { id, name } = e.detail;
    const subMenus = await ajax.get(await ajax.getApiUrl(`cm/menu/${id}.json`));
    menuTree.title = name;
    menuTree.menus = subMenus;
    if (module && id.toUpperCase() === module.toUpperCase()) {
      const menuId = menus.findMenuByURL(subMenus, window.location.pathname);
      menuTree.selectMenu(menuId);
    }
  });
  navBar.addEventListener('menu-search', () => {
    // 메뉴검색 클릭
    menuTree.setSearchFocus();
  });

  // 사용자 정보 설정
  userInfo.name = '변승환 상무';

  /*로그아웃*/
  userInfo.addEventListener('logout', async () => {
    console.log('logout button clicked');

    // 메시지박스 출력 샘플
    var msg = await MessageBox.show({
      icon: 'question',
      message: '로그아웃 하시겠습니까?',
      buttons: 'yesno',
    });

    if (msg.state === 'yes') {
      const result = await ajax.get(await ajax.getApiUrl('cm/logout')).then((data) => {
        console.log(data);
        if (data) {
          location.href = '/index.html';
        }
      });
    }
  });
});
