export default {
    //个人中心
    mycenter: resolve => require.ensure([], () => resolve(require('@/components/myCenter/Center.vue')), 'bgSystem06'),
    //我的足迹
    mytrack: resolve => require.ensure([], () => resolve(require('@/components/myCenter/MyTrack.vue')), 'bgSystem06'),
    //我的收藏
    mycollect: resolve => require.ensure([], () => resolve(require('@/components/myCenter/MyCollect.vue')), 'bgSystem06'),
    //已购资源
    myshop: resolve => require.ensure([], () => resolve(require('@/components/myCenter/Myshop.vue')), 'bgSystem06'),
    //账户设置
    accountSetting: resolve => require.ensure([], () => resolve(require('@/components/myCenter/AccountSetting.vue')), 'bgSystem06'),
    //消息通知
    news: resolve => require.ensure([], () => resolve(require('@/components/myCenter/News.vue')), 'bgSystem06'),
    mycomment: resolve => require.ensure([], () => resolve(require('@/components/myCenter/MyComment.vue')), 'bgSystem06'),
    //注册
    login: resolve => require.ensure([], () => resolve(require('@/components/login/Login.vue')), 'bgSystem06'),
    //登录
    register: resolve => require.ensure([], () => resolve(require('@/components/login/Register.vue')), 'bgSystem06'),
    findpassword: resolve => require.ensure([], () => resolve(require('@/components/login/Findpassword.vue')), 'bgSystem06'),

    //账户设置--绑定机构
    accountBindOrganization: resolve => require.ensure([], () => resolve(require('@/components/myCenter/accountBindOrganization.vue')), 'bgSystem06'),
    //账户设置--绑定机构--完成
    accountBindOrganizeOver: resolve => require.ensure([], () => resolve(require('@/components/myCenter/accountBindOrganizeOver.vue')), 'bgSystem06'),
    //账户设置--绑定手机
    accountBindTel: resolve => require.ensure([], () => resolve(require('@/components/myCenter/accountBindTel.vue')), 'bgSystem06'),
    //账户设置--绑定邮箱
    accountBindEmail: resolve => require.ensure([], () => resolve(require('@/components/myCenter/accountBindEmail.vue')), 'bgSystem06'),
    //账户设置--验证身份
    accountVerify: resolve => require.ensure([], () => resolve(require('@/components/myCenter/accountVerify.vue')), 'bgSystem06'),
    //账户设置--设置密码
    accountSetPwd: resolve => require.ensure([], () => resolve(require('@/components/myCenter/accountSetPwd.vue')), 'bgSystem06'),
    //账户设置--找回密码
    accountFindPwd: resolve => require.ensure([], () => resolve(require('@/components/myCenter/accountFindPwd.vue')), 'bgSystem06'),
    //账户设置--完成
    accountOver: resolve => require.ensure([], () => resolve(require('@/components/myCenter/accountOver.vue')), 'bgSystem06'),

    //收货地址
    shippingAddress: resolve => require.ensure([], () => resolve(require('@/components/myCenter/shippingAddress.vue')), 'bgSystem06'),
    //已设置收货地址
    listOfAddress: resolve => require.ensure([], () => resolve(require('@/components/myCenter/listOfAddress.vue')), 'bgSystem06'),
    //编辑个人资料
    EditPersonaInfo: resolve => require.ensure([], () => resolve(require('@/components/myCenter/EditPersonaInfo.vue')), 'bgSystem06'),
    //订单详情
    OrderDetail: resolve => require.ensure([], () => resolve(require('@/components/myCenter/OrderDetail.vue')), 'bgSystem06'),
    //手机绑定成功
    successBindTel: resolve => require.ensure([], () => resolve(require('@/components/myCenter/successBindTel.vue')), 'bgSystem06'),
    //邮箱绑定成功
    successBindEmail: resolve => require.ensure([], () => resolve(require('@/components/myCenter/successBindEmail.vue')), 'bgSystem06'),
    //手机修改成功
    successEditTel: resolve => require.ensure([], () => resolve(require('@/components/myCenter/successEditTel.vue')), 'bgSystem06'),
    //邮箱修改成功
    successEditEmail: resolve => require.ensure([], () => resolve(require('@/components/myCenter/successEditEmail.vue')), 'bgSystem06'),
    //账户设置--验证身份--邮箱验证
    accountVerifyEmail: resolve => require.ensure([], () => resolve(require('@/components/myCenter/accountVerifyEmail.vue')), 'bgSystem06'),
    //账户设置--验证身份--手机验证
    accountVerifyTel: resolve => require.ensure([], () => resolve(require('@/components/myCenter/accountVerifyTel.vue')), 'bgSystem06'),
    //手机验证成功
    successVerifyTel: resolve => require.ensure([], () => resolve(require('@/components/myCenter/successVerifyTel.vue')), 'bgSystem06'),
    //邮箱验证成功
    successVerifyEmail: resolve => require.ensure([], () => resolve(require('@/components/myCenter/successVerifyEmail.vue')), 'bgSystem06'),

    //重新绑定电话
    accountNewTel: resolve => require.ensure([], () => resolve(require('@/components/myCenter/AccountNewTel.vue')), 'bgSystem06'),
    //重新绑定邮箱
    accountNewEmail: resolve => require.ensure([], () => resolve(require('@/components/myCenter/AccountNewEmail.vue')), 'bgSystem06'),
    //重新绑定邮箱验证
    amend: resolve => require.ensure([], () => resolve(require('@/components/myCenter/Amend.vue')), 'bgSystem06'),

    //我的订单
    myOrder: resolve => require.ensure([], () => resolve(require('@/components/myCenter/myOrder.vue')), 'bgSystem06'),

    //修改地址
    UpdateAddress: resolve => require.ensure([], () => resolve(require('@/components/myCenter/UpdateAddress.vue')), 'bgSystem06'),
    //纸质书详情
    PaperDetail: resolve => require.ensure([], () => resolve(require('@/components/myCenter/PaperDetail.vue')), 'bgSystem06'),

}
