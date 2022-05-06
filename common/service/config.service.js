let BASE_URL = '';

if (process.env.NODE_ENV == 'development') {
    BASE_URL = 'http://119.23.214.166:8080' // 开发环境
} else {
	BASE_URL = 'http://119.23.214.166:8080' // 生产环境
}
let staticDomainURL = BASE_URL+ '/tour-pal/sys/common/static';

const configService = {
	apiUrl: BASE_URL,
	staticDomainURL: staticDomainURL
};

export default configService;
