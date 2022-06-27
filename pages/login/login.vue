<template>
	<view class="login-view">
		<view class="logo">
			<image src="../../static/logo.png"></image>
		</view>
		<view class="login-view-title">欢迎来到驴友通</view>
		<block v-if="loginWay == 1">
			<view class="login-view-padding-top">
				<view class="login-view-group">
					<input placeholder="请输入账户名" type="text" v-model="username"></input>
				</view>
				<view class="login-view-group">
					<input placeholder="请输入登录密码" :type="passwordType" v-model="password"></input>
					<uni-icons :type="passwordType=='password'?'eye-slash':'eye'" size="24" @tap="onShowPassword"></uni-icons>
				</view>
				<view class="login-view-btn-box">
					<button @click="onLogin">登录</button>
				</view>
				<view class="login-view-login-way">
					<text @tap="onSelectLoginWay(2)">手机号登录</text>
					<view class="login-view-operation" >
						<text class="forgetPassword">忘记密码</text>
						<text @click="goToRegister">快速注册</text>
					</view>
					
				</view>
			</view>
		</block>
		<block v-if="loginWay == 2">
			<view class="login-view-padding-top">
				<view class="login-view-group">
					<picker @change="bindPickerChange" :value="index" :range="array">
						<view class="login-view-group-area">{{array[index]}}</view>
					</picker>
					<input class="login-view-group-phone" placeholder="请输入手机号" type="number" maxlength="11" v-model="phoneNo"></input>
				</view>
				<view class="login-view-group">
					<input class="uni-input" type="number" maxlength="6" placeholder="请输入验证码" v-model="smsCode" />
					<button class="login-view-group-smscode" :disabled="!isSendSMSEnable" @click="onSMSSend">
						{{ getSendBtnText }}</button>
				</view>
				<view class="login-view-btn-box">
					<button @click="onSMLogin">登录</button>
				</view>
				<view class="login-view-login-way">
					<text @tap="onSelectLoginWay(1)">账号密码登录</text>
					<text @click="goToRegister">快速注册</text>
				</view>
			</view>
		</block>
		<view class="login-view-thirdth-way">
			<view class="operLine">
				<text class="line">第三方账号登录</text>
			</view>
			
			<view class="login-way">
				<view class="login-way-box">
					<uni-icons type="weixin" size="30"></uni-icons>
					<uni-icons type="qq" size="30"></uni-icons>
					<uni-icons type="weibo" size="30"></uni-icons>
				</view>
			</view>
			<view class="login-view-agree">
				登录即同意，<text selectable="true" class="login-view-agree-title" @tap="showModal" data-target="Modal">《用户服务协议》</text>
			</view>
			<view class="login-view-modal" :class="modalName=='Modal'?'show':''">
				<view class="login-view-dialog">
					<view class="login-view-dialog-bar">
						<view class="title">用户协议</view>
						<uni-icons type="closeempty" size="18" color="gray" class="cloable" @tap="hideModal"></uni-icons>
					</view>
					<view class="login-view-dialog-content">
						<scroll-view scroll-y="true" style="height: 100%;" class="scrool-more">
						特别提醒：<br/>
						1、“驴友通监管平台”为户外活动用户（下称“您”）提供户外活动线路及玩法信息（包括但不限于线路轨迹、兴趣点建议等信息）、户外活动服务商信息和网络技术支持与维护，为户外活动服务提供商提供户外活动用户信息和技术支持与维护，以便撮合您与户外活动服务提供商之间达成户外活动服务协议。
						因此，驴友通监管平台并不是户外活动服务平台。驴友通监管平台不对户外活动服务过程中发生的纠纷或争议承担责任，也不对任何一方可能由此遭受的损失承担法律责任。<br/>
						2、用户应对”驴友通监管平台” 中的内容自行加以判断，并承担因使用内容而引起的所有风险，包括因对内容的准确性、完整性或实用性的依赖而产生的风险。本公司无法且不会对因用户行为而导致的任何损失或损害承担责任。<br/>
						3、本《户外活动用户注册协议》（以下简称“本协议”）是您（以下简称“您”或“用户”）与本公司之间关于您在驴友通监管平台中注册并使用驴友通监管平台业务（包括但不限于通过PC版或移动智能终端等版本）以及您通过驴友通监管平台获取相关信息、咨询建议及或服务等相关事宜所订立的协议。<br/>
						4、驴友通监管平台发布的平台规则、出行注意事项、个人信息和隐私保护、 等规定均属于本协议的补充协议，与本协议不可分割且具有同等法律效力。您在注册使用驴友通监管平台之前，应仔细认证阅读并理解本协议的内容和意思。<br/>
						当您填写信息、提交文件完成注册程序后，即表示您已充分阅读、理解并接受本协议的全部内容。如您不同意接受本协议或其中任何条款约定，您可立即放弃注册程序。<br/>
						5、用户理解并同意，因业务发展需要，本公司保留单方面对”驴友通监管平台” 的全部或部分服务内容在任何时候不经任何通知的情况下变更、暂停、终止或撤销的权利，用户需承担此风险。本公司尽可能在服务发生变更或终止前事先通知用户，但不视为义务。
						如驴友通监管平台终止运营，本公司可以从服务器上永久地删除用户的数据，但本公司没有义务向用户返还任何数据。<br/>
						6、驴友通监管平台有权根据运营需要和有关规定，对前述协议和条款进行修改并公布，驴友通监管平台无需另行向您发送通知即生效，您若不同意此等修改，可以放弃使用驴友通监管平台。<br/>
						一、账户注册<br/>
						1、为了使用“驴友通监管平台”，用户需要注册一个“驴友通监管平台”账号（使用第三方账号登录的需要绑定一个“驴友通监管平台”账号，若没有，需要额外注册）。出于安全性的考虑，“驴友通监管平台”账号应当使用电子邮箱或手机号码绑定注册。请用户使用尚未与“驴友通监管平台”账号绑定的电子邮箱或手机号码，以及未被本公司根据本协议封禁的电子邮箱或手机号码注册“驴友通监管平台”账号。<br/>
						2、驴友通监管平台上的部分产品系基于地理位置的移动社交产品，故用户完成注册即表明用户同意本公司提取、公开及使用用户的地理位置信息。如用户需要终止向其他用户公开其地理位置信息，可自行在软件或网站后台进行设置。如有不懂的地方，可以直接与我们的客服进行联系或通过我们的“常见问题”栏目寻求答案，你也可以通过软件中提到的用户QQ群与我们取得联系。<br/>
						3、鉴于“驴友通监管平台”账号的绑定注册方式，本公司在用户选用特定的注册方式时将会自动提取用户手机号码及手机设备识别码等信息用于注册。<br/>
						4、在用户注册及使用“驴友通监管平台” 时，本公司需要搜集能识别用户身份的个人信息以便本公司可以在必要时联系用户，或为用户提供更好的使用体验。本公司搜集的信息包括但不限于用户的姓名、性别、年龄、出生日期、地址、所属行业、兴趣爱好、活动范围、运动轨迹图等。具体信息请参看本协议“隐私信息保护”部分。<br/>
						5、为了适应产品规划或提供更好的用户体验，本公司可能会对账号注册和绑定的方式进行变更，本公司将尽可能事先通知用户，但不视为义务。<br/>
						二、帐户管理<br/>
						1、“驴友通监管平台”账号的所有权归本公司所有，用户只是获得了“驴友通监管平台”账号的使用权，该使用权属于初始申请注册人，禁止赠与、借用、租用、转让或售卖。本公司有权任何时候回收用户的“驴友通监管平台”账号。<br/>
						2、用户可以更改、删除“驴友通监管平台”帐户上的个人资料、注册信息及传送内容等，用户需承担由此导致的重要信息误删与暴露风险。<br/>
						3、用户有责任妥善保管注册账号信息及账号密码的安全，以保证自己的权益不受侵犯。因用户保管不善而导致遭受盗号或密码失窃，责任由用户自行承担。用户需要对注册账号以及密码下的行为承担法律责任。<br/>
						4、用户保证在任何情况下不使用他人驴友通监管平台用户的账号或密码。当用户怀疑自己的账号被盗或发现他人偷盗别人的账号，用户同意立即通知本公司。<br/>
						5、用户如果违反本协议中的任何条款，本公司有权依据协议中断或终止对违约用户“驴友通监管平台”账号提供服务。<br/>
						6、为了避免资源的浪费，如用户注册“驴友通监管平台”账号后一年不登录，本公司有权收回该账号，由此造成的任何后果由用户自行承担。<br/>
						7、用户如需要解封账号或因为未添加验证邮箱或验证手机号码而导致账号无法登录，用户可以通过驴友通官网所提供的客服电话进行人工的解封或更换密码。如因为用户无法提供足够的证明信息而导致的账号无法解封或改密，本公司不承担任何由此带来的损失。<br/>
						8、用户同意本公司有权在提供网络服务过程中以各种方式投放各种商业性广告或其他任何类型的商业信息，并且，用户同意接受本公司通过电子邮件或其他方式向用户发送商品促销或其他相关商业信息。用户同意本公司无须对前述广告或促销讯息的内容负责，用户应自行审慎判断内容的正确性与商品或服务质量。<br/>
						三、账号使用<br/>
						用户不得利用”驴友通监管平台”账号或”驴友通监管平台” 制作、上载、复制、发布、传播如下内容：<br/>
						1、违反国家法律、法规的；<br/>
						2、危害国家安全，泄露国家秘密，颠覆国家政权，破坏国家统一的；<br/>
						3、损害国家荣誉和利益的；<br/>
						4、煽动民族仇恨、民族歧视，破坏民族团结的；<br/>
						5、破坏国家宗教政策，宣扬邪教和封建迷信的；<br/>
						6、散布谣言，扰乱社会秩序，破坏社会稳定的；<br/>
						7、散布淫秽、色情、赌博、暴力、凶杀、恐怖或者教唆犯罪的；<br/>
						8、 侮辱或者诽谤他人，侵害他人合法权益的；<br/>
						9、含有任何性或性暗示的；<br/>
						10、含有辱骂、恐吓、威胁内容的；<br/>
						11、含有骚扰、垃圾广告、恶意信息、诱骗信息的；<br/>
						12、侵害他人名誉权、肖像权、知识产权、商业秘密等合法权利的；<br/>
						13、含有其他干扰“驴友通监管平台” 正常运营和侵犯其他用户或第三方合法权益内容的信息。<br/>
						本公司根据驴友通监管平台的隐私政策和信息保障条款，有权对用户使用驴友通监管平台网络服务（包括但不限于免费或付费服务）的情况进行审查和监督（包括但不限于对用户存储在本公司的内容进行审核），如用户在使用网络服务时违反任何上述规定，本公司有权要求用户改正或直接采取一切必要的措施（包括但不限于更改或删除用户张贴的内容等、暂停或终止用户使用网络服务的权利）以减轻用户不当行为造成的影响。因用户自身行为需向第三人承担责任的，由用户自行承担，与本公司无关。<br/>
						四、账号注销<br/>
						1、您可以在【我的】-【设置】-【隐私设置】进行帐号注销。<br/>
						2、在您注销帐号前，我们将验证您的个人身份、安全状态、设备信息等。<br/>
						3、有关注销的流程和内容，请参见《驴友通账号注销协议》。<br/>
						4、您知悉并理解，注销帐号的行为是不可逆的行为，当您注销帐号后，我们将删除有关您的相关信息或进行匿名化处理，但法律法规另有规定的除外。<br/>
						五、隐私信息保护<br/>
						1、用户在注册账号或使用“驴友通监管平台”的过程中，一些必要的信息需要被提供。而诸如法律法规、规章规范性文件（以下称“法律法规”）所规定需要填写的身份信息若提供的不完整或不合法，本公司可以限制或停止用户使用驴友通 。<br/>
						2、个人隐私信息是指涉及用户个人身份或个人隐私的信息，比如，用户真实姓名、身份证号、手机号码、手机设备识别码、用户聊天记录、IP地址。非个人隐私信息是指用户使用习惯以及使用状态等明确且客观反映在本公司服务器端的基本记录信息、个人隐私信息范围外的其它普通信息，以及用户同意公开的上述隐私信息。<br/>
						3、本公司尊重用户个人隐私信息的私有性，本公司将采取技术措施和其他必要措施，以确保用户个人隐私信息安全，防止在“驴友通监管平台” 中收集的用户个人隐私信息遭到泄露、毁损或丢失。若发现用户因为个人原因可能出现隐私泄露，本公司将对账号进行保护，由此给用户带来的不便请用户谅解。<br/>
						4、本公司未经用户同意不向任何第三方公开、 透露用户个人隐私信息。但以下特定情形除外：<br/>
						(1) 本公司根据法律法规规定或有权机关的指示提供用户的个人隐私信息；<br/>
						(2) 由于用户将其用户密码告知他人或与他人共享注册帐户与密码，由此导致的本公司误认为使用者为本人的情况；<br/>
						(3) 用户向第三方提供授权，公开自身个人隐私信息的；<br/>
						(4) 用户与本公司及合作单位之间就用户个人隐私信息的使用公开达成约定，本公司因此向合作单位公开用户个人隐私信息的；<br/>
						(5) 由于黑客攻击、电脑病毒侵入及其他不可抗力事件导致用户个人隐私信息的泄露。不可抗力部分可参考本协议相关章节。<br/>
						5、为了更好的为用户服务，用户同意本公司可在以下事项中使用用户的个人隐私信息：<br/>
						(1) 本公司向用户及时发送重要通知，如软件更新、本协议条款的变更以及安全预警等事项；<br/>
						(2) 本公司为改善驴友通 的功能以及服务而做出的审计、数据分析和研究等事项；<br/>
						(3) 本公司验证、管理用户信息等相关事项；<br/>
						(4) 法律法规涉及，相关部门需求。<br/>
						除上述事项外，如未取得用户事先同意，本公司不会将用户个人隐私信息使用于任何其他用途，再次特别注明，是个人隐私而不是上文所提到的非个人隐私信息。<br/>
						6、为加强对未成年人的保护，任何18岁以下的未成年人注册账号或使用”驴友通监管平台”应事先取得家长或其法定监护人（以下简称"监护人"）的书面同意。除本协议约定的例外情形外，未经监护人事先同意，本公司不会使用或向任何第三方透露未成年人的个人隐私信息。未向本公司提交书面同意的未成年用户，本公司将统一视为拥有完全民事行为能力的成年人。<br/>
						六、用户责任<br/>
						1、本公司发现或收到他人举报或投诉用户违反本协议约定的，本公司有权不经通知随时对相关内容，包括但不限于用户资料、聊天记录进行审查、删除，并视情节轻重对违规账号处以包括但不限于警告、账号封禁 、设备封禁 、功能封禁的处理，且通知用户处理结果。<br/>
						2、因违反用户协议被封禁的用户，可以自行通过驴友通人工客服查询封禁期限。未被永久封禁的账号在封禁期限届满后自助解封。本公司不承担用户因账号封禁而导致的任何损失。<br/>
						3、用户理解并认同，用户因使用本产品或服务而违反有关法律法规，用户应承担由此而产生的一切法律责任。<br/>
						4、用户理解并认同，因用户违反本协议约定，而导致或产生的任何第三方主张的任何索赔、要求或损失，包括合理的律师费，用户需全部承担并积极配合本公司以及下属公司或合作公司等消除影响。本公司保留追责的所有权利。本公司将尽可能的帮助用户避免第三方的索赔，但不视为义务。<br/>
						七、知识产权<br/>
						1、驴友通监管平台的一切知识产权（包括但不限于版权、商标权、专利权、商业秘密），以及相关的所有信息内容，包括但不限于：地图、线路轨迹、文字表述及其组合、数据信息、电子文件等均受法律保护；未经本公司书面同意，针对前述信息，用户不得为任何营利性或非营利性的目的自行实施、利用、转让、创造相关衍生作品或许可任何三方实施、利用、转让上述知识产权、创造相关衍生作品；<br/>
						2、用户在使用驴友通监管平台时所产生的轨迹内容、兴趣点信息、影像信息、文字作品信息等知识产权归本公司所有。除非该信息系在使用“驴友通监管平台”前形成并作出明确的声明。<br/>
						3、本公司鼓励用户在“驴友通监管平台”上传、粘贴和共享自己的信息，但这些信息不得侵犯他人的知识产权，否则，由此引起的法律责任一概由用户自行承担，本公司若收到此类投诉，经过审核并确认后，将会删掉此等侵权信息。<br/>
						八、不可抗力及公司免责事项<br/>
						1、在使用“驴友通监管平台”过程中，用户或本公司可能会遇到不可抗力等风险因素，致使服务发生中断或其他无可预期的故障。不可抗力是指不能预见、不能克服并不能避免且对一方或双方造成重大影响的客观事件，包括但不限于自然灾害如洪水、地震、瘟疫流行和风暴等以及社会事件如战争、动乱、政府行为等。<br/>
						2、因遭遇不可抗力而导致的服务中断或故障，本公司将努力在第一时间进行修复，本公司及合作单位对由此造成的任何损失或责任不承担责任。<br/>
						3、用户理解并认同，“驴友通监管平台” 存在因计算机病毒或黑客攻击等一切可预知与不可预知的外部原因而造成的服务中断或不能满足用户要求的风险，因此导致的用户或第三方任何损失，本公司不承担任何责任。<br/>
						4、用户理解并认同，在使用“驴友通监管平台” 过程中对他人所发送过来的任何信息应进行自我负责任的判断与处理。期间由此给用户或第三方带来的任何损失，本公司不承担任何责任。<br/>
						5、用户理解并认同，本公司需要定期或不定期地对“驴友通监管平台”或相关的设备进行检修或者维护，由此导致的产品无法使用，服务无法提供，本公司无需为此承担任何责任。本公司将尽可能在检修或者维护前通知用户，但并不视为义务。<br/>
						6、用户理解并认同，本公司不能保证及时对驴友通监管平台中违法违规或违约行为进行相应处理，本公司不承担由此所牵涉的任何责任。本公司将尽可能提前通知用户该违法、违规或违约行为，但并不视为义务。<br/>
						7、在任何情况下，本公司均不对任何间接性、后果性、惩罚性、偶然性、特殊性或刑罚性的损害，包括因用户使用“驴友通监管平台”遭受的利润损失承担责任（即使本公司已被告知该等损失的可能性亦然）。<br/>
						九、通知送达<br/>
						1、本协议项下本公司对于用户所有的通知均可通过网页公告、电子邮件、手机短信或常规的信件传送等方式进行；该等通知于发送之日视为已送达收件人。<br/>
						2、用户对于本公司的通知应当通过本公司对外正式公布的通信地址、传真号码、电子邮件地址等联系信息进行送达。该等通知以本公司实际收到日为送达日<br/>
						十、法律管辖<br/>
						1、本协议的订立、执行和解释及争议的解决均应适用中国法律并受中国法院管辖。<br/>
						2、如双方就本协议内容或其执行发生任何争议，双方应尽量友好协商解决；协商不成时，任何一方均可向本公司所在地的人民法院提起诉讼。<br/>
						</scroll-view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>
