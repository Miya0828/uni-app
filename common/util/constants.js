export const ACCESS_TOKEN = 'Access-Token'
export const USER_NAME = 'login_username';
export const USER_INFO = 'login_user_info';
export const CHECK_STATUS = 'check_status';
export const REALNAME_INDETITY = 'realName_Indentity';


const STORAGE_OPTIONS = {
  namespace: 'pro__', // key prefix
    name: 'ls', // name variable Vue.[ls] or this.[$ls],
    storage: 'local', // storage name session, local, memory
}

export const SMS_MODE = {
	register:1, //注册验证码
	login:2, //登录验证码
};

export const SEX_LIST = [{label:'男',value:'0',checked:true},{label:'女',value:'1',checked:false}];

export default STORAGE_OPTIONS;


