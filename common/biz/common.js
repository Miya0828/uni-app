import configService from '../service/config.service.js';
import { ACCESS_TOKEN } from "@/common/util/constants";
let apiUrl = configService.apiUrl,staticUrl = configService.staticDomainURL;


function uploadFile(filePath,callback,error){
	let token = uni.getStorageSync(ACCESS_TOKEN);
	if (!token) {
		uni.navigateTo({
			url: '/pages/login/login'
		});
	}
	uni.showLoading({
	    title:"加载中..."
	});
	uni.uploadFile({
		url: apiUrl+'/tour-pal/sys/common/upload', //仅为示例，非真实的接口地址
		header:{
			'X-Access-Token':token
		},
		filePath,
		name: 'file',
		success: (res) => {
			console.log(res)
			uni.hideLoading();
			let data = res&&JSON.parse(res.data);
			if(data.success){
				callback && callback(staticUrl+'/'+data.message,res);
			}else{
				uni.showToast({
					icon:'none',
					title:data.message
				})
			}			
		},
		fail:(err) => {
			console.log('uploadFileError',err)
			error&&error(err)
			uni.hideLoading();
		}
	});
}

export {
	uploadFile
}