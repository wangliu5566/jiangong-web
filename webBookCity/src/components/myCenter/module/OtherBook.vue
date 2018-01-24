<template>
       <div class="other-book" @click="goDetail(getDetailPath(ObjectType),Id)">
           <div class="bookleft" style="background-image:url('/static/images/no_cover_m.jpg');background-size: 100% 100%;">
            <div class="bookleft hover" :style="{background:'url('+CoverUrl+')',backgroundSize:'cover',backgroundRepeat:'no-repeat',backgroundPosition:'center center'}"></div>
            </div>
            <div class="bookright">
                <span class="hover">{{title}}</span>
                <p class="old-money">&yen;{{formatPrice(oldmoney,2)}}</p>
                <p class="money">&yen;{{formatPrice(money,2)}}</p>
            </div>
        </div>
            
</template>

<script>
    export default {
        data() {
            return {}
        },
        props: ['title', 'oldmoney', 'money',"CoverUrl","ObjectType","Id"]
    }

</script>
<style lang='less'>
    .other-book {
        width: 200px;
        height: 92px;
        overflow: hidden;
        margin-top: 20px;
        .bookleft {
            width: 70px;
            height: 92px;
            float: left;

        }
        .bookright {
            float: right;
            margin-left: 12px;
            width: 118px;
            span {
                font-size: 14px;
                overflow: hidden;
                text-overflow: ellipsis;
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
            }
            .old-money {
                text-decoration: line-through;
                font-size: 12px;
                color: #999;
                margin-top: 17px;
            }
            .money {
                color: #e71515;
                font-size: 16px;
            }
        }
    }

</style>
