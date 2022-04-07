const routes = [
	{
	 path: "/pages/login/login",
	 name: 'login',
		 meta: {
			 title: '登录',
		 },
	},
	{
	 path: "/pages/register/register",
	 name: 'register',
		 meta: {
			 title: '注册',
		 },
	},
	{
      path: '/pages/index/index',
      name: 'index',
        meta: {
	        title: '主页',
	    },
    },
	{
		"path": "/pages/home/home",
		name: 'home',
		  meta: {
		      title: '首页',
		  },
	},
	{
		"path": "/pages/forHelp/forHelp",
		name: 'forHelp',
		  meta: {
		      title: '求助',
		  },
	},
	{
	  path: '/pages/mine/mine',
	  name: 'mine',
	    meta: {
	        title: '我的',
	    },
	},
	{
		"path": "/pages/mine/certification",
		name: 'certification',
		  meta: {
		      title: '实名认证',
		  },
	},
	{
		"path": "/pages/mine/uploadActivityInfo",
		name: 'uploadActivityInfo',
		  meta: {
		      title: '活动信息上传',
		  },
	},
	{
		"path": "/pages/mine/teamAuth",
		name: 'teamAuth',
		  meta: {
		      title: '组团与团队认证申请',
		  },
	},
	{
		"path": "/pages/mine/captainGuide",
		name: 'captainGuide',
		  meta: {
		      title: '领队认证申请',
		  },
	},
]
export default routes;