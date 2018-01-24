<template>
  <div class="register"> 
       <div class="center">
           <div class="logimg">
               <img  @click='goPath("/wrap/index")' src="../../assets/login.jpg">
               <span>欢迎登录</span>
           </div>
       </div>
       <div class="register-center">
           <div style='margin: auto;width: 1200px;'>
            <div class="register-case">
                <p>登录</p>
                <reg></reg>
            </div>
           </div>
        </div>
        <footers></footers>
    </div>
</template>

<script>
    import footers from "../common/Footer.vue"
    import reg from "./Reg.vue"
    export default {
        data() {
            return {
                checked: false,
                phone: true,
            }

        },
         methods: {
            goPath(path) {
                this.$router.push(path)
            }
        },
        components: {
            footers,
            reg
        }
    }

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang='less'>
    .register {
        .center {
            .logimg {
                display: flex;
                align-items: center;
                width: 1200px;
                margin: auto;
                span:nth-child(2) {
                    font-size: 26px;
                    color: #666;
                }
            }
        }
        .register-center {
            border-top: 2px solid #e6e6e6;
            background: url("../../assets/banner.jpg") no-repeat;
            height: 779px;
            .register-case {
                width: 548px;
                float: right;
                margin-top: 30px;
                margin-right: 40px;
                background-color: #fff;
            }
            .register-case>p{
                text-align: center;
                font-size: 20px;
                color: #333;
                padding: 20px 0;
                border-bottom: 1px solid #e6e6e6;
            }
        }
    }

</style>
