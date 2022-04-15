import configService from '../service/config.service.js';
import { ACCESS_TOKEN } from "@/common/util/constants";
let apiUrl = configService.apiUrl,staticUrl = configService.staticDomainURL;


function uploadFile(filePath,callback){
	let token = uni.getStorageSync(ACCESS_TOKEN);
	if (!token) {
		uni.navigateTo({
			url: '/pages/login/login'
		});
	}
	uni.uploadFile({
		url: apiUrl+'/tour-pal/sys/common/upload', //仅为示例，非真实的接口地址
		header:{
			'X-Access-Token':token
		},
		filePath,
		name: 'file',
		success: (res) => {
			let data = res&&JSON.parse(res.data);
			if(data.success){
				callback && callback(staticUrl+'/'+data.message);
			}
		},
		fail:(err) => {
			
		}
	});
}

export {
	uploadFile
}