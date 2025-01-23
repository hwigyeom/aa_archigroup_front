(async (window) => {
  // for ajax
  (() => {
    let version;

    const get = async (url) => {
      console.log(url);
      const response = await fetch(url);
      if (response.ok) {
        const json = await response.json();
        if (json.Status === 'Success') {
          return json.Data;
        }
      }
      return null;
    };

    const post = async (url, data = {}) => {
      console.log(url);
      const response = await fetch(url, {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(data),
      });
      return await response.json();
    };

    const getApiUrl = async (path) => {
      if (typeof version === 'undefined') version = await ajax.get('/api/version.json');
      return '/api/' + version + '/' + path;
    };

    const ajax = { get, post, getApiUrl };

    window.ajax = ajax;
  })();

  // for menus
  (() => {
    const getCurrentModuleAndMenu = () => {
      const path = window.location.pathname;
      const [_, view, module, menu] = path.split('/');

      if (view === 'view') return { module, menu, url: path };
      else if (view === 'error') return { module: 'error', menu: module, url: path };
      else return { module: null, menu: null, url: path };
    };

    const findMenuByURL = (menus, url) => {
      for (const item of menus) {
        if (item.children) {
          for (const child of item.children) {
            if (child.url === url) {
              return child.id;
            }
          }
        }
      }
      return null;
    };

    const menus = { getCurrentModuleAndMenu, findMenuByURL };

    window.menus = menus;
  })();

  // for grid
  (() => {
    window.gridUtil = {
      fitHeight: (gridId, containerId) => {
        const container = document.getElementById(containerId);

        if (!container) return;

        const initScreenHeight = window.innerHeight;
        const initOffsetTop = container.offsetTop;
        const { width, height } = window.getComputedStyle(container);
        const marginHorizontal = initScreenHeight - initOffsetTop - parseInt(height, 10);
        container.style.height = height;

        window.addEventListener('resize', () => {
          const screenHeight = window.innerHeight;
          const height = screenHeight - initOffsetTop - marginHorizontal;
          const grid = window[gridId];
          container.style.height = height;
          if (grid) {
            grid.setSheetSize(parseInt(width, 10), parseInt(height, 10));
          }
        });
      },
    };
  })();
})(window);
