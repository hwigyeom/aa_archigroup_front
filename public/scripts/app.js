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

  /* 세션 타이머 설정 */
  SessionTimer.sessionTime = 60 * 60; // 서버 세션 시간을 기본 세션 시간으로 설정 (20분)
  SessionTimer.startSessionTimer(); // 설정된 기본 세션 시간으로 타이머 시작
  // SessionTimer.startSessionTimer(60 * 10); // 기본 세션 시간을 이용하지 않고 남은 세션 시간을 임의의 값으로 설정하여 타이머 시작
  // SessionTimer.resetSessionTimer(); // 기본 세션 시간으로 세션 타임 리셋
  // SessionTimer.resetSessionTimer(60 * 10); // 임의의 시간으로 세션 타임 리셋
  // 세션 타임 아웃 핸들러 등록
  SessionTimer.addEventListener('session-expired', () => {
    console.log('session expired');
  });
  // 세션 연장 핸들러 등록
  SessionTimer.addEventListener('expand-session', () => {
    console.log('session expand');
  });

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