<script>
	import { ACCESS_TOKEN,USER_NAME,USER_INFO,SMS_MODE } from "@/common/util/constants";
	import graceChecker from "../../common/biz/graceChecker.js"
	import { loginService } from "@/api/index.js";
	import store from '@/store/index.js';
	export default {
		data() {
			return {				
				loginWay: 1,
				phoneNo: '',
				username:'Miya1',
				smsCode: '',
				password:'P@ssw0rd1',
				array: ['+86'],
				index: 0,
				modalName:'',
				passwordType:'password',
				isShowPassword:false,
				smsCountDown: 0,
				smsCountInterval: null,
			};
		},
		onBackPress() {  
		   uni.showModal({
		     title: '提示',  
		     content: '是否退出驴友通？',  
		     success: function(res) {  
		         if (res.confirm) {  
		             // 退出当前应用，改方法只在App中生效  
		             plus.runtime.quit();  
		         } else if (res.cancel) {  
		             console.log('用户点击取消');  
		         }  
		     }  
		   });  
		   return true  
		},
		onLoad() {
			store.commit('closeSocket')
			store.commit('clearUser')
			uni.$emit('closeHeartbeat')					
		},
		beforeDestroy() {
			if (this.smsCountInterval) {
				clearInterval(this.smsCountInterval);
			}
		},
		computed: {
			isSendSMSEnable() {
				return this.smsCountDown <= 0 && this.phoneNo.length > 4;
			},
			getSendBtnText() {
				if (this.smsCountDown > 0) {
					return this.smsCountDown + '秒后发送';
				} else {
					return '发送验证码';
				}
			},
		},
		methods: {
			bindPickerChange: function(e) {
				console.log('picker发送选择改变，携带值为', e.detail.value)
				this.index = e.detail.value
			},
			onLogin(){
				let params = {};
				params.username = this.username;
				params.password = this.password;
				//定义表单规则
				var rule = [
					{name:"username", checkType : "notnull", checkRule:"",  errorMsg:"请输入正确的账户名"},
				    {name:"password", checkType : "password", checkRule:"",errorMsg:"密码格式不正确"},
				];
				var checkRes = graceChecker.check(params, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				loginService.login(params).then(res => {
					let {data}  = res;
					if (data.success) {
						let {token,userInfo,check_status,realName_Indentity} = data.result;
						store.commit('setToken',token);
						store.commit('setUserInfo',userInfo);
						store.commit('setCheckStatus',check_status);
						store.commit('setRealNameIndentity',realName_Indentity);
						uni.reLaunch({
							url: '/pages/home/home',
						});
					} 
				});
			},
			onSMSSend() {
				let smsParams = {};
				smsParams.mobile = this.phoneNo;
				smsParams.smsmode = SMS_MODE.login;
				//定义表单规则
				var rule = [
					{name:"mobile", checkType : "phone", checkRule:"",  errorMsg:"请输入正确的手机号"},
				];
				var checkRes = graceChecker.check(smsParams, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				loginService.sendCaptcha(smsParams).then(res => {
					if (res.data.success) {
						this.smsCountDown = 60;
						this.startSMSTimer();
					} else {
						this.smsCountDown = 0;
					}
				});
			},
			startSMSTimer() {
				this.smsCountInterval = setInterval(() => {
					this.smsCountDown--;
					if (this.smsCountDown <= 0) {
						clearInterval(this.smsCountInterval);
					}
				}, 1000);
			},
			onSelectLoginWay(loginWay){
				switch(loginWay){
					case 1:
						this.phoneNo ='';
						this.smsCode='';
						this.loginWay = loginWay;
						break;
					case 2:
						this.username ='';
						this.password='';
						this.loginWay = loginWay;
						break;
				}
			},
			onShowPassword(){
				this.isShowPassword = !this.isShowPassword;
				this.passwordType = this.isShowPassword?'text':'password';
			},
			onSMLogin() {
				let loginParams = {
					mobile: this.phoneNo,
					captcha: this.smsCode
				};
				//定义表单规则
				var rule = [
					{name:"mobile", checkType : "phone", checkRule:"",  errorMsg:"请输入正确的手机号"},
					{name:"captcha", checkType : "zipcode", checkRule:"",  errorMsg:"请填写格式正确的短信验证码"},
				];
				var checkRes = graceChecker.check(loginParams, rule);
				if(!checkRes){
				    uni.showToast({ title: graceChecker.error, icon: "none" });
					return;
				}
				loginService.phoneLogin(loginParams).then((res)=>{
					let {data}  = res;
					if (data.success) {
						let {token,userInfo,check_status,realName_Indentity} = data.result;
						store.commit('setToken',token);
						store.commit('setUserInfo',userInfo);
						store.commit('setCheckStatus',check_status);
						store.commit('setRealNameIndentity',realName_Indentity);
						uni.reLaunch({
							url: '/pages/home/home',
						});
					} 
				})
			},
			goToRegister(){
				uni.navigateTo({
					url: '/pages/register/register',
				});
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target;
			},
			hideModal(e) {
				this.modalName = null;
			},
		}
	};
</script>

<style lang="less">
	.login-view {
		position: relative;
		height: 100vh;
		.logo{
			margin-left: 50upx;
			image{
				width: 100upx; 
				height: 100upx;
			}
		}
		uni-input,input{
			font-size: 34upx;
			flex: 1;
			font-weight: 500;
			color: #333333;
		}
		.login-view-title {
			margin-top: 36upx;
			margin-left: 40upx;
			font-weight: bold;
			font-size: 44upx;
		}
		.login-view-padding-top {
			padding: 50upx 50upx 0 50upx;
			.login-view-group{
				background-color: #ffffff;
				padding: 1upx 30upx;
				display: flex;
				align-items: center;
				min-height: 100upx;
				justify-content: space-between;
				margin-top: 30upx;
				border-bottom-style: solid;
				border-bottom-color: #f0f0f0;
				border-bottom-width: 2upx;
				.login-view-group-smscode{
					padding: 0 20upx;
					font-size: 20upx;
					height: 48upx;
					position: relative;
					border: 0upx;
					display: inline-flex;
					align-items: center;
					justify-content: center;
					box-sizing: border-box;
					text-align: center;
					overflow: visible;
				}
				uni-picker {
					flex: 0.2;
					font-size: 32upx;
					position: relative;
					.login-view-group-area::after{
						content: "";
						width: 0px;
						height: 0px;
						border-top: 12upx solid #333333;
						border-left: 8upx solid transparent;
						border-right: 8upx solid transparent;
						position: absolute;
						top: 20upx;
						left: 74upx
					}
				}
				.login-view-group-area{
					flex: 0.1;
					font-size: 19px;
					font-weight: 500;
					color: #333333;
					padding-right: 52upx;
				}
				.login-view-group-phone{
					flex: 1;
					font-size: 19px;
					color: #555;
					padding-right: 10px;
				}
				.icon-eye{
					width: 36upx;
					height: 36upx;
					margin-right: 16upx;
				}
			}
			.login-view-btn-box{
				margin-top: 70upx;
				button{
					background-color: #0086FF;
					color: #FFFFFF;
					border-radius: 40upx;
				}
			}
			.login-view-login-way{
				display: flex;
				justify-content:space-between ;
				background-color: #FFFFFF;
				margin-top: 40upx;
				.login-view-operation{
					display: flex;
					justify-content: space-between;
				}
				.forgetPassword::after {
					display: inline-block;
					height: 30upx;
					margin: 0 20upx 4upx;
					vertical-align: middle;
					border-right: 1px solid #eeeeee;
					content: '';
				}
			}
		}
		.login-view-thirdth-way {
			width: 100%;
			padding: 40upx 0;
			position: absolute;  
			bottom: 20upx;
			text-align: center;
			.operLine {
				width: 100%;
				height: 80ux;
				text-align: center;
				line-height: 80upx;
				margin: 20upx auto;
				.line {
					position: relative;
					display: inline-block;
					padding: 0px 60upx;
					&.line::after {
						content: '';
						width: 80upx;
						position: absolute;
						top: 40upx;
						right: -40upx;
						border-bottom: 2upx solid #f0f0f0;
					}
					&.line::before {
						content: '';
						width: 80upx;
						position: absolute;
						top: 40upx;
						left: -40upx;
						border-bottom: 2upx solid #f0f0f0;
					}
				}
			}

			.login-way {
				padding: 0 120upx;
				.login-way-box{
					display: flex;
					justify-content: space-between;
					margin: 30upx 0;
					font-size: 60upx;
					>uni-image{
						width: 31px;
						height: 34px;
					}
				}
			}
			.login-view-agree{
				margin-top: 50upx;
				text-align: center;
				background-color: #FFFFFF;
				.login-view-agree-title{
					color: #0086FF;
				}
			}
		}
		.login-view-modal {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 1110;
			opacity: 0;
			outline: 0;
			text-align: center;
			-ms-transform: scale(1.185);
			transform: scale(1.185);
			backface-visibility: hidden;
			perspective: 2000upx;
			background: rgba(0, 0, 0, 0.6);
			transition: all 0.3s ease-in-out 0s;
			pointer-events: none;
		}
		
		.login-view-modal::before {
			content: "\200B";
			display: inline-block;
			height: 100%;
			vertical-align: middle;
		}
		
		.login-view-modal.show {
			opacity: 1;
			transition-duration: 0.3s;
			-ms-transform: scale(1);
			transform: scale(1);
			overflow-x: hidden;
			overflow-y: auto;
			pointer-events: auto;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.login-view-dialog {
			position: relative;
			vertical-align: middle;
			margin-left: auto;
			margin-right: auto;
			width: 620upx;
			height: 700upx;
			max-width: 100%;
			background-color: #f8f8f8;
			border-radius: 5px;
			overflow: hidden;
			text-align: left;
			display: flex;
			flex-direction: column;
			padding: 0 40upx 40upx 40upx;
			.login-view-dialog-content{
				padding: 50upx;
				flex: 1;
				position: relative;
				color:#666666;
				font-size: 16px;
				.scrool-more{
					position: absolute;
					left: 0;
					right: 0;
					top: 0;
					bottom: 0;
				}
			}
		}
		.login-view-dialog-bar{
			display: flex;
			position: relative;
			align-items: center;
			min-height: 100upx;
			justify-content: space-between;
			padding: 0 20upx;
			.title{
				text-align: center;
				flex: 1;
				font-size: 32upx;
				font-weight: 500;
			}
		}
	}
</style>