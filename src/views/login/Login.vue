<template>
    <section class="loginContainer">
        <div class="loginInner">
            <div class="login_header">
                <h2 class="login_logo">硅谷外卖</h2>
                <div class="login_header_title">
                    <a href="javascript:;" :class="{on:isMsgLogin}" @click="loginType('msg')">短信登录</a>
                    <a href="javascript:;" :class="{on:!isMsgLogin}" @click="loginType('pwd')">密码登录</a>
                </div>
            </div>
            <div class="login_content">
                <form @submit.prevent="login">
                    <div :class="{on:isMsgLogin}">
                        <section class="login_message">
                            <input type="tel" maxlength="11" placeholder="手机号" v-model="phone">
                            <button :disabled="!rightPhone" @click.prevent="getCode" class="get_verification"
                                    :class="{right_phone:rightPhone}">{{ computedTime>0?`已发送${computedTime}秒`:'获取验证码' }}
                            </button>
                        </section>
                        <section class="login_verification">
                            <input type="tel" maxlength="8" placeholder="验证码" v-model="code">
                        </section>
                        <section class="login_hint">
                            温馨提示：未注册硅谷外卖帐号的手机号，登录时将自动注册，且代表已同意
                            <a href="javascript:;">《用户服务协议》</a>
                        </section>
                    </div>
                    <div :class="{on:!isMsgLogin}">
                        <section>
                            <section class="login_message">
                                <input type="tel" maxlength="11" placeholder="手机/邮箱/用户名" v-model="name">
                            </section>
                            <section class="login_verification">
                                <input type="text" maxlength="8" placeholder="密码" v-model="pwd" v-if="isShowPwd">
                                <input type="password" maxlength="8" placeholder="密码" v-model="pwd" v-else>
                                <div class="switch_button" :class="isShowPwd?'on':'off'" @click="isShowPwd=!isShowPwd">
                                    <div class="switch_circle" :class="isShowPwd?'right':''"></div>
                                    <span class="switch_text">{{ isShowPwd?'abc':'' }}</span>
                                </div>
                            </section>
                            <section class="login_message">
                                <input type="text" maxlength="11" placeholder="验证码" v-model="captcha">
                                <img class="get_verification" src="http://localhost:5000/captcha" alt="captcha"
                                     @click="getCaptcha" ref="captcha">
                            </section>
                        </section>
                    </div>
                    <button class="login_submit">登录</button>
                </form>
                <a href="javascript:;" class="about_us">关于我们</a>
            </div>
            <a href="javascript:" class="go_back" @click="$router.back()">
                <i class="iconfont iconicon_arrow_left"></i>
            </a>
        </div>
    </section>
</template>

<script>
    import {MessageBox} from 'mint-ui';
    import {reqSendCode, reqSmsLogin, reqPwdLogin} from '../../api/index'

    export default {
        name: "Login",
        data() {
            return {
                isMsgLogin: true,
                phone: '',
                computedTime: 0,
                pwd: '',
                isShowPwd: false,
                code: '',
                name: '',
                captcha: ''
            }
        },
        methods: {
            loginType(type) {
                type === 'msg' ? this.isMsgLogin = true : this.isMsgLogin = false
            },
            async getCode() {
                if (!this.computedTime) {
                    this.computedTime = 10
                    this.intervalID = setInterval(() => {
                        this.computedTime--
                        if (this.computedTime * 1 === 0) {
                            clearInterval(this.intervalID)
                        }
                    }, 1000)
                    const result = await reqSendCode(this.phone)
                    if (result.code === 1) {
                        MessageBox('提示', result.msg);
                        if (this.computedTime) {
                            this.computedTime = 0
                            clearInterval(this.intervalID)
                            this.intervalID = ''
                        }
                    }
                }
            },
            async login() {
                const {isMsgLogin, code, phone, rightPhone, name, pwd, captcha} = this
                let result;
                if (isMsgLogin) {
                    if (!phone) {
                        MessageBox('提示', '请输入手机号码');
                        return false
                    } else if (!rightPhone) {
                        MessageBox('提示', '请输入正确的手机号码');
                        return false
                    } else if (!/^\d{6}$/.test(code)) {
                        MessageBox('提示', '请输入验证码或输入的格式不正确');
                        return false
                    }
                    result = await reqSmsLogin({phone, code})
                } else {
                    if (!name) {
                        MessageBox('提示', '请输入用户名');
                        return false;
                    } else if (!pwd) {
                        MessageBox('提示', '请输入密码');
                        return false;
                    } else if (!captcha) {
                        MessageBox('提示', '请输入验证码');
                        return false;
                    }
                    result = await reqPwdLogin({name, pwd, captcha})
                }
                if (this.computedTime) {
                    this.computedTime = 0
                    clearInterval(this.intervalID)
                    this.intervalID = ''
                }
                if (result.code === 1) {
                    this.getCaptcha()
                    MessageBox('提示', result.msg);

                } else {
                    const user = result.data
                    this.$store.dispatch('recordUserInfo',user)
                    this.$router.replace('/profile')
                }
            }
            ,
            getCaptcha() {
                this.$refs.captcha.src = 'http://localhost:5000/captcha?time=' + Date.now()
            }
        },
        computed: {
            rightPhone() {
                return /^(0|86|17951)?(13[0-9]|15[012356789]|166|17[3678]|18[0-9]|14[57])[0-9]{8}$/.test(this.phone)
            }
        }
    }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
    @import "../../common/stylus/mixins.styl"
    .loginContainer
        width 100%
        height 100%
        background #fff

        .loginInner
            padding-top 60px
            width 80%
            margin 0 auto

            .login_header
                .login_logo
                    font-size 40px
                    font-weight bold
                    color #02a774
                    text-align center

                .login_header_title
                    padding-top 40px
                    text-align center

                    > a
                        color #333
                        font-size 14px
                        padding-bottom 4px

                        &:first-child
                            margin-right 40px

                        &.on
                            color #02a774
                            font-weight 700
                            border-bottom 2px solid #02a774

            .login_content
                > form
                    > div
                        display none

                        &.on
                            display block

                        input
                            width 100%
                            height 100%
                            padding-left 10px
                            box-sizing border-box
                            border 1px solid #ddd
                            border-radius 4px
                            outline 0
                            font 400 14px Arial

                            &:focus
                                border 1px solid #02a774

                        .login_message
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff

                            .get_verification
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)
                                border 0
                                color #ccc
                                font-size 14px
                                background transparent

                                &.right_phone
                                    color black

                        .login_verification
                            position relative
                            margin-top 16px
                            height 48px
                            font-size 14px
                            background #fff

                            .switch_button
                                font-size 12px
                                border 1px solid #ddd
                                border-radius 8px
                                transition background-color .3s, border-color .3s
                                padding 0 6px
                                width 30px
                                height 16px
                                line-height 16px
                                color #fff
                                position absolute
                                top 50%
                                right 10px
                                transform translateY(-50%)

                                &.off
                                    background #fff

                                    .switch_text
                                        float right
                                        color #ddd

                                &.on
                                    background #02a774

                                > .switch_circle
                                    //transform translateX(27px)
                                    position absolute
                                    top -1px
                                    left -1px
                                    width 16px
                                    height 16px
                                    border 1px solid #ddd
                                    border-radius 50%
                                    background #fff
                                    box-shadow 0 2px 4px 0 rgba(0, 0, 0, .1)
                                    transition transform .3s

                                    &.right
                                        transform translateX(30px)

                        .login_hint
                            margin-top 12px
                            color #999
                            font-size 14px
                            line-height 20px

                            > a
                                color #02a774

                    .login_submit
                        display block
                        width 100%
                        height 42px
                        margin-top 30px
                        border-radius 4px
                        background #4cd96f
                        color #fff
                        text-align center
                        font-size 16px
                        line-height 42px
                        border 0

                .about_us
                    display block
                    font-size 12px
                    margin-top 20px
                    text-align center
                    color #999

            .go_back
                position absolute
                top 5px
                left 5px
                width 30px
                height 30px

                > .iconfont
                    font-size 20px
                    color #999
</style>